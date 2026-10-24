
export type ProfileFormValues = {
  jobRole: string;
  experienceLevel: string;
  targetCompany: string;
  skills: string[];
  bio: string;
  location: string;
};

type ProfileInput = {
  jobRole?: string | null;
  experienceLevel?: string | null;
  targetCompany?: string | null;
  skills?: string[] | null;
  bio?: string | null;
  location?: string | null;
};

export function normalizeProfile(
  profile: ProfileInput | null | undefined,
): ProfileFormValues {
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
    bio: profile?.bio?.trim() ?? "",
    location: profile?.location?.trim() ?? "",
  };
}

export function hasProfileChanges(
  current: ProfileInput,
  original: ProfileInput | null | undefined,
): boolean {
  return (
    JSON.stringify(normalizeProfile(current)) !==
    JSON.stringify(normalizeProfile(original))
  );
}
