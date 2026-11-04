"use client";

import {
  Sparkles,
  Code2,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mic,
  Edit,
  Bot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

interface InterviewProps {
  onEditProfile: () => void;
}

export function Interview({ onEditProfile }: InterviewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--clay-ink)]">
      {/* Scrollable content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        <div className="space-y-5 pb-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="gap-1.5 rounded-full border-[var(--clay-peach)] bg-[var(--clay-surface-warm)] px-3 py-1 text-[var(--clay-coral-shadow)]"
              >
                <Bot className="h-3.5 w-3.5" />
                AI-Powered Interview
              </Badge>
            </div>

            <Button
              onClick={onEditProfile}
              className="shrink-0 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-raised)] transition-all hover:bg-[var(--clay-surface-warm)] active:translate-y-0.5 active:shadow-none"
            >
              <Edit className="h-4 w-4 text-[var(--clay-coral-shadow)]" />
              Edit Profile
            </Button>
          </div>

          {/* Mock Interview */}
          <Card className="group overflow-hidden rounded-2xl border border-[var(--clay-peach)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-card)] transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-peach)] bg-[var(--clay-surface-warm)] text-[var(--clay-coral-shadow)] shadow-[var(--clay-shadow-raised)]">
                  <Mic className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[var(--clay-ink)]">
                      Mock Interview
                    </h3>

                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)]"
                    >
                      <Clock3 className="h-3 w-3" />
                      15 min
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--clay-muted)]">
                    Practice a real-time AI voice interview tailored to your
                    role, experience, and technical skills.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-[var(--clay-border)] pt-3">
                <div className="flex items-center gap-2 text-xs text-[var(--clay-ink)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--clay-status)]" />
                  Live AI conversation
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--clay-ink)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--clay-status)]" />
                  Personalized questions
                </div>
              </div>

              <Link
                href={ROUTES.mock_interview.base_url}
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--clay-primary)] p-2.5 text-sm font-semibold text-[var(--clay-primary-ink)] shadow-[var(--clay-shadow-button)] transition-all duration-150 hover:bg-[var(--clay-primary-hover)] active:translate-y-1 active:shadow-[var(--clay-shadow-button-pressed)]"
              >
                Start Interview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* Technical Assessment */}
          <Card className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[var(--clay-shadow-raised)] transition-all duration-200 hover:border-[var(--clay-blue-shadow)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] text-[var(--clay-blue-ink)] shadow-[var(--clay-shadow-raised)]">
                  <Code2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[var(--clay-ink)]">
                      Technical Assessment
                    </h3>

                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)]"
                    >
                      <Clock3 className="h-3 w-3" />
                      45 min
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--clay-muted)]">
                    Solve coding challenges and system design problems in a
                    structured technical evaluation.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-[var(--clay-border)] pt-3">
                <div className="flex items-center gap-2 text-xs text-[var(--clay-ink)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--clay-blue-ink)]" />
                  Coding challenges
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--clay-ink)]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--clay-blue-ink)]" />
                  System design
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--clay-border)] pt-3">
                <Badge
                  variant="outline"
                  className="rounded-full border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
                >
                  Coming soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-3 shadow-[var(--clay-shadow-raised)]">
            <p className="text-xs leading-relaxed text-[var(--clay-muted)]">
              Customize your interview experience and practice in a realistic
              AI-powered environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}