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
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

const promptLines = [
  { width: "w-full", opacity: "bg-primary/60" },
  { width: "w-[83%]", opacity: "bg-primary/35" },
  { width: "w-[92%]", opacity: "bg-primary/50" },
  { width: "w-[62%]", opacity: "bg-primary/30" },
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
      className="relative overflow-hidden border-t border-border bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[460px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Content */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary">
            PRACTICE WITH PURPOSE
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Get comfortable
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              being challenged.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Technical interviews test more than what you know. They test how
            you approach unfamiliar problems, explain your reasoning, and
            respond to follow-up questions. Practice those skills through
            realistic AI-led conversations.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>

                <span className="text-sm leading-6 text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.register}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
          >
            Try an AI interview
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Illustrative Interview UI */}
        <div className="relative mx-auto w-full min-w-0 max-w-[600px]">
          <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-primary/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-card-foreground">
                    AI Mock Interview
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Frontend Engineering
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-primary">
                  Preview
                </span>
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_155px]">
              {/* Main Question */}
              <div className="min-w-0 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                    TECHNICAL QUESTION
                  </span>
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </div>

                <h3 className="mt-5 text-lg font-bold leading-7 text-card-foreground sm:text-xl">
                  How would you optimize a React application rendering
                  thousands of items?
                </h3>

                {/* Thinking Prompt */}
                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CircleHelp className="size-4" />
                    <span className="text-xs font-bold">
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

                  <p className="mt-4 text-[10px] leading-5 text-muted-foreground">
                    Consider rendering cost, profiling, and list
                    virtualization.
                  </p>
                </div>

                {/* Candidate Response */}
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <AudioLines className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground">
                      Your response
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                      Explain your reasoning out loud
                    </p>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Mic className="size-4" />
                  </div>
                </div>
              </div>

              {/* Session Context */}
              <aside className="border-t border-border bg-muted/40 p-4 sm:border-l sm:border-t-0 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground">
                  SESSION FOCUS
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Code2 className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Technical skills
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <AudioLines className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Voice practice
                  </span>
                </div>

                <div className="mt-6 rounded-xl border border-border bg-card p-3 shadow-sm">
                  <p className="text-xs font-bold text-card-foreground">
                    Interview tip
                  </p>
                  <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                    Take your time. Explain the reasoning behind your answer,
                    not just the final solution.
                  </p>
                </div>
              </aside>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3.5 sm:px-5">
              <span className="text-[10px] font-medium text-muted-foreground">
                Illustrative interface
              </span>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Practice at your pace
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}