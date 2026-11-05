import type { Locale } from "@/shared/i18n/config";
import { formatNumber as formatEngineNumber } from "@/features/demo-engine/format/format";

// Logistics quantities (weights, volumes, rates) show at most two decimals.
export function formatNumber(value: number, locale: Locale): string {
  return formatEngineNumber(value, locale, { maximumFractionDigits: 2 });
}
