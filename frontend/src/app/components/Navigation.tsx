"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#232838] bg-[#ffffff]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-[#e7e9ef]"
        >
          Skillgist
        </Link>

        {/* Nav */}
        <NavigationMenu.Root className="flex">
          <NavigationMenu.List className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-[#8891a5] transition-colors hover:text-[#e7e9ef]"
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Profile */}
        <Link href="/login" className="rounded-md px-3 py-2 text-sm text-[#8891a5] transition-colors hover:text-[#e7e9ef]">
          Login
        </Link>
        <button
          type="button"
          aria-label="Profile"
          className="grid h-9 w-9 place-items-center rounded-full border border-[#232838] bg-[#171b24] text-[#8891a5] transition-colors hover:text-[#e7e9ef]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="8"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M4.5 19.5c1.4-3 4-4.5 7.5-4.5s6.1 1.5 7.5 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
