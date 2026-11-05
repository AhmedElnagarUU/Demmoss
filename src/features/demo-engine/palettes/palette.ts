import type { CSSProperties } from "react";
import type { LocalizedText } from "../types";

// vars are CSS variables such as { "--color-primary": "#2f5d3a" }, checked for contrast by the template.
export type Palette = {
  id: string;
  name: LocalizedText;
  vars: Record<`--${string}`, string>;
};

export function applyPalette(palette: Palette): CSSProperties {
  return palette.vars as CSSProperties;
}

export function findPalette(palettes: readonly Palette[], id: string | undefined): Palette | undefined {
  return palettes.find((palette) => palette.id === id) ?? palettes[0];
}
