import type { LocalizedText } from "@/features/demo-engine/types";
import { isOfficeOpenAt } from "./hours";
import type { Quote, Settings } from "./types";

// Value tips are facts computed from the demo data. A fact exists only when the data justifies it:
// no data, no tip, and no invented numbers. The dashboard turns facts into text (dashboard/tip-texts.ts).
export type TipFact = {
  id: string;
  key: "afterHours" | "staleQuote" | "stuckShipment" | "fullWarehouse";
  label?: string | LocalizedText;
  at?: string;
  amount?: number;
};

const HOUR_MS = 60 * 60 * 1000;
export const STALE_QUOTE_HOURS = 24;

// Quotes that arrived outside office hours: without the website they would be missed calls. Newest first.
export function afterHoursFacts(
  quotes: readonly Quote[],
  settings: Pick<Settings, "officeOpen" | "officeClose">,
): TipFact[] {
  return [...quotes]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((quote) => !isOfficeOpenAt(new Date(quote.createdAt), settings.officeOpen, settings.officeClose))
    .map((quote) => ({
      id: `afterHours:${quote.id}`,
      key: "afterHours",
      label: quote.name,
      at: quote.createdAt,
    }));
}

// A new quote nobody answered for a day or more. Oldest first: it is the most urgent.
export function staleQuoteFacts(quotes: readonly Quote[], now: Date): TipFact[] {
  return quotes
    .filter((quote) => quote.status === "new")
    .map((quote) => ({
      quote,
      hours: Math.floor((now.getTime() - new Date(quote.createdAt).getTime()) / HOUR_MS),
    }))
    .filter(({ hours }) => hours >= STALE_QUOTE_HOURS)
    .sort((a, b) => b.hours - a.hours)
    .map(({ quote, hours }) => ({
      id: `staleQuote:${quote.id}`,
      key: "staleQuote",
      label: quote.name,
      amount: hours,
    }));
}
