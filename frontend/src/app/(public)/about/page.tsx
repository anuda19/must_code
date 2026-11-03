"use client";
import Link from "next/link";
import { 
  Code2, 
  Sparkles, 
  Target, 
  Compass, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Lightbulb,
  Zap
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const MILESTONES = [
  {
    phase: "Phase 01",
    title: "Rigorous Technical Execution",
    description: "Building world-class mock interview simulations and AI-powered coding assistance to bridge the gap between classroom theory and big tech hiring bars.",
    status: "Current Focus",
  },
  {
    phase: "Phase 02",
    title: "Advanced Skill Tracks & Practice",
    description: "Expanding interactive courses, algorithmic problem sets, and system design challenges modeled after real engineering workflows at scale.",
    status: "Up Next",
  },
  {
    phase: "Phase 03",
    title: "The Entrepreneurial Ecosystem",
    description: "Transitioning top-tier technical minds from employee mindset to founder thinking—providing tools, mentorship, and networks to launch high-impact startups.",
    status: "The Ultimate Vision",
  },
];

const CORE_VALUES = [
  {
    icon: Target,
    title: "Uncompromising Excellence",
    description: "We don't teach shortcuts. We focus on the core fundamentals, system architecture, and deep technical clarity that top-tier companies demand.",
  },
  {
    icon: Cpu,
    title: "AI-Augmenting Mastery",
    description: "AI shouldn't replace thinking; it should amplify it. Our tools are engineered to cultivate independent problem solvers who leverage technology effectively.",
  },
  {
    icon: Lightbulb,
    title: "Founder Mentality",
    description: "Writing code is just the vehicle. True engineers understand product value, ownership, and scale—thinking like entrepreneurs from day one.",
  },
  {
    icon: Users,
    title: "Community & Leverage",
    description: "Greatness is built collectively. We are forging an ecosystem where ambitious developers push each other past conventional boundaries.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080a12] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      
      <section className="relative overflow-hidden pb-20 pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 mb-6 backdrop-blur-md">
              <Sparkles className="size-3.5" />
              <span>Redefining Engineering Excellence</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Engineering the next wave of <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-blue-400 bg-clip-text text-transparent">elite tech talent</span> & founders.
            </h1>

            <p className="mt-6 text-lg text-slate-300 sm:text-xl leading-relaxed">
              XCode was built out of a singular frustration: the gap between traditional learning and what big tech actually looks for. We are here to change that narrative permanently.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.register}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-indigo-400 hover:shadow-[0_0_35px_rgba(99,102,241,0.6)]"
              >
                <span>Explore Mock Interviews</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-slate-300 backdrop-blur-md transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                View Roadmap
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.08] bg-[#0c0f1d]/55 relative">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            <div className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 to-[#080a12] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-indigo-500/10 pointer-events-none">
                <Target className="size-32" />
              </div>
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 mb-6">
                  <Target className="size-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Our Immediate Mission</span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Make people skilled enough to be undeniably noticed in Big Tech.
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                  The tech industry doesn't lack open positions; it lacks proven, battle-tested execution. Our mission right now is laser-focused: build high-fidelity simulation and feedback environments—like our AI mock interview suite—that strip away guesswork and prepare engineers to crush the toughest technical bars.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-indigo-300 font-medium">
                <CheckCircle2 className="size-4 text-indigo-400 shrink-0" />
                <span>Rigorous simulations modeled after top-tier engineering loops</span>
              </div>
            </div>
            <div className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-950/20 to-[#080a12] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-blue-500/10 pointer-events-none">
                <Compass className="size-32" />
              </div>
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
                  <Rocket className="size-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Our Ultimate Vision</span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  From elite engineers to visionary founders and startup creators.
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                  While our tools today target career acceleration in major tech companies, our long-term vision is much grander. We are building an ecosystem designed to shift mindsets from employees to entrepreneurs. We want to empower you not just to write code, but to build products, scale companies, and launch startups.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-blue-300 font-medium">
                <Zap className="size-4 text-blue-400 shrink-0" />
                <span>An evolving ecosystem bridging technical mastery with startup creation</span>
              </div>
            </div>

          </div>

        </div>
      </section>
      <section className="py-20 border-t border-white/[0.08]">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Drives Our Engineering Philosophy
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              The core principles embedded into every feature, challenge, and module we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div 
                  key={val.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 mb-5 transition-transform group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      <section className="py-20 border-t border-white/[0.08] bg-[#0c0f1d]/30">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">The Roadmap</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How We Build the Ecosystem
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              A phased rollout designed to take developers from skill acquisition to venture creation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MILESTONES.map((m, idx) => (
              <div 
                key={m.phase}
                className="relative rounded-2xl border border-white/10 bg-[#080a12] p-8 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400">
                  {m.status}
                </div>

                <div>
                  <span className="text-indigo-400 font-mono text-xs font-bold">{m.phase}</span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                  <span>Step {idx + 1} of 3</span>
                  <span className="text-indigo-400 font-medium">XCode Platform</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      <section className="py-20 border-t border-white/[0.08] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-3xl px-5 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your technical career?
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Start practicing with our mock interview suite and take your first step toward big tech.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.register}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-500 px-8 text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-400"
            >
              <span>Get Started For Free</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}