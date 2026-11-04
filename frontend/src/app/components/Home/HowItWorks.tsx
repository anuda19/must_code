
import {
  ArrowUpRight,
  ClipboardCheck,
  Mic2,
  UserRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "Build your profile",
    description:
      "Choose your target role, experience level, target company, and technical skills. Your profile gives the AI interviewer the context it needs.",
    tag: "YOUR INTERVIEW GOAL",
  },
  {
    number: "02",
    icon: Mic2,
    title: "Start an AI interview",
    description:
      "Join a real-time voice interview, answer technical questions, and explain your approach just as you would in an actual interview.",
    tag: "REAL-TIME PRACTICE",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Review your evaluation",
    description:
      "Explore your interview report, review your conversation, and understand which areas need more attention.",
    tag: "ACTIONABLE FEEDBACK",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-[var(--clay-border)] bg-[var(--clay-surface)] px-5 py-20 text-[var(--clay-ink)] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-10 size-96 rounded-full bg-[var(--clay-peach)]/30 blur-[110px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--clay-coral-shadow)]">
            HOW XCODE WORKS
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            From your profile
            <br className="hidden sm:block" /> to interview feedback.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            A straightforward way to practice technical interviews, understand
            your performance, and work towards your next opportunity.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-[var(--clay-peach-shadow)] via-[var(--clay-primary)]/50 to-[var(--clay-sage-shadow)] md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-bg)] p-6 shadow-[inset_4px_4px_9px_#fff,6px_8px_0_#ecd8c3,0_14px_24px_rgb(101_70_49/5%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_4px_4px_9px_#fff,7px_10px_0_#ecd8c3,0_18px_28px_rgb(101_70_49/8%)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-coral-shadow)] shadow-[inset_3px_3px_6px_#fff,3px_4px_0_#e5b9a4] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-extrabold tabular-nums text-[var(--clay-subtle)]/70">
                    {step.number}
                  </span>
                </div>

                <p className="mt-8 text-[10px] font-extrabold tracking-[0.16em] text-[var(--clay-coral-shadow)]">
                  {step.tag}
                </p>

                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--clay-ink)]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--clay-muted)]">
                  {step.description}
                </p>

                <div className="mt-7 flex items-center text-sm font-semibold text-[var(--clay-subtle)] transition-colors group-hover:text-[var(--clay-coral-shadow)]">
                  Step {step.number}
                  <ArrowUpRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
