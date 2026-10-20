
import type { TranscriptMessage } from "@/types/interview-types";

export type TranscriptEvent = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: string;
};

export type LocalInterviewSession = {
  sessionId: string;
  model: string;
  startedAt: string;
  endedAt: string | null;
  status: "recording" | "pending_upload";
  messages: TranscriptMessage[];
  events: TranscriptEvent[];
};

const STORAGE_PREFIX = "mock-interview-session:";

function storageKey(sessionId: string) {
  return `${STORAGE_PREFIX}${sessionId}`;
}

export function createLocalInterview(
  sessionId: string,
  model: string,
): LocalInterviewSession {
  return {
    sessionId,
    model,
    startedAt: new Date().toISOString(),
    endedAt: null,
    status: "recording",
    messages: [],
    events: [],
  };
}

export function writeLocalInterview(
  session: LocalInterviewSession,
): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    storageKey(session.sessionId),
    JSON.stringify(session),
  );
}

export function readLocalInterview(
  sessionId: string,
): LocalInterviewSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey(sessionId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as LocalInterviewSession;
  } catch {
    // Preserve corrupted data for diagnosis/recovery.
    throw new Error(
      `Could not parse the locally saved interview ${sessionId}.`,
    );
  }
}

export function markInterviewPending(
  session: LocalInterviewSession,
): LocalInterviewSession {
  const pending: LocalInterviewSession = {
    ...session,
    status: "pending_upload",
    endedAt: session.endedAt ?? new Date().toISOString(),
  };

  writeLocalInterview(pending);
  return pending;
}

export function deleteLocalInterview(sessionId: string): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(storageKey(sessionId));
}

export function listPendingInterviews(): LocalInterviewSession[] {
  if (typeof window === "undefined") return [];

  const sessions: LocalInterviewSession[] = [];

  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);

    if (!key?.startsWith(STORAGE_PREFIX)) continue;

    const raw = window.localStorage.getItem(key);
    if (!raw) continue;

    try {
      const session = JSON.parse(raw) as LocalInterviewSession;

      if (session.status === "pending_upload") {
        sessions.push(session);
      }
    } catch {
      // Leave invalid data untouched rather than deleting it.
    }
  }

  return sessions;
}