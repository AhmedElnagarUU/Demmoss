import { describe, expect, it } from "vitest";
import { getAllDemos } from "@/features/gallery/catalog";
import { landingStats } from "./stats";

describe("landing stats", () => {
  it("L8: counts only real demos and distinct categories that have demos", () => {
    const demos = [{ category: "restaurant" }, { category: "restaurant" }, { category: "clinic" }] as const;
    expect(landingStats(demos)).toEqual({ demoCount: 3, categoryCount: 2 });
  });

  it("L8: an empty catalog shows zero demos and zero categories", () => {
    expect(landingStats([])).toEqual({ demoCount: 0, categoryCount: 0 });
  });

  it("L8: the real catalog gives a category count never above its demo count", () => {
    const { demoCount, categoryCount } = landingStats(getAllDemos());
    expect(demoCount).toBe(getAllDemos().length);
    expect(categoryCount).toBeGreaterThan(0);
    expect(categoryCount).toBeLessThanOrEqual(demoCount);
  });
});
