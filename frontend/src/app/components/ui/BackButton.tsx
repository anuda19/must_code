
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({
  label = "Go Back",
  className,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => router.back()}
      className={className}
    >
      <ArrowLeft className="mr-1 size-4" />
      {label}
    </Button>
  );
}