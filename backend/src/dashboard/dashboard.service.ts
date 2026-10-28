import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type DashboardPeriod = '7d' | '30d' | '90d';

const PERIOD_DAYS: Record<DashboardPeriod, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

const SKILLS = [
  { key: 'technicalAccuracy', label: 'Technical accuracy' },
  { key: 'problemSolving', label: 'Problem solving' },
  { key: 'communication', label: 'Communication' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'depthOfKnowledge', label: 'Depth of knowledge' },
] as const;

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(
    userId: string,
    requestedPeriod?: string,
  ) {
    const period: DashboardPeriod =
      requestedPeriod === '7d' || requestedPeriod === '90d'
        ? requestedPeriod
        : '30d';

    const days = PERIOD_DAYS[period];
    const now = new Date();

    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - days);

    const previousStart = new Date(currentStart);
    previousStart.setDate(previousStart.getDate() - days);

    // Only successfully completed evaluations count as scored interviews.
    const evaluations = await this.prisma.interviewEvaluation.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        evaluatedAt: { not: null },
        overallScore: { not: null },
      },
      select: {
        id: true,
        transcriptId: true,
        overallScore: true,
        grade: true,
        technicalAccuracy: true,
        problemSolving: true,
        communication: true,
        relevance: true,
        depthOfKnowledge: true,
        evaluatedAt: true,
        createdAt: true,
      },
      orderBy: { evaluatedAt: 'desc' },
    });

    const current = evaluations.filter(
      (item) =>
        item.evaluatedAt! >= currentStart &&
        item.evaluatedAt! <= now,
    );

    const previous = evaluations.filter(
      (item) =>
        item.evaluatedAt! >= previousStart &&
        item.evaluatedAt! < currentStart,
    );

    const average = (values: number[]) =>
      values.length
        ? Math.round(
            values.reduce((sum, value) => sum + value, 0) /
              values.length,
          )
        : null;

    const currentScores = current.map(
      (item) => item.overallScore!,
    );

    const previousScores = previous.map(
      (item) => item.overallScore!,
    );

    const averageScore = average(currentScores);
    const previousAverage = average(previousScores);

    const latest = evaluations.slice(0, 10);

    const skillAverages = SKILLS.map(({ key, label }) => {
      const values = current
        .map((item) => item[key])
        .filter((value): value is number => value !== null);

      return {
        key,
        label,
        score: average(values),
      };
    });

    // Group daily scores by calendar date for a meaningful trend graph.
    const grouped = new Map<string, number[]>();

    for (const item of current) {
      const date = item.evaluatedAt!.toISOString().slice(0, 10);
      const values = grouped.get(date) ?? [];
      values.push(item.overallScore!);
      grouped.set(date, values);
    }

    const scoreTrend = Array.from(grouped.entries())
      .map(([date, scores]) => ({
        date,
        score: average(scores)!,
        interviewCount: scores.length,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      period,
      stats: {
        // Lifetime number of completed evaluations.
        completedInterviews: evaluations.length,

        // Score averages use the selected period.
        averageScore,
        bestScore: currentScores.length
          ? Math.max(...currentScores)
          : null,

        // Percentage-point change, not percentage growth.
        scoreChange:
          averageScore !== null && previousAverage !== null
            ? averageScore - previousAverage
            : null,

        evaluatedInPeriod: current.length,
      },
      scoreTrend,
      skills: skillAverages,
      recentEvaluations: latest.map((item) => ({
        id: item.id,
        transcriptId: item.transcriptId,
        score: item.overallScore,
        grade: item.grade,
        status: 'COMPLETED',
        evaluatedAt: item.evaluatedAt,
      })),
    };
  }
}