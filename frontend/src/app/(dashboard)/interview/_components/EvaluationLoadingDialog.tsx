"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, BrainCircuit, Code2, Cpu, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const EVALUATION_STEPS = [
  { id: 1, label: "Analyzing interview transcript & dialogue", icon: FileText },
  { id: 2, label: "Evaluating technical accuracy & depth", icon: Code2 },
  { id: 3, label: "Assessing problem solving & communication", icon: BrainCircuit },
  { id: 4, label: "Generating scores & final insights", icon: Sparkles },
];

interface EvaluationLoaderDialogProps {
  isOpen: boolean;
  onComplete?: () => void;
}

export function EvaluationLoaderDialog({ isOpen }: EvaluationLoaderDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      return;
    }

    // Simulate progressive multi-step loading if API is still pending
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < EVALUATION_STEPS.length ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md border-white/10 bg-[#111529] text-white shadow-2xl [&>button]:hidden">
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <Cpu className="size-8 animate-pulse text-violet-300" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Evaluating Your Interview
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Our AI is carefully reviewing your performance. Please wait a moment.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-3">
          {EVALUATION_STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 rounded-xl border p-3.5 transition-all duration-300 ${
                  isCurrent
                    ? "border-violet-400/40 bg-violet-500/[0.08] shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                    : isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                    : "border-white/[0.06] bg-black/20 opacity-50"
                }`}
              >
                <div
                  className={`grid size-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                    isCurrent
                      ? "border-violet-400/30 bg-violet-500/20 text-violet-200"
                      : isCompleted
                      ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                      : "border-white/10 bg-white/[0.03] text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-5 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="size-5 animate-spin text-violet-300" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>

                <div className="flex-1 text-sm">
                  <p
                    className={`font-medium ${
                      isCurrent
                        ? "text-white"
                        : isCompleted
                        ? "text-slate-200"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}