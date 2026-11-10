"use client";

import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/TextInput";
import Button from "./ui/Button";
import {
  Loader2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { loginSchema } from "@/lib/schema/auth";
import { loginAction } from "@/actions/auth/auth";
import { ROUTES } from "@/lib/routes";

export default function LoginForm() {
  const router = useRouter();

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    setError(null);

    const validation = loginSchema.safeParse(fields);

    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid input");
      setIsPending(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("email", fields.email);
      formData.append("password", fields.password);

      const res = await loginAction(formData);

      if (!res.success) {
        setError(res.error?.message || "Invalid email or password");
        setIsPending(false);
        return;
      }
      router.push(ROUTES.dashboard);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again later.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-[460px]">
      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--clay-primary)]/40 bg-[var(--clay-peach)]/50 p-3.5 text-sm text-[#a94e37]"
        >
          <span className="mt-0.5 shrink-0">!</span>
          <p>{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label.Root
            htmlFor="email"
            className="text-sm font-medium text-[var(--clay-ink)]"
          >
            Email address
          </Label.Root>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 z-10 size-[18px] -translate-y-1/2 text-[var(--clay-subtle)] pointer-events-none" />

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              value={fields.email}
              onChange={(e) => {
                setFields({ ...fields, email: e.target.value });
                if (error) setError(null);
              }}
              className="clay-inset w-full rounded-xl border border-[var(--clay-border)] bg-[var(--clay-bg)] py-3 pl-11 pr-4 text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] transition-all focus:border-[var(--clay-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)]/20"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label.Root
              htmlFor="password"
              className="text-sm font-medium text-[var(--clay-ink)]"
            >
              Password
            </Label.Root>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[var(--clay-primary)] transition-colors hover:text-[var(--clay-coral-shadow)]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole className="absolute left-3.5 top-1/2 z-10 size-[18px] -translate-y-1/2 text-[var(--clay-subtle)] pointer-events-none" />

            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              value={fields.password}
              onChange={(e) => {
                setFields({ ...fields, password: e.target.value });
                if (error) setError(null);
              }}
              className="clay-inset w-full rounded-xl border border-[var(--clay-border)] bg-[var(--clay-bg)] py-3 pl-11 pr-12 text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] transition-all focus:border-[var(--clay-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)]/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-ink)]"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" />
              ) : (
                <Eye className="size-[18px]" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between pt-1">
          <label
            htmlFor="remember"
            className="group flex cursor-pointer items-center gap-2.5"
          >
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="size-4 cursor-pointer rounded border-[var(--clay-border)] bg-[var(--clay-bg)] accent-[var(--clay-primary)] focus:ring-[var(--clay-primary)] focus:ring-offset-0"
            />

            <span className="text-sm text-[var(--clay-muted)] transition-colors group-hover:text-[var(--clay-ink)]">
              Remember me
            </span>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="clay-button-shadow flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--clay-primary)]/40 bg-[var(--clay-primary)] px-4 py-3 font-semibold text-[var(--clay-primary-ink)] transition-all duration-300 hover:bg-[var(--clay-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in to your account
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Register */}
      <div className="mt-7 border-t border-[var(--clay-border)] pt-6">
        <p className="text-center text-sm text-[var(--clay-muted)]">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.register}
            className="font-semibold text-[var(--clay-primary)] transition-colors hover:text-[var(--clay-coral-shadow)]"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Security note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--clay-subtle)]">
        <ShieldCheck className="size-4 text-[var(--clay-sage-ink)]" />
        Secure authentication. Your data stays protected.
      </div>
    </div>
  );
}
