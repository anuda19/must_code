// "use client";

// import { useState, useTransition } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CalendarDays,
//   Clock3,
//   FileText,
//   LoaderCircle,
//   Target,
//   Sparkles,
//   Trophy,
//   TrendingUp,
//   ChevronRight,
// } from "lucide-react";

// import {
//   getInterviewEvaluations,
//   getInterviewEvaluation,
// } from "@/actions/interview/evaluation/evaluation-action";

// import InterviewEvaluationCard from "./InterviewEvaluation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { InterviewEvaluation } from "@/types/interview-evalution";
// import Link from "next/link";

// type Pagination = {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// };

// type Props = {
//   initialItems: InterviewEvaluation[];
//   initialPagination?: Pagination;
// };

// const DIMENSIONS = [
//   { key: "technicalAccuracy", label: "Technical accuracy" },
//   { key: "problemSolving", label: "Problem solving" },
//   { key: "communication", label: "Communication" },
//   { key: "relevance", label: "Relevance" },
//   { key: "depthOfKnowledge", label: "Knowledge depth" },
// ] as const;

// type DimensionKey = (typeof DIMENSIONS)[number]["key"];

// function formatDate(date?: string | null) {
//   if (!date) return "Date unavailable";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "Date unavailable";
//   }

//   return parsed.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// function formatDuration(seconds?: number | null) {
//   if (seconds == null || seconds < 0) return null;

//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;

//   if (minutes === 0) return `${remainingSeconds}s`;

//   return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
// }

// function getScoreColor(score: number) {
//   if (score >= 80) return "bg-emerald-400";
//   if (score >= 60) return "bg-indigo-400";
//   if (score >= 40) return "bg-amber-400";
//   return "bg-rose-400";
// }

// function getGradeColor(grade: string | null) {
//   if (!grade) {
//     return "border-white/10 bg-white/5 text-slate-400";
//   }

//   switch (grade.toLowerCase()) {
//     case "excellent":
//       return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
//     case "good":
//       return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
//     case "average":
//       return "border-amber-400/20 bg-amber-400/10 text-amber-300";
//     case "needs improvement":
//     case "poor":
//       return "border-rose-400/20 bg-rose-400/10 text-rose-300";
//     default:
//       return "border-white/10 bg-white/5 text-slate-300";
//   }
// }

// function ScoreBreakdown({ evaluation }: { evaluation: InterviewEvaluation }) {
//   return (
//     <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
//       {DIMENSIONS.map((dimension) => {
//         const score = evaluation[dimension.key as DimensionKey];

//         return (
//           <div key={dimension.key} className="min-w-0 space-y-2">
//             <div className="flex items-center justify-between gap-2">
//               <span className="truncate text-xs text-slate-400">
//                 {dimension.label}
//               </span>

//               <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-200">
//                 {score == null ? "—" : `${score}/100`}
//               </span>
//             </div>

//             <div
//               className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
//               role="progressbar"
//               aria-label={dimension.label}
//               aria-valuemin={0}
//               aria-valuemax={100}
//               aria-valuenow={score ?? undefined}
//             >
//               <div
//                 className={`h-full rounded-full transition-all duration-500 ${
//                   score == null ? "bg-transparent" : getScoreColor(score)
//                 }`}
//                 style={{
//                   width: `${Math.min(100, Math.max(0, score ?? 0))}%`,
//                 }}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function InterviewEvaluationList({
//   initialItems,
//   initialPagination,
// }: Props) {
//   const [items, setItems] = useState<InterviewEvaluation[]>(initialItems);
//   const [pagination, setPagination] = useState<Pagination>(
//     initialPagination ?? {
//       page: 1,
//       limit: 10,
//       total: initialItems.length,
//       totalPages: 1,
//       hasNextPage: false,
//       hasPreviousPage: false,
//     },
//   );

//   const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);

//   const [loadingReportId, setLoadingReportId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const scoredItems = items.filter((item) => item.overallScore != null);

//   const averageScore =
//     scoredItems.length > 0
//       ? Math.round(
//           scoredItems.reduce((total, item) => total + item.overallScore!, 0) /
//             scoredItems.length,
//         )
//       : null;

//   const bestScore =
//     scoredItems.length > 0
//       ? Math.max(...scoredItems.map((item) => item.overallScore!))
//       : null;

//   async function loadPage(page: number) {
//     setError(null);

//     startTransition(async () => {
//       try {
//         const result = await getInterviewEvaluations(page, pagination.limit);

//         if (!result.success) {
//           setError(
//             Array.isArray(result.error)
//               ? result.error.join(", ")
//               : result.error || "Unable to load evaluations.",
//           );
//           return;
//         }

//         // setItems(result.data?.items ?? []);

//         if (result.data?.pagination) {
//           setPagination(result.data.pagination);
//         }
//       } catch {
//         setError("Unable to load evaluations. Please try again.");
//       }
//     });
//   }

//   if (selectedEvaluation) {
//     return (
//       <section className="space-y-6 text-white">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => {
//             setSelectedEvaluation(null);
//             setError(null);
//           }}
//           className="group gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
//         >
//           <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
//           All Evaluations
//         </Button>

//         {error && (
//           <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
//             {error}
//           </div>
//         )}

//         <InterviewEvaluationCard
//           status="completed"
//           evaluation={selectedEvaluation}
//         />
//       </section>
//     );
//   }

//   return (
//     <section className="space-y-8 text-white">
//       {/* Summary */}
//       <div className="grid gap-4 sm:grid-cols-3">
//         <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
//           <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />

//           <CardContent className="p-5 sm:p-6">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//                 Completed interviews
//               </p>

//               <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
//                 <FileText className="size-5" />
//               </div>
//             </div>

//             <p className="mt-4 text-3xl font-extrabold tabular-nums text-indigo-400">
//               {pagination.total}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Saved evaluation reports
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
//           <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

//           <CardContent className="p-5 sm:p-6">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//                 Average score
//               </p>

//               <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
//                 <TrendingUp className="size-5" />
//               </div>
//             </div>

//             <p className="mt-4 text-3xl font-extrabold tabular-nums text-indigo-400">
//               {averageScore == null ? "—" : `${averageScore}/100`}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Across scored reports on this page
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
//           <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />

//           <CardContent className="p-5 sm:p-6">
//             <div className="flex items-center justify-between">
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//                 Best score
//               </p>

//               <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
//                 <Trophy className="size-5" />
//               </div>
//             </div>

//             <p className="mt-4 text-3xl font-extrabold tabular-nums text-indigo-400">
//               {bestScore == null ? "—" : `${bestScore}/100`}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Highest score on this page
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Heading */}
//       <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
//         <div>
//           <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
//             <Sparkles className="size-3.5" />
//             <span>Your progress</span>
//           </div>

//           <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
//             Interview history
//           </h2>

//           <p className="mt-1 text-sm text-slate-400">
//             Review your scores across all five evaluation dimensions.
//           </p>
//         </div>

//         <Badge
//           variant="outline"
//           className="border-white/10 bg-white/5 px-3 py-1 text-slate-300"
//         >
//           {pagination.total === 0
//             ? "No reports yet"
//             : `Page ${pagination.page} of ${Math.max(
//                 1,
//                 pagination.totalPages,
//               )}`}
//         </Badge>
//       </div>

//       {error && (
//         <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
//           <p className="flex-1">{error}</p>

//           <button
//             type="button"
//             onClick={() => loadPage(pagination.page)}
//             className="font-medium underline hover:text-white"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Empty state */}
//       {items.length === 0 ? (
//         <Card className="rounded-3xl border border-dashed border-white/15 bg-[#11162B]/60 p-8 text-center sm:p-12">
//           <CardContent className="flex flex-col items-center p-0">
//             <div className="flex size-16 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
//               <Target className="size-8" />
//             </div>

//             <h3 className="mt-5 text-lg font-bold">
//               No completed evaluations yet
//             </h3>

//             <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
//               Once you complete a mock interview and its evaluation is
//               generated, your scores and detailed feedback will appear here.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {items.map((item) => {
//             const duration = formatDuration(item.transcript?.durationSeconds);

//             const interviewDate =
//               item.transcript?.endedAt ??
//               item.transcript?.startedAt ??
//               item.evaluatedAt ??
//               item.createdAt;

//             return (
//               <article
//                 key={item.id}
//                 className="group overflow-hidden rounded-2xl border border-white/10 bg-[#11162B]/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#151b35] hover:shadow-indigo-950/20"
//               >
//                 <div className="space-y-5 p-5 sm:p-6">
//                   {/* Session header and overall score */}
//                   <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//                     <div className="flex min-w-0 items-start gap-4">
//                       <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
//                         <FileText className="size-5" />
//                       </div>

//                       <div className="min-w-0 space-y-2">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <h3 className="font-bold text-white">
//                             Mock interview
//                           </h3>

//                           <Badge
//                             variant="outline"
//                             className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
//                           >
//                             Completed
//                           </Badge>
//                         </div>

//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
//                           <span className="inline-flex items-center gap-1.5">
//                             <CalendarDays className="size-3.5 text-indigo-400" />
//                             {formatDate(interviewDate)}
//                           </span>

//                           {duration && (
//                             <span className="inline-flex items-center gap-1.5">
//                               <Clock3 className="size-3.5 text-indigo-400" />
//                               {duration}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4 sm:justify-end sm:border-0 sm:pt-0">
//                       <div className="sm:text-right">
//                         <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                           Overall score
//                         </p>

//                         <p className="mt-1 text-2xl font-extrabold tabular-nums text-indigo-300">
//                           {item.overallScore == null
//                             ? "—"
//                             : `${item.overallScore}/100`}
//                         </p>

//                         {item.grade && (
//                           <Badge
//                             variant="outline"
//                             className={`mt-1 ${getGradeColor(item.grade)}`}
//                           >
//                             {item.grade}
//                           </Badge>
//                         )}
//                       </div>

//                       <Link
//                         href={`/interview/mock-interviews/evaluation/${item.id}`}
//                         className="gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
//                       >
//                         {loadingReportId === item.id ? (
//                           <LoaderCircle className="size-4 animate-spin" />
//                         ) : (
//                           <ChevronRight className="size-4" />
//                         )}
//                         View report
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Actual evaluation dimension scores */}
//                   <div className="border-t border-white/[0.07] pt-5">
//                     <div className="mb-4 flex items-center justify-between gap-3">
//                       <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//                         Performance breakdown
//                       </p>

//                       <span className="text-[11px] text-slate-500">
//                         Out of 100
//                       </span>
//                     </div>

//                     <ScoreBreakdown evaluation={item} />
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       )}

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
//           <p className="text-sm text-slate-400">
//             Showing{" "}
//             <span className="font-semibold text-white">{items.length}</span> of{" "}
//             <span className="font-semibold text-white">{pagination.total}</span>{" "}
//             completed evaluations
//           </p>

//           <div className="flex items-center gap-2">
//             <Button
//               type="button"
//               variant="outline"
//               disabled={!pagination.hasPreviousPage || isPending}
//               onClick={() => loadPage(pagination.page - 1)}
//               className="gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white disabled:opacity-40"
//             >
//               <ArrowLeft className="size-4" />
//               Previous
//             </Button>

//             <Button
//               type="button"
//               variant="outline"
//               disabled={!pagination.hasNextPage || isPending}
//               onClick={() => loadPage(pagination.page + 1)}
//               className="gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white disabled:opacity-40"
//             >
//               Next
//               {isPending ? (
//                 <LoaderCircle className="size-4 animate-spin" />
//               ) : (
//                 <ArrowRight className="size-4" />
//               )}
//             </Button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  LoaderCircle,
  Target,
  Sparkles,
  Trophy,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import {
  getInterviewEvaluations,
  getInterviewEvaluation,
} from "@/actions/interview/evaluation/evaluation-action";

import InterviewEvaluationCard from "./InterviewEvaluation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InterviewEvaluation } from "@/types/interview-evalution";
import Link from "next/link";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type Props = {
  initialItems: InterviewEvaluation[];
  initialPagination?: Pagination;
};

const DIMENSIONS = [
  { key: "technicalAccuracy", label: "Technical accuracy" },
  { key: "problemSolving", label: "Problem solving" },
  { key: "communication", label: "Communication" },
  { key: "relevance", label: "Relevance" },
  { key: "depthOfKnowledge", label: "Knowledge depth" },
] as const;

type DimensionKey = (typeof DIMENSIONS)[number]["key"];

function formatDate(date?: string | null) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(seconds?: number | null) {
  if (seconds == null || seconds < 0) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds}s`;

  return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

function getScoreColor(score: number) {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 60) return "bg-indigo-400";
  if (score >= 40) return "bg-amber-400";
  return "bg-rose-400";
}

function getGradeColor(grade: string | null) {
  if (!grade) {
    return "border-white/10 bg-white/5 text-slate-400";
  }

  switch (grade.toLowerCase()) {
    case "excellent":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "good":
      return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
    case "average":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    case "needs improvement":
    case "poor":
      return "border-rose-400/20 bg-rose-400/10 text-rose-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

function ScoreBreakdown({ evaluation }: { evaluation: InterviewEvaluation }) {
  return (
    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
      {DIMENSIONS.map((dimension) => {
        const score = evaluation[dimension.key as DimensionKey];

        return (
          <div key={dimension.key} className="min-w-0 space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[11px] font-medium text-slate-400">
                {dimension.label}
              </span>

              <span className="shrink-0 text-xs font-bold tabular-nums text-indigo-200">
                {score == null ? "—" : `${score}%`}
              </span>
            </div>

            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"
              role="progressbar"
              aria-label={dimension.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score ?? undefined}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score == null ? "bg-transparent" : getScoreColor(score)
                }`}
                style={{
                  width: `${Math.min(100, Math.max(0, score ?? 0))}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function InterviewEvaluationList({
  initialItems,
  initialPagination,
}: Props) {
  const [items, setItems] = useState<InterviewEvaluation[]>(initialItems);
  const [pagination, setPagination] = useState<Pagination>(
    initialPagination ?? {
      page: 1,
      limit: 10,
      total: initialItems.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  );

  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [loadingReportId, setLoadingReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const scoredItems = items.filter((item) => item.overallScore != null);

  const averageScore =
    scoredItems.length > 0
      ? Math.round(
          scoredItems.reduce((total, item) => total + item.overallScore!, 0) /
            scoredItems.length,
        )
      : null;

  const bestScore =
    scoredItems.length > 0
      ? Math.max(...scoredItems.map((item) => item.overallScore!))
      : null;

  async function loadPage(page: number) {
    setError(null);

    startTransition(async () => {
      try {
        const result = await getInterviewEvaluations(page, pagination.limit);

        if (!result.success) {
          setError(
            Array.isArray(result.error)
              ? result.error.join(", ")
              : result.error || "Unable to load evaluations.",
          );
          return;
        }

        setItems(result.data?.items ?? []);

        if (result.data?.pagination) {
          setPagination(result.data.pagination);
        }
      } catch {
        setError("Unable to load evaluations. Please try again.");
      }
    });
  }

  if (selectedEvaluation) {
    return (
      <section className="space-y-6 text-white">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedEvaluation(null);
            setError(null);
          }}
          className="group gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          All Evaluations
        </Button>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        <InterviewEvaluationCard
          status="completed"
          evaluation={selectedEvaluation}
        />
      </section>
    );
  }

  return (
    <section className="space-y-8 text-white">
      {/* Summary Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Completed Interviews
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                <FileText className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-indigo-300">
              {pagination.total}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Saved evaluation reports
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Average Score
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <TrendingUp className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-violet-300">
              {averageScore == null ? "—" : `${averageScore}/100`}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Across scored reports on this page
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Best Score
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                <Trophy className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-emerald-300">
              {bestScore == null ? "—" : `${bestScore}/100`}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Highest score on this page
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Heading Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {/* <Sparkles className="size-3.5" /> */}
            <span>Your Progress Archive</span>
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl text-white">
            Interview History
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Review your scores across all five core technical dimensions.
          </p>
        </div>

        <Badge
          variant="outline"
          className="border-white/10 bg-white/5 px-3 py-1 text-slate-300 text-xs"
        >
          {pagination.total === 0
            ? "No reports yet"
            : `Page ${pagination.page} of ${Math.max(
                1,
                pagination.totalPages,
              )}`}
        </Badge>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <p className="flex-1">{error}</p>
          <button
            type="button"
            onClick={() => loadPage(pagination.page)}
            className="font-medium underline hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 ? (
        <Card className="rounded-3xl border border-dashed border-white/15 bg-[#11162B]/60 p-12 text-center backdrop-blur-xl">
          <CardContent className="flex flex-col items-center p-0">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
              <Target className="size-8" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">
              No completed evaluations yet
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              Once you complete a mock interview and its evaluation is generated, your scores and detailed feedback will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const duration = formatDuration(item.transcript?.durationSeconds);
            const interviewDate =
              item.transcript?.endedAt ??
              item.transcript?.startedAt ??
              item.evaluatedAt ??
              item.createdAt;

            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#11162B]/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#151b35]"
              >
                <div className="space-y-5 p-5 sm:p-6">
                  {/* Top Row: Meta info & Primary Overall Score */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-inner">
                        <FileText className="size-5" />
                      </div>

                      <div className="min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-bold text-white text-base">
                            Mock Interview Assessment
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-[11px]"
                          >
                            Completed
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-3.5 text-indigo-400" />
                            {formatDate(interviewDate)}
                          </span>

                          {duration && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 className="size-3.5 text-indigo-400" />
                              {duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t border-white/5 pt-4 sm:justify-end sm:border-0 sm:pt-0">
                      <div className="sm:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Overall Score
                        </p>
                        <p className="mt-0.5 text-2xl font-extrabold tabular-nums text-indigo-300">
                          {item.overallScore == null
                            ? "—"
                            : `${item.overallScore}/100`}
                        </p>
                        {item.grade && (
                          <Badge
                            variant="outline"
                            className={`mt-1 text-[10px] px-2 py-0 ${getGradeColor(item.grade)}`}
                          >
                            {item.grade}
                          </Badge>
                        )}
                      </div>

                      <Link
                        href={`/interview/mock-interviews/evaluation/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] hover:shadow-indigo-600/40"
                      >
                        {loadingReportId === item.id ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <ChevronRight className="size-4" />
                        )}
                        <span>View Report</span>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Row: Score Breakdown Grid */}
                  <div className="border-t border-white/[0.07] pt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Performance Breakdown
                    </p>
                    <ScoreBreakdown evaluation={item} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{items.length}</span> of{" "}
            <span className="font-semibold text-white">{pagination.total}</span> completed evaluations
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!pagination.hasPreviousPage || isPending}
              onClick={() => loadPage(pagination.page - 1)}
              className="gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={!pagination.hasNextPage || isPending}
              onClick={() => loadPage(pagination.page + 1)}
              className="gap-2 rounded-xl border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white disabled:opacity-40"
            >
              Next
              {isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}