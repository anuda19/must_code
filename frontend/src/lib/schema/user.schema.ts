// schemas/user.schema.ts
import { z } from 'zod';

export const createInterviewSchema = z.object({
  jobRole: z
    .string({ message: 'Job role is required' })
    .min(2, 'Job role must be at least 2 characters'),

  experienceLevel: z
    .string({ message: 'Experience level is required' })
    .min(1, 'Experience level is required'),

  skills: z
    .array(z.string({ message: 'Each skill must be a string' }))
    .min(1, 'At least one skill is required to generate interview questions'),

  targetCompany: z.string().optional().default(''),
  jobDescription: z.string().optional().default(''),
});

export type InterviewFormData = z.infer<typeof createInterviewSchema>;