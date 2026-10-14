// components/LogoutButton.tsx
'use client';

import { useTransition } from 'react';
import { useUser } from '../providers/AuthProvider';
import { logoutAction } from '@/actions/auth/auth';
import { Loader2, LogOut, LogOutIcon } from 'lucide-react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const { setUser } = useUser();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      
      // 1. Reset client-side auth context state
      setUser(null);

      // 2. Hard navigate to login page to clear any client route cache
      window.location.href = '/login';
    });
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isPending}
      title="Log out"
      className="px-4 py-2 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOutIcon className="mr-2 h-4 w-4" />}
    </button>
  );
}