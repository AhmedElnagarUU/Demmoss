import { describe, expect, it } from "vitest";
import { contrast } from "./contrast";

describe("E5: the contrast helper that template palette tests rely on follows WCAG", () => {
  it("is 21 for black on white and 1 for the same color, in either order", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#ffffff", "#000000")).toBeCloseTo(21, 5);
    expect(contrast("#336699", "#336699")).toBeCloseTo(1, 5);
  });

  it("tells a readable pair from an unreadable one (AA is 4.5)", () => {
    expect(contrast("#595959", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#999999", "#ffffff")).toBeLessThan(4.5);
  });
});
