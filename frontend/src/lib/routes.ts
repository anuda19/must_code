export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",

  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  mock_interview: {
    base_url: "/interview/mock-interviews",
    evaluation: "/interview/mock-interviews/evaluation",
    evaluationId: (evaluationId: string) =>
      `/interview/mock-interviews/evaluation/${evaluationId}`,
  },
  technical_assesment: "/interview/technical-assessment",

  profile: "/profile",
  privacy: "/privacy",
  terms: "/terms",
  about: "/about",
  settings: "/settings",
  user_faq: "/user-faq",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.login,
  ROUTES.register,
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.about,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
] as const;

export const AUTH_ONLY_ROUTES = [
  ROUTES.login,
  ROUTES.register,
] as const;