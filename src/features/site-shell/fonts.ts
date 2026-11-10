import type { CSSProperties } from "react";
import { IBM_Plex_Sans_Arabic, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { fontStack } from "@/features/demo-engine/fonts/font-stack";

// Public site fonts, downloaded at build time and served from our own host.
// Latin: Inter Tight (light display). Mono labels: JetBrains Mono. Arabic: IBM Plex Sans Arabic.
const latin = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--site-font-latin",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--site-font-mono",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--site-font-arabic",
  display: "swap",
});

export const siteFontClass = [latin, mono, arabic].map((font) => font.variable).join(" ");

export const siteFonts = {
  "--site-sans": fontStack([latin, arabic], "sans-serif"),
  "--site-mono": fontStack([mono, arabic], "monospace"),
} as CSSProperties;
