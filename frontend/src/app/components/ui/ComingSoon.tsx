"use client";

import {
  useState,
  type FormEvent,
} from "react";
import {
  Sparkles,
  Mail,
  ArrowRight,
  LoaderCircle,
  CheckCircle2,
  Rocket,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  badgeText?: string;
  title?: string;
  description?: string;
  showWaitlist?: boolean;
  onSubscribe?: (email: string) => Promise<void> | void;
}

export function ComingSoon({
  badgeText = "Feature in Development",
  title = "Something Exciting is Coming Soon",
  description = "We are crafting a powerful new feature to elevate your technical interview preparation. Join the waitlist to get early access when we launch.",
  showWaitlist = true,
  onSubscribe,
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Fallback simulated submission delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to join the waitlist. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center px-4 py-12 antialiased">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--clay-peach)]/45 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[350px] w-[450px] rounded-full bg-[var(--clay-sage)]/50 blur-[120px]" />

      <div className="relative max-w-2xl space-y-8 text-center">
        {/* Animated Badge & Icon Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--clay-primary-ink)]">
            <Code2 className="size-3.5 text-[var(--clay-primary)]" />
            <span>{badgeText}</span>
          </div>

          <div className="clay-raised relative mt-2 flex size-20 items-center justify-center rounded-3xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] text-[var(--clay-primary)]">
            <div className="absolute -inset-2 animate-pulse rounded-3xl bg-[var(--clay-peach)]/60 blur-md" />
            <Rocket className="relative size-9 text-[var(--clay-primary)]" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--clay-ink)] sm:text-5xl">
            {title}
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[var(--clay-muted)] sm:text-base">
            {description}
          </p>
        </div>

        {/* Waitlist Subscription Box */}
        {showWaitlist && (
          <div className="mx-auto max-w-md">
            {isSubmitted ? (
              <div className="flex animate-in items-center justify-center gap-2.5 rounded-2xl border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] px-6 py-4 text-sm font-medium text-[var(--clay-green-ink)] fade-in duration-300">
                <CheckCircle2 className="size-5 shrink-0 text-[var(--clay-status)]" />
                <span>
                  You're on the list! We will notify you when this feature
                  launches.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--clay-subtle)]" />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="clay-inset w-full rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] py-3.5 pl-11 pr-4 text-sm text-[var(--clay-ink)] outline-none transition-all placeholder:text-[var(--clay-subtle)] focus:border-[var(--clay-primary)] focus:bg-[var(--clay-surface)] focus:ring-4 focus:ring-[var(--clay-primary)]/15"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="clay-button-shadow group h-[46px] rounded-2xl bg-[var(--clay-primary)] px-6 font-semibold text-[var(--clay-primary-ink)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--clay-primary-hover)] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <>
                        <span>Notify Me</span>
                        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <p className="px-2 text-left text-xs text-[var(--clay-coral-shadow)]">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}