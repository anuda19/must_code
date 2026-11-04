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
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import * as NavigationMenu from "@radix-ui/react-navigation-menu";
// import {
//   Code2,
//   ArrowRight,
//   Sparkles,
//   Bot,
//   Video,
//   BookOpen,
//   Trophy,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";
// import { useUser } from "@/hooks/useUser";
// import { ROUTES } from "@/lib/routes";

// // Feature structure highlighting existing & upcoming modules
// const FEATURE_ITEMS = [
//   {
//     title: "Mock Interview",
//     description: "Simulate real-world technical interviews with instant AI feedback.",
//     href: ROUTES.register,
//     icon: Video,
//     status: "Ready",
//   },
//   {
//     title: "AI Tech Assistant",
//     description: "Ask questions, debug code, and get real-time technical help.",
//     href: "/assistant",
//     icon: Bot,
//     status: "Soon",
//   },
//   {
//     title: "Practice & Challenges",
//     description: "Solve real-world coding problems and algorithm challenges.",
//     href: "/practice",
//     icon: Trophy,
//     status: "Soon",
//   },
//   {
//     title: "Interactive Courses",
//     description: "Structured learning paths for frontend, backend, and system design.",
//     href: "/courses",
//     icon: BookOpen,
//     status: "Soon",
//   },
// ];

// const MAIN_NAV_ITEMS = [
//   { href: "/pricing", label: "Pricing" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const { data: user } = useUser();
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

//   return (
//     <header className="sticky top-0 z-50 h-[72px] border-b border-white/[0.08] bg-[#080a12] backdrop-blur-md text-white transition-all">
//       <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        
//         {/* Brand Logo */}
//         <Link
//           href="/"
//           aria-label="X Code home"
//           className="group flex shrink-0 items-center gap-2.5 outline-none"
//         >
//           <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
//             <Code2 className="size-5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
//           </div>

//           <span className="text-[22px] font-bold tracking-tight text-white">
//             X<span className="text-indigo-400">Code</span>
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <NavigationMenu.Root className="relative hidden md:flex">
//           <NavigationMenu.List className="flex items-center gap-1">
            
//             {/* Features Dropdown Menu */}
//             <NavigationMenu.Item>
//               <NavigationMenu.Trigger className="group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white data-[state=open]:text-indigo-400">
//                 <Bot className="size-3.5 text-indigo-400 mb-1" />
//                 <span>Features</span>
//                 <ChevronDown className="size-3.5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//               </NavigationMenu.Trigger>

//               <NavigationMenu.Content className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#0c0f1d] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
//                 <div className="flex flex-col gap-1">
//                   {FEATURE_ITEMS.map((item) => {
//                     const Icon = item.icon;
//                     const isUpcoming = item.status === "Soon";
//                     return (
//                       <Link
//                         key={item.title}
//                         href={isUpcoming ? "#" : item.href}
//                         className={`group relative flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
//                           isUpcoming
//                             ? "opacity-60 cursor-not-allowed"
//                             : "hover:bg-indigo-500/10 hover:border-indigo-500/20"
//                         }`}
//                       >
//                         <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-indigo-400 transition-colors group-hover:border-indigo-500/30 group-hover:bg-indigo-500/20">
//                           <Icon className="size-4.5" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between">
//                             <span className="text-[13px] font-semibold text-white group-hover:text-indigo-300">
//                               {item.title}
//                             </span>
//                             <span
//                               className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
//                                 item.status === "Ready"
//                                   ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
//                                   : "bg-white/5 text-slate-400 border border-white/10"
//                               }`}
//                             >
//                               {item.status}
//                             </span>
//                           </div>
//                           <p className="mt-0.5 text-[11px] leading-tight text-slate-400">
//                             {item.description}
//                           </p>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </NavigationMenu.Content>
//             </NavigationMenu.Item>

//             {/* General Nav Links */}
//             {MAIN_NAV_ITEMS.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <NavigationMenu.Item key={item.href}>
//                   <NavigationMenu.Link asChild>
//                     <Link
//                       href={item.href}
//                       className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
//                         isActive
//                           ? "bg-white/[0.08] text-indigo-400 font-semibold"
//                           : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
//                       }`}
//                     >
//                       {item.label}
//                     </Link>
//                   </NavigationMenu.Link>
//                 </NavigationMenu.Item>
//               );
//             })}
//           </NavigationMenu.List>
//         </NavigationMenu.Root>

//         {/* Action Buttons */}
//         <div className="flex shrink-0 items-center gap-2">
//           {!user ? (
//             <Link
//               href="/login"
//               className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
//             >
//               Log in
//             </Link>
//           ) : (
//             <Link
//               href={ROUTES.dashboard}
//               className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
//             >
//               Dashboard
//             </Link>
//           )}

//           <Link
//             href={user ? ROUTES.dashboard : ROUTES.register}
//             className="group inline-flex h-9 items-center gap-2 rounded-xl bg-indigo-500 px-4 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
//           >
//             <span>{user ? "Go to App" : "Get started"}</span>
//             <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="ml-1 flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white md:hidden"
//             aria-label="Toggle Navigation Menu"
//           >
//             {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Slide-Over */}
//       {mobileMenuOpen && (
//         <div className="border-b border-white/10 bg-[#080a12] px-6 py-4 md:hidden">
//           <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
//             Features
//           </div>
//           <div className="grid gap-2">
//             {FEATURE_ITEMS.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.title}
//                   href={item.status === "Soon" ? "#" : item.href}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-white/[0.05]"
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <Icon className="size-4 text-indigo-400" />
//                     <span className="text-sm font-medium">{item.title}</span>
//                   </div>
//                   <span className="text-[10px] text-slate-500">{item.status}</span>
//                 </Link>
//               );
//             })}
//           </div>
//           <div className="my-3 h-px bg-white/10" />
//           <div className="grid gap-1">
//             {MAIN_NAV_ITEMS.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/[0.05]"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
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
  { href: ROUTES.pricing, label: "Pricing" },
  { href: ROUTES.about, label: "About" },
];

export default function Navbar() {
  const { data: user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--clay-border)]/80 bg-[var(--clay-bg)]/95 text-[var(--clay-ink)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* Brand */}
        <Link
          href="/"
          aria-label="X Code home"
          className="group flex shrink-0 items-center gap-2.5 outline-none"
        >
          <div className="flex size-10 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-primary)] shadow-[inset_2px_2px_5px_#fff,inset_-2px_-2px_5px_#ecd8c3,3px_4px_0_#ecd8c3] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[var(--clay-coral-shadow)]">
            <Code2
              className="size-5 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2.5}
            />
          </div>

          <span className="text-[21px] font-extrabold tracking-tight text-[var(--clay-ink)] sm:text-[22px]">
            X<span className="text-[var(--clay-primary)]">Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="relative hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">

            {/* Features Dropdown */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group inline-flex items-center gap-2 rounded-xl border border-transparent px-3.5 py-2.5 text-[13px] font-semibold text-[var(--clay-muted)] transition-all duration-200 hover:border-[var(--clay-border)] hover:bg-[var(--clay-surface)] hover:text-[var(--clay-ink)] hover:shadow-[inset_2px_2px_4px_#fff,2px_3px_0_#ecd8c3] data-[state=open]:border-[var(--clay-border)] data-[state=open]:bg-[var(--clay-surface)] data-[state=open]:text-[var(--clay-primary)]">
                <Bot className="size-4 text-[var(--clay-primary)]" />
                <span>Features</span>
                <ChevronDown className="size-3.5 text-[var(--clay-subtle)] transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="absolute left-0 top-full mt-3 w-[340px] rounded-[22px] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-3 shadow-[inset_4px_4px_8px_#fff,8px_10px_0_#ecd8c3,0_18px_35px_rgb(101_70_49/10%)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1.5">
                  {FEATURE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isUpcoming = item.status === "Soon";

                    return (
                      <Link
                        key={item.title}
                        href={isUpcoming ? "#" : item.href}
                        className={`group flex items-start gap-3 rounded-2xl border border-transparent p-3 transition-all duration-200 ${
                          isUpcoming
                            ? "cursor-not-allowed opacity-65"
                            : "hover:border-[var(--clay-border)] hover:bg-[var(--clay-bg)] hover:shadow-[inset_2px_2px_5px_#fff,3px_4px_0_#ecd8c3]"
                        }`}
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-primary)] shadow-[inset_2px_2px_5px_#fff,2px_3px_0_#e5b9a4] transition-transform duration-200 group-hover:scale-105">
                          <Icon className="size-4.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[13px] font-bold text-[var(--clay-ink)] transition-colors group-hover:text-[var(--clay-coral-shadow)]">
                              {item.title}
                            </span>

                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold ${
                                item.status === "Ready"
                                  ? "border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
                                  : "border-[var(--clay-border)] bg-[var(--clay-bg)] text-[var(--clay-subtle)]"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] leading-relaxed text-[var(--clay-muted)]">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* General Links */}
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={`rounded-xl border px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                        isActive
                          ? "border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-coral-shadow)] shadow-[inset_2px_2px_5px_#fff,2px_3px_0_#ecd8c3]"
                          : "border-transparent text-[var(--clay-muted)] hover:border-[var(--clay-border)] hover:bg-[var(--clay-surface)] hover:text-[var(--clay-ink)]"
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
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {!user ? (
            <Link
              href="/login"
              className="hidden rounded-xl px-3 py-2 text-[13px] font-semibold text-[var(--clay-muted)] transition-colors hover:text-[var(--clay-primary)] sm:inline-flex"
            >
              Log in
            </Link>
          ) : (
            <Link
              href={ROUTES.dashboard}
              className="hidden rounded-xl px-3 py-2 text-[13px] font-semibold text-[var(--clay-muted)] transition-colors hover:text-[var(--clay-primary)] sm:inline-flex"
            >
              Dashboard
            </Link>
          )}

          <Link
            href={user ? ROUTES.dashboard : ROUTES.register}
            className="group inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#e8795b] bg-[var(--clay-primary)] px-3 text-[12px] font-bold text-[var(--clay-primary-ink)] shadow-[inset_2px_2px_5px_rgb(255_255_255/45%),0_4px_0_#d86649,0_7px_12px_rgb(216_102_73/12%)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[inset_2px_2px_5px_rgb(255_255_255/45%),0_5px_0_#d86649,0_9px_15px_rgb(216_102_73/15%)] active:translate-y-1 active:shadow-[inset_2px_2px_5px_rgb(255_255_255/45%),0_1px_0_#d86649] sm:px-4 sm:text-[13px]"
          >
            <span>{user ? "Go to App" : "Get started"}</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-1 flex size-10 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-muted)] shadow-[inset_2px_2px_5px_#fff,2px_3px_0_#ecd8c3] transition-all hover:text-[var(--clay-primary)] active:translate-y-0.5 active:shadow-none md:hidden"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--clay-border)] bg-[var(--clay-surface)] px-4 py-5 shadow-[inset_0_4px_8px_rgb(101_70_49/5%)] md:hidden sm:px-8">
          <div className="mb-3 px-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--clay-subtle)]">
            Explore features
          </div>

          <div className="grid gap-2">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isUpcoming = item.status === "Soon";

              return (
                <Link
                  key={item.title}
                  href={isUpcoming ? "#" : item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-bg)] p-3 text-[var(--clay-ink)] shadow-[inset_2px_2px_5px_#fff,2px_3px_0_#ecd8c3] transition-all ${
                    isUpcoming ? "opacity-65" : "active:translate-y-0.5 active:shadow-none"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--clay-surface-warm)] text-[var(--clay-primary)]">
                      <Icon className="size-4" />
                    </div>
                    <span className="truncate text-[13px] font-bold">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold ${
                      item.status === "Ready"
                        ? "border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
                        : "border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-subtle)]"
                    }`}
                  >
                    {item.status}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="my-4 h-px bg-[var(--clay-border)]" />

          <div className="grid grid-cols-2 gap-2">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl border px-3 py-2.5 text-center text-[13px] font-semibold transition-colors ${
                  pathname === item.href
                    ? "border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-coral-shadow)]"
                    : "border-[var(--clay-border)] bg-[var(--clay-bg)] text-[var(--clay-muted)] hover:text-[var(--clay-ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Authentication Link */}
          <Link
            href={user ? ROUTES.dashboard : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] py-3 text-[13px] font-bold text-[var(--clay-ink)] transition-colors hover:text-[var(--clay-primary)]"
          >
            {user ? "Dashboard" : "Log in"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}