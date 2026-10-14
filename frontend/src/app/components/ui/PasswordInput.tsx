// // src/components/ui/PasswordInput.tsx
// 'use client';

// import React, { useState, useMemo, useEffect, forwardRef } from 'react';
// import { Eye, EyeOff, Check, X } from 'lucide-react';

// export interface PasswordInputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   onValidChange?: (isValid: boolean) => void;
//   label?: string;
//   error?: string;
// }

// const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
//   (
//     {
//       value = '',
//       onChange,
//       onValidChange,
//       label = 'Password',
//       placeholder = 'Enter password',
//       error,
//       className = '',
//       ...props
//     },
//     ref
//   ) => {
//     const [showPassword, setShowPassword] = useState(false);
//     const stringValue = String(value ?? '');

//     const rules = useMemo(() => {
//       return [
//         { label: 'At least 8 characters', valid: stringValue.length >= 8 },
//         { label: 'One uppercase letter (A-Z)', valid: /[A-Z]/.test(stringValue) },
//         { label: 'One lowercase letter (a-z)', valid: /[a-z]/.test(stringValue) },
//         { label: 'One number (0-9)', valid: /[0-9]/.test(stringValue) },
//         { label: 'One special character (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(stringValue) },
//       ];
//     }, [stringValue]);

//     const isValid = useMemo(() => rules.every((r) => r.valid), [rules]);

//     useEffect(() => {
//       onValidChange?.(isValid);
//     }, [isValid, onValidChange]);

//     return (
//       <div className="space-y-2 w-full">
//         {label && (
//           <label htmlFor={props.id} className="block text-sm font-medium text-gray-300">
//             {label}
//           </label>
//         )}

//         <div className="relative">
//           <input
//             {...props}
//             ref={ref}
//             value={stringValue}
//             onChange={onChange} // Directly pass the event back to React Hook Form
//             type={showPassword ? 'text' : 'password'}
//             placeholder={placeholder}
//             className={`w-full px-3.5 py-2.5 pr-10 rounded-lg bg-[#161a23] border ${
//               error ? 'border-red-500' : 'border-[#232838]'
//             } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all ${className}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
//             aria-label={showPassword ? 'Hide password' : 'Show password'}
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {error && <p className="text-xs text-red-400">{error}</p>}

//         {stringValue.length > 0 && (
//           <div className="mt-2 space-y-1.5 rounded-lg border border-[#232838] bg-[#12151d] p-3">
//             {rules.map((rule, idx) => (
//               <div key={idx} className="flex items-center gap-2 text-xs">
//                 {rule.valid ? (
//                   <Check size={14} className="text-emerald-400 shrink-0" />
//                 ) : (
//                   <X size={14} className="text-rose-400 shrink-0" />
//                 )}
//                 <span className={rule.valid ? 'text-gray-300' : 'text-gray-500'}>
//                   {rule.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// PasswordInput.displayName = 'PasswordInput';

// export default PasswordInput;

// src/components/ui/PasswordInput.tsx
'use client';

import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValidChange?: (isValid: boolean) => void;
  label?: string;
  error?: string;
  showRequirements?: boolean; // Added control prop
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
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-300">
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
            className={`w-full px-3.5 py-2.5 pr-10 rounded-lg bg-[#161a23] border ${
              error ? 'border-red-500' : 'border-[#232838]'
            } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all ${className}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        {/* Hide checklist on confirm password field */}
        {showRequirements && stringValue.length > 0 && (
          <div className="mt-2 space-y-1.5 rounded-lg border border-[#232838] bg-[#12151d] p-3">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                {rule.valid ? (
                  <Check size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <X size={14} className="text-rose-400 shrink-0" />
                )}
                <span className={rule.valid ? 'text-gray-300' : 'text-gray-500'}>
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