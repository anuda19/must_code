// // components/providers/AuthProvider.tsx
// 'use client';

// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   role?: string;
//   [key: string]: any;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
//   refetchUser: () => Promise<void>;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUser = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Calls NestJS /api/user endpoint
//       const userData = await fetch('/api/user').then(res => res.json()).then(data => {
//         if (!data.success) {
//           throw new Error(data.error?.message || 'Failed to fetch user profile');
//         }
//         return data.data;
//       });
//       setUser(userData);
//     } catch (err: any) {
//       setUser(null);
//       setError(err.message || 'Failed to load user profile');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Fetch only ONCE when provider mounts
//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         error,
//         refetchUser: fetchUser,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to consume the User state anywhere in Client Components
// export function useUser() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useUser must be used within an AuthProvider');
//   }
//   return context;
// }


// components/providers/AuthProvider.tsx
"use client";

import { apiClient } from "@/lib/api.client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";


export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      /**
       * apiClient handles:
       *
       * 401
       *   ↓
       * refresh token
       *   ↓
       * retry request
       *   ↓
       * refresh failed
       *   ↓
       * redirect /login
       */
      const response = await apiClient.get<{
        success: boolean;
        data: User | null;
        error: {
          message: string;
          code: string;
          details?: Record<string, string[]> | null;
        } | null;
      }>("/api/user");

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message ||
            "Failed to fetch user profile"
        );
      }

      setUser(response.data);
    } catch (err: unknown) {
      setUser(null);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load user profile");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        refetchUser: fetchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useUser must be used within an AuthProvider"
    );
  }

  return context;
}
