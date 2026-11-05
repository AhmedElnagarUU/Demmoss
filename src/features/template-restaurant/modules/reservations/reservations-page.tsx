"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { PageHeader, Panel, StatusBadge, TextInput } from "@/features/demo-engine/ui";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { toDateKey } from "@/features/demo-engine/format/dates";
import {
  formatDateKey,
  formatDateTime,
  formatNumber,
  formatTime,
} from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../../messages";
import { phoneWhatsAppUrl } from "@/features/demo-engine/format/phone";
import type { ReservationsStore } from "./reservations-store";
import { allowedReservationStatuses } from "./status";
import { reservationSettingsSchema, type Reservation, type ReservationSettings } from "./types";

type Props = { store: ReservationsStore; slug: string; locale: Locale };
type Filter = "all" | "today" | "new";

export function ReservationsPage({ store, slug, locale }: Props) {
  const t = getRestaurantT(locale);
  const reservations = store((state) => state.reservations);
  const setStatus = store((state) => state.setReservationStatus);
  const businessName = store((state) => businessNameOf(state, locale));
  const [filter, setFilter] = useState<Filter>("all");

  const today = toDateKey(new Date());
  const shown = [...reservations]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((reservation) => {
      if (filter === "today") return reservation.date === today;
      if (filter === "new") return reservation.status === "new";
      return true;
    });
  const newCount = reservations.filter((reservation) => reservation.status === "new").length;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("reservations.filterAll") },
    { id: "today", label: t("reservations.filterToday") },
    { id: "new", label: `${t("reservations.filterNew")} (${formatNumber(newCount, locale)})` },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("reservations.title")} intro={t("reservations.intro")} />

      <div role="group" aria-label={t("reservations.filterLabel")} className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item.id}
            variant={filter === item.id ? "primary" : "secondary"}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {shown.length === 0 ? <p className="text-muted">{t("reservations.empty")}</p> : null}

      <ul className="space-y-3">
        {shown.map((reservation) => (
          <ReservationRow
            key={reservation.id}
            reservation={reservation}
            locale={locale}
            businessName={businessName}
            onStatus={(status) => setStatus(reservation.id, status)}
          />
        ))}
      </ul>

      <SettingsPanel store={store} slug={slug} locale={locale} />
    </div>
  );
}

type RowProps = {
  reservation: Reservation;
  locale: Locale;
  businessName: string;
  onStatus: (status: Reservation["status"]) => void;
};

function ReservationRow({ reservation, locale, businessName, onStatus }: RowProps) {
  const t = getRestaurantT(locale);
  const day = formatDateKey(reservation.date, locale);
  const time = formatTime(reservation.time, locale);
  const message = t("reservations.whatsappMessage", {
    name: reservation.name,
    business: businessName,
    day,
    time,
  });

  return (
    <li className="space-y-3 rounded-control border border-border bg-bg p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-lg font-bold text-text">{reservation.name}</p>
        <StatusBadge label={t(`statuses.${reservation.status}`)} />
      </div>
      <p className="text-text">
        {day} · {time} · {t("reservations.guests", { count: formatNumber(reservation.guests, locale) })}
      </p>
      <p className="text-sm text-muted" dir="ltr">
        {reservation.phone}
      </p>
      {reservation.occasion ? (
        <p className="text-sm text-text">
          {t("reservations.occasion", { occasion: t(`occasions.${reservation.occasion}`) })}
        </p>
      ) : null}
      {reservation.note ? (
        <p className="text-sm text-text">{t("reservations.note", { note: reservation.note })}</p>
      ) : null}
      <p className="text-sm text-muted">
        {t("reservations.received", { when: formatDateTime(reservation.createdAt, locale) })}
      </p>
      <div className="flex flex-wrap gap-2">
        {allowedReservationStatuses(reservation.status).map((status) => (
          <Button
            key={status}
            variant="secondary"
            aria-label={`${t(`statusActions.${status}`)}: ${reservation.name}`}
            onClick={() => onStatus(status)}
          >
            {t(`statusActions.${status}`)}
          </Button>
        ))}
        <a
          href={phoneWhatsAppUrl(reservation.phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("common.whatsappReply")}: ${reservation.name}`}
          className={buttonClasses("whatsapp")}
        >
          {t("common.whatsappReply")}
        </a>
      </div>
    </li>
  );
}

function SettingsPanel({ store, slug, locale }: Props) {
  const t = getRestaurantT(locale);
  const settings = store((state) => state.reservationSettings);
  const update = store((state) => state.updateReservationSettings);
  const [slots, setSlots] = useState(settings.slots.join(", "));
  const [slotMinutes, setSlotMinutes] = useState(settings.slotMinutes);
  const [maxGuests, setMaxGuests] = useState(settings.maxGuestsPerSlot);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    const candidate: ReservationSettings = {
      slotMinutes,
      slots: slots
        .split(/[,\s]+/)
        .filter(Boolean)
        .sort(),
      maxGuestsPerSlot: maxGuests,
    };
    const parsed = reservationSettingsSchema.safeParse(candidate);
    setError(!parsed.success);
    setSaved(parsed.success);
    if (!parsed.success) return;
    update(parsed.data);
    trackEdit("reservation_settings", slug, locale);
  }

  return (
    <Panel title={t("reservations.settingsTitle")}>
      <p className="text-muted">{t("reservations.settingsIntro")}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
        className="space-y-4"
      >
        <TextInput
          id="slots"
          label={t("reservations.slots")}
          dir="ltr"
          value={slots}
          onChange={(event) => setSlots(event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="slot-minutes"
            label={t("reservations.slotMinutes")}
            type="number"
            value={slotMinutes}
            onChange={(event) => setSlotMinutes(event.target.valueAsNumber)}
          />
          <TextInput
            id="max-guests"
            label={t("reservations.maxGuests")}
            type="number"
            value={maxGuests}
            onChange={(event) => setMaxGuests(event.target.valueAsNumber)}
          />
        </div>
        {error ? (
          <p role="alert" className="border-s-4 border-text ps-2 font-semibold">
            {t("reservations.settingsError")}
          </p>
        ) : null}
        <div className="flex items-center gap-3">
          <Button type="submit">{t("common.save")}</Button>
          {saved ? (
            <p role="status" className="font-semibold">
              {t("common.saved")}
            </p>
          ) : null}
        </div>
      </form>
    </Panel>
  );
}
