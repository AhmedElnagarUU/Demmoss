"use client";

import { useState } from "react";
import { track } from "@/features/tracking/client/track";
import { Button } from "@/shared/ui/button";
import { businessNameOf } from "../business-name";
import { timeSchema, type Settings } from "../types";
import { getLogisticsT } from "../messages";
import { trackEdit } from "../track";
import { useLogistics } from "./logistics-context";
import { BilingualField, PageHeader, Panel, TextInput } from "./ui";

export function SettingsPage() {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const settings = store((state) => state.settings);
  const account = store((state) => state.account);
  const resetDemo = store((state) => state.resetDemo);
  const updateSettings = store((state) => state.updateSettings);
  const [resetDone, setResetDone] = useState(false);
  const [saved, setSaved] = useState(false);

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

      {/* the form restarts from the saved settings after a save or a reset */}
      <SettingsForm
        key={JSON.stringify(settings) + JSON.stringify(shownName)}
        settings={settings}
        shownName={shownName}
        saved={saved}
        onSaved={() => setSaved(true)}
        onEdited={() => setSaved(false)}
      />

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
            <p role="status" className="font-semibold text-text">
              {t("settings.resetDone")}
            </p>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}

type FormProps = {
  settings: Settings;
  shownName: Settings["businessName"];
  saved: boolean;
  onSaved: () => void;
  onEdited: () => void;
};

function SettingsForm({ settings, shownName, saved, onSaved, onEdited }: FormProps) {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const updateSettings = store((state) => state.updateSettings);
  const [name, setName] = useState(shownName);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [officeOpen, setOfficeOpen] = useState(settings.officeOpen);
  const [officeClose, setOfficeClose] = useState(settings.officeClose);
  const timesValid = timeSchema.safeParse(officeOpen).success && timeSchema.safeParse(officeClose).success;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!timesValid) return;
        updateSettings({
          // the name is only "edited" when it really changed, so the registered name is kept otherwise
          ...(name.ar !== shownName.ar || name.en !== shownName.en ? { businessName: name } : {}),
          address,
          phone: phone.trim(),
          whatsapp: whatsapp.trim(),
          officeOpen,
          officeClose,
        });
        trackEdit("settings", config.slug, locale);
        onSaved();
      }}
      onChange={onEdited}
      className="space-y-6"
    >
      <Panel title={t("settings.business")}>
        <BilingualField id="business-name" label={t("settings.name")} value={name} onChange={setName} t={t} />
        <BilingualField
          id="address"
          label={t("settings.address")}
          value={address}
          onChange={setAddress}
          t={t}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="phone"
            label={t("settings.phone")}
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <TextInput
            id="whatsapp"
            label={t("settings.whatsapp")}
            type="tel"
            dir="ltr"
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
          />
          <TextInput
            id="office-open"
            label={t("settings.officeOpen")}
            type="time"
            dir="ltr"
            value={officeOpen}
            onChange={(event) => setOfficeOpen(event.target.value)}
          />
          <TextInput
            id="office-close"
            label={t("settings.officeClose")}
            type="time"
            dir="ltr"
            value={officeClose}
            onChange={(event) => setOfficeClose(event.target.value)}
          />
        </div>
        <p className="text-sm text-muted">{t("settings.officeHint")}</p>
      </Panel>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={!timesValid}>
          {t("common.save")}
        </Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
