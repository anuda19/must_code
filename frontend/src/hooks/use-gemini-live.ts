"use client";

import { useCallback, useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { apiClient } from "@/lib/api.client";
import { InterviewStatus, TranscriptMessage } from "@/types/interview-types";

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

function toBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
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

type MockInterviewResponse = {
  data: {
    token: string;
    model: string;
  };
};

export function useGeminiLive() {
  const [status, setStatus] = useState<InterviewStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const userTranscriptRef = useRef("");
  const assistantTranscriptRef = useRef("");
  const assistantMessageIdRef = useRef<string | null>(null);
  const userMessageIdRef = useRef<string | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const silentGainRef = useRef<GainNode | null>(null);

  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{
    input?: AudioContext;
    output?: AudioContext;
  }>({});
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlaybackTimeRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);

  const responseCompleteRef = useRef(true);

  const stop = useCallback(async () => {
    activeSourcesRef.current.forEach((source) => {
      source.onended = null;
      try {
        source.stop();
      } catch {}
    });
    activeSourcesRef.current = [];

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    sessionRef.current?.close();
    sessionRef.current = null;

    if (audioContextsRef.current.input?.state !== "closed") {
      await audioContextsRef.current.input?.close();
    }
    if (audioContextsRef.current.output?.state !== "closed") {
      await audioContextsRef.current.output?.close();
    }

    if (workletNodeRef.current) {
      workletNodeRef.current.port.onmessage = null;
      workletNodeRef.current.disconnect();
      workletNodeRef.current.port.close();
      workletNodeRef.current = null;
    }

    inputSourceRef.current?.disconnect();
    inputSourceRef.current = null;

    silentGainRef.current?.disconnect();
    silentGainRef.current = null;
    audioContextsRef.current = {};
    nextPlaybackTimeRef.current = 0;
    responseCompleteRef.current = true;

    setStatus("ended");
  }, []);

  const start = useCallback(async () => {
    setStatus("connecting");
    setError(null);
    responseCompleteRef.current = true;

    try {
      const res = await apiClient.post<MockInterviewResponse>(
        "/api/interview/mock-interview",
      );

      const { token, model } = res.data;

      if (!token || !model) {
        throw new Error("Invalid auth token response from backend");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const inputCtx = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE });
      const outputCtx = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      await inputCtx.resume();
      await outputCtx.resume();

      const ai = new GoogleGenAI({
        apiKey: token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => setStatus("listening"),

          onerror: (err: any) => {
            setError(err?.message || "Live session error");
            setStatus("error");
          },

          onclose: () => setStatus("ended"),

          onmessage: (event: any) => {
            const content = event.serverContent;
            const inputText = content?.inputTranscription?.text;

            if (inputText) {
              userTranscriptRef.current += inputText;

              const text = userTranscriptRef.current.trim();
              const id = userMessageIdRef.current ?? crypto.randomUUID();
              userMessageIdRef.current = id;

              setMessages((prev) => {
                const existing = prev.find((message) => message.id === id);

                if (existing) {
                  return prev.map((message) =>
                    message.id === id ? { ...message, text } : message,
                  );
                }

                return [
                  ...prev,
                  {
                    id,
                    role: "user",
                    text,
                    timestamp: new Date(),
                  },
                ];
              });
            }

            const outputText = content?.outputTranscription?.text;

            if (outputText) {
              assistantTranscriptRef.current += outputText;

              const text = assistantTranscriptRef.current.trim();
              const id = assistantMessageIdRef.current ?? crypto.randomUUID();

              assistantMessageIdRef.current = id;

              setMessages((prev) => {
                const existing = prev.find((message) => message.id === id);

                if (existing) {
                  return prev.map((message) =>
                    message.id === id ? { ...message, text } : message,
                  );
                }

                return [
                  ...prev,
                  {
                    id,
                    role: "assistant",
                    text,
                    timestamp: new Date(),
                  },
                ];
              });
            }

            if (content?.turnComplete) {
              userTranscriptRef.current = "";
              userMessageIdRef.current = null;

              assistantTranscriptRef.current = "";
              assistantMessageIdRef.current = null;
            }

            if (content?.interrupted) {
              activeSourcesRef.current.forEach((source) => {
                source.onended = null;
                try {
                  source.stop();
                } catch {}
              });

              activeSourcesRef.current = [];
              nextPlaybackTimeRef.current = outputCtx.currentTime;
              responseCompleteRef.current = true;
              setStatus("listening");
            }

            if (content?.modelTurn?.parts) {
              for (const part of content.modelTurn.parts) {
                if (!part.inlineData?.data) continue;

                const bytes = fromBase64(part.inlineData.data);
                const pcm = new Int16Array(
                  bytes.buffer,
                  bytes.byteOffset,
                  Math.floor(bytes.byteLength / 2),
                );

                if (pcm.length === 0) continue;

                const buffer = outputCtx.createBuffer(
                  1,
                  pcm.length,
                  OUTPUT_SAMPLE_RATE,
                );

                const channel = buffer.getChannelData(0);
                for (let i = 0; i < pcm.length; i++) {
                  channel[i] = pcm[i] / 32768;
                }

                const source = outputCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outputCtx.destination);

                const startAt = Math.max(
                  outputCtx.currentTime,
                  nextPlaybackTimeRef.current,
                );

                // New audio means the response is not fully played yet.
                responseCompleteRef.current = false;

                source.start(startAt);
                nextPlaybackTimeRef.current = startAt + buffer.duration;

                setStatus("speaking");
                activeSourcesRef.current.push(source);

                source.onended = () => {
                  activeSourcesRef.current = activeSourcesRef.current.filter(
                    (s) => s !== source,
                  );

                  if (
                    activeSourcesRef.current.length === 0 &&
                    responseCompleteRef.current
                  ) {
                    setStatus("listening");
                  }
                };
              }
            }

            if (content?.turnComplete) {
              responseCompleteRef.current = true;

              if (activeSourcesRef.current.length === 0) {
                setStatus("listening");
              }
            }
          },
        },
      });

      sessionRef.current = session;
      await inputCtx.audioWorklet.addModule("/pcm-capture-processor.js");
      const source = inputCtx.createMediaStreamSource(stream);
      const workletNode = new AudioWorkletNode(
        inputCtx,
        "pcm-capture-processor",
        {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          channelCount: 1,
          outputChannelCount: [1],
        },
      );

      const silentGain = inputCtx.createGain();
      silentGain.gain.value = 0;

      workletNode.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
        const session = sessionRef.current;

        if (!session || inputCtx.state !== "running") return;

        const pcm16 = new Int16Array(event.data);

        session.sendRealtimeInput({
          audio: {
            data: toBase64(pcm16),
            mimeType: "audio/pcm;rate=16000",
          },
        });
      };

      workletNode.onprocessorerror = () => {
        setError("Microphone audio processor failed.");
        setStatus("error");
      };

      source.connect(workletNode);
      workletNode.connect(silentGain);
      silentGain.connect(inputCtx.destination);

      inputSourceRef.current = source;
      workletNodeRef.current = workletNode;
      silentGainRef.current = silentGain;
    } catch (err: any) {
      await stop();
      setError(err?.message || "Failed to establish voice session.");
      setStatus("error");
    }
  }, [stop]);

  return { status, error, messages, start, stop };
}