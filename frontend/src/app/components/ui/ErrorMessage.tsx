
import { AlertCircle } from "lucide-react";

type ErrorAlertProps = {
  message?: string | null;
  title?: string;
  className?: string;
};

export function ErrorAlert({
  message,
  title,
  className = "",
}: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`mb-6 flex items-start gap-3 rounded-xl border border-[var(--clay-primary)]/40 bg-[var(--clay-peach)]/50 p-3.5 text-sm text-[#a94e37] font-semibold ${className}`}
    >
      <AlertCircle
        size={18}
        strokeWidth={2}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <div className="min-w-0 space-y-0.5">
        {title && (
          <p className="font-semibold">{title}</p>
        )}

        <p className="leading-relaxed">{message}</p>
      </div>
    </div>
  );
}