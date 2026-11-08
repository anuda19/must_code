"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  Mic,
  Code2,
  Menu,
  FileSearch,
  BookOpen,
  BriefcaseBusiness,
  MessageSquareText,
} from "lucide-react";

import { LogoutButton } from "@/app/components/ui/LogoutButton";
import { ROUTES } from "@/lib/routes";

const NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: ROUTES.dashboard,
  },
  {
    icon: Mic,
    label: "Mock Interviews",
    href: ROUTES.mock_interview.base_url,
  },
  {
    icon: Code2,
    label: "Technical Assessments",
    href: ROUTES.technical_assesment,
  },
  {
    icon: FileSearch,
    label: "Resume & ATS Checker",
    href: "#",
  },
  {
    icon: BookOpen,
    label: "Preparation",
    href: "#",
  },
  {
    icon: BriefcaseBusiness,
    label: "Job Opportunities",
    href: "#",
  },
  {
    icon: Users,
    label: "Community",
    href: "#",
  },
  {
    icon: MessageSquareText,
    label: "Interview Experiences",
    href: "#",
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle */}
      {!isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="fixed left-1 top-4 z-50 flex size-8 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-ink)] shadow-md transition-colors hover:bg-[var(--clay-surface-warm)] md:hidden"
          aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isMobileOpen}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full shrink-0 flex-col justify-between overflow-visible border-r border-[var(--clay-border)] bg-[var(--clay-surface)] p-4 text-[var(--clay-ink)] transition-transform duration-250 md:relative md:z-20 md:translate-x-0 md:transition-[width] ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:w-20" : "md:w-64"} w-64`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="absolute -right-3.5 top-4 z-30 hidden h-7 w-7 items-center justify-center rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-muted)] shadow-sm transition-colors duration-200 hover:border-[var(--clay-primary)] hover:text-[var(--clay-ink)] md:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        <div className="min-w-0">
          {/* Brand */}
          <div className="mb-6 flex h-16 items-center gap-3 overflow-hidden py-3">
            <Link
              href={ROUTES.dashboard}
              aria-label="X Code home"
              onClick={() => setIsMobileOpen(false)}
              className="group flex shrink-0 items-center gap-2.5"
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/55 text-[var(--clay-primary)] transition-colors group-hover:border-[var(--clay-primary)] hover:bg-[var(--clay-peach)] hover:text-[var(--clay-primary-ink)]">
                <Code2 className="size-[20px]" strokeWidth={2.8} />
              </div>

              <span className="text-[25px] font-semibold tracking-[-0.055em] text-[var(--clay-ink)]">
                X<span className="text-[var(--clay-primary)]"> Code</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item, i) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(`${item.href}/`)) ||
                (item.href === "/dashboard" && pathname === "/dashboard");

              const Icon = item.icon;

              return (
                <Link
                  key={`sidebar-item-${item.label}-${item.href}-${i}`}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  aria-label={isCollapsed ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group relative flex h-11 w-full items-center overflow-hidden rounded-xl border px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/55 text-[var(--clay-primary-ink)]"
                      : "border-transparent text-[var(--clay-muted)] hover:border-[var(--clay-border)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`min-w-5 shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--clay-primary)]"
                        : "text-[var(--clay-muted)] group-hover:text-[var(--clay-ink)]"
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
                    <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[var(--clay-primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="min-w-0 border-t border-[var(--clay-border)] pt-4">
          <div className="flex min-h-10 min-w-0 items-center justify-center">
            <LogoutButton isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    </>
  );
}
