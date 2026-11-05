"use client";

import type { CSSProperties, ReactNode } from "react";
import { applyPalette, findPalette, type Palette } from "./palette";

type Props = {
  // any template store: only the chosen palette id is read
  store: <T>(selector: (state: { settings: { palette: string } }) => T) => T;
  palettes: readonly Palette[];
  // optional: next/font variable classes and the font stack of the variant
  fontClassName?: string;
  fontFamily?: string;
  children: ReactNode;
};

// Applies the owner's chosen palette (CSS variables) and the variant's fonts to everything inside: site or dashboard.
export function PaletteScope({ store, palettes, fontClassName = "", fontFamily, children }: Props) {
  const paletteId = store((state) => state.settings.palette);
  const palette = findPalette(palettes, paletteId);
  const style: CSSProperties = {
    ...(palette ? applyPalette(palette) : {}),
    ...(fontFamily ? { fontFamily } : {}),
  };
  return (
    <div style={style} className={`bg-bg text-text ${fontClassName}`.trim()}>
      {children}
    </div>
  );
}
