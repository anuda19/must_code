// "use client";

// import { useState } from "react";
// import { X, Plus, Sparkles } from "lucide-react";

// interface TechStackInputProps {
//   value: string[];
//   onChange: (tags: string[]) => void;
//   selectedRole?: string;
// }

// // Smart suggestions dictionary keyed by role
// const ROLE_SUGGESTIONS: Record<string, string[]> = {
//   "Frontend Developer": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Zod", "GraphQL"],
//   "Backend Engineer": ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "Python", "Django", "Flask"],
//   "Full Stack Engineer": ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
//   "Mobile App Engineer (React Native/Flutter)": ["React Native", "Flutter", "TypeScript", "Dart", "Redux", "Zustand"],
//   "DevOps / Infrastructure Engineer": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "GitHub Actions"],
//   "System Architect": ["System Design", "Microservices", "Kafka", "Redis", "Distributed Systems", "GraphQL"],
// };

// export function TechStackInput({
//   value,
//   onChange,
//   selectedRole = "",
// }: TechStackInputProps) {
//   const [input, setInput] = useState("");

//   const suggestions = (ROLE_SUGGESTIONS[selectedRole] || ROLE_SUGGESTIONS["Frontend Developer"]).filter(
//     (item) => !value.includes(item)
//   );

//   const addTag = (tagToAdd: string) => {
//     const trimmed = tagToAdd.trim().replace(/,/g, "");
//     if (trimmed && !value.includes(trimmed)) {
//       onChange([...value, trimmed]);
//     }
//     setInput("");
//   };

//   const removeTag = (tagToRemove: string) => {
//     onChange(value.filter((t) => t !== tagToRemove));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       addTag(input);
//     } else if (e.key === "Backspace" && !input && value.length > 0) {
//       removeTag(value[value.length - 1]);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-2.5 focus-within:border-indigo-500/80 transition-colors">
//         {value.map((tag) => (
//           <span
//             key={tag}
//             className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 animate-in fade-in zoom-in-95 duration-150"
//           >
//             {tag}
//             <button
//               type="button"
//               onClick={() => removeTag(tag)}
//               className="rounded p-0.5 hover:bg-indigo-500/20 text-indigo-400 hover:text-white"
//             >
//               <X className="h-3 w-3" />
//             </button>
//           </span>
//         ))}

//         <input
//           type="text"
//           placeholder={value.length === 0 ? "Type tech & press Enter..." : "Add more..."}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="flex-1 bg-transparent px-1 text-sm text-white placeholder:text-slate-600 focus:outline-none min-w-[120px]"
//         />
//       </div>

//       {/* Auto Suggestions */}
//       {suggestions.length > 0 && (
//         <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs text-slate-400">
//           <span className="flex items-center gap-1 text-[11px] text-slate-500">
//             <Sparkles className="h-3 w-3 text-indigo-400" /> Suggested:
//           </span>
//           {suggestions.slice(0, 4).map((item) => (
//             <button
//               key={item}
//               type="button"
//               onClick={() => addTag(item)}
//               className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-0.5 text-[11px] text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
//             >
//               <Plus className="h-2.5 w-2.5 text-indigo-400" />
//               {item}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { X, Plus, Sparkles, Code2, Search } from "lucide-react";
import { getTechIconUrl } from "@/lib/tech.icon";

interface TechStackInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  selectedRole?: string;
}

// Role-based Technology Suggestions
export const ROLE_SUGGESTIONS: Record<string, string[]> = {
  "Frontend Developer": [
    "React",
    "TypeScript",
    "Next.js",
    "Vue",
    "Angular",
    "Svelte",
    "Tailwind CSS",
    "Redux",
    "HTML5/CSS3",
    "GraphQL",
  ],
  "Backend Engineer": [
    "Node.js",
    "NestJS",
    "Python",
    "Java",
    "Go",
    "Rust",
    "C++",
    "FastAPI",
    "Spring Boot",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],
  "Full Stack Engineer": [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Vue",
    "Angular",
    "PostgreSQL",
    "Tailwind CSS",
    "Prisma",
  ],
  "Mobile App Engineer (React Native/Flutter)": [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "TypeScript",
    "Dart",
    "iOS",
    "Android",
  ],
  "DevOps / Infrastructure Engineer": [
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Ansible",
    "Linux",
    "CI/CD",
    "GitHub Actions",
    "Python",
    "Go",
  ],
  "System Architect": [
    "System Design",
    "Microservices",
    "Kafka",
    "Redis",
    "Go",
    "Java",
    "Rust",
    "Kubernetes",
    "PostgreSQL",
  ],
};

// Global pool of technologies for dynamic search fallback
const GLOBAL_TECH_POOL = Array.from(
  new Set(Object.values(ROLE_SUGGESTIONS).flat())
);

function TechBadgeLogo({ techName }: { techName: string }) {
  const [hasError, setHasError] = useState(false);
  const iconUrl = getTechIconUrl(techName);

  if (hasError) {
    return <Code2 className="h-3.5 w-3.5 shrink-0 text-indigo-400" />;
  }

  return (
    <img
      src={iconUrl}
      alt={`${techName} icon`}
      onError={() => setHasError(true)}
      className="h-3.5 w-3.5 shrink-0 object-contain"
    />
  );
}

export function TechStackInput({
  value,
  onChange,
  selectedRole = "Frontend Developer",
}: TechStackInputProps) {
  const [input, setInput] = useState("");

  const trimmedInput = input.trim().toLowerCase();

  // 1. Role-default pool when input is empty
  const defaultPool =
    ROLE_SUGGESTIONS[selectedRole] || ROLE_SUGGESTIONS["Frontend Developer"];

  // 2. If user types, filter across the global technology list; otherwise show role defaults
  const activePool = trimmedInput
    ? GLOBAL_TECH_POOL.filter((tech) =>
        tech.toLowerCase().includes(trimmedInput)
      )
    : defaultPool;

  // 3. Exclude items already added to badges
  const suggestions = activePool.filter(
    (item) => !value.some((val) => val.toLowerCase() === item.toLowerCase())
  );

  const addTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().replace(/,/g, "");
    if (
      trimmed &&
      !value.some((val) => val.toLowerCase() === trimmed.toLowerCase())
    ) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Active Badges & Input Box */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-2.5 mt-1.5 transition-colors focus-within:border-indigo-500/80">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 animate-in fade-in zoom-in-95 duration-150"
          >
            <TechBadgeLogo techName={tag} />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded p-0.5 text-indigo-400 hover:bg-indigo-500/20 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          placeholder={
            value.length === 0
              ? "Type tech (e.g. Angular, Python, Rust) & press Enter..."
              : "Add tech..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-[160px] flex-1 bg-transparent px-1 text-sm text-white placeholder:text-slate-600 focus:outline-none"
        />
      </div>

      {/* Filtered Suggestions Strip (Horizontal Scroll Hidden) */}
      {suggestions.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs text-slate-400 scrollbar-none [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-slate-500">
            {trimmedInput ? (
              <Search className="h-3 w-3 text-indigo-400" />
            ) : (
              <Sparkles className="h-3 w-3 text-indigo-400" />
            )}
            {trimmedInput ? "Matching Tech:" : "Quick Add:"}
          </span>

          {suggestions.slice(0, 8).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => addTag(item)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <TechBadgeLogo techName={item} />
              <Plus className="h-2.5 w-2.5 text-indigo-400" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}