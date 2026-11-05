"use client";

import type { ReactNode } from "react";
import { applyPalette, findPalette, type Palette } from "@/features/demo-engine/palettes/palette";
import type { RestaurantStore } from "./restaurant-store";

type Props = { store: RestaurantStore; palettes: readonly Palette[]; children: ReactNode };

// Applies the owner's chosen palette (CSS variables) to everything inside: site or dashboard.
export function PaletteScope({ store, palettes, children }: Props) {
  const paletteId = store((state) => state.settings.palette);
  const palette = findPalette(palettes, paletteId);
  return (
    <div style={palette ? applyPalette(palette) : undefined} className="bg-bg text-text">
      {children}
    </div>
  );
}
