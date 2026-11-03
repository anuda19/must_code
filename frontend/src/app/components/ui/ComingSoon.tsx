"use client";

import { useState } from "react";
import { Sparkles, Mail, ArrowRight, LoaderCircle, CheckCircle2, Rocket } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        err instanceof Error ? err.message : "Failed to join the waitlist. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center px-4 py-12 antialiased">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[350px] w-[450px] rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative max-w-2xl text-center space-y-8">
        
        {/* Animated Badge & Icon Header */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-300 backdrop-blur-xl">
            <Sparkles className="size-3.5 text-indigo-400" />
            <span>{badgeText}</span>
          </div>

          <div className="relative mt-2 flex size-20 items-center justify-center rounded-3xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/60 text-indigo-300 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
            <div className="absolute -inset-2 rounded-3xl bg-indigo-500/20 blur-md animate-pulse" />
            <Rocket className="relative size-9 text-indigo-300" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-lg text-sm text-slate-400 sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Waitlist Subscription Box */}
        {showWaitlist && (
          <div className="mx-auto max-w-md">
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-sm font-medium text-emerald-300 backdrop-blur-xl animate-in fade-in duration-300">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                <span>You're on the list! We will notify you when this feature launches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/90 pl-11 pr-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:bg-[#0B1020] focus:ring-4 focus:ring-indigo-500/15 shadow-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group h-[46px] rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-600/40 active:scale-[0.98]"
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
                  <p className="text-xs text-rose-400 text-left px-2">
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