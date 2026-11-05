"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { NumberInput, PageHeader, Panel, parseNumber } from "../../dashboard/ui";
import { getLogisticsT } from "../../messages";
import { trackEdit } from "../../track";
import type { StorageRatesStore } from "./storage-store";
import type { StorageRates } from "./types";

type Props = { store: StorageRatesStore; slug: string; locale: Locale };

type Draft = Record<keyof StorageRates, string>;

// Discounts are shown as percents (8) and stored as fractions (0.08).
function draftOf(rates: StorageRates): Draft {
  return {
    palletPerMonth: String(rates.palletPerMonth),
    discount6Months: String(Math.round(rates.discount6Months * 100)),
    discount12Months: String(Math.round(rates.discount12Months * 100)),
    handlingPerMonth: String(rates.handlingPerMonth),
    pickingPerOrder: String(rates.pickingPerOrder),
    insurancePercent: String(rates.insurancePercent),
    minimumMonthly: String(rates.minimumMonthly),
  };
}

export function StorageRatesPage({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const rates = store((state) => state.storageRates);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title={t("storageRates.title")} intro={t("storageRates.intro")} />
      {/* the form restarts from the saved rates after a save or a reset */}
      <RatesForm
        key={JSON.stringify(rates)}
        rates={rates}
        store={store}
        slug={slug}
        locale={locale}
        saved={saved}
        onSaved={() => setSaved(true)}
        onEdited={() => setSaved(false)}
      />
    </div>
  );
}

type FormProps = Props & { rates: StorageRates; saved: boolean; onSaved: () => void; onEdited: () => void };

function RatesForm({ rates, store, slug, locale, saved, onSaved, onEdited }: FormProps) {
  const t = getLogisticsT(locale);
  const update = store((state) => state.updateStorageRates);
  const [draft, setDraft] = useState(draftOf(rates));
  const [invalid, setInvalid] = useState(false);

  function field(key: keyof Draft, label: string) {
    return (
      <NumberInput
        id={`storage-rate-${key}`}
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
    const values = {
      palletPerMonth: parseNumber(draft.palletPerMonth),
      discount6Months: parseNumber(draft.discount6Months),
      discount12Months: parseNumber(draft.discount12Months),
      handlingPerMonth: parseNumber(draft.handlingPerMonth),
      pickingPerOrder: parseNumber(draft.pickingPerOrder),
      insurancePercent: parseNumber(draft.insurancePercent),
      minimumMonthly: parseNumber(draft.minimumMonthly),
    };
    const { discount6Months, discount12Months, insurancePercent } = values;
    const allNumbers = Object.values(values).every((value) => value !== null && value >= 0);
    const valid =
      allNumbers &&
      discount6Months !== null &&
      discount6Months <= 50 &&
      discount12Months !== null &&
      discount12Months <= 50 &&
      insurancePercent !== null &&
      insurancePercent <= 20;
    setInvalid(!valid);
    if (!valid) return;
    update({
      palletPerMonth: values.palletPerMonth ?? 0,
      discount6Months: (discount6Months ?? 0) / 100,
      discount12Months: (discount12Months ?? 0) / 100,
      handlingPerMonth: values.handlingPerMonth ?? 0,
      pickingPerOrder: values.pickingPerOrder ?? 0,
      insurancePercent: insurancePercent ?? 0,
      minimumMonthly: values.minimumMonthly ?? 0,
    });
    trackEdit("storage-rates", slug, locale);
    onSaved();
  }

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("palletPerMonth", t("storageRates.palletPerMonth"))}
        {field("minimumMonthly", t("storageRates.minimumMonthly"))}
        {field("handlingPerMonth", t("storageRates.handlingPerMonth"))}
        {field("pickingPerOrder", t("storageRates.pickingPerOrder"))}
        {field("insurancePercent", t("storageRates.insurancePercent"))}
        {field("discount6Months", t("storageRates.discount6Months"))}
        {field("discount12Months", t("storageRates.discount12Months"))}
      </div>
      {invalid ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("storageRates.invalid")}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={save}>{t("storageRates.save")}</Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
