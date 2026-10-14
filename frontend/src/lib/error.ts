// lib/errors.ts
export class ApiError extends Error {
  public status: number;
  public details?: Record<string, string[]> | null;
  public code?: string;

  constructor(message: string, status: number, details?: Record<string, string[]> | null, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.code = code;
  }
}