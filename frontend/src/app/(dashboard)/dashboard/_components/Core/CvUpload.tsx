// "use client";

// import { useRef, useState } from "react";
// import { UploadCloud, FileText, Trash2, Loader2, CheckCircle2 } from "lucide-react";

// import { Label } from "@/app/components/ui/Label";
// import { toast } from "@/components/ui/toast";
// import {
//   getCvSignedUrlAction,
//   uploadCvAction,
// } from "@/actions/users/upload-cv";

// interface CvUploadProps {
//   value: string;
//   onChange: (path: string) => void;
//   onFileSelected: (file: File | null) => void;
//   disabled?: boolean;
// }

// export function CvUpload({
//   value,
//   onChange,
//   onFileSelected,
//   disabled = false,
// }: CvUploadProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isOpening, setIsOpening] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   const handleFileUpload = async (file: File) => {
//     const extension = file.name.split(".").pop()?.toLowerCase();

//     if (!["pdf", "docx"].includes(extension ?? "")) {
//       toast.add({
//         title: "Unsupported File",
//         description: "Please upload a PDF or DOCX file.",
//         type: "error",
//       });
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.add({
//         title: "File Too Large",
//         description: "CV must be 5MB or smaller.",
//         type: "error",
//       });
//       return;
//     }

//     setIsUploading(true);
//     onFileSelected(file);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const result = await uploadCvAction(formData);

//       if (!result.success || !result.data?.path) {
//         throw new Error(result.error?.message || "Failed to upload CV.");
//       }

//       onChange(result.data.path);

//       toast.add({
//         title: "CV Uploaded",
//         description: "Your resume has been uploaded successfully.",
//         type: "success",
//       });
//     } catch (error) {
//       onFileSelected(null);

//       toast.add({
//         title: "Upload Failed",
//         description:
//           error instanceof Error ? error.message : "Failed to upload file.",
//         type: "error",
//       });
//     } finally {
//       setIsUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const handleViewDocument = async () => {
//     if (!value || isOpening) return;

//     const newTab = window.open("about:blank", "_blank");

//     if (!newTab) {
//       toast.add({
//         title: "Popup Blocked",
//         description: "Allow popups to open your CV.",
//         type: "error",
//       });
//       return;
//     }

//     newTab.opener = null;
//     setIsOpening(true);

//     try {
//       let path = value;

//       if (/^https?:\/\//i.test(value)) {
//         const url = new URL(value);
//         const match = url.pathname.match(
//           /\/storage\/v1\/object\/(?:public|sign|authenticated)\/resume\/(.+)$/,
//         );

//         if (!match) {
//           throw new Error("The saved CV URL is invalid.");
//         }

//         path = decodeURIComponent(match[1]);
//       }

//       const result = await getCvSignedUrlAction(path);

//       if (!result.success || !result.data?.signedUrl) {
//         throw new Error(result.error?.message || "Could not open CV.");
//       }

//       newTab.location.replace(result.data.signedUrl);
//     } catch (error) {
//       newTab.close();

//       toast.add({
//         title: "Unable to Open CV",
//         description:
//           error instanceof Error ? error.message : "Could not open CV.",
//         type: "error",
//       });
//     } finally {
//       setIsOpening(false);
//     }
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (!disabled && e.dataTransfer.files[0]) {
//       void handleFileUpload(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-2 flex items-center justify-between gap-3">
//         <Label className="block text-xs font-semibold text-[var(--clay-ink)]">
//           Upload CV / Resume{" "}
//           <span className="font-normal text-[var(--clay-subtle)]">
//             (Optional)
//           </span>
//         </Label>

//         <span className="rounded-full bg-[var(--clay-green-surface)] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--clay-green-ink)]">
//           PDF / DOCX
//         </span>
//       </div>

//       {value ? (
//         <div className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-green-surface)] p-3.5 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.75),inset_-3px_-3px_8px_rgba(189,207,155,0.35)]">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--clay-sage-shadow)] bg-[var(--clay-surface)] shadow-[0_3px_0_var(--clay-sage-shadow)]">
//               <FileText className="size-5 text-[var(--clay-sage-ink)]" />
//             </div>

//             <div className="min-w-0">
//               <div className="flex items-center gap-1.5">
//                 <CheckCircle2 className="size-3.5 shrink-0 text-[var(--clay-status)]" />
//                 <p className="truncate text-xs font-semibold text-[var(--clay-ink)]">
//                   {value.split("/").pop()?.split("?")[0] || "Uploaded_CV.pdf"}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleViewDocument}
//                 disabled={disabled || isOpening}
//                 className="mt-1 text-[11px] font-semibold text-[var(--clay-sage-ink)] underline decoration-[var(--clay-sage-shadow)] underline-offset-2 transition hover:opacity-75 disabled:opacity-50"
//               >
//                 {isOpening ? "Opening document..." : "View document"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               onChange("");
//               onFileSelected(null);
//             }}
//             disabled={disabled || isOpening}
//             className="grid size-9 shrink-0 place-items-center rounded-xl border border-transparent text-[var(--clay-muted)] transition hover:border-[#e8b4a2] hover:bg-[#fbe7dd] hover:text-[#a34d37] disabled:opacity-50"
//             title="Remove CV"
//             aria-label="Remove CV"
//           >
//             <Trash2 className="size-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//           onClick={() => !disabled && fileInputRef.current?.click()}
//           className={`group relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-200 ${
//             dragActive
//               ? "border-[var(--clay-primary)] bg-[var(--clay-peach)]/40 shadow-[inset_4px_4px_10px_rgba(216,102,73,0.08)]"
//               : "border-[var(--clay-border)] bg-[var(--clay-surface-warm)] hover:border-[var(--clay-peach-shadow)] hover:bg-[var(--clay-peach)]/20"
//           } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="hidden"
//             disabled={disabled}
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) void handleFileUpload(file);
//             }}
//           />

//           {isUploading ? (
//             <div className="flex flex-col items-center gap-3 py-2">
//               <div className="grid size-11 place-items-center rounded-2xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] shadow-[0_4px_0_var(--clay-peach-shadow)]">
//                 <Loader2 className="size-5 animate-spin text-[var(--clay-primary-ink)]" />
//               </div>
//               <span className="text-xs font-medium text-[var(--clay-muted)]">
//                 Uploading your CV...
//               </span>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center gap-2">
//               <div className="grid size-11 place-items-center rounded-2xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] text-[var(--clay-primary-ink)] shadow-[inset_3px_3px_7px_rgba(255,255,255,0.65),0_4px_0_var(--clay-peach-shadow)] transition-transform duration-200 group-hover:-translate-y-0.5">
//                 <UploadCloud className="size-5" />
//               </div>

//               <p className="text-xs font-semibold text-[var(--clay-ink)]">
//                 Click to upload{" "}
//                 <span className="font-normal text-[var(--clay-muted)]">
//                   or drag and drop
//                 </span>
//               </p>

//               <p className="text-[10px] text-[var(--clay-subtle)]">
//                 PDF, DOC, DOCX · Maximum size 5MB
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { Label } from "@/app/components/ui/Label";
import { toast } from "@/components/ui/toast";
import {
  getCvSignedUrlAction,
  uploadCvAction,
} from "@/actions/users/upload-cv";

interface CvUploadProps {
  value: string;
  onChange: (path: string) => void;
  onFileSelected: (file: File | null) => void;
  disabled?: boolean;
}

export function CvUpload({
  value,
  onChange,
  onFileSelected,
  disabled = false,
}: CvUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "docx"].includes(extension ?? "")) {
      toast.add({
        title: "Unsupported File",
        description: "Please upload a PDF or DOCX file.",
        type: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "File Too Large",
        description: "CV must be 5MB or smaller.",
        type: "error",
      });
      return;
    }

    setIsUploading(true);
    onFileSelected(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadCvAction(formData);

      if (!result.success || !result.data?.path) {
        throw new Error(result.error?.message || "Failed to upload CV.");
      }

      onChange(result.data.path);

      toast.add({
        title: "CV Uploaded",
        description: "Your resume has been uploaded successfully.",
        type: "success",
      });
    } catch (error) {
      onFileSelected(null);

      toast.add({
        title: "Upload Failed",
        description:
          error instanceof Error ? error.message : "Failed to upload file.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleViewDocument = async () => {
    if (!value || isOpening) return;

    const newTab = window.open("about:blank", "_blank");

    if (!newTab) {
      toast.add({
        title: "Popup Blocked",
        description: "Allow popups to open your CV.",
        type: "error",
      });
      return;
    }

    newTab.opener = null;
    setIsOpening(true);

    try {
      let path = value;

      if (/^https?:\/\//i.test(value)) {
        const url = new URL(value);
        const match = url.pathname.match(
          /\/storage\/v1\/object\/(?:public|sign|authenticated)\/resume\/(.+)$/,
        );

        if (!match) {
          throw new Error("The saved CV URL is invalid.");
        }

        path = decodeURIComponent(match[1]);
      }

      const result = await getCvSignedUrlAction(path);

      if (!result.success || !result.data?.signedUrl) {
        throw new Error(result.error?.message || "Could not open CV.");
      }

      newTab.location.replace(result.data.signedUrl);
    } catch (error) {
      newTab.close();

      toast.add({
        title: "Unable to Open CV",
        description:
          error instanceof Error ? error.message : "Could not open CV.",
        type: "error",
      });
    } finally {
      setIsOpening(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!disabled && e.dataTransfer.files[0]) {
      void handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const fileName =
    value.split("/").pop()?.split("?")[0] || "Uploaded_CV.pdf";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <Label className="block text-xs font-semibold text-foreground">
          Upload CV / Resume{" "}
          <span className="font-normal text-muted-foreground">
            (Optional)
          </span>
        </Label>

        <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
          PDF / DOCX
        </span>
      </div>

      {value ? (
        <div className="group flex items-center justify-between gap-3 rounded-2xl border border-success/25 bg-success/5 p-3.5 transition-colors hover:bg-success/10">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-success/20 bg-card text-success">
              <FileText className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-success" />
                <p className="truncate text-xs font-semibold text-foreground">
                  {fileName}
                </p>
              </div>

              <button
                type="button"
                onClick={handleViewDocument}
                disabled={disabled || isOpening}
                className="mt-1 text-[11px] font-semibold text-success underline decoration-success/30 underline-offset-2 transition-colors hover:text-foreground disabled:opacity-50"
              >
                {isOpening ? "Opening document..." : "View document"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onChange("");
              onFileSelected(null);
            }}
            disabled={disabled || isOpening}
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-transparent text-muted-foreground transition-colors hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
            title="Remove CV"
            aria-label="Remove CV"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`group relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-200 ${
            dragActive
              ? "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_var(--primary)]"
              : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            disabled={disabled}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFileUpload(file);
            }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="grid size-11 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Loader2 className="size-5 animate-spin" />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Uploading your CV...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-11 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-primary/15">
                <UploadCloud className="size-5" />
              </div>

              <p className="text-xs font-semibold text-foreground">
                Click to upload{" "}
                <span className="font-normal text-muted-foreground">
                  or drag and drop
                </span>
              </p>

              <p className="text-[10px] text-muted-foreground">
                PDF, DOC, DOCX · Maximum size 5MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}