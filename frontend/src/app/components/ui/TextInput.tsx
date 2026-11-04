"use client";

import * as React from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      required = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Fallback unique ID for label accessibility if no id is passed
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const isPassword = type === "password";
    const currentType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[var(--clay-ink)]"
          >
            {label}
            {required && (
              <span className="ml-1 text-[var(--clay-primary)]">*</span>
            )}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center justify-center text-[var(--clay-muted)]">
              {leftIcon}
            </div>
          )}

          {/* Core Input */}
          <input
            id={inputId}
            type={currentType}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={cn(
              "w-full rounded-xl border bg-[var(--clay-surface)] text-sm text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)]",
              "px-3.5 py-2.5 transition-all duration-200 ease-in-out",
              "shadow-[var(--clay-shadow-inset)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)]/35 focus:border-[var(--clay-primary)]",
              leftIcon ? "pl-10" : "",
              rightIcon || isPassword ? "pr-10" : "",
              error
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/25"
                : "border-[var(--clay-border)] hover:border-[var(--clay-peach-shadow)]",
              disabled &&
                "cursor-not-allowed opacity-60 bg-[var(--clay-surface-warm)]",
              className
            )}
            required={required}
            {...props}
          />

          {/* Right Icon / Password Toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3.5 flex items-center justify-center text-[var(--clay-muted)] transition-colors hover:text-[var(--clay-ink)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          ) : (
            rightIcon && (
              <div className="pointer-events-none absolute right-3.5 flex items-center justify-center text-[var(--clay-muted)]">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {/* Error Message or Helper Text */}
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1 flex items-center gap-1 text-xs text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-xs text-[var(--clay-muted)]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };