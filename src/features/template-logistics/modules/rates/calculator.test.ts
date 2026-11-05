import { describe, expect, it } from "vitest";
import { calculateFreight } from "./calculator";
import type { Rates } from "./types";

const rates: Rates = {
  modes: [
    { mode: "air", ratePerKg: 16, volumetricKgPerCbm: 167, minimumCharge: 250, daysMin: 4, daysMax: 7 },
    { mode: "sea", ratePerKg: 1.2, volumetricKgPerCbm: 1000, minimumCharge: 350, daysMin: 28, daysMax: 40 },
    { mode: "road", ratePerKg: 4, volumetricKgPerCbm: 333, minimumCharge: 300, daysMin: 18, daysMax: 25 },
    { mode: "rail", ratePerKg: 2.8, volumetricKgPerCbm: 500, minimumCharge: 320, daysMin: 14, daysMax: 20 },
  ],
  origins: [
    { id: "shanghai", name: { ar: "شنغهاي", en: "Shanghai" }, factor: 1 },
    { id: "yiwu", name: { ar: "إيوو", en: "Yiwu" }, factor: 1.08 },
  ],
  destinations: [
    { id: "jeddah", name: { ar: "جدة", en: "Jeddah" }, factor: 1, extraDays: 0 },
    { id: "riyadh", name: { ar: "الرياض", en: "Riyadh" }, factor: 1.1, extraDays: 3 },
  ],
};

const cargo = { originId: "shanghai", destinationId: "jeddah", weightKg: 500, volumeCbm: 0.5 };

describe("L1: freight calculator", () => {
  it("prices by weight: 500 kg by air is 500 × 16 SAR, with a range up to 15% more", () => {
    const quote = calculateFreight(rates, { ...cargo, mode: "air" });
    expect(quote).toMatchObject({ chargeableKg: 500, minCost: 8000, maxCost: 9200, minimumApplied: false });
  });

  it("modes differ: the same cargo is cheaper by sea than by air, and slower", () => {
    const air = calculateFreight(rates, { ...cargo, mode: "air" });
    const sea = calculateFreight(rates, { ...cargo, mode: "sea" });
    expect(air && sea && sea.minCost < air.minCost).toBe(true);
    expect(air && sea && sea.daysMin > air.daysMax).toBe(true);
  });

  it("charges the minimum for a tiny parcel and says so", () => {
    const quote = calculateFreight(rates, { ...cargo, mode: "sea", weightKg: 10, volumeCbm: 0.01 });
    expect(quote).toMatchObject({ minCost: 350, maxCost: 402, minimumApplied: true });
  });

  it("charges by volume when the cargo is light and bulky", () => {
    const quote = calculateFreight(rates, { ...cargo, mode: "sea", weightKg: 200, volumeCbm: 3 });
    expect(quote).toMatchObject({ chargeableKg: 3000, minCost: 3600 });
  });

  it("route factors raise the price and the destination adds transit days", () => {
    const quote = calculateFreight(rates, {
      mode: "air",
      originId: "yiwu",
      destinationId: "riyadh",
      weightKg: 100,
      volumeCbm: 0,
    });
    expect(quote).toMatchObject({ minCost: Math.round(100 * 16 * 1.08 * 1.1), daysMin: 7, daysMax: 10 });
  });

  it("gives no estimate without weight and volume, or for an unknown route", () => {
    expect(calculateFreight(rates, { ...cargo, mode: "air", weightKg: 0, volumeCbm: 0 })).toBeNull();
    expect(
      calculateFreight(rates, { ...cargo, mode: "air", weightKg: Number.NaN, volumeCbm: -2 }),
    ).toBeNull();
    expect(calculateFreight(rates, { ...cargo, mode: "air", originId: "nowhere" })).toBeNull();
  });

  it("L6: a changed rate changes the estimate", () => {
    const cheaper: Rates = {
      ...rates,
      modes: rates.modes.map((item) => (item.mode === "air" ? { ...item, ratePerKg: 10 } : item)),
    };
    expect(calculateFreight(cheaper, { ...cargo, mode: "air" })?.minCost).toBe(5000);
  });
});
