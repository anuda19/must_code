
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Check,
  CircleHelp,
  Code2,
  Mic,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

const promptLines = [
  { width: "w-full", opacity: "bg-indigo-200/70" },
  { width: "w-[83%]", opacity: "bg-indigo-200/45" },
  { width: "w-[92%]", opacity: "bg-indigo-200/55" },
  { width: "w-[62%]", opacity: "bg-indigo-200/35" },
];

export default function InterviewPreview() {
  return (
    <section
      id="practice"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#080a12] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[480px] rounded-full bg-violet-600/[0.08] blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200">
            PRACTICE WITH PURPOSE
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Get comfortable
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              being challenged.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            An interview is more than getting the right answer. Practice
            breaking down questions, communicating your reasoning, and
            responding to follow-ups.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Role-focused interview questions",
              "Space to explain your thinking",
              "Session review and actionable feedback",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200">
                  <Check className="size-3" />
                </span>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition-colors hover:text-cyan-200"
          >
            Start preparing
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Illustrative interview UI */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="absolute -inset-5 rounded-[30px] bg-indigo-500/[0.07] blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0c0f1a] shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl border border-indigo-200/15 bg-indigo-300/10 text-indigo-200">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Mock interview
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Frontend engineering
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-emerald-300" />
                <span className="text-[10px] text-emerald-200">Preview</span>
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[1fr_155px]">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-slate-500">
                    QUESTION 01
                  </span>
                  <MoreHorizontal className="size-4 text-slate-500" />
                </div>

                <h3 className="mt-5 text-lg font-medium leading-7 text-slate-100">
                  How would you optimize a React application rendering
                  thousands of items?
                </h3>

                <div className="mt-6 rounded-xl border border-indigo-300/15 bg-indigo-300/[0.04] p-4">
                  <div className="flex items-center gap-2 text-indigo-200">
                    <CircleHelp className="size-4" />
                    <span className="text-xs font-medium">
                      Think through your approach
                    </span>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {promptLines.map((line, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full ${line.width} ${line.opacity}`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] leading-5 text-slate-500">
                    Consider rendering cost, profiling, and list
                    virtualization.
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#101321] p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                    <AudioLines className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-200">
                      Your response
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Explain your reasoning out loud
                    </p>
                  </div>
                  <Mic className="size-4 text-cyan-200" />
                </div>
              </div>

              <aside className="border-t border-white/[0.07] bg-white/[0.015] p-5 sm:border-l sm:border-t-0">
                <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-500">
                  SESSION TOOLS
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-violet-300/10 text-violet-200">
                    <Code2 className="size-4" />
                  </div>
                  <span className="text-xs text-slate-300">Problem solving</span>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                    <AudioLines className="size-4" />
                  </div>
                  <span className="text-xs text-slate-300">Voice practice</span>
                </div>

                <div className="mt-7 rounded-xl border border-white/[0.07] bg-[#101321] p-3">
                  <p className="text-xs font-medium text-slate-200">
                    Stay focused
                  </p>
                  <p className="mt-2 text-[10px] leading-5 text-slate-500">
                    Take your time. Explain the why, not just the answer.
                  </p>
                </div>
              </aside>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3.5">
              <span className="text-[10px] text-slate-500">
                Illustrative interface
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-indigo-200">
                <span className="size-1.5 rounded-full bg-indigo-300" />
                Practice at your pace
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}