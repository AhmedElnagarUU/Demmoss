import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/config";
import { getFreightT } from "./messages";
import { FREIGHT_ROOT } from "./slug";

export type SitePage = "home" | "services" | "calculator" | "track" | "quote";

const paths: Record<SitePage, string> = {
  home: "",
  services: "/services",
  calculator: "/calculator",
  track: "/track",
  quote: "/quote",
};

// Page titles and descriptions for search engines; the site itself is rendered in the browser.
export function siteMetadata(locale: Locale, page: SitePage): Metadata {
  const t = getFreightT(locale);
  const path = `${FREIGHT_ROOT}${paths[page]}`;
  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates: { canonical: `/${locale}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } },
  };
}

// The dashboard is a demo tool, not a page to find in search results.
export function dashboardMetadata(locale: Locale): Metadata {
  return { title: getFreightT(locale)("meta.dashboard.title"), robots: { index: false, follow: false } };
}
