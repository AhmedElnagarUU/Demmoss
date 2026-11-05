import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/config";
import { getFastFoodT } from "./messages";

const root = "/demos/restaurant/fast-food";

export type SitePage = "home" | "menu" | "checkout" | "order" | "contact";

const paths: Record<SitePage, string> = {
  home: "",
  menu: "/menu",
  checkout: "/checkout",
  order: "/order",
  contact: "/contact",
};

// Page titles and descriptions for search engines; the site itself is rendered in the browser.
export function siteMetadata(locale: Locale, page: SitePage): Metadata {
  const t = getFastFoodT(locale);
  const path = `${root}${paths[page]}`;
  return {
    title: t(`meta.${page}.title`),
    description: t(`meta.${page}.description`),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ar: `/ar${path}`, en: `/en${path}` },
    },
    // an order status page is personal to the browser that placed the order
    ...(page === "order" || page === "checkout" ? { robots: { index: false, follow: false } } : {}),
  };
}

// The dashboard is a demo tool, not a page to find in search results.
export function dashboardMetadata(locale: Locale): Metadata {
  return { title: getFastFoodT(locale)("meta.dashboard.title"), robots: { index: false, follow: false } };
}
