import {
  useConnectionState,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTranscriptions,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMemo, useState } from "react";
import { ConnectingDialog } from "./StartingInterviewLoader";
import {
  AudioLines,
  Bot,
  Check,
  LoaderCircle,
  Mic,
  MicOff,
  PhoneOff,
  Radio,
  UserRound,
  Volume2,
  Wifi,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import VoiceIndicator from "./VoiceIndicator";
import { TranscriptItem } from "@/types/interview-types";

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
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
    onEnd(finalMessages);

    try {
      await room.disconnect();
    } catch (error) {
      console.error("LiveKit disconnect failed:", error);
    }
  }

  async function closePopup() {
    if (ending) return;

    setEnding(true);
    try {
      await room.disconnect();
    } catch (error) {
      console.error("LiveKit disconnect failed:", error);
    }
  }

  return (
    <main className="min-h-svh bg-[var(--clay-bg)] px-4 text-[var(--clay-ink)] md:px-8">
      {!agentParticipant && (
        <ConnectingDialog isOpen={true} onCancel={closePopup} />
      )}

      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-xl border border-[var(--clay-peach)] bg-[var(--clay-surface)] text-[var(--clay-coral-shadow)] shadow-[var(--clay-shadow-raised)]">
                <Bot className="size-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--clay-ink)]">
                  AI Mock Interview
                </h1>
                <p className="mt-1 text-sm text-[var(--clay-muted)]">
                  Your personal AI interview partner
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3 py-2 shadow-[var(--clay-shadow-raised)]">
            <span
              className={`size-2 rounded-full ${
                connectionState === ConnectionState.Connected
                  ? "bg-[var(--clay-status)]"
                  : connectionState === ConnectionState.Reconnecting
                    ? "animate-pulse bg-amber-500"
                    : "bg-[var(--clay-subtle)]"
              }`}
            />
            <span className="text-sm font-medium text-[var(--clay-ink)]">
              {connectionLabel}
            </span>
            <span className="hidden text-xs text-[var(--clay-subtle)] sm:inline">
              · {roomName}
            </span>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.85fr)]">
          <section className="space-y-5">
            <Card className="overflow-hidden rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-card)]">
              <CardHeader className="border-b border-[var(--clay-border)] pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-bold text-[var(--clay-ink)]">
                      Live interview room
                    </CardTitle>
                    <p className="mt-1 text-sm text-[var(--clay-muted)]">
                      Speak naturally. Your interviewer is listening.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
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
                      <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] p-6 text-center">
                        <div className="mb-3 grid size-12 place-items-center rounded-xl bg-[var(--clay-surface)] text-[var(--clay-coral-shadow)] shadow-[var(--clay-shadow-raised)]">
                          <Bot className="size-6" />
                        </div>
                        <p className="font-medium text-[var(--clay-muted)]">
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

                <div className="mt-5 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-4 shadow-[var(--clay-shadow-inset)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-[var(--clay-peach)] bg-[var(--clay-surface)] text-[var(--clay-coral-shadow)]">
                      <Volume2 className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--clay-ink)]">
                        Interview in progress
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--clay-muted)]">
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
                    className="h-12 min-w-36 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-raised)] transition-all hover:bg-[var(--clay-surface-warm)] active:translate-y-0.5 active:shadow-none"
                  >
                    {isMicrophoneEnabled ? (
                      <Mic className="mr-2 size-4 text-[var(--clay-green-ink)]" />
                    ) : (
                      <MicOff className="mr-2 size-4 text-[var(--clay-coral-shadow)]" />
                    )}
                    {isMicrophoneEnabled ? "Mute microphone" : "Unmute mic"}
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={endInterview}
                    disabled={ending}
                    className="h-12 min-w-36 rounded-xl border border-[var(--clay-coral-shadow)] bg-[var(--clay-primary)] text-[var(--clay-primary-ink)] shadow-[var(--clay-shadow-button)] transition-all hover:bg-[var(--clay-primary-hover)] active:translate-y-1 active:shadow-[var(--clay-shadow-button-pressed)]"
                  >
                    {ending ? (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    ) : (
                      <PhoneOff className="mr-2 size-4" />
                    )}
                    {ending ? "Ending..." : "End interview"}
                  </Button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--clay-subtle)]">
                  <Wifi className="size-3.5" />
                  Audio is transmitted securely through LiveKit
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="flex min-h-[560px] flex-col rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-card)]">
            <CardHeader className="border-b border-[var(--clay-border)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-[var(--clay-ink)]">
                    Conversation transcript
                  </CardTitle>
                  <p className="mt-1 text-sm text-[var(--clay-muted)]">
                    Live speech transcription
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)]"
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
                    <div className="grid size-14 place-items-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)] shadow-[var(--clay-shadow-raised)]">
                      <AudioLines className="size-6" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[var(--clay-ink)]">
                      Your conversation will appear here
                    </p>
                    <p className="mt-2 max-w-[240px] text-sm leading-6 text-[var(--clay-muted)]">
                      The transcript updates as you and the AI interviewer
                      speak.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`rounded-xl border p-4 shadow-[var(--clay-shadow-raised)] ${
                          message.role === "assistant"
                            ? "border-[var(--clay-peach)] bg-[var(--clay-surface-warm)]"
                            : "border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)]"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {message.role === "assistant" ? (
                              <Bot className="size-4 text-[var(--clay-coral-shadow)]" />
                            ) : (
                              <UserRound className="size-4 text-[var(--clay-blue-ink)]" />
                            )}
                            <span className="text-xs font-semibold text-[var(--clay-ink)]">
                              {message.role === "assistant"
                                ? "AI Interviewer"
                                : "You"}
                            </span>
                          </div>
                          <span className="text-[11px] text-[var(--clay-subtle)]">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--clay-ink)]">
                          {message.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            <div className="border-t border-[var(--clay-border)] px-4 py-3">
              <p className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                <Check className="size-3.5 text-[var(--clay-status)]" />
                Transcript received from LiveKit
              </p>
            </div>
          </Card>
        </div>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--clay-subtle)]">
          <span>AI Mock Interview · Voice session</span>
          <span>Keep your answers clear and concise</span>
        </footer>
      </div>
    </main>
  );
}

export default InterviewRoomContent;
