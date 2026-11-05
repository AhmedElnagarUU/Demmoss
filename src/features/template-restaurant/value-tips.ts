import type { LocalizedText } from "@/features/demo-engine/types";
import { isOpenAt } from "./hours";
import type { Menu, OpeningDay } from "./types";

// Value tips are facts computed from the demo data. A fact exists only when the data justifies it:
// no data, no tip, and no invented numbers. The dashboard turns facts into text (dashboard/tip-texts.ts).
export type TipFact = {
  id: string;
  key: "afterHours" | "noShow" | "eventWaiting" | "emptyCategory";
  label?: string | LocalizedText;
  at?: string;
};

type Timed = { id: string; name: string; createdAt: string };

// Requests that arrived while the restaurant was closed: without the website they would be missed calls.
// Newest first.
export function afterHoursFacts(entries: readonly Timed[], hours: readonly OpeningDay[]): TipFact[] {
  return [...entries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((entry) => !isOpenAt(hours, new Date(entry.createdAt)))
    .map((entry) => ({
      id: `afterHours:${entry.id}`,
      key: "afterHours",
      label: entry.name,
      at: entry.createdAt,
    }));
}

// A category the guests would see as empty (no dish is available).
export function emptyCategoryFacts(menu: Menu): TipFact[] {
  return menu.categories
    .filter((category) => !menu.items.some((item) => item.categoryId === category.id && item.available))
    .map((category) => ({ id: `emptyCategory:${category.id}`, key: "emptyCategory", label: category.name }));
}
