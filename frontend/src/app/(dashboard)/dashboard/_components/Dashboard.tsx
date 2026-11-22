
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getDashboardOverview } from "@/actions/dashboard/dashboard-overview-action";

type Period = "7d" | "30d" | "90d";

type DashboardData = {
  period: Period;
  stats: {
    completedInterviews: number;
    averageScore: number | null;
    bestScore: number | null;
    scoreChange: number | null;
    evaluatedInPeriod: number;
  };
  scoreTrend: {
    date: string;
    score: number;
    interviewCount: number;
  }[];
  skills: {
    key: string;
    label: string;
    score: number | null;
  }[];
  recentEvaluations: {
    id: string;
    transcriptId: string;
    score: number | null;
    grade: string | null;
    status: string;
    evaluatedAt: string | null;
  }[];
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

const formatFullDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

/* =========================================
   METRIC CARD
========================================= */

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  accent = "primary",
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Video;
  change?: number | null;
  accent?: "primary" | "secondary" | "accent" | "success";
}) {
  const accentStyles = {
    primary:
      "bg-primary/10 text-primary border-primary/20",
    secondary:
      "bg-secondary text-secondary-foreground border-border",
    accent:
      "bg-accent text-accent-foreground border-border",
    success:
      "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-dropdown)] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/5 blur-3xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-4 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
            {value}
          </p>
        </div>

        <div
          className={`grid size-11 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${accentStyles[accent]}`}
        >
          <Icon className="size-5" strokeWidth={1.8} />
        </div>
      </div>

      <div className="relative mt-5 flex min-h-7 items-center justify-between gap-2 border-t border-border pt-3">
        <p className="text-xs leading-5 text-muted-foreground">
          {subtitle}
        </p>

        {change != null && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold ${
              change > 0
                ? "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)]"
                : change < 0
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {change > 0 ? (
              <ArrowUpRight className="size-3" />
            ) : change < 0 ? (
              <ArrowDownRight className="size-3" />
            ) : null}

            {change > 0 ? "+" : ""}
            {change} pts
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================
   SECTION HEADING
========================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>

      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {title}
      </h2>

      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================
   DASHBOARD
========================================= */

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("30d");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const response = await getDashboardOverview(period);

        if (!response.success || !response.data) {
          throw new Error(
            response.message ?? "Failed to load dashboard data.",
          );
        }

        if (active) {
          setData(response.data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load dashboard data.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [period, retry]);

  const stats = data?.stats;

  const scoredSkills =
    data?.skills.filter((skill) => skill.score != null) ?? [];

  const averageSkillScore =
    scoredSkills.length > 0
      ? Math.round(
          scoredSkills.reduce(
            (total, skill) => total + (skill.score ?? 0),
            0,
          ) / scoredSkills.length,
        )
      : null;

  return (
    <main className="w-full space-y-7 pb-10">

      {/* =====================================
          PERFORMANCE OVERVIEW
      ===================================== */}

      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Overview
            </p>

            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Your performance
            </h2>
          </div>

          <span className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[11px] font-medium text-muted-foreground sm:inline-flex">
            <Activity className="size-3.5 text-primary" />
            Performance metrics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <MetricCard
            title="Completed interviews"
            value={
              loading && !data
                ? "—"
                : String(stats?.completedInterviews ?? 0)
            }
            subtitle="All completed evaluations"
            icon={Video}
            accent="primary"
          />

          <MetricCard
            title="Average score"
            value={
              stats?.averageScore != null
                ? `${stats.averageScore}/100`
                : "—"
            }
            subtitle={`${stats?.evaluatedInPeriod ?? 0} evaluations in this period`}
            icon={Target}
            change={stats?.scoreChange}
            accent="success"
          />

          <MetricCard
            title="Personal best"
            value={
              stats?.bestScore != null
                ? `${stats.bestScore}/100`
                : "—"
            }
            subtitle="Best score in selected period"
            icon={Award}
            accent="accent"
          />

          <MetricCard
            title="Skill dimensions"
            value={String(
              data?.skills.filter((skill) => skill.score != null).length ??
                0,
            )}
            subtitle="Dimensions with available scores"
            icon={BrainCircuit}
            accent="secondary"
          />
        </div>
      </section>

      {/* =====================================
          ERROR STATE
      ===================================== */}

      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Unable to load dashboard data
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRetry((value) => value + 1)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <RefreshCw className="size-3.5" />
            Try again
          </button>
        </div>
      )}

      {/* =====================================
          ANALYTICS
      ===================================== */}

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(290px,0.8fr)]">

        {/* Score Progression */}

        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <SectionHeading
              eyebrow="Analytics"
              title="Score progression"
              description="Track how your interview performance changes over time."
            />

            <div className="flex w-fit shrink-0 items-center gap-1 rounded-xl border border-border bg-muted/70 p-1">
              {(["7d", "30d", "90d"] as const).map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setPeriod(value)}
                  aria-pressed={period === value}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                    period === value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-7 h-[280px] w-full">
            {loading && !data ? (
              <div className="grid h-full place-items-center">
                <div className="flex flex-col items-center gap-3">
                  <LoaderCircle className="size-7 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">
                    Loading your analytics...
                  </p>
                </div>
              </div>
            ) : data?.scoreTrend.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.scoreTrend}
                  margin={{
                    top: 12,
                    right: 12,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeOpacity={0.65}
                    vertical={false}
                    strokeDasharray="4 5"
                  />

                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                    tickMargin={12}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--popover-foreground)",
                      boxShadow: "var(--shadow-dropdown)",
                      padding: "10px 14px",
                    }}
                    labelStyle={{
                      color: "var(--popover-foreground)",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                    itemStyle={{
                      color: "var(--brand)",
                      fontSize: 12,
                    }}
                    labelFormatter={(label) =>
                      formatFullDate(String(label))
                    }
                    formatter={(value) => [
                      `${value}/100`,
                      "Average score",
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--brand)"
                    strokeWidth={2.8}
                    dot={{
                      r: 4,
                      fill: "var(--brand)",
                      stroke: "var(--card)",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "var(--brand)",
                      stroke: "var(--card)",
                      strokeWidth: 3,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid size-14 place-items-center rounded-2xl border border-border bg-muted text-primary">
                  <BarChart3 className="size-6" />
                </div>

                <p className="mt-4 text-sm font-semibold text-foreground">
                  No scores for this period yet
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                  Complete and evaluate an interview to start tracking
                  your progress.
                </p>
              </div>
            )}
          </div>

          <div className="relative mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-full bg-primary" />
              Average evaluation score
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              Selected period: {period}
            </div>
          </div>
        </div>

        {/* Practice Card */}

        <aside className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary/40 sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-accent/40 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="grid size-12 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <MessageSquareText className="size-5" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Sparkles className="size-3" />
                Keep growing
              </span>
            </div>

            <h2 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-card-foreground">
              Ready for your
              <br />
              next interview?
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Turn your feedback into progress. Practice consistently
              and review each assessment to identify areas to improve.
            </p>
          </div>

          <div className="relative mt-7 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Clock3 className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Your practice plan
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Start a session and use your latest evaluation to
                  decide what to focus on next.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-auto flex items-center gap-2 pt-6 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-[var(--success)]" />
            Review your feedback after each session
          </div>
        </aside>
      </section>

      {/* =====================================
          SKILL BREAKDOWN
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            eyebrow="Your strengths"
            title="Skill breakdown"
            description="Average scores across your completed evaluations in this period."
          />

          {averageSkillScore != null && (
            <div className="flex w-fit items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--success)_25%,transparent)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] px-4 py-2.5">
              <div className="grid size-9 place-items-center rounded-lg bg-card text-[var(--success)]">
                <TrendingUp className="size-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Average skill score
                </p>

                <p className="text-lg font-bold text-foreground">
                  {averageSkillScore}
                  <span className="ml-0.5 text-xs font-medium text-muted-foreground">
                    /100
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
          {(data?.skills ?? []).map((skill, index) => (
            <div key={skill.key} className="group">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-muted text-[10px] font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="truncate text-sm font-semibold text-foreground">
                    {skill.label}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-bold tabular-nums text-foreground">
                  {skill.score == null ? (
                    <span className="font-medium text-muted-foreground">
                      —
                    </span>
                  ) : (
                    `${skill.score}/100`
                  )}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                {skill.score != null && (
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700 ease-out group-hover:brightness-110"
                    style={{
                      width: `${Math.min(100, Math.max(0, skill.score))}%`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading &&
          !error &&
          data &&
          data.skills.every((skill) => skill.score == null) && (
            <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 px-5 py-7 text-center">
              <BrainCircuit className="mx-auto size-6 text-muted-foreground" />

              <p className="mt-2 text-sm font-semibold text-foreground">
                Skill scores will appear here
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Complete an interview evaluation to see your skill breakdown.
              </p>
            </div>
          )}
      </section>

      {/* =====================================
          RECENT EVALUATIONS
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-col justify-between gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:px-7">
          <SectionHeading
            eyebrow="Your activity"
            title="Recent evaluations"
            description="Your latest saved assessment results."
          />

          <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-muted text-muted-foreground">
            <CalendarDays className="size-4" />
          </div>
        </div>

        {data?.recentEvaluations.length ? (
          <div className="divide-y divide-border">
            {data.recentEvaluations.map((item) => (
              <Link
                key={item.id}
                href={`/interview/mock-interviews/evaluation/${item.id}`}
                className="group flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-muted/60 sm:gap-4 sm:px-7"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                  <Video className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Interview assessment
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatFullDate(item.evaluatedAt)}
                    {item.grade ? ` · ${item.grade}` : ""}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold tabular-nums text-foreground">
                    {item.score == null ? "—" : item.score}

                    <span className="ml-0.5 text-xs font-medium text-muted-foreground">
                      /100
                    </span>
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold capitalize text-muted-foreground">
                    {item.status.toLowerCase()}
                  </p>
                </div>

                <div className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary">
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-muted text-muted-foreground">
              <Video className="size-6" />
            </div>

            <p className="mt-4 text-sm font-semibold text-foreground">
              No completed evaluations yet
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your saved assessment results will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
