// src/app/forgot-password/page.tsx
"use client";

import { useState, useTransition } from "react";
import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { requestPasswordReset } from "@/actions/auth/reset-password";
import { requestResetSchema } from "@/lib/schema/auth";
import Button from "./ui/Button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // 1. Validate Email with Zod
    const validation = requestResetSchema.safeParse({ email });

    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message || "Invalid email address";
      setError(firstError);
      return;
    }

    // 2. Trigger Server Action
    startTransition(async () => {
      try {
        const res = await requestPasswordReset(validation.data.email);

        if (res.success) {
          setSuccessMessage(
            res.message ||
              "If an account exists for this email, a reset link has been sent." +
                validation.data.email,
          );
        } else {
          // Safely access error if present on res
          const actionError = "error" in res ? (res.error as string) : null;
          setError(
            actionError || "Failed to send reset link. Please try again.",
          );
        }
      } catch (err) {
        console.error("Forgot password error:", err);
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#1e2330] bg-[#0e1117] p-8 shadow-xl">
        <div className="mb-6 space-y-1 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage ? (
          <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              <MailCheck className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              <p>{successMessage}</p>
            </div>

            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#161a23] py-2.5 text-xs font-medium text-white border border-[#232838] transition hover:bg-[#1c222f]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          /* Reset Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
                {error}
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <Label.Root
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email Address
              </Label.Root>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#232838] bg-[#161a23] px-3.5 py-2.5 text-white placeholder:text-gray-500 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending || !email}
              className="flex w-full items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#6366F1]/90 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0e1117] disabled:opacity-50"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Sending link..." : "Send Reset Link"}
            </Button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs text-gray-400 transition hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
