// lib/handle-action.ts
import { ActionResponse } from "@/types/action";
import { ZodError } from "zod";
import { ApiError } from "./error";

export async function handleAction<T>(
  actionFn: () => Promise<T>,
): Promise<ActionResponse<T>> {
  try {
    const data = await actionFn();
    return {
      success: true,
      data,
      error: null,
    };
  } catch (err: unknown) {
    // 1. Zod client/server validation errors
    if (err instanceof ZodError) {
      return {
        success: false,
        data: null,
        error: {
          message: "Validation failed",
          details: err.flatten().fieldErrors as Record<string, string[]>,
        },
      };
    }

    // 2. NestJS Backend API errors
    if (err instanceof ApiError) {
      return {
        success: false,
        data: null,
        error: {
          message: err.message,
          details: err.details || null,
          code: err.code,
        },
      };
    }

    // 3. Fallback for unknown runtime exceptions
    const fallbackMessage = err instanceof Error ? err.message : "Something went wrong";
    return {
      success: false,
      data: null,
      error: {
        message: fallbackMessage,
        details: null,
      },
    };
  }
}