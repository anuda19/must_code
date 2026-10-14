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
    (level) => level.value === value
  );

  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <Select.Trigger
        className="
          mt-1.5 flex w-full items-center justify-between
          rounded-xl border border-slate-800
          bg-slate-950 px-3.5 py-2.5
          text-sm text-white outline-none
          transition-colors
          hover:border-slate-700
          focus:border-indigo-500
          disabled:cursor-not-allowed disabled:opacity-50
        "
        aria-label="Experience Level"
      >
        <div className="flex items-center gap-2">
          <Select.Value>
            {selectedLevel?.label}
          </Select.Value>

          {selectedLevel && (
            <span className="text-xs text-slate-500">
              {selectedLevel.description}
            </span>
          )}
        </div>

        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="
            z-[100]
            w-[var(--radix-select-trigger-width)]
            overflow-hidden
            rounded-xl
            border border-slate-800
            bg-slate-900
            shadow-2xl
          "
        >
          <Select.Viewport className="p-1.5">
            {EXPERIENCE_LEVELS.map((level) => (
              <Select.Item
                key={level.value}
                value={level.value}
                className="
                  relative flex cursor-pointer
                  select-none items-center
                  rounded-lg px-3 py-2.5
                  text-sm text-slate-300
                  outline-none
                  data-[highlighted]:bg-slate-800
                  data-[highlighted]:text-white
                "
              >
                <div className="flex flex-1 flex-col">
                  <Select.ItemText>
                    {level.label}
                  </Select.ItemText>

                  <span className="mt-0.5 text-xs text-slate-500">
                    {level.description}
                  </span>
                </div>

                <Select.ItemIndicator>
                  <Check className="h-4 w-4 text-indigo-400" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}