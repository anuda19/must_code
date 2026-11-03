
"use server";

import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import type { ActionResponse } from "@/types/action";

export type UploadAvatarResponse = {
  path: string;
  url: string;
};

export async function uploadAvatarAction(
  formData: FormData,
): Promise<ActionResponse<UploadAvatarResponse>> {
  try {
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return {
        success: false,
        data: null,
        error: {
          message: "Please select an image.",
          code: "INVALID_FILE",
        },
      };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        data: null,
        error: {
          message: "Please upload a JPG, PNG, or WebP image.",
          code: "INVALID_FILE_TYPE",
        },
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        data: null,
        error: {
          message: "Profile picture must be smaller than 5 MB.",
          code: "FILE_TOO_LARGE",
        },
      };
    }

    const uploadData = new FormData();
    uploadData.append("file", file, file.name);

    const result = await api.post<UploadAvatarResponse>(
      "/upload/avatar",
      uploadData,
    );

    if (!result?.url || !result?.path) {
      throw new Error("Upload API did not return the avatar URL.");
    }

    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        data: null,
        error: {
          message: error.message,
          code: error.code || "AVATAR_UPLOAD_FAILED",
          details: error.details,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Failed to upload profile picture.",
        code: "AVATAR_UPLOAD_FAILED",
      },
    };
  }
}