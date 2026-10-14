// src/app/reset-password/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PasswordInput from "@/app/components/ui/PasswordInput";
import { resetPassword } from "@/actions/auth/reset-password";
import { resetPasswordSchema } from "@/lib/schema/auth";
interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    // 1. Zod Validation
    const validation = resetPasswordSchema.safeParse({
      token: token ?? "",
      newPassword: formValues.newPassword,
      confirmPassword: formValues.confirmPassword,
    });

    if (!validation.success) {
      const formattedErrors: {
        newPassword?: string;
        confirmPassword?: string;
      } = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as
          | "newPassword"
          | "confirmPassword"
          | "token";
        if (fieldName === "token") {
          setError(issue.message);
        } else if (fieldName && !formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message;
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    // 2. Submit validated data to Server Action
    startTransition(async () => {
      const res = await resetPassword(
        validation.data.token,
        validation.data.newPassword,
        validation.data.confirmPassword,
      );

      if (res.success) {
        setSuccess(res.message || "Password reset successfully.");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <h2 className="mb-1 text-xl font-bold text-white">Set New Password</h2>
        <p className="mb-6 text-xs text-slate-400">
          Enter a strong password to secure your account.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            id="new-password"
            name="newPassword"
            label="New Password"
            value={formValues.newPassword}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            error={fieldErrors.newPassword}
            placeholder="••••••••"
            autoComplete="new-password"
            showRequirements={true}
            required
          />

          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            value={formValues.confirmPassword}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            error={fieldErrors.confirmPassword}
            placeholder="••••••••"
            autoComplete="new-password"
            showRequirements={false}
            required
          />

          <button
            type="submit"
            disabled={
              !formValues.newPassword ||
              !formValues.confirmPassword ||
              isPending
            }
            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-medium text-white shadow-md transition-all hover:bg-indigo-500 disabled:opacity-50"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
