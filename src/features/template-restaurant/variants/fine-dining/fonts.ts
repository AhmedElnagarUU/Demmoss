import type { CSSProperties } from "react";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Jost, Pinyon_Script } from "next/font/google";

// Zaytouna's fonts, downloaded at build time and served from our own host. They are applied only inside the
// template (CSS variables on its wrapper), never on the agency site.
// Latin: Cormorant Garamond (headings), Jost (text), Pinyon Script (accents, English only).
// Arabic: Amiri (headings), IBM Plex Sans Arabic (text). Each stack lists the Latin font first, so Arabic letters
// fall through to the Arabic font.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fd-cormorant",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  weight: ["400", "500", "600"],
  variable: "--font-fd-plex",
  display: "swap",
});

export const fineDiningFonts = {
  className: [cormorant, jost, pinyon, amiri, plex].map((font) => font.variable).join(" "),
  style: {
    "--fd-display": "var(--font-fd-cormorant), var(--font-fd-amiri), Georgia, serif",
    "--fd-body": "var(--font-fd-jost), var(--font-fd-plex), system-ui, sans-serif",
    "--fd-script": "var(--font-fd-pinyon), var(--font-fd-amiri), cursive",
  } as CSSProperties,
};
