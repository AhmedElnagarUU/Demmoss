import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";

// Self-hosted at build time. Scoped to the template wrapper (the variables are set on it), never on the main site.
const latin = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-warehousing-latin",
  display: "swap",
});
const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-warehousing-arabic",
  display: "swap",
});

export const warehousingFontClassName = `${latin.variable} ${arabic.variable}`;
export const warehousingFontFamily =
  "var(--font-warehousing-latin), var(--font-warehousing-arabic), ui-sans-serif, system-ui, sans-serif";
