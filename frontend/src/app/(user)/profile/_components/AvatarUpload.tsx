// "use client";

// import { useEffect, useRef, useState, type ChangeEvent } from "react";
// import { Camera, LoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { uploadAvatarAction } from "@/actions/users/upload-avatar";

// type AvatarUploadProps = {
//   avatarUrl?: string | null;
//   userName?: string | null;
//   isEditing: boolean;
//   disabled?: boolean;
//   onUploaded: (url: string) => void;
// };

// export default function AvatarUpload({
//   avatarUrl,
//   userName,
//   isEditing,
//   disabled = false,
//   onUploaded,
// }: AvatarUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const previewRef = useRef<string | null>(null);

//   const [preview, setPreview] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [imageLoadError, setImageLoadError] = useState(false);

//   const initials = userName
//     ? userName
//         .split(" ")
//         .map((part) => part[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : "U";

//   const currentAvatar = preview || avatarUrl || null;

//   useEffect(() => {
//     return () => {
//       if (previewRef.current) {
//         URL.revokeObjectURL(previewRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setImageLoadError(false);
//   }, [currentAvatar]);

//   const clearPreview = () => {
//     if (previewRef.current) {
//       URL.revokeObjectURL(previewRef.current);
//       previewRef.current = null;
//     }

//     setPreview(null);
//   };

//   const handleAvatarSelection = async (
//     event: ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(file.type)) {
//       setError("Please upload a JPG, PNG, or WebP image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Profile picture must be smaller than 5 MB.");
//       return;
//     }

//     setError(null);
//     setImageLoadError(false);

//     clearPreview();

//     const previewUrl = URL.createObjectURL(file);
//     previewRef.current = previewUrl;
//     setPreview(previewUrl);
//     setIsUploading(true);

//     try {
//       const uploadData = new FormData();
//       uploadData.append("file", file, file.name);

//       const result = await uploadAvatarAction(uploadData);

//       if (!result.success || !result.data?.url) {
//         throw new Error(
//           result.error?.message ?? "Failed to upload profile picture.",
//         );
//       }

//       clearPreview();
//       onUploaded(result.data.url);
//     } catch (err) {
//       clearPreview();

//       setError(
//         err instanceof Error ? err.message : "Avatar upload failed.",
//       );
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center text-center">
//       <div className="relative mb-5">
//         <div className="absolute -inset-3 rounded-3xl bg-indigo-500/20 blur-xl" />

//         <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-violet-500/25 via-indigo-500/20 to-[#11162B] text-2xl font-bold text-indigo-100">
//           {currentAvatar && !imageLoadError ? (
//             <img
//               src={currentAvatar}
//               alt={userName ?? "Profile picture"}
//               className="size-full object-cover"
//               onError={() => setImageLoadError(true)}
//             />
//           ) : (
//             initials
//           )}
//         </div>
//       </div>

//       {isEditing && (
//         <>
//           <input
//             ref={inputRef}
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             className="hidden"
//             onChange={handleAvatarSelection}
//           />

//           <Button
//             type="button"
//             variant="outline"
//             disabled={disabled || isUploading}
//             onClick={() => inputRef.current?.click()}
//             className="mb-4 h-9 gap-2 rounded-xl border-white/10 bg-white/[0.04] text-xs text-slate-200 hover:bg-white/[0.08] hover:text-white"
//           >
//             {isUploading ? (
//               <LoaderCircle className="size-4 animate-spin" />
//             ) : (
//               <Camera className="size-4" />
//             )}

//             {isUploading ? "Uploading..." : "Change picture"}
//           </Button>

//           <p className="mb-2 text-[11px] text-slate-500">
//             JPG, PNG or WebP · Maximum 5 MB
//           </p>

//           {error && (
//             <p className="mb-3 text-xs text-rose-300">{error}</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useEffect, useRef, useState, type ChangeEvent } from "react";
// import { Camera, LoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { uploadAvatarAction } from "@/actions/users/upload-avatar";

// type AvatarUploadProps = {
//   avatarUrl?: string | null;
//   userName?: string | null;
//   isEditing: boolean;
//   disabled?: boolean;
//   onUploaded: (url: string) => void;
// };

// export default function AvatarUpload({
//   avatarUrl,
//   userName,
//   isEditing,
//   disabled = false,
//   onUploaded,
// }: AvatarUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const previewRef = useRef<string | null>(null);

//   const [preview, setPreview] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [imageLoadError, setImageLoadError] = useState(false);

//   const initials = userName
//     ? userName
//         .split(" ")
//         .map((part) => part[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : "U";

//   const currentAvatar = preview || avatarUrl || null;

//   useEffect(() => {
//     return () => {
//       if (previewRef.current) {
//         URL.revokeObjectURL(previewRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setImageLoadError(false);
//   }, [currentAvatar]);

//   const clearPreview = () => {
//     if (previewRef.current) {
//       URL.revokeObjectURL(previewRef.current);
//       previewRef.current = null;
//     }

//     setPreview(null);
//   };

//   const handleAvatarSelection = async (
//     event: ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(file.type)) {
//       setError("Please upload a JPG, PNG, or WebP image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Profile picture must be smaller than 5 MB.");
//       return;
//     }

//     setError(null);
//     setImageLoadError(false);

//     clearPreview();

//     const previewUrl = URL.createObjectURL(file);
//     previewRef.current = previewUrl;
//     setPreview(previewUrl);
//     setIsUploading(true);

//     try {
//       const uploadData = new FormData();
//       uploadData.append("file", file, file.name);

//       const result = await uploadAvatarAction(uploadData);

//       if (!result.success || !result.data?.url) {
//         throw new Error(
//           result.error?.message ?? "Failed to upload profile picture.",
//         );
//       }

//       clearPreview();
//       onUploaded(result.data.url);
//     } catch (err) {
//       clearPreview();

//       setError(
//         err instanceof Error ? err.message : "Avatar upload failed.",
//       );
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center text-center">
//       <div className="relative mb-5">
//         <div className="absolute -inset-3 rounded-3xl bg-[var(--clay-peach)]/70 blur-xl" />

//         <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-2xl font-bold text-[var(--clay-ink)] clay-raised">
//           {currentAvatar && !imageLoadError ? (
//             <img
//               src={currentAvatar}
//               alt={userName ?? "Profile picture"}
//               className="size-full object-cover"
//               onError={() => setImageLoadError(true)}
//             />
//           ) : (
//             initials
//           )}
//         </div>
//       </div>

//       {isEditing && (
//         <>
//           <input
//             ref={inputRef}
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             className="hidden"
//             onChange={handleAvatarSelection}
//           />

//           <Button
//             type="button"
//             variant="outline"
//             disabled={disabled || isUploading}
//             onClick={() => inputRef.current?.click()}
//             className="mb-4 h-9 gap-2 rounded-xl border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-xs text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
//           >
//             {isUploading ? (
//               <LoaderCircle className="size-4 animate-spin" />
//             ) : (
//               <Camera className="size-4" />
//             )}

//             {isUploading ? "Uploading..." : "Change picture"}
//           </Button>

//           <p className="mb-2 text-[11px] text-[var(--clay-subtle)]">
//             JPG, PNG or WebP · Maximum 5 MB
//           </p>

//           {error && (
//             <p className="mb-3 text-xs text-[var(--clay-coral-shadow)]">
//               {error}
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, type ChangeEvent } from "react";
import { Camera, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadAvatarAction } from "@/actions/users/upload-avatar";

type AvatarUploadProps = {
  avatarUrl?: string | null;
  userName?: string | null;
  isEditing: boolean;
  disabled?: boolean;
  onUploaded: (url: string) => void;
};

export default function AvatarUpload({
  avatarUrl,
  userName,
  isEditing,
  disabled = false,
  onUploaded,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  const initials = userName
    ? userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const currentAvatar = preview ?? avatarUrl ?? null;

  const handleAvatarSelection = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];

    event.currentTarget.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile picture must be smaller than 5 MB.");
      return;
    }

    setError(null);
    setImageLoadError(false);

    // Generate and display the selected image immediately.
    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result !== "string") {
        setError("Unable to preview the selected image.");
        return;
      }

      setPreview(reader.result);

      setIsUploading(true);

      try {
        const uploadData = new FormData();
        uploadData.append("file", file, file.name);

        const result = await uploadAvatarAction(uploadData);

        if (!result.success || !result.data?.url) {
          throw new Error(
            result.error?.message ?? "Failed to upload profile picture.",
          );
        }

        onUploaded(result.data.url);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Avatar upload failed.",
        );
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setError("Unable to preview the selected image.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-5">
        <div className="absolute -inset-3 rounded-3xl bg-[var(--clay-peach)]/70 blur-xl" />

        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-2xl font-bold text-[var(--clay-ink)] clay-raised">
          {currentAvatar && !imageLoadError ? (
            <img
              key={currentAvatar}
              src={currentAvatar}
              alt={userName ?? "Profile picture"}
              className="size-full object-cover"
              onLoad={() => setImageLoadError(false)}
              onError={() => setImageLoadError(true)}
            />
          ) : (
            initials
          )}
        </div>
      </div>

      {isEditing && (
        <>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarSelection}
            id="avatar-upload"
          />

          <Button
            type="button"
            variant="outline"
            disabled={disabled || isUploading}
            onClick={() =>
              document.getElementById("avatar-upload")?.click()
            }
            className="mb-4 h-9 gap-2 rounded-xl border-[var(--clay-border)] bg-[var(--clay-surface-warm)] text-xs text-[var(--clay-ink)] hover:bg-[var(--clay-peach)]"
          >
            {isUploading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Camera className="size-4" />
            )}

            {isUploading ? "Uploading..." : "Change picture"}
          </Button>

          <p className="mb-2 text-[11px] text-[var(--clay-subtle)]">
            JPG, PNG or WebP · Maximum 5 MB
          </p>

          {error && (
            <p className="mb-3 text-xs text-[var(--clay-coral-shadow)]">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}