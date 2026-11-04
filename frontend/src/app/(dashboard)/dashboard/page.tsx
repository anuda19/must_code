import { Activity, Sparkles } from "lucide-react";
import StartButton from "./_components/Core/StartButton";
import Dashboard from "./_components/Dashboard";

const DashboardPage = async () => {
  return (
    <div className="relative mx-auto w-full max-w-[1600px]">
      <header className="relative mb-8 overflow-hidden rounded-[28px] border border-[var(--clay-border)] bg-[var(--clay-surface)] px-6 py-7 shadow-[0_12px_35px_rgba(101,70,49,0.07)] sm:px-8 sm:py-8">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-[var(--clay-peach)]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 size-56 rounded-full bg-[var(--clay-sage)]/40 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--clay-sage-ink)]">
              <Activity className="size-3.5" />
              Your workspace
              <span className="size-1 rounded-full bg-[var(--clay-status)]" />
              Performance hub
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--clay-ink)] sm:text-4xl">
              Performance overview
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--clay-muted)] sm:text-base">
              Every practice session brings you closer to your next opportunity.
              Track your performance, understand your strengths, and keep
              improving.
            </p>
          </div>

          <div className="relative flex shrink-0 flex-wrap items-center gap-3">
            <StartButton />
          </div>
        </div>
      </header>

      <Dashboard />
    </div>
  );
};

export default DashboardPage;
