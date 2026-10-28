import { api } from "@/lib/api";

export type UpdateProfileInput = {
  jobRole?: string;
  experienceLevel?: string;
  targetCompany?: string;
  skills?: string[];
  bio?: string;
  location?: string;
  avatar?: File | null;
  cv?: File | null;
};

export async function updateUserProfile(input: UpdateProfileInput) {
  const formData = new FormData();

  if (input.jobRole !== undefined) {
    formData.append('jobRole', input.jobRole);
  }

  if (input.experienceLevel !== undefined) {
    formData.append('experienceLevel', input.experienceLevel);
  }

  if (input.targetCompany !== undefined) {
    formData.append('targetCompany', input.targetCompany);
  }

  if (input.skills !== undefined) {
    formData.append('skills', JSON.stringify(input.skills));
  }

  if (input.bio !== undefined) {
    formData.append('bio', input.bio);
  }

  if (input.location !== undefined) {
    formData.append('location', input.location);
  }

  if (input.avatar) {
    formData.append('avatar', input.avatar);
  }

  if (input.cv) {
    formData.append('cv', input.cv);
  }

  // Use your existing authenticated API client.
  // Do not manually set Content-Type for FormData.
  const response = await api.patch('/user-profile', formData);

  return response;
}