import type { Locale } from "@/shared/i18n/config";
import { formatNumber } from "../format";
import { formatPrice } from "@/features/demo-engine/format/format";
import type { LogisticsTranslate } from "../messages";
import type { Estimate } from "../types";

// One readable line for the estimate that came with a quote request.
export function estimateText(
  estimate: Estimate,
  locale: Locale,
  currency: string,
  t: LogisticsTranslate,
): string {
  if (estimate.kind === "freight") {
    return t("quotes.estimateFreight", {
      mode: t(`modes.${estimate.mode}`),
      origin: estimate.origin[locale],
      destination: estimate.destination[locale],
      weight: formatNumber(estimate.weightKg, locale),
      volume: formatNumber(estimate.volumeCbm, locale),
      min: formatPrice(estimate.minCost, currency, locale),
      max: formatPrice(estimate.maxCost, currency, locale),
    });
  }
  return t(estimate.insurance ? "quotes.estimateStorageInsured" : "quotes.estimateStorage", {
    pallets: formatNumber(estimate.pallets, locale),
    months: formatNumber(estimate.months, locale),
    orders: formatNumber(estimate.ordersPerMonth, locale),
    total: formatPrice(estimate.monthlyTotal, currency, locale),
  });
}
