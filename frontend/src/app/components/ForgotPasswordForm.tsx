
// "use client";

// import { useState, useTransition } from "react";
// import * as Label from "@radix-ui/react-label";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   Loader2,
//   Mail,
//   MailCheck,
// } from "lucide-react";

// import Button from "./ui/Button";
// import { requestResetSchema } from "@/lib/schema/auth";
// import { requestPasswordResetAction } from "@/actions/auth/forgot-password";

// export default function ForgotPasswordForm() {
//   const [email, setEmail] = useState("");
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setError(null);
//     setSuccessMessage(null);

//     const validation = requestResetSchema.safeParse({ email });

//     if (!validation.success) {
//       setError(
//         validation.error.issues[0]?.message || "Invalid email address"
//       );
//       return;
//     }

//     startTransition(async () => {
//       try {
//         const result = await requestPasswordResetAction(
//           validation.data.email
//         );

//         if (result.success) {
//           setSuccessMessage(
//             result.message ||
//               "If an account exists for this email, a password reset link has been sent."
//           );
//         } else {
//           setError(
//             result.error || "Unable to send reset link. Please try again."
//           );
//         }
//       } catch {
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     });
//   };

//   return (
//     <div>
//       {successMessage ? (
//         <div className="space-y-5">
//           <div className="flex flex-col items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] px-5 py-7 text-center">
//             <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
//               <MailCheck className="size-7 text-emerald-300" />
//             </div>

//             <h3 className="text-lg font-semibold text-white">
//               Check your inbox
//             </h3>

//             <p className="mt-2 break-all text-sm font-medium text-indigo-300">
//               {email}
//             </p>

//             <p className="mt-3 text-sm leading-6 text-slate-400">
//               {successMessage}
//             </p>
//           </div>

//           <Link
//             href="/login"
//             className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] text-sm font-medium text-slate-300 transition-all hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
//           >
//             <ArrowLeft className="size-4" />
//             Back to sign in
//           </Link>

//           <p className="text-center text-xs text-slate-500">
//             Didn&apos;t receive the email? Check your spam folder.
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {error && (
//             <div
//               role="alert"
//               className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-300"
//             >
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div className="space-y-2">
//             <Label.Root
//               htmlFor="email"
//               className="text-xs font-medium text-slate-300"
//             >
//               Email address
//             </Label.Root>

//             <div className="relative">
//               <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-slate-500" />

//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (error) setError(null);
//                 }}
//                 className="w-full rounded-xl border border-white/[0.09] bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/10"
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             disabled={isPending || !email.trim()}
//             className="group flex h-11 w-full items-center justify-center rounded-xl border border-indigo-200/20 bg-indigo-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="mr-2 size-4 animate-spin" />
//                 Sending reset link...
//               </>
//             ) : (
//               <>
//                 Send reset link
//                 <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
//               </>
//             )}
//           </Button>

//           {/* Back */}
//           <div className="border-t border-white/[0.07] pt-5">
//             <Link
//               href="/login"
//               className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
//             >
//               <ArrowLeft className="size-4" />
//               Back to sign in
//             </Link>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useTransition } from "react";
// import * as Label from "@radix-ui/react-label";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   Loader2,
//   Mail,
//   MailCheck,
// } from "lucide-react";

// import Button from "./ui/Button";
// import { requestResetSchema } from "@/lib/schema/auth";
// import { requestPasswordResetAction } from "@/actions/auth/forgot-password";

// export default function ForgotPasswordForm() {
//   const [email, setEmail] = useState("");
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setError(null);
//     setSuccessMessage(null);

//     const validation = requestResetSchema.safeParse({ email });

//     if (!validation.success) {
//       setError(
//         validation.error.issues[0]?.message || "Invalid email address"
//       );
//       return;
//     }

//     startTransition(async () => {
//       try {
//         const result = await requestPasswordResetAction(
//           validation.data.email
//         );

//         if (result.success) {
//           setSuccessMessage(
//             result.message ||
//               "If an account exists for this email, a password reset link has been sent."
//           );
//         } else {
//           setError(
//             result.error || "Unable to send reset link. Please try again."
//           );
//         }
//       } catch {
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     });
//   };

//   return (
//     <div>
//       {successMessage ? (
//         <div className="space-y-5">
//           <div className="flex flex-col items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] px-5 py-7 text-center">
//             <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
//               <MailCheck className="size-7 text-emerald-300" />
//             </div>

//             <h3 className="text-lg font-semibold text-white">
//               Check your inbox
//             </h3>

//             <p className="mt-2 break-all text-sm font-medium text-indigo-300">
//               {email}
//             </p>

//             <p className="mt-3 text-sm leading-6 text-slate-400">
//               {successMessage}
//             </p>
//           </div>

//           <Link
//             href="/login"
//             className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] text-sm font-medium text-slate-300 transition-all hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
//           >
//             <ArrowLeft className="size-4" />
//             Back to sign in
//           </Link>

//           <p className="text-center text-xs text-slate-500">
//             Didn&apos;t receive the email? Check your spam folder.
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {error && (
//             <div
//               role="alert"
//               className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-300"
//             >
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div className="space-y-2">
//             <Label.Root
//               htmlFor="email"
//               className="text-xs font-medium text-slate-300"
//             >
//               Email address
//             </Label.Root>

//             <div className="relative">
//               <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-slate-500" />

//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (error) setError(null);
//                 }}
//                 className="w-full rounded-xl border border-white/[0.09] bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/10"
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             disabled={isPending || !email.trim()}
//             className="group flex h-11 w-full items-center justify-center rounded-xl border border-indigo-200/20 bg-indigo-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="mr-2 size-4 animate-spin" />
//                 Sending reset link...
//               </>
//             ) : (
//               <>
//                 Send reset link
//                 <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
//               </>
//             )}
//           </Button>

//           {/* Back */}
//           <div className="border-t border-white/[0.07] pt-5">
//             <Link
//               href="/login"
//               className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
//             >
//               <ArrowLeft className="size-4" />
//               Back to login
//             </Link>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useTransition } from "react";
import * as Label from "@radix-ui/react-label";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  MailCheck,
} from "lucide-react";

import Button from "./ui/Button";
import { requestResetSchema } from "@/lib/schema/auth";
import { requestPasswordResetAction } from "@/actions/auth/forgot-password";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    const validation = requestResetSchema.safeParse({ email });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message || "Invalid email address"
      );
      return;
    }

    startTransition(async () => {
      try {
        const result = await requestPasswordResetAction(
          validation.data.email
        );

        if (result.success) {
          setSuccessMessage(
            result.message ||
              "If an account exists for this email, a password reset link has been sent."
          );
        } else {
          setError(
            result.error || "Unable to send reset link. Please try again."
          );
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
          <div className="flex flex-col items-center rounded-2xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)] px-5 py-7 text-center shadow-[var(--clay-shadow-inset)]">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-surface)] shadow-[var(--clay-shadow-raised)]">
              <MailCheck className="size-7 text-[var(--clay-sage-ink)]" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--clay-ink)]">
              Check your inbox
            </h3>

            <p className="mt-2 break-all text-sm font-medium text-[var(--clay-blue-ink)]">
              {email}
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--clay-muted)]">
              {successMessage}
            </p>
          </div>

          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-sm font-medium text-[var(--clay-ink)] shadow-[var(--clay-shadow-raised)] transition-all hover:bg-[var(--clay-surface-warm)]"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>

          <p className="text-center text-xs text-[var(--clay-subtle)]">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-[var(--clay-primary)]/40 bg-[var(--clay-peach)]/50 px-4 py-3 text-sm text-[#a94e37]"
            >
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label.Root
              htmlFor="email"
              className="text-xs font-medium text-[var(--clay-ink)]"
            >
              Email address
            </Label.Root>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[var(--clay-subtle)]" />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="clay-inset w-full rounded-xl border border-[var(--clay-border)] bg-[var(--clay-bg)] py-3 pl-10 pr-4 text-sm text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] transition-all focus:border-[var(--clay-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)]/20"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            className="clay-button-shadow group flex h-11 w-full items-center justify-center rounded-xl border border-[var(--clay-primary)]/40 bg-[var(--clay-primary)] px-5 text-sm font-semibold text-[var(--clay-primary-ink)] transition-all duration-300 hover:bg-[var(--clay-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-primary)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>

          {/* Back */}
          <div className="border-t border-[var(--clay-border)] pt-5">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-[var(--clay-muted)] transition-colors hover:text-[var(--clay-ink)]"
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