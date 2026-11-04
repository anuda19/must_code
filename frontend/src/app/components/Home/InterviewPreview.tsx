
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Bot,
  Check,
  CircleHelp,
  Code2,
  Mic,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

const promptLines = [
  { width: "w-full", opacity: "bg-[var(--clay-sage-shadow)]" },
  { width: "w-[83%]", opacity: "bg-[var(--clay-blue-ink)]/45" },
  { width: "w-[92%]", opacity: "bg-[var(--clay-sage-shadow)]/70" },
  { width: "w-[62%]", opacity: "bg-[var(--clay-blue-ink)]/35" },
];

const benefits = [
  "Questions tailored to your interview profile",
  "Real-time voice-based interview practice",
  "Saved conversations and structured evaluations",
];

export default function InterviewPreview() {
  return (
    <section
      id="practice"
      className="relative overflow-hidden border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-5 py-20 text-[var(--clay-ink)] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[460px] rounded-full bg-[var(--clay-blue)]/60 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Content */}
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--clay-blue-ink)]">
            PRACTICE WITH PURPOSE
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Get comfortable
            <br />
            <span className="text-[var(--clay-coral-shadow)]">
              being challenged.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            Technical interviews test more than what you know. They test how
            you approach unfamiliar problems, explain your reasoning, and
            respond to follow-up questions. Practice those skills through
            realistic AI-led conversations.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)] shadow-[inset_1px_1px_3px_#fff]">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>

                <span className="text-sm leading-6 text-[var(--clay-muted)]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.register}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#e8795b] bg-[var(--clay-primary)] px-5 py-3 text-sm font-extrabold text-[var(--clay-primary-ink)] shadow-[inset_3px_3px_6px_rgb(255_255_255/50%),0_4px_0_#d86649] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:shadow-[inset_3px_3px_6px_rgb(255_255_255/50%),0_1px_0_#d86649]"
          >
            Try an AI interview
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Illustrative Interview UI */}
        <div className="relative mx-auto w-full min-w-0 max-w-[600px]">
          <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[var(--clay-peach)]/45 blur-2xl" />

          <div className="relative overflow-hidden rounded-[26px] border border-[var(--clay-border)] bg-[var(--clay-surface)] shadow-[inset_5px_5px_12px_#fff,9px_12px_0_#ecd8c3,0_25px_45px_rgb(101_70_49/9%)]">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[var(--clay-border)] px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)] shadow-[inset_2px_2px_5px_rgb(255_255_255/60%),2px_3px_0_#e5b9a4]">
                  <Bot className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-[var(--clay-ink)]">
                    AI Mock Interview
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--clay-subtle)]">
                    Frontend Engineering
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />
                <span className="text-[10px] font-bold text-[var(--clay-green-ink)]">
                  Preview
                </span>
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_155px]">
              {/* Main Question */}
              <div className="min-w-0 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.16em] text-[var(--clay-subtle)]">
                    TECHNICAL QUESTION
                  </span>
                  <MoreHorizontal className="size-4 text-[var(--clay-subtle)]" />
                </div>

                <h3 className="mt-5 text-lg font-extrabold leading-7 text-[var(--clay-ink)] sm:text-xl">
                  How would you optimize a React application rendering
                  thousands of items?
                </h3>

                {/* Thinking Prompt */}
                <div className="mt-6 rounded-2xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] p-4 shadow-[inset_3px_3px_7px_rgb(255_255_255/75%),inset_-3px_-3px_7px_rgb(77_129_155/8%)]">
                  <div className="flex items-center gap-2 text-[var(--clay-blue-ink)]">
                    <CircleHelp className="size-4" />
                    <span className="text-xs font-extrabold">
                      Think through your approach
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {promptLines.map((line, index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full ${line.width} ${line.opacity}`}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-[10px] leading-5 text-[var(--clay-muted)]">
                    Consider rendering cost, profiling, and list
                    virtualization.
                  </p>
                </div>

                {/* Candidate Response */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-bg)] p-3 shadow-[inset_3px_3px_6px_#ead0c0,inset_-3px_-3px_6px_#fff6e9]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]">
                    <AudioLines className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-[var(--clay-ink)]">
                      Your response
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-[var(--clay-subtle)]">
                      Explain your reasoning out loud
                    </p>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]">
                    <Mic className="size-4" />
                  </div>
                </div>
              </div>

              {/* Session Context */}
              <aside className="border-t border-[var(--clay-border)] bg-[var(--clay-surface-warm)]/70 p-4 sm:border-l sm:border-t-0 sm:p-5">
                <p className="text-[10px] font-extrabold tracking-[0.15em] text-[var(--clay-subtle)]">
                  SESSION FOCUS
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-sage)] text-[var(--clay-sage-ink)]">
                    <Code2 className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--clay-ink)]">
                    Technical skills
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]">
                    <AudioLines className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--clay-ink)]">
                    Voice practice
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-3 shadow-[inset_2px_2px_5px_#fff,2px_3px_0_#ecd8c3]">
                  <p className="text-xs font-extrabold text-[var(--clay-ink)]">
                    Interview tip
                  </p>
                  <p className="mt-2 text-[10px] leading-5 text-[var(--clay-muted)]">
                    Take your time. Explain the reasoning behind your answer,
                    not just the final solution.
                  </p>
                </div>
              </aside>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--clay-border)] px-4 py-3.5 sm:px-5">
              <span className="text-[10px] font-medium text-[var(--clay-subtle)]">
                Illustrative interface
              </span>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--clay-green-ink)]">
                <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />
                Practice at your pace
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}