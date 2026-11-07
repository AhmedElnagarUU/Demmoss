import type { CSSProperties } from "react";
import {
  Aref_Ruqaa,
  Amiri,
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
  Jost,
  Pinyon_Script,
} from "next/font/google";

// Verdant Table's fonts, downloaded at build time and served from our own host. Applied only inside the template.
// Latin: Cormorant Garamond 500/600 (headings, italic for the hero accent word), Jost 300/400 (text), Pinyon Script (script).
// Arabic: Amiri (headings), IBM Plex Sans Arabic (text), Aref Ruqaa (script accents, in place of Pinyon Script).
// Each stack lists the Latin font first, so Arabic letters fall through to the Arabic font.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fd-cormorant",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-fd-jost",
  display: "swap",
});
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fd-pinyon",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-fd-amiri",
  display: "swap",
});
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fd-plex",
  display: "swap",
});
const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-fd-ruqaa",
  display: "swap",
});

export const fineDiningFonts = {
  className: [cormorant, jost, pinyon, amiri, plex, ruqaa].map((font) => font.variable).join(" "),
  style: {
    "--fd-display": "var(--font-fd-cormorant), var(--font-fd-amiri), Georgia, serif",
    "--fd-body": "var(--font-fd-jost), var(--font-fd-plex), system-ui, sans-serif",
    "--fd-script": "var(--font-fd-pinyon), var(--font-fd-ruqaa), cursive",
  } as CSSProperties,
};
