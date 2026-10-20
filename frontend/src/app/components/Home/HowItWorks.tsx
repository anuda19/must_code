
import { ArrowUpRight, CalendarDays, Mic2, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Set your target",
    description:
      "Choose your target role, experience level, and company. Tell Must Code what you're working toward.",
    tag: "PERSONALIZED SETUP",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Follow your roadmap",
    description:
      "Get a structured preparation plan with focused topics and practice tasks to guide your progress.",
    tag: "CLEAR NEXT STEPS",
  },
  {
    number: "03",
    icon: Mic2,
    title: "Practice with AI",
    description:
      "Simulate interview conversations, explain your thinking out loud, and review your performance.",
    tag: "INTERVIEW READY",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#080a12] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 size-[360px] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300">
            HOW IT WORKS
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            A smarter way to prepare.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Go from not knowing where to start to practicing with a plan built
            around your next interview.
          </p>
        </div>

        <div className="relative mt-16 grid gap-4 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-indigo-400/10 via-indigo-300/30 to-cyan-300/10 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-white/[0.08] bg-[#0c0f1a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/25 hover:bg-[#101321] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-xl border border-indigo-300/20 bg-[#14172a] text-indigo-200 shadow-[0_0_24px_rgba(99,102,241,0.08)]">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </div>
                  <span className="text-sm font-medium tabular-nums text-slate-600">
                    {step.number}
                  </span>
                </div>

                <p className="mt-8 text-[10px] font-semibold tracking-[0.16em] text-cyan-200/70">
                  {step.tag}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center text-sm text-slate-500 transition-colors group-hover:text-indigo-200">
                  Step {step.number}
                  <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
