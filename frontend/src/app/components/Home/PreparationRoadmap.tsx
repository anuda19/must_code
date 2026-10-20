
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

const roadmap = [
  {
    day: "01",
    title: "Core concepts",
    subtitle: "Build your foundations",
    icon: BookOpen,
    status: "START HERE",
    active: true,
  },
  {
    day: "02",
    title: "Problem solving",
    subtitle: "Practice patterns and coding",
    icon: Code2,
    status: "UP NEXT",
    active: false,
  },
  {
    day: "03",
    title: "Mock interview",
    subtitle: "Put your knowledge into practice",
    icon: Layers3,
    status: "PRACTICE",
    active: false,
  },
];

export default function PreparationRoadmap() {
  return (
    <section
      id="roadmap"
      className="overflow-hidden border-t border-white/[0.06] bg-[#0a0c15] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d101b] p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full bg-indigo-500/[0.09] blur-[70px]" />

            <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.17em] text-indigo-300">
                  YOUR PREPARATION
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Learning roadmap
                </h3>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-200/15 bg-indigo-300/10 text-indigo-200">
                <Sparkles className="size-4" />
              </div>
            </div>

            <div className="relative mt-6 space-y-3">
              <div className="absolute bottom-8 left-[21px] top-8 w-px bg-gradient-to-b from-indigo-300/50 via-violet-300/25 to-white/[0.04]" />

              {roadmap.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.day}
                    className={`relative flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                      item.active
                        ? "border-indigo-300/20 bg-indigo-300/[0.055]"
                        : "border-white/[0.05] bg-white/[0.015]"
                    }`}
                  >
                    <div
                      className={`relative z-10 flex size-[42px] shrink-0 items-center justify-center rounded-xl border ${
                        item.active
                          ? "border-indigo-200/20 bg-[#17182d] text-indigo-200"
                          : "border-white/[0.07] bg-[#11131e] text-slate-500"
                      }`}
                    >
                      <Icon className="size-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] text-slate-500">
                          STEP {item.day}
                        </span>
                        {item.active && (
                          <span className="rounded-full border border-indigo-200/15 bg-indigo-300/[0.08] px-2 py-0.5 text-[9px] font-medium text-indigo-200">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 text-sm font-medium text-slate-100">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 text-slate-500">
                      {item.active ? (
                        <CheckCircle2 className="size-4 text-indigo-200" />
                      ) : (
                        <Circle className="size-4" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-cyan-200/10 bg-cyan-300/[0.035] p-4">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-200" />
              <p className="text-xs leading-6 text-slate-400">
                Start with a clear goal. Build confidence one focused practice
                session at a time.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300">
            KNOW WHAT TO DO NEXT
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Turn preparation
            <br />
            into a clear plan.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            Preparing for interviews can feel overwhelming when everything
            seems important. A structured roadmap helps you break your goal
            into focused, manageable steps.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                title: "Know your focus",
                text: "Organize your preparation around your target role.",
              },
              {
                title: "Practice with intention",
                text: "Pair learning with hands-on problems and interview simulations.",
              },
              {
                title: "Keep improving",
                text: "Use your session feedback to decide what to work on next.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-200" />
                <div>
                  <h3 className="text-sm font-medium text-slate-200">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-300/25 hover:bg-white/[0.06]"
          >
            Build your preparation plan
            <ArrowRight className="size-4 text-indigo-200 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}