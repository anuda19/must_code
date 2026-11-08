"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageSquareText,
  Target,
  Video,
  Sparkles,
  TrendingUp,
  BarChart3,
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
import Link from "next/link";

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

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  accent = "peach",
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Video;
  change?: number | null;
  accent?: "peach" | "sage" | "blue" | "green";
}) {
  const accentStyles = {
    peach:
      "bg-[var(--clay-peach)] border-[var(--clay-peach-shadow)] text-[var(--clay-primary-ink)]",
    sage: "bg-[var(--clay-sage)] border-[var(--clay-sage-shadow)] text-[var(--clay-sage-ink)]",
    blue: "bg-[var(--clay-blue)] border-[var(--clay-blue-shadow)] text-[var(--clay-blue-ink)]",
    green:
      "bg-[var(--clay-green-surface)] border-[var(--clay-green-shadow)] text-[var(--clay-green-ink)]",
  };

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-5 shadow-[0_8px_22px_rgba(101,70,49,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(101,70,49,0.11)] sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-[var(--clay-peach)]/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-[var(--clay-muted)]">
            {title}
          </p>
          <p className="mt-4 text-3xl font-bold tracking-tight text-[var(--clay-ink)] sm:text-[34px]">
            {value}
          </p>
        </div>

        <div
          className={`grid size-12 shrink-0 place-items-center rounded-2xl border shadow-[inset_3px_3px_7px_rgba(255,255,255,0.7),4px_5px_0_rgba(101,70,49,0.06)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${accentStyles[accent]}`}
        >
          <Icon className="size-5" />
        </div>
      </div>

      <div className="relative mt-5 flex min-h-6 items-center justify-between gap-2 border-t border-[var(--clay-border)]/70 pt-3">
        <p className="text-xs text-[var(--clay-subtle)]">{subtitle}</p>

        {change != null && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
              change > 0
                ? "bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
                : change < 0
                  ? "bg-[#fbe7dd] text-[#a34d37]"
                  : "bg-[var(--clay-surface-warm)] text-[var(--clay-muted)]"
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
    <div>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--clay-sage-ink)]">
        {eyebrow}
      </p>
      <h2 className="text-lg font-bold tracking-tight text-[var(--clay-ink)]">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-[var(--clay-subtle)]">
        {description}
      </p>
    </div>
  );
}

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
          throw new Error(response.message ?? "Failed to load dashboard data.");
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
          scoredSkills.reduce((total, skill) => total + (skill.score ?? 0), 0) /
            scoredSkills.length,
        )
      : null;

  return (
    <main className="w-full space-y-7 pb-10">
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            {/* <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--clay-sage-ink)]">
              At a glance
            </p> */}
            <h2 className="mt-1 text-base font-bold text-[var(--clay-ink)]">
              Your performance
            </h2>
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--clay-muted)] sm:inline-flex">
            <Activity className="size-3.5 text-[var(--clay-status)]" />
            Performance metrics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <MetricCard
            title="Completed interviews"
            value={
              loading && !data ? "—" : String(stats?.completedInterviews ?? 0)
            }
            subtitle="All completed evaluations"
            icon={Video}
            accent="peach"
          />

          <MetricCard
            title="Average score"
            value={
              stats?.averageScore != null ? `${stats.averageScore}/100` : "—"
            }
            subtitle={`${stats?.evaluatedInPeriod ?? 0} evaluations in this period`}
            icon={Target}
            change={stats?.scoreChange}
            accent="sage"
          />

          <MetricCard
            title="Personal best"
            value={stats?.bestScore != null ? `${stats.bestScore}/100` : "—"}
            subtitle="Best score in selected period"
            icon={Award}
            accent="blue"
          />

          <MetricCard
            title="Skill dimensions"
            value={String(
              data?.skills.filter((skill) => skill.score != null).length ?? 0,
            )}
            subtitle="Dimensions with available scores"
            icon={BrainCircuit}
            accent="green"
          />
        </div>
      </section>

      {/* Analytics */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(290px,0.8fr)]">
        <div className="relative min-w-0 overflow-hidden rounded-[26px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-5 shadow-[0_12px_30px_rgba(101,70,49,0.07)] sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[var(--clay-blue)]/35 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <SectionHeading
              eyebrow="Analytics"
              title="Score progression"
              description="Follow how your interview performance changes over time."
            />

            <div className="flex w-fit shrink-0 items-center gap-1 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-1 clay-inset">
              {(["7d", "30d", "90d"] as const).map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setPeriod(value)}
                  aria-pressed={period === value}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                    period === value
                      ? "bg-[var(--clay-primary)] text-[var(--clay-primary-ink)] shadow-[0_3px_8px_rgba(216,102,73,0.2)]"
                      : "text-[var(--clay-muted)] hover:bg-[var(--clay-surface)] hover:text-[var(--clay-ink)]"
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
                  <LoaderCircle className="size-7 animate-spin text-[var(--clay-primary)]" />
                  <p className="text-xs text-[var(--clay-muted)]">
                    Loading your analytics...
                  </p>
                </div>
              </div>
            ) : data?.scoreTrend.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.scoreTrend}
                  margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(128,103,90,0.14)"
                    vertical={false}
                    strokeDasharray="4 5"
                  />

                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fill: "#80675a", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                    tickMargin={12}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fill: "#80675a", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#fffaf1",
                      border: "1px solid #ecd8c3",
                      borderRadius: 14,
                      color: "#34251f",
                      boxShadow: "0 10px 25px rgba(101,70,49,0.12)",
                      padding: "10px 14px",
                    }}
                    labelFormatter={(label) => formatFullDate(String(label))}
                    formatter={(value) => [`${value}/100`, "Average score"]}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#ff8b6a"
                    strokeWidth={3.5}
                    dot={{
                      r: 4,
                      fill: "#ff8b6a",
                      stroke: "#fffaf1",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#ff8b6a",
                      stroke: "#fffaf1",
                      strokeWidth: 3,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid size-14 place-items-center rounded-2xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)]">
                  <BarChart3 className="size-6 text-[var(--clay-blue-ink)]" />
                </div>

                <p className="mt-4 text-sm font-bold text-[var(--clay-ink)]">
                  No scores for this period yet
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--clay-muted)]">
                  Complete and evaluate an interview to start tracking your
                  progress.
                </p>
              </div>
            )}
          </div>

          <div className="relative mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--clay-border)] pt-4">
            <div className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
              <span className="size-2.5 rounded-full bg-[var(--clay-primary)]" />
              Average evaluation score
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
              <CalendarDays className="size-3.5" />
              Selected period: {period}
            </div>
          </div>
        </div>

        {/* Practice card */}
        <aside className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[26px] border border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] p-6 shadow-[0_12px_30px_rgba(101,70,49,0.08)] sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[var(--clay-peach)]/70 blur-3xl transition-transform duration-500 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 size-52 rounded-full bg-[var(--clay-sage)]/40 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="grid size-12 place-items-center rounded-2xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] shadow-[inset_3px_3px_7px_rgba(255,255,255,0.65),4px_5px_0_rgba(216,102,73,0.12)]">
                <MessageSquareText className="size-5 text-[var(--clay-primary-ink)]" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--clay-sage-ink)]">
                <Sparkles className="size-3" />
                Keep growing
              </span>
            </div>

            <h2 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-[var(--clay-ink)]">
              Ready for your
              <br />
              next interview?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--clay-muted)]">
              Turn your feedback into progress. Practice consistently and review
              each assessment to identify areas to improve.
            </p>
          </div>

          <div className="relative mt-7 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-4 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.8),inset_-3px_-3px_8px_rgba(234,208,192,0.45)]">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--clay-green-surface)]">
                <Clock3 className="size-4 text-[var(--clay-green-ink)]" />
              </div>

              <div>
                <p className="text-sm font-bold text-[var(--clay-ink)]">
                  Your practice plan
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
                  Start a session and use your latest evaluation to decide what
                  to focus on next.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-auto flex items-center gap-2 pt-6 text-xs font-medium text-[var(--clay-sage-ink)]">
            <CheckCircle2 className="size-4 text-[var(--clay-status)]" />
            Review your feedback after each session
          </div>
        </aside>
      </section>

      {/* Skill breakdown */}
      <section className="overflow-hidden rounded-[26px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-5 shadow-[0_10px_28px_rgba(101,70,49,0.06)] sm:p-7">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            eyebrow="Your strengths"
            title="Skill breakdown"
            description="Average scores across your completed evaluations in this period."
          />

          {averageSkillScore != null && (
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)] px-4 py-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-[var(--clay-surface)]">
                <TrendingUp className="size-4 text-[var(--clay-green-ink)]" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--clay-sage-ink)]">
                  Average skill score
                </p>
                <p className="text-lg font-bold text-[var(--clay-ink)]">
                  {averageSkillScore}
                  <span className="ml-0.5 text-xs font-medium text-[var(--clay-muted)]">
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
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--clay-surface-warm)] text-[11px] font-bold text-[var(--clay-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm font-semibold text-[var(--clay-ink)]">
                    {skill.label}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-bold tabular-nums text-[var(--clay-ink)]">
                  {skill.score == null ? (
                    <span className="font-medium text-[var(--clay-subtle)]">
                      —
                    </span>
                  ) : (
                    `${skill.score}/100`
                  )}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full border border-[var(--clay-border)]/70 bg-[var(--clay-surface-warm)] p-[2px] shadow-[inset_2px_2px_4px_rgba(234,208,192,0.8),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                {skill.score != null && (
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--clay-primary)] to-[#e9a080] transition-all duration-700 ease-out group-hover:brightness-105"
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
            <div className="mt-5 rounded-2xl border border-dashed border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 py-6 text-center">
              <BrainCircuit className="mx-auto size-6 text-[var(--clay-subtle)]" />
              <p className="mt-2 text-sm font-medium text-[var(--clay-ink)]">
                Skill scores will appear here
              </p>
              <p className="mt-1 text-xs text-[var(--clay-muted)]">
                Complete an interview evaluation to see your skill breakdown.
              </p>
            </div>
          )}
      </section>

      {/* Recent evaluations */}
      <section className="overflow-hidden rounded-[26px] border border-[var(--clay-border)] bg-[var(--clay-surface)] shadow-[0_10px_28px_rgba(101,70,49,0.06)]">
        <div className="flex flex-col justify-between gap-3 border-b border-[var(--clay-border)] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
          <SectionHeading
            eyebrow="Your activity"
            title="Recent evaluations"
            description="Your latest saved assessment results."
          />

          <div className="grid size-10 place-items-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)]">
            <CalendarDays className="size-4 text-[var(--clay-muted)]" />
          </div>
        </div>

        {data?.recentEvaluations.length ? (
          <div className="divide-y divide-[var(--clay-border)]/80">
            {data.recentEvaluations.map((item) => (
              <Link
                key={item.id}
                href={`/interview/mock-interviews/evaluation/${item.id}`}
                className="group flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-[var(--clay-surface-warm)] sm:gap-4 sm:px-7"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] shadow-[inset_3px_3px_6px_rgba(255,255,255,0.55)] transition-transform duration-200 group-hover:scale-105">
                  <Video className="size-4 text-[var(--clay-primary-ink)]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[var(--clay-ink)]">
                    Interview assessment
                  </p>

                  <p className="mt-1 text-xs text-[var(--clay-subtle)]">
                    {formatFullDate(item.evaluatedAt)}
                    {item.grade ? ` · ${item.grade}` : ""}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold tabular-nums text-[var(--clay-ink)]">
                    {item.score == null ? "—" : item.score}
                    <span className="ml-0.5 text-xs font-medium text-[var(--clay-subtle)]">
                      /100
                    </span>
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold capitalize text-[var(--clay-sage-ink)]">
                    {item.status.toLowerCase()}
                  </p>
                </div>

                <div className="grid size-8 shrink-0 place-items-center rounded-full text-[var(--clay-subtle)] transition-all duration-200 group-hover:bg-[var(--clay-peach)] group-hover:text-[var(--clay-primary-ink)]">
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)]">
              <Video className="size-6 text-[var(--clay-subtle)]" />
            </div>

            <p className="mt-4 text-sm font-bold text-[var(--clay-ink)]">
              No completed evaluations yet
            </p>

            <p className="mt-1 text-xs text-[var(--clay-muted)]">
              Your saved assessment results will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
