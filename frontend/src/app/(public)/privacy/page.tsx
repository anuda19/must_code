"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Eye, Server, FileText, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/app/components/Navigation";

const SECTIONS = [
  { id: "overview", label: "1. Overview & Scope" },
  { id: "information-collection", label: "2. Information We Collect" },
  { id: "voice-ai-data", label: "3. Voice & Audio Processing" },
  { id: "how-we-use-data", label: "4. How We Use Data" },
  { id: "data-retention", label: "5. Retention & Security" },
  { id: "your-rights", label: "6. Your Rights & Choices" },
  { id: "contact-us", label: "7. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080a12] text-white selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-5 py-12 lg:px-12 xl:px-16 max-w-[1360px] mx-auto w-full">
        {/* Glow ambient background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute top-[50%] right-[-10%] size-[500px] rounded-full bg-cyan-600/10 blur-[150px]" />
        </div>

        {/* Page Header */}
        <div className="relative z-10 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="size-3.5 text-indigo-400" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Last updated: November 2026. Learn how XCode protects and respects your personal and technical data.
          </p>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Side Navigation Sticky Bar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-1 border-l border-white/10 pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Contents
              </p>
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`block py-1.5 text-xs font-medium transition-colors ${
                    activeSection === sec.id
                      ? "text-indigo-400 font-semibold pl-2 border-l-2 border-indigo-400 -ml-[17px]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sec.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Privacy Body */}
          <div className="lg:col-span-9 space-y-12 text-sm text-slate-300 leading-relaxed">
            
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="size-5 text-indigo-400" />
                1. Overview & Scope
              </h2>
              <p>
                At <strong className="text-white">XCode</strong>, we take privacy seriously. This Privacy Policy describes how we collect, use, process, and disclose your information across our website, interactive developer sandboxes, AI real-time voice interview engines, and software services.
              </p>
              <p>
                By accessing or using XCode, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue using our service.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="information-collection" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="size-5 text-indigo-400" />
                2. Information We Collect
              </h2>
              <p>We collect several types of information to provide and improve our service to you:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>
                  <strong className="text-white">Account Information:</strong> Full name, email address, authentication credentials, and profile settings upon registration.
                </li>
                <li>
                  <strong className="text-white">Professional Data:</strong> Uploaded CVs/resumes, tech stack preferences, target job titles, and experience levels used to customize AI technical interview questions.
                </li>
                <li>
                  <strong className="text-white">Usage & System Data:</strong> Log data, IP address, browser type, device information, and interactions within coding sandboxes.
                </li>
              </ul>
            </section>

            {/* 3. Voice & Audio Processing */}
            <section id="voice-ai-data" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 backdrop-blur-md">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="size-5 text-indigo-400" />
                  3. Real-Time Voice & Audio Processing Notice
                </h2>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  When participating in an AI Mock Interview session powered by WebRTC and LiveKit Agents Framework, your real-time microphone stream is processed transiently to generate bidirectional conversational feedback and performance metrics.
                </p>
                <div className="mt-4 grid gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Raw audio streams are never sold or rented to third-party advertisers.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Transcripts are stored securely to generate your post-interview scorecard.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. How We Use Data */}
            <section id="how-we-use-data" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Server className="size-5 text-indigo-400" />
                4. How We Use Data
              </h2>
              <p>We utilize collected information for core platform features, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Generating customized technical questions and real-time feedback.</li>
                <li>Computing technical scorecards (e.g., runtime efficiency, communication skills, system design depth).</li>
                <li>Maintaining authentication sessions and securing your user profile.</li>
                <li>Improving our AI model performance and application reliability.</li>
              </ul>
            </section>

            {/* 5. Retention & Security */}
            <section id="data-retention" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white">5. Data Retention & Security</h2>
              <p>
                We employ industry-standard encryption standards (TLS 1.3 in transit and AES-256 at rest) for all stored credentials, transcripts, and personal profile data. Database connections utilize secure connection pooling hosted in high-security data centers.
              </p>
            </section>

            {/* 6. Your Rights & Choices */}
            <section id="your-rights" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white">6. Your Rights & Choices</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Access, update, or delete your account information at any time via Profile Settings.</li>
                <li>Request complete erasure of your technical interview transcripts and performance history.</li>
                <li>Opt out of non-essential marketing emails.</li>
              </ul>
            </section>

            {/* 7. Contact Us */}
            <section id="contact-us" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8 pb-12">
              <h2 className="text-xl font-bold text-white">7. Contact Us</h2>
              <p>If you have any questions regarding this Privacy Policy or your data, please reach out to our team:</p>
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-mono text-indigo-300">
                <span>support@xcode.dev</span>
                <ArrowUpRight className="size-3.5 text-slate-400" />
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}