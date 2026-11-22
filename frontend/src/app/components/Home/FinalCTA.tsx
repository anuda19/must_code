import Link from "next/link";
import {
  ArrowRight,
  BotMessageSquare,
  Goal,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

export default function FinalCTA() {
  return (
    <section className="border-t border-border bg-background px-5 py-20 text-foreground sm:px-8 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-primary/20 bg-card px-6 py-14 shadow-xl shadow-primary/5 sm:px-12 sm:py-20">
        {/* Ambient accents */}
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/15 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/60 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-lg shadow-primary/10">
            <BotMessageSquare className="size-6" strokeWidth={1.8} />
          </div>

          <p className="mt-7 text-xs font-bold tracking-[0.2em] text-primary">
            YOUR NEXT INTERVIEW STARTS HERE
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Don&apos;t just prepare.
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Practice like it matters.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Build your interview profile, have a real-time conversation with
            your AI interviewer, and discover where you can improve.
          </p>

          <Link
            href={ROUTES.register}
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0"
          >
            Build my interview profile
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <Goal className="size-3.5 text-primary" />
            Start with your goals. Improve with every practice session.
          </div>
        </div>
      </div>
    </section>
  );
}