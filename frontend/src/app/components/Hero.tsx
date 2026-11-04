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
//   Sparkles,
//   Waves,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { ROUTES } from "@/lib/routes";

// const WAVEFORM = [
//   12, 18, 27, 15, 34, 22, 42, 29, 17, 36, 48, 25, 15, 31, 43, 21, 35, 17, 28,
//   45, 23, 13, 33, 20, 39, 26, 16, 30, 44, 19, 34, 14, 24, 38, 20, 12,
// ];

// function NeuralCore() {
//   return (
//     <div className="relative mx-auto aspect-square w-full max-w-[560px]">
//       {/* Ambient light */}
//       <div className="absolute inset-[12%] rounded-full bg-indigo-600/20 blur-[85px]" />
//       <div className="absolute inset-[23%] rounded-full bg-violet-500/15 blur-[65px]" />

//       {/* Orbital paths */}
//       <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/[0.12]" />
//       <div className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.14]" />
//       <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/[0.12]" />

//       {/* Orbital highlights */}
//       <div className="absolute left-[16%] top-[27%] size-2 rounded-full bg-cyan-200 shadow-[0_0_18px_5px_rgba(103,232,249,0.35)]" />
//       <div className="absolute right-[14%] top-[37%] size-1.5 rounded-full bg-violet-200 shadow-[0_0_16px_4px_rgba(196,181,253,0.4)]" />
//       <div className="absolute bottom-[21%] left-[29%] size-1.5 rounded-full bg-indigo-200 shadow-[0_0_15px_4px_rgba(165,180,252,0.4)]" />
//       <div className="absolute bottom-[30%] right-[21%] size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_5px_rgba(103,232,249,0.3)]" />

//       {/* Main AI core */}
//       <div className="neural-core-pulse absolute left-1/2 top-1/2 flex aspect-square w-[48%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
//         <div className="neural-core-glow absolute inset-0 rounded-full bg-indigo-500/15 blur-2xl" />

//         <div className="absolute inset-0 rounded-full border border-indigo-200/25 bg-gradient-to-br from-indigo-300/[0.13] via-violet-500/[0.08] to-cyan-300/[0.13] shadow-[inset_0_0_45px_rgba(129,140,248,0.13),0_0_65px_rgba(99,102,241,0.13)] backdrop-blur-md" />

//         <div className="absolute inset-[9%] rounded-full border border-white/[0.10] bg-gradient-to-br from-[#22264b] via-[#14152c] to-[#0b1929]" />

//         <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(196,181,253,0.42),transparent_32%),radial-gradient(circle_at_65%_72%,rgba(34,211,238,0.28),transparent_38%),linear-gradient(140deg,#29255a_0%,#17152f_48%,#0b2434_100%)] shadow-[inset_-12px_-15px_35px_rgba(0,0,0,0.4),inset_8px_8px_25px_rgba(199,210,254,0.12)]" />

//         {/* Core waveform */}
//         <div className="relative flex h-16 items-center justify-center gap-[3px] sm:h-20 sm:gap-1">
//           {WAVEFORM.slice(0, 23).map((height, index) => (
//             <span
//               key={index}
//               className={`mic-wave-bar rounded-full ${
//                 index % 5 === 0 ? "bg-cyan-200" : "bg-indigo-200"
//               }`}
//               style={{
//                 width: 3,
//                 height: `${Math.max(10, height * 1.35)}%`,
//                 opacity: 0.55 + ((index * 3) % 5) * 0.09,
//                 animationDuration: `${2.2 + (index % 5) * 0.25}s`,
//                 animationDelay: `${index * -0.18}s`,
//               }}
//             />
//           ))}
//         </div>
//         <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.11),transparent_35%,transparent_72%,rgba(103,232,249,0.06))]" />
//       </div>
//       <div className="absolute left-0 top-[17%] w-[57%] rounded-xl border border-white/[0.12] bg-[#101321]/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:left-[-1%] sm:w-[53%] sm:p-4">
//         <div className="flex items-center gap-2">
//           <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-200">
//             <Mic className="size-3.5" />
//           </div>
//           <span className="text-[9px] font-semibold tracking-[0.14em] text-slate-400 sm:text-[10px]">
//             AI INTERVIEWER
//           </span>
//           <span className="ml-auto size-1.5 rounded-full bg-emerald-400" />
//         </div>
//         <p className="mt-3 text-[11px] leading-[1.65] text-slate-200 sm:text-xs sm:leading-5">
//           How would you optimize a React app that renders thousands of items?
//         </p>
//         <div className="mt-3 flex items-center gap-1.5 text-[9px] text-violet-300">
//           <AudioLines className="size-3.5" />
//           <span>Follow-up questions included</span>
//         </div>
//       </div>

//       {/* Candidate response */}
//       <div className="absolute bottom-[17%] right-0 w-[58%] rounded-xl border border-cyan-200/[0.15] bg-[#0d1820]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:right-[-1%] sm:w-[54%] sm:p-4">
//         <div className="flex items-center gap-2">
//           <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
//             <Code2 className="size-3.5" />
//           </div>
//           <span className="text-[9px] font-semibold tracking-[0.12em] text-slate-400 sm:text-[10px]">
//             YOUR RESPONSE
//           </span>
//         </div>
//         <p className="mt-3 text-[11px] leading-[1.65] text-slate-300 sm:text-xs sm:leading-5">
//           I&apos;d profile re-renders first, then use virtualization for large
//           lists and memoization where needed.
//         </p>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex h-5 flex-1 items-center gap-[2px] overflow-hidden">
//             {WAVEFORM.slice(0, 28).map((height, index) => (
//               <span
//                 key={index}
//                 className="w-[2px] shrink-0 rounded-full bg-cyan-300/75"
//                 style={{ height: Math.max(3, height * 0.45) }}
//               />
//             ))}
//           </div>
//           <span className="text-[9px] text-cyan-200">Voice preview</span>
//         </div>
//       </div>

//       {/* Floating status */}
//       <div className="absolute right-[3%] top-[9%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#111321]/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:flex">
//         <span className="size-1.5 rounded-full bg-emerald-400" />
//         <span className="text-[10px] text-slate-300">AI ready</span>
//       </div>

//       {/* Bottom voice indicator */}
//       <div className="absolute bottom-[7%] left-[7%] flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-[#111321]/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:bottom-[8%] sm:left-[5%] sm:px-4 sm:py-2.5">
//         <div className="flex size-7 items-center justify-center rounded-full bg-indigo-400/15 text-indigo-200">
//           <Mic2 className="size-3.5" />
//         </div>
//         <div>
//           <p className="text-[10px] font-medium text-white">Think out loud</p>
//           <p className="mt-0.5 text-[9px] text-slate-500">
//             Practice without pressure
//           </p>
//         </div>
//       </div>

//       {/* Orbital accent */}
//       <div className="absolute bottom-[9%] right-[8%] flex size-8 items-center justify-center rounded-full border border-indigo-200/20 bg-indigo-400/10 text-indigo-200">
//         <Waves className="size-4" />
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   return (
//     <section className="relative isolate overflow-hidden bg-[#080a12] text-white lg:h-[calc(100svh-72px)] lg:min-h-[620px] lg:max-h-[900px]">
//       {/* Background atmosphere */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//       >
//         <div className="absolute left-[57%] top-[5%] size-[550px] -translate-x-1/2 rounded-full bg-indigo-600/[0.11] blur-[130px]" />
//         <div className="absolute -left-52 bottom-[-250px] size-[500px] rounded-full bg-violet-700/[0.07] blur-[120px]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(99,102,241,0.07),transparent_50%)]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
//       </div>

//       <div className="mx-auto flex min-h-full max-w-[1360px] items-center px-5 py-12 sm:px-8 sm:py-14 lg:h-full lg:px-12 lg:py-8 xl:px-16">
//         <div className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4 xl:gap-8">
//           {/* Left: messaging and CTA */}
//           <div className="relative z-10 mx-auto w-full max-w-[560px] lg:mx-0 lg:py-5">
//             <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.035] px-3.5 py-2 backdrop-blur-xl">
//               <span className="flex size-5 items-center justify-center rounded-full bg-indigo-300/15 text-indigo-200">
//                 <Bot className="size-3 text-indigo-400" />
//               </span>
//               <span className="text-[10px] font-medium tracking-wide text-slate-300 sm:text-xs">
//                 AI-POWERED INTERVIEW PREPARATION
//               </span>
//             </div>

//             <h1 className="mt-5 text-[clamp(2.8rem,5.2vw,5.25rem)] font-semibold leading-[0.99] tracking-[-0.07em]">
//               Make your
//               <br />
//               next interview
//               <br />
//               <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
//                 your best one.
//               </span>
//             </h1>

//             <p className="mt-5 max-w-[440px] text-sm leading-7 text-slate-400 sm:text-[15px] sm:leading-7">
//               Know what to prepare, practice real interview conversations with
//               AI, and build the confidence to walk into your next opportunity
//               ready.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
//               {/* Primary CTA */}
//               <Button
//                 size="lg"
//                 className="cta-primary-auto group relative isolate h-12 overflow-hidden rounded-xl border border-indigo-200/25 bg-indigo-500 px-5 font-semibold text-white transition-colors duration-300 hover:bg-indigo-400"
//               >
//                 <Link
//                   href={ROUTES.register}
//                   className="relative z-10 inline-flex items-center"
//                 >
//                   <span>Ace Your Next Interview</span>
//                   <ArrowRight className="cta-arrow ml-2 size-4" />
//                 </Link>

//                 <span
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
//                 />
//               </Button>

//               {/* Secondary CTA */}
//               <Button
//                 variant="ghost"
//                 size="lg"
//                 className="group h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-slate-300 transition-all duration-300 hover:border-indigo-200/20 hover:bg-white/[0.055] hover:text-white active:scale-[0.98]"
//               >
//                 <Link href="#how-it-works" className="inline-flex items-center">
//                   <span>Explore the platform</span>
//                   <ArrowDownRight className="ml-2 size-4 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-indigo-200" />
//                 </Link>
//               </Button>
//             </div>

//             <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-slate-400">
//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-emerald-300" />
//                 Personal roadmap
//               </span>
//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-emerald-300" />
//                 Voice practice
//               </span>
//               <span className="inline-flex items-center gap-2">
//                 <Check className="size-3.5 text-emerald-300" />
//                 Actionable feedback
//               </span>
//             </div>

//             <div className="mt-8 flex items-center gap-3 border-t border-white/[0.09] pt-5">
//               <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-indigo-200">
//                 <AudioLines className="size-4" />
//               </div>
//               <p className="text-xs leading-5 text-slate-500">
//                 <span className="font-medium text-slate-300">
//                   Preparation with purpose.
//                 </span>{" "}
//                 <br className="hidden sm:block" />
//                 Not another list of things to memorize.
//               </p>
//             </div>
//           </div>

//           {/* Right: custom AI visual */}
//           <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
//             <NeuralCore />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Link from "next/link";
// import {
//   ArrowRight,
//   BadgeCheck,
//   Bot,
//   Brain,
//   CheckCircle2,
//   Mic,
//   Play,
//   Sparkles,
//   Star,
//   Target,
// } from "lucide-react";

// import { ROUTES } from "@/lib/routes";

// const WAVEFORM = [
//   18, 30, 23, 42, 27, 48, 34, 21, 38, 52, 29, 41, 19, 33, 45, 25, 37, 16, 30,
//   43, 22, 35,
// ];

// export default function ClaymorphismHero() {
//   return (
//     <section className="relative isolate min-h-screen overflow-hidden bg-[var(--clay-bg)] text-[var(--clay-ink)]">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[440px] rounded-full bg-[var(--clay-peach)]/60 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[480px] rounded-full bg-[var(--clay-sage)]/60 blur-3xl"
//       />

//       <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-14 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.94fr] lg:gap-12 lg:px-12 lg:py-20">
//         <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
//           <div className="clay-raised inline-flex max-w-full items-center gap-2 rounded-full bg-[var(--clay-sage)] px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--clay-sage-ink)] sm:px-4 sm:text-xs">
//             <Bot className="size-4 shrink-0" />
//             <span>Small practice. Big confidence.</span>
//           </div>

//           <h1 className="mt-7 max-w-2xl text-[clamp(2.75rem,5.5vw,5rem)] font-black leading-[1.02] tracking-[-0.065em]">
//             Your next big thing starts with a{" "}
//             <span className="text-[var(--clay-primary)]">practice run.</span>
//           </h1>

//           <p className="mt-6 max-w-xl text-base leading-7 text-[var(--clay-muted)] sm:text-lg sm:leading-8">
//             Prepare for technical interviews with an AI partner. Practice
//             explaining your thinking, strengthen your answers, and learn from
//             every session.
//           </p>

//           {/* Consistent CTA alignment */}
//           <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
//             <Link
//               href={ROUTES.register}
//               className="clay-button-shadow inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-[var(--clay-primary)] px-6 py-4 text-center text-sm font-extrabold text-[var(--clay-primary-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--clay-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clay-bg)] active:translate-y-0 sm:w-auto sm:min-w-[224px] sm:text-base"
//             >
//               Start a mock interview
//               <ArrowRight className="size-4 shrink-0" />
//             </Link>

//             <Link
//               href="#practice"
//               className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)]/70 px-6 py-4 text-center text-sm font-bold text-[var(--clay-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--clay-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clay-bg)] sm:w-auto sm:min-w-[176px] sm:text-base"
//             >
//               <Play className="size-4 shrink-0 fill-current" />
//               Explore preview
//             </Link>
//           </div>

//           <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[var(--clay-muted)]">
//             <span className="inline-flex items-center gap-2">
//               <CheckCircle2 className="size-4 shrink-0 text-[var(--clay-green-ink)]" />
//               Practice at your pace
//             </span>
//             <span className="inline-flex items-center gap-2">
//               <CheckCircle2 className="size-4 shrink-0 text-[var(--clay-green-ink)]" />
//               Actionable feedback
//             </span>
//           </div>

//           {/* Trust statement */}
//           <div className="mt-9 flex items-start gap-4 border-t border-[var(--clay-border)] pt-6 sm:mt-11 sm:pt-7">
//             <span className="clay-raised grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] sm:size-12">
//               <BadgeCheck className="size-5" />
//             </span>

//             <div className="min-w-0">
//               <p className="font-extrabold">Progress, not pressure.</p>
//               <p className="mt-1 text-sm leading-6 text-[var(--clay-muted)]">
//                 Practice in your own space and build confidence one attempt at a
//                 time.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right: Interview preview */}
//         <div className="relative mx-auto w-full min-w-0 max-w-[530px] lg:mx-0 lg:justify-self-end">
//           {/* Decorative shapes stay behind the card */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-2 top-8 -z-10 size-16 rotate-12 rounded-[1.5rem] bg-[var(--clay-blue)] shadow-[inset_4px_4px_8px_var(--clay-highlight),5px_6px_0_var(--clay-blue-shadow)] sm:-right-4 sm:size-20"
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-3 -left-2 -z-10 size-14 -rotate-12 rounded-[1.4rem] bg-[var(--clay-sage)] shadow-[inset_4px_4px_8px_var(--clay-highlight),5px_6px_0_var(--clay-sage-shadow)] sm:-left-4 sm:size-20"
//           />

//           <div className="clay-card relative min-w-0 rounded-[2rem] bg-[var(--clay-surface)] p-4 sm:rounded-[2.5rem] sm:p-6 md:p-7">
//             {/* Preview heading */}
//             <div className="flex min-w-0 items-center justify-between gap-3">
//               <div className="min-w-0">
//                 <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--clay-subtle)] sm:text-xs">
//                   AI interview simulator
//                 </p>
//                 <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
//                   Your practice room
//                 </h2>
//               </div>

//               <span className="clay-raised grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--clay-sage)] text-[var(--clay-sage-ink)] sm:size-12">
//                 <Target className="size-5" />
//               </span>
//             </div>

//             {/* Interview question */}
//             <div
//               id="practice"
//               className="clay-inset mt-6 min-w-0 rounded-[1.5rem] bg-[var(--clay-surface-warm)] p-4 sm:mt-7 sm:rounded-[1.8rem] sm:p-5"
//             >
//               <div className="flex min-w-0 items-center gap-3">
//                 <span className="clay-raised grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--clay-primary)] text-[var(--clay-primary-ink)] sm:size-12 sm:rounded-2xl">
//                   <Mic className="size-5" />
//                 </span>

//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm font-extrabold sm:text-base">
//                     AI interviewer
//                   </p>
//                   <p className="mt-1 text-xs font-semibold text-[var(--clay-subtle)]">
//                     Frontend developer · Question 03
//                   </p>
//                 </div>

//                 <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--clay-sage)] px-2.5 py-1.5 text-[10px] font-bold text-[var(--clay-sage-ink)] sm:text-xs">
//                   <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />
//                   Ready
//                 </span>
//               </div>

//               <p className="mt-5 text-base font-bold leading-7 sm:text-lg sm:leading-8">
//                 “Tell me about a tricky bug you solved and how you approached
//                 it.”
//               </p>

//               {/* Animated audio waveform */}
//               <div
//                 aria-label="Animated audio waveform preview"
//                 role="img"
//                 className="mt-5 flex h-14 w-full items-center justify-center gap-[3px] overflow-hidden rounded-xl px-1 sm:gap-1"
//               >
//                 {WAVEFORM.map((height, index) => (
//                   <span
//                     key={index}
//                     aria-hidden="true"
//                     className="clay-wave-bar block w-[3px] shrink-0 rounded-full bg-[var(--clay-primary)] sm:w-1"
//                     style={{
//                       height: `${height}px`,
//                       // animationDelay: `${(index % 11) * -0.11}s`,
//                       opacity: 0.55 + ((index * 3) % 5) * 0.09,
//                       animationDuration: `${2.2 + (index % 5) * 0.25}s`,
//                       animationDelay: `${index * -0.18}s`,
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--clay-border)]/70 pt-3 text-xs font-semibold text-[var(--clay-muted)]">
//                 <span className="inline-flex items-center gap-2">
//                   <Mic className="size-3.5" />
//                   Voice interview
//                 </span>
//                 <span className="inline-flex items-center gap-1.5">
//                   <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />
//                   Preview mode
//                 </span>
//               </div>
//             </div>

//             {/* Aligned feature cards */}
//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
//               <div
//                 id="feedback"
//                 className="clay-feature-sage flex min-w-0 flex-col rounded-2xl p-4 sm:min-h-[146px]"
//               >
//                 <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--clay-surface)]/70">
//                   <BadgeCheck className="size-5 text-[var(--clay-green-ink)]" />
//                 </span>
//                 <p className="mt-3 text-sm font-extrabold">
//                   Supportive feedback
//                 </p>
//                 <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
//                   See what worked and where to improve.
//                 </p>
//               </div>

//               <div
//                 id="journey"
//                 className="clay-feature-blue flex min-w-0 flex-col rounded-2xl p-4 sm:min-h-[146px]"
//               >
//                 <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--clay-surface)]/70">
//                   <Brain className="size-5 text-[var(--clay-blue-ink)]" />
//                 </span>
//                 <p className="mt-3 text-sm font-extrabold">Stronger answers</p>
//                 <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
//                   Improve clarity with every attempt.
//                 </p>
//               </div>
//             </div>

//             {/* Bottom callout stays inside the card */}
//             <div className="mt-4 flex min-w-0 items-center gap-3 rounded-2xl bg-[var(--clay-bg)] p-3.5 sm:p-4">
//               <span className="clay-raised grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--clay-peach)] text-[var(--clay-ink)]">
//                 <Star className="size-4 fill-current" />
//               </span>

//               <div className="min-w-0 flex-1">
//                 <p className="text-sm font-extrabold">
//                   Every attempt moves you forward
//                 </p>
//                 <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
//                   Build your confidence one session at a time.
//                 </p>
//               </div>

//               <ArrowRight className="size-4 shrink-0 text-[var(--clay-subtle)]" />
//             </div>
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
  12, 18, 27, 15, 34, 22, 42, 29, 17, 36, 48, 25, 15, 31, 43, 21,
  35, 17, 28, 45, 23, 13, 33, 20, 39, 26, 16, 30, 44, 19, 34, 14,
  24, 38, 20, 12,
];

function NeuralCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[470px] min-w-0">

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-[16%] rounded-full bg-[var(--clay-peach)]/50 blur-[clamp(25px,6vw,65px)]" />

      <div className="pointer-events-none absolute inset-[27%] rounded-full bg-[var(--clay-sage)]/45 blur-[clamp(20px,5vw,55px)]" />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-peach-shadow)]/50" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-sage-shadow)]/55" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--clay-blue-shadow)]/60" />

      {/* Orbital highlights */}
      <div className="absolute left-[16%] top-[27%] size-1.5 rounded-full bg-[var(--clay-primary)] shadow-[0_0_12px_3px_rgba(255,139,106,0.25)] sm:size-2" />

      <div className="absolute right-[14%] top-[37%] size-1.5 rounded-full bg-[var(--clay-sage-ink)]" />

      <div className="absolute bottom-[21%] left-[29%] size-1.5 rounded-full bg-[var(--clay-blue-ink)]" />

      <div className="absolute bottom-[30%] right-[21%] size-1.5 rounded-full bg-[var(--clay-primary)] sm:size-2" />

      {/* Main AI core */}
      <div className="neural-core-pulse absolute left-1/2 top-1/2 flex aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">

        <div className="neural-core-glow absolute inset-0 rounded-full bg-[var(--clay-primary)]/20 blur-xl sm:blur-2xl" />

        <div className="absolute inset-0 rounded-full border border-white/70 bg-gradient-to-br from-[var(--clay-surface)] via-[var(--clay-peach)] to-[var(--clay-blue)] shadow-[inset_0_0_24px_rgba(255,255,255,0.8),0_8px_20px_rgba(101,70,49,0.10)]" />

        <div className="absolute inset-[9%] rounded-full border border-white/70 bg-gradient-to-br from-[#f9e3d7] via-[#e9d8e9] to-[#d8e9e5]" />

        <div className="absolute inset-[18%] flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(255,255,255,0.95),transparent_32%),radial-gradient(circle_at_65%_72%,rgba(128,168,90,0.28),transparent_38%),linear-gradient(140deg,#f6c8b4_0%,#e9d6e6_48%,#d4e9e8_100%)] shadow-[inset_-8px_-10px_20px_rgba(101,70,49,0.12),inset_6px_6px_15px_rgba(255,255,255,0.8)]">

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
                      ? "var(--clay-primary)"
                      : "var(--clay-blue-ink)",
                  opacity: 0.6 + ((index * 3) % 5) * 0.08,
                  animationDuration: `${1.1 + (index % 5) * 0.18}s`,
                  animationDelay: `${index * -0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI interviewer card */}
      <div className="absolute left-0 top-[17%] z-10 w-[61%] min-w-0 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)]/95 p-2 shadow-[0_5px_14px_rgba(101,70,49,0.08)] backdrop-blur-md min-[380px]:p-2.5 sm:left-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:left-[-5%]">

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--clay-sage)] text-[var(--clay-sage-ink)] sm:size-7">
            <Mic className="size-3 sm:size-3.5" />
          </div>

          <span className="truncate text-[8px] font-extrabold tracking-[0.08em] text-[var(--clay-muted)] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.12em]">
            AI INTERVIEWER
          </span>

          <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[var(--clay-status)]" />
        </div>

        <p className="mt-2 text-[9px] leading-[1.55] text-[var(--clay-ink)] min-[380px]:text-[10px] sm:mt-2.5 sm:text-xs sm:leading-5">
          How would you optimize a React app that renders thousands of items?
        </p>

        <div className="mt-2 flex min-w-0 items-center gap-1 text-[8px] font-semibold text-[var(--clay-blue-ink)] min-[380px]:text-[9px]">
          <AudioLines className="size-3 shrink-0 sm:size-3.5" />
          <span className="truncate">Follow-up questions included</span>
        </div>
      </div>

      {/* Candidate response */}
      <div className="absolute bottom-[12%] right-0 z-10 w-[61%] min-w-0 rounded-xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-surface)]/95 p-2 shadow-[0_5px_14px_rgba(101,70,49,0.08)] backdrop-blur-md min-[380px]:p-2.5 sm:right-[-3%] sm:w-[60%] sm:rounded-2xl sm:p-3.5 lg:right-[-5%]">

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] sm:size-7">
            <Code2 className="size-3 sm:size-3.5" />
          </div>

          <span className="truncate text-[8px] font-extrabold tracking-[0.08em] text-[var(--clay-muted)] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.12em]">
            YOUR RESPONSE
          </span>
        </div>

        <p className="mt-2 text-[9px] leading-[1.55] text-[var(--clay-ink)] min-[380px]:text-[10px] sm:mt-2.5 sm:text-xs sm:leading-5">
          I&apos;d profile re-renders first, then use virtualization for large
          lists and memoization where needed.
        </p>

        <div className="mt-2 flex min-w-0 items-center gap-1.5">
          <div className="flex h-4 min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
            {WAVEFORM.slice(0, 28).map((height, index) => (
              <span
                key={index}
                className="w-[2px] shrink-0 rounded-full bg-[var(--clay-blue-ink)]"
                style={{
                  height: Math.max(3, height * 0.35),
                }}
              />
            ))}
          </div>

          <span className="shrink-0 text-[8px] font-semibold text-[var(--clay-blue-ink)] min-[380px]:text-[9px]">
            Voice preview
          </span>
        </div>
      </div>

      {/* AI status */}
      <div className="absolute right-[3%] top-[9%] hidden items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3 py-1.5 shadow-sm min-[430px]:flex">
        <span className="size-1.5 rounded-full bg-[var(--clay-status)]" />

        <span className="text-[10px] font-bold text-[var(--clay-muted)]">
          AI ready
        </span>
      </div>

      {/* Voice indicator */}
      <div className="absolute bottom-[7%] left-[7%] z-20 flex max-w-[55%] items-center gap-1.5 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-2 py-1.5 shadow-[0_4px_10px_rgba(101,70,49,0.07)] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:py-2 sm:bottom-[8%] sm:left-[5%]">

        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--clay-sage)] text-[var(--clay-sage-ink)] min-[380px]:size-7">
          <Mic2 className="size-3 sm:size-3.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-extrabold text-[var(--clay-ink)] min-[380px]:text-[10px]">
            Think out loud
          </p>

          <p className="truncate text-[8px] text-[var(--clay-muted)] min-[380px]:text-[9px]">
            Practice without pressure
          </p>
        </div>
      </div>

      {/* Orbital accent */}
      <div className="absolute bottom-[2%] right-[8%] flex size-6 items-center justify-center rounded-full border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] min-[380px]:size-8">
        <Waves className="size-3.5 min-[380px]:size-4" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--clay-bg)] text-[var(--clay-ink)] lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center">

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[58%] top-[5%] size-[400px] -translate-x-1/2 rounded-full bg-[var(--clay-peach)]/35 blur-[110px]" />

        <div className="absolute -left-40 bottom-[-180px] size-[400px] rounded-full bg-[var(--clay-sage)]/40 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-6 xl:px-16">

        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 xl:gap-8">

          {/* Left content */}
          <div className="relative z-10 mx-auto w-full max-w-[550px] lg:mx-0">

            <div className="clay-raised inline-flex items-center gap-2 rounded-full bg-[var(--clay-sage)] px-3.5 py-2 text-[10px] font-extrabold tracking-[0.1em] text-[var(--clay-sage-ink)] sm:text-xs">

              <Bot className="size-4" />

              AI-POWERED INTERVIEW PREPARATION
            </div>

            <h1 className="mt-5 text-[clamp(2.65rem,5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.065em]">

              Make your
              <br />

              next interview
              <br />

              <span className="text-[var(--clay-primary)]">
                your best one.
              </span>
            </h1>

            <p className="mt-4 max-w-[440px] text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
              Know what to prepare, practice real interview conversations
              with AI, and build the confidence to walk into your next
              opportunity ready.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

              <Link
                href={ROUTES.register}
                className="clay-button-shadow group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--clay-primary)] px-5 text-sm font-extrabold text-[var(--clay-primary-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--clay-primary-hover)] active:translate-y-0"
              >
                Ace Your Next Interview

                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] px-4 text-sm font-bold text-[var(--clay-ink)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Explore the platform

                <ArrowDownRight className="size-4 text-[var(--clay-subtle)]" />
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[var(--clay-muted)]">

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-[var(--clay-green-ink)]" />
                Personal roadmap
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-[var(--clay-green-ink)]" />
                Voice practice
              </span>

              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-[var(--clay-green-ink)]" />
                Actionable feedback
              </span>
            </div>

            {/* Trust statement */}
            <div className="mt-7 flex items-center gap-3 border-t border-[var(--clay-border)] pt-4">

              <div className="clay-raised flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]">
                <AudioLines className="size-4" />
              </div>

              <p className="text-xs leading-5 text-[var(--clay-muted)]">
                <span className="font-extrabold text-[var(--clay-ink)]">
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