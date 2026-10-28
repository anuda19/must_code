"use client";

import { useMemo, useRef, useState } from "react";
import {
  AudioLines,
  Bot,
  Check,
  LoaderCircle,
  Mic,
  MicOff,
  PhoneOff,
  Radio,
  Sparkles,
  UserRound,
  Volume2,
  Wifi,
} from "lucide-react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useConnectionState,
  useIsSpeaking,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTranscriptions,
} from "@livekit/components-react";
import { ConnectionState, type Participant } from "livekit-client";
import "@livekit/components-styles";

import { API_BASE_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/hooks/useUser";
import {
  EvaluationResponse,
  EvaluationStatus,
  InterviewEvaluation,
} from "@/types/interview-evalution";
import MockInterviewPage from "./MockInterviewPage";
import { ConnectingDialog } from "./StartingInterviewLoader";
import InterviewEvaluationCard from "./InterviewEvaluation";

type TokenResponse = {
  token: string;
  roomName: string;
  serverUrl: string;
};

type TranscriptItem = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: number;
};

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function VoiceIndicator({
  participant,
  label,
  subtitle,
  agent = false,
  muted = false,
}: {
  participant: Participant;
  label: string;
  subtitle: string;
  agent?: boolean;
  muted?: boolean;
}) {
  const speaking = useIsSpeaking(participant);
  const active = speaking && !muted;

  return (
    <div
      className={`relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
        active
          ? "border-violet-400/50 bg-violet-500/[0.09]"
          : "border-white/[0.08] bg-[#111529]"
      }`}
    >
      {active && (
        <>
          <div className="absolute size-36 animate-ping rounded-full bg-violet-500/[0.07]" />
          <div className="absolute size-28 rounded-full border border-violet-400/20" />
        </>
      )}

      <div
        className={`relative grid size-24 place-items-center rounded-full border transition-all duration-300 ${
          active
            ? "scale-105 border-violet-300 bg-violet-500/20 text-violet-200 shadow-[0_0_45px_rgba(139,92,246,0.25)]"
            : "border-white/10 bg-white/[0.04] text-slate-300"
        }`}
      >
        {agent ? (
          <Bot size={39} strokeWidth={1.4} />
        ) : (
          <UserRound size={39} strokeWidth={1.4} />
        )}

        {active && (
          <span className="absolute -right-1 -bottom-1 grid size-8 place-items-center rounded-full border-4 border-[#111529] bg-violet-400 text-white">
            <AudioLines size={14} />
          </span>
        )}
      </div>

      <div className="relative mt-5 text-center">
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm text-slate-400">
          {active
            ? "Speaking now"
            : muted && !agent
              ? "Microphone muted"
              : subtitle}
        </p>
      </div>

      <div className="relative mt-4 flex h-5 items-center gap-1">
        {Array.from({ length: 13 }, (_, index) => (
          <span
            key={index}
            className={`w-1 rounded-full transition-all duration-150 ${
              active ? "bg-violet-300" : "bg-slate-700"
            }`}
            style={{
              height: active ? `${7 + ((index + 7) % 15)}px` : "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function InterviewRoomContent({
  roomName,
  onEnd,
}: {
  roomName: string;
  onEnd: (transcript: TranscriptItem[]) => void;
}) {
  const connectionState = useConnectionState();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const participants = useParticipants();
  const transcriptions = useTranscriptions();
  const [ending, setEnding] = useState(false);
  const room = useRoomContext();

  // Find agent participant (any participant that is not local user)
  const agentParticipant = participants.find(
    (participant) => participant.identity !== localParticipant.identity,
  );

  const messages = useMemo<TranscriptItem[]>(() => {
    return transcriptions
      .map((item, index) => ({
        id: `${item.participantInfo.identity}-${item.streamInfo.id}-${index}`,
        role:
          item.participantInfo.identity === localParticipant.identity
            ? ("user" as const)
            : ("assistant" as const),
        text: item.text.trim(),
        timestamp: item.streamInfo.timestamp,
      }))
      .filter((message) => message.text.length > 0);
  }, [transcriptions, localParticipant.identity]);

  const connectionLabel =
    connectionState === ConnectionState.Connected
      ? "Connected"
      : connectionState === ConnectionState.Connecting
        ? "Connecting"
        : connectionState === ConnectionState.Reconnecting
          ? "Reconnecting"
          : "Disconnected";

  async function toggleMicrophone() {
    try {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (error) {
      console.error("Could not toggle microphone:", error);
    }
  }

  async function endInterview() {
    if (ending) return;

    setEnding(true);

    const finalMessages = [...messages];

    try {
      await room.disconnect();
    } catch (error) {
      console.error("LiveKit disconnect failed:", error);
    }

    onEnd(finalMessages);
  }

  return (
    <main className="min-h-svh bg-[#090b18] px-4 text-white md:px-8">
      {!agentParticipant && (
        <ConnectingDialog isOpen={true} onCancel={endInterview} />
      )}

      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <Sparkles className="size-5 text-violet-300" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AI Mock Interview</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Your personal AI interview partner
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#111529] px-3 py-2">
            <span
              className={`size-2 rounded-full ${
                connectionState === ConnectionState.Connected
                  ? "bg-emerald-400"
                  : connectionState === ConnectionState.Reconnecting
                    ? "animate-pulse bg-amber-400"
                    : "bg-slate-500"
              }`}
            />
            <span className="text-sm text-slate-300">{connectionLabel}</span>
            <span className="hidden text-xs text-slate-500 sm:inline">
              · {roomName}
            </span>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.85fr)]">
          <section className="space-y-5">
            <Card className="overflow-hidden border-white/10 bg-[#111529] text-white">
              <CardHeader className="border-b border-white/[0.06] pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">
                      Live interview room
                    </CardTitle>
                    <p className="mt-1 text-sm text-slate-400">
                      Speak naturally. Your interviewer is listening.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                  >
                    <Radio className="mr-1.5 size-3" />
                    LIVE
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    {agentParticipant ? (
                      <VoiceIndicator
                        participant={agentParticipant}
                        label="AI Interviewer"
                        subtitle="Ready to respond"
                        agent
                      />
                    ) : (
                      <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-dashed border-violet-400/20 bg-violet-500/[0.04] p-6 text-center">
                        <p className="font-medium text-slate-400">
                          Waiting for agent...
                        </p>
                      </div>
                    )}
                  </div>

                  <VoiceIndicator
                    participant={localParticipant}
                    label="You"
                    subtitle="Your turn to speak"
                    muted={!isMicrophoneEnabled}
                  />
                </div>

                <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-violet-500/10 text-violet-300">
                      <Volume2 className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Interview in progress
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {agentParticipant
                          ? "Answer each question in your own words. You can pause to think before responding."
                          : "Your room is connected. The AI interviewer will appear here when its agent joins."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleMicrophone}
                    disabled={
                      connectionState !== ConnectionState.Connected || ending
                    }
                    className="h-12 min-w-36 border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
                  >
                    {isMicrophoneEnabled ? (
                      <Mic className="mr-2 size-4" />
                    ) : (
                      <MicOff className="mr-2 size-4" />
                    )}
                    {isMicrophoneEnabled ? "Mute microphone" : "Unmute mic"}
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={endInterview}
                    disabled={ending}
                    className="h-12 min-w-36"
                  >
                    {ending ? (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    ) : (
                      <PhoneOff className="mr-2 size-4" />
                    )}
                    {ending ? "Ending..." : "End interview"}
                  </Button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Wifi className="size-3.5" />
                  Audio is transmitted securely through LiveKit
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="flex min-h-[560px] flex-col border-white/10 bg-[#111529] text-white">
            <CardHeader className="border-b border-white/[0.06]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">
                    Conversation transcript
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-400">
                    Live speech transcription
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/[0.03] text-slate-300"
                >
                  {messages.length}{" "}
                  {messages.length === 1 ? "message" : "messages"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[470px] px-4 py-5">
                {messages.length === 0 ? (
                  <div className="flex h-[390px] flex-col items-center justify-center text-center">
                    <div className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-400">
                      <AudioLines className="size-6" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-200">
                      Your conversation will appear here
                    </p>
                    <p className="mt-2 max-w-[240px] text-sm leading-6 text-slate-500">
                      The transcript updates as you and the AI interviewer
                      speak.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`rounded-xl border p-4 ${
                          message.role === "assistant"
                            ? "border-violet-400/15 bg-violet-500/[0.08]"
                            : "border-sky-400/15 bg-sky-500/[0.06]"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {message.role === "assistant" ? (
                              <Bot className="size-4 text-violet-300" />
                            ) : (
                              <UserRound className="size-4 text-sky-300" />
                            )}
                            <span className="text-xs font-medium text-slate-300">
                              {message.role === "assistant"
                                ? "AI Interviewer"
                                : "You"}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-100">
                          {message.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            <div className="border-t border-white/[0.06] px-4 py-3">
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <Check className="size-3.5 text-emerald-400" />
                Transcript received from LiveKit
              </p>
            </div>
          </Card>
        </div>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>AI Mock Interview · Voice session</span>
          <span>Keep your answers clear and concise</span>
        </footer>
      </div>
    </main>
  );
}

export function InterviewRoom() {
  const [token, setToken] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState<TranscriptItem[]>([]);
  const clientSessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const [evaluationResult, setEvaluationResult] =
    useState<InterviewEvaluation | null>(null);

  const [evaluationStatus, setEvaluationStatus] =
    useState<EvaluationStatus>("idle");

  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const { data: user } = useUser();
  const profile = user?.profile;

  async function startInterview() {
    if (loading) return;

    if (!profile) {
      setError("Please complete your profile before starting an interview.");
      return;
    }
    clientSessionIdRef.current = crypto.randomUUID();
    startedAtRef.current = Date.now();
    setEvaluationResult(null);
    setLoading(true);
    setError(null);
    setEnded(false);
    setFinalTranscript([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/livekit/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: {
            experienceLevel: profile.experienceLevel,
            jobRole: profile.jobRole,
            targetCompany: profile.targetCompany,
            skills: profile.skills,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Could not get a LiveKit token (${response.status}). Check the NestJS API.`,
        );
      }

      const data: TokenResponse = await response.json();

      if (
        !data.token ||
        !data.roomName ||
        !data.serverUrl?.startsWith("wss://")
      ) {
        throw new Error(
          "The backend must return token, roomName, and a valid wss:// serverUrl.",
        );
      }

      setToken(data.token);
      setRoomName(data.roomName);
      setServerUrl(data.serverUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start the interview.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function finishInterview(transcript: TranscriptItem[]) {
    setFinalTranscript(transcript);
    setToken(null);
    setRoomName(null);
    setServerUrl(null);
    setEnded(true);
    setLoading(true);
    setError(null);
    setEvaluationResult(null);
    setEvaluationStatus("idle");
    setEvaluationError(null);

    try {
      const sessionId = clientSessionIdRef.current;
      const startedAt = startedAtRef.current;

      if (!sessionId || startedAt === null) {
        throw new Error("Interview session information is missing.");
      }

      const endedAt = Date.now();

      const transcriptText = transcript
        .map(
          (message) =>
            `${message.role === "assistant" ? "Interviewer" : "Candidate"}: ${message.text}`,
        )
        .join("\n");

      // Save transcript before requesting evaluation.
      const saveResponse = await fetch("/api/interview/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          model: "gemini-3.1-flash-live-preview",
          startedAt: new Date(startedAt).toISOString(),
          endedAt: new Date(endedAt).toISOString(),
          durationSeconds: Math.round((endedAt - startedAt) / 1000),
          messages: transcript,
          transcriptText,
        }),
      });

      const saved = await saveResponse.json();

      if (!saveResponse.ok || !saved.success) {
        throw new Error(saved.message ?? "Failed to save transcript.");
      }

      setLoading(false);
      setEvaluationStatus("evaluating");

      const response = await fetch(
        `/api/interview/${encodeURIComponent(sessionId)}/evaluate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      const payload: EvaluationResponse = await response.json();

      const result = payload?.data;
      const record = result?.data ?? null;
      const status = result?.status ?? record?.status;

      setEvaluationResult(record);

      if (
        !response.ok ||
        payload.success === false ||
        result?.success === false
      ) {
        setEvaluationStatus("failed");
        setEvaluationError(
          record?.errorMessage ??
            result?.message ??
            payload.error ??
            "Interview evaluation failed.",
        );
        return;
      }

      switch (status) {
        case "COMPLETED":
          setEvaluationStatus("completed");
          break;

        case "INSUFFICIENT_DATA":
          setEvaluationStatus("insufficient");
          setEvaluationError(
            record?.errorMessage ??
              result?.message ??
              "The transcript is too short to evaluate reliably.",
          );
          break;

        case "PROCESSING":
          setEvaluationStatus("evaluating");
          break;

        case "FAILED":
          setEvaluationStatus("failed");
          setEvaluationError(
            record?.errorMessage ?? result?.message ?? "Evaluation failed.",
          );
          break;

        default:
          setEvaluationStatus("failed");
          setEvaluationError(
            "The server returned an unknown evaluation status.",
          );
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save or evaluate the interview.";

      setError(message);
      setEvaluationError(message);
      setEvaluationStatus("failed");
    } finally {
      setLoading(false);
    }
  }

  if (!token || !roomName || !serverUrl) {
    return ended ? (
      <div className="w-full pt-2">
        <InterviewEvaluationCard
          status={evaluationStatus}
          evaluation={evaluationResult}
          error={evaluationError}
        />
      </div>
    ) : (
      <MockInterviewPage
        ended={ended}
        loading={loading}
        error={error}
        startInterview={startInterview}
        evaluationStatus={evaluationStatus}
        evaluationResult={evaluationResult}
        evaluationError={evaluationError}
      />
    );
  }

  return (
    <LiveKitRoom
      key={roomName}
      token={token}
      serverUrl={serverUrl}
      connect
      audio
      video={false}
      onError={(err) => setError(err.message || "LiveKit connection failed.")}
      onDisconnected={() => {
        setToken(null);
        setRoomName(null);
        setServerUrl(null);
      }}
    >
      <RoomAudioRenderer />
      <InterviewRoomContent roomName={roomName} onEnd={finishInterview} />
    </LiveKitRoom>
  );
}
