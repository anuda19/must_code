export type InterviewQuestionEvaluation = {
  score: number;
  question: string;
  candidateAnswer: string;
  suggestedAnswer: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
};

export type InterviewEvaluationStatus =
  | "NOT_STARTED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "INSUFFICIENT_DATA";

export type InterviewEvaluation = {
  id: string;
  transcriptId: string;
  userId: string;
  status: "COMPLETED" | "PROCESSING" | "FAILED" | "INSUFFICIENT_DATA";
  overallScore: number | null;
  grade: string | null;
  technicalAccuracy: number | null;
  problemSolving: number | null;
  communication: number | null;
  relevance: number | null;
  depthOfKnowledge: number | null;
  model: string;
  evaluatedAt: string | null;
  createdAt: string;
  errorMessage: string | null;
  transcript?: {
    clientSessionId?: string;
    startedAt?: string | null;
    endedAt?: string | null;
    durationSeconds?: number | null;
    transcriptText?: string | null;
    messages?: unknown;
  } | null;
  report: {
    summary: string;
    questions: InterviewQuestionEvaluation[];
    strengths: string[];
    actionPlan: string[];
    improvements: string[];
    dimensions: {
      relevance: number;
      communication: number;
      problemSolving: number;
      depthOfKnowledge: number;
      technicalAccuracy: number;
    };
  } | null;
};

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

export type EvaluationStatus =
  | "idle"
  | "evaluating"
  | "completed"
  | "insufficient"
  | "failed";

export type EvaluationResponse = {
  success: boolean;
  data: {
    success: boolean;
    data: InterviewEvaluation | null;
    status: InterviewEvaluation["status"];
    message?: string;
  };
  error?: string | null;
};

export type EvaluationListResponse = {
  items: InterviewEvaluation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
