"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { SelectInput, TextArea, TextInput } from "@/features/demo-engine/ui";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatNumber, formatTime } from "@/features/demo-engine/format/format";
import { openingOnDateKey } from "../../hours";
import { getRestaurantT } from "../../messages";
import type { ReservationsStore } from "./reservations-store";
import { bookableDates, freeSlots, MAX_GUESTS, validateReservation, type ReservationErrors } from "./slots";
import { occasions, type Occasion } from "./types";

type Props = { store: ReservationsStore; slug: string; locale: Locale; dashboardHref: string };

type Done = { dateKey: string; time: string; guests: number };

// The public "Reserve a table" form: only free times are offered, so a guest cannot book a full slot.
export function ReservationForm({ store, slug, locale, dashboardHref }: Props) {
  const t = getRestaurantT(locale);
  const hours = store((state) => state.settings.hours);
  const settings = store((state) => state.reservationSettings);
  const reservations = store((state) => state.reservations);
  const addReservation = store((state) => state.addReservation);

  const [now] = useState(() => new Date());
  // start on the first day that still has a free table for two (today may be over)
  const [dateKey, setDateKey] = useState(
    () =>
      bookableDates(now).find(
        (key) => freeSlots({ dateKey: key, guests: 2, now, hours, settings, reservations }).length > 0,
      ) ?? toDateKey(now),
  );
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [done, setDone] = useState<Done | null>(null);

  const slots = freeSlots({ dateKey, guests, now, hours, settings, reservations });
  const chosenTime = slots.includes(time) ? time : "";
  const closedThatDay = openingOnDateKey(hours, dateKey)?.closed ?? true;

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateReservation(
      { dateKey, time: chosenTime, guests, name, phone },
      { now, hours, settings, reservations },
    );
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addReservation({
      date: dateKey,
      time: chosenTime,
      guests,
      name,
      phone,
      ...(occasion ? { occasion } : {}),
      ...(note.trim() ? { note: note.trim() } : {}),
    });
    track("demo_action", { locale, template: slug, meta: { kind: "reservation" } });
    setDone({ dateKey, time: chosenTime, guests });
  }

  if (done) {
    return (
      <div role="status" className="space-y-4 rounded-control border border-border bg-surface p-6">
        <h2 className="text-2xl font-bold text-text">{t("reserveForm.doneTitle")}</h2>
        <p className="text-text">
          {t("reserveForm.doneText", {
            day: formatDateKey(done.dateKey, locale),
            time: formatTime(done.time, locale),
            count: formatNumber(done.guests, locale),
          })}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={dashboardHref} className={buttonClasses("primary")}>
            {t("reserveForm.doneDashboard")}
          </Link>
          <Button variant="secondary" onClick={() => setDone(null)}>
            {t("reserveForm.doneAnother")}
          </Button>
        </div>
      </div>
    );
  }

  const errorText = (field: keyof ReservationErrors) =>
    errors[field] ? t(`reserveForm.errors.${field}`) : undefined;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("reserveForm.errorSummary")}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          id="reserve-date"
          label={t("reserveForm.date")}
          value={dateKey}
          aria-invalid={errors.date ? true : undefined}
          onChange={(event) => setDateKey(event.target.value)}
        >
          {bookableDates(now).map((key, index) => (
            <option key={key} value={key}>
              {index === 0 ? `${t("reserveForm.today")} · ` : ""}
              {formatDateKey(key, locale)}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          id="reserve-guests"
          label={t("reserveForm.guests")}
          value={guests}
          aria-invalid={errors.guests ? true : undefined}
          onChange={(event) => setGuests(Number(event.target.value))}
        >
          {Array.from({ length: MAX_GUESTS }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {formatNumber(count, locale)}
            </option>
          ))}
        </SelectInput>
      </div>
      {errors.date ? <FieldError text={errorText("date")} /> : null}

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-text">{t("reserveForm.time")}</legend>
        {slots.length === 0 ? (
          <p className="text-muted">
            {closedThatDay
              ? t("reserveForm.closedDay")
              : t("reserveForm.noSlots", { count: formatNumber(guests, locale) })}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <label
                key={slot}
                className="flex min-h-11 cursor-pointer items-center rounded-control border border-border bg-bg px-4 font-semibold has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus"
              >
                <input
                  type="radio"
                  name="time"
                  value={slot}
                  checked={chosenTime === slot}
                  onChange={() => setTime(slot)}
                  className="sr-only"
                />
                {formatTime(slot, locale)}
              </label>
            ))}
          </div>
        )}
        {errors.time ? <FieldError text={errorText("time")} /> : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <TextInput
            id="reserve-name"
            label={t("reserveForm.name")}
            autoComplete="name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <FieldError text={errorText("name")} /> : null}
        </div>
        <div className="space-y-1.5">
          <TextInput
            id="reserve-phone"
            label={t("reserveForm.phone")}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            value={phone}
            aria-invalid={errors.phone ? true : undefined}
            onChange={(event) => setPhone(event.target.value)}
          />
          {errors.phone ? <FieldError text={errorText("phone")} /> : null}
        </div>
      </div>

      <SelectInput
        id="reserve-occasion"
        label={t("reserveForm.occasion")}
        value={occasion}
        onChange={(event) => setOccasion(event.target.value as Occasion | "")}
      >
        <option value="">{t("reserveForm.noOccasion")}</option>
        {occasions.map((item) => (
          <option key={item} value={item}>
            {t(`occasions.${item}`)}
          </option>
        ))}
      </SelectInput>

      <TextArea
        id="reserve-note"
        label={t("reserveForm.note")}
        value={note}
        maxLength={300}
        onChange={(event) => setNote(event.target.value)}
      />

      <Button type="submit" className="w-full sm:w-auto">
        {t("reserveForm.submit")}
      </Button>
    </form>
  );
}

function FieldError({ text }: { text: string | undefined }) {
  return <p className="border-s-4 border-text ps-2 text-sm font-semibold text-text">{text}</p>;
}
