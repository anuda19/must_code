"use client";

import { useState } from "react";
import {
  User as UserIcon,
  Mail,
  Briefcase,
  Building2,
  Sparkles,
  Wrench,
  Calendar,
  Edit3,
  LoaderCircle,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";
import { useUser, type User } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function UserProfile() {
  const { data: user, isLoading, error, refetch } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Form state prefilled when editing opens
  const [formData, setFormData] = useState({
    jobRole: "",
    experienceLevel: "",
    targetCompany: "",
    skillsInput: "",
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0D18] text-white">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="size-8 animate-spin text-indigo-400" />
          <p className="text-sm text-slate-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0D18] p-4 text-white">
        <Card className="border-rose-500/30 bg-rose-500/10 p-6 text-center max-w-md">
          <p className="text-rose-300">
            {error?.message ?? "Failed to load user profile."}
          </p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const profile = user.profile;

  // Extract initials for avatar fallback
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleOpenEdit = () => {
    setFormData({
      jobRole: profile?.jobRole ?? "",
      experienceLevel: profile?.experienceLevel ?? "",
      targetCompany: profile?.targetCompany ?? "",
      skills: profile?.skills ? profile.skills.join(", ") : "",
    } as any);
    setSaveError(null);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const skillsArray = (formData as any).skills
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole: formData.jobRole,
          experienceLevel: formData.experienceLevel,
          targetCompany: formData.targetCompany || null,
          skills: skillsArray,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message ?? "Failed to update profile.");
      }

      await refetch();
      setIsEditing(false);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0A0D18] px-4 py-10 text-white antialiased sm:px-8">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 -z-10 h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Title & Edit Trigger */}
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Sparkles className="size-4" />
              <span>Account Settings</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Candidate Profile
            </h1>
          </div>

          <Button
            onClick={handleOpenEdit}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-600/40"
          >
            <Edit3 className="size-4 transition-transform group-hover:rotate-12" />
            <span>Edit Profile</span>
          </Button>
        </header>

        {/* Main Content Grid (Left Side Layout Anchor) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Identity & Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="relative overflow-hidden border border-white/10 bg-[#11162B]/80 backdrop-blur-xl text-white shadow-2xl shadow-indigo-950/30 rounded-3xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <CardContent className="flex flex-col items-center p-8 text-center">
                {/* Avatar Initial Placeholder */}
                <div className="relative mb-5">
                  <div className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-lg" />
                  <div className="relative flex size-24 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/60 text-2xl font-extrabold text-indigo-200 shadow-inner">
                    {initials}
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white">
                  {user.name}
                </h2>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <Mail className="size-3.5 text-indigo-400" />
                  <span>{user.email}</span>
                </div>

                <div className="mt-6 w-full border-t border-white/10 pt-6 space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-indigo-400" /> Member
                      Since
                    </span>
                    <span className="font-medium text-slate-200">
                      {profile?.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Profile
                      Status
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px]"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Professional Details & Skills */}
          <div className="lg:col-span-8 space-y-6">
            {/* Professional Overview Card */}
            <Card className="border border-white/10 bg-[#11162B]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <Briefcase className="size-4" /> Professional Target
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Job Role</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">
                    {profile?.jobRole || "Not specified"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Experience Level</p>
                  <p className="mt-1.5 text-sm font-semibold text-white capitalize">
                    {profile?.experienceLevel || "Not specified"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Target Company</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">
                    {profile?.targetCompany || "Open / None"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Skills & Expertise Card */}
            <Card className="border border-white/10 bg-[#11162B]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <Wrench className="size-4" /> Skills & Technical Stack
              </h3>

              <div className="mt-6 flex flex-wrap gap-2">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 rounded-xl"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No skills added yet. Click edit to add your expertise.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      {/* <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg border border-indigo-500/20 bg-[#090C19] text-white backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-2xl">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold tracking-tight text-white">
              Edit Professional Profile
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-400">
              Update your job role, experience tier, and core technical skills.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="mt-4 space-y-4">
            {saveError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                {saveError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Job Role / Title
              </label>
              <input
                type="text"
                value={formData.jobRole}
                onChange={(e) =>
                  setFormData({ ...formData, jobRole: e.target.value })
                }
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Experience Level
              </label>
              <input
                type="text"
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({ ...formData, experienceLevel: e.target.value })
                }
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Mid-Level, Senior, Junior"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Target Company (Optional)
              </label>
              <input
                type="text"
                value={formData.targetCompany}
                onChange={(e) =>
                  setFormData({ ...formData, targetCompany: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Google, Stripe, Startup"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Skills (Comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                placeholder="React, TypeScript, Next.js, Node.js"
              />
            </div>

            <DialogFooter className="mt-6 flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 rounded-xl"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="size-4" />
                    <span>Save Changes</span>
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}
    </main>
  );
}