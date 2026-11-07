import { describe, expect, it } from "vitest";
import { contrast } from "@/features/demo-engine/palettes/contrast";
import { agencyPalettes } from "./variants/agency/palettes";
import { developerPalettes } from "./variants/developer/palettes";

const variants = [
  ["agency", agencyPalettes],
  ["developer", developerPalettes],
] as const;

describe.each(variants)("RE13: every %s palette keeps readable colors (WCAG AA)", (_name, palettes) => {
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
        expect(contrast(get("--re-accent"), background)).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("button text is readable on the button, and the button and focus ring stand out from the page", () => {
      expect(contrast(get("--color-on-primary"), get("--color-primary"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-on-primary"), get("--color-primary-hover"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-primary"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
      expect(contrast(get("--color-focus"), get("--color-bg"))).toBeGreaterThanOrEqual(3);
    });
  });
});

describe("RE13: the agency design tokens keep readable colors on its dark bands", () => {
  describe.each(agencyPalettes.map((palette) => [palette.id, palette.vars] as const))("%s", (_id, vars) => {
    const get = (name: `--${string}`) => vars[name] ?? "";

    it("the light accent and the decorative accent are readable as text on the dark band", () => {
      expect(contrast(get("--re-beige"), get("--re-dark"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--re-gold"), get("--re-dark"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast("#ffffff", get("--re-dark"))).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("RE13: the developer design tokens keep readable colors on its black bands and its light About band", () => {
  describe.each(developerPalettes.map((palette) => [palette.id, palette.vars] as const))(
    "%s",
    (_id, vars) => {
      const get = (name: `--${string}`) => vars[name] ?? "";

      it("text, muted text, and accent are readable on the black bands", () => {
        expect(contrast(get("--color-text"), get("--re-deep"))).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--color-muted"), get("--re-deep"))).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--re-accent"), get("--re-deep"))).toBeGreaterThanOrEqual(4.5);
      });

      it("the three ink colors are readable on the light About band", () => {
        for (const ink of ["--re-ink", "--re-ink-body", "--re-ink-muted"] as const) {
          expect(contrast(get(ink), get("--re-paper"))).toBeGreaterThanOrEqual(4.5);
        }
      });

      it("the error color is readable on the page and on panels", () => {
        expect(contrast(get("--re-error"), get("--color-bg"))).toBeGreaterThanOrEqual(4.5);
        expect(contrast(get("--re-error"), get("--color-surface"))).toBeGreaterThanOrEqual(4.5);
      });
    },
  );
});

it("the contrast function itself is right (black on white is 21:1)", () => {
  expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 0);
});
