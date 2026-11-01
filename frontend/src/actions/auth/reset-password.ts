"use server";

import { resetPasswordSchema } from "@/lib/schema/auth";

interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

export async function resetPasswordAction(
  values: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  },
) {
  const validation = resetPasswordSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: validation.data.token,
          newPassword: validation.data.newPassword,
        }),
        cache: "no-store",
      },
    );

    const result = (await response.json()) as ResetPasswordResponse;

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.message ?? "Unable to reset your password.",
      };
    }

    return {
      success: true,
      message: result.message ?? "Your password has been reset successfully.",
    };
  } catch {
    return {
      success: false,
      error: "Unable to connect to the server. Please try again.",
    };
  }
}