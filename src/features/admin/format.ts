import { getAllDemos } from "@/features/gallery/catalog";
import { categories } from "@/features/gallery/categories";
import type { Locale } from "@/shared/i18n/config";

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatPercent(share: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(share);
}

// UTC on purpose: the same time is shown wherever the server runs.
export function formatDateTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(
    date,
  );
}

export function formatDay(day: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" }).format(
    new Date(`${day}T00:00:00Z`),
  );
}

export function countryName(code: string, locale: Locale): string | null {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code.toUpperCase()) ?? null;
  } catch {
    return null;
  }
}

export function templateName(slug: string, locale: Locale): string {
  return getAllDemos().find((demo) => demo.slug === slug)?.name[locale] ?? slug;
}

export function categoryName(slug: string, locale: Locale): string {
  return categories.find((category) => category.slug === slug)?.name[locale] ?? slug;
}
