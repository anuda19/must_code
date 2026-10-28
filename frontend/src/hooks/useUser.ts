// src/hooks/useUser.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import type { ActionResponse } from "@/types/action";

export type User = {
  id: string;
  name: string;
  email: string;
  profile: {
    id: string;
    experienceLevel: string;
    jobRole: string;
    targetCompany: string | null;
    skills: string[];
    bio: string | null;
    location: string | null;
    avatarUrl: string | null;
    cvUrl: string | null;
    cvFileName: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

async function fetchUser(): Promise<User> {
  const response = await fetch("/api/user", {
    method: "GET",
    credentials: "same-origin",
  });

  const result: ActionResponse<User> = await response.json();
  
  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.error?.message ?? "Failed to fetch user");
  }

  return result.data;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // Cache as fresh for 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
}