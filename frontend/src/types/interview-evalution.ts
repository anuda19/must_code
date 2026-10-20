
export type InterviewQuestionEvaluation = {
  score: number;
  question: string;
  candidateAnswer: string;
  suggestedAnswer: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
};

export type InterviewEvaluation = {
  id: string;
  transcriptId: string;
  userId: string;
  status: string;
  overallScore: number;
  grade: string;
  technicalAccuracy: number;
  problemSolving: number;
  communication: number;
  relevance: number;
  depthOfKnowledge: number;
  model: string;
  evaluatedAt: string;
  createdAt: string;
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
  };
};