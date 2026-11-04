
"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CreditCard,
  FileText,
  Gavel,
  LockKeyhole,
  Scale,
  ShieldAlert,
  UserRound,
} from "lucide-react";

const SECTIONS = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "user-accounts", label: "Accounts & Registration" },
  { id: "platform-services", label: "Platform Services" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "subscriptions", label: "Pricing & Payments" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-content", label: "User Content & Data" },
  { id: "disclaimer", label: "Disclaimers" },
  { id: "limitation-liability", label: "Limitation of Liability" },
  { id: "modifications", label: "Changes to These Terms" },
  { id: "contact-us", label: "Contact Us" },
];

function TermsSection({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 space-y-4 border-b border-[var(--clay-border)] pb-9 last:border-0"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="clay-feature-blue mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--clay-blue-ink)]">
            <Icon className="size-5" />
          </div>
        )}
        <h2 className="pt-1.5 text-xl font-extrabold tracking-tight text-[var(--clay-ink)]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-7 text-[var(--clay-muted)]">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen px-5 pb-20 pt-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -left-40 top-40 size-[420px] rounded-full bg-[var(--clay-peach)]/40 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <header className="clay-card rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-7 sm:p-10">
          <div className="clay-feature-blue inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[var(--clay-blue-ink)]">
            <Scale className="size-4" />
            Terms of service
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            These terms explain the conditions for accessing and using XCode.
            Please read them carefully before creating an account or using
            the platform.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--clay-subtle)]">
            <span className="rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-3 py-1.5">
              XCode
            </span>
            <span>Effective date: November 5, 2026</span>
          </div>
        </header>

        <div className="mt-9 grid gap-8 lg:grid-cols-12">
          {/* Contents */}
          <aside className="lg:col-span-3">
            <div className="clay-raised rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-5 lg:sticky lg:top-28">
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--clay-subtle)]">
                On this page
              </p>

              <nav className="space-y-1">
                {SECTIONS.map((section, index) => {
                  const active = activeSection === section.id;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]"
                          : "text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          active
                            ? "text-[var(--clay-blue-ink)]"
                            : "text-[var(--clay-subtle)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Terms body */}
          <div className="clay-card space-y-9 rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 sm:p-9 lg:col-span-9">
            <TermsSection
              id="acceptance"
              title="1. Acceptance of Terms"
              icon={FileText}
            >
              <p>
                By accessing or using XCode, creating an account, or
                interacting with any part of the platform, you agree to be
                bound by these Terms & Conditions and applicable laws.
              </p>
              <p>
                If you do not agree with these terms, you should not access
                or use the platform.
              </p>
            </TermsSection>

            <TermsSection
              id="user-accounts"
              title="2. Accounts & Registration"
              icon={UserRound}
            >
              <p>
                Some XCode features require an account. When registering,
                you agree to provide accurate and up-to-date information.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You are responsible for activity carried out through your account.</li>
                <li>You should notify us if you become aware of unauthorized account access.</li>
                <li>You must not impersonate another person or provide misleading account information.</li>
              </ul>
            </TermsSection>

            <TermsSection
              id="platform-services"
              title="3. Platform Services"
              icon={LockKeyhole}
            >
              <p>
                XCode provides tools intended to help developers prepare for
                technical interviews. Current platform capabilities include
                profile-driven interview preparation, AI-powered mock
                interviews, real-time voice interaction, saved transcripts,
                and AI-generated evaluations.
              </p>
              <p>
                Features may change, be improved, become temporarily
                unavailable, or be discontinued as the platform develops.
                We do not guarantee uninterrupted or error-free availability.
              </p>
            </TermsSection>

            <TermsSection
              id="acceptable-use"
              title="4. Acceptable Use"
              icon={ShieldAlert}
            >
              <p>
                You agree to use XCode responsibly and not to:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Use the platform for unlawful, fraudulent, or harmful activities.</li>
                <li>Attempt to gain unauthorized access to accounts, systems, or data.</li>
                <li>Interfere with the platform's operation, availability, or security.</li>
                <li>Reverse engineer, copy, or exploit proprietary platform components except where permitted by applicable law.</li>
                <li>Use automated methods to abuse, overload, or disrupt platform services.</li>
                <li>Upload content that infringes another person's rights or contains malicious code.</li>
                <li>Misuse another user's personal information or interview records.</li>
              </ul>
              <p>
                We may restrict or suspend access when we reasonably believe
                that an account has violated these terms or poses a risk to
                the platform or its users.
              </p>
            </TermsSection>

            <TermsSection
              id="subscriptions"
              title="5. Pricing & Payments"
              icon={CreditCard}
            >
              <p>
                Any paid features, subscriptions, or billing arrangements
                will be subject to the prices and conditions presented at
                the time they are made available.
              </p>
              <p>
                If paid plans are introduced, applicable information about
                pricing, billing periods, renewals, cancellations, and
                refunds will be provided before you make a purchase.
              </p>
              <p>
                Do not assume that a feature is included in a paid plan or
                that a subscription is active unless it is explicitly
                presented as available by XCode.
              </p>
            </TermsSection>

            <TermsSection
              id="intellectual-property"
              title="6. Intellectual Property"
              icon={Gavel}
            >
              <p>
                XCode and its associated branding, design, software,
                interfaces, and original platform content are owned by or
                licensed to the platform and are protected by applicable
                intellectual property laws.
              </p>
              <p>
                You may not reproduce, redistribute, commercially exploit,
                or create derivative works from proprietary platform
                materials without appropriate permission.
              </p>
              <p>
                These terms do not transfer ownership of your own original
                content to XCode merely because you submit or use it through
                the platform.
              </p>
            </TermsSection>

            <TermsSection
              id="user-content"
              title="7. User Content & Data"
              icon={FileText}
            >
              <p>
                You may provide profile information, technical responses,
                and other content while using XCode. You are responsible for
                ensuring that you have the rights to submit that content.
              </p>
              <p>
                You retain your rights in content you own. You grant XCode
                permission to process that content as necessary to provide
                the features you use, including interview generation,
                transcript creation, and evaluation.
              </p>
              <p>
                Your information is handled in accordance with our{" "}
                <a
                  href="/privacy"
                  className="font-bold text-[var(--clay-blue-ink)] underline underline-offset-4 hover:text-[var(--clay-primary)]"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </TermsSection>

            <TermsSection
              id="disclaimer"
              title="8. Disclaimers"
              icon={ShieldAlert}
            >
              <p>
                XCode is an interview preparation and practice platform. Its
                AI-generated questions, responses, and evaluations are
                intended to support learning and self-assessment.
              </p>
              <p>
                AI-generated feedback may be incomplete, inaccurate, or
                inconsistent. It should not be treated as a guarantee of
                technical correctness, professional certification, or
                employment suitability.
              </p>
              <p>
                Using XCode does not guarantee an interview invitation, job
                offer, promotion, or hiring outcome from any company.
              </p>
            </TermsSection>

            <TermsSection
              id="limitation-liability"
              title="9. Limitation of Liability"
              icon={Scale}
            >
              <p>
                To the extent permitted by applicable law, XCode and its
                operators will not be liable for indirect, incidental,
                special, consequential, or punitive damages arising from
                your use of, or inability to use, the platform.
              </p>
              <p>
                Nothing in these terms excludes or limits liability where
                such exclusion or limitation is not permitted by applicable
                law.
              </p>
            </TermsSection>

            <TermsSection
              id="modifications"
              title="10. Changes to These Terms"
              icon={FileText}
            >
              <p>
                We may update these Terms & Conditions as the platform,
                features, or applicable requirements change.
              </p>
              <p>
                When changes are material, we will take reasonable steps to
                communicate them through the platform or other appropriate
                channels. The updated effective date will appear at the top
                of this page.
              </p>
              <p>
                Continued use of XCode after updated terms become effective
                constitutes acceptance of the revised terms, to the extent
                permitted by applicable law.
              </p>
            </TermsSection>

            <TermsSection
              id="contact-us"
              title="11. Contact Us"
              icon={ArrowUpRight}
            >
              <p>
                If you have questions about these terms or need to contact
                us regarding the platform, reach out at:
              </p>

              <a
                href="mailto:anurag@xcodetechnologies.com"
                className="inline-flex items-center gap-3 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 py-4 text-sm font-bold text-[var(--clay-ink)] transition-colors hover:bg-[var(--clay-peach)]"
              >
                anurag@xcodetechnologies.com
                <ArrowUpRight className="size-4 text-[var(--clay-primary)]" />
              </a>
            </TermsSection>

            <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 text-xs leading-6 text-[var(--clay-muted)]">
              These terms are a general product draft and should be reviewed
              by a qualified legal professional before being used as a
              binding agreement.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
