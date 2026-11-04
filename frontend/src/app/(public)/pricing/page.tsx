
"use client";

import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  DollarSign,
  FileText,
  HelpCircle,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

const INCLUDED = [
  {
    icon: Users,
    title: "Personalized profile",
    description:
      "Set your target role, experience level, company, and technical skills.",
  },
  {
    icon: Brain,
    title: "AI technical interviews",
    description:
      "Practice with questions tailored to your professional profile.",
  },
  {
    icon: AudioLines,
    title: "Real-time voice interaction",
    description:
      "Experience an interview conversation instead of simply reading questions.",
  },
  {
    icon: FileText,
    title: "Saved interview transcripts",
    description:
      "Revisit your interview conversations after each completed session.",
  },
  {
    icon: Target,
    title: "AI-generated evaluations",
    description:
      "Review feedback across technical accuracy, problem-solving, communication, relevance, and depth.",
  },
  {
    icon: MessageSquareText,
    title: "Performance insights",
    description:
      "Understand your strengths and identify areas that deserve more practice.",
  },
];

const FAQS = [
  {
    question: "Does XCode currently have paid plans?",
    answer:
      "Paid subscription plans and billing options have not been published yet. This page describes the current interview preparation experience rather than advertising unavailable plans.",
  },
  {
    question: "What can I do with XCode?",
    answer:
      "You can create a professional profile, take AI-powered technical mock interviews with real-time voice interaction, revisit saved transcripts, and review AI-generated interview evaluations.",
  },
  {
    question: "How are interviews personalized?",
    answer:
      "Your profile information, including your target job role, experience level, target company, and skills, helps shape the interview experience.",
  },
  {
    question: "Can I review my previous interviews?",
    answer:
      "Completed interview sessions are saved so you can revisit their transcripts and available evaluations.",
  },
  {
    question: "Does XCode guarantee a job offer?",
    answer:
      "No. XCode is a preparation tool. It can help you practice and understand your performance, but hiring outcomes depend on many factors outside the platform.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12">
      <div className="pointer-events-none absolute -right-40 top-20 size-[420px] rounded-full bg-[var(--clay-peach)]/40 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-[45%] size-[420px] rounded-full bg-[var(--clay-sage)]/40 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="clay-raised inline-flex items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-4 py-2 text-xs font-bold text-[var(--clay-sage-ink)]">
            <DollarSign className="size-4 text-[var(--clay-primary)]" />
            Straightforward access
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Invest in better
            <span className="block text-[var(--clay-primary)]">
              interview preparation.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--clay-muted)] sm:text-lg">
            Get a more realistic way to practice technical interviews, review
            your performance, and understand where you can improve.
          </p>
        </header>

        {/* Current availability */}
        <section className="mt-14">
          <div className="clay-card mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)]">
            <div className="grid md:grid-cols-[1fr_0.8fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--clay-green-surface)] px-3 py-1.5 text-[11px] font-bold text-[var(--clay-sage-ink)]">
                  <Check className="size-3.5" />
                  Current product access
                </div>

                <h2 className="mt-6 text-3xl font-extrabold">
                  Start with the essentials.
                </h2>

                <p className="mt-3 text-sm leading-7 text-[var(--clay-muted)]">
                  The core XCode interview preparation experience is available
                  to explore. Create your profile and experience the workflow
                  before choosing how you want to prepare.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "Create your interview profile",
                    "Practice with AI-powered technical interviews",
                    "Use real-time voice interaction",
                    "Review transcripts and AI evaluations",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-medium text-[var(--clay-ink)]"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--clay-green-surface)] text-[var(--clay-sage-ink)]">
                        <Check className="size-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={ROUTES.register}
                  className="clay-button-shadow mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--clay-primary)] px-6 text-sm font-bold text-[var(--clay-primary-ink)] transition-all hover:-translate-y-0.5"
                >
                  Create your account
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="flex flex-col justify-center border-t border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-7 sm:p-10 md:border-l md:border-t-0">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]">
                  <DollarSign className="size-7" />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--clay-subtle)]">
                  Subscription information
                </p>

                <h3 className="mt-3 text-2xl font-extrabold">
                  Paid plans are not published yet.
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--clay-muted)]">
                  We’ll share subscription options and billing details here
                  when they are officially available.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--clay-sage-ink)]">
                  <ShieldCheck className="size-4" />
                  No invented prices or hidden plan claims
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--clay-primary)]">
              The platform
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything starts with better practice.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--clay-muted)]">
              Explore the core capabilities that make up the current XCode
              interview workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="clay-raised rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6"
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${
                      index % 3 === 0
                        ? "clay-feature-sage text-[var(--clay-sage-ink)]"
                        : index % 3 === 1
                          ? "bg-[var(--clay-peach)] text-[var(--clay-coral-shadow)]"
                          : "clay-feature-blue text-[var(--clay-blue-ink)]"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--clay-muted)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-24 max-w-3xl">
          <div className="text-center">
            <div className="clay-raised mx-auto flex size-12 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)]">
              <HelpCircle className="size-6" />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm text-[var(--clay-muted)]">
              A few things worth knowing before you get started.
            </p>
          </div>

          <div className="mt-9 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] shadow-[0_5px_14px_rgb(101_70_49_/_5%)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-bold text-[var(--clay-ink)]"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`size-4 shrink-0 text-[var(--clay-subtle)] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--clay-border)] px-5 py-4 text-sm leading-7 text-[var(--clay-muted)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="clay-card mt-24 rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-6 py-12 text-center sm:px-12">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[var(--clay-primary)] text-[var(--clay-primary-ink)]">
            <Clock3 className="size-6" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
            Your next practice session starts here.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--clay-muted)]">
            Build your profile and take the first step toward more confident
            technical interviews.
          </p>
          <Link
            href={ROUTES.register}
            className="clay-button-shadow mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--clay-primary)] px-7 text-sm font-bold text-[var(--clay-primary-ink)] transition-all hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}