import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import { NextResponse } from "next/server";
import type { ActionResponse } from "@/types/action";

type User = {
  id: string;
  name: string;
  email: string;
};

export const GET = async (): Promise<
  NextResponse<ActionResponse<User>>
> => {
  try {
    const data = await api.get<User>("/auth/me");

    return NextResponse.json(
      {
        success: true,
        data,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
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

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Failed to fetch user profile",
          code: "USER_PROFILE_FETCH_FAILED",
        },
      },
      { status: 500 }
    );
  }
};