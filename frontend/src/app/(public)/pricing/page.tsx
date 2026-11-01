"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  Sparkles,
  Bot,
  Video,
  ShieldCheck,
  Building2,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Code2,
} from "lucide-react";

// --- Pricing Data ---
const PRICING_PLANS = [
  {
    name: "Starter",
    badge: "Free Forever",
    description: "Ideal for exploring AI mock interviews and basic technical practice.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaText: "Get Started Free",
    ctaHref: "#",
    popular: false,
    highlight: false,
    features: [
      "2 AI Mock Interviews / month",
      "Standard feedback & scorecards",
      "Limited AI Technical Assistant queries",
      "Access to basic practice problem set",
      "Community support",
    ],
    notIncluded: [
      "Detailed resume & code analysis",
      "Live audio WebRTC real-time stream",
      "System Design & Architecture mode",
      "Priority AI queue latency",
    ],
  },
  {
    name: "Pro Developer",
    badge: "Most Popular",
    description: "Everything you need to master technical interviews & get hired at top tech.",
    monthlyPrice: 29,
    yearlyPrice: 23, // ~20% off
    ctaText: "Start 7-Day Free Trial",
    ctaHref: "#",
    popular: true,
    highlight: true,
    features: [
      "Unlimited AI Mock Interviews",
      "Real-time voice streaming interviews",
      "Deep-dive technical scorecards & actionable feedback",
      "Unlimited AI Technical Assistant (Code & Architecture)",
      "Full access to premium practice challenges",
      "Custom interview customizer (Tech stack, seniority, domain)",
      "Resume & CV tailorer against job postings",
      "Priority processing & zero wait time",
    ],
    notIncluded: [],
  },
  {
    name: "Teams & Enterprise",
    badge: "Custom Solutions",
    description: "For bootcamps, universities, and engineering managers scaling candidates.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    ctaText: "Contact Sales",
    ctaHref: "#",
    popular: false,
    highlight: false,
    features: [
      "Everything in Pro Developer",
      "Dedicated candidate dashboard & team analytics",
      "Custom company interview rubrics & custom problem sets",
      "SAML / SSO & role-based access control",
      "Dedicated account manager & 1-on-1 coaching add-ons",
      "Custom SLA & invoice billing",
    ],
    notIncluded: [],
  },
];

// --- Detailed Comparison Matrix ---
const COMPARISON_CATEGORIES = [
  {
    category: "AI Mock Interviews",
    features: [
      { name: "Monthly Interview Limit", free: "2 / mo", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Voice & Real-time WebRTC Streaming", free: "Standard", pro: "High Performance", enterprise: "Priority Dedicated" },
      { name: "Detailed Technical Feedback & Metrics", free: "Basic", pro: "Comprehensive", enterprise: "Custom Rubrics" },
      { name: "Seniority Tuning (Junior to Staff)", free: false, pro: true, enterprise: true },
      { name: "System Design & Architecture Interviews", free: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "AI Technical Assistant & Practice",
    features: [
      { name: "AI Code Debugger & Assistant Queries", free: "50 / mo", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Coding Practice Problem Library", free: "Basic Set", pro: "Full Library", enterprise: "Custom Problem Sets" },
      { name: "Code Execution Sandbox", free: "Limited", pro: "Full Speed", enterprise: "Dedicated Runners" },
    ],
  },
  {
    category: "Career & Ecosystem Tools",
    features: [
      { name: "Resume & CV AI Parsing", free: false, pro: true, enterprise: true },
      { name: "Personal Skill Matrix & Progress Tracker", free: "Basic", pro: "Advanced", enterprise: "Team Analytics" },
      { name: "Priority Support", free: "Community", pro: "Priority Email", enterprise: "24/7 Dedicated" },
    ],
  },
];

// --- FAQ Items ---
const FAQ_ITEMS = [
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, absolutely. You can cancel your subscription from your account dashboard with a single click at any time. You will retain full access until the end of your billing cycle.",
  },
  {
    question: "How realistic are the AI Technical Interviews?",
    answer: "Our AI model is tuned on real-world engineering benchmarks across Big Tech companies. It asks technical follow-ups, probes into your architectural choices, and provides precise scorecards covering code efficiency, communication, and problem-solving.",
  },
  {
    question: "Is there a free trial for the Pro plan?",
    answer: "Yes! You can try the Pro Developer plan free for 7 days. You won't be charged if you cancel before the trial period ends.",
  },
  {
    question: "Do you offer student or regional discounts?",
    answer: "We believe talent is everywhere. We offer special discounts for students, bootcamp cohorts, and developers in specific regions. Contact our support team for details.",
  },
  {
    question: "What happens after I get hired?",
    answer: "Our vision expands beyond interviews. You can keep using XCode's AI Technical Assistant and ecosystem tools to accelerate your on-the-job engineering productivity and technical growth.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#080a12] text-white selection:bg-indigo-500 selection:text-white">
      {/* Glow Ambient Effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-[40%] -left-[10%] size-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[65%] -right-[10%] size-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
        
        {/* --- Header Section --- */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 backdrop-blur-md">
            <Sparkles className="size-3.5" />
            <span>Invest in your career growth</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Simple, transparent pricing. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Built to get you hired.
            </span>
          </h1>

          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Master real-time AI technical interviews, level up your engineering skills, and stand out to top tech recruiters worldwide.
          </p>

          {/* --- Monthly / Yearly Billing Toggle --- */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>
              Monthly billing
            </span>

            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-white/10 bg-slate-900/80 p-0.5 transition-colors duration-300 ease-in-out focus:outline-none"
              aria-label="Toggle billing cycle"
            >
              <span
                className={`pointer-events-none inline-block size-6.5 transform rounded-full bg-indigo-500 shadow-md ring-0 transition duration-300 ease-in-out ${
                  billingCycle === "yearly" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}>
                Annual billing
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* --- Pricing Cards Grid --- */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlight
                    ? "border-2 border-indigo-500/60 bg-[#0d1021] shadow-[0_0_50px_rgba(99,102,241,0.2)] lg:-translate-y-2"
                    : "border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-400">{plan.description}</p>

                  {/* Pricing Display */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-sm font-medium text-slate-400">
                      {price === 0 ? "" : billingCycle === "yearly" ? "/mo (billed yearly)" : "/month"}
                    </span>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  {/* Features List */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Included Features:</p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                          <Check className="size-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}

                    {/* Not included items if any */}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 opacity-40">
                        <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-500">
                          <span className="text-[10px]">✕</span>
                        </div>
                        <span className="text-xs text-slate-400 line-through">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-8">
                  <Link
                    href={plan.ctaHref}
                    className={`group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-semibold transition-all duration-200 ${
                      plan.highlight
                        ? "bg-indigo-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:bg-indigo-400 hover:shadow-[0_0_35px_rgba(99,102,241,0.6)]"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Trust Guarantee Banner --- */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-md sm:gap-12">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-indigo-400" />
            <span className="text-xs font-medium text-slate-300">7-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="size-5 text-indigo-400" />
            <span className="text-xs font-medium text-slate-300">Instant Access to AI Engines</span>
          </div>
          <div className="flex items-center gap-3">
            <Bot className="size-5 text-indigo-400" />
            <span className="text-xs font-medium text-slate-300">Powered by Gemini & WebRTC Realtime</span>
          </div>
        </div>

        {/* --- Feature Comparison Matrix Section --- */}
        <div className="mt-28">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Compare Plan Capabilities</h2>
            <p className="mt-2 text-sm text-slate-400">Detailed breakdown of features across all plans.</p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.01]">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-4 text-xs font-semibold text-slate-400">Features</th>
                  <th className="p-4 text-center text-xs font-semibold text-slate-300">Starter</th>
                  <th className="p-4 text-center text-xs font-semibold text-indigo-400">Pro Developer</th>
                  <th className="p-4 text-center text-xs font-semibold text-slate-300">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_CATEGORIES.map((cat, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="bg-white/[0.02]">
                      <td colSpan={4} className="p-3 text-xs font-bold uppercase tracking-wider text-indigo-400">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feat, fIdx) => (
                      <tr key={fIdx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-xs text-slate-300">{feat.name}</td>
                        <td className="p-4 text-center text-xs text-slate-400">
                          {typeof feat.free === "boolean" ? (
                            feat.free ? <Check className="mx-auto size-4 text-emerald-400" /> : "—"
                          ) : (
                            feat.free
                          )}
                        </td>
                        <td className="p-4 text-center text-xs font-medium text-indigo-300">
                          {typeof feat.pro === "boolean" ? (
                            feat.pro ? <Check className="mx-auto size-4 text-emerald-400" /> : "—"
                          ) : (
                            feat.pro
                          )}
                        </td>
                        <td className="p-4 text-center text-xs text-slate-400">
                          {typeof feat.enterprise === "boolean" ? (
                            feat.enterprise ? <Check className="mx-auto size-4 text-emerald-400" /> : "—"
                          ) : (
                            feat.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FAQ Accordion Section --- */}
        <div className="mt-28 mx-auto max-w-3xl">
          <div className="text-center">
            <div className="inline-flex size-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 mb-3">
              <HelpCircle className="size-5" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-slate-400">Everything you need to know about plans and billing.</p>
          </div>

          <div className="mt-10 space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.02] transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs leading-relaxed text-slate-400 border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom Conversion Banner --- */}
        <div className="mt-28 relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-[#0c0f1d] to-purple-950/40 p-10 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to elevate your engineering career?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Join thousands of developers leveling up their technical skills and landing offers at top tech companies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-xs font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-400"
              >
                <span>Get Started Now</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}