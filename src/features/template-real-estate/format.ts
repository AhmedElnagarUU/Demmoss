import type { Locale } from "@/shared/i18n/config";
import { dateFromKey } from "./dates";

// Gregorian calendar in both languages; Arabic digits follow the locale.
function intlLocale(locale: Locale): string {
  return locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US";
}

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
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
