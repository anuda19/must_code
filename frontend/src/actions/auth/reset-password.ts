"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requestResetSchema, resetPasswordSchema } from "@/lib/schema/auth";
import { resend } from "@/lib/resend";

export type ResetActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};
const GENERIC_RESET_MESSAGE =
  "If an account exists for this email, a reset link has been sent.";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(rawEmail: string) {
  const validated = requestResetSchema.safeParse({ email: rawEmail });
  if (!validated.success) {
    return { success: true, message: GENERIC_RESET_MESSAGE };
  }

  const { email } = validated.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: true, message: GENERIC_RESET_MESSAGE };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.passwordResetToken.deleteMany({ where: { email } }); 
  await prisma.passwordResetToken.create({
    data: {
      email,
      token: hashedToken,
      expires,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${rawToken}`;

  // SEND THE EMAIL HERE
  try {
    await resend.emails.send({
      from: "Acme Security <onboarding@resend.dev>", // Replace with your domain in production
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>You requested a password reset. Click the button below to set a new password. This link expires in 15 minutes.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">Reset Password</a>
          <p style="color: #666; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (emailError) {
    // Log error internally, but still return generic message to keep account status private
    console.error("Failed to send reset email:", emailError);
  }

  return { success: true, message: GENERIC_RESET_MESSAGE };
}

export async function resetPassword(rawToken: string, rawPassword: string, rawConfirmPassword?: string) {
  // 1. Zod Validation
  const validated = resetPasswordSchema.safeParse({
    token: rawToken,
    newPassword: rawPassword,
    confirmPassword: rawConfirmPassword,
  });

  if (!validated.success) {
    const firstError =
      validated.error.issues[0]?.message || "Invalid input data.";
    return { success: false, error: firstError };
  }

  const { token: rawTokenInput, newPassword } = validated.data;
  const hashedInputToken = hashToken(rawTokenInput);

  // 2. Lookup by hashed token
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: hashedInputToken },
  });

  if (!existingToken) {
    return { success: false, error: "Invalid or expired token." };
  }

  if (new Date() > existingToken.expires) {
    await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
    return {
      success: false,
      error: "Token has expired. Please request a new link.",
    };
  }

  // 3. Hash new password & update database atomically
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: existingToken.email },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.delete({ where: { id: existingToken.id } }),
  ]);

  return {
    success: true,
    message: "Password updated successfully. You can now log in.",
  };
}
