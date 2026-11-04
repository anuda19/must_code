
"use server";

import { requestResetSchema } from "@/lib/schema/auth";
import { api } from "@/lib/api";

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
    const result = await api.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      {
        email: validation.data.email,
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error || result.message || "Unable to send reset link.",
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