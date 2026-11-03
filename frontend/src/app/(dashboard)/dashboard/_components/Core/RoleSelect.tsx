"use client";

import * as React from "react";
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
        className="flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-indigo-500/50 focus:border-indigo-500 focus:bg-[#0B1020] focus:ring-4 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex items-center gap-2.5 truncate">
          <Briefcase className="size-4 shrink-0 text-indigo-400" />
          <SelectPrimitive.Value placeholder={placeholder} />
        </div>
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-slate-400 transition-transform duration-200 data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className="relative z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-white/10 bg-[#11162B] text-white shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl animate-in fade-in-80 zoom-in-95"
        >
          <SelectPrimitive.Viewport className="p-2 space-y-1">
            {TECH_ROLES.map((role) => (
              <SelectPrimitive.Item
                key={role}
                value={role}
                className="relative flex w-full cursor-pointer select-none items-center rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors hover:bg-indigo-600/20 hover:text-white focus:bg-indigo-600/20 focus:text-white data-[state=checked]:bg-indigo-600/30 data-[state=checked]:font-semibold data-[state=checked]:text-indigo-200"
              >
                <SelectPrimitive.ItemText>{role}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-3 flex items-center justify-center">
                  <Check className="size-4 text-indigo-400" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}