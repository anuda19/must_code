export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",

  mock_interview: {
    base_url: "/interview/mock-interviews",
    evaluation: "/interview/mock-interviews/evaluation",
    evaluationId: (evaluationId: string) =>
      `/interview/mock-interviews/evaluation/${evaluationId}`,
  },
  technical_assesment: "/interview/technical-assessments",

  profile: "/profile",
  settings: "/settings",
} as const;
