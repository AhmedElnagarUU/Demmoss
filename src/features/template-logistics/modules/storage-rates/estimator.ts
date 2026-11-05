import type { StorageRates } from "./types";

export type StorageInput = {
  pallets: number;
  months: number;
  ordersPerMonth: number;
  insurance: boolean;
};

export type StorageLineKey = "storage" | "handling" | "picking" | "insurance" | "minimum";
export type StorageLine = { key: StorageLineKey; amount: number };

export type StorageQuote = {
  lines: StorageLine[];
  discount: number;
  monthlyTotal: number;
  contractTotal: number;
};

function cents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function discountFor(rates: StorageRates, months: number): number {
  if (months >= 12) return rates.discount12Months;
  if (months >= 6) return rates.discount6Months;
  return 0;
}

// Monthly cost = pallets × pallet price (minus the long-contract discount) + handling
// + picking (orders per month × price per order) + insurance (a percent of storage) when chosen.
// The monthly total is never below the minimum monthly charge; the difference is shown as its own line.
export function estimateStorage(rates: StorageRates, input: StorageInput): StorageQuote | null {
  const pallets = Math.floor(input.pallets);
  const months = Math.floor(input.months);
  const orders = Math.max(Math.floor(input.ordersPerMonth) || 0, 0);
  if (!(pallets >= 1) || !(months >= 1)) return null;

  const discount = discountFor(rates, months);
  const storage = cents(pallets * rates.palletPerMonth * (1 - discount));
  const lines: StorageLine[] = [
    { key: "storage", amount: storage },
    { key: "handling", amount: cents(rates.handlingPerMonth) },
  ];
  if (orders > 0) lines.push({ key: "picking", amount: cents(orders * rates.pickingPerOrder) });
  if (input.insurance) lines.push({ key: "insurance", amount: cents((storage * rates.insurancePercent) / 100) });

  const subtotal = cents(lines.reduce((sum, line) => sum + line.amount, 0));
  if (subtotal < rates.minimumMonthly) {
    lines.push({ key: "minimum", amount: cents(rates.minimumMonthly - subtotal) });
  }
  const monthlyTotal = Math.max(subtotal, cents(rates.minimumMonthly));
  return { lines, discount, monthlyTotal, contractTotal: cents(monthlyTotal * months) };
}
