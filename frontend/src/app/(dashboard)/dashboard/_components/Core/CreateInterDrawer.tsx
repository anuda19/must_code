"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Sparkles, BriefcaseBusiness, Settings2, Save } from "lucide-react";

import { TechStackInput } from "./TechStackSelect";
import { ExperienceLevelSelect } from "./ExperienceLevel";
import { Label } from "@/app/components/ui/Label";
import { toast } from "@/components/ui/toast";
import { userProfileSchema } from "@/lib/schema/user-profile.schema";
import { FieldError } from "@/app/components/ui/ErrorMsg";
import { Interview } from "@/app/(dashboard)/interview/_components/Interview";
import { Input } from "@/app/components/ui/TextInput";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { hasProfileChanges } from "@/lib/normalize-profile";
import { updateUserProfileAction } from "@/actions/users/user-profile";
import { CvUpload } from "./CvUpload";
import { extractCvText } from "@/lib/extract-cv";
import { UserProfileData } from "@/types/user-profile-types";
import { JobRoleSelect } from "./RoleSelect";

type FormErrors = Partial<Record<keyof UserProfileData, string>>;

interface CreateInterviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: UserProfileData;
}

export function CreateInterviewDrawer({
  isOpen,
  onClose,
  initialData,
}: CreateInterviewDrawerProps) {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [errorMsg, setErrorMsg] = useState<FormErrors>({});
  const [formData, setFormData] = useState<UserProfileData>({
    jobRole: initialData?.jobRole ?? "",
    experienceLevel: initialData?.experienceLevel ?? "MID_LEVEL",
    skills: initialData?.skills ?? [],
    targetCompany: initialData?.targetCompany ?? "",
    jobDescription: initialData?.jobDescription ?? "",
    cvUrl: initialData?.cvUrl ?? "",
    cvText: initialData?.cvText ?? "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { data: user, isPending, isError } = useUser();
  const profile = user?.profile;
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const isDirty = hasProfileChanges(formData, profile);
  const canSave = isDirty && !isPending;

  const updateField = <K extends keyof UserProfileData>(
    field: K,
    value: UserProfileData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDirty || isPending) return;

    setStatus("loading");
    setErrorMsg({});

    try {
      const validate = userProfileSchema.safeParse(formData);

      if (!validate.success) {
        const fieldErrors: FormErrors = {};

        validate.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof UserProfileData;

          if (field && !fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        });

        setErrorMsg(fieldErrors);
        return;
      }

      let cvText = formData.cvText ?? "";

      if (!formData.cvUrl) {
        cvText = "";
      } else if (cvFile) {
        cvText = await extractCvText(cvFile);

        if (!cvText) {
          throw new Error(
            "No readable text found in the CV. Please upload a text-based PDF or DOCX.",
          );
        }
      }

      const result = await updateUserProfileAction({
        jobRole: validate.data.jobRole,
        experienceLevel: validate.data.experienceLevel,
        skills: validate.data.skills,
        targetCompany: validate.data.targetCompany || null,
        cvUrl: formData.cvUrl || null,
        cvText: cvText || null,
      });

      if (!result.success) {
        toast.add({
          title: "Error",
          description: result.error?.message || "Failed to update profile.",
          type: "error",
        });
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setCvFile(null);

      setIsEditing(false);

      toast.add({
        title: "Profile Updated",
        description: "Your profile changes have been saved successfully.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving your profile.",
        type: "error",
      });
    } finally {
      setStatus("idle");
    }
  };

  const isDisabled = status !== "idle";

  useEffect(() => {
    if (!profile) return;

    setFormData({
      jobRole: profile.jobRole ?? "",
      experienceLevel: profile.experienceLevel ?? "MID_LEVEL",
      skills: profile.skills ?? [],
      targetCompany: profile.targetCompany ?? "",
      jobDescription: initialData?.jobDescription ?? "",
      cvUrl: profile.cvUrl ?? initialData?.cvUrl ?? "",
      cvText: profile.cvText ?? "",
    });
  }, [profile, initialData?.jobDescription, initialData?.cvUrl]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && status === "idle") {
          onClose();
          setIsEditing(false);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[var(--clay-ink)]/35 backdrop-blur-md data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />

        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] shadow-[-18px_0_60px_rgba(101,70,49,0.16)] focus:outline-none data-[state=open]:animate-slideInRight data-[state=closed]:animate-slideOutRight">
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden border-b border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-5 pb-5 pt-6 sm:px-7">
            <div className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full bg-[var(--clay-peach)]/55 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div>
                  <Dialog.Title className="text-lg font-bold tracking-tight text-[var(--clay-ink)]">
                    {isEditing ? "Setup AI Interview" : "Choose Your Interview"}
                  </Dialog.Title>

                  <Dialog.Description className="mt-1 max-w-sm text-xs leading-5 text-[var(--clay-muted)]">
                    {isEditing
                      ? " Configure the interview based on your role, experience and target company."
                      : "Choose the right path to crack your next interview."}
                  </Dialog.Description>
                </div>
              </div>

              <Dialog.Close asChild disabled={isDisabled}>
                <button
                  type="button"
                  className="grid size-9 shrink-0 place-items-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-muted)] shadow-[0_3px_0_var(--clay-border)] transition-all hover:bg-[var(--clay-peach)] hover:text-[var(--clay-ink)] active:translate-y-0.5 active:shadow-none disabled:opacity-30"
                  aria-label="Close drawer"
                >
                  <X className="size-4" />
                </button>
              </Dialog.Close>
            </div>
            {isEditing && (
              <div className="relative mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--clay-sage-ink)]">
                <span className="size-2 rounded-full bg-[var(--clay-status)]" />
                Personalize your interview workspace
              </div>
            )}
          </div>

          {isPending ? (
            <div className="flex flex-1 items-center justify-center text-sm text-[var(--clay-muted)]">
              Loading your profile...
            </div>
          ) : isError ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-sm text-[var(--clay-muted)]">
              <div className="grid size-12 place-items-center rounded-2xl bg-[var(--clay-surface-warm)]">
                <Settings2 className="size-5 text-[var(--clay-subtle)]" />
              </div>

              <p>Unable to load your profile.</p>

              <button
                type="button"
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["user"] })
                }
                className="rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] px-4 py-2 text-xs font-semibold text-[var(--clay-primary-ink)] shadow-[0_3px_0_var(--clay-coral-shadow)] transition hover:brightness-105 active:translate-y-0.5 active:shadow-none"
              >
                Try again
              </button>
            </div>
          ) : profile && !isEditing ? (
            <Interview onEditProfile={() => setIsEditing(true)} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="drawer-scrollbar mt-5 flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-0 sm:px-7"
            >
              <div className="space-y-6 pb-5">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded-lg bg-[var(--clay-blue)] text-[var(--clay-blue-ink)]">
                      <BriefcaseBusiness className="size-3.5" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--clay-ink)]">
                      Your profile
                    </p>
                  </div>

                  <div>
                    <CvUpload
                      value={formData.cvUrl ?? ""}
                      onChange={(path) => updateField("cvUrl", path)}
                      onFileSelected={setCvFile}
                      disabled={isDisabled}
                    />
                    <FieldError message={errorMsg?.cvUrl} />
                  </div>
                </div>

                <div className="h-px bg-[var(--clay-border)]" />

                <div>
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--clay-ink)]">
                      Interview preferences
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--clay-subtle)]">
                      Help tailor your technical questions to your experience.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label
                        required
                        htmlFor="job-role"
                        className="mb-1.5 block text-xs font-semibold text-[var(--clay-ink)]"
                      >
                        Job Role
                      </Label>

                      <JobRoleSelect
                        value={formData.jobRole}
                        onChange={(val) => updateField("jobRole", val)}
                        disabled={isDisabled}
                        placeholder="e.g. Frontend Engineer"
                      />

                      <FieldError message={errorMsg?.jobRole} />
                    </div>

                    <div>
                      <Label
                        required
                        htmlFor="experience-level"
                        className="mb-1.5 block text-xs font-semibold text-[var(--clay-ink)]"
                      >
                        Experience Level
                      </Label>

                      <ExperienceLevelSelect
                        value={formData.experienceLevel}
                        onChange={(value) =>
                          updateField("experienceLevel", value)
                        }
                        disabled={isDisabled}
                      />

                      <FieldError message={errorMsg?.experienceLevel} />
                    </div>

                    <div>
                      <Label
                        required
                        htmlFor="tech-stack"
                        className="mb-1.5 block text-xs font-semibold text-[var(--clay-ink)]"
                      >
                        Skills / Tech Stack
                      </Label>

                      <TechStackInput
                        value={formData.skills}
                        onChange={(value) => updateField("skills", value)}
                        selectedRole={formData.jobRole}
                      />

                      <FieldError message={errorMsg?.skills} />
                    </div>

                    <div>
                      <Label
                        htmlFor="target-company"
                        className="mb-1.5 block text-xs font-semibold text-[var(--clay-ink)]"
                      >
                        Target Company{" "}
                        <span className="font-normal text-[var(--clay-subtle)]">
                          (Optional)
                        </span>
                      </Label>

                      <Input
                        id="target-company"
                        value={formData.targetCompany ?? ""}
                        onChange={(e) =>
                          updateField("targetCompany", e.target.value)
                        }
                        disabled={isDisabled}
                        placeholder="e.g. Google, Amazon, Microsoft"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Description remains intentionally unchanged and disabled in the UI. */}
                {/* <div>
                  <Label
                    htmlFor="job-description"
                    className="mb-1 block text-xs font-medium text-[var(--clay-ink)]"
                  >
                    Job Description (Optional)
                  </Label>

                  <textarea
                    id="job-description"
                    value={formData.jobDescription}
                    onChange={(e) =>
                      updateField("jobDescription", e.target.value)
                    }
                    disabled={isDisabled}
                    rows={4}
                    placeholder="Paste the job description to tailor the interview to the role..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-3.5 py-3 text-sm text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] outline-none transition focus:border-[var(--clay-primary)] focus:ring-4 focus:ring-[var(--clay-primary)]/10 disabled:cursor-not-allowed disabled:opacity-50 clay-inset"
                  />

                  <p className="mt-1.5 text-[11px] text-[var(--clay-subtle)]">
                    AI will use this to prioritize relevant skills,
                    responsibilities and interview questions.
                  </p>
                </div> */}
              </div>

              {/* Sticky footer */}
              <div className="sticky bottom-0 -mx-5 mt-auto border-t border-[var(--clay-border)] bg-[var(--clay-surface)] px-5 pb-5 pt-4 sm:-mx-7 sm:px-7">
                <button
                  type="submit"
                  disabled={
                    isDisabled || formData.skills.length === 0 || !canSave
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-primary)] px-4 py-3.5 text-sm font-bold text-[var(--clay-primary-ink)] shadow-[inset_3px_3px_7px_rgba(255,255,255,0.45),0_5px_0_var(--clay-coral-shadow),0_10px_18px_rgba(216,102,73,0.12)] transition-all hover:brightness-105 active:translate-y-1 active:shadow-[inset_3px_3px_7px_rgba(255,255,255,0.45),0_1px_0_var(--clay-coral-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  {status === "idle" ? (
                    <>
                      <Save className="size-4" />
                      Save Profile
                    </>
                  ) : (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-[var(--clay-primary-ink)]/30 border-t-[var(--clay-primary-ink)]" />
                      Preparing Workspace...
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
