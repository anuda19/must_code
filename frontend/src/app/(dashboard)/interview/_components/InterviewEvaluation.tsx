
"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type Evaluation = {
  status: "COMPLETED" | "INSUFFICIENT_DATA" | "FAILED" | "PROCESSING";
  overallScore: number | null;
  grade: string | null;
  technicalAccuracy: number | null;
  problemSolving: number | null;
  communication: number | null;
  relevance: number | null;
  depthOfKnowledge: number | null;
  errorMessage?: string | null;
  report?: {
    summary?: string;
    strengths?: string[];
    improvements?: string[];
    actionPlan?: string[];
  } | null;
};

type Props = {
  status: "idle" | "evaluating" | "completed" | "insufficient" | "failed";
  evaluation: Evaluation | null;
  error?: string | null;
  onRetry?: () => void;
};

const dimensions = [
  { key: "technicalAccuracy", label: "Technical accuracy" },
  { key: "problemSolving", label: "Problem solving" },
  { key: "communication", label: "Communication" },
  { key: "relevance", label: "Relevance" },
  { key: "depthOfKnowledge", label: "Depth of knowledge" },
] as const;

export default function InterviewEvaluationCard({
  status,
  evaluation,
  error,
  onRetry,
}: Props) {
  if (status === "idle") return null;

  if (status === "evaluating") {
    return (
      <Card className="border-white/10 bg-[#111529] text-white shadow-2xl">
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
            <LoaderCircle className="size-8 animate-spin text-violet-300" />
          </div>
          <Badge className="mb-3 border-violet-400/20 bg-violet-500/10 text-violet-200">
            <Sparkles className="mr-1 size-3" />
            AI evaluation
          </Badge>
          <h2 className="text-xl font-semibold">
            Analyzing your interview
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Reviewing your technical answers, problem-solving approach,
            communication, and depth of knowledge. This may take a moment.
          </p>
          <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-violet-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "insufficient") {
    return (
      <Card className="border-white/10 bg-[#111529] text-white">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 rounded-2xl bg-amber-400/10 p-4">
            <AlertCircle className="size-8 text-amber-300" />
          </div>
          <h2 className="text-xl font-semibold">
            Not enough data to evaluate
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            We need at least two meaningful technical problem discussions
            to provide a reliable score. Your interview has been saved,
            but no score was assigned.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "failed" || !evaluation) {
    return (
      <Card className="border-white/10 bg-[#111529] text-white">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <AlertCircle className="mb-4 size-9 text-rose-300" />
          <h2 className="text-xl font-semibold">
            Evaluation couldn&apos;t be completed
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {error || "Your interview is saved. Try evaluating it again."}
          </p>
          {onRetry && (
            <Button
              onClick={onRetry}
              className="mt-5 bg-violet-600 text-white hover:bg-violet-500"
            >
              <RefreshCw className="mr-2 size-4" />
              Retry evaluation
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const report = evaluation.report;

  return (
    <div className="space-y-5 text-white">
      <Card className="overflow-hidden border-white/10 bg-[#111529]">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-400 to-sky-400" />
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className="mb-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 className="mr-1 size-3" />
                Evaluation complete
              </Badge>
              <h2 className="text-2xl font-semibold">
                Your interview results
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                {report?.summary ||
                  "Your technical interview evaluation is ready."}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
              <div>
                <p className="text-xs text-slate-400">Overall score</p>
                <p className="mt-1 text-4xl font-bold tracking-tight">
                  {evaluation.overallScore ?? "--"}
                  <span className="text-base font-medium text-slate-400">
                    /100
                  </span>
                </p>
                <p className="mt-1 text-sm text-violet-200">
                  {evaluation.grade || "Evaluated"}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-violet-400/15">
                <TrendingUp className="size-6 text-violet-300" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-[#111529] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="size-4 text-violet-300" />
            Performance breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {dimensions.map(({ key, label }) => {
            const score = evaluation[key];

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-300">{label}</span>
                  <span className="font-semibold tabular-nums">
                    {score ?? "--"}
                    {score !== null && score !== undefined && (
                      <span className="text-slate-500"> / 100</span>
                    )}
                  </span>
                </div>
                <Progress
                  value={score ?? 0}
                  className="h-2 bg-white/10 [&>div]:bg-violet-400"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="border-white/10 bg-[#111529] text-white">
          <CardHeader>
            <CardTitle className="text-base text-emerald-300">
              What went well
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report?.strengths?.length ? (
              <ul className="space-y-3">
                {report.strengths.map((item, index) => (
                  <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                No specific strengths were included in this report.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#111529] text-white">
          <CardHeader>
            <CardTitle className="text-base text-amber-200">
              Areas to improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report?.improvements?.length ? (
              <ul className="space-y-3">
                {report.improvements.map((item, index) => (
                  <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                    <Target className="mt-1 size-4 shrink-0 text-amber-200" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                No specific improvements were included in this report.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {!!report?.actionPlan?.length && (
        <Card className="border-white/10 bg-[#111529] text-white">
          <CardHeader>
            <CardTitle className="text-base">Your next steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2 text-sm leading-6 text-slate-300">
              {report.actionPlan.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}