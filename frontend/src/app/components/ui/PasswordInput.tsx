'use client';

import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValidChange?: (isValid: boolean) => void;
  label?: string;
  error?: string;
  showRequirements?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value = '',
      onChange,
      onValidChange,
      label = 'Password',
      placeholder = 'Enter password',
      error,
      showRequirements = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const stringValue = String(value ?? '');

    const rules = useMemo(() => {
      return [
        { label: 'At least 8 characters', valid: stringValue.length >= 8 },
        { label: 'One uppercase letter (A-Z)', valid: /[A-Z]/.test(stringValue) },
        { label: 'One lowercase letter (a-z)', valid: /[a-z]/.test(stringValue) },
        { label: 'One number (0-9)', valid: /[0-9]/.test(stringValue) },
        { label: 'One special character (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(stringValue) },
      ];
    }, [stringValue]);

    const isValid = useMemo(() => rules.every((r) => r.valid), [rules]);

    useEffect(() => {
      onValidChange?.(isValid);
    }, [isValid, onValidChange]);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-[var(--clay-ink)]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            {...props}
            ref={ref}
            value={stringValue}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full rounded-lg border bg-[var(--clay-surface-warm)] px-3.5 py-2.5 pr-10 text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] clay-inset transition-all focus:border-[var(--clay-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)]/20 ${
              error
                ? 'border-[#d86649]'
                : 'border-[var(--clay-border)]'
            } ${className}`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--clay-muted)] transition-colors hover:text-[var(--clay-ink)] focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-xs text-[#b4533d]">
            {error}
          </p>
        )}

        {/* Hide checklist on confirm password field */}
        {showRequirements && stringValue.length > 0 && (
          <div className="mt-2 space-y-1.5 rounded-lg border border-[var(--clay-border)] bg-[var(--clay-surface)] p-3 clay-raised">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                {rule.valid ? (
                  <Check
                    size={14}
                    className="shrink-0 text-[var(--clay-status)]"
                  />
                ) : (
                  <X
                    size={14}
                    className="shrink-0 text-[#d86649]"
                  />
                )}

                <span
                  className={
                    rule.valid
                      ? 'text-[var(--clay-sage-ink)]'
                      : 'text-[var(--clay-muted)]'
                  }
                >
                  {rule.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;