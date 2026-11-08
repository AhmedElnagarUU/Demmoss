"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import { formatNumber } from "../../../format";
import { getLogisticsT } from "../../../messages";
import { calculateFreight } from "../../../modules/rates/calculator";
import type { FreightEstimate, TransportMode } from "../../../types";
import { getFreightT } from "../messages";
import { useFreightStore } from "../store";
import { ArrowIcon, ChevronDownIcon, PlaneIcon, ShipIcon, TrainIcon, TruckIcon } from "./icons";
import { Field } from "./quote-form";
import { fieldDark, rtlSafe } from "./styles";

const modes = ["air", "sea", "road", "rail"] as const;
const modeIcons = { air: PlaneIcon, sea: ShipIcon, road: TruckIcon, rail: TrainIcon } as const;

type Props = {
  locale: Locale;
  // called by the result's pill: the parent fills the quote form and scrolls to it
  onQuote?: (estimate: FreightEstimate) => void;
  // called whenever the estimate changes, so a quote form below always carries the current numbers
  onEstimateChange?: (estimate: FreightEstimate | null) => void;
};

// The dark calculator of the source: mode tabs, weight/volume and the route, then the white result card.
// It reads the rates the owner edits in the dashboard, so a rate change is visible here at once.
export function FreightCalculator({ locale, onQuote, onEstimateChange }: Props) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const rates = useFreightStore((state) => state.rates);
  const currency = useFreightStore((state) => state.settings.currency);

  const [mode, setMode] = useState<TransportMode>("air");
  const [originId, setOriginId] = useState(rates.origins[0]?.id ?? "");
  const [destinationId, setDestinationId] = useState(rates.destinations[0]?.id ?? "");
  const [weight, setWeight] = useState("500");
  const [volume, setVolume] = useState("2");

  const origin = rates.origins.find((item) => item.id === originId);
  const destination = rates.destinations.find((item) => item.id === destinationId);
  const quote = useMemo(
    () =>
      calculateFreight(rates, {
        mode,
        originId,
        destinationId,
        weightKg: Number(weight),
        volumeCbm: Number(volume),
      }),
    [rates, mode, originId, destinationId, weight, volume],
  );

  const estimate = useMemo<FreightEstimate | null>(
    () =>
      quote && origin && destination
        ? {
            kind: "freight",
            mode,
            origin: origin.name,
            destination: destination.name,
            weightKg: Math.max(Number(weight) || 0, 0),
            volumeCbm: Math.max(Number(volume) || 0, 0),
            minCost: quote.minCost,
            maxCost: quote.maxCost,
          }
        : null,
    [quote, origin, destination, mode, weight, volume],
  );

  useEffect(() => {
    onEstimateChange?.(estimate);
  }, [estimate, onEstimateChange]);

  const price = quote
    ? `${formatPrice(quote.minCost, currency, locale)} – ${formatPrice(quote.maxCost, currency, locale)}`
    : formatPrice(0, currency, locale);

  return (
    <div className="relative grid grid-cols-[1.15fr_1fr] gap-[50px] overflow-hidden rounded-[32px] bg-text p-14 text-bg max-[1024px]:grid-cols-1 max-[1024px]:p-10 max-[640px]:rounded-3xl max-[640px]:px-5 max-[640px]:py-[26px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-[120px] -top-[120px] size-[380px] rounded-full border border-bg/10"
      />

      <div className="relative">
        <p className={`text-[11.5px] font-medium uppercase tracking-[0.14em] text-bg/60 ${rtlSafe}`}>
          {t("calculatorSection.eyebrow")}
        </p>
        <h2
          className={`mb-2.5 mt-3.5 text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-bg ${rtlSafe} rtl:leading-[1.3]`}
        >
          {t("calculatorSection.title")
            .split("\n")
            .map((line, index, all) => (
              <span
                key={line}
                className={index === all.length - 1 && all.length > 1 ? "block text-bg/55" : "block"}
              >
                {line}
              </span>
            ))}
        </h2>
        <p className="mb-7 max-w-[440px] text-[14.5px] leading-[1.55] text-bg/60">
          {t("calculatorSection.text")}
        </p>

        <div
          role="tablist"
          aria-label={t("calculatorSection.eyebrow")}
          className="mb-6 flex w-max max-w-full gap-1.5 overflow-x-auto rounded-full bg-bg/10 p-[5px] max-[640px]:w-full"
        >
          {modes.map((item) => {
            const Icon = modeIcons[item];
            const active = item === mode;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="freight-calc-fields"
                onClick={() => setMode(item)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-[250ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg motion-reduce:transition-none max-[640px]:px-3.5 ${
                  active ? "bg-surface text-text" : "bg-transparent text-bg/65 hover:text-bg"
                }`}
              >
                <Icon className="size-[17px] max-[640px]:hidden" />
                {shared(`modes.${item}`)}
              </button>
            );
          })}
        </div>

        <div
          id="freight-calc-fields"
          role="tabpanel"
          className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1"
        >
          <Field label={t("calculatorSection.weight")} htmlFor="freight-calc-weight" dark>
            <input
              id="freight-calc-weight"
              type="number"
              min={1}
              inputMode="decimal"
              dir="ltr"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className={`${fieldDark} text-start`}
            />
          </Field>
          <Field label={t("calculatorSection.volume")} htmlFor="freight-calc-volume" dark>
            <input
              id="freight-calc-volume"
              type="number"
              min={0.1}
              step={0.1}
              inputMode="decimal"
              dir="ltr"
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
              className={`${fieldDark} text-start`}
            />
          </Field>
          <Field label={t("calculatorSection.origin")} htmlFor="freight-calc-origin" dark>
            <div className="relative">
              <select
                id="freight-calc-origin"
                value={originId}
                onChange={(event) => setOriginId(event.target.value)}
                className={`${fieldDark} pe-10`}
              >
                {rates.origins.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name[locale]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute end-4 top-1/2 size-3 -translate-y-1/2 text-bg/60" />
            </div>
          </Field>
          <Field label={t("calculatorSection.destination")} htmlFor="freight-calc-destination" dark>
            <div className="relative">
              <select
                id="freight-calc-destination"
                value={destinationId}
                onChange={(event) => setDestinationId(event.target.value)}
                className={`${fieldDark} pe-10`}
              >
                {rates.destinations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name[locale]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute end-4 top-1/2 size-3 -translate-y-1/2 text-bg/60" />
            </div>
          </Field>
        </div>
      </div>

      <div className="relative z-[1] flex flex-col justify-center rounded-3xl bg-surface p-[34px] text-text max-[640px]:p-[26px_22px]">
        <p className={`mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted ${rtlSafe}`}>
          {t("calculatorSection.result")}
        </p>
        <div role="status">
          <p className="text-[clamp(34px,4.2vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-text">
            {price}
          </p>
          <div className="my-6 border-t border-border">
            <div className="flex justify-between gap-4 border-b border-border py-[13px] text-sm">
              <span className="text-muted">{t("calculatorSection.modeRow")}</span>
              <b className="text-end font-semibold">{shared(`services.${mode}`)}</b>
            </div>
            <div className="flex justify-between gap-4 border-b border-border py-[13px] text-sm">
              <span className="text-muted">{t("calculatorSection.transitRow")}</span>
              <b className="text-end font-semibold">
                {quote
                  ? t("calculatorSection.daysValue", {
                      min: formatNumber(quote.daysMin, locale),
                      max: formatNumber(quote.daysMax, locale),
                    })
                  : t("calculatorSection.empty")}
              </b>
            </div>
            <div className="flex justify-between gap-4 border-b border-border py-[13px] text-sm">
              <span className="text-muted">{t("calculatorSection.chargeableRow")}</span>
              <b className="text-end font-semibold">
                {quote
                  ? t("calculatorSection.kgValue", { kg: formatNumber(quote.chargeableKg, locale) })
                  : t("calculatorSection.empty")}
              </b>
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={!estimate}
          onClick={() => {
            if (estimate) onQuote?.(estimate);
          }}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-primary bg-primary px-[26px] py-[15px] text-[14.5px] font-semibold text-on-primary transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        >
          {t("calculatorSection.quote")}
          <ArrowIcon className="size-[18px] rtl:rotate-180" />
        </button>
        <small className="mt-3.5 block text-[11.5px] leading-[1.5] text-muted">
          {t("calculatorSection.disclaimer")}
        </small>
      </div>
    </div>
  );
}
