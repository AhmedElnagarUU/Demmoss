import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";

// Self-hosted at build time. Scoped to the template wrapper (the variables are set on it), never on the main site.
const latin = Manrope({ subsets: ["latin"], variable: "--font-freight-latin", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-freight-arabic",
  display: "swap",
});

export const freightFontClassName = `${latin.variable} ${arabic.variable}`;
export const freightFontFamily =
  "var(--font-freight-latin), var(--font-freight-arabic), ui-sans-serif, system-ui, sans-serif";
