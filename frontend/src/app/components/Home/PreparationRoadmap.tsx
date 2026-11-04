
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  MessageSquareText,
  Target,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

const evaluationAreas = [
  {
    icon: Code2,
    title: "Technical accuracy",
    description: "Correctness and understanding of technical concepts.",
    color: "bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]",
  },
  {
    icon: BrainCircuit,
    title: "Problem-solving",
    description: "How you approach problems and develop solutions.",
    color: "bg-[var(--clay-sage)] text-[var(--clay-sage-ink)]",
  },
  {
    icon: MessageSquareText,
    title: "Communication",
    description: "How clearly you explain your reasoning.",
    color: "bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]",
  },
  {
    icon: Target,
    title: "Relevance and depth",
    description: "How well your answers address the question and demonstrate understanding.",
    color: "bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]",
  },
];

export default function PreparationRoadmap() {
  return (
    <section
      id="evaluation"
      className="overflow-hidden border-t border-[var(--clay-border)] bg-[var(--clay-surface)] px-5 py-20 text-[var(--clay-ink)] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Evaluation Preview */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-[26px] border border-[var(--clay-border)] bg-[var(--clay-bg)] p-5 shadow-[inset_5px_5px_12px_#fff,8px_11px_0_#ecd8c3,0_22px_38px_rgb(101_70_49/7%)] sm:p-7">
            <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full bg-[var(--clay-peach)]/50 blur-[70px]" />

            {/* Preview Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-[var(--clay-border)] pb-5">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.17em] text-[var(--clay-coral-shadow)]">
                  INTERVIEW REPORT
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-[var(--clay-ink)]">
                  Performance evaluation
                </h3>

                <p className="mt-1 text-xs text-[var(--clay-subtle)]">
                  Understand your interview performance
                </p>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)] shadow-[inset_3px_3px_6px_#fff,3px_4px_0_#e5b9a4]">
                <ClipboardCheck className="size-5" />
              </div>
            </div>

            {/* Evaluation Areas */}
            <div className="relative mt-6 space-y-3">
              {evaluationAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-3.5 shadow-[inset_2px_2px_5px_#fff,2px_3px_0_rgb(101_70_49/7%)] sm:gap-4 sm:p-4"
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon className="size-4.5" strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-extrabold text-[var(--clay-ink)]">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
                        {item.description}
                      </p>
                    </div>

                    <CheckCircle2 className="size-4 shrink-0 text-[var(--clay-status)]" />
                  </div>
                );
              })}
            </div>

            {/* Transcript Preview */}
            <div className="relative mt-5 rounded-2xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] p-4 shadow-[inset_3px_3px_7px_rgb(255_255_255/75%),inset_-3px_-3px_7px_rgb(77_129_155/8%)]">
              <div className="flex items-center gap-2">
                <AudioLines className="size-4 text-[var(--clay-blue-ink)]" />
                <p className="text-xs font-extrabold text-[var(--clay-blue-ink)]">
                  Your interview conversation
                </p>
              </div>

              <p className="mt-2 text-xs leading-6 text-[var(--clay-muted)]">
                Revisit your saved responses and review the discussion behind
                your evaluation.
              </p>
            </div>

            <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] p-3.5">
              <CheckCircle2 className="size-5 shrink-0 text-[var(--clay-green-ink)]" />
              <p className="text-xs font-semibold leading-5 text-[var(--clay-green-ink)]">
                Turn feedback into a more focused next practice session.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--clay-coral-shadow)]">
            UNDERSTAND YOUR PERFORMANCE
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Know what went well.
            <br />
            <span className="text-[var(--clay-coral-shadow)]">
              Know what to improve.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            Finishing an interview is only part of the process. Understanding
            your answers is what helps you improve. XCode evaluates different
            aspects of your interview so you can look beyond a single score.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                title: "Understand your strengths",
                text: "See which parts of your technical interview demonstrate strong understanding.",
              },
              {
                title: "Identify improvement areas",
                text: "Recognize gaps in technical knowledge, problem-solving, and communication.",
              },
              {
                title: "Review your past sessions",
                text: "Use saved evaluations and interview conversations to reflect on your progress.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--clay-status)]" />

                <div>
                  <h3 className="text-sm font-extrabold text-[var(--clay-ink)]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--clay-muted)]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.register}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 py-3 text-sm font-extrabold text-[var(--clay-ink)] shadow-[inset_3px_3px_6px_rgb(255_255_255/75%),3px_4px_0_#e5b9a4] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--clay-coral-shadow)] active:translate-y-0.5 active:shadow-none"
          >
            Start your interview preparation
            <ArrowRight className="size-4 text-[var(--clay-coral-shadow)] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
