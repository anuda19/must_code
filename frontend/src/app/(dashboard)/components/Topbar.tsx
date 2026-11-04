"use client";

import { Search, Bell, ShieldCheck, Loader2, User2, Code2 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export default function Topbar({ profile }: { profile?: boolean }) {
  const { data: user } = useUser();

  return (
    <header className="relative z-10 flex h-16 w-full items-center justify-between border-b border-[var(--clay-border)] bg-[var(--clay-surface)] px-6 shadow-sm">
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--clay-peach)]/15 via-[var(--clay-sage)]/10 to-[var(--clay-blue)]/15" />

      <div className="relative flex w-72 items-center">
        {profile ? (
          <Link
            href={ROUTES.dashboard}
            aria-label="X Code home"
            className="group flex shrink-0 items-center gap-2.5 outline-none"
          >
            <div className="flex size-10 items-center justify-center rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] text-[var(--clay-primary-ink)] transition-all duration-300 group-hover:border-[var(--clay-primary)] group-hover:bg-[var(--clay-primary-hover)]">
              <Code2
                className="size-5 transition-transform group-hover:scale-110"
                strokeWidth={2.5}
              />
            </div>

            <span className="text-[22px] font-bold tracking-tight text-[var(--clay-ink)]">
              X<span className="text-[var(--clay-primary)]">Code</span>
            </span>
          </Link>
        ) : (
          <div className="flex ml-4 items-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-2 py-1 text-sm font-semibold text-[var(--clay-ink)]">
            <User2 size={14} className="text-[var(--clay-primary)]" />
            <span>{user?.name && `Hi, ${user.name}`}</span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)] transition hover:border-[var(--clay-primary)] hover:text-[var(--clay-ink)]">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--clay-status)] ring-2 ring-[var(--clay-surface)]" />
        </button>

        {user && user.name && user.email ? (
          <ProfileDropdown user={{ name: user.name, email: user.email }} />
        ) : (
          <Loader2 className="h-10 w-10 animate-spin text-[var(--clay-muted)]" />
        )}
      </div>
    </header>
  );
}