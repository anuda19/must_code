"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CreateInterviewDrawer } from "./CreateInterDrawer";

interface StartButtonProps {
  userProfile?: {
    jobRole?: string;
    experienceLevel?: string;
    skills?: string[];
    targetCompanies?: string[];
  };
}

export default function StartButton({ userProfile }: StartButtonProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="flex w-full items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-sm font-medium text-indigo-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/20"
      >
        <span className="flex items-center gap-2">
          {/* <Sparkles className="h-4 w-4 text-indigo-400" /> */}
          Setup AI Interview
        </span>
        <ArrowUpRight className="h-4 w-4" />
      </button>

      {/* Offcanvas Drawer */}
      <CreateInterviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialData={{
          jobRole: userProfile?.jobRole,
          experienceLevel: userProfile?.experienceLevel,
          skills: userProfile?.skills,
          targetCompany: userProfile?.targetCompanies?.[0],
        }}
      />
    </>
  );
}