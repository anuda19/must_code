
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
    <Select.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <Select.Trigger
        className="mt-1 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-foreground outline-none transition-all hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Experience Level"
      >
        <div className="flex min-w-0 items-center gap-2">
          <Select.Value>{selectedLevel?.label}</Select.Value>

          {selectedLevel && (
            <span className="truncate rounded-md border border-border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
              {selectedLevel.description}
            </span>
          )}
        </div>

        <Select.Icon>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-[100] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-dropdown)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Select.Viewport>
            {EXPERIENCE_LEVELS.map((level) => (
              <Select.Item
                key={level.value}
                value={level.value}
                className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-3 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[state=checked]:bg-primary/10"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <Select.ItemText>
                    <span className="font-semibold">{level.label}</span>
                  </Select.ItemText>

                  <span className="mt-1 text-xs text-muted-foreground">
                    {level.description}
                  </span>
                </div>

                <Select.ItemIndicator>
                  <span className="grid size-6 place-items-center rounded-full bg-primary/10">
                    <Check className="size-3.5 text-primary" />
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