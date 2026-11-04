// "use client";

// import * as Label from "@radix-ui/react-label";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Input } from "./ui/TextInput";
// import Button from "./ui/Button";
// import { Loader2 } from "lucide-react";
// import { loginSchema } from "@/lib/schema/auth";
// import { loginAction } from "@/actions/auth/auth";
// import { ROUTES } from "@/lib/routes";

// export default function LoginForm() {
//   const router = useRouter();
//   const [fields, setFields] = useState({ email: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [isPending, setIsPending] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsPending(true);
//     setError(null);

//     // 1. Zod Validation
//     const validation = loginSchema.safeParse(fields);

//     if (!validation.success) {
//       const firstError = validation.error.issues[0]?.message || "Invalid input";
//       setError(firstError);
//       setIsPending(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("email", fields.email);
//       formData.append("password", fields.password);

//       const res = await loginAction(formData);

//       if (!res.success) {
//         setError(res.error?.message || "Invalid email or password");
//       } else {
//         router.push("/dashboard");
//         router.refresh();
//       }
//     } catch (err) {
//       setError("An unexpected error occurred. Please try again later.");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5 w-full max-w-md bg-[#0e1117] p-8 rounded-2xl border border-[#1e2330] shadow-xl"
//     >
//       <div className="space-y-1 text-center mb-6">
//         <h2 className="text-2xl font-bold tracking-tight text-white">
//           Welcome Back
//         </h2>
//         <p className="text-sm text-gray-400">
//           Enter your credentials to access your account
//         </p>
//       </div>

//       {error && (
//         <div className="p-3 mb-4 error-bg text-error border border-error-border rounded-md text-sm">
//           {error}
//         </div>
//       )}

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
//           name="email"
//           placeholder="name@example.com"
//           required
//           autoComplete="email"
//           value={fields.email}
//           onChange={(e) => setFields({ ...fields, email: e.target.value })}
//           className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
//         />
//       </div>

//       {/* Password Field */}
//       <div className="space-y-2 flex flex-col">
//         <div className="flex items-center justify-between">
//           <Label.Root
//             htmlFor="password"
//             className="text-sm font-medium text-gray-300"
//           >
//             Password
//           </Label.Root>
//           <Link
//             href="/forgot-password"
//             className="text-xs text-white hover:underline hover:text-[#22D3EE]/80 transition"
//           >
//             Forgot password?
//           </Link>
//         </div>
//         <Input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="••••••••"
//           required
//           autoComplete="current-password"
//           value={fields.password}
//           onChange={(e) => setFields({ ...fields, password: e.target.value })}
//           className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a23] border border-[#232838] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
//         />
//       </div>
//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           id="remember"
//           name="remember"
//           className="w-4 h-4 w-auto shrink-0 text-[#6366F1] bg-[#161a23] border border-[#232838] rounded focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-0 transition"
//         />
//         <Label.Root
//           htmlFor="remember"
//           className="text-sm text-gray-300 leading-none"
//         >
//           Remember me
//         </Label.Root>
//       </div>
//       <Button
//         type="submit"
//         className="w-full flex items-center justify-center py-2.5 px-4 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0e1117]"
//         disabled={isPending}
//       >
//         {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//         <span>{isPending ? "Signing In..." : "Sign In"}</span>
//       </Button>

//       <p className="text-center text-xs text-gray-400 pt-2">
//         Don't have an account?{" "}
//         <Link
//           href={ROUTES.register}
//           className="font-medium text-[#22D3EE] hover:underline"
//         >
//           Create an account
//         </Link>
//       </p>
//     </form>
//   );
// }

// "use client";

// import * as Label from "@radix-ui/react-label";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Input } from "./ui/TextInput";
// import Button from "./ui/Button";
// import {
//   Loader2,
//   Eye,
//   EyeOff,
//   LockKeyhole,
//   Mail,
//   ArrowRight,
//   ShieldCheck,
// } from "lucide-react";

// import { loginSchema } from "@/lib/schema/auth";
// import { loginAction } from "@/actions/auth/auth";
// import { ROUTES } from "@/lib/routes";

// export default function LoginForm() {
//   const router = useRouter();

//   const [fields, setFields] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState<string | null>(null);
//   const [isPending, setIsPending] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setIsPending(true);
//     setError(null);

//     const validation = loginSchema.safeParse(fields);

//     if (!validation.success) {
//       setError(validation.error.issues[0]?.message || "Invalid input");
//       setIsPending(false);
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("email", fields.email);
//       formData.append("password", fields.password);

//       const res = await loginAction(formData);

//       if (!res.success) {
//         setError(res.error?.message || "Invalid email or password");
//       } else {
//         router.push(ROUTES.dashboard);
//         router.refresh();
//       }
//     } catch {
//       setError("An unexpected error occurred. Please try again later.");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-[460px]">
//       {/* Error */}
//       {error && (
//         <div
//           role="alert"
//           className="flex items-start gap-3 p-3.5 mb-6 rounded-xl bg-red-500/[0.07] border border-red-500/20 text-sm text-red-400"
//         >
//           <span className="mt-0.5 shrink-0">!</span>
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Email */}
//         <div className="space-y-2">
//           <Label.Root
//             htmlFor="email"
//             className="text-sm font-medium text-gray-300"
//           >
//             Email address
//           </Label.Root>

//           <div className="relative">
//             <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] z-10 h-[18px] text-gray-500 pointer-events-none" />

//             <Input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="name@example.com"
//               required
//               autoComplete="email"
//               value={fields.email}
//               onChange={(e) => {
//                 setFields({ ...fields, email: e.target.value });
//                 if (error) setError(null);
//               }}
//               className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#161A23] border border-[#252B40] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/70 transition-all"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <Label.Root
//               htmlFor="password"
//               className="text-sm font-medium text-gray-300"
//             >
//               Password
//             </Label.Root>

//             <Link
//               href="/forgot-password"
//               className="text-xs font-medium text-indigo-400 hover:text-cyan-400 transition-colors"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <div className="relative">
//             <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] z-10 text-gray-500 pointer-events-none" />

//             <Input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               required
//               autoComplete="current-password"
//               value={fields.password}
//               onChange={(e) => {
//                 setFields({ ...fields, password: e.target.value });
//                 if (error) setError(null);
//               }}
//               className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#161A23] border border-[#252B40] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/70 transition-all"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-[18px] h-[18px]" />
//               ) : (
//                 <Eye className="w-[18px] h-[18px]" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Remember me */}
//         <div className="flex items-center justify-between pt-1">
//           <label
//             htmlFor="remember"
//             className="flex items-center gap-2.5 cursor-pointer group"
//           >
//             <input
//               type="checkbox"
//               id="remember"
//               name="remember"
//               className="w-4 h-4 rounded border-[#343B50] bg-[#161A23] text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 accent-indigo-500 cursor-pointer"
//             />

//             <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
//               Remember me
//             </span>
//           </label>
//         </div>

//         {/* Submit */}
//         <Button
//           type="submit"
//           disabled={isPending}
//           className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-600 via-indigo-500 to-indigo-600 hover:from-violet-500 hover:via-indigo-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#0E1117] disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Signing in...
//             </>
//           ) : (
//             <>
//               Sign in to your account
//               <ArrowRight className="w-4 h-4" />
//             </>
//           )}
//         </Button>
//       </form>

//       {/* Register */}
//       <div className="mt-7 pt-6 border-t border-[#252B40]">
//         <p className="text-center text-sm text-gray-400">
//           Don't have an account?{" "}
//           <Link
//             href={ROUTES.register}
//             className="font-semibold text-indigo-400 hover:text-cyan-400 transition-colors"
//           >
//             Create an account
//           </Link>
//         </p>
//       </div>

//       {/* Security note */}
//       <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
//         <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
//         Secure authentication. Your data stays protected.
//       </div>
//     </div>
//   );
// }


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
      } else {
        router.push(ROUTES.dashboard);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
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