import { useMemo } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { Overview } from "../../dashboard/logistics-context";
import { formatNumber } from "../../format";
import { getLogisticsT } from "../../messages";
import { fullWarehouseFacts, totalOccupancy } from "../../modules/warehouses/availability";
import { afterHoursFacts, staleQuoteFacts } from "../../value-tips";
import { getWarehousingT } from "./messages";
import { useWarehousingStore } from "./store";

// Overview cards, activity, and value tips of Makhzan, computed from its quotes and warehouses.
export function useOverview(locale: Locale): Overview {
  const quotes = useWarehousingStore((state) => state.quotes);
  const warehouses = useWarehousingStore((state) => state.warehouses);
  const settings = useWarehousingStore((state) => state.settings);

  return useMemo(() => {
    const t = getWarehousingT(locale);
    const shared = getLogisticsT(locale);
    const now = new Date();
    const count = (value: number) => formatNumber(value, locale);
    const { occupied, capacity } = totalOccupancy(warehouses);
    return {
      cards: [
        {
          id: "new",
          label: t("overview.cardsNew"),
          value: count(quotes.filter((q) => q.status === "new").length),
        },
        {
          id: "quoted",
          label: t("overview.cardsQuoted"),
          value: count(quotes.filter((q) => q.status === "quoted").length),
        },
        {
          id: "pallets",
          label: t("overview.cardsPallets"),
          value: t("overview.palletsValue", { occupied: count(occupied), capacity: count(capacity) }),
        },
        {
          id: "won",
          label: t("overview.cardsWon"),
          value: count(quotes.filter((q) => q.status === "won").length),
        },
      ],
      activity: quotes.map((quote) => ({
        id: quote.id,
        at: quote.createdAt,
        text: shared("overview.activityQuote", { name: quote.name }),
      })),
      tips: [
        ...afterHoursFacts(quotes, settings),
        ...fullWarehouseFacts(warehouses),
        ...staleQuoteFacts(quotes, now),
      ],
    };
  }, [quotes, warehouses, settings, locale]);
}
