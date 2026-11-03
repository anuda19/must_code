// "use client";

// import * as Label from "@radix-ui/react-label";
// import Link from "next/link";
// import { Input } from "./ui/TextInput";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Button from "./ui/Button";
// import { useForm } from "react-hook-form";
// import { RegisterInput, registerSchema } from "@/lib/schema/auth";
// import { useState, useTransition } from "react";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import PasswordInput from "./ui/PasswordInput";
// import { registerAction } from "@/actions/auth/auth";

// export default function RegisterForm() {
//   const [serverError, setServerError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const form = useForm<RegisterInput>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (values: RegisterInput) => {
//     setServerError(null);

//     startTransition(async () => {
//       const res = await registerAction(values);

//       if (!res.success) {
//         setServerError(
//           res.error?.message || "Registration failed. Please try again.",
//         );
//         return;
//       }

//       router.push("/login");
//       router.refresh();
//     });
//   };

//   return (
//     <form
//       onSubmit={form.handleSubmit(onSubmit)}
//       className="space-y-5 w-full max-w-md bg-[#0e1117] p-8 rounded-2xl border border-[#1e2330] shadow-xl"
//     >
//       <div className="space-y-1 text-center mb-6">
//         <h2 className="text-2xl font-bold tracking-tight text-white">
//           Create an Account
//         </h2>
//         <p className="text-sm text-gray-400">
//           Enter your details to create an account
//         </p>
//       </div>

//       {serverError && (
//         <div className="p-3 mb-4 error-bg text-error border border-error-border rounded-md text-sm">
//           {serverError}
//         </div>
//       )}

//       {/* Name Field */}
//       <div className="space-y-2 flex flex-col">
//         <Label.Root
//           htmlFor="name"
//           className="text-sm font-medium text-gray-300"
//         >
//           Name
//         </Label.Root>
//         <Input
//           type="text"
//           id="name"
//           {...form.register("name")}
//           placeholder="John Doe"
//           required
//           className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
//         />
//         {form.formState.errors.name && (
//           <p className="text-xs text-red-400">
//             {form.formState.errors.name.message}
//           </p>
//         )}
//       </div>

//       {/* Email Field */}
//       <div className="space-y-2 flex flex-col">
//         <Label.Root
//           htmlFor="email"
//           className="text-sm font-medium text-gray-300"
//         >
//           Email Address
//         </Label.Root>
//         <Input
//           type="email"
//           id="email"
//           {...form.register("email")}
//           placeholder="name@example.com"
//           required
//           className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
//         />
//         {form.formState.errors.email && (
//           <p className="text-xs text-red-400">
//             {form.formState.errors.email.message}
//           </p>
//         )}
//       </div>

//       {/* Password Field */}
//       <PasswordInput
//         id="password"
//         label="Password"
//         {...form.register("password")}
//         value={form.watch("password")}
//         error={form.formState.errors.password?.message}
//       />

//       <Button
//         type="submit"
//         className="w-full flex items-center justify-center py-2.5 px-4 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0e1117]"
//         disabled={isPending}
//       >
//         {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//         <span>{isPending ? "Creating Account..." : "Create Account"}</span>
//       </Button>

//       <p className="text-center text-xs text-gray-400 pt-2">
//         Already have an account?{" "}
//         <Link
//           href="/login"
//           className="font-medium text-[#22D3EE] hover:underline"
//         >
//           Login
//         </Link>
//       </p>
//     </form>
//   );
// }

"use client";

import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  UserRound,
  Mail,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { Input } from "./ui/TextInput";
import Button from "./ui/Button";
import PasswordInput from "./ui/PasswordInput";
import { RegisterInput, registerSchema } from "@/lib/schema/auth";
import { registerAction } from "@/actions/auth/auth";
import { ROUTES } from "@/lib/routes";

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
      try {
        const res = await registerAction(values);

        if (!res.success) {
          setServerError(
            res.error?.message ||
              "We couldn't create your account. Please try again.",
          );
          return;
        }

        router.push(ROUTES.login);
        router.refresh();
      } catch {
        setServerError(
          "Something went wrong. Please check your connection and try again.",
        );
      }
    });
  };

  const inputClassName =
    "h-12 w-full rounded-xl border border-white/[0.09] bg-[#111629] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors focus-visible:border-violet-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20";

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {serverError && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] p-3.5 text-sm text-rose-200"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0 text-rose-400" />
          <p>{serverError}</p>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="name"
          className="text-sm font-medium text-slate-200"
        >
          Full name
        </Label.Root>

        <div className="relative flex items-center">
          <UserRound
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-3.5 z-10 text-slate-400"
          />

          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={!!form.formState.errors.name}
            aria-describedby={
              form.formState.errors.name ? "name-error" : undefined
            }
            {...form.register("name")}
            className={`pl-10 ${inputClassName} ${
              form.formState.errors.name
                ? "border-rose-400/60 focus-visible:border-rose-400"
                : ""
            }`}
          />
        </div>

        {form.formState.errors.name && (
          <p id="name-error" className="text-xs text-rose-400">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="email"
          className="text-sm font-medium text-slate-200"
        >
          Email address
        </Label.Root>

        <div className="relative flex items-center">
          <Mail
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-3.5 z-10 text-slate-400"
          />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!form.formState.errors.email}
            aria-describedby={
              form.formState.errors.email ? "email-error" : undefined
            }
            {...form.register("email")}
            className={`pl-10 ${inputClassName} ${
              form.formState.errors.email
                ? "border-rose-400/60 focus-visible:border-rose-400"
                : ""
            }`}
          />
        </div>

        {form.formState.errors.email && (
          <p id="email-error" className="text-xs text-rose-400">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label.Root
          htmlFor="password"
          className="text-sm font-medium text-slate-200"
        >
          Password
        </Label.Root>

        <PasswordInput
          id="password"
          label=""
          autoComplete="new-password"
          placeholder="Create a strong password"
          {...form.register("password")}
          value={form.watch("password")}
          error={form.formState.errors.password?.message}
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-400" />
        <p className="text-xs leading-5 text-slate-400">
          Your account details are handled securely. Choose a strong, unique
          password to help protect your account.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-600 via-indigo-500 to-indigo-600 hover:from-violet-500 hover:via-indigo-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#0E1117] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating your account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/[0.08]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0c1020] px-3 text-xs text-slate-500">
            Already part of the community?
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400">
        Have an account?{" "}
        <Link
          href={ROUTES.login}
          className="font-semibold text-violet-300 transition hover:text-cyan-300"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
