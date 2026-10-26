import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import { SaveTranscriptInput } from "@/types/interview-evalution";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SaveTranscriptInput;

    const response = await api.post(`/interview/sessions`, body);

    return NextResponse.json(response);
  } catch (err) {
    console.error("[Save Transcript API Error]", err);
    if (err instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: err.message,
          error: {
            code: err.code,
            details: err.details,
          },
        },
        { status: err.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Failed to save interview transcript.",
      },
      { status: 500 },
    );
  }
}
