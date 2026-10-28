import { z } from "zod";

export const userProfileSchema = z.object({
  jobRole: z.string().min(1, "Job role is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  targetCompany: z.string().optional(),
  cvUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type JobFormValues = z.infer<typeof userProfileSchema>;