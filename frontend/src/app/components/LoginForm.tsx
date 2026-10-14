"use client";

import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/TextInput";
import Button from "./ui/Button";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/lib/schema/auth";
import { loginAction } from "@/actions/auth/auth";

export default function LoginForm() {
  const router = useRouter();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    // 1. Zod Validation
    const validation = loginSchema.safeParse(fields);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid input";
      setError(firstError);
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
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 w-full max-w-md bg-[#0e1117] p-8 rounded-2xl border border-[#1e2330] shadow-xl"
    >
      <div className="space-y-1 text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 error-bg text-error border border-error-border rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2 flex flex-col">
        <Label.Root
          htmlFor="email"
          className="text-sm font-medium text-gray-300"
        >
          Email Address
        </Label.Root>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="name@example.com"
          required
          autoComplete="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2 flex flex-col">
        <div className="flex items-center justify-between">
          <Label.Root
            htmlFor="password"
            className="text-sm font-medium text-gray-300"
          >
            Password
          </Label.Root>
          <Link
            href="/forgot-password"
            className="text-xs text-white hover:underline hover:text-[#22D3EE]/80 transition"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="w-4 h-4 w-auto shrink-0 text-[#6366F1] bg-[#161a23] border border-[#232838] rounded focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-0 transition"
        />
        <Label.Root
          htmlFor="remember"
          className="text-sm text-gray-300 leading-none"
        >
          Remember me
        </Label.Root>
      </div>
      <Button
        type="submit"
        className="w-full flex items-center justify-center py-2.5 px-4 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0e1117]"
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>{isPending ? "Signing In..." : "Sign In"}</span>
      </Button>

      <p className="text-center text-xs text-gray-400 pt-2">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[#22D3EE] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
