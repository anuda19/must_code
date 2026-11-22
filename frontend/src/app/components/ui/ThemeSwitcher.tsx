"use client";

import { useTheme } from "next-themes";
import { Check, ChevronDown, Palette, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { APP_THEMES, AppTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";

const themes: {
  id: AppTheme;
  name: string;
  description: string;
  colors: [string, string, string];
}[] = [
  {
    id: "stealth",
    name: "Stealth Ops",
    description: "Tactical emerald and deep charcoal",
    colors: ["#090f0d", "#14201b", "#63e6a7"],
  },
  {
    id: "midnight",
    name: "Midnight Command",
    description: "Deep navy with electric blue accents",
    colors: ["#080d19", "#17243b", "#818cf8"],
  },
  {
    id: "stark",
    name: "Stark Industries",
    description: "Industrial graphite and cyan",
    colors: ["#090d12", "#141c24", "#45e0ed"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon purple and electric pink",
    colors: ["#10091b", "#28113b", "#e879f9"],
  },
  {
    id: "arctic",
    name: "Arctic Light",
    description: "Clean and bright futuristic design",
    colors: ["#f1f5fa", "#dcecf9", "#087fbd"],
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  //  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleThemeChange(nextTheme: AppTheme) {
    if (!APP_THEMES.includes(nextTheme)) return;
    setTheme(nextTheme);
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2.5 rounded-xl px-3",
              "border-border/70 bg-background/60",
              "shadow-sm transition-all duration-200",
              "hover:bg-accent/60",
            )}
          >
            <Palette className="size-4 text-muted-foreground" />
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        }
      ></PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[320px] rounded-2xl border-border/70 p-2.5 shadow-2xl"
      >
        <div className="px-2 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Palette className="size-4 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold">Appearance</p>
              <p className="text-xs text-muted-foreground">
                Personalize your workspace
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {themes.map((item) => {
            const isActive = theme === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleThemeChange(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl p-2.5 text-left",
                  "transition-all duration-200",
                  isActive
                    ? "bg-primary/10 ring-1 ring-primary/25"
                    : "hover:bg-accent/60",
                )}
              >
                <div
                  className="flex h-11 w-14 shrink-0 items-center gap-1 overflow-hidden rounded-lg border border-white/10 p-1.5"
                  style={{ backgroundColor: item.colors[0] }}
                >
                  <div
                    className="h-full w-2 rounded-sm"
                    style={{ backgroundColor: item.colors[1] }}
                  />

                  <div className="flex flex-1 flex-col gap-1">
                    <div
                      className="h-1.5 w-full rounded-full opacity-70"
                      style={{ backgroundColor: item.colors[1] }}
                    />
                    <div
                      className="h-1.5 w-3/4 rounded-full"
                      style={{ backgroundColor: item.colors[2] }}
                    />
                    <div
                      className="h-1 w-1/2 rounded-full opacity-50"
                      style={{ backgroundColor: item.colors[1] }}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {isActive ? (
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </div>
                ) : (
                  <div className="size-5 shrink-0 rounded-full border border-border opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-2 border-t border-border/60 px-2 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Current appearance
            </span>

            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              {resolvedTheme === "arctic" ? (
                <Sun className="size-3" />
              ) : (
                <Moon className="size-3" />
              )}
              {resolvedTheme === "arctic" ? "Light mode" : "Dark mode"}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}