import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import { ActionResponse } from "@/types/action";
import { EvaluationResponse } from "@/types/interview-evalution";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ session: string }> },
): Promise<NextResponse<ActionResponse<EvaluationResponse>>> {
  try {
    const { session } = await params;

    const response = await api.post<EvaluationResponse>(
      `/interview/sessions/${encodeURIComponent(session)}/evaluate`,
      {},
    );

    return NextResponse.json<ActionResponse<EvaluationResponse>>({
      success: true,
      data: response,
      error: null,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            message: err.message,
            code: err.code,
            details: err.details,
          },
        },
        { status: err.status },
      );
    }
    console.error("[Evaluate Interview API Error]", err);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Failed to evaluate interview",
          code: "INTERVIEW_EVALUATION_FAILED",
        },
      },
      { status: 500 },
    );
  }
}
