// src/app/dashboard/_components/Dashboard.tsx

"use client";

import StartButton from "@/app/(dashboard)/dashboard/_components/Core/StartButton";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  Target,
  Trophy,
  Video,
} from "lucide-react";

const stats = [
  {
    title: "Preparation Progress",
    value: "68%",
    description: "Overall readiness",
    icon: Target,
    trend: "+12%",
    progress: 68,
  },
  {
    title: "Current Streak",
    value: "12 Days",
    description: "Keep the momentum going",
    icon: Flame,
    trend: "Personal best",
  },
  {
    title: "Interviews Completed",
    value: "24",
    description: "Practice sessions",
    icon: Video,
    trend: "+4 this month",
  },
  {
    title: "Skill Score",
    value: "82/100",
    description: "Based on recent assessments",
    icon: Trophy,
    trend: "+8%",
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      {/* Header */}
      <div className="mb-6">
        <p className="mb-1 text-sm font-medium text-indigo-400">
          Your workspace
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
        {/* Left - 4 Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-slate-900/70"
              >
                {/* Subtle glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-300 group-hover:bg-indigo-500/20" />

                <div className="relative">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-800/70">
                      <Icon className="h-4.5 w-4.5 text-indigo-400" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-indigo-400" />
                  </div>

                  <p className="text-sm font-medium text-slate-400">
                    {stat.title}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </h2>

                    <span className="mb-1 text-[11px] font-medium text-emerald-400">
                      {stat.trend}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {stat.description}
                  </p>

                  {stat.progress !== undefined && (
                    <div className="mt-5">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"
                          style={{ width: `${stat.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Planner */}
        {/* Right - Planner */}
        <div className="flex min-h-[520px] flex-col rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          {/* Planner Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                  Planner
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white">
                Preparation Schedule
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Plan your next preparation session.
              </p>
            </div>
          </div>

          {/* TOP ACTION SECTION - Placed directly below header for immediate reach */}
          <div className="mb-5 space-y-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                Quick Action
              </span>
              <span className="text-[11px] text-slate-400">
                Ready to practice?
              </span>
            </div>

            {/* Offcanvas Drawer Trigger Button */}
            <StartButton />

            {/* Secondary Action / Quick Start */}
            <button className="flex w-full items-center justify-between rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-500">
              <span>Start Quick Session</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Calendar */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
            <div className="mb-4 flex items-center justify-between">
              <button className="text-xs text-slate-500 hover:text-white">
                ←
              </button>
              <span className="text-sm font-medium text-slate-200">
                September 2026
              </span>
              <button className="text-xs text-slate-500 hover:text-white">
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="py-1 text-[10px] font-medium text-slate-600"
                >
                  {day}
                </span>
              ))}

              {Array.from({ length: 30 }, (_, index) => {
                const day = index + 1;
                const isToday = day === 28;
                const hasSession = [3, 7, 12, 18, 24].includes(day);

                return (
                  <button
                    key={day}
                    className={`relative flex h-8 items-center justify-center rounded-lg text-xs transition-colors ${
                      isToday
                        ? "bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {day}
                    {hasSession && !isToday && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Status Bar */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-3">
              <div>
                <p className="text-[11px] text-slate-500">Next session</p>
                <p className="mt-0.5 text-xs font-medium text-slate-200">
                  Today · Interview Preparation
                </p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
