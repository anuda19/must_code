
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Practice", href: "/practice" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "X Code",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "#features" },
      { label: "Preparation roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Get started", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#080a12] px-5 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="X Code home"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-indigo-300/20 bg-indigo-400/10 text-indigo-200 transition-colors group-hover:border-indigo-200/40">
                <Code2 className="size-[18px]" strokeWidth={1.8} />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.055em]">
                X<span className="text-indigo-300">Code</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Prepare with purpose. Practice with confidence. Take the next
              step in your career with a clearer plan.
            </p>

            <Link
              href="/signup"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-200 transition-colors hover:text-cyan-200"
            >
              Start preparing
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold tracking-[0.12em] text-slate-200">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-4">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} X Code. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms
            </Link>
            <Link
              href="/about"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              About X Code
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}