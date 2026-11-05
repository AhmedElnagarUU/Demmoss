import type { LocalizedText } from "@/features/demo-engine/types";
import { lastUnitProperties } from "./availability";
import type { Inquiry, Property, Viewing } from "./types";

// Value tips are facts computed from the demo data. A fact exists only when the data justifies it:
// no data, no tip, and no invented numbers. The dashboard turns facts into text (dashboard/tip-texts.ts).
export type TipFact = {
  id: string;
  key: "viewingWaiting" | "inquiryWaiting" | "hotProperty" | "lastUnit";
  label?: string | LocalizedText;
  count?: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function waitingMoreThanADay(createdAt: string, now: Date): boolean {
  return now.getTime() - new Date(createdAt).getTime() > DAY_MS;
}

// A request nobody answered for more than a day: the client probably called another agency. Oldest first.
export function waitingViewingFacts(viewings: readonly Viewing[], now: Date): TipFact[] {
  return viewings
    .filter((viewing) => viewing.status === "new" && waitingMoreThanADay(viewing.createdAt, now))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((viewing) => ({ id: `viewingWaiting:${viewing.id}`, key: "viewingWaiting", label: viewing.name }));
}

export function waitingInquiryFacts(inquiries: readonly Inquiry[], now: Date): TipFact[] {
  return inquiries
    .filter((inquiry) => inquiry.status === "new" && waitingMoreThanADay(inquiry.createdAt, now))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((inquiry) => ({ id: `inquiryWaiting:${inquiry.id}`, key: "inquiryWaiting", label: inquiry.name }));
}

// The property people ask to see most (at least two viewing requests that were not cancelled).
export function hotPropertyFacts(viewings: readonly Viewing[], properties: readonly Property[]): TipFact[] {
  const counts = new Map<string, number>();
  for (const viewing of viewings) {
    if (!viewing.propertyId || viewing.status === "cancelled") continue;
    counts.set(viewing.propertyId, (counts.get(viewing.propertyId) ?? 0) + 1);
  }
  const best = properties
    .map((property) => ({ property, count: counts.get(property.id) ?? 0 }))
    .filter((entry) => entry.count >= 2)
    .sort((a, b) => b.count - a.count)[0];
  if (!best) return [];
  return [
    {
      id: `hotProperty:${best.property.id}`,
      key: "hotProperty",
      label: best.property.title,
      count: best.count,
    },
  ];
}

export function lastUnitFacts(properties: readonly Property[]): TipFact[] {
  return lastUnitProperties(properties).map((property) => ({
    id: `lastUnit:${property.id}`,
    key: "lastUnit",
    label: property.title,
  }));
}

type TipData = {
  viewings: readonly Viewing[];
  inquiries: readonly Inquiry[];
  properties: readonly Property[];
};

export function allTipFacts(data: TipData, now: Date): TipFact[] {
  return [
    ...waitingViewingFacts(data.viewings, now),
    ...waitingInquiryFacts(data.inquiries, now),
    ...hotPropertyFacts(data.viewings, data.properties),
    ...lastUnitFacts(data.properties),
  ];
}
