import { useMemo } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { Overview } from "../../dashboard/restaurant-context";
import { buildCustomers, type Customer } from "../../customers";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatNumber } from "@/features/demo-engine/format/format";
import { eventWaitingFacts } from "../../modules/event-requests/tips";
import { noShowFacts } from "../../modules/reservations/tips";
import { afterHoursFacts, emptyCategoryFacts } from "../../value-tips";
import { getFineDiningT } from "./messages";
import { useFineDiningStore } from "./store";

// Overview cards, activity, and value tips of Zaytouna, computed from its reservations and event requests.
export function useOverview(locale: Locale): Overview {
  const reservations = useFineDiningStore((state) => state.reservations);
  const eventRequests = useFineDiningStore((state) => state.eventRequests);
  const hours = useFineDiningStore((state) => state.settings.hours);
  const menu = useFineDiningStore((state) => state.menu);

  return useMemo(() => {
    const t = getFineDiningT(locale);
    const today = toDateKey(new Date());
    const holdingToday = reservations.filter(
      (reservation) =>
        reservation.date === today && ["new", "confirmed", "seated"].includes(reservation.status),
    );

    return {
      cards: [
        { id: "today", label: t("overview.cardsToday"), value: formatNumber(holdingToday.length, locale) },
        {
          id: "new",
          label: t("overview.cardsNew"),
          value: formatNumber(
            reservations.filter((reservation) => reservation.status === "new").length,
            locale,
          ),
        },
        {
          id: "guests",
          label: t("overview.cardsGuests"),
          value: formatNumber(
            holdingToday.reduce((total, reservation) => total + reservation.guests, 0),
            locale,
          ),
        },
        {
          id: "events",
          label: t("overview.cardsEvents"),
          value: formatNumber(eventRequests.filter((request) => request.status === "new").length, locale),
        },
      ],
      activity: [
        ...reservations.map((reservation) => ({
          id: reservation.id,
          at: reservation.createdAt,
          text: t("overview.activityReservation", {
            name: reservation.name,
            count: formatNumber(reservation.guests, locale),
            day: formatDateKey(reservation.date, locale),
          }),
        })),
        ...eventRequests.map((request) => ({
          id: request.id,
          at: request.createdAt,
          text: t("overview.activityEvent", { name: request.name }),
        })),
      ],
      tips: [
        ...afterHoursFacts([...reservations, ...eventRequests], hours),
        ...noShowFacts(reservations),
        ...eventWaitingFacts(eventRequests),
        ...emptyCategoryFacts(menu),
      ],
    };
  }, [reservations, eventRequests, hours, menu, locale]);
}

export function useCustomers(): Customer[] {
  const reservations = useFineDiningStore((state) => state.reservations);
  const eventRequests = useFineDiningStore((state) => state.eventRequests);

  return useMemo(
    () =>
      buildCustomers([
        ...reservations.map((reservation) => ({
          name: reservation.name,
          phone: reservation.phone,
          date: reservation.date,
        })),
        ...eventRequests.map((request) => ({ name: request.name, phone: request.phone, date: request.date })),
      ]),
    [reservations, eventRequests],
  );
}
