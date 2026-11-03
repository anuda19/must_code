"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  category: string;
}

export function FaqAccordion({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-indigo-500/40 bg-indigo-500/[0.04] shadow-lg shadow-indigo-950/30"
          : "border-white/10 bg-[#11162B]/80 hover:border-indigo-500/30 hover:bg-[#11162B]"
      } p-5 sm:p-6 backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold text-white sm:text-base tracking-tight">
          {question}
        </h4>
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-indigo-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 border-indigo-500/30 bg-indigo-500/10" : ""
          }`}
        >
          <ChevronDown className="size-4" />
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 border-t border-white/10 pt-4 animate-in fade-in duration-200">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}