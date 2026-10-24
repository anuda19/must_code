"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mic,
  Code2,
} from "lucide-react";

import { LogoutButton } from "@/app/components/ui/LogoutButton";
import { useUser } from "@/hooks/useUser";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mic, label: "Mock Interviews", href: "/interview/mock-interviews" },
  {
    icon: Code2,
    label: "Technical Assessments",
    href: "/interview/technical-assessments",
  },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: Terminal, label: "Logs", href: "/dashboard/logs" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: user } = useUser();

  return (
    <aside
      className={`relative z-20 flex h-full shrink-0 flex-col justify-between overflow-visible border-r border-slate-800/80 bg-[#0B0F19] p-4 text-slate-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{
        transition: "width 250ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {/* Collapse Toggle */}
      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="absolute -right-3.5 top-6 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-[#121827] text-slate-300 transition-colors duration-200 hover:border-indigo-500 hover:text-white"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </button>

      <div className="min-w-0">
        {/* Brand */}
        <div className="mb-6 flex h-16 items-center gap-3 overflow-hidden py-3">
          <Link
            href="/dashboard"
            aria-label="Must Code home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-300/20 bg-indigo-400/[0.10] text-indigo-400 transition-colors group-hover:border-indigo-200/40 group-hover:bg-indigo-400/[0.15]">
              <Code2 className="size-[20px]" strokeWidth={2.8} />
            </div>

            <span className="text-[25px] font-semibold tracking-[-0.055em] text-white">
              Must<span className="text-indigo-400">Code</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`)) ||
              (item.href === "/dashboard" && pathname === "/dashboard");

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                aria-label={isCollapsed ? item.label : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex h-11 w-full items-center overflow-hidden rounded-xl border px-3 text-sm font-medium ${
                  isActive
                    ? "border-indigo-500/20 bg-indigo-600/10 text-indigo-400"
                    : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon
                  size={20}
                  className={`min-w-5 shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />

                <span
                  aria-hidden={isCollapsed}
                  className={`ml-3 overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200 ${
                    isCollapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="min-w-0 border-t border-slate-800/80 pt-4">
        <div className="flex min-h-10 min-w-0 items-center gap-3">
          <div className="relative flex h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F19]" />
          </div>

          <div
            aria-hidden={isCollapsed}
            className={`min-w-0 flex-1 overflow-hidden transition-[opacity,max-width] duration-200 ${
              isCollapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
            }`}
          >
            <div className="truncate text-xs font-semibold text-slate-200">
              {user?.name ?? "User"}
            </div>
            <div className="truncate text-[11px] text-slate-500">
              {user?.email ?? ""}
            </div>
          </div>

          {!isCollapsed && <LogoutButton />}
        </div>
      </div>
    </aside>
  );
}
