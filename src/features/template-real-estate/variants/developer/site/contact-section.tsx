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
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { Reveal } from "./reveal";
import { container, fieldClass, fieldLabel, h2Big, labelClass, pill, rtlSafe, sectionPad } from "./styles";

type Done = { dateKey: string; time: string };

const errorClass = "mt-1 text-[11px] text-(--re-error)";

// "Book a viewing": the viewing request of the source in its look, next to the studio details and a drawn map.
// Only free times are offered, so a visitor cannot book a taken slot. The request lands in the dashboard Viewings.
// Goal: bookings (the one action the whole site leads to).
export function ContactSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const content = useDeveloperStore((state) => state.content);
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`${sectionPad} relative overflow-x-clip bg-bg`}
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} text-muted`}>{t("contact.eyebrow")}</p>
        </Reveal>
        <Reveal>
          <Heading id="contact-title" className={h2Big}>
            {content.contact.title[locale]}
          </Heading>
        </Reveal>
        <div className="mt-[70px] grid grid-cols-[1.15fr_0.85fr] gap-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-14">
          <Reveal>
            <ViewingRequest />
          </Reveal>
          <Reveal>
            <StudioInfo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ViewingRequest() {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const shared = getRealEstateT(locale);
  const properties = useDeveloperStore((state) => state.properties);
  const viewings = useDeveloperStore((state) => state.viewings);
  const addViewing = useDeveloperStore((state) => state.addViewing);

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

  if (done) {
    return (
      <div role="status" className="space-y-4 border border-primary bg-primary/5 px-[26px] py-[22px]">
        <h3 className="text-base font-normal text-(--re-accent)">{shared("viewingForm.doneTitle")}</h3>
        <p className="text-[13px] tracking-[0.06em] text-(--re-accent)">
          {shared("viewingForm.doneText", {
            day: formatDateKey(done.dateKey, locale),
            time: formatTime(done.time, locale),
          })}
        </p>
        <Link href={`${root}/dashboard/viewings`} className={pill}>
          {shared("viewingForm.doneDashboard")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label={shared("viewingForm.submit")}
      className="grid grid-cols-2 gap-x-6 gap-y-[26px] max-[640px]:grid-cols-1"
    >
      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="col-span-full text-xs font-medium text-(--re-error)">
          {shared("viewingForm.errorSummary")}
        </p>
      ) : null}
      <div>
        <label htmlFor="contact-name" className={fieldLabel}>
          {t("contact.name")}
        </label>
        <input
          id="contact-name"
          autoComplete="name"
          value={name}
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => setName(event.target.value)}
          className={`${fieldClass} ${errors.name ? "border-(--re-error)" : ""}`}
        />
        {errors.name ? <p className={errorClass}>{errorText("name")}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-phone" className={fieldLabel}>
          {t("contact.phone")}
        </label>
        <input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={phone}
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => setPhone(event.target.value)}
          className={`${fieldClass} text-start ${errors.phone ? "border-(--re-error)" : ""}`}
        />
        {errors.phone ? <p className={errorClass}>{errorText("phone")}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-property" className={fieldLabel}>
          {t("contact.property")}
        </label>
        <select
          id="contact-property"
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
        <label htmlFor="contact-date" className={fieldLabel}>
          {t("contact.date")}
        </label>
        <select
          id="contact-date"
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
          <p className="text-sm text-muted">{shared("viewingForm.noTimes")}</p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {times.map((slot) => (
              <label key={slot} className="cursor-pointer">
                <input
                  type="radio"
                  name="contact-time"
                  value={slot}
                  checked={chosenTime === slot}
                  onChange={() => setTime(slot)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-9 items-center rounded-full border border-border px-[18px] text-xs tracking-[0.08em] text-text transition-colors duration-300 hover:border-text/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus motion-reduce:transition-none">
                  {formatTime(slot, locale)}
                </span>
              </label>
            ))}
          </div>
        )}
        {errors.time ? <p className={errorClass}>{errorText("time")}</p> : null}
      </fieldset>
      <div className="col-span-full">
        <label htmlFor="contact-note" className={fieldLabel}>
          {t("contact.message")}
        </label>
        <textarea
          id="contact-note"
          rows={3}
          maxLength={300}
          placeholder={t("contact.messagePlaceholder")}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className={`${fieldClass} min-h-[90px] resize-y placeholder:text-muted`}
        />
      </div>
      <div className="col-span-full">
        <button type="submit" className={`${pill} self-start`}>
          {shared("viewingForm.submit")}
        </button>
      </div>
    </form>
  );
}

const infoTitle = `mb-2 text-[11px] font-normal uppercase tracking-[0.26em] text-muted ${rtlSafe}`;

// The studio address, phone, email and hours, and the source's drawn map: a 40px grid, a faint road and an accent pin.
function StudioInfo() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const settings = useDeveloperStore((state) => state.settings);

  return (
    <div>
      <h3 className={infoTitle}>{t("contact.studio")}</h3>
      <p className="mb-[26px] text-sm">{settings.address[locale]}</p>
      <h3 className={infoTitle}>{t("contact.contactTitle")}</h3>
      <p className="mb-[26px] text-sm">
        <span dir="ltr" className="block text-start">
          {settings.phone}
        </span>
        {t("contact.email")}
      </p>
      <h3 className={infoTitle}>{t("contact.hours")}</h3>
      <p className="mb-[26px] text-sm">{settings.hours[locale]}</p>
      <div
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        className="relative mt-2.5 h-60 overflow-hidden border border-border bg-surface"
      >
        <div
          style={{ left: "-10%", top: "55%", transform: "rotate(-14deg)" }}
          className="absolute h-3.5 w-[130%] bg-primary/10"
        />
        <div
          style={{ left: "38%", top: "-10%", transform: "rotate(12deg)" }}
          className="absolute h-[130%] w-2.5 bg-text/5"
        />
        <div
          style={{ left: "55%", top: "42%", transform: "rotate(-45deg)" }}
          className="absolute z-[2] size-[22px] rounded-[50%_50%_50%_0] bg-primary shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_60%,transparent)] after:absolute after:inset-[7px] after:rounded-full after:bg-bg"
        />
        <p
          className={`absolute bottom-3 start-4 z-[2] text-[10px] uppercase tracking-[0.24em] text-muted ${rtlSafe}`}
        >
          {t("contact.mapLabel")}
        </p>
      </div>
    </div>
  );
}
