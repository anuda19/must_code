import { useIsSpeaking } from "@livekit/components-react";
import { ConnectionState, type Participant } from "livekit-client";
import { AudioLines, Bot, UserRound } from "lucide-react";

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
          ? "border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] shadow-[var(--clay-shadow-raised)]"
          : "border-[var(--clay-border)] bg-[var(--clay-surface)] shadow-[var(--clay-shadow-raised)]"
      }`}
    >
      {active && (
        <>
          <div className="absolute size-36 animate-ping rounded-full bg-[var(--clay-peach)]/40" />
          <div className="absolute size-28 rounded-full border border-[var(--clay-peach-shadow)]/60" />
        </>
      )}

      <div
        className={`relative grid size-24 place-items-center rounded-full border transition-all duration-300 ${
          active
            ? "scale-105 border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)] shadow-[var(--clay-shadow-raised)]"
            : "border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)] shadow-[var(--clay-shadow-inset)]"
        }`}
      >
        {agent ? (
          <Bot size={39} strokeWidth={1.4} />
        ) : (
          <UserRound size={39} strokeWidth={1.4} />
        )}

        {active && (
          <span className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border-4 border-[var(--clay-surface)] bg-[var(--clay-primary)] text-[var(--clay-primary-ink)]">
            <AudioLines size={14} />
          </span>
        )}
      </div>

      <div className="relative mt-5 text-center">
        <p className="font-bold text-[var(--clay-ink)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--clay-muted)]">
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
              active ? "bg-[var(--clay-primary)]" : "bg-[var(--clay-peach-shadow)]"
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

export default VoiceIndicator;