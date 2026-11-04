// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import {
//   User as UserIcon,
//   Mail,
//   Briefcase,
//   Building2,
//   Sparkles,
//   Wrench,
//   Calendar,
//   Edit3,
//   LoaderCircle,
//   CheckCircle2,
//   X,
//   Save,
//   MapPin,
//   FileText,
//   Upload,
//   Camera,
//   ImagePlus,
//   ExternalLink,
//   Settings,
//   User,
// } from "lucide-react";
// import { useUser } from "@/hooks/useUser";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { uploadAvatarAction } from "@/actions/users/upload-avatar";
// import {
//   getCvSignedUrlAction,
//   uploadCvAction,
// } from "@/actions/users/upload-cv";
// import { updateUserProfileAction } from "@/actions/users/user-profile";
// import { userProfileSchema } from "@/lib/schema/user-profile.schema";
// import { UserProfileData } from "@/types/user-profile-types";
// import { toast } from "@/components/ui/toast";
// import { Label } from "@/app/components/ui/Label";
// import { Input } from "@/app/components/ui/TextInput";
// import { ExperienceLevelSelect } from "@/app/(dashboard)/dashboard/_components/Core/ExperienceLevel";
// import { TechStackInput } from "@/app/(dashboard)/dashboard/_components/Core/TechStackSelect";
// import { JobRoleSelect } from "@/app/(dashboard)/dashboard/_components/Core/RoleSelect";
// import BackButton from "@/app/components/ui/BackButton";

// const inputClassName =
//   "w-full rounded-xl border border-white/[0.09] bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/10";

// export default function UserProfile() {
//   const { data: user, isLoading, error, refetch } = useUser();

//   const avatarInputRef = useRef<HTMLInputElement>(null);
//   const cvInputRef = useRef<HTMLInputElement>(null);
//   const avatarPreviewRef = useRef<string | null>(null);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
//   const [isUploadingCv, setIsUploadingCv] = useState(false);
//   const [isOpeningCv, setIsOpeningCv] = useState(false);

//   const [saveError, setSaveError] = useState<string | null>(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [avatarError, setAvatarError] = useState<string | null>(null);
//   const [cvError, setCvError] = useState<string | null>(null);
//   const [cvFileName, setCvFileName] = useState<string | null>(null);
//   type FormErrors = Partial<Record<keyof UserProfileData, string>>;
//   const [errorMsg, setErrorMsg] = useState<FormErrors | null>(null);

//   const [formData, setFormData] = useState<UserProfileData>({
//     jobRole: "",
//     experienceLevel: "",
//     targetCompany: "",
//     skills: [],
//     bio: "",
//     location: "",
//     avatarUrl: "",
//     cvUrl: "",
//   });

//   useEffect(() => {
//     return () => {
//       if (avatarPreviewRef.current) {
//         URL.revokeObjectURL(avatarPreviewRef.current);
//       }
//     };
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#0A0D18] text-white">
//         <div className="flex flex-col items-center gap-3">
//           <LoaderCircle className="size-8 animate-spin text-indigo-400" />
//           <p className="text-sm text-slate-400">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#0A0D18] p-4 text-white">
//         <Card className="max-w-md border-rose-500/30 bg-rose-500/10 p-6 text-center">
//           <p className="text-sm text-rose-300">
//             {error?.message ?? "Failed to load user profile."}
//           </p>
//           <Button
//             onClick={() => refetch()}
//             className="mt-4 bg-indigo-600 text-white hover:bg-indigo-500"
//           >
//             Try Again
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   const profile = user.profile;

//   const initials = user.name
//     ? user.name
//         .split(" ")
//         .map((part) => part[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : "U";

//   const currentAvatar = profile?.avatarUrl || formData.avatarUrl || null;

//   const updateField = (
//     field: keyof UserProfileData,
//     value: string | string[],
//   ) => {
//     setFormData((previous) => ({ ...previous, [field]: value }));
//   };

//   const handleOpenEdit = () => {
//     setFormData({
//       jobRole: profile?.jobRole ?? "",
//       experienceLevel: profile?.experienceLevel ?? "",
//       targetCompany: profile?.targetCompany ?? "",
//       skills: profile?.skills ?? [],
//       bio: profile?.bio ?? "",
//       location: profile?.location ?? "",
//       avatarUrl: profile?.avatarUrl ?? "",
//       cvUrl: profile?.cvUrl ?? "",
//     });

//     setCvFileName(null);
//     setSaveError(null);
//     setAvatarError(null);
//     setCvError(null);
//     setSaveSuccess(false);
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setSaveError(null);
//     setAvatarError(null);
//     setCvError(null);
//     setCvFileName(null);
//   };

//   const handleAvatarSelection = async (
//     event: ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(file.type)) {
//       setAvatarError("Please upload a JPG, PNG, or WebP image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setAvatarError("Profile picture must be smaller than 5 MB.");
//       return;
//     }

//     setAvatarError(null);
//     setSaveError(null);
//     setIsUploadingAvatar(true);
//     const previewUrl = URL.createObjectURL(file);
//     avatarPreviewRef.current = previewUrl;

//     try {
//       const uploadData = new FormData();
//       uploadData.append("file", file, file.name);

//       const result = await uploadAvatarAction(uploadData);

//       if (!result.success || !result.data?.url) {
//         throw new Error(
//           result.error?.message ?? "Failed to upload profile picture.",
//         );
//       }

//       updateField("avatarUrl", result.data.url);
//     } catch (err) {
//       setAvatarError(
//         err instanceof Error ? err.message : "Avatar upload failed.",
//       );
//     } finally {
//       setIsUploadingAvatar(false);
//     }
//   };

//   const handleCvSelection = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setCvError("Please upload a PDF, DOC, or DOCX file.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setCvError("CV must be smaller than 5 MB.");
//       return;
//     }

//     setCvError(null);
//     setSaveError(null);
//     setIsUploadingCv(true);

//     try {
//       const uploadData = new FormData();
//       uploadData.append("file", file, file.name);

//       const result = await uploadCvAction(uploadData);

//       if (!result.success || !result.data?.path) {
//         throw new Error(result.error?.message ?? "Failed to upload CV.");
//       }

//       updateField("cvUrl", result.data.path);
//       setCvFileName(file.name);
//     } catch (err) {
//       setCvError(err instanceof Error ? err.message : "CV upload failed.");
//     } finally {
//       setIsUploadingCv(false);
//     }
//   };

//   const handleOpenCv = async () => {
//     const cvPath = profile?.cvUrl || formData.cvUrl;

//     if (!cvPath) return;

//     setCvError(null);
//     setIsOpeningCv(true);

//     try {
//       const result = await getCvSignedUrlAction(cvPath);

//       if (!result.success || !result.data?.signedUrl) {
//         throw new Error(
//           result.error?.message ?? "Could not generate CV download link.",
//         );
//       }

//       window.open(result.data.signedUrl, "_blank", "noopener,noreferrer");
//     } catch (err) {
//       setCvError(
//         err instanceof Error ? err.message : "Could not open your CV.",
//       );
//     } finally {
//       setIsOpeningCv(false);
//     }
//   };

//   const handleSave = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setIsSaving(true);
//     setSaveError(null);
//     setSaveSuccess(false);

//     try {
//       const validate = userProfileSchema.safeParse(formData);

//       if (!validate.success) {
//         const fieldErrors: FormErrors = {};

//         validate.error.issues.forEach((issue) => {
//           const field = issue.path[0] as keyof UserProfileData;

//           if (field && !fieldErrors[field]) {
//             fieldErrors[field] = issue.message;
//           }
//         });

//         setErrorMsg(fieldErrors);
//         return;
//       }
//       const result = await updateUserProfileAction({
//         jobRole: validate.data.jobRole,
//         experienceLevel: validate.data.experienceLevel,
//         skills: validate.data.skills,
//         targetCompany: validate.data.targetCompany || null,
//         cvUrl: formData.cvUrl || null,
//         avatarUrl: formData.avatarUrl || null,
//       });

//       if (!result.success) {
//         toast.add({
//           title: "Error",
//           description: result.error?.message || "Failed to update profile.",
//           type: "error",
//         });
//         return;
//       }

//       await refetch();
//       setIsEditing(false);
//       setSaveSuccess(true);
//       setCvFileName(null);
//     } catch (err) {
//       setSaveError(
//         err instanceof Error ? err.message : "An unexpected error occurred.",
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0D18] px-4 py-8 text-white antialiased sm:px-8 sm:py-10">
//       <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.12] blur-[140px]" />
//       <div className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-violet-600/[0.09] blur-[140px]" />

//       <div className="relative mx-auto max-w-6xl space-y-8">
//         <header className="flex flex-col justify-between gap-5 border-b border-white/[0.08] sm:flex-row sm:items-center">
//           <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
//             <User className="size-3.5" />
//             Account Settings
//           </div>
//           <BackButton
//             label="Back"
//             className="text-slate-300 hover:bg-white/[0.07] hover:text-white"
//           />
//         </header>

//         {saveSuccess && (
//           <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300">
//             <CheckCircle2 className="size-4" />
//             Your profile has been updated successfully.
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//           <aside className="space-y-6 lg:col-span-4">
//             <Card className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#11162B]/80 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
//               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

//               <CardContent className="p-7 sm:p-8">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="relative mb-5">
//                     <div className="absolute -inset-3 rounded-3xl bg-indigo-500/20 blur-xl" />
//                     <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-violet-500/25 via-indigo-500/20 to-[#11162B] text-2xl font-bold text-indigo-100">
//                       {currentAvatar ? (
//                         <img
//                           src={currentAvatar}
//                           alt={user.name ?? "Profile picture"}
//                           className="size-full object-cover"
//                         />
//                       ) : (
//                         initials
//                       )}
//                     </div>
//                   </div>

//                   {isEditing && (
//                     <>
//                       <input
//                         ref={avatarInputRef}
//                         type="file"
//                         accept="image/jpeg,image/png,image/webp"
//                         className="hidden"
//                         onChange={handleAvatarSelection}
//                       />

//                       <Button
//                         type="button"
//                         variant="outline"
//                         disabled={isUploadingAvatar || isSaving}
//                         onClick={() => avatarInputRef.current?.click()}
//                         className="mb-4 h-9 gap-2 rounded-xl border-white/10 bg-white/[0.04] text-xs text-slate-200 hover:bg-white/[0.08] hover:text-white"
//                       >
//                         {isUploadingAvatar ? (
//                           <LoaderCircle className="size-4 animate-spin" />
//                         ) : (
//                           <Camera className="size-4" />
//                         )}
//                         {isUploadingAvatar ? "Uploading..." : "Change picture"}
//                       </Button>

//                       <p className="mb-2 text-[11px] text-slate-500">
//                         JPG, PNG or WebP · Maximum 5 MB
//                       </p>

//                       {avatarError && (
//                         <p className="mb-3 text-xs text-rose-300">
//                           {avatarError}
//                         </p>
//                       )}
//                     </>
//                   )}

//                   <h2 className="text-xl font-bold tracking-tight">
//                     {user.name}
//                   </h2>
//                   {profile?.bio && (
//                     <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-300">
//                       {profile?.bio || "No professional bio added yet."}
//                     </p>
//                   )}
//                   <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
//                     <Mail className="size-3.5 text-indigo-400" />
//                     <span className="break-all">{user.email}</span>
//                   </div>

//                   {profile?.jobRole && (
//                     <Badge
//                       variant="outline"
//                       className="mt-4 rounded-lg border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-1 text-xs text-indigo-200"
//                     >
//                       {profile.jobRole}
//                     </Badge>
//                   )}
//                 </div>

//                 <div className="mt-7 space-y-4 border-t border-white/[0.08] pt-6">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="flex items-center gap-2 text-xs text-slate-400">
//                       <Calendar className="size-4 text-indigo-400" />
//                       Member Since
//                     </span>
//                     <span className="text-xs font-medium text-slate-200">
//                       {profile?.createdAt
//                         ? new Date(profile?.createdAt).toLocaleDateString(
//                             "en-IN",
//                             { month: "short", year: "numeric" },
//                           )
//                         : "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3">
//                     <span className="flex items-center gap-2 text-xs text-slate-400">
//                       <CheckCircle2 className="size-4 text-emerald-400" />
//                       Profile Status
//                     </span>
//                     <Badge
//                       variant="outline"
//                       className="border-emerald-400/20 bg-emerald-400/[0.07] text-[10px] text-emerald-300"
//                     >
//                       Active
//                     </Badge>
//                   </div>

//                   {(profile?.location || (isEditing && formData.location)) && (
//                     <div className="flex items-center justify-between gap-3">
//                       <span className="flex items-center gap-2 text-xs text-slate-400">
//                         <MapPin className="size-4 text-indigo-400" />
//                         Location
//                       </span>
//                       <span className="text-right text-xs text-slate-200">
//                         {isEditing
//                           ? formData.location || "Not specified"
//                           : profile?.location}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </aside>

//           <section className="space-y-6 lg:col-span-8">
//             {isEditing ? (
//               <Card className="overflow-hidden rounded-3xl border border-indigo-400/20 bg-[#11162B]/90 text-white shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
//                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

//                 <CardContent className="px-6 sm:px-8">
//                   <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
//                       Profile Editor
//                     </p>

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       disabled={isSaving || isUploadingAvatar || isUploadingCv}
//                       onClick={handleCancel}
//                       className="h-9 w-fit gap-2 rounded-lg text-slate-400 hover:bg-white/[0.05] hover:text-white"
//                     >
//                       <X className="size-4" />
//                       Cancel
//                     </Button>
//                   </div>

//                   {saveError && (
//                     <div className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-300">
//                       {saveError}
//                     </div>
//                   )}

//                   <form onSubmit={handleSave} className="space-y-6">
//                     <div className="grid gap-5 sm:grid-cols-2">
//                       <div>
//                         <Label
//                           required
//                           htmlFor="job-role"
//                           className="mb-1 block text-xs font-medium text-slate-300"
//                         >
//                           Job Role
//                         </Label>

//                         <JobRoleSelect
//                           value={formData.jobRole}
//                           onChange={(val) => updateField("jobRole", val)}
//                           // disabled={isDisabled}
//                           placeholder="e.g. Frontend Engineer"
//                         />
//                       </div>

//                       <div>
//                         <Label
//                           required
//                           htmlFor="job-role"
//                           className="mb-1 block text-xs font-medium text-slate-300"
//                         >
//                           Experience
//                         </Label>
//                         <ExperienceLevelSelect
//                           value={formData.experienceLevel}
//                           onChange={(value) =>
//                             updateField("experienceLevel", value)
//                           }
//                           // disabled={isDisabled}
//                         />
//                       </div>

//                       <div>
//                         <Label
//                           htmlFor="target-company"
//                           className="block text-xs font-medium text-slate-300 mb-1"
//                         >
//                           Target Company
//                         </Label>

//                         <Input
//                           id="target-company"
//                           value={formData.targetCompany ?? ""}
//                           onChange={(e) =>
//                             updateField("targetCompany", e.target.value)
//                           }
//                           // disabled={isDisabled}
//                           placeholder="e.g. Google, Amazon, Microsoft"
//                         />
//                       </div>

//                       <div>
//                         <Label
//                           htmlFor="location"
//                           className="block text-xs font-medium text-slate-300 mb-1"
//                         >
//                           Location
//                         </Label>

//                         <Input
//                           id="location"
//                           value={formData.location ?? ""}
//                           onChange={(e) =>
//                             updateField("location", e.target.value)
//                           }
//                           placeholder="Bengaluru, India"
//                           // className={inputClassName}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <TechStackInput
//                         value={formData.skills}
//                         onChange={(value) => updateField("skills", value)}
//                         selectedRole={formData.jobRole}
//                       />
//                     </div>

//                     <div>
//                       {/* Resume / CV */}
//                       <Card className="rounded-xl border border-white/[0.08] bg-slate-950 text-white backdrop-blur-xl">
//                         <CardContent className="p-5">
//                           <div className="flex items-start gap-3">
//                             <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08]">
//                               <FileText className="size-5 text-indigo-300" />
//                             </div>

//                             <div className="min-w-0 flex-1">
//                               <p className="text-sm font-semibold">
//                                 Resume / CV
//                               </p>
//                               <p className="mt-1 break-words text-xs text-slate-400">
//                                 {cvFileName
//                                   ? cvFileName
//                                   : (
//                                         isEditing
//                                           ? formData.cvUrl
//                                           : profile?.cvUrl
//                                       )
//                                     ? "Resume uploaded"
//                                     : "No resume uploaded yet"}
//                               </p>
//                             </div>

//                             {(profile?.cvUrl ||
//                               (isEditing && formData.cvUrl)) && (
//                               <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
//                             )}
//                           </div>

//                           {isEditing && (
//                             <>
//                               <input
//                                 ref={cvInputRef}
//                                 type="file"
//                                 accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                                 className="hidden"
//                                 onChange={handleCvSelection}
//                               />

//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 disabled={isUploadingCv || isSaving}
//                                 onClick={() => cvInputRef.current?.click()}
//                                 className="mt-4 h-10 w-full gap-2 rounded-xl border-indigo-400/20 bg-indigo-400/[0.06] text-sm text-indigo-200 hover:bg-indigo-400/[0.12] hover:text-white"
//                               >
//                                 {isUploadingCv ? (
//                                   <LoaderCircle className="size-4 animate-spin" />
//                                 ) : (
//                                   <Upload className="size-4" />
//                                 )}
//                                 {isUploadingCv
//                                   ? "Uploading CV..."
//                                   : "Upload new CV"}
//                               </Button>

//                               <p className="mt-2 text-center text-[11px] text-slate-500">
//                                 PDF, DOC or DOCX · Maximum 5 MB
//                               </p>
//                             </>
//                           )}

//                           {!isEditing && profile?.cvUrl && (
//                             <Button
//                               type="button"
//                               variant="outline"
//                               disabled={isOpeningCv}
//                               onClick={handleOpenCv}
//                               className="mt-4 h-10 w-full gap-2 rounded-xl border-white/10 bg-white/[0.03] text-sm text-slate-200 hover:bg-white/[0.07] hover:text-white"
//                             >
//                               {isOpeningCv ? (
//                                 <LoaderCircle className="size-4 animate-spin" />
//                               ) : (
//                                 <ExternalLink className="size-4" />
//                               )}
//                               {isOpeningCv ? "Preparing CV..." : "View CV"}
//                             </Button>
//                           )}

//                           {cvError && (
//                             <p className="mt-3 text-xs text-rose-300">
//                               {cvError}
//                             </p>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </div>
//                     <div>
//                       <Label
//                         htmlFor="professional-bio"
//                         className="block text-xs font-medium text-slate-300 mb-1"
//                       >
//                         Professional Bio
//                       </Label>
//                       <textarea
//                         id="professional-bio"
//                         value={formData.bio ?? ""}
//                         onChange={(e) => updateField("bio", e.target.value)}
//                         rows={4}
//                         placeholder="Write a short professional introduction..."
//                         className={`${inputClassName} resize-y`}
//                       />
//                     </div>

//                     <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-end">
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         disabled={
//                           isSaving || isUploadingAvatar || isUploadingCv
//                         }
//                         onClick={handleCancel}
//                         className="rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white"
//                       >
//                         Cancel
//                       </Button>

//                       <Button
//                         type="submit"
//                         disabled={
//                           isSaving || isUploadingAvatar || isUploadingCv
//                         }
//                         className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-600/40 active:scale-[0.98]"
//                       >
//                         {isSaving ? (
//                           <>
//                             <LoaderCircle className="size-4 animate-spin" />
//                             Saving Changes...
//                           </>
//                         ) : (
//                           <>
//                             <Save className="size-4" />
//                             Save Changes
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </form>
//                 </CardContent>
//               </Card>
//             ) : (
//               <>
//                 <Card className="rounded-3xl border border-white/[0.08] bg-[#11162B]/80 p-6 text-white shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
//                   <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
//                   <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
//                     <div className="flex items-center gap-3.5">
//                       <div className="flex size-11 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 text-indigo-300 shadow-inner">
//                         <Briefcase className="size-5 text-indigo-300" />
//                       </div>

//                       <div>
//                         <h3 className="text-base font-bold text-white tracking-tight sm:text-lg">
//                           Professional Overview
//                         </h3>
//                         <p className="mt-0.5 text-xs font-medium text-slate-400">
//                           Your career preferences and experience.
//                         </p>
//                       </div>
//                     </div>
//                     <Button
//                       onClick={handleOpenEdit}
//                       className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-600/40 active:scale-[0.98]"
//                     >
//                       <Edit3 className="size-4 transition-transform duration-300 group-hover:rotate-12" />
//                       <span>Edit Profile</span>
//                     </Button>
//                   </div>

//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
//                       <p className="text-xs text-slate-400">Job Role</p>
//                       <p className="mt-2 text-sm font-semibold">
//                         {profile?.jobRole || "Not specified"}
//                       </p>
//                     </div>

//                     <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
//                       <p className="text-xs text-slate-400">Experience Level</p>
//                       <p className="mt-2 text-sm font-semibold">
//                         {profile?.experienceLevel?.replaceAll("_", " ") ||
//                           "Not specified"}
//                       </p>
//                     </div>

//                     <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:col-span-2">
//                       <div className="flex items-center gap-2 text-xs text-slate-400">
//                         Target Company
//                       </div>
//                       <p className="mt-2 text-sm font-semibold">
//                         {profile?.targetCompany || "Open to opportunities"}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>

//                 <Card className="rounded-3xl border border-white/[0.08] bg-[#11162B]/80 p-6 text-white shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
//                   <div className="flex items-center gap-3">
//                     <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08]">
//                       <Wrench className="size-5 text-violet-300" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-semibold">
//                         Skills & Technical Stack
//                       </h3>
//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Technologies and tools you work with.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {profile?.skills?.length ? (
//                       profile.skills.map((skill) => (
//                         <Badge
//                           key={skill}
//                           variant="outline"
//                           className="rounded-xl border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-2 text-xs font-medium text-indigo-200"
//                         >
//                           {skill}
//                         </Badge>
//                       ))
//                     ) : (
//                       <p className="text-sm text-slate-400">
//                         No skills added yet.
//                       </p>
//                     )}
//                   </div>
//                 </Card>

//                 <Card className="rounded-3xl border border-white/[0.08] bg-[#11162B]/80 p-6 text-white shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
//                   <CardContent className="p-0">
//                     <div className="flex items-start gap-3">
//                       <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08]">
//                         <FileText className="size-5 text-indigo-300" />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm font-semibold">Resume / CV</p>
//                         <p className="mt-1 break-words text-xs text-slate-400">
//                           {profile?.cvUrl
//                             ? "Resume uploaded"
//                             : "No resume uploaded yet"}
//                         </p>
//                       </div>

//                       {profile?.cvUrl && (
//                         <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
//                       )}
//                     </div>

//                     {profile?.cvUrl && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         disabled={isOpeningCv}
//                         onClick={handleOpenCv}
//                         className="mt-4 h-10 w-full gap-2 rounded-xl border-white/10 bg-white/[0.03] text-sm text-slate-200 hover:bg-white/[0.07] hover:text-white"
//                       >
//                         {isOpeningCv ? (
//                           <LoaderCircle className="size-4 animate-spin" />
//                         ) : (
//                           <ExternalLink className="size-4" />
//                         )}
//                         {isOpeningCv ? "Preparing CV..." : "View CV"}
//                       </Button>
//                     )}

//                     {cvError && (
//                       <p className="mt-3 text-xs text-rose-300">{cvError}</p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </>
//             )}
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
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
  MapPin,
  FileText,
  Upload,
  Camera,
  ImagePlus,
  ExternalLink,
  Settings,
  User,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { uploadAvatarAction } from "@/actions/users/upload-avatar";
import {
  getCvSignedUrlAction,
  uploadCvAction,
} from "@/actions/users/upload-cv";
import { updateUserProfileAction } from "@/actions/users/user-profile";
import { userProfileSchema } from "@/lib/schema/user-profile.schema";
import { UserProfileData } from "@/types/user-profile-types";
import { toast } from "@/components/ui/toast";
import { Label } from "@/app/components/ui/Label";
import { Input } from "@/app/components/ui/TextInput";
import { ExperienceLevelSelect } from "@/app/(dashboard)/dashboard/_components/Core/ExperienceLevel";
import { TechStackInput } from "@/app/(dashboard)/dashboard/_components/Core/TechStackSelect";
import { JobRoleSelect } from "@/app/(dashboard)/dashboard/_components/Core/RoleSelect";
import BackButton from "@/app/components/ui/BackButton";

const inputClassName =
  "w-full rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-4 py-3 text-sm text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] outline-none transition focus:border-[var(--clay-primary)] focus:bg-[var(--clay-surface)] focus:ring-2 focus:ring-[var(--clay-primary)]/15";

export default function UserProfile() {
  const { data: user, isLoading, error, refetch } = useUser();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const avatarPreviewRef = useRef<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [isOpeningCv, setIsOpeningCv] = useState(false);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  type FormErrors = Partial<Record<keyof UserProfileData, string>>;
  const [errorMsg, setErrorMsg] = useState<FormErrors | null>(null);

  const [formData, setFormData] = useState<UserProfileData>({
    jobRole: "",
    experienceLevel: "",
    targetCompany: "",
    skills: [],
    bio: "",
    location: "",
    avatarUrl: "",
    cvUrl: "",
  });

  useEffect(() => {
    return () => {
      if (avatarPreviewRef.current) {
        URL.revokeObjectURL(avatarPreviewRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--clay-bg)] text-[var(--clay-ink)]">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="size-8 animate-spin text-[var(--clay-primary)]" />
          <p className="text-sm text-[var(--clay-muted)]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--clay-bg)] p-4 text-[var(--clay-ink)]">
        <Card className="max-w-md rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 text-center clay-card">
          <p className="text-sm text-[var(--clay-coral-shadow)]">
            {error?.message ?? "Failed to load user profile."}
          </p>
          <Button
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-[var(--clay-primary)] text-[var(--clay-primary-ink)] clay-button-shadow hover:bg-[var(--clay-primary-hover)]"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const profile = user.profile;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const currentAvatar = profile?.avatarUrl || formData.avatarUrl || null;

  const updateField = (
    field: keyof UserProfileData,
    value: string | string[],
  ) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleOpenEdit = () => {
    setFormData({
      jobRole: profile?.jobRole ?? "",
      experienceLevel: profile?.experienceLevel ?? "",
      targetCompany: profile?.targetCompany ?? "",
      skills: profile?.skills ?? [],
      bio: profile?.bio ?? "",
      location: profile?.location ?? "",
      avatarUrl: profile?.avatarUrl ?? "",
      cvUrl: profile?.cvUrl ?? "",
    });

    setCvFileName(null);
    setSaveError(null);
    setAvatarError(null);
    setCvError(null);
    setSaveSuccess(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
    setAvatarError(null);
    setCvError(null);
    setCvFileName(null);
  };

  const handleAvatarSelection = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Profile picture must be smaller than 5 MB.");
      return;
    }

    setAvatarError(null);
    setSaveError(null);
    setIsUploadingAvatar(true);
    const previewUrl = URL.createObjectURL(file);
    avatarPreviewRef.current = previewUrl;

    try {
      const uploadData = new FormData();
      uploadData.append("file", file, file.name);

      const result = await uploadAvatarAction(uploadData);

      if (!result.success || !result.data?.url) {
        throw new Error(
          result.error?.message ?? "Failed to upload profile picture.",
        );
      }

      updateField("avatarUrl", result.data.url);
    } catch (err) {
      setAvatarError(
        err instanceof Error ? err.message : "Avatar upload failed.",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCvSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setCvError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCvError("CV must be smaller than 5 MB.");
      return;
    }

    setCvError(null);
    setSaveError(null);
    setIsUploadingCv(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file, file.name);

      const result = await uploadCvAction(uploadData);

      if (!result.success || !result.data?.path) {
        throw new Error(result.error?.message ?? "Failed to upload CV.");
      }

      updateField("cvUrl", result.data.path);
      setCvFileName(file.name);
    } catch (err) {
      setCvError(err instanceof Error ? err.message : "CV upload failed.");
    } finally {
      setIsUploadingCv(false);
    }
  };

  const handleOpenCv = async () => {
    const cvPath = profile?.cvUrl || formData.cvUrl;

    if (!cvPath) return;

    setCvError(null);
    setIsOpeningCv(true);

    try {
      const result = await getCvSignedUrlAction(cvPath);

      if (!result.success || !result.data?.signedUrl) {
        throw new Error(
          result.error?.message ?? "Could not generate CV download link.",
        );
      }

      window.open(result.data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setCvError(
        err instanceof Error ? err.message : "Could not open your CV.",
      );
    } finally {
      setIsOpeningCv(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

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
      const result = await updateUserProfileAction({
        jobRole: validate.data.jobRole,
        experienceLevel: validate.data.experienceLevel,
        skills: validate.data.skills,
        targetCompany: validate.data.targetCompany || null,
        cvUrl: formData.cvUrl || null,
        avatarUrl: formData.avatarUrl || null,
      });

      if (!result.success) {
        toast.add({
          title: "Error",
          description: result.error?.message || "Failed to update profile.",
          type: "error",
        });
        return;
      }

      await refetch();
      setIsEditing(false);
      setSaveSuccess(true);
      setCvFileName(null);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--clay-bg)] px-4 py-8 text-[var(--clay-ink)] antialiased sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[var(--clay-peach)]/50 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-[var(--clay-sage)]/60 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--clay-border)] sm:flex-row sm:items-center">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--clay-primary)]">
            <User className="size-3.5" />
            Account Settings
          </div>
          <BackButton
            label="Back"
            className="text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
          />
        </header>

        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-xl border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] px-4 py-3 text-sm text-[var(--clay-green-ink)]">
            <CheckCircle2 className="size-4" />
            Your profile has been updated successfully.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <Card className="relative overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] clay-card">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--clay-primary)] to-transparent" />

              <CardContent className="p-7 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="absolute -inset-3 rounded-3xl bg-[var(--clay-peach)]/70 blur-xl" />
                    <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-2xl font-bold text-[var(--clay-ink)] clay-raised">
                      {currentAvatar ? (
                        <img
                          src={currentAvatar}
                          alt={user.name ?? "Profile picture"}
                          className="size-full object-cover"
                        />
                      ) : (
                        initials
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleAvatarSelection}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploadingAvatar || isSaving}
                        onClick={() => avatarInputRef.current?.click()}
                        className="mb-4 h-9 gap-2 rounded-xl border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-xs text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
                      >
                        {isUploadingAvatar ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Camera className="size-4" />
                        )}
                        {isUploadingAvatar ? "Uploading..." : "Change picture"}
                      </Button>

                      <p className="mb-2 text-[11px] text-[var(--clay-subtle)]">
                        JPG, PNG or WebP · Maximum 5 MB
                      </p>

                      {avatarError && (
                        <p className="mb-3 text-xs text-[var(--clay-coral-shadow)]">
                          {avatarError}
                        </p>
                      )}
                    </>
                  )}

                  <h2 className="text-xl font-bold tracking-tight">
                    {user.name}
                  </h2>
                  {profile?.bio && (
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-[var(--clay-muted)]">
                      {profile?.bio || "No professional bio added yet."}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-sm text-[var(--clay-muted)]">
                    <Mail className="size-3.5 text-[var(--clay-primary)]" />
                    <span className="break-all">{user.email}</span>
                  </div>

                  {profile?.jobRole && (
                    <Badge
                      variant="outline"
                      className="mt-4 rounded-lg border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] px-3 py-1 text-xs text-[var(--clay-ink)]"
                    >
                      {profile.jobRole}
                    </Badge>
                  )}
                </div>

                <div className="mt-7 space-y-4 border-t border-[var(--clay-border)] pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                      <Calendar className="size-4 text-[var(--clay-primary)]" />
                      Member Since
                    </span>
                    <span className="text-xs font-medium text-[var(--clay-ink)]">
                      {profile?.createdAt
                        ? new Date(profile?.createdAt).toLocaleDateString(
                            "en-IN",
                            { month: "short", year: "numeric" },
                          )
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                      <CheckCircle2 className="size-4 text-[var(--clay-status)]" />
                      Profile Status
                    </span>
                    <Badge
                      variant="outline"
                      className="border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[10px] text-[var(--clay-green-ink)]"
                    >
                      Active
                    </Badge>
                  </div>

                  {(profile?.location || (isEditing && formData.location)) && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                        <MapPin className="size-4 text-[var(--clay-primary)]" />
                        Location
                      </span>
                      <span className="text-right text-xs text-[var(--clay-ink)]">
                        {isEditing
                          ? formData.location || "Not specified"
                          : profile?.location}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-6 lg:col-span-8">
            {isEditing ? (
              <Card className="relative overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] text-[var(--clay-ink)] clay-card">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--clay-primary)] to-transparent" />

                <CardContent className="px-6 sm:px-8">
                  <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay-primary)]">
                      Profile Editor
                    </p>

                    <Button
                      type="button"
                      variant="ghost"
                      disabled={isSaving || isUploadingAvatar || isUploadingCv}
                      onClick={handleCancel}
                      className="h-9 w-fit gap-2 rounded-lg text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
                    >
                      <X className="size-4" />
                      Cancel
                    </Button>
                  </div>

                  {saveError && (
                    <div className="mb-5 rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-surface-warm)] px-4 py-3 text-sm text-[var(--clay-coral-shadow)]">
                      {saveError}
                    </div>
                  )}

                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label
                          required
                          htmlFor="job-role"
                          className="mb-1 block text-xs font-medium text-[var(--clay-muted)]"
                        >
                          Job Role
                        </Label>
                        <JobRoleSelect
                          value={formData.jobRole}
                          onChange={(val) => updateField("jobRole", val)}
                          placeholder="e.g. Frontend Engineer"
                        />
                      </div>

                      <div>
                        <Label
                          required
                          htmlFor="job-role"
                          className="mb-1 block text-xs font-medium text-[var(--clay-muted)]"
                        >
                          Experience
                        </Label>
                        <ExperienceLevelSelect
                          value={formData.experienceLevel}
                          onChange={(value) =>
                            updateField("experienceLevel", value)
                          }
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="target-company"
                          className="mb-1 block text-xs font-medium text-[var(--clay-muted)]"
                        >
                          Target Company
                        </Label>
                        <Input
                          id="target-company"
                          value={formData.targetCompany ?? ""}
                          onChange={(e) =>
                            updateField("targetCompany", e.target.value)
                          }
                          placeholder="e.g. Google, Amazon, Microsoft"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="location"
                          className="mb-1 block text-xs font-medium text-[var(--clay-muted)]"
                        >
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location ?? ""}
                          onChange={(e) =>
                            updateField("location", e.target.value)
                          }
                          placeholder="Bengaluru, India"
                        />
                      </div>
                    </div>

                    <div>
                      <TechStackInput
                        value={formData.skills}
                        onChange={(value) => updateField("skills", value)}
                        selectedRole={formData.jobRole}
                      />
                    </div>

                    <div>
                      <Card className="rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-ink)]">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] clay-raised">
                              <FileText className="size-5 text-[var(--clay-primary)]" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold">
                                Resume / CV
                              </p>
                              <p className="mt-1 break-words text-xs text-[var(--clay-muted)]">
                                {cvFileName
                                  ? cvFileName
                                  : (
                                        isEditing
                                          ? formData.cvUrl
                                          : profile?.cvUrl
                                      )
                                    ? "Resume uploaded"
                                    : "No resume uploaded yet"}
                              </p>
                            </div>

                            {(profile?.cvUrl ||
                              (isEditing && formData.cvUrl)) && (
                              <CheckCircle2 className="size-4 shrink-0 text-[var(--clay-status)]" />
                            )}
                          </div>

                          {isEditing && (
                            <>
                              <input
                                ref={cvInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="hidden"
                                onChange={handleCvSelection}
                              />

                              <Button
                                type="button"
                                variant="outline"
                                disabled={isUploadingCv || isSaving}
                                onClick={() => cvInputRef.current?.click()}
                                className="mt-4 h-10 w-full gap-2 rounded-xl border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)]/50 text-sm text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
                              >
                                {isUploadingCv ? (
                                  <LoaderCircle className="size-4 animate-spin" />
                                ) : (
                                  <Upload className="size-4" />
                                )}
                                {isUploadingCv
                                  ? "Uploading CV..."
                                  : "Upload new CV"}
                              </Button>

                              <p className="mt-2 text-center text-[11px] text-[var(--clay-subtle)]">
                                PDF, DOC or DOCX · Maximum 5 MB
                              </p>
                            </>
                          )}

                          {!isEditing && profile?.cvUrl && (
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isOpeningCv}
                              onClick={handleOpenCv}
                              className="mt-4 h-10 w-full gap-2 rounded-xl border-[var(--clay-border)] bg-[var(--clay-surface)] text-sm text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
                            >
                              {isOpeningCv ? (
                                <LoaderCircle className="size-4 animate-spin" />
                              ) : (
                                <ExternalLink className="size-4" />
                              )}
                              {isOpeningCv ? "Preparing CV..." : "View CV"}
                            </Button>
                          )}

                          {cvError && (
                            <p className="mt-3 text-xs text-[var(--clay-coral-shadow)]">
                              {cvError}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Label
                        htmlFor="professional-bio"
                        className="mb-1 block text-xs font-medium text-[var(--clay-muted)]"
                      >
                        Professional Bio
                      </Label>
                      <textarea
                        id="professional-bio"
                        value={formData.bio ?? ""}
                        onChange={(e) => updateField("bio", e.target.value)}
                        rows={4}
                        placeholder="Write a short professional introduction..."
                        className={`${inputClassName} resize-y`}
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-[var(--clay-border)] pt-6 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={isSaving || isUploadingAvatar || isUploadingCv}
                        onClick={handleCancel}
                        className="rounded-xl text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={isSaving || isUploadingAvatar || isUploadingCv}
                        className="group relative inline-flex items-center gap-2 rounded-lg bg-[var(--clay-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--clay-primary-ink)] clay-button-shadow transition-all duration-300 hover:bg-[var(--clay-primary-hover)]"
                      >
                        {isSaving ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" />
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            <Save className="size-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="relative rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 text-[var(--clay-ink)] clay-card sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--clay-primary)] to-transparent" />
                  <div className="flex flex-col gap-4 border-b border-[var(--clay-border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-[var(--clay-primary)] clay-raised">
                        <Briefcase className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold tracking-tight sm:text-lg">
                          Professional Overview
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-[var(--clay-muted)]">
                          Your career preferences and experience.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleOpenEdit}
                      className="group relative inline-flex items-center gap-2 rounded-lg bg-[var(--clay-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--clay-primary-ink)] clay-button-shadow transition-all duration-300 hover:bg-[var(--clay-primary-hover)]"
                    >
                      <Edit3 className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>Edit Profile</span>
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 clay-inset">
                      <p className="text-xs text-[var(--clay-muted)]">Job Role</p>
                      <p className="mt-2 text-sm font-semibold">
                        {profile?.jobRole || "Not specified"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 clay-inset">
                      <p className="text-xs text-[var(--clay-muted)]">
                        Experience Level
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        {profile?.experienceLevel?.replaceAll("_", " ") ||
                          "Not specified"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 clay-inset sm:col-span-2">
                      <div className="flex items-center gap-2 text-xs text-[var(--clay-muted)]">
                        Target Company
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {profile?.targetCompany || "Open to opportunities"}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 text-[var(--clay-ink)] clay-card sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)]">
                      <Wrench className="size-5 text-[var(--clay-green-ink)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        Skills & Technical Stack
                      </h3>
                      <p className="mt-0.5 text-xs text-[var(--clay-muted)]">
                        Technologies and tools you work with.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {profile?.skills?.length ? (
                      profile.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="rounded-xl border-[var(--clay-blue-shadow)] bg-[var(--clay-blue)] px-3 py-2 text-xs font-medium text-[var(--clay-blue-ink)]"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-[var(--clay-muted)]">
                        No skills added yet.
                      </p>
                    )}
                  </div>
                </Card>

                <Card className="rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-6 text-[var(--clay-ink)] clay-card sm:p-8">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] clay-raised">
                        <FileText className="size-5 text-[var(--clay-primary)]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">Resume / CV</p>
                        <p className="mt-1 break-words text-xs text-[var(--clay-muted)]">
                          {profile?.cvUrl
                            ? "Resume uploaded"
                            : "No resume uploaded yet"}
                        </p>
                      </div>

                      {profile?.cvUrl && (
                        <CheckCircle2 className="size-4 shrink-0 text-[var(--clay-status)]" />
                      )}
                    </div>

                    {profile?.cvUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isOpeningCv}
                        onClick={handleOpenCv}
                        className="mt-4 h-10 w-full gap-2 rounded-xl border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-sm text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
                      >
                        {isOpeningCv ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <ExternalLink className="size-4" />
                        )}
                        {isOpeningCv ? "Preparing CV..." : "View CV"}
                      </Button>
                    )}

                    {cvError && (
                      <p className="mt-3 text-xs text-[var(--clay-coral-shadow)]">
                        {cvError}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}