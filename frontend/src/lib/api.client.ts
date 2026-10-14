import { ApiError } from "./error";

let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

const redirectToLogin = () => {
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.startsWith("/login")
  ) {
    window.location.replace("/login");
  }
};

async function clientFetch<T>(
  endpoint: string,
  isRetry = false,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      }).then(() => clientFetch<T>(endpoint, true, options));
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch("/api/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        throw new ApiError("Session expired", 401, null, "UNAUTHORIZED");
      }

      processQueue();

      return clientFetch<T>(endpoint, true, options);
    } catch (error) {
      processQueue(error);

      redirectToLogin();

      throw error;
    } finally {
      isRefreshing = false;
    }
  }

  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      responseData.message ||
        responseData.error?.message ||
        `Request failed (${res.status})`,
      res.status,
      responseData.details || responseData.error?.details || null,
      responseData.code || responseData.error?.code || `HTTP_${res.status}`,
    );
  }

  return responseData as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    clientFetch<T>(endpoint, false, {
      ...options,
      method: "GET",
    }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    clientFetch<T>(endpoint, false, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    clientFetch<T>(endpoint, false, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    clientFetch<T>(endpoint, false, {
      ...options,
      method: "DELETE",
    }),
};
