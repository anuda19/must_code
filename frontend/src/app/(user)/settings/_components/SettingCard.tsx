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
    <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#11162B]/80 text-white shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl">
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
      
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-5">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 text-indigo-300 shadow-inner">
            <Icon className="size-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
              {title}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-slate-400">
              {description}
            </p>
          </div>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}