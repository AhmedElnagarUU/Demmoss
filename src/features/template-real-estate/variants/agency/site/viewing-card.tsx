"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatTime } from "@/features/demo-engine/format/format";
import { track } from "@/features/tracking/client/track";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { getRealEstateT } from "../../../messages";
import {
  bookableDates,
  freeViewingTimes,
  validateViewing,
  type ViewingErrors,
} from "../../../modules/viewings/slots";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { fieldClass, fieldLabel, h2Small, labelClass, pillDark, rtlSafe } from "./styles";

type Props = {
  // the page has one h1: the contact page uses level 1 for this title, the home page level 2
  level: 1 | 2;
  idPrefix: string;
  // a short line under the title (the contact page)
  intro?: string;
};

type Done = { dateKey: string; time: string };

const errorClass = "mt-1 text-[11px] text-(--re-accent)";

// "Schedule a visit": the viewing request of the source (name, phone, property, date, time, message) in its look.
// Only free times are offered, so a visitor cannot book a taken slot. The request lands in the dashboard Viewings.
// Goal: bookings (the one action the whole site leads to).
export function ViewingCard({ level, idPrefix, intro }: Props) {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const shared = getRealEstateT(locale);
  const content = useAgencyStore((state) => state.content);
  const properties = useAgencyStore((state) => state.properties);
  const viewings = useAgencyStore((state) => state.viewings);
  const addViewing = useAgencyStore((state) => state.addViewing);

  const [now] = useState(() => new Date());
  const [propertyId, setPropertyId] = useState("");
  const freeFor = (dateKey: string) =>
    freeViewingTimes({ dateKey, viewings, now, ...(propertyId ? { propertyId } : {}) });
  const dates = bookableDates(now);
  const [dateKey, setDateKey] = useState(
    () => dates.find((key) => freeFor(key).length > 0) ?? toDateKey(now),
  );
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<ViewingErrors>({});
  const [done, setDone] = useState<Done | null>(null);

  const times = freeFor(dateKey);
  const chosenTime = times.includes(time) ? time : "";
  const root = `/${locale}${config.basePath}`;
  const Heading = level === 1 ? "h1" : "h2";
  const titleId = `${idPrefix}-title`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateViewing(
      { dateKey, time: chosenTime, name, phone, ...(propertyId ? { propertyId } : {}) },
      { viewings, now },
    );
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addViewing({
      ...(propertyId ? { propertyId } : {}),
      name,
      phone,
      date: dateKey,
      time: chosenTime,
      ...(note.trim() ? { note: note.trim() } : {}),
    });
    track("demo_action", { locale, template: config.slug, meta: { kind: "viewing" } });
    setDone({ dateKey, time: chosenTime });
  }

  const errorText = (field: keyof ViewingErrors) =>
    errors[field] ? shared(`viewingForm.errors.${field}`) : undefined;

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-labelledby={titleId}
      className="rounded-[28px] bg-surface p-[42px] max-[640px]:px-5 max-[640px]:py-[26px]"
    >
      <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("contact.eyebrow")}</p>
      <Heading id={titleId} className={`${h2Small} mb-[30px]`}>
        {content.contact.title[locale]}
      </Heading>
      {intro ? <p className="-mt-3 mb-[30px] text-sm text-muted">{intro}</p> : null}

      {done ? (
        <div
          role="status"
          className="space-y-4 rounded-[14px] border border-(--re-gold) bg-(--re-gold)/10 px-5 py-4 text-xs tracking-[0.06em]"
        >
          <h3 className="text-base font-medium">{shared("viewingForm.doneTitle")}</h3>
          <p>
            {shared("viewingForm.doneText", {
              day: formatDateKey(done.dateKey, locale),
              time: formatTime(done.time, locale),
            })}
          </p>
          <Link href={`${root}/dashboard/viewings`} className={pillDark}>
            {shared("viewingForm.doneDashboard")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[22px] max-[640px]:grid-cols-1">
          {Object.keys(errors).length > 0 ? (
            <p role="alert" className="col-span-full text-xs font-medium text-(--re-accent)">
              {shared("viewingForm.errorSummary")}
            </p>
          ) : null}
          <div>
            <label htmlFor={`${idPrefix}-name`} className={fieldLabel}>
              {t("contact.name")}
            </label>
            <input
              id={`${idPrefix}-name`}
              autoComplete="name"
              value={name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
            {errors.name ? <p className={errorClass}>{errorText("name")}</p> : null}
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`} className={fieldLabel}>
              {t("contact.phone")}
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={phone}
              aria-invalid={Boolean(errors.phone)}
              onChange={(event) => setPhone(event.target.value)}
              className={`${fieldClass} text-start`}
            />
            {errors.phone ? <p className={errorClass}>{errorText("phone")}</p> : null}
          </div>
          <div>
            <label htmlFor={`${idPrefix}-property`} className={fieldLabel}>
              {t("contact.property")}
            </label>
            <select
              id={`${idPrefix}-property`}
              value={propertyId}
              onChange={(event) => setPropertyId(event.target.value)}
              className={fieldClass}
            >
              <option value="">{t("contact.general")}</option>
              {properties
                .filter((item) => propertyState(item) !== "sold_out")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title[locale]}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-date`} className={fieldLabel}>
              {t("contact.date")}
            </label>
            <select
              id={`${idPrefix}-date`}
              value={dateKey}
              onChange={(event) => setDateKey(event.target.value)}
              className={fieldClass}
            >
              {dates.map((key) => (
                <option key={key} value={key}>
                  {formatDateKey(key, locale)}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="col-span-full">
            <legend className={fieldLabel}>{t("contact.time")}</legend>
            {times.length === 0 ? (
              <p className="text-[13px] text-muted">{shared("viewingForm.noTimes")}</p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {times.map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`${idPrefix}-time`}
                      value={slot}
                      checked={chosenTime === slot}
                      onChange={() => setTime(slot)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-9 items-center rounded-full border border-border px-4 text-xs tracking-[0.08em] text-text transition-colors duration-300 hover:border-text peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                      {formatTime(slot, locale)}
                    </span>
                  </label>
                ))}
              </div>
            )}
            {errors.time ? <p className={errorClass}>{errorText("time")}</p> : null}
          </fieldset>
          <div className="col-span-full">
            <label htmlFor={`${idPrefix}-note`} className={fieldLabel}>
              {t("contact.message")}
            </label>
            <textarea
              id={`${idPrefix}-note`}
              rows={2}
              maxLength={300}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className={`${fieldClass} min-h-[70px] resize-y`}
            />
          </div>
          <div className="col-span-full">
            <button type="submit" className={`${pillDark} ${rtlSafe}`}>
              {shared("viewingForm.submit")}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
