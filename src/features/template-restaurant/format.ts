import type { Locale } from "@/shared/i18n/config";
import { dateFromKey } from "./dates";

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
  return new Intl.NumberFormat(intlLocale(locale)).format(value);
}

export function formatDateKey(dateKey: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(dateFromKey(dateKey));
}

export function formatTime(time: string, locale: Locale): string {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  return new Intl.DateTimeFormat(intlLocale(locale), { hour: "numeric", minute: "2-digit" }).format(date);
}

export function formatDateTime(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function weekdayName(day: number, locale: Locale): string {
  // 2023-01-01 was a Sunday
  return new Intl.DateTimeFormat(intlLocale(locale), { weekday: "long" }).format(new Date(2023, 0, 1 + day));
}
