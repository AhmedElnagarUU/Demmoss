import type { CSSProperties } from "react";
import { Bebas_Neue, IBM_Plex_Sans_Arabic, Lalezar, Poppins } from "next/font/google";

// Smash Lab's fonts, downloaded at build time and served from our own host. Applied only inside the template.
// Latin: Bebas Neue (bold display headings), Poppins (text). Arabic: Lalezar (display), IBM Plex Sans Arabic (text).
// Each stack lists the Latin font first, so Arabic letters fall through to the Arabic font.
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-sl-bebas", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sl-poppins",
  display: "swap",
});
const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-sl-lalezar",
  display: "swap",
});
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sl-plex",
  display: "swap",
});

export const fastFoodFonts = {
  className: [bebas, poppins, lalezar, plex].map((font) => font.variable).join(" "),
  style: {
    "--sl-display": "var(--font-sl-bebas), var(--font-sl-lalezar), Impact, sans-serif",
    "--sl-body": "var(--font-sl-poppins), var(--font-sl-plex), system-ui, sans-serif",
  } as CSSProperties,
};
