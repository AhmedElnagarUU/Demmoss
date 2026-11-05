import { Montserrat, Tajawal } from "next/font/google";

// Self-hosted at build time (no font requests from the visitor's browser). Montserrat is a variable font.
const latin = Montserrat({ subsets: ["latin"], variable: "--re-font-latin", display: "swap" });
const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--re-font-arabic",
  display: "swap",
});

export const developerFontClass = `${latin.variable} ${arabic.variable}`;
export const siteFontFamily = "var(--re-font-latin), var(--re-font-arabic), sans-serif";
