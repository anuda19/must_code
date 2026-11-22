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
      className="relative overflow-hidden border-t border-border bg-card px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-10 size-96 rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-primary">
            HOW XCODE WORKS
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            From your profile
            <br className="hidden sm:block" /> to interview feedback.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            A straightforward way to practice technical interviews, understand
            your performance, and work towards your next opportunity.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold tabular-nums text-muted-foreground/60">
                    {step.number}
                  </span>
                </div>

                <p className="mt-8 text-[10px] font-bold tracking-[0.16em] text-primary">
                  {step.tag}
                </p>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>

                <div className="mt-7 flex items-center text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary">
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
