import { IBM_Plex_Sans_Arabic, Onest } from "next/font/google";
import { fontStack } from "@/features/demo-engine/fonts/font-stack";

// Self-hosted at build time (no font requests from the visitor's browser). Both clinic variants share these two fonts.
const latin = Onest({
  subsets: ["latin"],
  variable: "--cl-font-latin",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--cl-font-arabic",
  display: "swap",
});

export const clinicFontClass = `${latin.variable} ${arabic.variable}`;
export const siteFontFamily = fontStack([latin, arabic], "sans-serif");
