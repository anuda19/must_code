// import Link from "next/link";
// import { Code2, Sparkles, Video, Bot, ArrowLeft, ShieldCheck } from "lucide-react";
// import RegisterForm from "@/app/components/RegisterForm";

import Navbar from "@/app/components/Navigation";
import RegisterForm from "@/app/components/RegisterForm";

// export default function RegisterPage() {
//   return (
//     <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#080a12] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">

//       {/* --- Left Column: Immersive Brand & Value Showcase --- */}
//       <div className="relative hidden lg:flex lg:col-span-6 flex-col justify-between p-12 xl:p-16 border-r border-white/10 bg-gradient-to-br from-[#0c0f1d] via-[#080a12] to-[#05060b]">
//         {/* Ambient Glows */}
//         <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
//         <div className="absolute bottom-10 right-10 size-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

//         {/* Top Header / Back to Home */}
//         <div className="relative z-10 flex items-center justify-between">
//           <Link
//             href="/"
//             aria-label="X Code home"
//             className="group flex items-center gap-2.5 outline-none"
//           >
//             <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
//               <Code2 className="size-5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
//             </div>
//             <span className="text-[22px] font-bold tracking-tight text-white">
//               X<span className="text-indigo-400">Code</span>
//             </span>
//           </Link>

//           <Link
//             href="/"
//             className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
//           >
//             <ArrowLeft className="size-3.5" />
//             <span>Back to website</span>
//           </Link>
//         </div>

//         {/* Center Hero Copy & Mission */}
//         <div className="relative z-10 my-auto max-w-lg py-12">
//           <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
//             <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
//             <span>Engineer Your Way to Big Tech</span>
//           </div>

//           <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
//             Master technical interviews with{" "}
//             <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
//               real-time AI voice agents.
//             </span>
//           </h1>

//           <p className="mt-4 text-sm leading-relaxed text-slate-400">
//             Join thousands of software engineers leveling up their coding, system design, and communication skills to stand out and get noticed by top-tier tech companies.
//           </p>

//           {/* Feature Highlights Pills */}
//           <div className="mt-8 grid grid-cols-2 gap-3">
//             <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm">
//               <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                 <Video className="size-4" />
//               </div>
//               <span className="text-xs font-medium text-slate-300">Live AI Mock Interviews</span>
//             </div>

//             <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm">
//               <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
//                 <Bot className="size-4" />
//               </div>
//               <span className="text-xs font-medium text-slate-300">Instant AI Tech Assistant</span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Trust Footer */}
//         <div className="relative z-10 flex items-center gap-2 text-xs text-slate-500">
//           <ShieldCheck className="size-4 text-emerald-400" />
//           <span>Secure 256-bit SSL encryption & privacy-first developer sandbox.</span>
//         </div>
//       </div>

//       {/* --- Right Column: Registration Form Container --- */}
//       <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative">
//         {/* Mobile top logo header */}
//         <div className="w-full max-w-md flex items-center justify-between mb-8 lg:hidden">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="flex size-9 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
//               <Code2 className="size-4" strokeWidth={2.5} />
//             </div>
//             <span className="text-xl font-bold text-white">X<span className="text-indigo-400">Code</span></span>
//           </Link>
//           <Link href="/" className="text-xs text-slate-400 hover:text-white">Back</Link>
//         </div>

//         <RegisterForm />
//       </div>
//     </main>
//   );
// }

// export const metadata = {
//   title: "Create Your Account | Xcode Technologies",
//   description:
//     "Join Xcode Technologies and start building your future with modern development resources and tools.",
// };

// export default function RegisterPage() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#080b16] text-white">
//       {/* Ambient background */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-48 top-32 h-[500px] w-[500px] rounded-full bg-violet-600/[0.12] blur-[130px]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.07] blur-[130px]"
//       />

//       <Navbar />

//       <section className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1440px] items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-14">
//         {/* Left: Brand experience */}
//         <div className="relative flex flex-col justify-center lg:py-8">
//           <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 text-xs font-medium text-violet-200 sm:text-sm">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
//             </span>
//             YOUR NEXT CHAPTER STARTS HERE
//           </div>

//           <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl">
//             Turn your ideas into{" "}
//             <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
//               something extraordinary.
//             </span>
//           </h1>

//           <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
//             Your ambition deserves the right tools. Join Xcode Technologies
//             to explore new possibilities, build meaningful projects, and keep
//             moving forward.
//           </p>

//           {/* Benefits */}
//           <div id="features" className="mt-9 grid gap-4 sm:grid-cols-2">
//             {[
//               {
//                 icon: "01",
//                 title: "Learn by building",
//                 description: "Turn concepts into practical skills.",
//               },
//               {
//                 icon: "02",
//                 title: "Create with purpose",
//                 description: "Build projects worth showcasing.",
//               },
//               {
//                 icon: "03",
//                 title: "Keep growing",
//                 description: "Take your development journey further.",
//               },
//               {
//                 icon: "04",
//                 title: "Think bigger",
//                 description: "Bring your ideas to life.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.icon}
//                 className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition duration-300 hover:border-violet-400/25 hover:bg-white/[0.045]"
//               >
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 font-mono text-xs text-violet-300 transition group-hover:border-violet-400/40">
//                   {item.icon}
//                 </div>

//                 <div>
//                   <h2 className="text-sm font-semibold text-slate-100">
//                     {item.title}
//                   </h2>
//                   <p className="mt-1 text-xs leading-5 text-slate-400">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Decorative code panel */}
//           <div className="relative mt-9 hidden max-w-xl overflow-hidden rounded-2xl border border-indigo-400/15 bg-[#0d1122]/80 p-5 shadow-2xl shadow-indigo-950/30 sm:block">
//             <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
//               <div className="flex items-center gap-2">
//                 <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
//                 <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
//                 <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
//               </div>
//               <span className="font-mono text-[11px] text-slate-500">
//                 your-future.ts
//               </span>
//             </div>

//             <div className="mt-4 space-y-2 font-mono text-xs leading-6 sm:text-sm">
//               <p>
//                 <span className="text-violet-400">const</span>{" "}
//                 <span className="text-cyan-300">future</span>{" "}
//                 <span className="text-slate-400">=</span>{" "}
//                 <span className="text-amber-200">{"{"}</span>
//               </p>
//               <p className="pl-5 text-slate-300">
//                 curiosity:{" "}
//                 <span className="text-emerald-300">"limitless"</span>,
//               </p>
//               <p className="pl-5 text-slate-300">
//                 learning:{" "}
//                 <span className="text-emerald-300">"continuous"</span>,
//               </p>
//               <p className="pl-5 text-slate-300">
//                 possibilities:{" "}
//                 <span className="text-emerald-300">"infinite"</span>,
//               </p>
//               <p className="text-amber-200">{"}"}</p>
//               <p className="pt-1 text-slate-500">
//                 // It all starts with one step.
//                 <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-cyan-400 align-middle" />
//               </p>
//             </div>

//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl"
//             />
//           </div>

//           <p className="mt-7 text-xs tracking-wide text-slate-500">
//             BUILT FOR CURIOSITY. DESIGNED FOR WHAT&apos;S NEXT.
//           </p>
//         </div>

//         {/* Right: Registration form */}
//         <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
//           <div
//             aria-hidden="true"
//             className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-violet-500/40 via-indigo-400/15 to-cyan-400/25 blur-[1px]"
//           />

//           <div className="relative rounded-[27px] border border-white/[0.09] bg-[#0c1020]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9 lg:p-10">
//             <div className="mb-8">
//               <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-violet-300 shadow-lg shadow-violet-950/20">
//                 <span className="font-mono text-lg font-bold">
//                   {"</>"}
//                 </span>
//               </div>

//               <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//                 Get started for free
//               </p>

//               <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
//                 Create your account
//               </h2>

//               <p className="mt-3 text-sm leading-6 text-slate-400">
//                 Start your journey. Your next big idea is closer than you
//                 think.
//               </p>
//             </div>

//             <RegisterForm />
//           </div>

//           <p className="mt-5 text-center text-xs leading-5 text-slate-500">
//             By creating an account, you agree to use our platform responsibly.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account | Xcode Technologies",
  description: "Join Xcode Technologies and start building your future.",
};

export default function RegisterPage() {
  return (
    <main className="relative flex flex-col bg-[#080b16] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-violet-600/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[110px]"
      />

      <Navbar />

      <section className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-8 px-5 py-7 sm:px-8 lg:min-h-0 lg:grid-cols-[1fr_0.88fr] lg:gap-12 lg:px-12 lg:py-5 xl:gap-20">
        {/* Left: Compact hero */}
        <div className="flex flex-col justify-center lg:min-w-0">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            YOUR NEXT CHAPTER STARTS HERE
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[clamp(2.8rem,4vw,4.5rem)]">
            Turn your ideas into{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              something extraordinary.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            Join Xcode Technologies to explore new possibilities, build
            meaningful projects, and take your development journey further.
          </p>

          {/* Minimal visual — no extra cards */}
          <div className="relative mt-6 hidden overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c1020]/70 sm:block lg:mt-8">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-violet-600/20 blur-[70px]"
            />

            <div className="relative flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                your-future.ts
              </span>
            </div>

            <div className="relative space-y-1 px-5 py-4 font-mono text-xs leading-5 sm:text-sm sm:leading-6">
              <p>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-cyan-300">future</span>{" "}
                <span className="text-slate-400">=</span>{" "}
                <span className="text-amber-200">{"{"}</span>
              </p>
              <p className="pl-5">
                <span className="text-slate-300">curiosity: </span>
                <span className="text-indigo-400">"limitless"</span>,
              </p>
              <p className="pl-5">
                <span className="text-slate-300">learning: </span>
                <span className="text-indigo-400">"continuous"</span>,
              </p>
              <p className="pl-5">
                <span className="text-slate-300">possibilities: </span>
                <span className="text-indigo-400">"infinite"</span>,
              </p>
              <p className="text-amber-200">{"}"}</p>
              <p className="pt-1 text-slate-500">
                // Your next chapter starts here.
              </p>
            </div>
          </div>

          <p className="mt-5 hidden text-[10px] tracking-[0.18em] text-slate-500 sm:block">
            BUILT FOR CURIOSITY · DESIGNED FOR WHAT&apos;S NEXT
          </p>
        </div>

        {/* Right: Compact registration card */}
        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[25px] bg-gradient-to-br from-violet-500/40 via-indigo-400/10 to-cyan-400/30"
          />

          <div className="relative rounded-[24px] border border-white/[0.08] bg-[#0c1020]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7 lg:p-7 xl:p-8">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                GET STARTED FOR FREE
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                Your next big idea starts with one step.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
