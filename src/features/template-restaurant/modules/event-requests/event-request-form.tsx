"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { SelectInput, TextArea, TextInput } from "../../dashboard/ui";
import { addDays, toDateKey } from "../../dates";
import { getRestaurantT } from "../../messages";
import type { EventRequestsStore } from "./event-requests-store";
import {
  EVENT_MAX_GUESTS,
  EVENT_MIN_GUESTS,
  EVENT_WINDOW_DAYS,
  validateEventRequest,
  type EventRequestErrors,
} from "./validate";
import { eventBudgets, eventTypes, type EventBudget, type EventType } from "./types";

type Props = { store: EventRequestsStore; slug: string; locale: Locale; dashboardHref: string };

// The private-event request form: the highest-value lead of a fine-dining restaurant.
export function EventRequestForm({ store, slug, locale, dashboardHref }: Props) {
  const t = getRestaurantT(locale);
  const addEventRequest = store((state) => state.addEventRequest);

  const [now] = useState(() => new Date());
  const [type, setType] = useState<EventType>("birthday");
  const [dateKey, setDateKey] = useState(toDateKey(addDays(now, 14)));
  const [guests, setGuests] = useState(12);
  const [budget, setBudget] = useState<EventBudget | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<EventRequestErrors>({});
  const [doneFor, setDoneFor] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateEventRequest({ dateKey, guests, name, phone }, now);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addEventRequest({
      type,
      date: dateKey,
      guests,
      ...(budget ? { budget } : {}),
      name,
      phone,
      details: details.trim(),
    });
    track("demo_action", { locale, template: slug, meta: { kind: "event_request" } });
    setDoneFor(name.trim());
  }

  if (doneFor !== null) {
    return (
      <div role="status" className="space-y-4 rounded-control border border-border bg-surface p-6">
        <h2 className="text-2xl font-bold text-text">{t("eventForm.doneTitle")}</h2>
        <p className="text-text">{t("eventForm.doneText", { name: doneFor })}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={dashboardHref} className={buttonClasses("primary")}>
            {t("eventForm.doneDashboard")}
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              setDoneFor(null);
              setName("");
              setPhone("");
              setDetails("");
            }}
          >
            {t("eventForm.doneAnother")}
          </Button>
        </div>
      </div>
    );
  }

  const errorText = (field: keyof EventRequestErrors) =>
    errors[field] ? t(`eventForm.errors.${field}`) : undefined;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("eventForm.errorSummary")}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          id="event-type"
          label={t("eventForm.type")}
          value={type}
          onChange={(event) => setType(event.target.value as EventType)}
        >
          {eventTypes.map((item) => (
            <option key={item} value={item}>
              {t(`eventTypes.${item}`)}
            </option>
          ))}
        </SelectInput>
        <div className="space-y-1.5">
          <TextInput
            id="event-date"
            label={t("eventForm.date")}
            type="date"
            min={toDateKey(now)}
            max={toDateKey(addDays(now, EVENT_WINDOW_DAYS))}
            value={dateKey}
            aria-invalid={errors.date ? true : undefined}
            onChange={(event) => setDateKey(event.target.value)}
          />
          {errors.date ? <FieldError text={errorText("date")} /> : null}
        </div>
        <div className="space-y-1.5">
          <TextInput
            id="event-guests"
            label={t("eventForm.guests")}
            type="number"
            min={EVENT_MIN_GUESTS}
            max={EVENT_MAX_GUESTS}
            value={guests}
            aria-invalid={errors.guests ? true : undefined}
            onChange={(event) => setGuests(event.target.valueAsNumber)}
          />
          {errors.guests ? <FieldError text={errorText("guests")} /> : null}
        </div>
        <SelectInput
          id="event-budget"
          label={t("eventForm.budget")}
          value={budget}
          onChange={(event) => setBudget(event.target.value as EventBudget | "")}
        >
          <option value="">{t("eventForm.noBudget")}</option>
          {eventBudgets.map((item) => (
            <option key={item} value={item}>
              {t(`budgets.${item}`)}
            </option>
          ))}
        </SelectInput>
        <div className="space-y-1.5">
          <TextInput
            id="event-name"
            label={t("eventForm.name")}
            autoComplete="name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <FieldError text={errorText("name")} /> : null}
        </div>
        <div className="space-y-1.5">
          <TextInput
            id="event-phone"
            label={t("eventForm.phone")}
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

      <TextArea
        id="event-details"
        label={t("eventForm.details")}
        value={details}
        maxLength={600}
        onChange={(event) => setDetails(event.target.value)}
      />

      <Button type="submit" className="w-full sm:w-auto">
        {t("eventForm.submit")}
      </Button>
    </form>
  );
}

function FieldError({ text }: { text: string | undefined }) {
  return <p className="border-s-4 border-text ps-2 text-sm font-semibold text-text">{text}</p>;
}
