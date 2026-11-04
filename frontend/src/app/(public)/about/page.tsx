
"use client";

import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Bot,
  Brain,
  CheckCircle2,
  Compass,
  Lightbulb,
  MessageSquareText,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const VALUES = [
  {
    icon: Target,
    title: "Practice with purpose",
    description:
      "Interview preparation should be focused on the skills and expectations of the role you're working toward, not random questions.",
    tone: "sage",
  },
  {
    icon: Brain,
    title: "Understand, don't memorize",
    description:
      "We believe strong engineers are built through clear thinking, sound technical decisions, and the ability to explain their reasoning.",
    tone: "peach",
  },
  {
    icon: Lightbulb,
    title: "Feedback that matters",
    description:
      "Practice becomes valuable when you can understand what went well, identify gaps, and make your next attempt better.",
    tone: "blue",
  },
  {
    icon: Users,
    title: "Built for ambitious developers",
    description:
      "We're creating tools for developers who want to keep learning, challenge themselves, and take ownership of their growth.",
    tone: "sage",
  },
];

const STEPS = [
  {
    number: "01",
    icon: Users,
    title: "Build your profile",
    description:
      "Tell us about your target role, experience level, target company, and technical skills.",
  },
  {
    number: "02",
    icon: AudioLines,
    title: "Practice with AI",
    description:
      "Take a voice-based technical mock interview with questions tailored to your profile.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Review your performance",
    description:
      "Explore your interview transcript and AI-generated evaluation to understand your strengths and improvement areas.",
  },
];

const VISION = [
  {
    phase: "01",
    label: "Available today",
    title: "AI-powered interview practice",
    description:
      "Profile-driven technical interviews, real-time voice interaction, saved transcripts, and AI-generated performance evaluations.",
    current: true,
  },
  {
    phase: "02",
    label: "Future direction",
    title: "Deeper technical preparation",
    description:
      "Explore ways to expand technical practice, learning experiences, and preparation tools for different engineering roles.",
    current: false,
  },
  {
    phase: "03",
    label: "Long-term vision",
    title: "A broader developer ecosystem",
    description:
      "Our ambition is to help developers move beyond interview preparation toward building products, taking ownership, and creating ventures.",
    current: false,
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="clay-raised inline-flex items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-4 py-2 text-xs font-bold text-[var(--clay-sage-ink)]">
              <Bot className="size-4 text-[var(--clay-primary)]" />
              A better way to prepare for technical interviews
            </div>

            <h1 className="mt-8 text-4xl font-extrabold leading-[1.12] tracking-tight text-[var(--clay-ink)] sm:text-5xl lg:text-7xl">
              Turn preparation into
              <span className="block text-[var(--clay-primary)]">
                real performance.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--clay-muted)] sm:text-lg">
              XCode helps developers prepare for technical interviews through
              realistic AI-powered practice, real-time voice conversations,
              and feedback that makes improvement easier to understand.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.register}
                className="clay-button-shadow inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--clay-primary)] px-6 text-sm font-bold text-[var(--clay-primary-ink)] transition-all hover:-translate-y-0.5"
              >
                Start practicing
                <ArrowRight className="size-4" />
              </Link>

              <a
                href="#how-it-works"
                className="clay-raised inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] px-6 text-sm font-bold text-[var(--clay-ink)] transition-all hover:-translate-y-0.5"
              >
                See how it works
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-semibold text-[var(--clay-subtle)]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--clay-status)]" />
                Profile-driven questions
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--clay-status)]" />
                Real-time voice practice
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--clay-status)]" />
                AI performance feedback
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="clay-card relative overflow-hidden rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-8 sm:p-10">
            <div className="absolute -right-8 -top-8 text-[var(--clay-peach)]">
              <Target className="size-40" strokeWidth={1} />
            </div>

            <div className="relative">
              <div className="clay-feature-sage flex size-14 items-center justify-center rounded-2xl text-[var(--clay-sage-ink)]">
                <Target className="size-7" />
              </div>

              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-sage-ink)]">
                Our mission
              </p>

              <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Make technical interview preparation more practical.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--clay-muted)]">
                Knowing a concept and explaining it under interview pressure
                are two different things. XCode gives developers an
                opportunity to practice that experience, communicate their
                thinking, and review their performance in one place.
              </p>
            </div>
          </div>

          <div className="clay-card relative overflow-hidden rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-8 sm:p-10">
            <div className="absolute -right-8 -top-8 text-white/60">
              <Compass className="size-40" strokeWidth={1} />
            </div>

            <div className="relative">
              <div className="clay-feature-blue flex size-14 items-center justify-center rounded-2xl text-[var(--clay-blue-ink)]">
                <Rocket className="size-7" />
              </div>

              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-blue-ink)]">
                Our vision
              </p>

              <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Help developers grow beyond the interview.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--clay-muted)]">
                Interview readiness is a starting point, not the finish line.
                Our long-term ambition is to build a broader ecosystem that
                supports technical growth, product thinking, and the
                confidence to create something of your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-primary)]">
              The experience
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From profile to performance review.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
              A focused workflow designed to make every practice session
              meaningful.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="clay-raised rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-extrabold text-[var(--clay-primary)]">
                      {step.number}
                    </span>
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl ${
                        index === 0
                          ? "clay-feature-sage text-[var(--clay-sage-ink)]"
                          : index === 1
                            ? "bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]"
                            : "clay-feature-blue text-[var(--clay-blue-ink)]"
                      }`}
                    >
                      <Icon className="size-6" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--clay-muted)]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--clay-surface-warm)] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-primary)]">
              What we believe
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The principles behind XCode.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--clay-muted)]">
              Our product decisions start with a simple idea: better
              preparation should lead to better understanding and stronger
              execution.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="clay-raised rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-7"
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${
                      value.tone === "sage"
                        ? "clay-feature-sage text-[var(--clay-sage-ink)]"
                        : value.tone === "blue"
                          ? "clay-feature-blue text-[var(--clay-blue-ink)]"
                          : "bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--clay-muted)]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        id="roadmap"
        className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-primary)]">
              Looking ahead
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Where we're headed.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--clay-muted)]">
              We're building step by step. Here's the direction we're working
              toward.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {VISION.map((item) => (
              <div
                key={item.phase}
                className="clay-raised flex flex-col rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-extrabold text-[var(--clay-primary)]">
                    PHASE {item.phase}
                  </span>
                  {item.current && (
                    <span className="rounded-full bg-[var(--clay-green-surface)] px-3 py-1 text-[10px] font-bold text-[var(--clay-sage-ink)]">
                      Current product
                    </span>
                  )}
                </div>

                <h3 className="mt-7 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[var(--clay-muted)]">
                  {item.description}
                </p>
                <div className="mt-7 border-t border-[var(--clay-border)] pt-5 text-xs font-bold text-[var(--clay-subtle)]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 pt-4 sm:px-8 lg:px-12">
        <div className="clay-card mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-6 py-14 text-center sm:px-12">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--clay-primary)] text-[var(--clay-primary-ink)]">
            <Sparkles className="size-7" />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your next interview deserves better preparation.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--clay-muted)]">
            Build your profile, start practicing, and get a clearer picture of
            your technical interview performance.
          </p>

          <Link
            href={ROUTES.register}
            className="clay-button-shadow mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--clay-primary)] px-7 text-sm font-bold text-[var(--clay-primary-ink)] transition-all hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}