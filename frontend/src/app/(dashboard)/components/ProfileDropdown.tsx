"use client";

import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth/auth";
import { useTransition } from "react";
import { Dropdown } from "@/app/components/ui/Dropdown";
import { ROUTES } from "@/lib/routes";

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  if (!user) return null;

  const name = user.name || "User";
  const email = user.email || "";

  // Extract initials (e.g., "Monica Geller" -> "MG")
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      window.location.href = "/login";
    });
  };

  const TriggerButton = (
    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] transition-all hover:border-[var(--clay-primary)] hover:shadow-[0_4px_12px_rgba(216,102,73,0.16)]">
      <span className="text-sm font-bold text-[var(--clay-ink)]">
        {initials}
      </span>
    </button>
  );

  const HeaderInfo = (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-[var(--clay-ink)]">
        {name}
      </span>
      <span className="text-xs text-[var(--clay-muted)]">{email}</span>
    </div>
  );

  const menuGroups = [
    [
      { label: "Profile", icon: User, href: ROUTES.profile },
      { label: "Settings", icon: Settings, href: ROUTES.settings },
      { label: "FAQ", icon: HelpCircle, href: ROUTES.user_faq },
    ],
    [
      {
        label: "Log out",
        icon: LogOut,
        onClick: handleLogout,
        destructive: true,
      },
    ],
  ];

  return (
    <Dropdown trigger={TriggerButton} header={HeaderInfo} items={menuGroups} />
  );
}