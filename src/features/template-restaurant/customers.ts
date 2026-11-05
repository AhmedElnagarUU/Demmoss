import { phoneDigits } from "./phone";

// Customers are never stored: each variant lists the people behind its reservations, requests, or orders.
export type CustomerEntry = { name: string; phone: string; date: string };

export type Customer = { phone: string; name: string; count: number; lastDate: string };

// Groups entries by phone number. The name and date come from the most recent entry.
export function buildCustomers(entries: readonly CustomerEntry[]): Customer[] {
  const byPhone = new Map<string, Customer>();
  for (const entry of entries) {
    const key = phoneDigits(entry.phone);
    const known = byPhone.get(key);
    if (!known) {
      byPhone.set(key, { phone: entry.phone, name: entry.name, count: 1, lastDate: entry.date });
    } else if (entry.date > known.lastDate) {
      byPhone.set(key, {
        phone: entry.phone,
        name: entry.name,
        count: known.count + 1,
        lastDate: entry.date,
      });
    } else {
      byPhone.set(key, { ...known, count: known.count + 1 });
    }
  }
  return [...byPhone.values()].sort(
    (a, b) => b.lastDate.localeCompare(a.lastDate) || b.count - a.count || a.name.localeCompare(b.name),
  );
}
