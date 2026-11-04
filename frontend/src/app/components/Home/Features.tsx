
import {
  AudioLines,
  BrainCircuit,
  ChartNoAxesCombined,
  ClipboardList,
  Target,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "Profile-driven preparation",
    description:
      "Set your target role, experience level, company, and technical skills to give your interview preparation a clear direction.",
    iconStyle: "bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]",
  },
  {
    icon: BrainCircuit,
    title: "AI technical interviews",
    description:
      "Practice with an AI interviewer that asks relevant technical questions and adapts the conversation to your preparation profile.",
    iconStyle: "bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]",
  },
  {
    icon: AudioLines,
    title: "Real-time voice practice",
    description:
      "Answer questions naturally, explain your reasoning aloud, and get comfortable communicating technical decisions.",
    iconStyle: "bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]",
  },
  {
    icon: ClipboardList,
    title: "Interview transcripts",
    description:
      "Revisit your interview conversations and understand how you approached each technical question.",
    iconStyle: "bg-[var(--clay-sage)] text-[var(--clay-sage-ink)]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "AI-powered evaluations",
    description:
      "Get a structured assessment of your technical accuracy, problem-solving, communication, relevance, and depth of knowledge.",
    iconStyle: "bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]",
  },
  {
    icon: Target,
    title: "Focused improvement",
    description:
      "Identify strengths and improvement areas from your interview reports so your next practice session has a clear purpose.",
    iconStyle: "bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-5 py-20 text-[var(--clay-ink)] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--clay-coral-shadow)]">
              BUILT AROUND YOUR INTERVIEW GOALS
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Everything you need to
              <br className="hidden sm:block" /> practice with purpose.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            From your first profile setup to your post-interview evaluation,
            bring your technical interview preparation into one focused
            experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 shadow-[inset_4px_4px_9px_#fff,6px_8px_0_#ecd8c3,0_14px_24px_rgb(101_70_49/6%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_4px_4px_9px_#fff,7px_10px_0_#ecd8c3,0_18px_28px_rgb(101_70_49/9%)] sm:p-7"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl border border-[var(--clay-border)] shadow-[inset_2px_2px_5px_rgb(255_255_255/80%),2px_3px_0_rgb(101_70_49/8%)] ${feature.iconStyle}`}
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-lg font-extrabold tracking-tight text-[var(--clay-ink)]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--clay-muted)]">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[var(--clay-peach-shadow)]/60 via-[var(--clay-border)] to-transparent transition-all duration-300 group-hover:from-[var(--clay-primary)]/70" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
