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
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    // Fallback unique ID for label accessibility if no id is passed
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-200"
          >
            {label}
            {required && <span className="ml-1 text-indigo-400">*</span>}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
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
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              "w-full rounded-lg bg-[#161a23] border text-sm text-slate-100 placeholder:text-slate-500",
              "py-2.5 px-3.5 transition duration-150 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
              leftIcon ? "pl-10" : "",
              rightIcon || isPassword ? "pr-10" : "",
              error
                ? "border-red-500/80 focus:ring-red-500"
                : "border-[#232838] hover:border-slate-700",
              disabled && "cursor-not-allowed opacity-50 bg-[#0e1117]",
              className
            )}
            required
            {...props}
          />

          {/* Right Icon / Password Toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3.5 flex items-center justify-center text-slate-400 hover:text-slate-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {/* Error Message or Helper Text */}
        {error ? (
          <p id={`${inputId}-error`} className="flex items-center gap-1 text-xs text-red-400 mt-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-slate-400 mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };