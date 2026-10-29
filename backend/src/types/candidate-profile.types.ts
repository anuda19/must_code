export interface CandidateProfile {
  experienceLevel: string;
  jobRole: string;
  targetCompany: string | null;
  skills: string[];
  bio: string | null;
  location: string | null;
  cvUrl: string | null;
  cvText: string | null;
  avatarUrl: string | null;
}