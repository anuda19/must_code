// import {
//   Mic,
//   Check,
//   AlertCircle,
//   LoaderCircle,
//   FileText,
//   Clock,
//   Volume2,
//   CheckCircle2,
//   ArrowRight,
//   ShieldCheck,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { ROUTES } from "@/lib/routes";

// export default function MockInterviewPage({
//   ended,
//   loading,
//   error,
//   startInterview,
// }: any) {
//   return (
//     <main className="relative min-h-screen w-full px-4 py-4 text-white antialiased sm:px-8">
//       <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
//       <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

//       <div className="mx-auto max-w-6xl space-y-8">
//         <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
//               <span>AI Assessment Portal</span>
//             </div>
//             <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
//               Mock Interview
//             </h1>
//           </div>

//           <Link
//             href={ROUTES.mock_interview.evaluation}
//             className="group flex items-center justify-center gap-2 px-2 py-1 rounded-xl border-white/15 bg-white/5 text-sm font-medium text-slate-200 backdrop-blur-md hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white transition-all duration-200"
//           >
//             <FileText className="size-4 text-indigo-400 transition-transform group-hover:scale-110" />
//             <span>View Full Reports</span>
//             <ArrowRight className="size-3 text-slate-400 transition-transform group-hover:translate-x-0.5" />
//           </Link>
//         </header>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//           <div className="lg:col-span-7 space-y-6">
//             <Card className="relative overflow-hidden border border-white/10 bg-[#11162B]/80 backdrop-blur-xl text-white shadow-2xl shadow-indigo-950/30">
//               <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

//               <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
//                 <div className="relative mb-6">
//                   <div className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-md" />
//                   <div className="relative flex size-20 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 text-indigo-300 shadow-inner">
//                     {ended ? (
//                       <Check className="size-9 text-emerald-400" />
//                     ) : (
//                       <Mic className="size-9 text-indigo-300" />
//                     )}
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
//                   {ended ? "Interview Completed!" : "Ready for your session?"}
//                 </h2>

//                 <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300/80">
//                   {ended
//                     ? "Great job finishing your mock interview. Review your performance breakdown below."
//                     : "Practice real-time technical scenarios with our interactive voice AI interviewer. Find a quiet space and enable your microphone to begin."}
//                 </p>

//                 {error && (
//                   <div
//                     role="alert"
//                     className="mt-6 flex w-full items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-left text-xs sm:text-sm text-rose-300 backdrop-blur-md"
//                   >
//                     <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-400" />
//                     <div className="flex-1 leading-snug">{error}</div>
//                   </div>
//                 )}

//                 <Button
//                   type="button"
//                   onClick={startInterview}
//                   disabled={loading}
//                   className="group relative mt-8 h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-300 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <LoaderCircle className="size-5 animate-spin text-white" />
//                       <span>Connecting to LiveKit...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center gap-2">
//                       <Mic className="size-4" />
//                       <span>
//                         {ended ? "Retake Interview" : "Start Interview Now"}
//                       </span>
//                     </div>
//                   )}
//                 </Button>

//                 <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
//                   <ShieldCheck className="size-3.5 text-slate-400" />
//                   <span>
//                     Microphone access requested on start. Audio is encrypted.
//                   </span>
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-5 space-y-6">
//             <Card className="border border-white/10 bg-[#11162B]/50 backdrop-blur-md p-6">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
//                 Session Overview
//               </h3>
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
//                   <div className="flex items-center gap-2 text-xs text-slate-400">
//                     <Clock className="size-3.5 text-indigo-400" />
//                     <span>Duration</span>
//                   </div>
//                   <p className="mt-1 text-sm font-semibold text-white">
//                     ~ 15 Mins
//                   </p>
//                 </div>
//                 <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
//                   <div className="flex items-center gap-2 text-xs text-slate-400">
//                     <Volume2 className="size-3.5 text-indigo-400" />
//                     <span>Format</span>
//                   </div>
//                   <p className="mt-1 text-sm font-semibold text-white">
//                     Interactive Voice
//                   </p>
//                 </div>
//               </div>
//             </Card>

//             <Card className="border border-white/10 bg-[#11162B]/50 backdrop-blur-md p-6">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
//                 Pre-Interview Checklist
//               </h3>
//               <ul className="mt-4 space-y-3">
//                 <li className="flex items-start gap-3 text-xs text-slate-300">
//                   <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
//                   <span>Choose a quiet place.</span>
//                 </li>
//                 <li className="flex items-start gap-3 text-xs text-slate-300">
//                   <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
//                   <span>
//                     Use headphones or ear-buds to prevent echo during the live
//                     conversation.
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3 text-xs text-slate-300">
//                   <CheckCircle2 className="mt-0.5 size-4 text-emerald-400 shrink-0" />
//                   <span>
//                     Instant AI feedback and detailed scoring will be generated
//                     immediately after.
//                   </span>
//                 </li>
//               </ul>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import {
  Mic,
  Check,
  AlertCircle,
  LoaderCircle,
  FileText,
  Clock,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BotIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

type MockInterviewPageProps = {
  ended: boolean;
  loading: boolean;
  error: string | null;
  startInterview: () => void;
};

export default function MockInterviewPage({
  ended,
  loading,
  error,
  startInterview,
}: MockInterviewPageProps) {
  return (
    <main className="relative min-h-screen w-full text-white antialiased sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[440px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[42%] right-0 -z-10 h-[340px] w-[340px] rounded-full bg-violet-600/[0.07] blur-[120px]"
      />

      <div className="mx-auto">
        <header className="flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div>
              <p className="flex gap-1 items-center text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
                <BotIcon className="size-4" />
                AI Assessment Portal
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Mock Interview
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Practice technical interviews with your AI interviewer.
              </p>
            </div>
          </div>

          <Link
            href={ROUTES.mock_interview.evaluation}
            className="group flex items-center justify-center gap-2 px-2 py-1 rounded-xl border-white/15 bg-white/5 text-sm font-medium text-slate-200 backdrop-blur-md hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white transition-all duration-200"
          >
            <FileText className="size-4 text-indigo-400 transition-transform group-hover:scale-110" />
            <span>View Full Reports</span>
            <ArrowRight className="size-3 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)] lg:items-start">
          <section aria-labelledby="interview-heading">
            <Card className="relative overflow-hidden border-white/[0.09] bg-[#111529]/90 text-white shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent"
              />

              <CardContent className="flex flex-col items-center px-5 py-9 text-center sm:px-10 sm:py-12">
                <div className="relative mb-6">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-[28px] bg-indigo-500/15 blur-xl"
                  />
                  <div className="relative grid size-[76px] place-items-center rounded-[22px] border border-indigo-300/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/[0.07] shadow-inner sm:size-[84px]">
                    {ended ? (
                      <Check className="size-9 text-emerald-400" />
                    ) : (
                      <Mic className="size-9 text-indigo-200" />
                    )}
                  </div>
                </div>

                <p className="mb-2 rounded-full border border-indigo-400/20 bg-indigo-500/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
                  {ended ? "Session completed" : "Voice interview"}
                </p>

                <h2
                  id="interview-heading"
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  {ended
                    ? "Ready for another attempt?"
                    : "Ready for your session?"}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  {ended
                    ? "Your previous session has ended. You can start another interview whenever you're ready."
                    : "Practice real-time technical scenarios with an interactive AI interviewer. Find a quiet space and allow microphone access when prompted."}
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mt-6 flex w-full items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/[0.07] p-4 text-left"
                  >
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-400" />
                    <p className="min-w-0 flex-1 text-sm leading-6 text-rose-200">
                      {error}
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={startInterview}
                  disabled={loading}
                  className="mt-8 h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all hover:brightness-110 hover:shadow-indigo-900/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-sm"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                      Connecting to interview...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 size-4" />
                      {ended ? "Start New Interview" : "Start Interview"}
                      <ArrowRight className="ml-1 size-4" />
                    </>
                  )}
                </Button>

                <div className="mt-5 flex items-start justify-center gap-2 text-left text-xs leading-5 text-slate-500">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-slate-400" />
                  <span>
                    Microphone access is requested when you start. Audio
                    transmission is handled through LiveKit.
                  </span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Session information */}
          <aside className="space-y-5">
            <Card className="border-white/[0.08] bg-[#111529]/70 text-white backdrop-blur-md">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Session Overview
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="size-4 text-indigo-300" />
                      Duration
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">
                      ~15 minutes
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Volume2 className="size-4 text-indigo-300" />
                      Format
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Interactive voice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/[0.08] bg-[#111529]/70 text-white backdrop-blur-md">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Before You Begin
                </h3>

                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Find a quiet space
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Reduce background noise for clearer conversations.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Use headphones
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Help prevent audio feedback and echo.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Answer naturally
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Take a moment to think before answering each question.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>

        <footer className="mt-7 flex flex-col gap-1 border-t border-white/[0.06] pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>AI Mock Interview · Voice session</span>
          <span>Your interview transcript is used for evaluation.</span>
        </footer>
      </div>
    </main>
  );
}
