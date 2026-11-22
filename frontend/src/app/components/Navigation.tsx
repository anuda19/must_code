
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import {
  ArrowRight,
  Bot,
  BookOpen,
  ChevronDown,
  Code2,
  Menu,
  Trophy,
  Video,
  X,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/lib/routes";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

const FEATURE_ITEMS = [
  {
    title: "Mock Interview",
    description:
      "Simulate real-world technical interviews with instant AI feedback.",
    href: ROUTES.register,
    icon: Video,
    status: "Ready",
  },
  {
    title: "AI Tech Assistant",
    description:
      "Ask questions, debug code, and get real-time technical help.",
    href: "/assistant",
    icon: Bot,
    status: "Soon",
  },
  {
    title: "Practice & Challenges",
    description:
      "Solve real-world coding problems and algorithm challenges.",
    href: "/practice",
    icon: Trophy,
    status: "Soon",
  },
  {
    title: "Interactive Courses",
    description:
      "Structured learning paths for frontend, backend, and system design.",
    href: "/courses",
    icon: BookOpen,
    status: "Soon",
  },
];

const MAIN_NAV_ITEMS = [
  { href: ROUTES.pricing, label: "Pricing" },
  { href: ROUTES.about, label: "About" },
];

export default function Navbar() {
  const { data: user } = useUser();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 text-foreground backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* Brand */}
        <Link
          href="/"
          aria-label="X Code home"
          className="group flex shrink-0 items-center gap-2.5 outline-none"
        >
          <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_var(--primary)]">
            <Code2
              className="size-5 transition-transform duration-200 group-hover:scale-110"
              strokeWidth={2.5}
            />
          </div>

          <span className="text-[21px] font-extrabold tracking-tight sm:text-[22px]">
            X<span className="text-primary">Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="relative hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">

            {/* Features Dropdown */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className="
                  group inline-flex h-10 items-center gap-2 rounded-lg
                  border border-transparent px-3.5 text-[13px] font-semibold
                  text-muted-foreground transition-all duration-200
                  hover:border-border hover:bg-card hover:text-foreground
                  data-[state=open]:border-border
                  data-[state=open]:bg-card
                  data-[state=open]:text-primary
                "
              >
                <Bot className="size-4 text-primary" />
                <span>Features</span>
                <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content
                className="
                  absolute left-0 top-full mt-3 w-[370px]
                  overflow-hidden rounded-2xl border border-border
                  bg-popover p-2.5 text-popover-foreground
                  shadow-2xl
                  animate-in fade-in slide-in-from-top-2 duration-200
                "
              >
                <div className="mb-2 flex items-center justify-between px-3 py-2">
                  <div>
                    <p className="text-xs font-bold">Explore features</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Everything you need to prepare.
                    </p>
                  </div>
                  <Bot className="size-5 text-primary" />
                </div>

                <div className="flex flex-col gap-1">
                  {FEATURE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isUpcoming = item.status === "Soon";

                    return (
                      <Link
                        key={item.title}
                        href={isUpcoming ? "#" : item.href}
                        className={`
                          group flex items-start gap-3 rounded-xl border
                          border-transparent p-3 transition-all duration-200
                          ${
                            isUpcoming
                              ? "cursor-not-allowed opacity-55"
                              : "hover:border-border hover:bg-accent/60"
                          }
                        `}
                      >
                        <div className="
                          flex size-10 shrink-0 items-center justify-center
                          rounded-xl border border-border bg-card
                          text-primary transition-colors
                          group-hover:border-primary/30
                          group-hover:bg-primary/10
                        ">
                          <Icon className="size-[18px]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[13px] font-semibold text-foreground transition-colors group-hover:text-primary">
                              {item.title}
                            </span>

                            <span
                              className={`
                                shrink-0 rounded-full border px-2 py-0.5
                                text-[9px] font-bold
                                ${
                                  item.status === "Ready"
                                    ? "border-primary/30 bg-primary/10 text-primary"
                                    : "border-border bg-muted text-muted-foreground"
                                }
                              `}
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* General Links */}
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={`
                        inline-flex h-10 items-center rounded-lg border
                        px-3.5 text-[13px] font-semibold transition-all duration-200
                        ${
                          isActive
                            ? "border-primary/25 bg-primary/10 text-primary"
                            : "border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeSwitcher />

          {!user && (
            <Link
              href="/login"
              className="
                hidden rounded-lg px-3 py-2 text-[13px] font-semibold
                text-muted-foreground transition-colors
                hover:text-foreground sm:inline-flex
              "
            >
              Log in
            </Link>
          )}

          <Link
            href={user ? ROUTES.dashboard : ROUTES.register}
            className="
              group inline-flex h-10 items-center gap-2 rounded-lg
              border border-primary/30 bg-primary px-3.5
              text-[12px] font-bold text-primary-foreground
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:brightness-110
              hover:shadow-lg active:translate-y-0
              sm:px-4 sm:text-[13px]
            "
          >
            <span>{user ? "Go to App" : "Get started"}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="
              ml-1 flex size-10 items-center justify-center rounded-lg
              border border-border bg-card text-muted-foreground
              transition-all hover:border-primary/40 hover:text-primary
              active:scale-95 md:hidden
            "
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 px-4 py-5 shadow-xl backdrop-blur-xl md:hidden sm:px-8">

          <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Explore features
          </div>

          <div className="grid gap-2">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isUpcoming = item.status === "Soon";

              return (
                <Link
                  key={item.title}
                  href={isUpcoming ? "#" : item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between gap-3 rounded-xl
                    border border-border bg-card p-3
                    transition-all duration-200
                    ${
                      isUpcoming
                        ? "opacity-55"
                        : "hover:border-primary/30 hover:bg-accent/50 active:scale-[0.99]"
                    }
                  `}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                      <Icon className="size-4" />
                    </div>

                    <span className="truncate text-[13px] font-semibold text-foreground">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`
                      shrink-0 rounded-full border px-2 py-1
                      text-[9px] font-bold
                      ${
                        item.status === "Ready"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="my-5 h-px bg-border" />

          <div className="grid grid-cols-2 gap-2">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    rounded-lg border px-3 py-2.5 text-center
                    text-[13px] font-semibold transition-colors
                    ${
                      isActive
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Authentication Link */}
          <Link
            href={user ? ROUTES.dashboard : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="
              mt-3 flex items-center justify-center gap-2 rounded-lg
              border border-border bg-card py-3 text-[13px]
              font-bold text-foreground transition-colors
              hover:border-primary/30 hover:text-primary
            "
          >
            {user ? "Dashboard" : "Log in"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}