"use server";

import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import type { ActionResponse } from "@/types/action";

export type UserProfilePayload = {
  jobRole: string;
  experienceLevel: string;
  skills: string[];
  targetCompany?: string;
};

export type UserProfileResponse = {
  id: string;
  jobRole: string;
  experienceLevel: string;
  skills: string[];
  targetCompany?: string | null;
  updatedAt: string;
};

export async function updateUserProfileAction(
  payload: UserProfilePayload
): Promise<ActionResponse<UserProfileResponse>> {
  try {
    const updatedProfile = await api.patch<UserProfileResponse>("/users/user-profile", {
      jobRole: payload.jobRole,
      experienceLevel: payload.experienceLevel,
      skills: payload.skills,
      targetCompany: payload.targetCompany || null,
    });

    return {
      success: true,
      data: updatedProfile,
      error: null,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        data: null,
        error: {
          message: error.message,
          code: error.code || "PROFILE_UPDATE_FAILED",
          details: error.details,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        message: "Failed to update profile",
        code: "INTERNAL_ERROR",
      },
    };
  }
}