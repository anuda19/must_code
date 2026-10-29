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
        className="flex w-full items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-300/50 opacity-70"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
          </span>
          <span className="flex flex-col items-start gap-0.5">
            <span className="h-4 w-32 animate-pulse rounded bg-indigo-400/20"></span>
            <span className="h-3 w-44 animate-pulse rounded bg-indigo-400/10"></span>
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
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b18]
          ${
            hasProfile
              ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:border-violet-400/60 hover:bg-indigo-500/20 focus-visible:ring-violet-400"
              : "animate-attention border-amber-400/40 bg-amber-500/[0.08] text-amber-200 hover:border-amber-300/70 hover:bg-amber-500/[0.14] focus-visible:ring-amber-400"
          }
        `}
      >
        {/* Subtle moving highlight */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent ${
            hasProfile
              ? "group-hover:translate-x-full group-hover:transition-transform group-hover:duration-700"
              : "animate-shimmer"
          }`}
        />

        <span className="relative flex min-w-0 items-center gap-3">
          <span
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              hasProfile
                ? "bg-indigo-500/15 text-violet-300"
                : "bg-amber-400/15 text-amber-300"
            }`}
          >
            {hasProfile ? (
              <Mic className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            ) : (
              <>
                <UserRoundCheck className="h-[18px] w-[18px]" />
                <CircleAlert className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#111529] text-amber-400" />
              </>
            )}
          </span>

          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">
              {hasProfile ? "Start AI Interview" : "Complete Profile"}
            </span>

            <span
              className={`text-xs font-normal ${
                hasProfile ? "text-indigo-300/65" : "text-amber-200/65"
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
            hasProfile ? "text-indigo-300" : "text-amber-300"
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
