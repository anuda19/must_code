"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  Sparkles,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  FileQuestion,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "./FaqAccordian";
import BackButton from "@/app/components/ui/BackButton";

const FAQ_DATA = [
  {
    category: "Mock Interviews",
    question: "How do the AI mock interviews work?",
    answer:
      "X Code utilizes advanced real-time voice agent technology powered by the Gemini Live API over WebRTC. The AI conducts interactive technical interviews tailored to your target job role and experience level, asking follow-up questions and evaluating your answers live.",
  },
  {
    category: "Mock Interviews",
    question: "Can I choose my interviewer's persona or tone?",
    answer:
      "Yes! In your platform settings, you can customize your AI interviewer persona (e.g., Professional & Constructive, Strict FAANG Principal, or Friendly & Encouraging) to match the interview style you want to practice for.",
  },
  {
    category: "Technical Stack",
    question: "What technical roles and tech stacks are supported?",
    answer:
      "We support a wide variety of engineering tracks including Frontend, Backend, Full Stack, DevOps/SRE, Data Engineering, and Machine Learning. You can add your specific technical stack (like React, TypeScript, NestJS, or PostgreSQL) directly in your profile settings.",
  },
  {
    category: "Account & Security",
    question: "How is my account data and authentication secured?",
    answer:
      "Your session tokens are securely handled using httpOnly cookies with strict CSRF protections. We maintain strict privacy standards and never share your personal resume or profile details with third parties.",
  },
  {
    category: "Evaluations",
    question: "Where can I view my past interview evaluation scores?",
    answer:
      "All completed mock interview sessions and technical assessments are automatically scored and stored in your dashboard. You can review detailed performance breakdowns, code quality ratings, and suggested areas for improvement under your evaluation history.",
  },
  {
    category: "General",
    question:
      "Is X Code suitable for junior developers as well as senior engineers?",
    answer:
      "Absolutely. When configuring your profile or starting a session, you can select your experience level (Junior, Mid-Level, Senior, or Lead). The AI dynamically adjusts the complexity of technical questions to match your level.",
  },
];

const CATEGORIES = [
  "All",
  "Mock Interviews",
  "Technical Stack",
  "Evaluations",
  "Account & Security",
  "General",
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0D18] px-4 py-8 text-white antialiased sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.12] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-violet-600/[0.09] blur-[140px]" />

      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
            <FileQuestion className="size-3.5" />
            <span>Help Center & Support</span>
          </div>
          {/* <BackButton
            label="Back"
            className="text-slate-300 hover:bg-white/[0.07] hover:text-white"
          /> */}

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
            Find answers about our AI mock interview engine, WebRTC voice
            agents, evaluation metrics, and platform features.
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-lg pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full rounded-2xl border border-white/10 bg-[#11162B]/90 pl-11 pr-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:bg-[#11162B] focus:ring-4 focus:ring-indigo-500/15 shadow-xl"
              />
            </div>
          </div>
        </header>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25"
                  : "border border-white/10 bg-[#11162B]/60 text-slate-400 hover:border-indigo-500/30 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 pt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FaqAccordion
                key={index}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#11162B]/80 p-12 text-center backdrop-blur-2xl">
              <HelpCircle className="mx-auto size-10 text-slate-500 mb-3" />
              <h3 className="text-base font-semibold text-white">
                No matching questions found
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Try searching with a different keyword or browse another
                category.
              </p>
            </div>
          )}
        </div>

        {/* Support CTA Banner */}
        <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#11162B]/80 p-8 text-center shadow-2xl backdrop-blur-2xl">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <CardContent className="space-y-4 p-0">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 text-indigo-300">
              <MessageSquare className="size-6 text-indigo-300" />
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              Still have questions or need help?
            </h3>

            <p className="mx-auto max-w-md text-xs sm:text-sm text-slate-400">
              Our engineering support team is always ready to assist you with
              your interview preparation journey.
            </p>

            <div className="pt-2">
              <Button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-xl shadow-indigo-600/25 hover:scale-[1.02] transition-all">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
