// Mapping for technologies where the Simple Icons slug differs from the standard lowercase name
const TECH_SLUG_MAP: Record<string, { slug: string; color?: string }> = {
  "next.js": { slug: "nextdotjs", color: "white" },
  "node.js": { slug: "nodedotjs", color: "5FA04E" },
  "express.js": { slug: "express", color: "white" },
  "vue": { slug: "vuedotjs", color: "4FC08D" },
  "vue.js": { slug: "vuedotjs", color: "4FC08D" },
  "c++": { slug: "cplusplus", color: "00599C" },
  "c#": { slug: "csharp", color: "512BD4" },
  "html5/css3": { slug: "html5", color: "E34F26" },
  "tailwind css": { slug: "tailwindcss", color: "06B6D4" },
  "spring boot": { slug: "springboot", color: "6DB33F" },
  "aws": { slug: "amazonwebservices", color: "FF9900" },
  "github actions": { slug: "githubactions", color: "2088FF" },
  "system design": { slug: "diagramsdotnet", color: "F08705" },
};

export function getTechIconUrl(techName: string): string {
  const normalized = techName.trim().toLowerCase();
  const mapped = TECH_SLUG_MAP[normalized];

  if (mapped) {
    return `https://cdn.simpleicons.org/${mapped.slug}${mapped.color ? `/${mapped.color}` : ""}`;
  }

  // Clean formatting for standard names (e.g., "React" -> "react", "TypeScript" -> "typescript")
  const cleanSlug = normalized.replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${cleanSlug}`;
}