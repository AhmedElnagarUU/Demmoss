"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { SelectInput, TextInput } from "../../dashboard/ui";
import { formatNumber, formatPrice } from "../../format";
import { getLogisticsT } from "../../messages";
import { transportModes, type FreightEstimate, type TransportMode } from "../../types";
import { calculateFreight } from "./calculator";
import type { CalculatorStore } from "./rates-store";

type Props = {
  store: CalculatorStore;
  locale: Locale;
  // what comes under the result: a link to the quote page, or the quote form itself
  renderAction: (estimate: FreightEstimate | null) => ReactNode;
};

// The shipping calculator: mode, route, weight and volume in, a price range and transit time out.
export function CalculatorWidget({ store, locale, renderAction }: Props) {
  const t = getLogisticsT(locale);
  const rates = store((state) => state.rates);
  const currency = store((state) => state.settings.currency);

  const [mode, setMode] = useState<TransportMode>("air");
  const [originId, setOriginId] = useState(rates.origins[0]?.id ?? "");
  const [destinationId, setDestinationId] = useState(rates.destinations[0]?.id ?? "");
  const [weight, setWeight] = useState("500");
  const [volume, setVolume] = useState("2");

  const weightKg = Number(weight);
  const volumeCbm = Number(volume);
  const quote = calculateFreight(rates, { mode, originId, destinationId, weightKg, volumeCbm });
  const origin = rates.origins.find((item) => item.id === originId);
  const destination = rates.destinations.find((item) => item.id === destinationId);
  const estimate: FreightEstimate | null =
    quote && origin && destination
      ? {
          kind: "freight",
          mode,
          origin: origin.name,
          destination: destination.name,
          weightKg: Math.max(weightKg || 0, 0),
          volumeCbm: Math.max(volumeCbm || 0, 0),
          minCost: quote.minCost,
          maxCost: quote.maxCost,
        }
      : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-[22px] border border-border bg-surface p-5 sm:p-6">
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-text">{t("calculator.mode")}</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {transportModes.map((item) => (
                <label
                  key={item}
                  className="flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-border bg-bg px-3 text-center font-semibold text-text has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus"
                >
                  <input
                    type="radio"
                    name="calculator-mode"
                    value={item}
                    checked={mode === item}
                    onChange={() => setMode(item)}
                    className="sr-only"
                  />
                  {t(`modes.${item}`)}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              id="calc-weight"
              label={t("calculator.weight")}
              type="number"
              inputMode="decimal"
              dir="ltr"
              min={0}
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
            <TextInput
              id="calc-volume"
              label={t("calculator.volume")}
              type="number"
              inputMode="decimal"
              dir="ltr"
              min={0}
              step="any"
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
            />
            <SelectInput
              id="calc-origin"
              label={t("calculator.origin")}
              value={originId}
              onChange={(event) => setOriginId(event.target.value)}
            >
              {rates.origins.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[locale]}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              id="calc-destination"
              label={t("calculator.destination")}
              value={destinationId}
              onChange={(event) => setDestinationId(event.target.value)}
            >
              {rates.destinations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[locale]}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>

        <section
          aria-labelledby="calc-result"
          className="space-y-3 rounded-[22px] bg-primary p-5 text-on-primary sm:p-6"
        >
          <h3 id="calc-result" className="text-sm font-semibold">
            {t("calculator.resultTitle")}
          </h3>
          <div aria-live="polite" className="space-y-3">
            {quote ? (
              <>
                <p className="text-3xl font-extrabold sm:text-4xl">
                  {t("calculator.range", {
                    min: formatPrice(quote.minCost, currency, locale),
                    max: formatPrice(quote.maxCost, currency, locale),
                  })}
                </p>
                <p>
                  {t("calculator.transit", {
                    min: formatNumber(quote.daysMin, locale),
                    max: formatNumber(quote.daysMax, locale),
                  })}
                </p>
                <p>{t("calculator.chargeable", { kg: formatNumber(quote.chargeableKg, locale) })}</p>
                {quote.minimumApplied ? <p className="font-semibold">{t("calculator.minimumNote")}</p> : null}
              </>
            ) : (
              <p className="text-lg font-semibold">{t("calculator.empty")}</p>
            )}
          </div>
          <p className="text-sm">{t("calculator.disclaimer")}</p>
        </section>
      </div>
      {renderAction(estimate)}
    </div>
  );
}
