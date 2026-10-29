"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, Trash2, Loader2 } from "lucide-react";

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

  // const handleFileUpload = async (file: File) => {
  //   if (!file) return;

  //   setIsUploading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const result = await uploadCvAction(formData);

  //     if (!result.success || !result.data?.path) {
  //       throw new Error(result.error?.message || "Failed to upload CV.");
  //     }

  //     onChange(result.data.path);

  //     toast.add({
  //       title: "CV Uploaded",
  //       description: "Your resume has been uploaded successfully.",
  //       type: "success",
  //     });
  //   } catch (error) {
  //     toast.add({
  //       title: "Upload Failed",
  //       description:
  //         error instanceof Error ? error.message : "Failed to upload file.",
  //       type: "error",
  //     });
  //   } finally {
  //     setIsUploading(false);
  //     if (fileInputRef.current) fileInputRef.current.value = "";
  //   }
  // };

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

    // Open synchronously so the browser doesn't block the new tab.
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
      // Support existing records that still contain a Supabase URL.
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

  return (
    <div>
      <Label className="block text-xs font-medium text-slate-300 mb-1.5">
        Upload CV / Resume (Optional)
      </Label>

      {value ? (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-200">
                {value.split("/").pop()?.split("?")[0] || "Uploaded_CV.pdf"}
              </p>

              <button
                type="button"
                onClick={handleViewDocument}
                disabled={disabled || isOpening}
                className="text-[11px] text-indigo-400 hover:underline disabled:opacity-50"
              >
                {isOpening ? "Opening document..." : "View Document"}
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
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400 disabled:opacity-50"
            title="Remove CV"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-950/80"
          } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
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
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
              <span className="text-xs text-slate-400">
                Uploading your CV...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 py-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-400">
                <UploadCloud className="h-5 w-5" />
              </div>

              <p className="text-xs font-medium text-slate-300">
                Click to upload{" "}
                <span className="text-slate-500">or drag and drop</span>
              </p>

              <p className="text-[10px] text-slate-500">
                PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
