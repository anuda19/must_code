
import type { Metadata } from "next";
import ResetPasswordForm from "@/app/components/ResetPasswordForm";
import Navbar from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Reset Password | Xcode Technologies",
  description: "Reset your Xcode Technologies account password.",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--clay-bg)] text-[var(--clay-ink)]">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[var(--clay-peach)]/60 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[var(--clay-sage)]/60 blur-[110px]"
      />

      <Navbar />

      <section className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-8 px-5 py-7 sm:px-8 lg:min-h-0 lg:grid-cols-[1fr_0.88fr] lg:gap-12 lg:px-12 lg:py-5 xl:gap-20">
        {/* Left: Hero */}
        <div className="flex flex-col justify-center lg:min-w-0">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--clay-sage-ink)] shadow-[var(--clay-shadow-raised)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--clay-status)]" />
            ACCOUNT SECURITY
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--clay-ink)] sm:text-5xl lg:text-[clamp(2.8rem,4vw,4.5rem)]">
            A stronger password.
            <span className="text-[var(--clay-primary)]">
              {" "}A fresh start.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--clay-muted)] sm:text-base sm:leading-7">
            You&apos;re almost there. Create a new password to secure your
            account and get back to building your future.
          </p>

          {/* Code visual */}
          <div className="relative mt-6 hidden overflow-hidden rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] shadow-[var(--clay-shadow-raised)] sm:block lg:mt-8">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-[var(--clay-peach)]/70 blur-[70px]"
            />

            <div className="relative flex items-center justify-between border-b border-[var(--clay-border)] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e58b7c]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e8bd70]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#91b879]" />
              </div>

              <span className="font-mono text-[10px] text-[var(--clay-subtle)]">
                password-security.ts
              </span>
            </div>

            <div className="relative space-y-1 px-5 py-4 font-mono text-xs leading-5 sm:text-sm sm:leading-6">
              <p>
                <span className="text-[var(--clay-primary)]">const</span>{" "}
                <span className="text-[var(--clay-blue-ink)]">security</span>{" "}
                <span className="text-[var(--clay-muted)]">=</span>{" "}
                <span className="text-[var(--clay-sage-ink)]">{"{"}</span>
              </p>

              <p className="pl-5">
                <span className="text-[var(--clay-ink)]">password: </span>
                <span className="text-[var(--clay-blue-ink)]">&quot;strong&quot;</span>,
              </p>

              <p className="pl-5">
                <span className="text-[var(--clay-ink)]">verification: </span>
                <span className="text-[var(--clay-blue-ink)]">&quot;verified&quot;</span>,
              </p>

              <p className="pl-5">
                <span className="text-[var(--clay-ink)]">account: </span>
                <span className="text-[var(--clay-blue-ink)]">&quot;protected&quot;</span>,
              </p>

              <p className="text-[var(--clay-sage-ink)]">{"}"}</p>

              <p className="pt-1 text-[var(--clay-subtle)]">
                // Your security comes first.
              </p>
            </div>
          </div>

          <p className="mt-5 hidden text-[10px] tracking-[0.18em] text-[var(--clay-subtle)] sm:block">
            SECURE BY DESIGN · YOUR ACCOUNT MATTERS
          </p>
        </div>

        {/* Right: Reset password card */}
        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[25px] bg-[var(--clay-peach)]"
          />

          <div className="relative rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-5 shadow-[var(--clay-shadow-card)] sm:p-7 lg:p-7 xl:p-8">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay-primary)]">
                PASSWORD RESET
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-[var(--clay-ink)] sm:text-[28px]">
                Set a new password
              </h2>

              <p className="mt-2 text-sm leading-5 text-[var(--clay-muted)]">
                Choose a strong password to protect your account and continue
                your journey.
              </p>
            </div>

            <ResetPasswordForm token={token ?? ""} />
          </div>
        </div>
      </section>
    </main>
  );
}