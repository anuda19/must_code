// // components/LogoutButton.tsx
// 'use client';

// import { useTransition } from 'react';
// import { logoutAction } from '@/actions/auth/auth';
// import { Loader2, LogOut, LogOutIcon } from 'lucide-react';

// export function LogoutButton() {
//   const [isPending, startTransition] = useTransition();
  
//   const handleLogout = () => {
//     startTransition(async () => {
//       await logoutAction();
//       // 2. Hard navigate to login page to clear any client route cache
//       window.location.href = '/login';
//     });
//   };

//   return (
//     <button 
//       onClick={handleLogout} 
//       disabled={isPending}
//       title="Log out"
//       className="px-4 py-2 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white rounded hover:bg-red-700 disabled:opacity-50"
//     >
//       {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOutIcon className="mr-2 h-4 w-4" />}
//     </button>
//   );
// }
'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/actions/auth/auth';
import { Loader2, LogOut } from 'lucide-react';

interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export function LogoutButton({ isCollapsed = false }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  
  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      window.location.href = '/login';
    });
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isPending}
      title="Log out"
      aria-label="Log out of account"
      className={`group relative flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 font-medium text-rose-300 shadow-lg shadow-rose-950/20 transition-all duration-300 hover:border-rose-500/40 hover:bg-rose-500/20 hover:text-rose-200 hover:shadow-rose-950/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
        isCollapsed ? "h-11 w-11 justify-center p-0" : "w-full px-3.5 py-2.5 text-sm"
      }`}
    >
      {isPending ? (
        <Loader2 className="size-4 shrink-0 animate-spin text-rose-400" />
      ) : (
        <LogOut className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}

      <span
        aria-hidden={isCollapsed}
        className={`overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200 ${
          isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-32 opacity-100"
        }`}
      >
        {isPending ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}