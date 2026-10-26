
// "use client";

// import {
//   AlertCircle,
//   CheckCircle2,
//   LoaderCircle,
//   RefreshCw,
//   Sparkles,
//   Target,
//   TrendingUp,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";

// type Evaluation = {
//   status: "COMPLETED" | "INSUFFICIENT_DATA" | "FAILED" | "PROCESSING";
//   overallScore: number | null;
//   grade: string | null;
//   technicalAccuracy: number | null;
//   problemSolving: number | null;
//   communication: number | null;
//   relevance: number | null;
//   depthOfKnowledge: number | null;
//   errorMessage?: string | null;
//   report?: {
//     summary?: string;
//     strengths?: string[];
//     improvements?: string[];
//     actionPlan?: string[];
//   } | null;
// };

// type Props = {
//   status: "idle" | "evaluating" | "completed" | "insufficient" | "failed";
//   evaluation: Evaluation | null;
//   error?: string | null;
//   onRetry?: () => void;
// };

// const dimensions = [
//   { key: "technicalAccuracy", label: "Technical accuracy" },
//   { key: "problemSolving", label: "Problem solving" },
//   { key: "communication", label: "Communication" },
//   { key: "relevance", label: "Relevance" },
//   { key: "depthOfKnowledge", label: "Depth of knowledge" },
// ] as const;

// export default function InterviewEvaluationCard({
//   status,
//   evaluation,
//   error,
//   onRetry,
// }: Props) {
//   if (status === "idle") return null;

//   if (status === "evaluating") {
//     return (
//       <Card className="border-white/10 bg-[#111529] text-white shadow-2xl">
//         <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
//           <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
//             <LoaderCircle className="size-8 animate-spin text-violet-300" />
//           </div>
//           <Badge className="mb-3 border-violet-400/20 bg-violet-500/10 text-violet-200">
//             <Sparkles className="mr-1 size-3" />
//             AI evaluation
//           </Badge>
//           <h2 className="text-xl font-semibold">
//             Analyzing your interview
//           </h2>
//           <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
//             Reviewing your technical answers, problem-solving approach,
//             communication, and depth of knowledge. This may take a moment.
//           </p>
//           <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
//             <div className="h-full w-1/2 animate-pulse rounded-full bg-violet-400" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (status === "insufficient") {
//     return (
//       <Card className="border-white/10 bg-[#111529] text-white">
//         <CardContent className="flex flex-col items-center p-8 text-center">
//           <div className="mb-4 rounded-2xl bg-amber-400/10 p-4">
//             <AlertCircle className="size-8 text-amber-300" />
//           </div>
//           <h2 className="text-xl font-semibold">
//             Not enough data to evaluate
//           </h2>
//           <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
//             {evaluation?.errorMessage}
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (status === "failed" || !evaluation) {
//     return (
//       <Card className="border-white/10 bg-[#111529] text-white">
//         <CardContent className="flex flex-col items-center p-8 text-center">
//           <AlertCircle className="mb-4 size-9 text-rose-300" />
//           <h2 className="text-xl font-semibold">
//             Evaluation couldn&apos;t be completed
//           </h2>
//           <p className="mt-2 text-sm text-slate-400">
//             {error || "Your interview is saved. Try evaluating it again."}
//           </p>
//           {onRetry && (
//             <Button
//               onClick={onRetry}
//               className="mt-5 bg-violet-600 text-white hover:bg-violet-500"
//             >
//               <RefreshCw className="mr-2 size-4" />
//               Retry evaluation
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     );
//   }

//   const report = evaluation.report;

//   return (
//     <div className="space-y-5 text-white">
//       <Card className="overflow-hidden border-white/10 bg-[#111529]">
//         <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-400 to-sky-400" />
//         <CardContent className="p-6 sm:p-8">
//           <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <Badge className="mb-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
//                 <CheckCircle2 className="mr-1 size-3" />
//                 Evaluation complete
//               </Badge>
//               <h2 className="text-2xl font-semibold">
//                 Your interview results
//               </h2>
//               <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
//                 {report?.summary ||
//                   "Your technical interview evaluation is ready."}
//               </p>
//             </div>

//             <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
//               <div>
//                 <p className="text-xs text-slate-400">Overall score</p>
//                 <p className="mt-1 text-4xl font-bold tracking-tight">
//                   {evaluation.overallScore ?? "--"}
//                   <span className="text-base font-medium text-slate-400">
//                     /100
//                   </span>
//                 </p>
//                 <p className="mt-1 text-sm text-violet-200">
//                   {evaluation.grade || "Evaluated"}
//                 </p>
//               </div>
//               <div className="flex size-12 items-center justify-center rounded-full bg-violet-400/15">
//                 <TrendingUp className="size-6 text-violet-300" />
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="border-white/10 bg-[#111529] text-white">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-base">
//             <Target className="size-4 text-violet-300" />
//             Performance breakdown
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-5">
//           {dimensions.map(({ key, label }) => {
//             const score = evaluation[key];

//             return (
//               <div key={key} className="space-y-2">
//                 <div className="flex items-center justify-between gap-4 text-sm">
//                   <span className="text-slate-300">{label}</span>
//                   <span className="font-semibold tabular-nums">
//                     {score ?? "--"}
//                     {score !== null && score !== undefined && (
//                       <span className="text-slate-500"> / 100</span>
//                     )}
//                   </span>
//                 </div>
//                 <Progress
//                   value={score ?? 0}
//                   className="h-2 bg-white/10 [&>div]:bg-violet-400"
//                 />
//               </div>
//             );
//           })}
//         </CardContent>
//       </Card>

//       <div className="grid gap-5 md:grid-cols-2">
//         <Card className="border-white/10 bg-[#111529] text-white">
//           <CardHeader>
//             <CardTitle className="text-base text-emerald-300">
//               What went well
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {report?.strengths?.length ? (
//               <ul className="space-y-3">
//                 {report.strengths.map((item, index) => (
//                   <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
//                     <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-slate-400">
//                 No specific strengths were included in this report.
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         <Card className="border-white/10 bg-[#111529] text-white">
//           <CardHeader>
//             <CardTitle className="text-base text-amber-200">
//               Areas to improve
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {report?.improvements?.length ? (
//               <ul className="space-y-3">
//                 {report.improvements.map((item, index) => (
//                   <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
//                     <Target className="mt-1 size-4 shrink-0 text-amber-200" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-slate-400">
//                 No specific improvements were included in this report.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {!!report?.actionPlan?.length && (
//         <Card className="border-white/10 bg-[#111529] text-white">
//           <CardHeader>
//             <CardTitle className="text-base">Your next steps</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ol className="list-inside list-decimal space-y-2 text-sm leading-6 text-slate-300">
//               {report.actionPlan.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ol>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
"use client";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  CircleHelp,
  Compass,
  Lightbulb,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type DiscussionAnalysis = {
  topic: string;
  assessment: string;
};

type EvaluationReport = {
  summary?: string;
  strengths?: string[];
  improvements?: string[];
  actionPlan?: string[];
  discussionAnalysis?: DiscussionAnalysis[];
};

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
  model?: string | null;
  evaluatedAt?: string | null;
  report?: EvaluationReport | null;
};

type Props = {
  status: "idle" | "evaluating" | "completed" | "insufficient" | "failed";
  evaluation: Evaluation | null;
  error?: string | null;
  onRetry?: () => void;
};

const dimensions = [
  { key: "technicalAccuracy", label: "Technical accuracy", short: "Technical", description: "Correctness of concepts and implementation." },
  { key: "problemSolving", label: "Problem solving", short: "Problem solving", description: "How clearly you reasoned through the problem." },
  { key: "communication", label: "Communication", short: "Communication", description: "How clearly you explained your thinking." },
  { key: "relevance", label: "Relevance", short: "Relevance", description: "How directly your answers addressed the question." },
  { key: "depthOfKnowledge", label: "Depth of knowledge", short: "Depth", description: "How deeply you understood the underlying concepts." },
] as const;

type DimensionKey = (typeof dimensions)[number]["key"];

function scoreTone(score: number | null | undefined) {
  if (score == null) return "text-slate-400";
  if (score >= 75) return "text-emerald-300";
  if (score >= 50) return "text-amber-200";
  return "text-rose-300";
}

function scoreLabel(score: number | null | undefined) {
  if (score == null) return "Not scored";
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Developing";
  return "Needs focus";
}

function RadarChart({ values }: { values: { label: string; score: number }[] }) {
  const center = 150;
  const radius = 91;
  const angleFor = (index: number) => (-Math.PI / 2) + (index * 2 * Math.PI) / values.length;
  const point = (index: number, value: number) => {
    const angle = angleFor(index);
    const distance = radius * (value / 100);
    return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
  };
  const ringPoints = [20, 40, 60, 80, 100].map((ring) =>
    values.map((_, index) => point(index, ring)).join(" ")
  );
  const dataPoints = values.map((item, index) => point(index, item.score)).join(" ");

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <svg viewBox="0 0 300 300" role="img" aria-label={`Performance radar chart: ${values.map((v) => `${v.label} ${v.score} out of 100`).join(", ")}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="evaluationRadarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.12" />
          </linearGradient>
          <filter id="evaluationRadarGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {ringPoints.map((points, index) => (
          <polygon key={index} points={points} transform="translate(0 0)" fill="none" stroke="rgba(203,213,225,0.13)" strokeWidth="1" />
        ))}
        {values.map((item, index) => {
          const end = point(index, 100).split(",").map(Number);
          return <line key={item.label} x1={center} y1={center} x2={end[0]} y2={end[1]} stroke="rgba(203,213,225,0.15)" strokeWidth="1" />;
        })}
        <polygon points={dataPoints} fill="url(#evaluationRadarFill)" stroke="#a78bfa" strokeWidth="2.5" strokeLinejoin="round" filter="url(#evaluationRadarGlow)" />
        {values.map((item, index) => {
          const [x, y] = point(index, item.score).split(",").map(Number);
          const angle = angleFor(index);
          const labelX = center + Math.cos(angle) * 119;
          const labelY = center + Math.sin(angle) * 119;
          const anchor = Math.cos(angle) > 0.35 ? "start" : Math.cos(angle) < -0.35 ? "end" : "middle";
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} r="4" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
              <text x={labelX} y={labelY - 4} textAnchor={anchor} fill="#cbd5e1" fontSize="9.5" fontWeight="500">{item.label}</text>
              <text x={labelX} y={labelY + 9} textAnchor={anchor} fill="#f8fafc" fontSize="10.5" fontWeight="700">{item.score}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/70">{eyebrow}</p>
        <h3 className="mt-1 text-base font-semibold tracking-tight text-white">{title}</h3>
        {description && <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>}
      </div>
    </div>
  );
}

export default function InterviewEvaluationCard({
  status,
  evaluation,
  error,
  onRetry,
}: Props) {
  if (status === "idle") return null;

  if (status === "evaluating") {
    return (
      <Card className="overflow-hidden border-white/[0.08] bg-[#101321] text-white shadow-[0_24px_80px_-35px_rgba(124,58,237,0.35)]">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-400 to-fuchsia-400" />
        <CardContent className="flex min-h-[330px] flex-col items-center justify-center p-8 text-center sm:p-12">
          <div className="relative mb-6 flex size-20 items-center justify-center rounded-[28px] border border-violet-300/20 bg-violet-500/[0.09]">
            <div className="absolute inset-1 rounded-[24px] border border-violet-300/10" />
            <LoaderCircle className="size-9 animate-spin text-violet-200" />
            <Sparkles className="absolute -right-2 -top-2 size-5 text-fuchsia-200" />
          </div>
          <Badge className="mb-3 border-violet-300/20 bg-violet-400/10 text-violet-100 hover:bg-violet-400/10">
            <Sparkles className="mr-1.5 size-3" /> AI interview insights
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight">Turning your answers into insights</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Reviewing technical accuracy, reasoning, communication, and the details behind each answer. Your report will appear here shortly.
          </p>
          <div className="mt-7 h-1.5 w-56 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full w-2/5 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" />
          </div>
          <p className="mt-3 text-xs text-slate-500">Keep this page open while the evaluation finishes.</p>
        </CardContent>
      </Card>
    );
  }

  if (status === "insufficient") {
    return (
      <Card className="border-amber-300/15 bg-[#101321] text-white">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-amber-200/15 bg-amber-300/[0.08]">
            <AlertCircle className="size-7 text-amber-200" />
          </div>
          <h2 className="text-xl font-semibold">Not enough signal for a fair score</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
            {evaluation?.errorMessage || "Your interview was saved, but there wasn't enough meaningful answer content to generate a reliable evaluation."}
          </p>
          <p className="mt-4 max-w-lg text-xs leading-5 text-slate-500">
            Try answering with your reasoning, the approach you chose, and why it works. This helps the evaluator assess your skills rather than just answer length.
          </p>
          {onRetry && <Button onClick={onRetry} variant="outline" className="mt-5 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.07]"><RefreshCw className="mr-2 size-4" /> Evaluate again</Button>}
        </CardContent>
      </Card>
    );
  }

  if (status === "failed" || !evaluation) {
    return (
      <Card className="border-rose-300/15 bg-[#101321] text-white">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-rose-400/[0.08] text-rose-200"><AlertCircle className="size-7" /></div>
          <h2 className="text-xl font-semibold">We couldn't finish your evaluation</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{error || evaluation?.errorMessage || "Your interview is saved. You can retry the evaluation without taking the interview again."}</p>
          {onRetry && <Button onClick={onRetry} className="mt-5 bg-violet-600 text-white hover:bg-violet-500"><RefreshCw className="mr-2 size-4" /> Retry evaluation</Button>}
        </CardContent>
      </Card>
    );
  }

  const report = evaluation.report;
  const score = evaluation.overallScore;
  const scoreValues = dimensions.map(({ key, short }) => ({
    label: short,
    score: evaluation[key as DimensionKey] ?? 0,
  }));
  const strongest = [...dimensions].sort((a, b) => (evaluation[b.key] ?? -1) - (evaluation[a.key] ?? -1))[0];
  const weakest = [...dimensions].filter(({ key }) => evaluation[key] != null).sort((a, b) => (evaluation[a.key] ?? 101) - (evaluation[b.key] ?? 101))[0];
  const scoredCount = dimensions.filter(({ key }) => evaluation[key] != null).length;

  return (
    <div className="space-y-5 text-white">
      {/* Overview */}
      <Card className="relative overflow-hidden border-white/[0.08] bg-[#101321] shadow-[0_24px_80px_-45px_rgba(124,58,237,0.45)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-violet-600/[0.10] blur-3xl" />
        <CardContent className="relative p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-200 hover:bg-emerald-300/[0.08]">
              <CheckCircle2 className="mr-1.5 size-3.5" /> Evaluation complete
            </Badge>
            {evaluation.evaluatedAt && (
              <span className="text-xs text-slate-500">
                Evaluated {new Date(evaluation.evaluatedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Your interview snapshot</p>
              <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
                <span className="text-7xl font-semibold leading-none tracking-[-0.07em] text-white sm:text-8xl">{score ?? "--"}</span>
                <span className="mb-2 text-lg text-slate-500">/ 100</span>
                {evaluation.grade && <Badge className="mb-2 border-violet-300/20 bg-violet-400/10 px-3 py-1 text-violet-100 hover:bg-violet-400/10">{evaluation.grade}</Badge>}
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-400 to-fuchsia-300 transition-all" style={{ width: `${Math.max(0, Math.min(100, score ?? 0))}%` }} />
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
                {report?.summary || "Your technical interview evaluation is ready. Review the skill breakdown and discussion notes to see where to focus next."}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><TrendingUp className="size-3.5 text-emerald-300" /> Strongest dimension</div>
                  <p className="mt-2 text-sm font-semibold text-white">{evaluation[strongest.key] == null ? "Not available" : strongest.label}</p>
                  <p className={`mt-1 text-xs font-medium ${scoreTone(evaluation[strongest.key])}`}>{evaluation[strongest.key] ?? "--"}{evaluation[strongest.key] != null ? "/100" : ""}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Target className="size-3.5 text-amber-200" /> Biggest opportunity</div>
                  <p className="mt-2 text-sm font-semibold text-white">{weakest ? weakest.label : "Not available"}</p>
                  <p className={`mt-1 text-xs font-medium ${scoreTone(weakest ? evaluation[weakest.key] : null)}`}>{weakest ? `${evaluation[weakest.key]}/100` : "Not scored"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.07] bg-[#0b0e1a]/75 p-3 sm:p-5">
              <div className="flex items-center justify-between gap-3 px-2 pt-1">
                <div>
                  <p className="text-sm font-semibold text-white">Skill profile</p>
                  <p className="mt-1 text-xs text-slate-500">Scores across five dimensions</p>
                </div>
                <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-400">{scoredCount}/5 scored</span>
              </div>
              <RadarChart values={scoreValues} />
              <p className="pb-1 text-center text-[11px] text-slate-500">A wider shape indicates more balanced performance.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill breakdown */}
      <Card className="border-white/[0.08] bg-[#101321] text-white">
        <CardHeader className="pb-2">
          <SectionHeading eyebrow="01 / Skill signals" title="Performance breakdown" description="See how each skill contributed to your result." icon={<Compass className="size-4" />} />
        </CardHeader>
        <CardContent className="grid gap-x-8 gap-y-6 p-5 pt-4 sm:grid-cols-2 sm:p-6 sm:pt-4">
          {dimensions.map(({ key, label, description }) => {
            const value = evaluation[key];
            return (
              <div key={key} className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-lg font-semibold tabular-nums ${scoreTone(value)}`}>{value ?? "--"}<span className="text-xs font-normal text-slate-500"> /100</span></p>
                    <p className="text-[10px] text-slate-500">{scoreLabel(value)}</p>
                  </div>
                </div>
                <Progress value={value ?? 0} className="h-1.5 bg-white/[0.07] [&>div]:bg-gradient-to-r [&>div]:from-violet-500 [&>div]:to-indigo-300" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Strengths and improvements */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-emerald-300/10 bg-[#101321] text-white">
          <CardHeader className="pb-3">
            <SectionHeading eyebrow="02 / Keep doing" title="Your strengths" description="Behaviours worth carrying into your next interview." icon={<CheckCircle2 className="size-4" />} />
          </CardHeader>
          <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
            {report?.strengths?.length ? (
              <ul className="space-y-3">
                {report.strengths.map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-3 rounded-xl border border-emerald-200/[0.08] bg-emerald-300/[0.025] p-3.5 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-slate-500">No specific strengths were included in this report.</p>}
          </CardContent>
        </Card>

        <Card className="border-amber-200/10 bg-[#101321] text-white">
          <CardHeader className="pb-3">
            <SectionHeading eyebrow="03 / Focus next" title="Areas to improve" description="Turn the weakest signals into specific practice goals." icon={<Target className="size-4" />} />
          </CardHeader>
          <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
            {report?.improvements?.length ? (
              <ul className="space-y-3">
                {report.improvements.map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-3 rounded-xl border border-amber-200/[0.08] bg-amber-200/[0.025] p-3.5 text-sm leading-6 text-slate-300">
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-amber-200" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-slate-500">No specific improvement areas were included in this report.</p>}
          </CardContent>
        </Card>
      </div>

      {/* Full topic-level analysis */}
      <Card className="border-white/[0.08] bg-[#101321] text-white">
        <CardHeader className="pb-3">
          <SectionHeading eyebrow="04 / Under the surface" title="Discussion analysis" description="The evaluator's assessment of the topics you actually discussed." icon={<CircleHelp className="size-4" />} />
        </CardHeader>
        <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
          {report?.discussionAnalysis?.length ? (
            <div className="space-y-3">
              {report.discussionAnalysis.map((item, index) => (
                <details key={`${index}-${item.topic}`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] open:border-violet-300/20 open:bg-violet-400/[0.025]">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-violet-400/[0.10] text-xs font-semibold text-violet-200">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-slate-200">{item.topic}</span>
                    <span className="text-xs text-slate-500 transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="px-4 pb-4 pl-[3.75rem]">
                    <div className="border-l-2 border-violet-300/25 pl-3.5 text-sm leading-6 text-slate-400">{item.assessment}</div>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm leading-6 text-slate-500">
              Topic-level analysis wasn't returned for this evaluation. The overall summary and skill scores are shown above.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action plan */}
      {/* <Card className="overflow-hidden border-violet-300/15 bg-[#101321] text-white">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
        <CardHeader className="pb-3">
          <SectionHeading eyebrow="05 / Your next session" title="Your practice roadmap" description="Small, concrete actions to make your next interview stronger." icon={<Lightbulb className="size-4" />} />
        </CardHeader>
        <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
          {report?.actionPlan?.length ? (
            <ol className="space-y-3">
              {report.actionPlan.map((item, index) => (
                <li key={`${index}-${item}`} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/[0.09] text-xs font-semibold text-violet-100">{index + 1}</span>
                  <p className="pt-1 text-sm leading-6 text-slate-300">{item}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-violet-200" />
              <p className="text-sm leading-6 text-slate-400">A personalized action plan wasn't included in this evaluation. Use the improvement areas above as your practice checklist.</p>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">Scores are AI-generated coaching signals, not a guarantee of real-world interview outcomes.</p>
        {onRetry && <Button variant="ghost" size="sm" onClick={onRetry} className="self-start text-slate-300 hover:bg-white/[0.06] hover:text-white sm:self-auto"><RefreshCw className="mr-2 size-3.5" /> Re-evaluate</Button>}
      </div> */}
    </div>
  );
}