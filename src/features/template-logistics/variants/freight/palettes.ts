import type { Palette } from "@/features/demo-engine/palettes/palette";

// Five palettes for Orbis Cargo. Colors are tokens; every palette is contrast-checked by palettes.test.ts (WCAG AA).
// Besides the shared tokens each palette carries the design's own:
// --lg-band: the light grey strip behind the stats and testimonials (source #f6f6f7);
// --lg-primary-text: the primary hue used as small text (outline buttons, links), kept at AA on bg, surface and band.
// Graphite mirrors the source exactly: white cards on white, ink #111, muted #6b6b70, line #e7e7ea.
export const freightPalettes: readonly Palette[] = [
  {
    id: "graphite",
    name: { ar: "رمادي فحمي", en: "Graphite" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#ffffff",
      "--color-text": "#111111",
      "--color-muted": "#6b6b70",
      "--color-border": "#e7e7ea",
      "--color-primary": "#111111",
      "--color-primary-hover": "#2b2b2e",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#111111",
      "--lg-band": "#f6f6f7",
      "--lg-primary-text": "#111111",
    },
  },
  {
    id: "meridian",
    name: { ar: "أحمر وأزرق", en: "Red and blue" },
    vars: {
      "--color-bg": "#f4f1f1",
      "--color-surface": "#ffffff",
      "--color-text": "#1c1c1e",
      "--color-muted": "#5a5a60",
      "--color-border": "#d9d3d3",
      "--color-primary": "#c0232b",
      "--color-primary-hover": "#9f1c23",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#c0232b",
      "--lg-band": "#efe8e8",
      "--lg-primary-text": "#a81d25",
    },
  },
  {
    id: "ocean",
    name: { ar: "محيطي", en: "Ocean" },
    vars: {
      "--color-bg": "#eef2f7",
      "--color-surface": "#ffffff",
      "--color-text": "#0f1b2d",
      "--color-muted": "#475467",
      "--color-border": "#cbd5e1",
      "--color-primary": "#1f4f9e",
      "--color-primary-hover": "#183e7c",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#1f4f9e",
      "--lg-band": "#e3eaf3",
      "--lg-primary-text": "#1f4f9e",
    },
  },
  {
    id: "emerald",
    name: { ar: "زمردي", en: "Emerald" },
    vars: {
      "--color-bg": "#eff5f2",
      "--color-surface": "#ffffff",
      "--color-text": "#10201a",
      "--color-muted": "#44574f",
      "--color-border": "#c9d9d1",
      "--color-primary": "#0f6b4f",
      "--color-primary-hover": "#0b5640",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#0f6b4f",
      "--lg-band": "#e4eee8",
      "--lg-primary-text": "#0f6b4f",
    },
  },
  {
    id: "night",
    name: { ar: "ليلي", en: "Night" },
    vars: {
      "--color-bg": "#141416",
      "--color-surface": "#1f1f23",
      "--color-text": "#f1f1f3",
      "--color-muted": "#b4b4bc",
      "--color-border": "#3a3a40",
      "--color-primary": "#e8e8ec",
      "--color-primary-hover": "#ffffff",
      "--color-on-primary": "#111111",
      "--color-focus": "#e8e8ec",
      "--lg-band": "#1c1c20",
      "--lg-primary-text": "#e8e8ec",
    },
  },
];
