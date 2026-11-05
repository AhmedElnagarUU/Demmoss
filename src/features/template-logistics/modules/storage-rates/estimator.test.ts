import { describe, expect, it } from "vitest";
import { estimateStorage } from "./estimator";
import type { StorageRates } from "./types";

const rates: StorageRates = {
  palletPerMonth: 40,
  discount6Months: 0.08,
  discount12Months: 0.15,
  handlingPerMonth: 150,
  pickingPerOrder: 3.5,
  insurancePercent: 2,
  minimumMonthly: 1200,
};

const base = { pallets: 40, months: 3, ordersPerMonth: 0, insurance: false };
const amount = (quote: ReturnType<typeof estimateStorage>, key: string) =>
  quote?.lines.find((line) => line.key === key)?.amount;

describe("L7: storage estimator", () => {
  it("monthly cost is pallets × price + handling, and the contract total is that × months", () => {
    const quote = estimateStorage(rates, base);
    expect(quote).toMatchObject({ discount: 0, monthlyTotal: 1750, contractTotal: 5250 });
  });

  it("long contracts get a discount on storage only: 8% from 6 months, 15% from 12", () => {
    expect(estimateStorage(rates, { ...base, months: 5 })?.discount).toBe(0);
    expect(amount(estimateStorage(rates, { ...base, months: 6 }), "storage")).toBe(1472);
    expect(amount(estimateStorage(rates, { ...base, months: 12 }), "storage")).toBe(1360);
    expect(amount(estimateStorage(rates, { ...base, months: 12 }), "handling")).toBe(150);
  });

  it("picking is orders per month × price per order and only appears when there are orders", () => {
    expect(amount(estimateStorage(rates, base), "picking")).toBeUndefined();
    const quote = estimateStorage(rates, { ...base, ordersPerMonth: 300 });
    expect(amount(quote, "picking")).toBe(1050);
    expect(quote?.monthlyTotal).toBe(2800);
  });

  it("insurance is a percent of the storage cost", () => {
    const quote = estimateStorage(rates, { ...base, insurance: true });
    expect(amount(quote, "insurance")).toBe(32);
    expect(quote?.monthlyTotal).toBe(1782);
  });

  it("never goes below the minimum monthly charge, and shows the top-up as its own line", () => {
    const quote = estimateStorage(rates, { ...base, pallets: 5 });
    expect(quote?.monthlyTotal).toBe(1200);
    expect(amount(quote, "minimum")).toBe(850);
    expect(amount(estimateStorage(rates, base), "minimum")).toBeUndefined();
  });

  it("gives no estimate for zero pallets or zero months", () => {
    expect(estimateStorage(rates, { ...base, pallets: 0 })).toBeNull();
    expect(estimateStorage(rates, { ...base, months: Number.NaN })).toBeNull();
  });
});
