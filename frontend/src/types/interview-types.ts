
// ============================================
// Interview session
// ============================================

export type InterviewPhase =
  | "ready"
  | "connecting"
  | "live"
  | "evaluating"
  | "result";

export type InterviewRoom = {
  token: string;
  roomName: string;
  serverUrl: string;
};

// ============================================
// Live interview status
// ============================================

export type InterviewStatus =
  | "ready"
  | "listening"
  | "speaking"
  | "error"
  | "ended";

// ============================================
// Transcript
// ============================================

export type TranscriptItem = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: number;
};

export type TranscriptMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: Date;
};

// ============================================
// Evaluation
// ============================================

export type EvaluationStatus =
  | "NOT_STARTED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "INSUFFICIENT_DATA";

export type InterviewQuestionEvaluation = {
  score: number;
  question: string;
  candidateAnswer: string;
  suggestedAnswer: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
};

export type EvaluationDimensions = {
  technicalAccuracy: number;
  problemSolving: number;
  communication: number;
  relevance: number;
  depthOfKnowledge: number;
};

export type InterviewEvaluationReport = {
  summary: string;
  questions: InterviewQuestionEvaluation[];
  strengths: string[];
  actionPlan: string[];
  improvements: string[];
  dimensions: EvaluationDimensions;
};

export type InterviewEvaluation = {
  id: string;
  transcriptId: string;
  userId: string;

  status: EvaluationStatus;

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

  report: InterviewEvaluationReport | null;
};

// ============================================
// API inputs and responses
// ============================================

export type SaveTranscriptInput = {
  sessionId: string;
  model: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  messages: TranscriptItem[];
  events?: unknown[];
  transcriptText: string;
};

// export type EvaluationResponse = {
//   success: boolean;
//   data: {
//     success: boolean;
//     data: InterviewEvaluation | null;
//     status: EvaluationStatus;
//     message?: string;
//   };
//   error?: string | null;
// };

export type EvaluationResponse = {
  success: boolean;
  data: InterviewEvaluation | null;
  status: EvaluationStatus;
  message?: string;
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