import { IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google";
import { fontStack } from "@/features/demo-engine/fonts/font-stack";

// Self-hosted at build time (no font requests from the visitor's browser).
// Latin: Montserrat (a variable font, so the source's weights 200 to 600 all work), exactly like the source design.
// Arabic: IBM Plex Sans Arabic, the closest match in weight (200 to 600). fontStack puts both real fonts before their Arial-based fallbacks, so Arabic letters reach the Arabic font.
const latin = Montserrat({
  subsets: ["latin"],
  variable: "--re-font-latin",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--re-font-arabic",
  display: "swap",
});

export const developerFontClass = `${latin.variable} ${arabic.variable}`;
export const siteFontFamily = fontStack([latin, arabic], "sans-serif");
