"use client";

import { useState } from "react";
import { track } from "@/features/tracking/client/track";
import { Button } from "@/shared/ui/button";
import { businessNameOf } from "../business-name";
import { minutesOf } from "../dates";
import { weekdayName } from "../format";
import { getRestaurantT } from "../messages";
import type { Settings } from "../types";
import { useRestaurant } from "./restaurant-context";
import { trackEdit } from "./track-edit";
import { BilingualField, PageHeader, Panel, SelectInput, TextInput } from "./ui";

const currencies = ["SAR", "AED", "KWD", "QAR", "BHD", "OMR", "EGP", "JOD", "USD", "EUR"];

export function SettingsPage() {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const settings = store((state) => state.settings);
  const account = store((state) => state.account);
  const resetDemo = store((state) => state.resetDemo);
  const updateSettings = store((state) => state.updateSettings);
  const [resetDone, setResetDone] = useState(false);

  // The form shows the name that is really displayed (the registered business name, if any).
  const shownName = {
    ar: businessNameOf({ account, settings }, "ar"),
    en: businessNameOf({ account, settings }, "en"),
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("settings.title")} intro={t("settings.intro")} />

      <Panel title={t("settings.palette")}>
        <p className="text-muted">{t("settings.paletteHint")}</p>
        <fieldset className="flex flex-wrap gap-3">
          <legend className="sr-only">{t("settings.palette")}</legend>
          {config.palettes.map((palette) => (
            <label
              key={palette.id}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-border px-3 py-2 font-semibold has-[:checked]:border-2 has-[:checked]:border-text has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus"
            >
              <input
                type="radio"
                name="palette"
                value={palette.id}
                checked={settings.palette === palette.id}
                onChange={() => {
                  updateSettings({ palette: palette.id });
                  trackEdit("settings", config.slug, locale);
                }}
                className="size-4"
              />
              <span
                aria-hidden="true"
                className="inline-block size-5 rounded-full border border-border"
                style={{ backgroundColor: palette.vars["--color-primary"] }}
              />
              {palette.name[locale]}
            </label>
          ))}
        </fieldset>
      </Panel>

      <SettingsForm key={JSON.stringify([settings, shownName])} settings={settings} shownName={shownName} />

      <Panel title={t("settings.resetTitle")}>
        <p className="text-muted">{t("settings.resetText")}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              resetDemo();
              track("demo_reset", { locale, template: config.slug });
              setResetDone(true);
            }}
          >
            {t("settings.resetButton")}
          </Button>
          {resetDone ? (
            <p role="status" className="font-semibold">
              {t("settings.resetDone")}
            </p>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}

type FormProps = { settings: Settings; shownName: Settings["businessName"] };

function SettingsForm({ settings, shownName }: FormProps) {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const updateSettings = store((state) => state.updateSettings);
  const [draft, setDraft] = useState({
    businessName: shownName,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    address: settings.address,
    currency: settings.currency,
    hours: settings.hours,
  });
  const [error, setError] = useState<"hours" | "whatsapp" | null>(null);
  const [saved, setSaved] = useState(false);

  function save() {
    const hoursOk = draft.hours.every((day) => day.closed || minutesOf(day.close) > minutesOf(day.open));
    if (!hoursOk) return setError("hours");
    if (!/^\d{8,15}$/.test(draft.whatsapp)) return setError("whatsapp");
    setError(null);
    const nameChanged = draft.businessName.ar !== shownName.ar || draft.businessName.en !== shownName.en;
    updateSettings({
      phone: draft.phone,
      whatsapp: draft.whatsapp,
      address: draft.address,
      currency: draft.currency,
      hours: draft.hours,
      ...(nameChanged ? { businessName: draft.businessName } : {}),
    });
    trackEdit("settings", config.slug, locale);
    setSaved(true);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
      onChange={() => setSaved(false)}
      className="space-y-6"
    >
      <Panel title={t("settings.business")}>
        <BilingualField
          id="business-name"
          label={t("settings.businessName")}
          value={draft.businessName}
          onChange={(businessName) => setDraft({ ...draft, businessName })}
          t={t}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="settings-phone"
            label={t("settings.phone")}
            inputMode="tel"
            dir="ltr"
            value={draft.phone}
            onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
          />
          <TextInput
            id="settings-whatsapp"
            label={t("settings.whatsapp")}
            inputMode="numeric"
            dir="ltr"
            value={draft.whatsapp}
            onChange={(event) => setDraft({ ...draft, whatsapp: event.target.value })}
          />
        </div>
        <BilingualField
          id="settings-address"
          label={t("settings.address")}
          value={draft.address}
          onChange={(address) => setDraft({ ...draft, address })}
          t={t}
        />
        <SelectInput
          id="settings-currency"
          label={t("settings.currency")}
          value={draft.currency}
          onChange={(event) => setDraft({ ...draft, currency: event.target.value })}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </SelectInput>
      </Panel>

      <Panel title={t("settings.hours")}>
        <ul className="space-y-3">
          {draft.hours.map((day) => (
            <li key={day.day} className="flex flex-wrap items-end gap-3">
              <p className="w-28 font-semibold">{weekdayName(day.day, locale)}</p>
              <label className="flex min-h-11 items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={day.closed}
                  onChange={(event) => setDay(day.day, { closed: event.target.checked })}
                  className="size-5"
                />
                {t("settings.closed")}
                <span className="sr-only">{weekdayName(day.day, locale)}</span>
              </label>
              <TextInput
                id={`hours-${day.day}-open`}
                label={`${t("settings.open")} (${weekdayName(day.day, locale)})`}
                type="time"
                disabled={day.closed}
                value={day.open}
                onChange={(event) => setDay(day.day, { open: event.target.value })}
              />
              <TextInput
                id={`hours-${day.day}-close`}
                label={`${t("settings.close")} (${weekdayName(day.day, locale)})`}
                type="time"
                disabled={day.closed}
                value={day.close}
                onChange={(event) => setDay(day.day, { close: event.target.value })}
              />
            </li>
          ))}
        </ul>
      </Panel>

      {error ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold">
          {t(error === "hours" ? "settings.hoursError" : "settings.whatsappError")}
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
  );

  function setDay(day: number, patch: Partial<Settings["hours"][number]>) {
    setDraft({
      ...draft,
      hours: draft.hours.map((entry) => (entry.day === day ? { ...entry, ...patch } : entry)),
    });
  }
}
