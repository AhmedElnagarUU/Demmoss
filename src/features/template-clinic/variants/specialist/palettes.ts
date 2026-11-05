import type { Palette } from "@/features/demo-engine/palettes/palette";

// Five palettes for the specialist (the Dr. Vale look: light grey panels, ink, one bright accent).
// Colors are tokens; palettes.test.ts checks every palette for contrast (WCAG AA).
// --cl-accent is the accent for small text (prices, stars).
export const specialistPalettes: readonly Palette[] = [
  {
    id: "lime",
    name: { ar: "ليموني", en: "Lime" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#f0f0f0",
      "--color-text": "#141414",
      "--color-muted": "#595959",
      "--color-border": "#e0e0e0",
      "--color-primary": "#c8f169",
      "--color-primary-hover": "#b6e24c",
      "--color-on-primary": "#141414",
      "--color-focus": "#141414",
      "--cl-accent": "#4a6a0a",
    },
  },
  {
    id: "mint",
    name: { ar: "نعناعي", en: "Mint" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#eef4f1",
      "--color-text": "#12201b",
      "--color-muted": "#50625a",
      "--color-border": "#d9e5df",
      "--color-primary": "#a8e6cf",
      "--color-primary-hover": "#92d9bd",
      "--color-on-primary": "#12201b",
      "--color-focus": "#12201b",
      "--cl-accent": "#1d6b4f",
    },
  },
  {
    id: "sky",
    name: { ar: "سماوي", en: "Sky" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#eef3f8",
      "--color-text": "#101a26",
      "--color-muted": "#52606f",
      "--color-border": "#d9e2ec",
      "--color-primary": "#a9d4f5",
      "--color-primary-hover": "#91c6ee",
      "--color-on-primary": "#101a26",
      "--color-focus": "#1f4f7a",
      "--cl-accent": "#1f5c91",
    },
  },
  {
    id: "rose",
    name: { ar: "وردي", en: "Rose" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#f7eff0",
      "--color-text": "#221418",
      "--color-muted": "#6a5258",
      "--color-border": "#ead9dc",
      "--color-primary": "#f2b8c2",
      "--color-primary-hover": "#eba3b0",
      "--color-on-primary": "#221418",
      "--color-focus": "#7a2c3c",
      "--cl-accent": "#9b2f45",
    },
  },
  {
    id: "graphite",
    name: { ar: "رصاصي", en: "Graphite" },
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#efefef",
      "--color-text": "#141414",
      "--color-muted": "#595959",
      "--color-border": "#dcdcdc",
      "--color-primary": "#141414",
      "--color-primary-hover": "#333333",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#141414",
      "--cl-accent": "#333333",
    },
  },
];
