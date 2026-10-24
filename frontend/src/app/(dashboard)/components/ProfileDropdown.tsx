// src/components/ProfileDropdown.tsx
"use client";

import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth/auth";
import { useTransition } from "react";
import { Dropdown } from "@/app/components/ui/Dropdown";

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
    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
      <span className="text-sm font-bold text-slate-200">{initials}</span>
    </button>
  );

  const HeaderInfo = (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-slate-100">{name}</span>
      <span className="text-xs text-slate-400">{email}</span>
    </div>
  );

  const menuGroups = [
    [
      { label: "Profile", icon: User, href: "/dashboard/profile" },
      { label: "Settings", icon: Settings, href: "/dashboard/settings" },
      { label: "FAQ", icon: HelpCircle, href: "/dashboard/faq" },
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
