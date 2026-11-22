
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Heart,
} from "lucide-react";

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
    title: "Platform",
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
      { label: "Create account", href: ROUTES.register },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-5 text-[var(--clay-ink)] sm:px-8 lg:px-12">

      <div className="mx-auto max-w-[1360px]">

        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-16 lg:py-20">

          {/* Brand Section */}
          <div className="max-w-sm">

            <Link
              href="/"
              aria-label="X Code home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)] 4px_5px_0_var(--clay-border)] transition-all duration-300 group-hover:-translate-y-1">
                <Code2 className="size-5" strokeWidth={2.2} />
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                X<span className="text-[var(--clay-primary)]">Code</span>
              </span>
            </Link>

            <p className="mt-6 max-w-[340px] text-sm leading-7 text-[var(--clay-muted)]">
              Prepare with purpose. Practice with confidence.
              Build the skills and confidence you need to
              perform better in technical interviews.
            </p>

            {/* CTA */}
            <Link
              href={ROUTES.register}
              className="group mt-7 inline-flex items-center gap-3 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 py-3 text-sm font-bold text-[var(--clay-ink)] 3px_4px_0_var(--clay-border)] transition-all duration-200 hover:-translate-y-1 hover:text-[var(--clay-primary)] active:translate-y-0 active:shadow-none"
            >
              Start preparing
              <ArrowUpRight className="size-4 text-[var(--clay-primary)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Navigation */}
          {footerGroups.map((group) => (
            <div key={group.title}>

              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--clay-ink)]">
                {group.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--clay-muted)] transition-colors duration-200 hover:text-[var(--clay-primary)]"
                    >
                      {link.label}
                      <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 border-t border-[var(--clay-border)] py-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs font-medium text-[var(--clay-subtle)]">
            © {new Date().getFullYear()} X Code. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">

            <Link
              href={ROUTES.privacy}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-primary)]"
            >
              Privacy Policy
            </Link>

            <Link
              href={ROUTES.terms}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-primary)]"
            >
              Terms of Service
            </Link>

            <Link
              href={ROUTES.about}
              className="text-xs font-medium text-[var(--clay-subtle)] transition-colors hover:text-[var(--clay-primary)]"
            >
              About X Code
            </Link>

          </div>

        </div>

        {/* Small Brand Signature */}
        <div className="flex items-center justify-center gap-1.5 pb-6 text-[11px] font-medium text-[var(--clay-subtle)]">
          Built for developers, with
          <Heart className="size-3 fill-[var(--clay-primary)] text-[var(--clay-primary)]" />
          by X Code
        </div>

      </div>
    </footer>
  );
}