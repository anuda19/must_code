// // // lib/api.ts
// import { cookies } from "next/headers";
// import { ApiError } from "./error";
// import { API_BASE_URL } from "./constants";

// async function apiFetch<T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;

//   const res = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...options.headers,
//     },
//   });

//   const responseData = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     // Extract standard NestJS error response formats
//     throw new ApiError(
//       responseData.message || `Request failed with status ${res.status}`,
//       res.status,
//       responseData.details || null,
//       responseData.code || `HTTP_${res.status}`,
//     );
//   }

//   return responseData as T;
// }

// export const api = {
//   get: <T>(endpoint: string, options?: RequestInit) =>
//     apiFetch<T>(endpoint, { ...options, method: "GET" }),

//   post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
//     apiFetch<T>(endpoint, {
//       ...options,
//       method: "POST",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
//     apiFetch<T>(endpoint, {
//       ...options,
//       method: "PUT",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
//     apiFetch<T>(endpoint, {
//       ...options,
//       method: "PATCH",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   delete: <T>(endpoint: string, options?: RequestInit) =>
//     apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
// };

import { cookies } from "next/headers";
import { ApiError } from "./error";
import { API_BASE_URL } from "./constants";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const sendRequest = (token?: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

  let res = await sendRequest(accessToken);
  let newAccessToken: string | undefined;

  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    const refreshData = await refreshRes.json().catch(() => null);

    if (!refreshRes.ok || !refreshData?.accessToken) {
      console.error("[Auth Refresh] Backend rejected refresh:", {
        status: refreshRes.status,
        message: refreshData?.message,
        error: refreshData?.error,
      });

      throw new ApiError(
        refreshData?.message || "Session expired. Please log in again.",
        refreshRes.status || 401,
        null,
        "UNAUTHORIZED",
      );
    }

    newAccessToken = refreshData.accessToken;

    // Persist rotated tokens so the browser doesn't keep a revoked refresh token.
    cookieStore.set("accessToken", refreshData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    if (refreshData.refreshToken) {
      cookieStore.set("refreshToken", refreshData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    // Retry the original request once.
    res = await sendRequest(newAccessToken);
  }

  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      responseData.message ||
        responseData.error?.message ||
        `Request failed with status ${res.status}`,
      res.status,
      responseData.details || responseData.error?.details || null,
      responseData.code || responseData.error?.code || `HTTP_${res.status}`,
    );
  }

  return responseData as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};
