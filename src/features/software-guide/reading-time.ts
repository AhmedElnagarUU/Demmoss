import type { GuideContent } from "./types";

const WORDS_PER_MINUTE = 200;

function wordsIn(value: unknown): number {
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + wordsIn(item), 0);
  if (typeof value === "object" && value !== null) {
    return Object.values(value).reduce((sum: number, item) => sum + wordsIn(item), 0);
  }
  return 0;
}

/** Minutes to read the guide, from the real word count of what the visitor reads (not the page chrome). */
export function readingMinutes(content: GuideContent): number {
  const readable = Object.entries(content).filter(([key]) => key !== "meta" && key !== "menu");
  return Math.max(1, Math.ceil(wordsIn(readable) / WORDS_PER_MINUTE));
}
