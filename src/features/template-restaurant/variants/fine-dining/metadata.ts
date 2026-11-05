import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "./messages";

const root = "/demos/restaurant/fine-dining";

export type SitePage = "home" | "menu" | "about" | "events" | "reserve" | "contact";

const paths: Record<SitePage, string> = {
  home: "",
  menu: "/menu",
  about: "/about",
  events: "/events",
  reserve: "/reserve",
  contact: "/contact",
};

// Page titles and descriptions for search engines; the site itself is rendered in the browser.
export function siteMetadata(locale: Locale, page: SitePage): Metadata {
  const t = getFineDiningT(locale);
  const path = `${root}${paths[page]}`;
  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ar: `/ar${path}`, en: `/en${path}` },
    },
  };
}

// The dashboard is a demo tool, not a page to find in search results.
export function dashboardMetadata(locale: Locale): Metadata {
  return { title: getFineDiningT(locale)("meta.dashboard.title"), robots: { index: false, follow: false } };
}
