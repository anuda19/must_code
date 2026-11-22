
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const APP_THEMES = [
  "stealth",
  "midnight",
  "stark",
  "cyberpunk",
  "arctic",
] as const;

export type AppTheme = (typeof APP_THEMES)[number];

type ThemeProviderProps = React.ComponentProps<
  typeof NextThemesProvider
>;

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="data-theme"
      defaultTheme="stealth"
      enableSystem={false}
      themes={[...APP_THEMES]}
      storageKey="app-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}