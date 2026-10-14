"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Building2 } from "lucide-react";
import * as simpleIcons from "simple-icons";

export interface CompanyOption {
  id: string;
  name: string;
  iconSlug?: string;
}

const POPULAR_COMPANIES: CompanyOption[] = [
  { id: "google", name: "Google", iconSlug: "siGoogle" },
  { id: "meta", name: "Meta", iconSlug: "siMeta" },
  { id: "amazon", name: "Amazon", iconSlug: "siAmazon" },
  { id: "microsoft", name: "Microsoft", iconSlug: "siMicrosoft" },
  { id: "netflix", name: "Netflix", iconSlug: "siNetflix" },
  { id: "uber", name: "Uber", iconSlug: "siUber" },
  { id: "stripe", name: "Stripe", iconSlug: "siStripe" },
  { id: "headout", name: "Headout", iconSlug: "siHeadout" },
];

function CompanyIcon({ slug }: { slug?: string }) {
  if (!slug) return <Building2 className="h-4 w-4 text-slate-400" />;
  
  const icon = (simpleIcons as Record<string, { svg: string }>)[slug];
  if (!icon) return <Building2 className="h-4 w-4 text-slate-400" />;

  return (
    <span
      className="inline-block h-4 w-4 fill-current text-indigo-400"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
}

interface CompanySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CompanySelect({ value, onChange }: CompanySelectProps) {
  const selectedCompany = POPULAR_COMPANIES.find((c) => c.id === value);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none">
        <Select.Value placeholder="Select target company">
          {selectedCompany ? (
            <div className="flex items-center gap-2.5">
              <CompanyIcon slug={selectedCompany.iconSlug} />
              <span>{selectedCompany.name}</span>
            </div>
          ) : (
            <span className="text-slate-500">Select target company</span>
          )}
        </Select.Value>
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-[60] overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-xl">
          <Select.Viewport className="p-1">
            {POPULAR_COMPANIES.map((company) => (
              <Select.Item
                key={company.id}
                value={company.id}
                className="relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none data-[highlighted]:bg-slate-800 data-[highlighted]:text-white"
              >
                <CompanyIcon slug={company.iconSlug} />
                <Select.ItemText>{company.name}</Select.ItemText>
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