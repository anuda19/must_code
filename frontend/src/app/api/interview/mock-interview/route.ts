import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import { ActionResponse } from "@/types/action";
import { NextResponse } from "next/server";

type VoiceTokenResponse = {
  token: string;
  model: string;
};

export const POST = async (): Promise<
  NextResponse<ActionResponse<VoiceTokenResponse>>
> => {
  try {
    const data = await api.post<VoiceTokenResponse>(
      "/interview/voice-token"
    );

    return NextResponse.json<ActionResponse<VoiceTokenResponse>>(
      {
        success: true,
        data,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json<ActionResponse<VoiceTokenResponse>>(
        {
          success: false,
          data: null,
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
          },
        },
        { status: error.status }
      );
    }

    return NextResponse.json<ActionResponse<VoiceTokenResponse>>(
      {
        success: false,
        data: null,
        error: {
          message: "Failed to start mock interview",
          code: "MOCK_INTERVIEW_START_FAILED",
        },
      },
      { status: 500 }
    );
  }
};