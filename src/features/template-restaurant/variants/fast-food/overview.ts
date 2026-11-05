import { useMemo } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { Overview } from "../../dashboard/restaurant-context";
import { buildCustomers, type Customer } from "../../customers";
import { toDateKey } from "../../dates";
import { formatNumber, formatPrice } from "../../format";
import { directOrderFacts, orderTrackingFacts } from "../../modules/orders/tips";
import { afterHoursFacts, emptyCategoryFacts } from "../../value-tips";
import { getFastFoodT } from "./messages";
import { useFastFoodStore } from "./store";

// Overview cards, activity, and value tips of Smash Lab, computed from its orders and offers.
export function useOverview(locale: Locale): Overview {
  const orders = useFastFoodStore((state) => state.orders);
  const offers = useFastFoodStore((state) => state.offers);
  const hours = useFastFoodStore((state) => state.settings.hours);
  const currency = useFastFoodStore((state) => state.settings.currency);
  const menu = useFastFoodStore((state) => state.menu);

  return useMemo(() => {
    const t = getFastFoodT(locale);
    const now = new Date();
    const today = toDateKey(now);
    const todays = orders.filter(
      (order) => order.status !== "cancelled" && toDateKey(new Date(order.createdAt)) === today,
    );

    return {
      cards: [
        { id: "today", label: t("overview.cardsToday"), value: formatNumber(todays.length, locale) },
        {
          id: "new",
          label: t("overview.cardsNew"),
          value: formatNumber(orders.filter((order) => order.status === "new").length, locale),
        },
        {
          id: "sales",
          label: t("overview.cardsSales"),
          value: formatPrice(
            todays.reduce((total, order) => total + order.total, 0),
            currency,
            locale,
          ),
        },
        {
          id: "offers",
          label: t("overview.cardsOffers"),
          value: formatNumber(offers.filter((offer) => offer.active).length, locale),
        },
      ],
      activity: orders.map((order) => ({
        id: order.id,
        at: order.createdAt,
        text: t("overview.activityOrder", {
          name: order.name,
          number: formatNumber(order.number, locale),
          total: formatPrice(order.total, currency, locale),
        }),
      })),
      tips: [
        ...orderTrackingFacts(orders),
        ...directOrderFacts(orders, now),
        ...afterHoursFacts(orders, hours),
        ...emptyCategoryFacts(menu),
      ],
    };
  }, [orders, offers, hours, currency, menu, locale]);
}

export function useCustomers(): Customer[] {
  const orders = useFastFoodStore((state) => state.orders);

  return useMemo(
    () =>
      buildCustomers(
        orders.map((order) => ({
          name: order.name,
          phone: order.phone,
          date: toDateKey(new Date(order.createdAt)),
        })),
      ),
    [orders],
  );
}
