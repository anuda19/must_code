
"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InterviewEvaluation } from "@/types/interview-evalution";

type Props = {
  evaluation: InterviewEvaluation;
  onTryAgain?: () => void;
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-300";
  return "text-rose-400";
}

function ScoreDimension({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-3 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className={`font-semibold ${scoreColor(score)}`}>
          {score}/100
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        className="h-2 overflow-hidden rounded-full bg-white/10"
      >
        <div
          className={`h-full rounded-full ${
            score >= 80
              ? "bg-emerald-400"
              : score >= 60
                ? "bg-amber-300"
                : "bg-rose-400"
          }`}
          style={{
            width: `${Math.min(100, Math.max(0, score))}%`,
          }}
        />
      </div>
    </div>
  );
}

export function InterviewScore({
  evaluation,
  onTryAgain,
}: Props) {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const dimensions = [
    { label: "Technical accuracy", score: evaluation.technicalAccuracy },
    { label: "Problem solving", score: evaluation.problemSolving },
    { label: "Communication", score: evaluation.communication },
    { label: "Relevance", score: evaluation.relevance },
    { label: "Depth of knowledge", score: evaluation.depthOfKnowledge },
  ];

  return (
    <main className="min-h-svh bg-[#090b18] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-violet-300">
              <Award className="size-5" />
              <span className="text-sm">Interview results</span>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Your performance report
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Review your score, feedback, and areas to improve.
            </p>
          </div>

          {onTryAgain && (
            <Button
              onClick={onTryAgain}
              className="bg-violet-600 hover:bg-violet-500"
            >
              <RotateCcw className="mr-2 size-4" />
              Try another interview
            </Button>
          )}
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-violet-400/20 bg-[#111529] text-white">
            <CardContent className="flex h-full flex-col items-center justify-center p-7 text-center">
              <div className="mb-5 grid size-36 place-items-center rounded-full border-4 border-violet-400/30 bg-violet-500/10">
                <div>
                  <div
                    className={`text-5xl font-bold ${scoreColor(
                      evaluation.overallScore,
                    )}`}
                  >
                    {evaluation.overallScore}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    out of 100
                  </div>
                </div>
              </div>

              <Badge
                variant="outline"
                className="border-violet-400/30 bg-violet-400/10 px-3 py-1 text-violet-200"
              >
                {evaluation.grade}
              </Badge>

              <h2 className="mt-4 text-lg font-semibold">
                Overall score
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                {evaluation.report.summary}
              </p>

              <p className="mt-6 w-full border-t border-white/10 pt-4 text-left text-xs text-slate-500">
                Evaluated{" "}
                {new Date(evaluation.evaluatedAt).toLocaleString(
                  undefined,
                  { dateStyle: "medium", timeStyle: "short" },
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#111529] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="size-5 text-violet-300" />
                Performance breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {dimensions.map((dimension) => (
                <ScoreDimension
                  key={dimension.label}
                  {...dimension}
                />
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card className="border-white/10 bg-[#111529] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="size-5 text-emerald-400" />
                Your strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {evaluation.report.strengths.length ? (
                <ul className="space-y-3">
                  {evaluation.report.strengths.map((item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex gap-3 text-sm leading-6 text-slate-300"
                    >
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  No strengths provided.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#111529] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="size-5 text-amber-300" />
                Areas to improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              {evaluation.report.improvements.length ? (
                <ul className="space-y-3">
                  {evaluation.report.improvements.map((item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  No improvement areas provided.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="border-white/10 bg-[#111529] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="size-5 text-violet-300" />
              Your action plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {evaluation.report.actionPlan.length ? (
              <ol className="space-y-3">
                {evaluation.report.actionPlan.map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-500/15 font-semibold text-violet-200">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-slate-400">
                No action plan provided.
              </p>
            )}
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              Question-by-question feedback
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Expand a question to review your answer and suggested response.
            </p>
          </div>

          {evaluation.report.questions.map((question, index) => {
            const isExpanded = expanded.includes(index);

            return (
              <Card
                key={`${index}-${question.question}`}
                className="border-white/10 bg-[#111529] text-white"
              >
                <CardContent className="p-5">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleQuestion(index)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <div className="flex gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-500/15 text-sm text-violet-200">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium leading-6">
                          {question.question}
                        </p>
                        <p className="mt-2 text-sm text-slate-400">
                          Score:{" "}
                          <span className={scoreColor(question.score)}>
                            {question.score}/100
                          </span>
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-5 shrink-0 text-slate-400" />
                    ) : (
                      <ChevronDown className="size-5 shrink-0 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-5 space-y-5 border-t border-white/10 pt-5">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold">
                          Your answer
                        </h3>
                        <p className="whitespace-pre-wrap rounded-lg bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                          {question.candidateAnswer || "No answer recorded."}
                        </p>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-semibold text-violet-200">
                          Suggested answer
                        </h3>
                        <p className="whitespace-pre-wrap rounded-lg border border-violet-400/15 bg-violet-500/5 p-4 text-sm leading-6 text-slate-300">
                          {question.suggestedAnswer}
                        </p>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-semibold">
                          Interviewer feedback
                        </h3>
                        <p className="text-sm leading-6 text-slate-300">
                          {question.feedback}
                        </p>
                      </div>

                      {question.strengths.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold text-emerald-300">
                            What you did well
                          </h3>
                          <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-slate-300">
                            {question.strengths.map((item, i) => (
                              <li key={`${i}-${item}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {question.weaknesses.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold text-rose-300">
                            What to improve
                          </h3>
                          <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-slate-300">
                            {question.weaknesses.map((item, i) => (
                              <li key={`${i}-${item}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
}