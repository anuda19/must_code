
"use server";

import { requestResetSchema } from "@/lib/schema/auth";

interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function requestPasswordResetAction(
  email: string
): Promise<ForgotPasswordResponse> {
  const validation = requestResetSchema.safeParse({ email });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid email address",
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not configured.");
    }

    const response = await fetch(
      `${apiUrl}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validation.data.email,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Unable to send reset link.",
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Password reset request failed:", error);

    return {
      success: false,
      error: "Unable to process your request. Please try again later.",
    };
  }
}