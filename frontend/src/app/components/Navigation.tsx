// "use client";

// import * as NavigationMenu from "@radix-ui/react-navigation-menu";
// import Link from "next/link";
// import { ArrowRight, Code2 } from "lucide-react";
// import { useUser } from "@/hooks/useUser";
// import { ROUTES } from "@/lib/routes";

// const NAV_ITEMS = [
//   { href: "/courses", label: "Courses" },
//   { href: "/practice", label: "Practice" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const { data: user } = useUser();
//   return (
//     <header className="sticky top-0 z-50 h-[72px] border-b border-white/[0.07] bg-[#080a12] text-white">
//       <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
//         {/* Brand */}
//         <Link
//           href="/"
//           aria-label="X Code home"
//           className="group flex shrink-0 items-center gap-2.5"
//         >
//           <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-100/20 bg-indigo-400/[0.10] text-indigo-400 transition-colors group-hover:border-indigo-200/40 group-hover:bg-indigo-400/[0.15]">
//             <Code2 className="size-[20px]" strokeWidth={2.8} />
//           </div>

//           <span className="text-[25px] font-semibold tracking-[-0.055em] text-white">
//             X<span className="text-indigo-400">Code</span>
//           </span>
//         </Link>

//         {/* Navigation */}
//         <NavigationMenu.Root className="hidden md:flex">
//           <NavigationMenu.List className="flex items-center gap-1">
//             {NAV_ITEMS.map((item) => (
//               <NavigationMenu.Item key={item.href}>
//                 <NavigationMenu.Link asChild>
//                   <Link
//                     href={item.href}
//                     className="rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-400 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </NavigationMenu.Link>
//               </NavigationMenu.Item>
//             ))}
//           </NavigationMenu.List>
//         </NavigationMenu.Root>

//         {/* Actions */}
//         <div className="flex shrink-0 items-center gap-2">
//           {!user ? (
//             <Link
//               href="/login"
//               className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white sm:px-4"
//             >
//               Login
//             </Link>
//           ) : (
//             <Link
//               href={ROUTES.dashboard}
//               className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white sm:px-4"
//             >
//               Dashboard
//             </Link>
//           )}

//           <Link
//             href="/signup"
//             className="group inline-flex h-10 items-center gap-2 rounded-xl border border-indigo-200/20 bg-indigo-500 px-3.5 text-[12px] font-semibold text-[#10111b] transition-all duration-200 hover:bg-indigo-400 sm:px-4 sm:text-[13px]"
//           >
//             Get started
//             <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  Code2,
  ArrowRight,
  Sparkles,
  Bot,
  Video,
  BookOpen,
  Trophy,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/lib/routes";

// Feature structure highlighting existing & upcoming modules
const FEATURE_ITEMS = [
  {
    title: "Mock Interview",
    description: "Simulate real-world technical interviews with instant AI feedback.",
    href: ROUTES.register,
    icon: Video,
    status: "Ready",
  },
  {
    title: "AI Tech Assistant",
    description: "Ask questions, debug code, and get real-time technical help.",
    href: "/assistant",
    icon: Bot,
    status: "Soon",
  },
  {
    title: "Practice & Challenges",
    description: "Solve real-world coding problems and algorithm challenges.",
    href: "/practice",
    icon: Trophy,
    status: "Soon",
  },
  {
    title: "Interactive Courses",
    description: "Structured learning paths for frontend, backend, and system design.",
    href: "/courses",
    icon: BookOpen,
    status: "Soon",
  },
];

const MAIN_NAV_ITEMS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/[0.08] bg-[#080a12] backdrop-blur-md text-white transition-all">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="X Code home"
          className="group flex shrink-0 items-center gap-2.5 outline-none"
        >
          <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Code2 className="size-5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
          </div>

          <span className="text-[22px] font-bold tracking-tight text-white">
            X<span className="text-indigo-400">Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="relative hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">
            
            {/* Features Dropdown Menu */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white data-[state=open]:text-indigo-400">
                <Bot className="size-3.5 text-indigo-400 mb-1" />
                <span>Features</span>
                <ChevronDown className="size-3.5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#0c0f1d] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col gap-1">
                  {FEATURE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isUpcoming = item.status === "Soon";
                    return (
                      <Link
                        key={item.title}
                        href={isUpcoming ? "#" : item.href}
                        className={`group relative flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                          isUpcoming
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-indigo-500/10 hover:border-indigo-500/20"
                        }`}
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-indigo-400 transition-colors group-hover:border-indigo-500/30 group-hover:bg-indigo-500/20">
                          <Icon className="size-4.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-white group-hover:text-indigo-300">
                              {item.title}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                item.status === "Ready"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-white/5 text-slate-400 border border-white/10"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] leading-tight text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* General Nav Links */}
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "bg-white/[0.08] text-indigo-400 font-semibold"
                          : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {!user ? (
            <Link
              href="/login"
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
            >
              Log in
            </Link>
          ) : (
            <Link
              href={ROUTES.dashboard}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
            >
              Dashboard
            </Link>
          )}

          <Link
            href={user ? ROUTES.dashboard : ROUTES.register}
            className="group inline-flex h-9 items-center gap-2 rounded-xl bg-indigo-500 px-4 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
          >
            <span>{user ? "Go to App" : "Get started"}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-1 flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-Over */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#080a12] px-6 py-4 md:hidden">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Features
          </div>
          <div className="grid gap-2">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.status === "Soon" ? "#" : item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-indigo-400" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{item.status}</span>
                </Link>
              );
            })}
          </div>
          <div className="my-3 h-px bg-white/10" />
          <div className="grid gap-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/[0.05]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}