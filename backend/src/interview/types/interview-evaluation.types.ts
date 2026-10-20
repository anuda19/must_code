export interface InterviewEvaluationReport {
  summary: string;

  dimensions: {
    technicalAccuracy: number;
    problemSolving: number;
    communication: number;
    relevance: number;
    depthOfKnowledge: number;
  };

  questions: Array<{
    question: string;
    candidateAnswer: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
    feedback: string;
    suggestedAnswer: string;
  }>;

  strengths: string[];
  improvements: string[];
  actionPlan: string[];
}