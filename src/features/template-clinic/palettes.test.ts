import { describe, expect, it } from "vitest";
import { contrast } from "@/features/demo-engine/palettes/contrast";
import { medicalCentrePalettes } from "./variants/medical-centre/palettes";
import { specialistPalettes } from "./variants/specialist/palettes";

const variants = [
  ["specialist", specialistPalettes],
  ["medical centre", medicalCentrePalettes],
] as const;

describe.each(variants)("C11: every %s palette keeps readable colors (WCAG AA)", (_name, palettes) => {
  it("has five palettes with unique ids", () => {
    expect(palettes).toHaveLength(5);
    expect(new Set(palettes.map((palette) => palette.id)).size).toBe(5);
  });

  describe.each(palettes.map((palette) => [palette.id, palette.vars] as const))("%s", (_id, vars) => {
    const get = (name: `--${string}`) => vars[name] ?? "";

    it("text, muted text, and accent are readable on the page and on panels", () => {
      for (const background of [get("--color-bg"), get("--color-surface")]) {
        expect(contrast(get("--color-text"), background)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--color-muted"), background)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--cl-accent"), background)).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("button text is readable on the button, and the focus ring stands out from the page", () => {
      expect(contrast(get("--color-on-primary"), get("--color-primary"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-on-primary"), get("--color-primary-hover"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-focus"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
    });
  });
});
