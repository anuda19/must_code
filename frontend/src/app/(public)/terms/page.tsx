"use client";

import { useState, useEffect } from "react";
import { FileText, ShieldAlert, Scale, CreditCard, Cpu, ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navigation";

const SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "user-accounts", label: "2. Accounts & Registration" },
  { id: "acceptable-use", label: "3. Acceptable Use Policy" },
  { id: "subscriptions", label: "4. Subscriptions & Billing" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "limitation-liability", label: "6. Limitation of Liability" },
  { id: "modifications", label: "7. Changes to Terms" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

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

      <main className="relative z-10 flex-1 px-5 py-12 lg:px-12 xl:px-16 max-w-[1360px] mx-auto w-full">
        {/* Ambient Glows */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-purple-600/10 blur-[140px]" />
          <div className="absolute top-[50%] left-[-10%] size-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
        </div>

        {/* Page Header */}
        <div className="relative z-10 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <Scale className="size-3.5 text-purple-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Effective Date: November 2026. Please read these terms carefully before using XCode.
          </p>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Side Nav Anchor Bar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-1 border-l border-white/10 pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Sections
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

          {/* Terms Content Body */}
          <div className="lg:col-span-9 space-y-12 text-sm text-slate-300 leading-relaxed">
            
            {/* 1. Acceptance */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="size-5 text-indigo-400" />
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account or accessing the XCode platform, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            {/* 2. User Accounts */}
            <section id="user-accounts" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="size-5 text-indigo-400" />
                2. Accounts & Registration
              </h2>
              <p>
                You must provide accurate, complete information when creating an account. You are responsible for safeguarding your login credentials and for all activities that occur under your account.
              </p>
            </section>

            {/* 3. Acceptable Use */}
            <section id="acceptable-use" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="size-5 text-indigo-400" />
                3. Acceptable Use Policy
              </h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Reverse engineering, scraping, or attempting to extract source code from XCode AI models or sandboxes.</li>
                <li>Using automated scripts to overload or disrupt our WebRTC audio streaming servers.</li>
                <li>Sharing accounts or selling subscription access to unauthorized third parties.</li>
                <li>Attempting to bypass security validation pipes or access unauthorized user data.</li>
              </ul>
            </section>

            {/* 4. Subscriptions & Billing */}
            <section id="subscriptions" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="size-5 text-indigo-400" />
                4. Subscriptions & Billing
              </h2>
              <p>
                Certain features of XCode require a paid subscription (e.g., Pro Developer plan). Subscriptions automatically renew monthly or annually based on your billing cycle unless cancelled prior to renewal through your account settings.
              </p>
            </section>

            {/* 5. Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white">5. Intellectual Property</h2>
              <p>
                All platform content, code templates, logos, design assets, and proprietary AI evaluation software are the exclusive property of XCode. Code written by users within the sandbox remains the sole property of the user.
              </p>
            </section>

            {/* 6. Limitation of Liability */}
            <section id="limitation-liability" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
              <p>
                XCode provides technical mock interview simulation and coaching tools on an "as-is" basis. While our features prepare developers for Big Tech standards, XCode does not guarantee employment or job offers from specific companies.
              </p>
            </section>

            {/* 7. Changes to Terms */}
            <section id="modifications" className="scroll-mt-28 space-y-4 border-t border-white/5 pt-8 pb-12">
              <h2 className="text-xl font-bold text-white">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of material changes via email or platform announcements.
              </p>
              <p className="text-xs text-slate-400 pt-2">
                For legal inquiries, contact <span className="text-indigo-400 font-mono">legal@xcode.dev</span>
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}