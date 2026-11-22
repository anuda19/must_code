// "use client";

// import Link from "next/link";
// import {
//   ArrowDownRight,
//   ArrowRight,
//   AudioLines,
//   Bot,
//   Check,
//   Code2,
//   Mic,
//   Mic2,
//   Waves,
// } from "lucide-react";

// import { ROUTES } from "@/lib/routes";

// const WAVEFORM = [
//   12, 18, 27, 15, 34, 22, 42, 29, 17, 36, 48, 25, 15, 31, 43, 21,
//   35, 17, 28, 45, 23, 13, 33, 20, 39, 26, 16, 30, 44, 19, 34, 14,
//   24, 38, 20, 12,
// ];

// function NeuralCore() {
//   return (
//     <div className="relative mx-auto aspect-square w-full max-w-[470px] min-w-0">

//       {/* Ambient lighting */}
//       <div className="pointer-events-none absolute inset-[16%] rounded-full bg-[var(--clay-peach)]/50 blur-[clamp(25px,6vw,65px)]" />

//       <div className="pointer-events-none absolute inset-[27%] rounded-full bg-[var(--clay-sage)]/45 blur-[clamp(20px,5vw,55px)]" />

//       {/* Orbital rings */}
//       <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-peach-shadow)]/50" />

//       <div className="absolute left-1/2 top-1/2 aspect-square w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-sage-shadow)]/55" />

//       <div className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-blue-shadow)]/60" />

//       {/* Orbital highlights */}
//       <div className="absolute left-[16%] top-[27%] size-1.5 rounded-full bg-[var(--clay-primary)] shadow-[0_0_12px_3px_rgba(255,139,106,0.25)] sm:size-2" />

//       <div className="absolute right-[14%] top-[37%] size-1.5 rounded-full bg-[var(--clay-sage-ink)]" />

//       <div className="absolute bottom-[21%] left-[29%] size-1.5 rounded-full bg-[var(--clay-blue-ink)]" />

//       <div className="absolute bottom-[30%] right-[21%] size-1.5 rounded-full bg-[var(--clay-primary)] sm:size-2" />

//       {/* Main AI core */}
//       <div className="neural-core-pulse absolute left-1/2 top-1/2 flex aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">

//         <div className="neural-core-glow absolute inset-0 rounded-full bg-[var(--clay-primary)]/20 blur-xl sm:blur-2xl" />

//         <div className="absolute inset-0 rounded-full border border-white/70 bg-gradient-to-br from-[var(--clay-surface)] via-[var(--clay-peach)] to-[var(--clay-blue)] shadow-[inset_0_0_24px_rgba(255,255,255,0.8),0_8px_20px_rgba(101,70,49,0.10)]" />

//         <div className="absolute inset-[9%] rounded-full border border-white/70 bg-gradient-to-br from-[#f9e3d7] via-[#e9d8e9] to-[#d8e9e5]" />

//         <div className="absolute inset-[18%] flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(255,255,255,0.95),transparent_32%),radial-gradient(circle_at_65%_72%,rgba(128,168,90,0.28),transparent_38%),linear-gradient(140deg,#f6c8b4_0%,#e9d6e6_48%,#d4e9e8_100%)] shadow-[inset_-8px_-10px_20px_rgba(101,70,49,0.12),inset_6px_6px_15px_rgba(255,255,255,0.8)]">

//           {/* Core waveform */}
//           <div className="relative flex h-8 items-center justify-center gap-[2px] min-[380px]:h-10 sm:h-14 sm:gap-1">
//             {WAVEFORM.slice(0, 23).map((height, index) => (
//               <span
//                 key={index}
//                 className="mic-wave-bar rounded-full"
//                 style={{
//                   width: "clamp(1.5px, 0.65vw, 3px)",
//                   height: `${Math.max(12, height * 1.15)}%`,
//                   backgroundColor:
//                     index % 5 === 0
//                       ? "var(--clay-primary)"
//                       : "var(--clay-blue-ink)",
//                   opacity: 0.6 + ((index * 3) % 5) * 0.08,
//                   animationDuration: `${1.1 + (index % 5) * 0.18}s`,
//                   animationDelay: `${index * -0.12}s`,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* AI interviewer card */}
//       <div className="absolute left-0 top-[12%] z-10 w-[61%] min-w-0 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)]/95 p-2 shadow-[0_5px_14px_rgba(101,70,49,0.08)] backdrop-blur-md min-[380px]:p-2.5 sm:left-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:left-[-5%]">

//         <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
//           <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--clay-sage)] text-[var(--clay-sage-ink)] sm:size-7">
//             <Mic className="size-3 sm:size-3.5" />
//           </div>

//           <span className="truncate text-[8px] font-extrabold tracking-[0.08em] text-[var(--clay-muted)] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.12em]">
//             AI INTERVIEWER
//           </span>

//           <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[var(--clay-status)]" />
//         </div>

//         <p className="mt-2 text-[9px] leading-[1.55] text-[var(--clay-ink)] min-[380px]:text-[10px] sm:mt-2.5 sm:text-xs sm:leading-5">
//           How would you optimize a React app that renders thousands of items?
//         </p>

//         <div className="mt-2 flex min-w-0 items-center gap-1 text-[8px] font-semibold text-[var(--clay-blue-ink)] min-[380px]:text-[9px]">
//           <AudioLines className="size-3 shrink-0 sm:size-3.5" />
//           <span className="truncate">Follow-up questions included</span>
//         </div>
//       </div>

//       {/* Candidate response */}
//       <div className="absolute bottom-[12%] right-0 z-10 w-[61%] min-w-0 rounded-xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-surface)]/95 p-2 shadow-[0_5px_14px_rgba(101,70,49,0.08)] backdrop-blur-md min-[380px]:p-2.5 sm:right-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:right-[-5%]">

//         <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
//           <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] sm:size-7">
//             <Code2 className="size-3 sm:size-3.5" />
//           </div>

//           <span className="truncate text-[8px] font-extrabold tracking-[0.08em] text-[var(--clay-muted)] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.12em]">
//             YOUR RESPONSE
//           </span>
//         </div>

//         <p className="mt-2 text-[9px] leading-[1.55] text-[var(--clay-ink)] min-[380px]:text-[10px] sm:mt-2.5 sm:text-xs sm:leading-5">
//           I&apos;d profile re-renders first, then use virtualization for large
//           lists and memoization.
//         </p>

//         <div className="mt-2 flex min-w-0 items-center gap-1.5">
//           <div className="flex h-4 min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
//             {WAVEFORM.slice(0, 28).map((height, index) => (
//               <span
//                 key={index}
//                 className="w-[2px] shrink-0 rounded-full bg-[var(--clay-blue-ink)]"
//                 style={{
//                   height: Math.max(3, height * 0.35),
//                 }}
//               />
//             ))}
//           </div>

//           <span className="shrink-0 text-[8px] font-semibold text-[var(--clay-blue-ink)] min-[380px]:text-[9px]">
//             Voice preview
//           </span>
//         </div>
//       </div>

//       {/* AI status */}
//       <div className="absolute right-[3%] top-[9%] hidden items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3 py-1.5 shadow-sm min-[430px]:flex">
//         <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />

//         <span className="text-[10px] font-bold text-[var(--clay-muted)]">
//           AI ready
//         </span>
//       </div>

//       {/* Voice indicator */}
//       <div className="absolute bottom-[0%] left-[7%] z-20 flex max-w-[55%] items-center gap-1.5 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-2 py-1.5 shadow-[0_4px_10px_rgba(101,70,49,0.07)] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:py-2 sm:bottom-[0%] sm:left-[5%]">

//         <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--clay-sage)] text-[var(--clay-sage-ink)] min-[380px]:size-7">
//           <Mic2 className="size-3 sm:size-3.5" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-extrabold text-[var(--clay-ink)] min-[380px]:text-[10px]">
//             Think out loud
//           </p>

//           <p className="truncate text-[8px] text-[var(--clay-muted)] min-[380px]:text-[9px]">
//             Practice without pressure
//           </p>
//         </div>
//       </div>

//       {/* Orbital accent */}
//       <div className="absolute bottom-[2%] right-[8%] flex size-6 items-center justify-center rounded-full border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] min-[380px]:size-8">
//         <Waves className="size-3.5 min-[380px]:size-4" />
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   return (
//     <section className="relative isolate overflow-hidden bg-[var(--clay-bg)] text-[var(--clay-ink)] lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center">

//       {/* Background atmosphere */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//       >
//         <div className="absolute left-[58%] top-[5%] size-[400px] -translate-x-1/2 rounded-full bg-[var(--clay-peach)]/35 blur-[110px]" />

//         <div className="absolute -left-40 bottom-[-180px] size-[400px] rounded-full bg-[var(--clay-sage)]/40 blur-[100px]" />
//       </div>

//       <div className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-6 xl:px-16">

//         <div className="grid w-full items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 xl:gap-8">

//           {/* Left content */}
//           <div className="relative z-10 mx-auto w-full max-w-[550px] lg:mx-0">

//             <div className="clay-raised inline-flex items-center gap-2 rounded-full bg-[var(--clay-sage)] px-3.5 py-2 text-[10px] font-extrabold tracking-[0.1em] text-[var(--clay-sage-ink)] sm:text-xs">

//               <Bot className="size-4" />

//               AI-POWERED INTERVIEW PREPARATION
//             </div>

//             <h1 className="mt-5 text-[clamp(2.65rem,5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.065em]">

//               Make your
//               <br />

//               next interview
//               <br />

//               <span className="text-[var(--clay-primary)]">
//                 your best one.
//               </span>
//             </h1>

//             <p className="mt-4 max-w-[440px] text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
//               Know what to prepare, practice real interview conversations
//               with AI, and build the confidence to walk into your next
//               opportunity ready.
//             </p>

//             {/* CTA */}
//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

//               <Link
//                 href={ROUTES.register}
//                 className="clay-button-shadow group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--clay-primary)] px-5 text-sm font-extrabold text-[var(--clay-primary-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--clay-primary-hover)] active:translate-y-0"
//               >
//                 Ace Your Next Interview

//                 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
//               </Link>

//               <Link
//                 href="#how-it-works"
//                 className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] px-4 text-sm font-bold text-[var(--clay-ink)] transition hover:-translate-y-0.5 hover:bg-white"
//               >
//                 Explore the platform

//                 <ArrowDownRight className="size-4 text-[var(--clay-subtle)]" />
//               </Link>
//             </div>

//             {/* Benefits */}
//             <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[var(--clay-muted)]">

//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-[var(--clay-green-ink)]" />
//                 Personal roadmap
//               </span>

//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-[var(--clay-green-ink)]" />
//                 Voice practice
//               </span>

//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-[var(--clay-green-ink)]" />
//                 Actionable feedback
//               </span>
//             </div>

//             {/* Trust statement */}
//             <div className="mt-7 flex items-center gap-3 border-t border-[var(--clay-border)] pt-4">

//               <div className="clay-raised flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]">
//                 <AudioLines className="size-4" />
//               </div>

//               <p className="text-xs leading-5 text-[var(--clay-muted)]">
//                 <span className="font-extrabold text-[var(--clay-ink)]">
//                   Preparation with purpose.
//                 </span>{" "}
//                 Not another list of things to memorize.
//               </p>
//             </div>
//           </div>

//           {/* Right visual */}
//           <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
//             <NeuralCore />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  Bot,
  Check,
  Code2,
  Mic,
  Mic2,
  Waves,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

const WAVEFORM = [
  12, 18, 27, 15, 34, 22, 42, 29, 17, 36, 48, 25,
  15, 31, 43, 21, 35, 17, 28, 45, 23, 13, 33, 20,
  39, 26, 16, 30, 44, 19, 34, 14, 24, 38, 20, 12,
];

function NeuralCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[470px]">

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-primary/10 blur-[75px]" />
      <div className="pointer-events-none absolute inset-[28%] rounded-full bg-accent/30 blur-[55px]" />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />

      {/* Orbital highlights */}
      <div className="absolute left-[16%] top-[27%] size-2 rounded-full bg-primary shadow-[0_0_16px_var(--primary)]" />

      <div className="absolute right-[14%] top-[37%] size-1.5 rounded-full bg-primary/70" />

      <div className="absolute bottom-[21%] left-[29%] size-1.5 rounded-full bg-primary/60" />

      <div className="absolute bottom-[30%] right-[21%] size-2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />

      {/* Main AI core */}
      <div className="neural-core-pulse absolute left-1/2 top-1/2 flex aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">

        <div className="neural-core-glow absolute inset-0 rounded-full bg-primary/25 blur-2xl" />

        <div className="absolute inset-0 rounded-full border border-primary/30 bg-gradient-to-br from-card via-primary/15 to-accent shadow-[inset_0_0_25px_rgba(255,255,255,0.06),0_15px_45px_rgba(0,0,0,0.2)]" />

        <div className="absolute inset-[9%] rounded-full border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-accent/60" />

        <div className="absolute inset-[18%] flex items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-[radial-gradient(circle_at_32%_25%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_65%_72%,var(--primary)/15,transparent_45%),linear-gradient(140deg,var(--card),var(--background))] shadow-[inset_-8px_-10px_25px_rgba(0,0,0,0.2),inset_6px_6px_15px_rgba(255,255,255,0.06)]">

          {/* Core waveform */}
          <div className="relative flex h-8 items-center justify-center gap-[2px] min-[380px]:h-10 sm:h-14 sm:gap-1">
            {WAVEFORM.slice(0, 23).map((height, index) => (
              <span
                key={index}
                className="mic-wave-bar rounded-full"
                style={{
                  width: "clamp(1.5px, 0.65vw, 3px)",
                  height: `${Math.max(12, height * 1.15)}%`,
                  backgroundColor:
                    index % 5 === 0
                      ? "var(--primary)"
                      : "var(--foreground)",
                  opacity: 0.4 + ((index * 3) % 5) * 0.12,
                  animationDuration: `${1.1 + (index % 5) * 0.18}s`,
                  animationDelay: `${index * -0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI interviewer card */}
      <div className="absolute left-0 top-[12%] z-10 w-[61%] rounded-xl border border-border bg-card/95 p-2.5 shadow-xl backdrop-blur-xl sm:left-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:left-[-5%]">

        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Mic className="size-3.5" />
          </div>

          <span className="truncate text-[9px] font-extrabold tracking-[0.12em] text-muted-foreground sm:text-[10px]">
            AI INTERVIEWER
          </span>

          <span className="ml-auto size-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
        </div>

        <p className="mt-2.5 text-[10px] leading-[1.55] text-card-foreground sm:text-xs sm:leading-5">
          How would you optimize a React app that renders thousands of items?
        </p>

        <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-primary sm:text-[10px]">
          <AudioLines className="size-3.5 shrink-0" />
          <span className="truncate">Follow-up questions included</span>
        </div>
      </div>

      {/* Candidate response */}
      <div className="absolute bottom-[12%] right-0 z-10 w-[61%] rounded-xl border border-border bg-card/95 p-2.5 shadow-xl backdrop-blur-xl sm:right-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:right-[-5%]">

        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Code2 className="size-3.5" />
          </div>

          <span className="truncate text-[9px] font-extrabold tracking-[0.12em] text-muted-foreground sm:text-[10px]">
            YOUR RESPONSE
          </span>
        </div>

        <p className="mt-2.5 text-[10px] leading-[1.55] text-card-foreground sm:text-xs sm:leading-5">
          I&apos;d profile re-renders first, then use virtualization for large
          lists and memoization.
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex h-4 min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
            {WAVEFORM.slice(0, 28).map((height, index) => (
              <span
                key={index}
                className="w-[2px] shrink-0 rounded-full bg-primary/70"
                style={{
                  height: Math.max(3, height * 0.35),
                }}
              />
            ))}
          </div>

          <span className="shrink-0 text-[9px] font-semibold text-primary">
            Voice preview
          </span>
        </div>
      </div>

      {/* AI status */}
      <div className="absolute right-[3%] top-[9%] hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg min-[430px]:flex">
        <span className="size-1.5 rounded-full bg-primary" />

        <span className="text-[10px] font-bold text-muted-foreground">
          AI ready
        </span>
      </div>

      {/* Voice indicator */}
      <div className="absolute bottom-0 left-[7%] z-20 flex max-w-[55%] items-center gap-2 rounded-full border border-border bg-card px-2.5 py-2 shadow-xl sm:left-[5%] sm:px-3">

        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Mic2 className="size-3.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-extrabold text-card-foreground">
            Think out loud
          </p>

          <p className="truncate text-[9px] text-muted-foreground">
            Practice without pressure
          </p>
        </div>
      </div>

      {/* Orbital accent */}
      <div className="absolute bottom-[2%] right-[8%] flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg">
        <Waves className="size-4" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background text-foreground lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center">

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[58%] top-[5%] size-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />

        <div className="absolute -left-40 bottom-[-180px] size-[400px] rounded-full bg-accent/30 blur-[100px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.08] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-6 xl:px-16">

        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 xl:gap-8">

          {/* Left content */}
          <div className="relative z-10 mx-auto w-full max-w-[550px] lg:mx-0">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-2 text-[10px] font-extrabold tracking-[0.1em] text-primary sm:text-xs">
              <Bot className="size-4" />
              AI-POWERED INTERVIEW PREPARATION
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-[clamp(2.65rem,5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.065em]">
              Make your
              <br />
              next interview
              <br />
              <span className="text-primary">
                your best one.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[460px] text-sm leading-7 text-muted-foreground sm:text-base">
              Know what to prepare, practice real interview conversations
              with AI, and build the confidence to walk into your next
              opportunity ready.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">

              <Link
                href={ROUTES.register}
                className="
                  group inline-flex h-12 items-center justify-center gap-2
                  rounded-xl border border-primary/30 bg-primary px-5
                  text-sm font-extrabold text-primary-foreground
                  shadow-lg shadow-primary/15 transition-all duration-200
                  hover:-translate-y-0.5 hover:brightness-110
                  hover:shadow-xl hover:shadow-primary/20
                  active:translate-y-0
                "
              >
                Ace Your Next Interview

                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#how-it-works"
                className="
                  inline-flex h-12 items-center justify-center gap-2
                  rounded-xl border border-border bg-card px-4
                  text-sm font-bold text-foreground
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:border-primary/40
                  hover:bg-accent/50
                "
              >
                Explore the platform

                <ArrowDownRight className="size-4 text-muted-foreground" />
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground">

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                Personal roadmap
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                Voice practice
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                Actionable feedback
              </span>
            </div>

            {/* Trust statement */}
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">

              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <AudioLines className="size-4" />
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                <span className="font-extrabold text-foreground">
                  Preparation with purpose.
                </span>{" "}
                Not another list of things to memorize.
              </p>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
            <NeuralCore />
          </div>

        </div>
      </div>
    </section>
  );
}
