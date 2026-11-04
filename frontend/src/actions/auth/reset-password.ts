
"use server";

import { api } from "@/lib/api";
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
    const result = await api.post<ResetPasswordResponse>(
      "/auth/reset-password",
      {
        token: validation.data.token,
        newPassword: validation.data.newPassword,
      },
    );

    if (!result.success) {
      return {
        success: false,
        error: result.message ?? "Unable to reset your password.",
      };
    }

    return {
      success: true,
      message: result.message ?? "Your password has been reset successfully.",
    };
  } catch(error) {
    console.log(error);
    
    return {
      success: false,
      error: "Unable to connect to the server. Please try again.",
    };
  }
}