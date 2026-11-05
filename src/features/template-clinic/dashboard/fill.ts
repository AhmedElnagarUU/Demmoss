import type { LocalizedText } from "@/features/demo-engine/types";

// An empty language copies the other one, so the site never shows a blank.
export function fillText(text: LocalizedText): LocalizedText {
  return { ar: text.ar.trim() || text.en.trim(), en: text.en.trim() || text.ar.trim() };
}

export function hasText(text: LocalizedText): boolean {
  return text.ar.trim() !== "" || text.en.trim() !== "";
}
