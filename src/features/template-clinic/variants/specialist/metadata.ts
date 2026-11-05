import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/config";
import { getSpecialistT } from "./messages";

const root = "/demos/clinic/specialist";

export type SitePage = "home" | "treatments" | "results" | "prices" | "book";

const paths: Record<SitePage, string> = {
  home: "",
  treatments: "/treatments",
  results: "/results",
  prices: "/prices",
  book: "/book",
};

// Page titles and descriptions for search engines; the site itself is rendered in the browser.
export function siteMetadata(locale: Locale, page: SitePage): Metadata {
  const t = getSpecialistT(locale);
  const path = `${root}${paths[page]}`;
  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates: { canonical: `/${locale}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } },
  };
}

// The dashboard is a demo tool, not a page to find in search results.
export function dashboardMetadata(locale: Locale): Metadata {
  return { title: getSpecialistT(locale)("meta.dashboard.title"), robots: { index: false, follow: false } };
}
