
"use client";

import { useState } from "react";
import { X, Plus, Sparkles, Code2, Search } from "lucide-react";
import { getTechIconUrl } from "@/lib/tech.icon";

interface TechStackInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  selectedRole?: string;
}

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

const GLOBAL_TECH_POOL = Array.from(
  new Set(Object.values(ROLE_SUGGESTIONS).flat()),
);

function TechBadgeLogo({ techName }: { techName: string }) {
  const [hasError, setHasError] = useState(false);
  const iconUrl = getTechIconUrl(techName);

  if (hasError) {
    return (
      <Code2 className="size-3.5 shrink-0 text-[var(--clay-primary)]" />
    );
  }

  return (
    <img
      src={iconUrl}
      alt={`${techName} icon`}
      onError={() => setHasError(true)}
      className="size-3.5 shrink-0 object-contain"
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

  const defaultPool =
    ROLE_SUGGESTIONS[selectedRole] || ROLE_SUGGESTIONS["Frontend Developer"];

  const activePool = trimmedInput
    ? GLOBAL_TECH_POOL.filter((tech) =>
        tech.toLowerCase().includes(trimmedInput),
      )
    : defaultPool;

  const suggestions = activePool.filter(
    (item) => !value.some((val) => val.toLowerCase() === item.toLowerCase()),
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
    <div className="space-y-3">
      {/* Selected skills and input */}
      <div className="mt-1.5 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-3 shadow-[inset_3px_3px_7px_rgba(234,208,192,0.6),inset_-3px_-3px_7px_rgba(255,255,255,0.8)] transition-all focus-within:border-[var(--clay-primary)] focus-within:ring-4 focus-within:ring-[var(--clay-primary)]/10">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--clay-peach-shadow)] bg-[var(--clay-peach)] px-2.5 py-1.5 text-xs font-semibold text-[var(--clay-primary-ink)] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.45),0_2px_0_var(--clay-peach-shadow)] animate-in fade-in zoom-in-95 duration-150"
          >
            <TechBadgeLogo techName={tag} />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="ml-0.5 grid size-4 place-items-center rounded-md text-[var(--clay-muted)] transition hover:bg-[var(--clay-surface)] hover:text-[var(--clay-primary-ink)]"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          placeholder={
            value.length === 0
              ? "Type a technology and press Enter..."
              : "Add another skill..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-[150px] flex-1 bg-transparent px-1 py-1.5 text-xs font-medium text-[var(--clay-ink)] placeholder:text-[var(--clay-subtle)] focus:outline-none"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-[var(--clay-border)] bg-[var(--clay-surface)] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--clay-muted)]">
            {trimmedInput ? (
              <Search className="size-3.5 text-[var(--clay-primary)]" />
            ) : (
              <Sparkles className="size-3.5 text-[var(--clay-primary)]" />
            )}
            {trimmedInput ? "Matching technologies" : "Quick add"}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {suggestions.slice(0, 8).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addTag(item)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--clay-muted)] transition-all hover:border-[var(--clay-peach-shadow)] hover:bg-[var(--clay-peach)] hover:text-[var(--clay-primary-ink)] active:translate-y-px"
              >
                <TechBadgeLogo techName={item} />
                <span>{item}</span>
                <Plus className="size-3 text-[var(--clay-primary)]" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}