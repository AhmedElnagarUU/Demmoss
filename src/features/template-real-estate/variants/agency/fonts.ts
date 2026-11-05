import { IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google";

// Self-hosted at build time (no font requests from the visitor's browser). Montserrat is a variable font.
const latin = Montserrat({ subsets: ["latin"], variable: "--re-font-latin", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--re-font-arabic",
  display: "swap",
});

export const agencyFontClass = `${latin.variable} ${arabic.variable}`;
export const siteFontFamily = "var(--re-font-latin), var(--re-font-arabic), sans-serif";
