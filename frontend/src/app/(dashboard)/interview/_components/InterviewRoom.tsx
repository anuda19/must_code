"use client";

import { Mic, MicOff, PhoneOff, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InterviewStatus, TranscriptMessage } from "@/types/interview-types";
import { InterviewEvaluation } from "@/types/interview-evalution";
import { InterviewScore } from "./InterviewScore";

type Props = {
  status: InterviewStatus;
  muted: boolean;
  messages: TranscriptMessage[];
  error: string | null;
  evaluation: InterviewEvaluation | null;
  isEvaluating: boolean;
  onTryAgain: () => void;
  onStart: () => void;
  onMute: () => void;
  onEnd: () => void;
};

export function InterviewRoom({
  status,
  muted,
  messages,
  error,
  evaluation,
  isEvaluating,
  onTryAgain,
  onStart,
  onMute,
  onEnd,
}: Props) {
  const active = ["connecting", "listening", "speaking", "ready"].includes(
    status,
  );
  if (!isEvaluating && evaluation) {
    return <InterviewScore evaluation={evaluation} onTryAgain={onTryAgain} />;
  }
  return (
    <main className="min-h-svh bg-[#090b18] px-4 text-white md:px-8">
      <header className="mx-auto mb-6 flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {/* <Sparkles className="text-violet-400" size={22} /> */}
            <h1 className="text-xl font-semibold">AI Mock Interview</h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Your personal AI interview partner
          </p>
        </div>

        <Badge
          variant="outline"
          className="border-violet-400/30 bg-violet-400/10 px-3 py-1 text-violet-200"
        >
          {status === "idle"
            ? "Ready to start"
            : status === "connecting"
              ? "Connecting..."
              : status === "ready"
                ? "Ready"
                : status === "listening"
                  ? "Listening"
                  : status === "speaking"
                    ? "AI speaking"
                    : status === "ended"
                      ? "Interview ended"
                      : status === "error"
                        ? "Connection error"
                        : status}
        </Badge>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <Card className="border-white/10 bg-[#111529] text-white">
          <CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
            <div
              className={`mb-7 grid size-32 place-items-center rounded-full border border-violet-400/50 bg-violet-500/10 text-violet-300 shadow-[0_0_65px_rgba(124,58,237,0.22)] ${
                active ? "animate-pulse" : ""
              }`}
            >
              <Mic size={48} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-semibold">
              {status === "speaking"
                ? "Your AI interviewer is speaking"
                : status === "listening"
                  ? "Your turn to speak"
                  : status === "connecting"
                    ? "Connecting to Gemini"
                    : status === "ended"
                      ? "Session ended"
                      : "Ready when you are"}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              {error ||
                "Answer naturally and take your time. Your AI interviewer will guide the conversation."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["idle", "ended", "error"].includes(status) && (
                  <Button
                    onClick={onStart}
                    className="bg-violet-600 hover:bg-violet-500"
                  >
                    <Mic className="mr-2 size-4" />
                    Start interview
                  </Button>
                )}

                {["connecting", "ready", "listening", "speaking"].includes(
                  status,
                ) && (
                  <>
                    <Button
                      variant="outline"
                      onClick={onMute}
                      disabled={status === "connecting"}
                      className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                    >
                      {muted ? (
                        <Mic className="mr-2 size-4" />
                      ) : (
                        <MicOff className="mr-2 size-4" />
                      )}
                      {muted ? "Unmute" : "Mute"}
                    </Button>

                    <Button variant="destructive" onClick={onEnd}>
                      <PhoneOff className="mr-2 size-4" />
                      End interview
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#111529] text-white">
          <CardHeader>
            <CardTitle className="text-base">Conversation transcript</CardTitle>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[390px] pr-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Your conversation will appear here.
                  </p>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-xl border p-4 ${
                      message.role === "assistant"
                        ? "border-violet-400/15 bg-violet-500/10"
                        : "border-sky-400/15 bg-sky-500/10"
                    }`}
                  >
                    <p className="mb-2 text-xs font-medium text-slate-300">
                      {message.role === "assistant" ? "Gemini AI" : "You"}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-100">
                      {message.text}
                    </p>
                    <p className="mt-2 text-right text-[11px] text-slate-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
