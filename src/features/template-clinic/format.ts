import type { Locale } from "@/shared/i18n/config";
import { intlLocale } from "@/features/demo-engine/format/format";

// Clinic prices are always whole riyals.
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}
