
import type { Metadata } from "next";
import LoginForm from "@/app/components/LoginForm";
import Navbar from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Welcome Back | Xcode Technologies",
  description: "Sign in to Xcode Technologies and continue your journey.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#080a12] text-white">
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
        <div className="flex flex-col justify-center lg:min-w-0">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            YOUR CAREER JOURNEY CONTINUES
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[clamp(2.8rem,4vw,4.5rem)]">
            Welcome back to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              something extraordinary.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            Pick up where you left off. Practice real interview conversations,
            sharpen your technical skills, and build the confidence to reach
            your next career milestone.
          </p>

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
                your-next-move.ts
              </span>
            </div>

            <div className="relative space-y-1 px-5 py-4 font-mono text-xs leading-5 sm:text-sm sm:leading-6">
              <p>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-cyan-300">nextStep</span>{" "}
                <span className="text-slate-400">=</span>{" "}
                <span className="text-amber-200">{"{"}</span>
              </p>

              <p className="pl-5">
                <span className="text-slate-300">practice: </span>
                <span className="text-indigo-400">"consistent"</span>,
              </p>

              <p className="pl-5">
                <span className="text-slate-300">confidence: </span>
                <span className="text-indigo-400">"growing"</span>,
              </p>

              <p className="pl-5">
                <span className="text-slate-300">nextGoal: </span>
                <span className="text-indigo-400">"dream job"</span>,
              </p>

              <p className="text-amber-200">{"}"}</p>

              <p className="pt-1 text-slate-500">
                // Your next opportunity starts here.
              </p>
            </div>
          </div>

          <p className="mt-5 hidden text-[10px] tracking-[0.18em] text-slate-500 sm:block">
            BUILT FOR CURIOSITY · DESIGNED FOR WHAT&apos;S NEXT
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[25px] bg-gradient-to-br from-violet-500/40 via-indigo-400/10 to-cyan-400/30"
          />

          <div className="relative rounded-[24px] border border-white/[0.08] bg-[#0c1020]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7 lg:p-7 xl:p-8">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                WELCOME BACK
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
                Login to your account
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                Continue your journey and get one step closer to your goals.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}