"use server";

import { api } from "@/lib/api";
import { UserProfileData } from "@/types/user-profile-types";
export interface TokenResponse {
  token: string;
  roomName: string;
  serverUrl: string;
}

export async function startInterviewAction(profile: UserProfileData) {
  try {
    const response = await api.post<TokenResponse>(
      "/api/livekit/token",
      { profile },
    );

    if (
      !response.token ||
      !response.roomName ||
      !response.serverUrl?.startsWith("wss://")
    ) {
      throw new Error("Invalid LiveKit token response from backend.");
    }

    return {
      success: true as const,
      data: response,
    };
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Failed to start interview.",
    };
  }
}