"use server";

import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import type {
  SaveTranscriptInput,
  EvaluationResponse,
} from "@/types/interview-evalution";
import type { ActionResponse } from "@/types/action";

export async function saveInterviewTranscript(
  input: SaveTranscriptInput,
) {
  try {
    const response = await api.post("/interview/sessions", input);

    return {
      success: true as const,
      data: response,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false as const,
        message: error.message,
        error: {
          code: error.code,
          details: error.details,
        },
      };
    }

    console.error("[Save Transcript Action Error]", error);

    return {
      success: false as const,
      message: "Failed to save interview transcript.",
    };
  }
}

export async function evaluateInterview(sessionId: string) {
  try {
    const response = await api.post<EvaluationResponse>(
      `/interview/sessions/${encodeURIComponent(sessionId)}/evaluate`,
      {},
    );

    return {
      success: true as const,
      data: response,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false as const,
        message: error.message,
        error: {
          code: error.code,
          details: error.details,
        },
      };
    }

    console.error("[Evaluate Interview Action Error]", error);

    return {
      success: false as const,
      message: "Failed to evaluate interview.",
    };
  }
}