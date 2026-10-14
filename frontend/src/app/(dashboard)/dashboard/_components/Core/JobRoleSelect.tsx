"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Briefcase } from "lucide-react";

export const JOB_ROLES = [
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile App Engineer (React Native/Flutter)",
  "DevOps / Infrastructure Engineer",
  "System Architect",
  "AI / Machine Learning Engineer",
] as const;

export type JobRole = (typeof JOB_ROLES)[number] | (string & {});

interface RoleSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RoleSelect({
  value,
  onChange,
  disabled = false,
}: RoleSelectProps) {
  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <Select.Trigger
        className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Select Job Role"
      >
        <Select.Value placeholder="Select a job role">
          {value ? (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 shrink-0 text-indigo-400" />
              <span className="truncate">{value}</span>
            </div>
          ) : (
            <span className="text-slate-500">Select a job role</span>
          )}
        </Select.Value>
        <Select.Icon>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="z-[60] max-h-60 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-2xl backdrop-blur-xl animate-in fade-in-80 zoom-in-95"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-1 space-y-0.5">
            {JOB_ROLES.map((role) => (
              <Select.Item
                key={role}
                value={role}
                className="relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none data-[highlighted]:bg-slate-800 data-[highlighted]:text-white transition-colors"
              >
                <Briefcase className="h-4 w-4 shrink-0 text-slate-400" />
                <Select.ItemText>{role}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
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