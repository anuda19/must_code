"use client";
import { Search, Bell, ShieldCheck, Loader2, User2, Code2 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export default function Topbar({ profile }: { profile?: boolean }) {
  const { data: user } = useUser();
  return (
    <header className="relative z-10 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-gradient-to-r from-[#0B0F19] via-[#0E1424] to-[#0B0F19] px-6 shadow-md">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />

      {/* Search Input */}
      <div className="relative flex items-center w-72">
        {/* <Search size={15} className="absolute left-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search metrics or commands..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
        /> */}
        {profile ? (
          <Link
            href={ROUTES.dashboard}
            aria-label="X Code home"
            className="group flex shrink-0 items-center gap-2.5 outline-none"
          >
            <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Code2
                className="size-5 transition-transform group-hover:scale-110"
                strokeWidth={2.5}
              />
            </div>

            <span className="text-[22px] font-bold tracking-tight text-white">
              X<span className="text-indigo-400">Code</span>
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 font-semibold">
            <User2 size={14} className="text-indigo-400" />
            <span>{user?.name && `Hi, ${user.name}`}</span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition">
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-400 ring-2 ring-[#0B0F19]" />
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
