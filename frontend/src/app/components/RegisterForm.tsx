"use client";

import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import { Input } from "./ui/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/lib/schema/auth";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PasswordInput from "./ui/PasswordInput";
import { registerAction } from "@/actions/auth/auth";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await registerAction(values);

      if (!res.success) {
        setServerError(
          res.error?.message || "Registration failed. Please try again.",
        );
        return;
      }

      router.push("/login");
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 w-full max-w-md bg-[#0e1117] p-8 rounded-2xl border border-[#1e2330] shadow-xl"
    >
      <div className="space-y-1 text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Create an Account
        </h2>
        <p className="text-sm text-gray-400">
          Enter your details to create an account
        </p>
      </div>

      {serverError && (
        <div className="p-3 mb-4 error-bg text-error border border-error-border rounded-md text-sm">
          {serverError}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2 flex flex-col">
        <Label.Root
          htmlFor="name"
          className="text-sm font-medium text-gray-300"
        >
          Name
        </Label.Root>
        <Input
          type="text"
          id="name"
          {...form.register("name")}
          placeholder="John Doe"
          required
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
        />
        {form.formState.errors.name && (
          <p className="text-xs text-red-400">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

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
          {...form.register("email")}
          placeholder="name@example.com"
          required
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-400">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <PasswordInput
        id="password"
        label="Password"
        {...form.register("password")}
        value={form.watch("password")}
        error={form.formState.errors.password?.message}
      />

      <Button
        type="submit"
        className="w-full flex items-center justify-center py-2.5 px-4 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0e1117]"
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>{isPending ? "Creating Account..." : "Create Account"}</span>
      </Button>

      <p className="text-center text-xs text-gray-400 pt-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#22D3EE] hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
