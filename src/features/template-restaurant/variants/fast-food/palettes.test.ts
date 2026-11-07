import { describe, expect, it } from "vitest";
import { contrast } from "@/features/demo-engine/palettes/contrast";
import { fastFoodPalettes } from "./palettes";

describe("R5: every Sole Trattoria palette keeps readable colors (WCAG AA)", () => {
  it("has five palettes with unique ids", () => {
    expect(fastFoodPalettes).toHaveLength(5);
    expect(new Set(fastFoodPalettes.map((palette) => palette.id)).size).toBe(5);
  });

  describe.each(fastFoodPalettes.map((palette) => [palette.id, palette.vars] as const))("%s", (_id, vars) => {
    const get = (name: `--${string}`) => vars[name] ?? "";

    it("text, muted text, and accent are readable on the page and on panels", () => {
      for (const background of [get("--color-bg"), get("--color-surface")]) {
        expect(contrast(get("--color-text"), background)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--color-muted"), background)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--sl-accent"), background)).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("button text is readable on the button, and the button and focus ring stand out from the page", () => {
      expect(contrast(get("--color-on-primary"), get("--color-primary"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-on-primary"), get("--color-primary-hover"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-primary"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
      expect(contrast(get("--color-primary"), get("--color-surface"))).toBeGreaterThanOrEqual(3);
      expect(contrast(get("--color-focus"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
    });

    it("primary used as text keeps AA everywhere primary text appears (page, panels, and band)", () => {
      for (const background of [get("--color-bg"), get("--color-surface"), get("--sl-band")]) {
        expect(contrast(get("--sl-primary-text"), background)).toBeGreaterThanOrEqual(4.5);
      }
    });
  });
});
