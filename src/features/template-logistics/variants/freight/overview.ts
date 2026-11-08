import { useMemo } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { Overview } from "../../dashboard/logistics-context";
import { formatNumber } from "../../format";
import { getLogisticsT } from "../../messages";
import { currentStatus } from "../../modules/shipments/status";
import { stuckShipmentFacts } from "../../modules/shipments/tips";
import { afterHoursFacts, staleQuoteFacts } from "../../value-tips";
import { getFreightT } from "./messages";
import { useFreightStore } from "./store";

// Overview cards, activity, and value tips of Orbis Cargo, computed from its quotes and shipments.
export function useOverview(locale: Locale): Overview {
  const quotes = useFreightStore((state) => state.quotes);
  const shipments = useFreightStore((state) => state.shipments);
  const settings = useFreightStore((state) => state.settings);

  return useMemo(() => {
    const t = getFreightT(locale);
    const shared = getLogisticsT(locale);
    const now = new Date();
    const count = (value: number) => formatNumber(value, locale);
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
          id: "way",
          label: t("overview.cardsOnTheWay"),
          value: count(shipments.filter((s) => currentStatus(s) !== "delivered").length),
        },
        {
          id: "delivered",
          label: t("overview.cardsDelivered"),
          value: count(shipments.filter((s) => currentStatus(s) === "delivered").length),
        },
      ],
      activity: [
        ...quotes.map((quote) => ({
          id: quote.id,
          at: quote.createdAt,
          text: shared("overview.activityQuote", { name: quote.name }),
        })),
        ...shipments.map((shipment) => {
          const last = shipment.events[shipment.events.length - 1];
          return {
            id: shipment.id,
            at: last?.at ?? now.toISOString(),
            text: shared("overview.activityShipment", {
              number: shipment.trackingNumber,
              status: shared(`shipmentSteps.${currentStatus(shipment)}.title`),
            }),
          };
        }),
      ],
      tips: [
        ...afterHoursFacts(quotes, settings),
        ...stuckShipmentFacts(shipments, now),
        ...staleQuoteFacts(quotes, now),
      ],
    };
  }, [quotes, shipments, settings, locale]);
}
