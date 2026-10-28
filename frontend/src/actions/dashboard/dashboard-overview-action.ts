"use server";

import { api } from "@/lib/api";

export type Period = "7d" | "30d" | "90d";

export type DashboardData = {
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
  message?: string;
};

export async function getDashboardOverview(
  period: Period,
): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>(
      `/dashboard/overview?period=${period}`,
    );

    if (!response.success || !response.data) {
      return {
        success: false,
        data: null as unknown as DashboardData,
        message: "Failed to load dashboard data.",
      };
    }

    return response;
  } catch (error) {
    console.error("Dashboard overview error:", error);

    return {
      success: false,
      data: null as unknown as DashboardData,
      message:
        error instanceof Error
          ? error.message
          : "Unable to load dashboard data.",
    };
  }
}