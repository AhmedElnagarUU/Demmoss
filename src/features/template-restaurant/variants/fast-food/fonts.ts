import type { CSSProperties } from "react";
import {
  Aref_Ruqaa,
  Bebas_Neue,
  IBM_Plex_Sans_Arabic,
  Lalezar,
  Lora,
  Poppins,
  Yellowtail,
} from "next/font/google";
import { fontStack } from "@/features/demo-engine/fonts/font-stack";

// Sole Trattoria's fonts, downloaded at build time and served from our own host. Applied only inside the template.
// Latin: Bebas Neue (hero display), Lora 600 (serif headings), Poppins (text), Yellowtail (script accents).
// Arabic: Lalezar (display + headings), IBM Plex Sans Arabic (text), Aref Ruqaa (script accents).
// fontStack lists the Latin font, then the Arabic font, then their fallbacks, so Arabic letters reach the Arabic font.
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sl-bebas",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-sl-lora",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sl-poppins",
  display: "swap",
});
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sl-yellowtail",
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
const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-sl-ruqaa",
  display: "swap",
});

export const fastFoodFonts = {
  className: [bebas, poppins, lora, yellowtail, lalezar, plex, ruqaa].map((font) => font.variable).join(" "),
  style: {
    "--sl-display": fontStack([bebas, lalezar], "Impact, sans-serif"),
    "--sl-serif": fontStack([lora, lalezar], "Georgia, serif"),
    "--sl-script": fontStack([yellowtail, ruqaa], "cursive"),
    "--sl-body": fontStack([poppins, plex], "system-ui, sans-serif"),
    // The source's warm card shadow token (-sh in the source file), for every lifted card.
    "--sl-shadow": "0 10px 30px rgba(80, 50, 20, 0.1)",
  } as CSSProperties,
};
