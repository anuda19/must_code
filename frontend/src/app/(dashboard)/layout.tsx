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
    <div className="flex h-screen w-screen overflow-hidden bg-[#070A12] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <QueryProvider>
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#070A12] to-[#05070D]">
            <TooltipProvider>{children}</TooltipProvider>
          </main>
        </div>
      </QueryProvider>
    </div>
  );
}
