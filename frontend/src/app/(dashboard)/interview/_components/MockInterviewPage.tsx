import {
  Mic,
  Check,
  AlertCircle,
  LoaderCircle,
  FileText,
  Clock,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InterviewEvaluationCard from "./InterviewEvaluation";
import Link from "next/link";

export default function MockInterviewPage({
  ended,
  loading,
  error,
  startInterview,
  evaluationStatus,
  evaluationResult,
  evaluationError,
  onViewPastReports, // Handler to open past reports/history page or modal
}: any) {
  return (
    <main className="relative min-h-screen w-full bg-[#0A0D18] px-4 py-4 text-white antialiased sm:px-8">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Top Header Bar */}
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <span>AI Assessment Portal</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mock Interview
            </h1>
          </div>

          {/* Top-Right Action Button */}
          <Link
            href={"/interview/mock-interviews/evaluation"}
            className="group flex items-center justify-center gap-2 px-2 py-1 rounded-xl border-white/15 bg-white/5 text-sm font-medium text-slate-200 backdrop-blur-md hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white transition-all duration-200"
          >
            <FileText className="size-4 text-indigo-400 transition-transform group-hover:scale-110" />
            <span>View Full Reports</span>
            <ArrowRight className="size-3 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Primary Launcher & Evaluation */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="relative overflow-hidden border border-white/10 bg-[#11162B]/80 backdrop-blur-xl text-white shadow-2xl shadow-indigo-950/30">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-md" />
                  <div className="relative flex size-20 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 text-indigo-300 shadow-inner">
                    {ended ? (
                      <Check className="size-9 text-emerald-400" />
                    ) : (
                      <Mic className="size-9 text-indigo-300" />
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {ended ? "Interview Completed!" : "Ready for your session?"}
                </h2>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300/80">
                  {ended
                    ? "Great job finishing your mock interview. Review your performance breakdown below."
                    : "Practice real-time technical scenarios with our interactive voice AI interviewer. Find a quiet space and enable your microphone to begin."}
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mt-6 flex w-full items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-left text-xs sm:text-sm text-rose-300 backdrop-blur-md"
                  >
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-400" />
                    <div className="flex-1 leading-snug">{error}</div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={startInterview}
                  disabled={loading}
                  className="group relative mt-8 h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-300 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoaderCircle className="size-5 animate-spin text-white" />
                      <span>Connecting to LiveKit...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Mic className="size-4" />
                      <span>
                        {ended ? "Retake Interview" : "Start Interview Now"}
                      </span>
                    </div>
                  )}
                </Button>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="size-3.5 text-slate-400" />
                  <span>
                    Microphone access requested on start. Audio is encrypted.
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Evaluation Results (Appears after completion) */}
          </div>

          {/* Right Column: Key Details & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            {/* Session Parameters Overview */}
            <Card className="border border-white/10 bg-[#11162B]/50 backdrop-blur-md p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Session Overview
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="size-3.5 text-indigo-400" />
                    <span>Duration</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">
                    ~ 15 Mins
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Volume2 className="size-3.5 text-indigo-400" />
                    <span>Format</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Interactive Voice
                  </p>
                </div>
              </div>
            </Card>

            {/* Preparation Checklist */}
            <Card className="border border-white/10 bg-[#11162B]/50 backdrop-blur-md p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Pre-Interview Checklist
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
                  <span>Choose a quiet place.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
                  <span>
                    Use headphones or ear-buds to prevent echo during the live
                    conversation.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
                  <span>
                    Instant AI feedback and detailed scoring will be generated
                    immediately after.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
