"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  CircleAlert,
  UserRoundCheck,
  Loader2,
  Mic,
} from "lucide-react";
import { CreateInterviewDrawer } from "./CreateInterDrawer";
import { useUser } from "@/hooks/useUser";
import { UserProfileData } from "@/types/user-profile-types";

interface StartButtonProps {
  userProfile?: UserProfileData | null;
}

export default function StartButton({ userProfile }: StartButtonProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: user, isLoading } = useUser();

  const hasProfile = Boolean(user?.profile || userProfile);

  // 1. Loading state view while data is being fetched
  if (isLoading) {
    return (
      <button
        disabled
        className="flex w-full items-center justify-between rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/50 px-4 py-3 text-sm font-semibold text-[var(--clay-muted)] opacity-70"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--clay-peach)]">
            <Loader2 className="h-4 w-4 animate-spin text-[var(--clay-primary)]" />
          </span>

          <span className="flex flex-col items-start gap-0.5">
            <span className="h-4 w-32 animate-pulse rounded bg-[var(--clay-peach-shadow)]"></span>
            <span className="h-3 w-44 animate-pulse rounded bg-[var(--clay-border)]"></span>
          </span>
        </span>
      </button>
    );
  }

  // 2. Main component render after loading finishes
  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className={`
          group relative flex w-full items-center justify-between
          overflow-hidden rounded-xl border px-4 py-3
          text-sm font-semibold transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clay-bg)]
          ${
            hasProfile
              ? "border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/55 text-[var(--clay-primary-ink)] hover:border-[var(--clay-primary)] hover:bg-[var(--clay-peach)] focus-visible:ring-[var(--clay-primary)]"
              : "animate-attention border-[#e8b48a] bg-[#fff0d9] text-[#8b542b] hover:border-[#d99a65] hover:bg-[#ffe8c6] focus-visible:ring-[#d99a65]"
          }
        `}
      >
        {/* Subtle moving highlight */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent ${
            hasProfile
              ? "group-hover:translate-x-full group-hover:transition-transform group-hover:duration-700"
              : "animate-shimmer"
          }`}
        />

        <span className="relative flex min-w-0 items-center gap-3">
          <span
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              hasProfile
                ? "bg-[var(--clay-primary)]/20 text-[var(--clay-primary-ink)]"
                : "bg-[#f6d9ad] text-[#8b542b]"
            }`}
          >
            {hasProfile ? (
              <Mic className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            ) : (
              <>
                <UserRoundCheck className="h-[18px] w-[18px]" />
                <CircleAlert className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[var(--clay-surface)] text-[#c47b3e]" />
              </>
            )}
          </span>

          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">
              {hasProfile ? "Start AI Interview" : "Complete Profile"}
            </span>

            <span
              className={`text-xs font-normal ${
                hasProfile
                  ? "text-[var(--clay-muted)]"
                  : "text-[#a16b3c]"
              }`}
            >
              {hasProfile
                ? "Practice with your AI interviewer"
                : "Required before you can get started"}
            </span>
          </span>
        </span>

        <ArrowUpRight
          className={`relative ml-2 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
            hasProfile
              ? "text-[var(--clay-primary)]"
              : "text-[#b8793f]"
          }`}
        />
      </button>

      <CreateInterviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialData={{
          jobRole: (user?.profile?.jobRole || userProfile?.jobRole) ?? "",
          experienceLevel:
            (user?.profile?.experienceLevel || userProfile?.experienceLevel) ??
            "",
          skills: (user?.profile?.skills || userProfile?.skills) ?? [],
          targetCompany:
            (user?.profile?.targetCompany || userProfile?.targetCompany) ?? "",
        }}
      />
    </>
  );
}