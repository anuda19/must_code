import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiError } from "@/lib/error";
import { ActionResponse } from "@/types/action";
import { API_BASE_URL } from "@/lib/constants";

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

export const POST = async (): Promise<
  NextResponse<ActionResponse<RefreshResponse>>
> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      const response = NextResponse.json<ActionResponse<RefreshResponse>>(
        {
          success: false,
          data: null,
          error: {
            message: "Refresh token not found",
            code: "REFRESH_TOKEN_MISSING",
          },
        },
        { status: 401 }
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    // Direct fetch to NestJS server endpoint
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new ApiError(
        resData.message || "Failed to refresh session",
        res.status,
        resData.details || null,
        resData.code || "REFRESH_FAILED"
      );
    }

    const data: RefreshResponse = resData;

    const response = NextResponse.json<ActionResponse<RefreshResponse>>(
      {
        success: true,
        data,
        error: null,
      },
      { status: 200 }
    );

    // 1. Set Access Token Cookie (15 mins)
    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    // 2. Rotate Refresh Token Cookie (7 days)
    if (data.refreshToken) {
      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    return response;
  } catch (error) {
    let status = 500;
    let errorMessage = "Failed to refresh authentication";
    let errorCode: string | undefined = "REFRESH_FAILED";
    let errorDetails: Record<string, string[]> | null | undefined = null;

    if (error instanceof ApiError) {
      status = error.status;
      errorMessage = error.message;
      errorCode = error.code;
      errorDetails = error.details;
    }

    const response = NextResponse.json<ActionResponse<RefreshResponse>>(
      {
        success: false,
        data: null,
        error: {
          message: errorMessage,
          code: errorCode ?? "REFRESH_FAILED",
          details: errorDetails,
        },
      },
      { status }
    );

    // Purge invalid tokens to prevent infinite loops
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  }
};