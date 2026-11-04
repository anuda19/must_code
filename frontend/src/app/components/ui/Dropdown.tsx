"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { ReactNode } from "react";

export type DropdownItem = {
  label: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  destructive?: boolean;
};

interface DropdownProps {
  trigger: ReactNode;
  header?: ReactNode;
  items: DropdownItem[][];
}

export function Dropdown({ trigger, header, items }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="outline-none">
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[240px] overflow-hidden rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-1 text-[var(--clay-ink)] shadow-[0_12px_30px_rgba(101,70,49,0.16)] backdrop-blur-md animate-in fade-in-80 slide-in-from-top-2"
        >
          {header && (
            <>
              <div className="px-3 py-2.5">{header}</div>

              <DropdownMenu.Separator className="mx-1 my-1 h-[1px] bg-[var(--clay-border)]" />
            </>
          )}

          {items.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((item) => {
                const ItemContent = (
                  <>
                    {item.icon && (
                      <item.icon
                        size={16}
                        className="mr-2 shrink-0 opacity-70"
                      />
                    )}

                    <span>{item.label}</span>
                  </>
                );

                const itemClasses = `relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-[var(--clay-surface-warm)] data-[highlighted]:text-[var(--clay-ink)] ${
                  item.destructive
                    ? "text-[#b4533d] data-[highlighted]:bg-[#fbe7dd] data-[highlighted]:text-[#a34d37]"
                    : "text-[var(--clay-muted)]"
                }`;

                return item.href ? (
                  <DropdownMenu.Item asChild key={item.label}>
                    <Link href={item.href} className={itemClasses}>
                      {ItemContent}
                    </Link>
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item
                    key={item.label}
                    onClick={item.onClick}
                    className={itemClasses}
                  >
                    {ItemContent}
                  </DropdownMenu.Item>
                );
              })}

              {/* Add separator if it's not the last group */}
              {groupIndex < items.length - 1 && (
                <DropdownMenu.Separator className="mx-1 my-1 h-[1px] bg-[var(--clay-border)]" />
              )}
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}