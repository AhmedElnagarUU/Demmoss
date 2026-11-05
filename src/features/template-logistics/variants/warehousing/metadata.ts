import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/config";
import { getWarehousingT } from "./messages";
import { WAREHOUSING_ROOT } from "./slug";

export type SitePage = "home" | "services" | "warehouses" | "caseStudies" | "quote";

const paths: Record<SitePage, string> = {
  home: "",
  services: "/services",
  warehouses: "/warehouses",
  caseStudies: "/case-studies",
  quote: "/quote",
};

// Page titles and descriptions for search engines; the site itself is rendered in the browser.
export function siteMetadata(locale: Locale, page: SitePage): Metadata {
  const t = getWarehousingT(locale);
  const path = `${WAREHOUSING_ROOT}${paths[page]}`;
  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates: { canonical: `/${locale}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } },
  };
}

// The dashboard is a demo tool, not a page to find in search results.
export function dashboardMetadata(locale: Locale): Metadata {
  return { title: getWarehousingT(locale)("meta.dashboard.title"), robots: { index: false, follow: false } };
}
