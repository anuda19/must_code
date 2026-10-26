"use client";

import React, { useEffect, useState } from "react";
import { Bot, Sparkles, Shield, Cpu, Radio, Mic } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConnectingDialogProps {
  isOpen: boolean;
  onCancel?: () => void;
}

const loadingSteps = [
  "Establishing secure LiveKit tunnel...",
  "Calibrating audio codecs & noise cancellation...",
  "Waking up Neural AI Interviewer...",
  "Synchronizing candidate profile & questions...",
  "Initializing live voice session...",
];

export function ConnectingDialog({ isOpen, onCancel }: ConnectingDialogProps) {
  const [stepIndex, setStepIndex] = useState(0);

  // Cycle through engaging status text steps to make the wait feel lightning fast & futuristic
  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel?.()}>
      <DialogContent className="sm:max-w-lg border border-violet-500/20 bg-[#090C19]/95 text-white backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,0.25)] p-8 sm:p-10 rounded-3xl overflow-hidden">
        {/* Absolute Background Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 size-48 rounded-full bg-violet-600/30 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-48 rounded-full bg-indigo-600/20 blur-[80px]" />

        {/* Top Header Badge */}
        <DialogHeader className="relative z-10 space-y-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-300 backdrop-blur-md shadow-inner">
            <Mic className="size-3.5 animate-pulse text-violet-400" />
            <span>AI Live Interview Stream</span>
          </div>

          <div className="space-y-1.5">
            <DialogTitle className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Initializing AI Room
            </DialogTitle>
            <p className="text-sm text-slate-400/90 max-w-sm mx-auto leading-relaxed">
              Preparing your real-time voice environment with sub-millisecond neural latency.
            </p>
          </div>
        </DialogHeader>

        {/* Crazy Sci-Fi Radar / Waveform Animation Hub */}
        <div className="relative mb-4 flex flex-col items-center justify-center py-6">
          {/* Outer Expanding Radar Rings */}
          <div className="absolute size-44 rounded-full border border-violet-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="absolute size-32 rounded-full border border-indigo-500/20 animate-pulse" />
          <div className="absolute size-24 rounded-full bg-violet-500/10 blur-xl" />

          {/* Central Core Icon with Glowing Border */}
          <div className="relative flex size-20 items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-b from-violet-600/30 to-violet-950/60 text-violet-200 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Bot className="size-9 text-violet-300 animate-bounce" />
          </div>

          {/* Animated Audio Equalizer Bars below core */}
          <div className="mt-4 flex items-center gap-1.5 h-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-indigo-400 animate-pulse"
                style={{
                  height: `${Math.max(8, Math.sin(i + stepIndex) * 22 + 16)}px`,
                  animationDuration: `${0.4 + (i % 3) * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Stepper / Loading Message Box */}
        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-center backdrop-blur-md shadow-inner">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-violet-300">
            <Radio className="size-3.5 animate-pulse text-emerald-400" />
            <span className="uppercase tracking-wider">Live Status</span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-slate-200 transition-all duration-300 animate-fade-in">
            {loadingSteps[stepIndex]}
          </p>
        </div>

        {/* Footer Actions / Security Notice */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="size-3 text-violet-400" /> End-to-End Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Cpu className="size-3 text-violet-400" /> Gemini Flash Live
            </span>
          </div> */}

          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel Connection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}