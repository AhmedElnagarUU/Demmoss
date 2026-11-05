import { phoneDigits } from "@/features/demo-engine/format/phone";
import type { Quote } from "./types";

// Clients are never stored: they are the people behind the quotes, grouped by phone number.
export type Client = { phone: string; name: string; company: string; count: number; lastAt: string };

// The name and company come from the most recent quote.
export function buildClients(quotes: readonly Quote[]): Client[] {
  const byPhone = new Map<string, Client>();
  for (const quote of quotes) {
    const key = phoneDigits(quote.phone);
    const known = byPhone.get(key);
    if (!known) {
      byPhone.set(key, {
        phone: quote.phone,
        name: quote.name,
        company: quote.company,
        count: 1,
        lastAt: quote.createdAt,
      });
    } else if (quote.createdAt > known.lastAt) {
      byPhone.set(key, {
        phone: quote.phone,
        name: quote.name,
        company: quote.company,
        count: known.count + 1,
        lastAt: quote.createdAt,
      });
    } else {
      byPhone.set(key, { ...known, count: known.count + 1 });
    }
  }
  return [...byPhone.values()].sort(
    (a, b) => b.lastAt.localeCompare(a.lastAt) || a.name.localeCompare(b.name),
  );
}
