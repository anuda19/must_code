"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  Check,
  Code2,
  Mic2,
  Sparkles,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const WAVEFORM = [
  12, 18, 27, 15, 34, 22, 42, 29, 17, 36, 48, 25, 15, 31, 43, 21, 35, 17, 28,
  45, 23, 13, 33, 20, 39, 26, 16, 30, 44, 19, 34, 14, 24, 38, 20, 12,
];

function NeuralCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Ambient light */}
      <div className="absolute inset-[12%] rounded-full bg-indigo-600/20 blur-[85px]" />
      <div className="absolute inset-[23%] rounded-full bg-violet-500/15 blur-[65px]" />

      {/* Orbital paths */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/[0.12]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.14]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/[0.12]" />

      {/* Orbital highlights */}
      <div className="absolute left-[16%] top-[27%] size-2 rounded-full bg-cyan-200 shadow-[0_0_18px_5px_rgba(103,232,249,0.35)]" />
      <div className="absolute right-[14%] top-[37%] size-1.5 rounded-full bg-violet-200 shadow-[0_0_16px_4px_rgba(196,181,253,0.4)]" />
      <div className="absolute bottom-[21%] left-[29%] size-1.5 rounded-full bg-indigo-200 shadow-[0_0_15px_4px_rgba(165,180,252,0.4)]" />
      <div className="absolute bottom-[30%] right-[21%] size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_5px_rgba(103,232,249,0.3)]" />

      {/* Main AI core */}
      <div className="neural-core-pulse absolute left-1/2 top-1/2 flex aspect-square w-[48%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="neural-core-glow absolute inset-0 rounded-full bg-indigo-500/15 blur-2xl" />

        <div className="absolute inset-0 rounded-full border border-indigo-200/25 bg-gradient-to-br from-indigo-300/[0.13] via-violet-500/[0.08] to-cyan-300/[0.13] shadow-[inset_0_0_45px_rgba(129,140,248,0.13),0_0_65px_rgba(99,102,241,0.13)] backdrop-blur-md" />

        <div className="absolute inset-[9%] rounded-full border border-white/[0.10] bg-gradient-to-br from-[#22264b] via-[#14152c] to-[#0b1929]" />

        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(196,181,253,0.42),transparent_32%),radial-gradient(circle_at_65%_72%,rgba(34,211,238,0.28),transparent_38%),linear-gradient(140deg,#29255a_0%,#17152f_48%,#0b2434_100%)] shadow-[inset_-12px_-15px_35px_rgba(0,0,0,0.4),inset_8px_8px_25px_rgba(199,210,254,0.12)]" />

        {/* Core waveform */}
        <div className="relative flex h-16 items-center justify-center gap-[3px] sm:h-20 sm:gap-1">
          {WAVEFORM.slice(0, 23).map((height, index) => (
            <span
              key={index}
              className={`mic-wave-bar rounded-full ${
                index % 5 === 0 ? "bg-cyan-200" : "bg-indigo-200"
              }`}
              style={{
                width: 3,
                height: `${Math.max(10, height * 1.35)}%`,
                opacity: 0.55 + ((index * 3) % 5) * 0.09,
                animationDuration: `${2.2 + (index % 5) * 0.25}s`,
                animationDelay: `${index * -0.18}s`,
              }}
            />
          ))}
        </div>

        {/* Glass reflection */}
        <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.11),transparent_35%,transparent_72%,rgba(103,232,249,0.06))]" />
      </div>

      {/* Floating transcript */}
      <div className="absolute left-0 top-[17%] w-[57%] rounded-xl border border-white/[0.12] bg-[#101321]/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:left-[-1%] sm:w-[53%] sm:p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-200">
            <Sparkles className="size-3.5" />
          </div>
          <span className="text-[9px] font-semibold tracking-[0.14em] text-slate-400 sm:text-[10px]">
            AI INTERVIEWER
          </span>
          <span className="ml-auto size-1.5 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-3 text-[11px] leading-[1.65] text-slate-200 sm:text-xs sm:leading-5">
          How would you optimize a React app that renders thousands of items?
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[9px] text-violet-300">
          <AudioLines className="size-3.5" />
          <span>Follow-up questions included</span>
        </div>
      </div>

      {/* Candidate response */}
      <div className="absolute bottom-[17%] right-0 w-[58%] rounded-xl border border-cyan-200/[0.15] bg-[#0d1820]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:right-[-1%] sm:w-[54%] sm:p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
            <Code2 className="size-3.5" />
          </div>
          <span className="text-[9px] font-semibold tracking-[0.12em] text-slate-400 sm:text-[10px]">
            YOUR RESPONSE
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-[1.65] text-slate-300 sm:text-xs sm:leading-5">
          I&apos;d profile re-renders first, then use virtualization for large
          lists and memoization where needed.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-5 flex-1 items-center gap-[2px] overflow-hidden">
            {WAVEFORM.slice(0, 28).map((height, index) => (
              <span
                key={index}
                className="w-[2px] shrink-0 rounded-full bg-cyan-300/75"
                style={{ height: Math.max(3, height * 0.45) }}
              />
            ))}
          </div>
          <span className="text-[9px] text-cyan-200">Voice preview</span>
        </div>
      </div>

      {/* Floating status */}
      <div className="absolute right-[3%] top-[9%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#111321]/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:flex">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] text-slate-300">AI ready</span>
      </div>

      {/* Bottom voice indicator */}
      <div className="absolute bottom-[7%] left-[7%] flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-[#111321]/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:bottom-[8%] sm:left-[5%] sm:px-4 sm:py-2.5">
        <div className="flex size-7 items-center justify-center rounded-full bg-indigo-400/15 text-indigo-200">
          <Mic2 className="size-3.5" />
        </div>
        <div>
          <p className="text-[10px] font-medium text-white">Think out loud</p>
          <p className="mt-0.5 text-[9px] text-slate-500">
            Practice without pressure
          </p>
        </div>
      </div>

      {/* Orbital accent */}
      <div className="absolute bottom-[9%] right-[8%] flex size-8 items-center justify-center rounded-full border border-indigo-200/20 bg-indigo-400/10 text-indigo-200">
        <Waves className="size-4" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080a12] text-white lg:h-[calc(100svh-72px)] lg:min-h-[620px] lg:max-h-[900px]">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[57%] top-[5%] size-[550px] -translate-x-1/2 rounded-full bg-indigo-600/[0.11] blur-[130px]" />
        <div className="absolute -left-52 bottom-[-250px] size-[500px] rounded-full bg-violet-700/[0.07] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(99,102,241,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto flex min-h-full max-w-[1360px] items-center px-5 py-12 sm:px-8 sm:py-14 lg:h-full lg:px-12 lg:py-8 xl:px-16">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4 xl:gap-8">
          {/* Left: messaging and CTA */}
          <div className="relative z-10 mx-auto w-full max-w-[560px] lg:mx-0 lg:py-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.035] px-3.5 py-2 backdrop-blur-xl">
              <span className="flex size-5 items-center justify-center rounded-full bg-indigo-300/15 text-indigo-200">
                <Sparkles className="size-3" />
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-300 sm:text-xs">
                AI-POWERED INTERVIEW PREPARATION
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(2.8rem,5.2vw,5.25rem)] font-semibold leading-[0.99] tracking-[-0.07em]">
              Make your
              <br />
              next interview
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
                your best one.
              </span>
            </h1>

            <p className="mt-5 max-w-[440px] text-sm leading-7 text-slate-400 sm:text-[15px] sm:leading-7">
              Know what to prepare, practice real interview conversations with
              AI, and build the confidence to walk into your next opportunity
              ready.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary CTA */}
              <Button
                size="lg"
                className="cta-primary-auto group relative isolate h-12 overflow-hidden rounded-xl border border-indigo-200/25 bg-indigo-500 px-5 font-semibold text-white transition-colors duration-300 hover:bg-indigo-400"
              >
                <Link
                  href="/signup"
                  className="relative z-10 inline-flex items-center"
                >
                  <span>Build my preparation plan</span>
                  <ArrowRight className="cta-arrow ml-2 size-4" />
                </Link>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="ghost"
                size="lg"
                className="group h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-slate-300 transition-all duration-300 hover:border-indigo-200/20 hover:bg-white/[0.055] hover:text-white active:scale-[0.98]"
              >
                <Link href="#how-it-works">
                  <span>Explore the platform</span>
                  <ArrowDownRight className="ml-2 size-4 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-indigo-200" />
                </Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-emerald-300" />
                Personal roadmap
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-emerald-300" />
                Voice practice
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-emerald-300" />
                Actionable feedback
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-white/[0.09] pt-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-indigo-200">
                <AudioLines className="size-4" />
              </div>
              <p className="text-xs leading-5 text-slate-500">
                <span className="font-medium text-slate-300">
                  Preparation with purpose.
                </span>{" "}
                <br className="hidden sm:block" />
                Not another list of things to memorize.
              </p>
            </div>
          </div>

          {/* Right: custom AI visual */}
          <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
            <NeuralCore />
          </div>
        </div>
      </div>
    </section>
  );
}
