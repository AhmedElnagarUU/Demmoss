"use client";

import { useState } from "react";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { BilingualField, ErrorSummary, PageHeader, Panel, TextInput } from "@/features/demo-engine/ui";
import { track } from "@/features/tracking/client/track";
import { Button } from "@/shared/ui/button";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import type { Schedule, Settings } from "../types";
import { ScheduleEditor } from "./schedule-editor";

export function SettingsPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const settings = store((state) => state.settings);
  const account = store((state) => state.account);
  const doctors = store((state) => state.doctors);
  const resetDemo = store((state) => state.resetDemo);
  const updateSettings = store((state) => state.updateSettings);
  const [resetDone, setResetDone] = useState(false);
  // the form keeps its own draft; it starts over only when the demo is reset
  const [formVersion, setFormVersion] = useState(0);

  // The form shows the name that is really displayed (the registered business name, if any).
  const shownName = {
    ar: businessNameOf({ account, settings }, "ar"),
    en: businessNameOf({ account, settings }, "en"),
  };
  const singleDoctor = config.singleDoctor ? doctors[0] : undefined;

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

      <SettingsForm
        key={formVersion}
        settings={settings}
        shownName={shownName}
        schedule={singleDoctor?.schedule}
      />

      <Panel title={t("settings.resetTitle")}>
        <p className="text-muted">{t("settings.resetText")}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              resetDemo();
              setFormVersion((version) => version + 1);
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

type FormProps = { settings: Settings; shownName: Settings["businessName"]; schedule: Schedule | undefined };

function SettingsForm({ settings, shownName, schedule }: FormProps) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const updateSettings = store((state) => state.updateSettings);
  const doctors = store((state) => state.doctors);
  const setDoctors = store((state) => state.setDoctors);
  const [draft, setDraft] = useState({
    businessName: shownName,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    address: settings.address,
    schedule,
  });
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    if (!/^\d{8,15}$/.test(draft.whatsapp)) return setError(true);
    setError(false);
    const nameChanged = draft.businessName.ar !== shownName.ar || draft.businessName.en !== shownName.en;
    updateSettings({
      phone: draft.phone,
      whatsapp: draft.whatsapp,
      address: draft.address,
      ...(nameChanged ? { businessName: draft.businessName } : {}),
    });
    const newSchedule = draft.schedule;
    if (config.singleDoctor && newSchedule) {
      setDoctors(
        doctors.map((doctor, index) => (index === 0 ? { ...doctor, schedule: newSchedule } : doctor)),
      );
    }
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
      </Panel>

      {draft.schedule ? (
        <Panel title={t("settings.hours")}>
          <p className="text-muted">{t("settings.hoursIntro")}</p>
          <ScheduleEditor
            schedule={draft.schedule}
            locale={locale}
            idPrefix="settings-hours"
            onChange={(next) => setDraft({ ...draft, schedule: next })}
          />
        </Panel>
      ) : null}

      {error ? <ErrorSummary text={t("settings.whatsappError")} /> : null}
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
}
