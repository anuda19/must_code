export interface SaveTranscriptInput {
  sessionId: string;
  model: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  messages: unknown[];
  events?: unknown[];
  transcriptText: string;
}