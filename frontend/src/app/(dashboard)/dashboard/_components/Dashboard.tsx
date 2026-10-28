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
  RefreshCw,
  Target,
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
import Link from "next/link";

// Replace this import with the location of your existing API client.

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

type ApiResponse = {
  success: boolean;
  data: DashboardData;
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
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Video;
  change?: number | null;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl
      border border-white/[0.08] bg-[#111522] p-5
      transition duration-200 hover:border-indigo-400/30
      hover:bg-[#151a2b]"
    >
      <div className="flex items-start justify-between">
        <div
          className="grid size-10 place-items-center rounded-xl
          border border-indigo-400/15 bg-indigo-400/[0.08]"
        >
          <Icon className="size-5 text-indigo-400" />
        </div>
        {change != null && (
          <span
            className={`inline-flex items-center gap-1
            rounded-full px-2 py-1 text-xs font-medium ${
              change > 0
                ? "bg-emerald-400/10 text-emerald-300"
                : change < 0
                  ? "bg-rose-400/10 text-rose-300"
                  : "bg-white/5 text-slate-400"
            }`}
          >
            {change > 0 ? (
              <ArrowUpRight className="size-3.5" />
            ) : change < 0 ? (
              <ArrowDownRight className="size-3.5" />
            ) : null}
            {change > 0 ? "+" : ""}
            {change} pts
          </span>
        )}
      </div>

      <p className="mt-6 text-sm text-slate-400">{title}</p>
      <p
        className="mt-1 text-3xl font-semibold tracking-tight
        text-white"
      >
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
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

  return (
    <main
      className="mx-auto w-full max-w-[1600px] space-y-7
      px-4 pb-10 sm:px-6 xl:px-6 py-6"
    >
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl
          border border-rose-400/20 bg-rose-400/[0.06] p-4
          sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-rose-200">{error}</p>
          <button
            type="button"
            onClick={() => setRetry((value) => value + 1)}
            className="text-sm font-medium text-rose-200 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* KPI cards */}
      <section
        className="grid grid-cols-1 gap-4
        sm:grid-cols-2 2xl:grid-cols-4"
      >
        <MetricCard
          title="Completed interviews"
          value={
            loading && !data ? "—" : String(stats?.completedInterviews ?? 0)
          }
          subtitle="All completed evaluations"
          icon={Video}
        />
        <MetricCard
          title="Average score"
          value={
            stats?.averageScore != null ? `${stats.averageScore}/100` : "—"
          }
          subtitle={`${stats?.evaluatedInPeriod ?? 0} evaluations in this period`}
          icon={Target}
          change={stats?.scoreChange}
        />
        <MetricCard
          title="Personal best"
          value={stats?.bestScore != null ? `${stats.bestScore}/100` : "—"}
          subtitle="Best score in selected period"
          icon={Award}
        />
        <MetricCard
          title="Skill dimensions"
          value={String(
            data?.skills.filter((skill) => skill.score != null).length ?? 0,
          )}
          subtitle="Dimensions with available scores"
          icon={BrainCircuit}
        />
      </section>

      {/* Trend + next practice */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
        <div
          className="min-w-0 rounded-2xl border border-white/[0.08]
          bg-[#111522] p-5 sm:p-6"
        >
          <div
            className="flex flex-col justify-between gap-4
            sm:flex-row sm:items-start"
          >
            <div>
              <h2 className="font-semibold text-white">Score progression</h2>
              <p className="mt-1 text-xs text-slate-500">
                Your average evaluation score over time
              </p>
            </div>
            <div
              className="flex w-fit rounded-xl border border-white/[0.08]
              bg-black/20 p-1"
            >
              {(["7d", "30d", "90d"] as const).map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setPeriod(value)}
                  aria-pressed={period === value}
                  className={`rounded-lg px-3 py-1.5 text-xs
                    font-medium transition ${
                      period === value
                        ? "bg-indigo-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-[270px] w-full">
            {loading && !data ? (
              <div className="grid h-full place-items-center">
                <LoaderCircle className="size-6 animate-spin text-indigo-300" />
              </div>
            ) : data?.scoreTrend.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.scoreTrend}
                  margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.10)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fill: "#8490a5", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fill: "#8490a5", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#171c2d",
                      border: "1px solid #30374a",
                      borderRadius: 12,
                      color: "#fff",
                    }}
                    labelFormatter={(label) => formatFullDate(String(label))}
                    formatter={(value) => [`${value}/100`, "Average score"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#818cf8"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#818cf8",
                      stroke: "#111522",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="flex h-full flex-col items-center
                justify-center text-center"
              >
                <Activity className="size-8 text-slate-600" />
                <p className="mt-3 text-sm font-medium text-slate-300">
                  No scores for this period yet
                </p>
                <p className="mt-1 max-w-xs text-xs text-slate-500">
                  Complete and evaluate an interview to start tracking progress.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Practice CTA */}
        <aside
          className="relative flex flex-col overflow-hidden
          rounded-2xl border border-indigo-400/20
          bg-gradient-to-br from-indigo-500/[0.13]
          via-[#14172a] to-[#111522] p-6"
        >
          <div
            className="absolute -right-14 -top-14 size-44
            rounded-full bg-indigo-500/10 blur-3xl"
          />
          <div className="relative">
            <div
              className="grid size-11 place-items-center rounded-xl
              border border-indigo-300/20 bg-indigo-400/10"
            >
              <MessageSquareText className="size-5 text-indigo-300" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              Ready for your next interview?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Turn your feedback into progress. Practice consistently and review
              each assessment to identify areas to improve.
            </p>
          </div>

          <div
            className="relative mt-6 rounded-xl border border-white/[0.07]
            bg-black/15 p-4"
          >
            <div className="flex items-center gap-3">
              <Clock3 className="size-4 text-indigo-300" />
              <div>
                <p className="text-sm font-medium text-slate-200">
                  Your practice plan
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Start a session and use your latest evaluation to decide what
                  to focus on next.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-auto pt-5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="size-4 text-indigo-300" />
              Review your feedback after each session
            </div>
          </div>
        </aside>
      </section>

      {/* Skill breakdown */}
      <section
        className="rounded-2xl border border-white/[0.08]
        bg-[#111522] p-5 sm:p-6"
      >
        <div className="mb-6">
          <h2 className="font-semibold text-white">Skill breakdown</h2>
          <p className="mt-1 text-xs text-slate-500">
            Average scores across your completed evaluations in this period
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {(data?.skills ?? []).map((skill) => (
            <div key={skill.key}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">{skill.label}</span>
                <span className="text-sm font-semibold tabular-nums text-white">
                  {skill.score == null ? "—" : `${skill.score}/100`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                {skill.score != null && (
                  <div
                    className="h-full rounded-full bg-gradient-to-r
                      from-indigo-500 to-violet-400 transition-all duration-500"
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
            <p className="mt-5 text-sm text-slate-500">
              Skill scores will appear after an interview has been evaluated.
            </p>
          )}
      </section>

      {/* Recent evaluations */}
      <section
        className="overflow-hidden rounded-2xl
        border border-white/[0.08] bg-[#111522]"
      >
        <div
          className="flex items-center justify-between gap-4
          border-b border-white/[0.07] p-5 sm:px-6"
        >
          <div>
            <h2 className="font-semibold text-white">Recent evaluations</h2>
            <p className="mt-1 text-xs text-slate-500">
              Your latest saved assessment results
            </p>
          </div>
          <CalendarDays className="size-5 text-slate-500" />
        </div>

        {data?.recentEvaluations.length ? (
          <div className="divide-y divide-white/[0.06]">
            {data.recentEvaluations.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4
                px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
              >
                <div
                  className="grid size-10 shrink-0 place-items-center
                  rounded-xl border border-white/[0.07] bg-white/[0.03]"
                >
                  <Video className="size-4 text-indigo-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-200">
                    Interview assessment
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatFullDate(item.evaluatedAt)}
                    {item.grade ? ` · ${item.grade}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold tabular-nums text-white">
                    {item.score == null ? "—" : item.score}
                    <span className="text-xs font-normal text-slate-500">
                      /100
                    </span>
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    {item.status.toLowerCase()}
                  </p>
                </div>
                <Link href={`/interview/mock-interviews/evaluation/${item.id}`}>
                  <ArrowRight className="hidden size-4 text-indigo-400 sm:block" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Video className="mx-auto size-8 text-slate-600" />
            <p className="mt-3 text-sm font-medium text-slate-300">
              No completed evaluations yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Your saved assessment results will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
