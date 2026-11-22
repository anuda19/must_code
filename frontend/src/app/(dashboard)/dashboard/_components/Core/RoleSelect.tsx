
"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, Briefcase } from "lucide-react";

const TECH_ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps / SRE Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Mobile Developer",
  "Cloud Architect",
  "QA / Automation Engineer",
  "Tech Lead",
  "Engineering Manager",
] as const;

interface JobRoleSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function JobRoleSelect({
  value,
  onChange,
  disabled = false,
  placeholder = "Select job role...",
}: JobRoleSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-foreground outline-none transition-all hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Job Role"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <Briefcase className="size-4 shrink-0 text-primary" />

          <span className="truncate">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
        </div>

        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="relative z-[100] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-[var(--shadow-dropdown)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <SelectPrimitive.Viewport className="space-y-1 p-1.5">
            {TECH_ROLES.map((role) => (
              <SelectPrimitive.Item
                key={role}
                value={role}
                className="relative flex w-full cursor-pointer select-none items-center rounded-xl px-3.5 py-3 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:font-semibold"
              >
                <SelectPrimitive.ItemText>
                  {role}
                </SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator className="absolute right-3 flex items-center justify-center">
                  <span className="grid size-6 place-items-center rounded-full bg-primary/10">
                    <Check className="size-3.5 text-primary" />
                  </span>
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}