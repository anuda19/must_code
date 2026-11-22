
"use client";

import { useState } from "react";
import { X, Plus, Code2, Search } from "lucide-react";
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
    return <Code2 className="size-3.5 shrink-0 text-primary" />;
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
      <div className="mt-1.5 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-3 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex animate-in items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary fade-in zoom-in-95 duration-150"
          >
            <TechBadgeLogo techName={tag} />

            <span>{tag}</span>

            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="ml-0.5 grid size-4 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-destructive"
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
          className="min-w-[150px] flex-1 bg-transparent px-1 py-1.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {trimmedInput && (
              <Search className="size-3.5 text-primary" />
            )}

            {trimmedInput ? "Matching technologies" : "Quick add"}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {suggestions.slice(0, 8).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addTag(item)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:translate-y-px"
              >
                <TechBadgeLogo techName={item} />

                <span>{item}</span>

                <Plus className="size-3 text-primary" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}