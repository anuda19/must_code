"use client";
import { Search, Bell, ShieldCheck, Loader2 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "@/app/components/providers/AuthProvider";
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export default function Topbar() {
  const { user, isLoading } = useUser();
  return (
    <header className="relative z-10 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-gradient-to-r from-[#0B0F19] via-[#0E1424] to-[#0B0F19] px-6 shadow-md">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />

      {/* Search Input */}
      <div className="relative flex items-center w-72">
        <Search size={15} className="absolute left-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search metrics or commands..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Production</span>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition">
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-[#0B0F19]" />
        </button>

        {user && user.name && user.email ? (
          <ProfileDropdown user={{ name: user.name, email: user.email }} />
        ) : (
          <Loader2 className="animate-spin h-10 w-10 text-slate-400" />
        )}
      </div>
    </header>
  );
}
