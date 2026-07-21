import type { PreReviewsSection } from "@/types/course";

export function parsePreReviewsSection(
  value: unknown
): PreReviewsSection | null {
  if (!value) return null;

  if (typeof value === "string") {
    try {
      return parsePreReviewsSection(JSON.parse(value));
    } catch {
      return null;
    }
  }

  if (typeof value === "object" && value !== null && "content" in value) {
    const content = (value as { content?: unknown }).content;
    if (typeof content === "string" && content.trim()) {
      return { content };
    }
  }

  return null;
}
