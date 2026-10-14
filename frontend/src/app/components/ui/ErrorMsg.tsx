import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils" // ya aapka cn utility path

interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FieldError({ message, className, ...props }: FieldErrorProps) {
  if (!message) return null

  return (
    <p
      className={cn(
        "m-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500 animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  )
}