"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/lib/routes";

const NAV_ITEMS = [
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: user } = useUser();
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/[0.07] bg-[#080a12] text-white">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand */}
        <Link
          href="/"
          aria-label="X Code home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-100/20 bg-indigo-400/[0.10] text-indigo-400 transition-colors group-hover:border-indigo-200/40 group-hover:bg-indigo-400/[0.15]">
            <Code2 className="size-[20px]" strokeWidth={2.8} />
          </div>

          <span className="text-[25px] font-semibold tracking-[-0.055em] text-white">
            X<span className="text-indigo-400">Code</span>
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu.Root className="hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className="rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-400 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {!user ? (
            <Link
              href="/login"
              className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white sm:px-4"
            >
              Login
            </Link>
          ) : (
            <Link
              href={ROUTES.dashboard}
              className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white sm:px-4"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/signup"
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-indigo-200/20 bg-indigo-500 px-3.5 text-[12px] font-semibold text-[#10111b] transition-all duration-200 hover:bg-indigo-400 sm:px-4 sm:text-[13px]"
          >
            Get started
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
