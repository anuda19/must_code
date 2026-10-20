
import {
  AudioLines,
  BrainCircuit,
  ChartNoAxesCombined,
  Code2,
  ListChecks,
  Route,
} from "lucide-react";

const features = [
  {
    icon: Route,
    title: "Personalized roadmap",
    description:
      "Focus on the topics and skills that matter for your target role and experience level.",
    accent: "text-indigo-200 bg-indigo-300/10 border-indigo-200/15",
  },
  {
    icon: BrainCircuit,
    title: "AI mock interviews",
    description:
      "Practice interview-style conversations with questions tailored to your preparation goals.",
    accent: "text-violet-200 bg-violet-300/10 border-violet-200/15",
  },
  {
    icon: Code2,
    title: "Coding practice",
    description:
      "Work through coding challenges and strengthen your problem-solving approach.",
    accent: "text-cyan-200 bg-cyan-300/10 border-cyan-200/15",
  },
  {
    icon: AudioLines,
    title: "Voice-based practice",
    description:
      "Practice explaining your decisions and communicating your thought process aloud.",
    accent: "text-indigo-200 bg-indigo-300/10 border-indigo-200/15",
  },
  {
    icon: ListChecks,
    title: "Structured preparation",
    description:
      "Break a large interview goal into smaller topics and actionable practice sessions.",
    accent: "text-cyan-200 bg-cyan-300/10 border-cyan-200/15",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Performance insights",
    description:
      "Review feedback after your practice session and identify areas to improve next.",
    accent: "text-violet-200 bg-violet-300/10 border-violet-200/15",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/[0.06] bg-[#0a0c15] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300">
              BUILT FOR YOUR NEXT MOVE
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl lg:text-5xl">
              More than just mock interviews.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            Bring your preparation, practice, and progress into one focused
            experience.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/[0.07] bg-[#0d101b] p-6 transition-all duration-300 hover:border-indigo-300/20 hover:bg-[#101321] sm:p-7"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-xl border ${feature.accent}`}
                >
                  <Icon className="size-5" strokeWidth={1.7} />
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-indigo-300/20 via-white/[0.04] to-transparent transition-colors group-hover:from-indigo-300/40" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
