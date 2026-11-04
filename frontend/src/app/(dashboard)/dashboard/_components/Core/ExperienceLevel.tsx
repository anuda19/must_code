
"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export interface ExperienceLevel {
  value: string;
  label: string;
  description: string;
}

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    value: "ENTRY_LEVEL",
    label: "Entry Level",
    description: "0–1 years",
  },
  {
    value: "MID_LEVEL",
    label: "Mid Level",
    description: "2–4 years",
  },
  {
    value: "SENIOR",
    label: "Senior",
    description: "5+ years",
  },
  {
    value: "LEAD",
    label: "Lead / Staff",
    description: "Leadership & architecture",
  },
];

interface ExperienceLevelSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ExperienceLevelSelect({
  value,
  onChange,
  disabled = false,
}: ExperienceLevelSelectProps) {
  const selectedLevel = EXPERIENCE_LEVELS.find(
    (level) => level.value === value,
  );

  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        className="mt-1 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-3.5 py-3 text-sm text-[var(--clay-ink)] shadow-[inset_3px_3px_6px_rgba(234,208,192,0.55),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] outline-none transition-all hover:border-[var(--clay-peach-shadow)] focus:border-[var(--clay-primary)] focus:ring-4 focus:ring-[var(--clay-primary)]/10 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Experience Level"
      >
        <div className="flex min-w-0 items-center gap-2">
          <Select.Value>{selectedLevel?.label}</Select.Value>

          {selectedLevel && (
            <span className="truncate rounded-md bg-[var(--clay-surface)] px-2 py-1 text-[10px] font-medium text-[var(--clay-subtle)]">
              {selectedLevel.description}
            </span>
          )}
        </div>

        <Select.Icon>
          <ChevronDown className="size-4 shrink-0 text-[var(--clay-muted)]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-[100] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-1.5 text-[var(--clay-ink)] shadow-[0_16px_40px_rgba(101,70,49,0.18)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Select.Viewport>
            {EXPERIENCE_LEVELS.map((level) => (
              <Select.Item
                key={level.value}
                value={level.value}
                className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-3 text-sm outline-none transition-colors data-[highlighted]:bg-[var(--clay-surface-warm)] data-[highlighted]:text-[var(--clay-ink)] data-[state=checked]:bg-[var(--clay-peach)]/50"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <Select.ItemText>
                    <span className="font-semibold">{level.label}</span>
                  </Select.ItemText>

                  <span className="mt-1 text-xs text-[var(--clay-muted)]">
                    {level.description}
                  </span>
                </div>

                <Select.ItemIndicator>
                  <span className="grid size-6 place-items-center rounded-full bg-[var(--clay-green-surface)]">
                    <Check className="size-3.5 text-[var(--clay-green-ink)]" />
                  </span>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}