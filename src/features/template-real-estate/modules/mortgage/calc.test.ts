import { describe, expect, it } from "vitest";
import { calculateMortgage } from "./calc";

const base = { price: 1_000_000, downPaymentPercent: 20, years: 25, annualRatePercent: 5.5 };

describe("RE5: mortgage calculator (standard amortization, SAR)", () => {
  it("computes the monthly payment, total, and interest of a normal loan", () => {
    const result = calculateMortgage(base);
    expect(result?.loan).toBe(800_000);
    expect(result?.months).toBe(300);
    expect(result?.monthly).toBeCloseTo(4912.7, 0);
    expect(result?.total).toBeCloseTo((result?.monthly ?? 0) * 300, 6);
    expect(result?.interest).toBeCloseTo((result?.total ?? 0) - 800_000, 6);
  });

  it("at a 0% rate the loan is divided evenly", () => {
    const result = calculateMortgage({ ...base, annualRatePercent: 0 });
    expect(result?.monthly).toBeCloseTo(800_000 / 300, 6);
    expect(result?.interest).toBeCloseTo(0, 6);
  });

  it("a 100% down payment needs no loan", () => {
    const result = calculateMortgage({ ...base, downPaymentPercent: 100 });
    expect(result).toMatchObject({ loan: 0, monthly: 0, interest: 0 });
  });

  it("a higher down payment, a lower rate, or a longer term lowers the monthly payment", () => {
    const monthly = (change: Partial<typeof base>) => calculateMortgage({ ...base, ...change })?.monthly ?? 0;
    expect(monthly({ downPaymentPercent: 40 })).toBeLessThan(monthly({}));
    expect(monthly({ annualRatePercent: 3 })).toBeLessThan(monthly({}));
    expect(monthly({ years: 30 })).toBeLessThan(monthly({}));
  });

  it("gives no result (never NaN) for invalid input", () => {
    for (const bad of [
      { price: 0 },
      { price: -5 },
      { price: Number.NaN },
      { downPaymentPercent: -1 },
      { downPaymentPercent: 101 },
      { years: 0 },
      { years: 2.5 },
      { annualRatePercent: -0.1 },
      { annualRatePercent: Number.POSITIVE_INFINITY },
    ]) {
      expect(calculateMortgage({ ...base, ...bad })).toBeNull();
    }
  });
});
