"use client";

import { useCallback, useRef, useState } from "react";
import { apiClient } from "@/lib/api.client";
import { InterviewStatus, TranscriptMessage } from "@/types/interview-types";
import {
  createLocalInterview,
  deleteLocalInterview,
  markInterviewPending,
  writeLocalInterview,
  type LocalInterviewSession,
} from "@/lib/interview/interview-local-storage";
import { InterviewEvaluation } from "@/types/interview-evalution";

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

type MockInterviewResponse = {
  data: {
    token: string;
    model: string;
  };
};

type FinalizeResponse = {
  success: boolean;
  data: {
    saved: boolean;
    sessionId: string;
    databaseId: string;
  } | null;
  error: unknown;
};

type LiveMessage = {
  setupComplete?: unknown;
  error?: { message?: string };
  serverContent?: {
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
    modelTurn?: {
      parts?: Array<{
        inlineData?: { data?: string; mimeType?: string };
      }>;
    };
    interrupted?: boolean;
    turnComplete?: boolean;
  };
};

function toBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength);

  let binary = "";

  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, Math.min(i + 0x8000, bytes.length)),
    );
  }

  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

export function useGeminiLive() {
  const [status, setStatus] = useState<InterviewStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(
    null,
  );

  const [isEvaluating, setIsEvaluating] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const silentGainRef = useRef<GainNode | null>(null);

  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlaybackTimeRef = useRef(0);
  const responseCompleteRef = useRef(true);
  const intentionalStopRef = useRef(false);
  const finalizeInProgressRef = useRef(false);

  const userTranscriptRef = useRef("");
  const assistantTranscriptRef = useRef("");
  const userMessageIdRef = useRef<string | null>(null);
  const assistantMessageIdRef = useRef<string | null>(null);

  const messagesRef = useRef<TranscriptMessage[]>([]);
  const localSessionRef = useRef<LocalInterviewSession | null>(null);

  const recordTranscript = useCallback(
    (
      role: "assistant" | "user",
      _delta: string,
      cumulativeText: string,
      messageId: string,
    ) => {
      const text = cumulativeText.trimStart();
      if (!text.trim()) return;

      const previousMessages = messagesRef.current;
      const existingIndex = previousMessages.findIndex(
        (message) => message.id === messageId,
      );

      let updatedMessages: TranscriptMessage[];

      if (existingIndex !== -1) {
        // Update the existing utterance with the complete accumulated text.
        updatedMessages = previousMessages.map((message, index) =>
          index === existingIndex ? { ...message, text } : message,
        );
      } else {
        // Create one message for this utterance.
        updatedMessages = [
          ...previousMessages,
          {
            id: messageId,
            role,
            text,
            timestamp: new Date(),
          },
        ];
      }

      messagesRef.current = updatedMessages;
      setMessages(updatedMessages);

      const session = localSessionRef.current;
      if (session) {
        session.messages = updatedMessages;

        // Do not persist individual streaming chunks as transcript events.
        session.events = [];

        writeLocalInterview(session);
      }
    },
    [],
  );

  const cleanupLive = useCallback(async () => {
    intentionalStopRef.current = true;

    const socket = socketRef.current;
    socketRef.current = null;

    if (socket && socket.readyState < WebSocket.CLOSING) {
      socket.close(1000, "Interview ended by user");
    }

    // Stop audio already queued for playback.
    for (const source of activeSourcesRef.current) {
      source.onended = null;

      try {
        source.stop();
      } catch {
        // The source may already have stopped.
      }
    }

    activeSourcesRef.current = [];

    workletRef.current?.port.close();
    workletRef.current?.disconnect();
    workletRef.current = null;

    inputSourceRef.current?.disconnect();
    inputSourceRef.current = null;

    silentGainRef.current?.disconnect();
    silentGainRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    const inputCtx = inputCtxRef.current;
    const outputCtx = outputCtxRef.current;

    inputCtxRef.current = null;
    outputCtxRef.current = null;

    if (inputCtx && inputCtx.state !== "closed") {
      await inputCtx.close().catch(() => {});
    }

    if (outputCtx && outputCtx.state !== "closed") {
      await outputCtx.close().catch(() => {});
    }

    nextPlaybackTimeRef.current = 0;
    responseCompleteRef.current = true;

    userTranscriptRef.current = "";
    assistantTranscriptRef.current = "";
    userMessageIdRef.current = null;
    assistantMessageIdRef.current = null;

    setStatus("ended");
  }, []);

  const endInterview = useCallback(async () => {
    if (finalizeInProgressRef.current) return;

    const current = localSessionRef.current;

    if (!current) {
      await cleanupLive();
      return;
    }

    finalizeInProgressRef.current = true;
    setIsSaving(true);
    setError(null);

    try {
      await cleanupLive();

      const snapshot: LocalInterviewSession = {
        ...current,
        messages: [...messagesRef.current],
        events: [...current.events],
        endedAt: current.endedAt ?? new Date().toISOString(),
        status: "recording",
      };

      const pending = markInterviewPending(snapshot);
      localSessionRef.current = pending;

      const startedAt = new Date(pending.startedAt);
      const endedAt = new Date(pending.endedAt!);

      const transcriptText = pending.messages
        .map((message) => {
          const role =
            message.role === "assistant" ? "INTERVIEWER" : "CANDIDATE";

          return `[${role}] ${message.text}`;
        })
        .join("\n\n");

      const response = await apiClient.post<FinalizeResponse>(
        "/api/interview/sessions",
        {
          sessionId: pending.sessionId,
          model: pending.model,
          startedAt: pending.startedAt,
          endedAt: pending.endedAt,
          durationSeconds: Math.max(
            0,
            Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000),
          ),
          messages: pending.messages,
          events: pending.events,
          transcriptText,
        },
      );

      if (
        response.success !== true ||
        response.data?.saved !== true ||
        response.data.sessionId !== pending.sessionId
      ) {
        throw new Error("The server did not confirm this interview save.");
      }

      setIsEvaluating(true);

      try {
        const response = await apiClient.post<{
          success: boolean;
          data: InterviewEvaluation | null;
          error: string | null;
        }>(
          `/api/interview/sessions/${encodeURIComponent(pending.sessionId)}`,
          {},
        );

        if (!response) {
          throw new Error("No response received from the API.");
        }

        if (!response.success || !response.data) {
          throw new Error(response.error || "Evaluation data not found.");
        }

        // Store only the evaluation object, not the API response.
        const evaluationData: InterviewEvaluation = response.data;

        setEvaluation(evaluationData);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch interview evaluation.",
        );
      } finally {
        setIsEvaluating(false);
      }

      deleteLocalInterview(pending.sessionId);

      localSessionRef.current = null;
      messagesRef.current = [];
      setMessages([]);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Interview save failed. Your local copy has been retained.";

      setError(message);
    } finally {
      finalizeInProgressRef.current = false;
      setIsSaving(false);
    }
  }, [cleanupLive]);

  const start = useCallback(async () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    intentionalStopRef.current = false;
    setStatus("connecting");
    setError(null);
    setMessages([]);
    responseCompleteRef.current = true;

    try {
      const res = await apiClient.post<MockInterviewResponse>(
        "/api/interview/mock-interview",
      );

      const { token, model } = res.data;

      if (!token || !model) {
        throw new Error("Invalid auth token response from backend.");
      }

      // Initialize and persist a fresh local session before streaming.
      const localSession = createLocalInterview(crypto.randomUUID(), model);

      localSessionRef.current = localSession;
      messagesRef.current = [];
      setMessages([]);
      writeLocalInterview(localSession);

      // Request microphone permission.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;

      const inputCtx = new AudioContext({
        sampleRate: INPUT_SAMPLE_RATE,
      });

      const outputCtx = new AudioContext({
        sampleRate: OUTPUT_SAMPLE_RATE,
      });

      inputCtxRef.current = inputCtx;
      outputCtxRef.current = outputCtx;

      await Promise.all([inputCtx.resume(), outputCtx.resume()]);

      // Connect directly to the Gemini Live API WebSocket.
      // Ephemeral tokens require v1alpha and access_token.
      const wsUrl =
        "wss://generativelanguage.googleapis.com/ws/" +
        "google.ai.generativelanguage.v1alpha.GenerativeService." +
        `BidiGenerateContentConstrained?access_token=${encodeURIComponent(token)}`;

      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      let setupAccepted = false;
      let resolveSetup!: () => void;
      let rejectSetup!: (reason: Error) => void;

      const setupPromise = new Promise<void>((resolve, reject) => {
        resolveSetup = resolve;
        rejectSetup = reject;
      });

      socket.onopen = () => {
        const setupMessage = {
          setup: {
            model: model.startsWith("models/") ? model : `models/${model}`,
            generationConfig: {
              responseModalities: ["AUDIO"],
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        };

        socket.send(JSON.stringify(setupMessage));
      };

      socket.onmessage = async (event: MessageEvent) => {
        let message: LiveMessage;

        try {
          const rawData =
            event.data instanceof Blob
              ? await event.data.text()
              : typeof event.data === "string"
                ? event.data
                : "";

          message = JSON.parse(rawData) as LiveMessage;
        } catch (err) {
          console.error("[Live] Failed to parse server response:", err);
          return;
        }

        if (message.error) {
          const messageText =
            message.error.message || "Gemini Live API returned an error.";

          if (!setupAccepted) {
            rejectSetup(new Error(messageText));
          }

          setError(messageText);
          setStatus("error");
          return;
        }

        // Do not send microphone audio until setup is accepted.
        if (message.setupComplete) {
          setupAccepted = true;
          resolveSetup();
          setStatus("listening");
          return;
        }

        const content = message.serverContent;
        if (!content) return;

        const outputCtx = outputCtxRef.current;
        if (!outputCtx) return;

        // User transcription: append each incoming event.
        const inputText = content.inputTranscription?.text;

        if (inputText) {
          userTranscriptRef.current += inputText;

          const id = userMessageIdRef.current ?? crypto.randomUUID();

          userMessageIdRef.current = id;

          recordTranscript(
            "user",
            inputText,
            userTranscriptRef.current.trim(),
            id,
          );
        }

        // Gemini output transcription: append each incoming event.
        const outputText = content.outputTranscription?.text;

        if (outputText) {
          assistantTranscriptRef.current += outputText;

          const id = assistantMessageIdRef.current ?? crypto.randomUUID();

          assistantMessageIdRef.current = id;

          recordTranscript(
            "assistant",
            outputText,
            assistantTranscriptRef.current.trim(),
            id,
          );
        }

        // Handle interruption: stop queued model audio.
        if (content.interrupted) {
          for (const source of activeSourcesRef.current) {
            source.onended = null;

            try {
              source.stop();
            } catch {
              // Already stopped.
            }
          }

          activeSourcesRef.current = [];
          nextPlaybackTimeRef.current = outputCtx.currentTime;
          responseCompleteRef.current = true;
          setStatus("listening");
        }

        // Play streamed 24 kHz PCM audio chunks.
        for (const part of content.modelTurn?.parts ?? []) {
          const encoded = part.inlineData?.data;
          if (!encoded) continue;

          const bytes = fromBase64(encoded);

          const pcm = new Int16Array(
            bytes.buffer,
            bytes.byteOffset,
            Math.floor(bytes.byteLength / 2),
          );

          if (!pcm.length) continue;

          const audioBuffer = outputCtx.createBuffer(
            1,
            pcm.length,
            OUTPUT_SAMPLE_RATE,
          );

          const channel = audioBuffer.getChannelData(0);

          for (let i = 0; i < pcm.length; i++) {
            channel[i] = pcm[i] / 32768;
          }

          const source = outputCtx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(outputCtx.destination);

          const startAt = Math.max(
            outputCtx.currentTime,
            nextPlaybackTimeRef.current,
          );

          responseCompleteRef.current = false;
          nextPlaybackTimeRef.current = startAt + audioBuffer.duration;

          activeSourcesRef.current.push(source);

          source.onended = () => {
            activeSourcesRef.current = activeSourcesRef.current.filter(
              (item) => item !== source,
            );

            if (
              activeSourcesRef.current.length === 0 &&
              responseCompleteRef.current
            ) {
              setStatus("listening");
            }
          };

          source.start(startAt);
          setStatus("speaking");
        }

        if (content.turnComplete) {
          // Reset only the current turn's accumulators.
          // Keep all completed messages and events in the session.
          userTranscriptRef.current = "";
          assistantTranscriptRef.current = "";
          userMessageIdRef.current = null;
          assistantMessageIdRef.current = null;

          responseCompleteRef.current = true;

          if (activeSourcesRef.current.length === 0) {
            setStatus("listening");
          }
        }
      };

      socket.onerror = () => {
        console.error("[Live] SOCKET ERROR");

        const socketError = new Error(
          "WebSocket connection to Gemini Live API failed.",
        );

        if (!setupAccepted) {
          rejectSetup(socketError);
        }

        if (!intentionalStopRef.current) {
          setError(socketError.message);
          setStatus("error");
        }
      };

      socket.onclose = (event) => {
        console.log("[Live] SOCKET CLOSED", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });

        if (socketRef.current === socket) {
          socketRef.current = null;
        }

        if (!setupAccepted) {
          rejectSetup(
            new Error(
              `Gemini WebSocket closed before setup completed (${event.code}).`,
            ),
          );
        }

        if (!intentionalStopRef.current) {
          setStatus("ended");

          if (event.code !== 1000) {
            setError(
              `Gemini connection closed (${event.code}). ${event.reason}`,
            );
          }
        }
      };

      // Wait for setupComplete before capturing microphone audio.
      await setupPromise;

      if (
        socketRef.current !== socket ||
        socket.readyState !== WebSocket.OPEN
      ) {
        throw new Error("Gemini WebSocket closed during setup.");
      }

      // Set up AudioWorklet microphone capture.
      await inputCtx.audioWorklet.addModule("/pcm-capture-processor.js");

      const inputSource = inputCtx.createMediaStreamSource(stream);

      const worklet = new AudioWorkletNode(inputCtx, "pcm-capture-processor", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        channelCount: 1,
        outputChannelCount: [1],
      });

      const silentGain = inputCtx.createGain();
      silentGain.gain.value = 0;

      worklet.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
        const currentSocket = socketRef.current;

        if (
          !currentSocket ||
          currentSocket.readyState !== WebSocket.OPEN ||
          inputCtx.state !== "running"
        ) {
          return;
        }

        const pcm = new Int16Array(event.data);

        currentSocket.send(
          JSON.stringify({
            realtimeInput: {
              audio: {
                data: toBase64(pcm),
                mimeType: "audio/pcm;rate=16000",
              },
            },
          }),
        );

        if (currentSocket.bufferedAmount > 64 * 1024) {
          console.warn("[Audio] WebSocket backlog detected", {
            bufferedAmount: currentSocket.bufferedAmount,
          });
        }
      };

      worklet.onprocessorerror = () => {
        setError("Microphone audio processor failed.");
        setStatus("error");
      };

      inputSource.connect(worklet);
      worklet.connect(silentGain);
      silentGain.connect(inputCtx.destination);

      inputSourceRef.current = inputSource;
      workletRef.current = worklet;
      silentGainRef.current = silentGain;
    } catch (err: unknown) {
      // Clean up resources only. Do not trigger an upload here.
      await cleanupLive();

      const message =
        err instanceof Error
          ? err.message
          : "Failed to establish voice session.";

      setError(message);
      setStatus("error");
    }
  }, [cleanupLive, recordTranscript]);

  return {
    status,
    error,
    messages,
    start,
    stop: endInterview,
    endInterview,
    evaluation,
    isEvaluating,
    onTryAgain: () => {
      setIsEvaluating(false)
      setEvaluation(null)
    },
    isSaving,
  };
}
