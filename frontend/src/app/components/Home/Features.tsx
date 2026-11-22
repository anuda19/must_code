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
  },
  {
    icon: BrainCircuit,
    title: "AI technical interviews",
    description:
      "Practice with an AI interviewer that asks relevant technical questions and adapts the conversation to your preparation profile.",
  },
  {
    icon: AudioLines,
    title: "Real-time voice practice",
    description:
      "Answer questions naturally, explain your reasoning aloud, and get comfortable communicating technical decisions.",
  },
  {
    icon: ClipboardList,
    title: "Interview transcripts",
    description:
      "Revisit your interview conversations and understand how you approached each technical question.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "AI-powered evaluations",
    description:
      "Get a structured assessment of your technical accuracy, problem-solving, communication, relevance, and depth of knowledge.",
  },
  {
    icon: Target,
    title: "Focused improvement",
    description:
      "Identify strengths and improvement areas from your interview reports so your next practice session has a clear purpose.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-border bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-primary">
              BUILT AROUND YOUR INTERVIEW GOALS
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Everything you need to
              <br className="hidden sm:block" /> practice with purpose.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            From your first profile setup to your post-interview evaluation,
            bring your technical interview preparation into one focused
            experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-lg font-bold tracking-tight text-card-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-px flex-1 bg-border transition-colors group-hover:bg-primary/50" />
                  <span className="text-[10px] font-semibold tabular-nums text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}