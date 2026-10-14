
export type InterviewStatus =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "error"
  | "ended"
  | "ready";

export type TranscriptMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: Date;
};
