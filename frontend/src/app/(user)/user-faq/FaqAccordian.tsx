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
          ? "border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] clay-inset"
          : "border-[var(--clay-border)] bg-[var(--clay-surface)] hover:border-[var(--clay-peach-shadow)] hover:bg-[var(--clay-surface-warm)] clay-raised"
      } p-5 sm:p-6`}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold tracking-tight text-[var(--clay-ink)] sm:text-base">
          {question}
        </h4>
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-primary)] transition-transform duration-300 ${
            isOpen
              ? "rotate-180 border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]"
              : ""
          }`}
        >
          <ChevronDown className="size-4" />
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 border-t border-[var(--clay-border)] pt-4 animate-in fade-in duration-200">
          <p className="text-xs leading-relaxed text-[var(--clay-muted)] sm:text-sm">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}