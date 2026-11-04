"use client";

import { useTransition } from "react";
import { logoutAction } from "@/actions/auth/auth";
import { Loader2, LogOut } from "lucide-react";

interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export function LogoutButton({ isCollapsed = false }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      window.location.href = "/login";
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      title="Log out"
      aria-label="Log out of account"
      className={`group relative flex items-center gap-2.5 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] font-medium text-[var(--clay-coral-shadow)] transition-all duration-200 hover:border-[var(--clay-coral-shadow)] hover:bg-[var(--clay-peach)] hover:text-[var(--clay-primary-ink)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
        isCollapsed
          ? "h-11 w-11 justify-center p-0"
          : "w-full px-3.5 py-2.5 text-sm clay-raised"
      }`}
    >
      {isPending ? (
        <Loader2 className="size-4 shrink-0 animate-spin" />
      ) : (
        <LogOut className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}

      <span
        aria-hidden={isCollapsed}
        className={`overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200 ${
          isCollapsed
            ? "hidden max-w-0 opacity-0"
            : "max-w-32 opacity-100"
        }`}
      >
        {isPending ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}
