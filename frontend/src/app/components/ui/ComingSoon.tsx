"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ComingSoonFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badgeText?: string;
  expectedDate?: string;
  bulletPoints?: string[];
  onNotifyMe?: (email: string) => void | Promise<void>;
  className?: string;
}

export default function ComingSoonFeatureCard({
  title,
  description,
  icon: Icon,
  badgeText = "Coming Soon",
  expectedDate,
  bulletPoints,
  onNotifyMe,
  className = "",
}: ComingSoonFeatureCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      if (onNotifyMe) {
        await onNotifyMe(email);
      } else {
        // Default mock delay if no handler provided
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] ${className}`}
    >
      {/* Ambient Top Glow */}
      <div className="absolute -right-12 -top-12 size-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Header & Badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Icon className="size-6" strokeWidth={2.2} />
        </div>

        <div className="flex items-center gap-2">
          {expectedDate && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-400">
              Expected {expectedDate}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300">
            <Sparkles className="size-3 text-indigo-400 animate-pulse" />
            {badgeText}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
      </div>

      {/* Optional Bullet Points (Sneak Peek Features) */}
      {bulletPoints && bulletPoints.length > 0 && (
        <div className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            What to expect:
          </span>
          <div className="grid gap-2">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2.5 text-xs text-slate-300">
                <Lock className="size-3.5 text-indigo-400/70 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Notification Form */}
      <div className="mt-8 border-t border-white/10 pt-6">
        {submitted ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-300">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>You're on the priority notification list! We'll email you at launch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/[0.05]"
            />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:bg-indigo-400 disabled:opacity-50"
            >
              <span>{loading ? "Subscribing..." : "Notify Me"}</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}