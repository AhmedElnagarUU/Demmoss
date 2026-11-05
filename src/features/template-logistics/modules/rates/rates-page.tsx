"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { NumberInput, PageHeader, Panel, parseNumber } from "../../dashboard/ui";
import { getLogisticsT } from "../../messages";
import { trackEdit } from "../../track";
import { transportModes, type TransportMode } from "../../types";
import type { RatesStore } from "./rates-store";
import type { ModeRate } from "./types";

type Props = { store: RatesStore; slug: string; locale: Locale };

export function RatesPage({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const modes = store((state) => state.rates.modes);
  const [savedMode, setSavedMode] = useState<TransportMode | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title={t("rates.title")} intro={t("rates.intro")} />
      <ul className="grid gap-4 lg:grid-cols-2">
        {transportModes.map((mode) => {
          const rate = modes.find((item) => item.mode === mode);
          // the form restarts from the saved rate after a save or a reset
          return rate ? (
            <li key={`${mode}:${JSON.stringify(rate)}`}>
              <ModeRateForm
                rate={rate}
                store={store}
                slug={slug}
                locale={locale}
                saved={savedMode === mode}
                onSaved={() => setSavedMode(mode)}
                onEdited={() => setSavedMode(null)}
              />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

type Draft = Record<"ratePerKg" | "volumetricKgPerCbm" | "minimumCharge" | "daysMin" | "daysMax", string>;

function draftOf(rate: ModeRate): Draft {
  return {
    ratePerKg: String(rate.ratePerKg),
    volumetricKgPerCbm: String(rate.volumetricKgPerCbm),
    minimumCharge: String(rate.minimumCharge),
    daysMin: String(rate.daysMin),
    daysMax: String(rate.daysMax),
  };
}

type FormProps = Props & { rate: ModeRate; saved: boolean; onSaved: () => void; onEdited: () => void };

function ModeRateForm({ rate, store, slug, locale, saved, onSaved, onEdited }: FormProps) {
  const t = getLogisticsT(locale);
  const update = store((state) => state.updateModeRate);
  const [draft, setDraft] = useState(draftOf(rate));
  const [invalid, setInvalid] = useState(false);

  function field(key: keyof Draft, label: string) {
    return (
      <NumberInput
        id={`rate-${rate.mode}-${key}`}
        label={label}
        min={0}
        step="any"
        value={draft[key]}
        onChange={(event) => {
          setDraft({ ...draft, [key]: event.target.value });
          onEdited();
        }}
      />
    );
  }

  function save() {
    const ratePerKg = parseNumber(draft.ratePerKg);
    const volumetricKgPerCbm = parseNumber(draft.volumetricKgPerCbm);
    const minimumCharge = parseNumber(draft.minimumCharge);
    const daysMin = parseNumber(draft.daysMin);
    const daysMax = parseNumber(draft.daysMax);
    const valid =
      ratePerKg !== null &&
      ratePerKg >= 0 &&
      volumetricKgPerCbm !== null &&
      volumetricKgPerCbm >= 1 &&
      minimumCharge !== null &&
      minimumCharge >= 0 &&
      daysMin !== null &&
      Number.isInteger(daysMin) &&
      daysMin >= 1 &&
      daysMax !== null &&
      Number.isInteger(daysMax) &&
      daysMax >= daysMin;
    setInvalid(!valid);
    if (!valid) return;
    update(rate.mode, { ratePerKg, volumetricKgPerCbm, minimumCharge, daysMin, daysMax });
    trackEdit("rates", slug, locale);
    onSaved();
  }

  return (
    <Panel title={t(`services.${rate.mode}`)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("ratePerKg", t("rates.ratePerKg"))}
        {field("volumetricKgPerCbm", t("rates.volumetric"))}
        {field("minimumCharge", t("rates.minimum"))}
        {field("daysMin", t("rates.daysMin"))}
        {field("daysMax", t("rates.daysMax"))}
      </div>
      {invalid ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("rates.invalid")}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button aria-label={`${t("rates.save")}: ${t(`services.${rate.mode}`)}`} onClick={save}>
          {t("rates.save")}
        </Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
