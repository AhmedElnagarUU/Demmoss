import type { Locale } from "@/shared/i18n/config";

// Gregorian calendar in both languages; Arabic digits follow the locale.
function intlLocale(locale: Locale): string {
  return locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US";
}

export function formatPrice(amount: number, currency: string, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 2 }).format(value);
}

export function formatDateTime(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}
