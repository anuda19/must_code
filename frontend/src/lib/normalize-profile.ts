import { UserProfileData } from "@/types/user-profile-types";

export function normalizeProfile(
  profile: UserProfileData | null | undefined,
): UserProfileData {
  return {
    jobRole: profile?.jobRole?.trim() ?? "",
    experienceLevel: profile?.experienceLevel?.trim() ?? "",
    targetCompany: profile?.targetCompany?.trim() ?? "",
    skills: [
      ...new Set(
        (profile?.skills ?? [])
          .map((skill) => skill.trim())
          .filter(Boolean),
      ),
    ].sort(),
    cvUrl: profile?.cvUrl ?? "",
    bio: profile?.bio?.trim() ?? "",
    location: profile?.location?.trim() ?? "",
  };
}

export function hasProfileChanges(
  current: UserProfileData,
  original: UserProfileData | null | undefined,
): boolean {
  return (
    JSON.stringify(normalizeProfile(current)) !==
    JSON.stringify(normalizeProfile(original))
  );
}
