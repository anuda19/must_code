import { QueryProvider } from "@/providers/QueryProvider";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--clay-bg)] font-sans text-[var(--clay-ink)] selection:bg-[var(--clay-peach)] selection:text-[var(--clay-primary-ink)]">
      <QueryProvider>
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto bg-[var(--clay-bg)] p-6">
            <TooltipProvider>{children}</TooltipProvider>
          </main>
        </div>
      </QueryProvider>
    </div>
  );
}