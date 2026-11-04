
import Link from "next/link";
import {
  ArrowRight,
  BotMessageSquare,
  Goal,
  Sparkles,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

export default function FinalCTA() {
  return (
    <section className="border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-5 py-20 text-[var(--clay-ink)] sm:px-8 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-6 py-14 shadow-[inset_7px_7px_14px_rgb(255_255_255/75%),10px_13px_0_#e5cdbb,0_24px_40px_rgb(101_70_49/8%)] sm:px-12 sm:py-20">
        {/* Soft background accents */}
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[var(--clay-primary)]/10 blur-[75px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/2 size-80 -translate-x-1/2 rounded-full bg-[var(--clay-peach)]/60 blur-[85px]" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)] shadow-[inset_3px_3px_7px_#fff,4px_5px_0_#e5b9a4]">
            <BotMessageSquare className="size-6" strokeWidth={1.8} />
          </div>

          <p className="mt-7 text-xs font-extrabold tracking-[0.2em] text-[var(--clay-coral-shadow)]">
            YOUR NEXT INTERVIEW STARTS HERE
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Don't just prepare.
            <br />
            <span className="text-[var(--clay-coral-shadow)]">
              Practice like it matters.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            Build your interview profile, have a real-time conversation with
            your AI interviewer, and discover where you can improve.
          </p>

          <Link
            href={ROUTES.register}
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e8795b] bg-[var(--clay-primary)] px-6 py-3 text-sm font-extrabold text-[var(--clay-primary-ink)] shadow-[inset_3px_3px_7px_rgb(255_255_255/55%),0_5px_0_#d86649,0_10px_18px_rgb(216_102_73/12%)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:shadow-[inset_3px_3px_7px_rgb(255_255_255/55%),0_1px_0_#d86649]"
          >
            Build my interview profile
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[var(--clay-subtle)]">
            <Goal className="size-3.5 text-[var(--clay-primary)]" />
            Start with your goals. Improve with every practice session.
          </div>
        </div>
      </div>
    </section>
  );
}
