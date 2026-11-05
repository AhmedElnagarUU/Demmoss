"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import { propertyState, unitCounts } from "../availability";
import { useRealEstate } from "../context";
import { ErrorSummary, SelectInput, TextArea, TextInput } from "@/features/demo-engine/ui";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatTime } from "@/features/demo-engine/format/format";
import { formatPrice } from "../format";
import { getRealEstateT } from "../messages";
import {
  bookableDates,
  freeViewingTimes,
  validateViewing,
  type ViewingErrors,
} from "../modules/viewings/slots";
import { pillClasses } from "./site-ui";

type Props = {
  // fixed property (property page); without it the visitor chooses one, or none
  propertyId?: string;
  defaultUnitId?: string;
  idPrefix: string;
  titleId: string;
};

type Done = { dateKey: string; time: string };

// "Schedule a viewing": only free times are offered, so a visitor cannot book a taken slot.
export function ViewingForm({ propertyId, defaultUnitId = "", idPrefix, titleId }: Props) {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const properties = store((state) => state.properties);
  const viewings = store((state) => state.viewings);
  const addViewing = store((state) => state.addViewing);

  const [now] = useState(() => new Date());
  const [chosenProperty, setChosenProperty] = useState(propertyId ?? "");
  const [unitId, setUnitId] = useState(defaultUnitId);
  const property = properties.find((item) => item.id === chosenProperty);
  const freeFor = (dateKey: string) =>
    freeViewingTimes({ dateKey, viewings, now, ...(chosenProperty ? { propertyId: chosenProperty } : {}) });

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
  const freeUnits = property?.units.filter((unit) => unit.status === "available") ?? [];
  const chosenUnit = freeUnits.some((unit) => unit.id === unitId) ? unitId : "";
  const root = `/${locale}${config.basePath}`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateViewing(
      { dateKey, time: chosenTime, name, phone, ...(chosenProperty ? { propertyId: chosenProperty } : {}) },
      { viewings, now },
    );
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addViewing({
      ...(chosenProperty ? { propertyId: chosenProperty } : {}),
      ...(chosenUnit ? { unitId: chosenUnit } : {}),
      name,
      phone,
      date: dateKey,
      time: chosenTime,
      ...(note.trim() ? { note: note.trim() } : {}),
    });
    track("demo_action", { locale, template: config.slug, meta: { kind: "viewing" } });
    setDone({ dateKey, time: chosenTime });
  }

  if (done) {
    return (
      <div role="status" className="space-y-4 rounded-control border border-border bg-surface p-6">
        <h3 className="text-xl font-semibold text-text">{t("viewingForm.doneTitle")}</h3>
        <p className="text-text">
          {t("viewingForm.doneText", {
            day: formatDateKey(done.dateKey, locale),
            time: formatTime(done.time, locale),
          })}
        </p>
        <Link href={`${root}/dashboard/viewings`} className={pillClasses.solid}>
          {t("viewingForm.doneDashboard")}
        </Link>
      </div>
    );
  }

  const errorText = (field: keyof ViewingErrors) =>
    errors[field] ? t(`viewingForm.errors.${field}`) : undefined;

  return (
    <form onSubmit={submit} noValidate aria-labelledby={titleId} className="space-y-5">
      {Object.keys(errors).length > 0 ? <ErrorSummary text={t("viewingForm.errorSummary")} /> : null}

      {propertyId ? null : (
        <SelectInput
          id={`${idPrefix}-property`}
          label={t("viewingForm.property")}
          value={chosenProperty}
          onChange={(event) => {
            setChosenProperty(event.target.value);
            setUnitId("");
          }}
        >
          <option value="">{t("common.generalVisit")}</option>
          {properties
            .filter((item) => propertyState(item) !== "sold_out")
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.title[locale]}
              </option>
            ))}
        </SelectInput>
      )}

      {freeUnits.length > 0 ? (
        <SelectInput
          id={`${idPrefix}-unit`}
          label={t("viewingForm.unit")}
          value={chosenUnit}
          onChange={(event) => setUnitId(event.target.value)}
        >
          <option value="">
            {t("viewingForm.anyUnit", { count: String(unitCounts(property?.units ?? []).available) })}
          </option>
          {freeUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.label} · {formatPrice(unit.price, locale)}
            </option>
          ))}
        </SelectInput>
      ) : null}

      <SelectInput
        id={`${idPrefix}-date`}
        label={t("viewingForm.date")}
        value={dateKey}
        error={errorText("date")}
        onChange={(event) => setDateKey(event.target.value)}
      >
        {dates.map((key, index) => (
          <option key={key} value={key}>
            {index === 0 ? `${t("viewingForm.today")} · ` : ""}
            {formatDateKey(key, locale)}
          </option>
        ))}
      </SelectInput>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-text">{t("viewingForm.time")}</legend>
        {times.length === 0 ? (
          <p className="text-muted">{t("viewingForm.noTimes")}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
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
                <span className="inline-flex min-h-11 items-center rounded-full border border-border px-4 font-semibold text-text peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                  {formatTime(slot, locale)}
                </span>
              </label>
            ))}
          </div>
        )}
        {errors.time ? (
          <p className="text-sm font-semibold text-text">{t("viewingForm.errors.time")}</p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-name`}
          label={t("viewingForm.name")}
          autoComplete="name"
          value={name}
          error={errorText("name")}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          id={`${idPrefix}-phone`}
          label={t("viewingForm.phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={phone}
          error={errorText("phone")}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <TextArea
        id={`${idPrefix}-note`}
        label={t("viewingForm.note")}
        maxLength={300}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="submit" className={pillClasses.solid}>
        {t("viewingForm.submit")}
      </button>
    </form>
  );
}
