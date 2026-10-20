
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="border-t border-white/[0.06] bg-[#080a12] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-indigo-200/[0.14] bg-[#0d101c] px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.17),transparent_55%)]" />
        <div className="pointer-events-none absolute -bottom-36 left-1/2 size-72 -translate-x-1/2 rounded-full bg-violet-600/[0.10] blur-[90px]" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-indigo-200/20 bg-indigo-300/10 text-indigo-200">
            <Sparkles className="size-5" />
          </div>

          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-indigo-300">
            YOUR NEXT CHAPTER STARTS HERE
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Stop guessing.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              Start preparing.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            Set your goal, build your preparation plan, and start practicing
            for the interviews ahead.
          </p>

          <Link
            href="/signup"
            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200/20 bg-indigo-300 px-5 text-sm font-semibold text-[#10111b] shadow-[0_0_30px_rgba(129,140,248,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-200 hover:shadow-[0_0_40px_rgba(129,140,248,0.22)]"
          >
            Build my preparation plan
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-xs text-slate-500">
            Your preparation journey starts with one step.
          </p>
        </div>
      </div>
    </section>
  );
}