import { describe, expect, it } from "vitest";
import { fineDiningPalettes } from "./palettes";

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => {
    const value = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [red = 0, green = 0, blue = 0] = channels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

describe("R5: every palette keeps readable colors (WCAG AA)", () => {
  it("has five palettes with unique ids", () => {
    expect(fineDiningPalettes).toHaveLength(5);
    expect(new Set(fineDiningPalettes.map((palette) => palette.id)).size).toBe(5);
  });

  describe.each(fineDiningPalettes.map((palette) => [palette.id, palette.vars] as const))(
    "%s",
    (_id, vars) => {
      const get = (name: `--${string}`) => vars[name] ?? "";

      it("text, muted text, and accent are readable on the page and on panels", () => {
        for (const background of [get("--color-bg"), get("--color-surface")]) {
          expect(contrast(get("--color-text"), background)).toBeGreaterThanOrEqual(4.5);
          expect(contrast(get("--color-muted"), background)).toBeGreaterThanOrEqual(4.5);
          expect(contrast(get("--fd-accent"), background)).toBeGreaterThanOrEqual(4.5);
        }
      });

      it("button text is readable on the button, and the button and focus ring stand out from the page", () => {
        expect(contrast(get("--color-on-primary"), get("--color-primary"))).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--color-on-primary"), get("--color-primary-hover"))).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--color-primary"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
        expect(contrast(get("--color-focus"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
      });
    },
  );

  it("the contrast function itself is right (black on white is 21:1)", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });
});
