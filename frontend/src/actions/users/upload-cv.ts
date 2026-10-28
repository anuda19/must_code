
"use server";

import { api } from "@/lib/api";
import { ApiError } from "@/lib/error";
import type { ActionResponse } from "@/types/action";

export type UploadCvResponse = {
  path: string;
};

export async function uploadCvAction(
  formData: FormData,
): Promise<ActionResponse<UploadCvResponse>> {
  try {
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return {
        success: false,
        data: null,
        error: {
          message: "Please select a valid CV file.",
          code: "INVALID_FILE",
        },
      };
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        data: null,
        error: {
          message: "Please upload a PDF, DOC, or DOCX file.",
          code: "INVALID_FILE_TYPE",
        },
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        data: null,
        error: {
          message: "CV must be smaller than 5 MB.",
          code: "FILE_TOO_LARGE",
        },
      };
    }

    const uploadData = new FormData();
    uploadData.append("file", file, file.name);

    const result = await api.post<UploadCvResponse>(
      "/upload/cv",
      uploadData,
    );

    if (!result?.path) {
      throw new Error("Upload API did not return the CV storage path.");
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
          code: error.code || "CV_UPLOAD_FAILED",
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
            : "Failed to upload CV.",
        code: "CV_UPLOAD_FAILED",
      },
    };
  }
}

export async function getCvSignedUrlAction(
  path: string,
): Promise<ActionResponse<{ signedUrl: string }>> {
  try {
    if (!path) {
      throw new Error("CV path is missing.");
    }

    const result = await api.get<{ signedUrl: string }>(
      `/upload/cv/signed-url?path=${encodeURIComponent(path)}`,
    );

    if (!result?.signedUrl) {
      throw new Error("Could not generate CV URL.");
    }

    return { success: true, data: result, error: null };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        data: null,
        error: {
          message: error.message,
          code: error.code || "CV_URL_FAILED",
          details: error.details,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Could not open CV.",
        code: "CV_URL_FAILED",
      },
    };
  }
}