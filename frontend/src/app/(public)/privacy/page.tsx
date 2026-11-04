
"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Database,
  Eye,
  FileText,
  Lock,
  Mic,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const SECTIONS = [
  { id: "overview", label: "Overview & Scope" },
  { id: "information-collection", label: "Information We Collect" },
  { id: "voice-ai-data", label: "Voice & AI Processing" },
  { id: "how-we-use-data", label: "How We Use Information" },
  { id: "data-retention", label: "Data Retention & Security" },
  { id: "your-rights", label: "Your Rights & Choices" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "contact-us", label: "Contact Us" },
];

function PolicySection({
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
          <div className="clay-feature-sage mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--clay-sage-ink)]">
            <Icon className="size-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-[var(--clay-ink)]">
            {title}
          </h2>
        </div>
      </div>
      <div className="space-y-4 text-sm leading-7 text-[var(--clay-muted)]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

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
      <div className="pointer-events-none absolute right-[-120px] top-20 size-[400px] rounded-full bg-[var(--clay-blue)]/60 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <header className="clay-card rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-7 sm:p-10">
          <div className="clay-feature-sage inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[var(--clay-sage-ink)]">
            <ShieldCheck className="size-4" />
            Privacy & data protection
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--clay-muted)] sm:text-base">
            Your information matters. This policy explains what information
            XCode may collect, how it is used, and the choices available to
            you when using our platform.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--clay-subtle)]">
            <span className="rounded-full border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-3 py-1.5">
              XCode
            </span>
            <span>Last updated: November 5, 2026</span>
          </div>
        </header>

        <div className="mt-9 grid gap-8 lg:grid-cols-12">
          {/* Table of contents */}
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
                          ? "bg-[var(--clay-green-surface)] text-[var(--clay-sage-ink)]"
                          : "text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          active
                            ? "text-[var(--clay-sage-ink)]"
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

          {/* Policy content */}
          <div className="clay-card space-y-9 rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 sm:p-9 lg:col-span-9">
            <PolicySection
              id="overview"
              title="1. Overview & Scope"
              icon={Eye}
            >
              <p>
                XCode provides an AI-powered technical interview preparation
                platform. This Privacy Policy explains how information is
                handled when you visit our website, create an account, use
                your profile, participate in mock interviews, or access
                related platform features.
              </p>
              <p>
                By using XCode, you acknowledge that your information may be
                processed as described in this policy. If you do not agree
                with this policy, please discontinue using the platform.
              </p>
            </PolicySection>

            <PolicySection
              id="information-collection"
              title="2. Information We Collect"
              icon={UserRound}
            >
              <p>
                Depending on how you use XCode, we may collect the following
                categories of information:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5">
                  <h3 className="font-bold text-[var(--clay-ink)]">
                    Account information
                  </h3>
                  <p className="mt-2 text-xs leading-6">
                    Your name, email address, authentication-related
                    information, and account preferences.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5">
                  <h3 className="font-bold text-[var(--clay-ink)]">
                    Professional profile
                  </h3>
                  <p className="mt-2 text-xs leading-6">
                    Your target job role, experience level, target company,
                    technical skills, and other profile details you provide.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5">
                  <h3 className="font-bold text-[var(--clay-ink)]">
                    Interview information
                  </h3>
                  <p className="mt-2 text-xs leading-6">
                    Interview transcripts, session information, and
                    AI-generated evaluations associated with your sessions.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5">
                  <h3 className="font-bold text-[var(--clay-ink)]">
                    Technical information
                  </h3>
                  <p className="mt-2 text-xs leading-6">
                    Information such as browser type, device details, log
                    data, and technical information generated while using
                    the platform, where collected.
                  </p>
                </div>
              </div>
            </PolicySection>

            <PolicySection
              id="voice-ai-data"
              title="3. Voice & AI Processing"
              icon={Mic}
            >
              <div className="rounded-2xl border border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] p-5">
                <div className="flex items-center gap-2 font-bold text-[var(--clay-blue-ink)]">
                  <Lock className="size-5" />
                  Real-time interview processing
                </div>
                <p className="mt-3 text-xs leading-7 text-[var(--clay-ink)]">
                  When you participate in a voice-based mock interview, your
                  microphone audio is transmitted and processed to enable
                  real-time interaction with the AI interviewer. The platform
                  may use third-party infrastructure and AI services to
                  support this experience.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--clay-status)]" />
                  <span>
                    Audio is used to support the live interview conversation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--clay-status)]" />
                  <span>
                    Interview transcripts may be saved so you can review
                    conversations and receive post-interview evaluations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--clay-status)]" />
                  <span>
                    Do not share passwords, payment details, or other
                    unnecessary sensitive information during an interview.
                  </span>
                </li>
              </ul>

              <p>
                The handling, retention, and processing of audio or related
                data may also be subject to the policies of the third-party
                services used to provide the interview experience.
              </p>
            </PolicySection>

            <PolicySection
              id="how-we-use-data"
              title="4. How We Use Information"
              icon={Database}
            >
              <p>We may use collected information to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Create and maintain your XCode account.</li>
                <li>Personalize technical interview questions using your profile.</li>
                <li>Enable real-time AI interview conversations.</li>
                <li>Save interview transcripts and session records.</li>
                <li>Generate interview evaluations and performance feedback.</li>
                <li>Maintain platform security and troubleshoot technical issues.</li>
                <li>Communicate important account or service-related updates.</li>
              </ul>
              <p>
                We do not use your information for purposes unrelated to
                providing or operating the platform unless we explain those
                purposes or obtain consent where required.
              </p>
            </PolicySection>

            <PolicySection
              id="data-retention"
              title="5. Data Retention & Security"
              icon={ShieldCheck}
            >
              <p>
                We retain information for as long as reasonably necessary to
                provide the platform, maintain account records, support
                interview history, meet applicable legal obligations, and
                address legitimate operational needs.
              </p>
              <p>
                We use appropriate technical and organizational measures
                intended to protect information against unauthorized access,
                loss, misuse, or alteration. However, no internet
                transmission or electronic storage system can be guaranteed
                to be completely secure.
              </p>
              <p>
                Retention periods may vary depending on the type of
                information and the purpose for which it is processed.
              </p>
            </PolicySection>

            <PolicySection
              id="your-rights"
              title="6. Your Rights & Choices"
              icon={FileText}
            >
              <p>
                Depending on applicable law, you may have the right to:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Access personal information associated with your account.</li>
                <li>Correct inaccurate or incomplete account information.</li>
                <li>Request deletion of your account or personal information.</li>
                <li>Request deletion of interview transcripts and related records.</li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>
              <p>
                You can update available profile information through your
                account settings. For requests that cannot be completed
                through the platform, contact us using the details below.
              </p>
            </PolicySection>

            <PolicySection
              id="third-party-services"
              title="7. Third-Party Services"
              icon={Database}
            >
              <p>
                XCode relies on third-party infrastructure and service
                providers to operate parts of the platform. These may
                include hosting, database, storage, authentication,
                real-time communication, and AI processing providers.
              </p>
              <p>
                Information may be shared with these providers only as
                necessary to operate, maintain, and support the relevant
                platform features, subject to applicable agreements and
                requirements.
              </p>
              <p>
                Third-party services may have their own privacy policies and
                data-handling practices. We encourage you to review those
                policies where relevant.
              </p>
            </PolicySection>

            <PolicySection
              id="contact-us"
              title="8. Contact Us"
              icon={ArrowUpRight}
            >
              <p>
                If you have questions about this Privacy Policy or want to
                make a privacy-related request, contact us:
              </p>

              <a
                href="mailto:support@xcode.dev"
                className="inline-flex items-center gap-3 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 py-4 text-sm font-bold text-[var(--clay-ink)] transition-colors hover:bg-[var(--clay-peach)]"
              >
                support@xcode.dev
                <ArrowUpRight className="size-4 text-[var(--clay-primary)]" />
              </a>
            </PolicySection>

            <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 text-xs leading-6 text-[var(--clay-muted)]">
              This policy should be reviewed against your actual data
              processing, infrastructure providers, retention practices, and
              applicable privacy laws before publication.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
