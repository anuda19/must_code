
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

import { ROUTES } from "@/lib/routes";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: ROUTES.pricing },
    ],
  },
  {
    title: "X Code",
    links: [
      { label: "About us", href: ROUTES.about },
      { label: "Interview practice", href: "#practice" },
      { label: "Interview evaluation", href: "#evaluation" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: ROUTES.login },
      { label: "Get started", href: ROUTES.register },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-5 text-[var(--clay-ink)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="X Code home"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="flex size-10 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)] shadow-[inset_3px_3px_6px_#fff,3px_4px_0_#ecd8c3] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[var(--clay-coral-shadow)]">
                <Code2 className="size-[19px]" strokeWidth={2} />
              </span>

              <span className="text-[20px] font-extrabold tracking-tight text-[var(--clay-ink)]">
                X<span className="text-[var(--clay-primary)]">Code</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-[var(--clay-muted)]">
              Prepare with purpose. Practice with confidence. Build your
              technical interview skills through realistic AI-powered
              interview experiences.
            </p>

            <Link
              href={ROUTES.register}
              className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-4 py-2.5 text-sm font-bold text-[var(--clay-ink)] shadow-[inset_2px_2px_5px_rgb(255_255_255/80%),3px_4px_0_#e5b9a4] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--clay-coral-shadow)] active:translate-y-0.5 active:shadow-none"
            >
              Start preparing
              <ArrowUpRight className="size-4 text-[var(--clay-primary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Navigation Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--clay-ink)]">
                {group.title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-sm font-medium text-[var(--clay-muted)] transition-colors duration-200 hover:text-[var(--clay-coral-shadow)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-[var(--clay-border)] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-[var(--clay-subtle)]">
            © {new Date().getFullYear()} X Code. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href={ROUTES.privacy}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-coral-shadow)]"
            >
              Privacy Policy
            </Link>

            <Link
              href={ROUTES.terms}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-coral-shadow)]"
            >
              Terms of Service
            </Link>

            <Link
              href={ROUTES.about}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-coral-shadow)]"
            >
              About X Code
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}