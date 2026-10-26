"use server";

import { api } from "@/lib/api";
import { EvaluationListResponse, InterviewEvaluation } from "@/types/interview-evalution";


type ActionResponse<T> = {
  success: boolean;
  data: T | null;
  error: string | string[] | null;
};
export async function getInterviewEvaluations(
  page = 1,
  limit = 10,
): Promise<ActionResponse<EvaluationListResponse>> {
  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const response = await api.get(
      `/interview/sessions/evaluations?${query.toString()}`,
    );

    return {
      success: true,
      data: (response) as EvaluationListResponse,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error:
        error?.response?.data?.message ??
        error?.message ??
        "Failed to fetch interview evaluations",
    };
  }
}

export async function getInterviewEvaluation(
  evaluationId: string,
): Promise<ActionResponse<InterviewEvaluation>> {
  if (!evaluationId?.trim()) {
    return {
      success: false,
      data: null,
      error: "Evaluation ID is required",
    };
  }

  try {
    const response = await api.get<InterviewEvaluation>(
      `/interview/sessions/evaluations/${encodeURIComponent(evaluationId)}`,
    );

    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error:
        error?.response?.data?.message ??
        error?.message ??
        "Failed to fetch interview evaluation",
    };
  }
}
