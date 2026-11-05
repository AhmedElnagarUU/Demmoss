import type { Palette } from "@/features/demo-engine/palettes/palette";

// Five palettes for the medical centre: the same language as the specialist, calmer accents.
// Colors are tokens; palettes.test.ts checks every palette for contrast (WCAG AA).
// --cl-accent is the accent for small text (prices, stars).
export const medicalCentrePalettes: readonly Palette[] = [
  {
    id: "teal",
    name: { ar: "أخضر مزرق", en: "Teal" },
    vars: {
      "--color-bg": "#fbfdfd",
      "--color-surface": "#eaf3f3",
      "--color-text": "#0f1f20",
      "--color-muted": "#4f6566",
      "--color-border": "#d3e3e3",
      "--color-primary": "#1f7a7a",
      "--color-primary-hover": "#186363",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#1f7a7a",
      "--cl-accent": "#176b6b",
    },
  },
  {
    id: "sea",
    name: { ar: "أزرق بحري", en: "Sea blue" },
    vars: {
      "--color-bg": "#fbfcfe",
      "--color-surface": "#eaf0f7",
      "--color-text": "#0f1a28",
      "--color-muted": "#50607a",
      "--color-border": "#d3deeb",
      "--color-primary": "#2b5f9e",
      "--color-primary-hover": "#214c82",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#2b5f9e",
      "--cl-accent": "#25588f",
    },
  },
  {
    id: "sage",
    name: { ar: "مريمي", en: "Sage" },
    vars: {
      "--color-bg": "#fcfdfb",
      "--color-surface": "#edf2e9",
      "--color-text": "#14201a",
      "--color-muted": "#55655a",
      "--color-border": "#d9e3d2",
      "--color-primary": "#3d6b4a",
      "--color-primary-hover": "#305539",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#3d6b4a",
      "--cl-accent": "#356043",
    },
  },
  {
    id: "plum",
    name: { ar: "برقوقي", en: "Plum" },
    vars: {
      "--color-bg": "#fdfbfd",
      "--color-surface": "#f1ebf3",
      "--color-text": "#1d1322",
      "--color-muted": "#67566c",
      "--color-border": "#e3d8e8",
      "--color-primary": "#6d3f7e",
      "--color-primary-hover": "#583266",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#6d3f7e",
      "--cl-accent": "#6d3f7e",
    },
  },
  {
    id: "sand",
    name: { ar: "رملي", en: "Sand" },
    vars: {
      "--color-bg": "#fffdfa",
      "--color-surface": "#f4efe6",
      "--color-text": "#221a10",
      "--color-muted": "#675a48",
      "--color-border": "#e6dccb",
      "--color-primary": "#8a5a1c",
      "--color-primary-hover": "#6f4814",
      "--color-on-primary": "#ffffff",
      "--color-focus": "#8a5a1c",
      "--cl-accent": "#7d5114",
    },
  },
];
