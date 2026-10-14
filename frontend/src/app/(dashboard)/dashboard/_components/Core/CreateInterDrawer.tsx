"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

import { TechStackInput } from "./TechStackSelect";
import { CompanySelect } from "./CompanySelect";
import { RoleSelect } from "./JobRoleSelect";
import { ExperienceLevelSelect } from "./ExperienceLevel";
import { Label } from "@/app/components/ui/Label";
import { updateUserProfileAction } from "@/actions/users/user-profile";
import { toast } from "@/components/ui/toast";
import { userProfileSchema } from "@/lib/schema/user-profile.schema";
import { FieldError } from "@/app/components/ui/ErrorMsg";
import { useRouter } from "next/navigation";
import { Interview } from "@/app/(dashboard)/interview/_components/Interview";

type FormErrors = Partial<Record<keyof UserProfileData, string>>;
interface CreateInterviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    jobRole?: string;
    experienceLevel?: string;
    skills?: string[];
    targetCompany?: string;
    jobDescription?: string;
  };
}

type UserProfileData = {
  jobRole: string;
  experienceLevel: string;
  skills: string[];
  targetCompany: string;
  jobDescription: string;
};

export function CreateInterviewDrawer({
  isOpen,
  onClose,
  initialData,
}: CreateInterviewDrawerProps) {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [errorMsg, setErrorMsg] = useState<FormErrors>({});
  const [detailsSaved, setDetailsSaved] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfileData>({
    jobRole: initialData?.jobRole ?? "",
    experienceLevel: initialData?.experienceLevel ?? "MID_LEVEL",
    skills: initialData?.skills ?? [],
    targetCompany: initialData?.targetCompany ?? "",
    jobDescription: initialData?.jobDescription ?? "",
  });

  const router = useRouter();
  const updateField = <K extends keyof UserProfileData>(
    field: K,
    value: UserProfileData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg({});
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
      setStatus("idle");
      return;
    }

    const result = await updateUserProfileAction(formData);

    if (!result.success) {
      setStatus("idle");
      toast.add({
        title: "Error",
        description: result.error?.message || "Failed to update profile.",
        type: "error",
      });
      return;
    }

    setStatus("idle");
    onClose();
    toast.add({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
      type: "success",
    });
    setFormData({
      jobRole: initialData?.jobRole ?? "",
      experienceLevel: initialData?.experienceLevel ?? "MID_LEVEL",
      skills: initialData?.skills ?? [],
      targetCompany: initialData?.targetCompany ?? "",
      jobDescription: initialData?.jobDescription ?? "",
    });
    setDetailsSaved(true);
    // onSuccess?.();
  };

  const handleStartInterview = () => {
    router.push("/interview/mock-interviews");
  }
  const isDisabled = status !== "idle";

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && status === "idle") {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0 z-50
            bg-black/50
            backdrop-blur-sm
            data-[state=open]:animate-overlayShow
            data-[state=closed]:animate-overlayHide
          "
        />

        <Dialog.Content
          className="
            fixed inset-y-0 right-0 z-50
            flex h-full w-full max-w-lg
            flex-col
            border-l border-slate-800
            bg-slate-900
            p-6
            shadow-2xl
            focus:outline-none
            data-[state=open]:animate-slideInRight
            data-[state=closed]:animate-slideOutRight
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-white">
                {/* <Sparkles className="h-4 w-4 text-indigo-400" /> */}
                Setup AI Interview
              </Dialog.Title>

              <Dialog.Description className="mt-1 text-xs text-slate-400">
                Configure the interview based on your role, experience and
                target company.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild disabled={isDisabled}>
              <button
                className="
                  rounded-lg p-1.5
                  text-slate-400
                  transition-colors
                  hover:bg-slate-800
                  hover:text-white
                  disabled:opacity-30
                "
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          {!detailsSaved ? (
            <Interview onStartInterview={handleStartInterview} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-1 flex-col justify-between overflow-y-auto drawer-scrollbar"
            >
              <div className="space-y-5 pr-1">
                {/* Job Role */}
                <div>
                  <Label
                    required
                    htmlFor="job-role"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Job Role
                  </Label>

                  <RoleSelect
                    value={formData.jobRole}
                    onChange={(value) => updateField("jobRole", value)}
                    disabled={isDisabled}
                  />
                  <FieldError message={errorMsg?.jobRole} />
                </div>

                {/* Experience */}
                <div>
                  <Label
                    required
                    htmlFor="experience-level"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Experience Level
                  </Label>

                  <ExperienceLevelSelect
                    value={formData.experienceLevel}
                    onChange={(value) => updateField("experienceLevel", value)}
                    disabled={isDisabled}
                  />
                  <FieldError message={errorMsg?.experienceLevel} />
                </div>

                {/* Tech Stack */}
                <div>
                  <Label
                    required
                    htmlFor="tech-stack"
                    className="block text-xs font-medium text-slate-300"
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

                {/* Target Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Target Company
                  </label>

                  <CompanySelect
                    value={formData.targetCompany}
                    onChange={(value) => updateField("targetCompany", value)}
                  />
                </div>

                {/* Job Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="job-description"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Job Description
                    </label>

                    <span className="text-[11px] text-slate-600">Optional</span>
                  </div>

                  <textarea
                    id="job-description"
                    value={formData.jobDescription}
                    onChange={(e) =>
                      updateField("jobDescription", e.target.value)
                    }
                    disabled={isDisabled}
                    rows={5}
                    placeholder="Paste the job description to tailor the interview to the role..."
                    className="
                    mt-1.5 w-full resize-none
                    rounded-xl
                    border border-slate-800
                    bg-slate-950
                    px-3.5 py-3
                    text-sm text-white
                    placeholder:text-slate-600
                    outline-none
                    transition-colors
                    focus:border-indigo-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  />

                  <p className="mt-1.5 text-[11px] text-slate-600">
                    AI will use this to prioritize relevant skills,
                    responsibilities and interview questions.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 space-y-3 border-t border-slate-800 pt-6 sticky bottom-0 bg-slate-900">
                {/* <button
                type="submit"
                disabled={isDisabled || formData.techStack.length === 0}
                className="
                  flex w-full items-center
                  justify-center gap-2
                  rounded-xl
                  bg-indigo-600
                  px-4 py-3
                  text-sm font-medium text-white
                  shadow-lg shadow-indigo-600/10
                  transition-all
                  hover:bg-indigo-500
                  disabled:opacity-50
                "
              >
                {status === "idle" ? (
                  <>
                    <Calendar className="h-4 w-4" />
                    Schedule Interview
                  </>
                ) : (
                  "Preparing Workspace..."
                )}
              </button> */}
                <button
                  type="submit"
                  disabled={isDisabled || formData.skills.length === 0}
                  className="
                  flex w-full items-center
                  justify-center gap-2
                  rounded-xl
                  bg-indigo-600
                  px-4 py-3
                  text-sm font-medium text-white
                  shadow-lg shadow-indigo-600/10
                  transition-all
                  hover:bg-indigo-500
                  disabled:opacity-50
                "
                >
                  {status === "idle" ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Start Interview
                    </>
                  ) : (
                    "Preparing Workspace..."
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
