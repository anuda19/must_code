export type ActionResponse<T> = {
  success: boolean;
  data: T | null;
  error: {
    details?: Record<string, string[]> | null;
    message: string;
    code?: string;
  } | null;
};