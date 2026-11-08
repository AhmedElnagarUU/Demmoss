import type { CSSProperties } from "react";
import { IBM_Plex_Sans_Arabic, Instrument_Serif, Inter } from "next/font/google";
import { fontStack } from "@/features/demo-engine/fonts/font-stack";

// Public site fonts, downloaded at build time and served from our own host.
// Latin: Inter. Arabic: IBM Plex Sans Arabic, so both languages share one voice.
const latin = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--site-font-latin",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--site-font-arabic",
  display: "swap",
});

// The italic serif used for the accent words of section headings (in Arabic those words are bold, not italic).
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--site-font-serif",
  display: "swap",
});

export const siteFontClass = [latin, arabic, serif].map((font) => font.variable).join(" ");

export const siteFonts = {
  "--site-sans": fontStack([latin, arabic], "sans-serif"),
  "--site-serif": fontStack([serif, arabic], "serif"),
} as CSSProperties;
