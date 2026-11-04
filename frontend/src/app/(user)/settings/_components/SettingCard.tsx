import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}

export function SettingsCard({
  title,
  description,
  icon: Icon,
  children,
}: SettingsCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] clay-card">
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--clay-primary)] to-transparent" />

      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-[var(--clay-border)] pb-5">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-primary)] clay-raised">
            <Icon className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-[var(--clay-ink)] sm:text-lg">
              {title}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[var(--clay-muted)]">
              {description}
            </p>
          </div>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}