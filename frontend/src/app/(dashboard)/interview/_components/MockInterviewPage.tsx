import {
  Mic,
  Check,
  AlertCircle,
  LoaderCircle,
  FileText,
  Clock,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BotIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

type MockInterviewPageProps = {
  ended: boolean;
  loading: boolean;
  error: string | null;
  startInterview: () => void;
};

export default function MockInterviewPage({
  ended,
  loading,
  error,
  startInterview,
}: MockInterviewPageProps) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-[var(--clay-ink)] antialiased sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[440px] w-[620px] -translate-x-1/2 rounded-full bg-[var(--clay-peach)]/50 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[42%] right-0 -z-10 h-[340px] w-[340px] rounded-full bg-[var(--clay-sage)]/50 blur-[120px]"
      />

      <div className="mx-auto">
        <header className="flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div>
              <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--clay-muted)]">
                <BotIcon className="size-4 text-[var(--clay-primary)]" />
                AI Assessment Portal
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--clay-ink)] sm:text-3xl">
                Mock Interview
              </h1>
              <p className="mt-1 text-sm text-[var(--clay-muted)]">
                Practice technical interviews with your AI interviewer.
              </p>
            </div>
          </div>

          <Link
            href={ROUTES.mock_interview.evaluation}
            className="group flex items-center justify-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] px-3 py-2 text-sm font-semibold text-[var(--clay-ink)] shadow-[var(--clay-shadow-raised)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-primary)]"
          >
            <FileText className="size-4 text-[var(--clay-primary)] transition-transform group-hover:scale-110" />
            <span>View Full Reports</span>
            <ArrowRight className="size-3 text-[var(--clay-muted)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)] lg:items-start">
          <section aria-labelledby="interview-heading">
            <Card className="clay-card relative overflow-hidden rounded-[28px] border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-[var(--clay-primary)]/70"
              />

              <CardContent className="flex flex-col items-center px-5 py-9 text-center sm:px-10 sm:py-12">
                <div className="relative mb-6">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-[28px] bg-[var(--clay-peach)]/70 blur-xl"
                  />
                  <div className="clay-raised relative grid size-[76px] place-items-center rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] sm:size-[84px]">
                    {ended ? (
                      <Check className="size-9 text-[var(--clay-status)]" />
                    ) : (
                      <Mic className="size-9 text-[var(--clay-primary)]" />
                    )}
                  </div>
                </div>

                <p className="mb-2 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--clay-muted)]">
                  {ended ? "Session completed" : "Voice interview"}
                </p>

                <h2
                  id="interview-heading"
                  className="text-xl font-bold tracking-tight text-[var(--clay-ink)] sm:text-2xl"
                >
                  {ended
                    ? "Ready for another attempt?"
                    : "Ready for your session?"}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--clay-muted)]">
                  {ended
                    ? "Your previous session has ended. You can start another interview whenever you're ready."
                    : "Practice real-time technical scenarios with an interactive AI interviewer. Find a quiet space and allow microphone access when prompted."}
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mt-6 flex w-full items-start gap-3 rounded-2xl border border-[#e7b6a7] bg-[#fff0e9] p-4 text-left shadow-[inset_3px_3px_7px_rgba(255,255,255,0.85),inset_-3px_-3px_7px_rgba(231,182,167,0.3)]"
                  >
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-[#c65d45]" />
                    <p className="min-w-0 flex-1 text-sm leading-6 text-[#874b3b]">
                      {error}
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={startInterview}
                  disabled={loading}
                  className="clay-button-shadow mt-8 h-12 w-full rounded-xl border-0 bg-[var(--clay-primary)] font-semibold text-[var(--clay-primary-ink)] transition-all hover:bg-[var(--clay-primary-hover)] hover:brightness-[1.02] active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-sm"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                      Connecting to interview...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 size-4" />
                      {ended ? "Start New Interview" : "Start Interview"}
                      <ArrowRight className="ml-1 size-4" />
                    </>
                  )}
                </Button>

                <div className="mt-5 flex items-start justify-center gap-2 text-left text-xs leading-5 text-[var(--clay-subtle)]">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--clay-status)]" />
                  <span>
                    Microphone access is requested when you start. Audio
                    transmission is handled through LiveKit.
                  </span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Session information */}
          <aside className="space-y-5">
            <Card className="clay-raised rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)]">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--clay-muted)]">
                  Session Overview
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="clay-inset rounded-2xl border border-[var(--clay-border)]/70 bg-[var(--clay-bg)] p-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                      <Clock className="size-4 text-[var(--clay-primary)]" />
                      Duration
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--clay-ink)]">
                      ~15 minutes
                    </p>
                  </div>

                  <div className="clay-inset rounded-2xl border border-[var(--clay-border)]/70 bg-[var(--clay-bg)] p-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                      <Volume2 className="size-4 text-[var(--clay-primary)]" />
                      Format
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--clay-ink)]">
                      Interactive voice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="clay-raised rounded-[24px] border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)]">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--clay-muted)]">
                  Before You Begin
                </h3>

                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--clay-status)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--clay-ink)]">
                        Find a quiet space
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
                        Reduce background noise for clearer conversations.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--clay-status)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--clay-ink)]">
                        Use headphones
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
                        Help prevent audio feedback and echo.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--clay-status)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--clay-ink)]">
                        Answer naturally
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--clay-muted)]">
                        Take a moment to think before answering each question.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>

        <footer className="mt-7 flex flex-col gap-1 border-t border-[var(--clay-border)] pt-4 text-xs text-[var(--clay-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <span>AI Mock Interview · Voice session</span>
          <span>Your interview transcript is used for evaluation.</span>
        </footer>
      </div>
    </main>
  );
}