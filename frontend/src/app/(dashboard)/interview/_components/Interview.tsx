
"use client";

import {
  Sparkles,
  Code2,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mic,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InterviewProps {
  onStartInterview: () => void;
}

export function Interview({ onStartInterview }: InterviewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col text-slate-100">
      {/* Scrollable content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        <div className="space-y-5 pb-5">
          {/* Header */}
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="gap-1.5 border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
            >
              AI-Powered Interview
            </Badge>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Choose Your Interview
            </h2>
          </div>

          {/* Mock Interview */}
          <Card className="group border-indigo-500/40 bg-indigo-500/[0.05] text-white transition-colors hover:border-indigo-400/70 hover:bg-indigo-500/[0.08]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  <Mic className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">
                      Mock Interview
                    </h3>

                    <Badge
                      variant="secondary"
                      className="gap-1 bg-slate-800 text-slate-300"
                    >
                      <Clock3 className="h-3 w-3" />
                      15 min
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Practice a real-time AI voice interview tailored to your
                    role, experience, and technical skills.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                  Live AI conversation
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                  Personalized questions
                </div>
              </div>

              <Button
                type="button"
                onClick={onStartInterview}
                className="mt-4 w-full gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Start Interview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Technical Assessment */}
          <Card className="border-slate-800 bg-slate-950/50 text-white transition-colors hover:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                  <Code2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">
                      Technical Assessment
                    </h3>

                    <Badge
                      variant="secondary"
                      className="gap-1 bg-slate-800 text-slate-300"
                    >
                      <Clock3 className="h-3 w-3" />
                      45 min
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Solve coding challenges and system design problems in a
                    structured technical evaluation.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  Coding challenges
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  System design
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <Badge
                  variant="outline"
                  className="border-slate-700 text-slate-400"
                >
                  Coming soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="text-xs leading-relaxed text-slate-400">
              <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-indigo-400" />
              Customize your interview experience and practice in a realistic
              AI-powered environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}