
"use client";

import { useState } from "react";
import {
  ArrowUpRight,
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

  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground opacity-70"
      >
        <span className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary/10">
            <Loader2 className="size-4 animate-spin text-primary" />
          </span>

          <span className="flex flex-col items-start gap-1">
            <span className="h-4 w-32 animate-pulse rounded bg-muted" />
            <span className="h-3 w-44 animate-pulse rounded bg-muted/70" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className={`
          group relative flex w-full items-center justify-between
          overflow-hidden rounded-xl border px-4 py-3
          text-sm font-semibold transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          ${
            hasProfile
              ? "border-primary/25 bg-primary/10 text-foreground hover:border-primary/50 hover:bg-primary/15"
              : "animate-attention border-warning/40 bg-warning/10 text-foreground hover:border-warning/60 hover:bg-warning/15"
          }
        `}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent ${
            hasProfile
              ? "group-hover:translate-x-full group-hover:transition-transform group-hover:duration-700"
              : "animate-shimmer"
          }`}
        />

        <span className="relative flex min-w-0 items-center gap-3">
          <span
            className={`relative grid size-9 shrink-0 place-items-center rounded-lg ${
              hasProfile
                ? "bg-primary/15 text-primary"
                : "bg-warning/15 text-warning"
            }`}
          >
            {hasProfile ? (
              <Mic className="size-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            ) : (
              <>
                <UserRoundCheck className="size-[18px]" />
                <CircleAlert className="absolute -right-1 -top-1 size-4 rounded-full bg-card text-warning" />
              </>
            )}
          </span>

          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="truncate">
              {hasProfile ? "Start AI Interview" : "Complete Profile"}
            </span>

            <span className="text-left text-xs font-normal text-muted-foreground">
              {hasProfile
                ? "Practice with your AI interviewer"
                : "Required before you can get started"}
            </span>
          </span>
        </span>

        <ArrowUpRight
          className={`relative ml-2 size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
            hasProfile ? "text-primary" : "text-warning"
          }`}
        />
      </button>

      <CreateInterviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialData={{
          jobRole: (user?.profile?.jobRole || userProfile?.jobRole) ?? "",
          experienceLevel:
            (user?.profile?.experienceLevel ||
              userProfile?.experienceLevel) ?? "",
          skills: (user?.profile?.skills || userProfile?.skills) ?? [],
          targetCompany:
            (user?.profile?.targetCompany || userProfile?.targetCompany) ?? "",
        }}
      />
    </>
  );
}