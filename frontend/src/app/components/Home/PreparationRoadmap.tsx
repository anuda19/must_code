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
  },
  {
    icon: BrainCircuit,
    title: "Problem-solving",
    description: "How you approach problems and develop solutions.",
  },
  {
    icon: MessageSquareText,
    title: "Communication",
    description: "How clearly you explain your reasoning.",
  },
  {
    icon: Target,
    title: "Relevance and depth",
    description:
      "How well your answers address the question and demonstrate understanding.",
  },
];

const improvementPoints = [
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
];

export default function PreparationRoadmap() {
  return (
    <section
      id="evaluation"
      className="overflow-hidden border-t border-border bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Evaluation Preview */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:p-7">
            <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full bg-primary/10 blur-[70px]" />

            {/* Preview Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.17em] text-primary">
                  INTERVIEW REPORT
                </p>

                <h3 className="mt-2 text-lg font-bold text-card-foreground">
                  Performance evaluation
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Understand your interview performance
                </p>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <ClipboardCheck className="size-5" />
              </div>
            </div>

            {/* Evaluation Areas */}
            <div className="relative mt-6 space-y-3">
              {evaluationAreas.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5 transition-colors hover:border-primary/30 sm:gap-4 sm:p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="size-4.5" strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-foreground">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <CheckCircle2
                      className="size-4 shrink-0 text-primary"
                      aria-label={`Evaluation area ${index + 1}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Transcript Preview */}
            <div className="relative mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-primary">
                <AudioLines className="size-4" />
                <p className="text-xs font-bold">
                  Your interview conversation
                </p>
              </div>

              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Revisit your saved responses and review the discussion behind
                your evaluation.
              </p>
            </div>

            <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
              <p className="text-xs font-semibold leading-5 text-foreground">
                Turn feedback into a more focused next practice session.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold tracking-[0.2em] text-primary">
            UNDERSTAND YOUR PERFORMANCE
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Know what went well.
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Know what to improve.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Finishing an interview is only part of the process. Understanding
            your answers is what helps you improve. XCode evaluates different
            aspects of your interview so you can look beyond a single score.
          </p>

          <div className="mt-8 space-y-5">
            {improvementPoints.map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.register}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/5 active:translate-y-0"
          >
            Start your interview preparation
            <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}