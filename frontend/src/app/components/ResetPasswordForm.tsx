"use client";

import { useState, useTransition } from "react";
import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Loader2,
} from "lucide-react";

import Button from "./ui/Button";
import PasswordInput from "@/app/components/ui/PasswordInput";
import { resetPasswordSchema } from "@/lib/schema/auth";
import { resetPasswordAction } from "@/actions/auth/reset-password";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const validation = resetPasswordSchema.safeParse({
      token,
      newPassword: formValues.newPassword,
      confirmPassword: formValues.confirmPassword,
    });

    if (!validation.success) {
      const errors: {
        newPassword?: string;
        confirmPassword?: string;
      } = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          field === "newPassword" ||
          field === "confirmPassword"
        ) {
          if (!errors[field]) {
            errors[field] = issue.message;
          }
        } else if (field === "token") {
          setError(issue.message);
        }
      });

      setFieldErrors(errors);
      return;
    }

    startTransition(async () => {
      try {
        const result = await resetPasswordAction(validation.data);

        if (result.success) {
          setSuccessMessage(
            result.message || "Your password has been reset successfully."
          );

          setTimeout(() => {
            window.location.href = "/login";
          }, 1800);
        } else {
          setError(result.error || "Unable to reset password. Please try again.");
        }
      } catch {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div>
      {successMessage ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] px-5 py-7 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
              <CheckCircle2 className="size-7 text-emerald-300" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Password updated
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {successMessage}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Redirecting you to sign in...
            </p>
          </div>

          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] text-sm font-medium text-slate-300 transition-all hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </div>
      ) : !token ? (
        <div className="space-y-5">
          <div
            role="alert"
            className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-300"
          >
            This password reset link is invalid or missing. Please request a
            new reset link.
          </div>

          <Link
            href="/forgot-password"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] text-sm font-medium text-slate-300 transition-all hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
          >
            Request a new link
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-300"
            >
              {error}
            </div>
          )}

          {/* New password */}
          <PasswordInput
            id="new-password"
            name="newPassword"
            label="New Password"
            value={formValues.newPassword}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
              setFieldErrors((prev) => ({
                ...prev,
                newPassword: undefined,
              }));
            }}
            error={fieldErrors.newPassword}
            placeholder="Enter new password"
            autoComplete="new-password"
            showRequirements
            required
          />

          {/* Confirm password */}
          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            value={formValues.confirmPassword}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }}
            error={fieldErrors.confirmPassword}
            placeholder="Confirm new password"
            autoComplete="new-password"
            showRequirements={false}
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={
              isPending ||
              !formValues.newPassword ||
              !formValues.confirmPassword
            }
            className="group flex h-11 w-full items-center justify-center rounded-xl border border-indigo-200/20 bg-indigo-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating password...
              </>
            ) : (
              <>
                Reset password
                <KeyRound className="ml-2 size-4 transition-transform group-hover:rotate-12" />
              </>
            )}
          </Button>

          {/* Back */}
          <div className="border-t border-white/[0.07] pt-5">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}