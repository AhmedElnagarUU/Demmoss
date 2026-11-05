"use client";

import { useState } from "react";
import { useRealEstate } from "../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { formatPrice } from "../../format";
import { getRealEstateT } from "../../messages";
import { calculateMortgage } from "./calc";

type Props = {
  // the price of a property; without it the visitor moves a price slider
  price?: number;
  idPrefix: string;
};

const SLIDER_CLASS = "h-11 w-full accent-(--color-primary)";

// Monthly payment estimate (SAR). The standard amortization rule is in calc.ts.
export function MortgageCalculator({ price, idPrefix }: Props) {
  const { store, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const defaultRate = store((state) => state.settings.mortgageRate);
  const [slidePrice, setSlidePrice] = useState(1_500_000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(25);

  const homePrice = price ?? slidePrice;
  const result = calculateMortgage({
    price: homePrice,
    downPaymentPercent: downPayment,
    years,
    annualRatePercent: rate,
  });

  return (
    <div className="space-y-5 rounded-control border border-border bg-bg p-6">
      {price === undefined ? (
        <div>
          <label
            htmlFor={`${idPrefix}-price`}
            className="flex justify-between text-sm font-semibold text-text"
          >
            <span>{t("mortgage.price")}</span>
            <span>{formatPrice(slidePrice, locale)}</span>
          </label>
          <input
            id={`${idPrefix}-price`}
            type="range"
            min={300_000}
            max={10_000_000}
            step={50_000}
            value={slidePrice}
            onChange={(event) => setSlidePrice(Number(event.target.value))}
            className={SLIDER_CLASS}
          />
        </div>
      ) : (
        <p className="flex justify-between text-sm font-semibold text-text">
          <span>{t("mortgage.price")}</span>
          <span>{formatPrice(price, locale)}</span>
        </p>
      )}
      <div>
        <label htmlFor={`${idPrefix}-down`} className="flex justify-between text-sm font-semibold text-text">
          <span>{t("mortgage.downPayment")}</span>
          <span>
            {formatNumber(downPayment, locale)}% · {formatPrice((homePrice * downPayment) / 100, locale)}
          </span>
        </label>
        <input
          id={`${idPrefix}-down`}
          type="range"
          min={5}
          max={60}
          step={1}
          value={downPayment}
          onChange={(event) => setDownPayment(Number(event.target.value))}
          className={SLIDER_CLASS}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-rate`} className="flex justify-between text-sm font-semibold text-text">
          <span>{t("mortgage.rate")}</span>
          <span>{formatNumber(rate, locale)}%</span>
        </label>
        <input
          id={`${idPrefix}-rate`}
          type="range"
          min={1}
          max={10}
          step={0.05}
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          className={SLIDER_CLASS}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-years`} className="flex justify-between text-sm font-semibold text-text">
          <span>{t("mortgage.years")}</span>
          <span>{t("mortgage.yearsValue", { count: formatNumber(years, locale) })}</span>
        </label>
        <input
          id={`${idPrefix}-years`}
          type="range"
          min={5}
          max={30}
          step={5}
          value={years}
          onChange={(event) => setYears(Number(event.target.value))}
          className={SLIDER_CLASS}
        />
      </div>

      <div className="border-t border-border pt-5" aria-live="polite">
        <p className="text-sm font-semibold text-muted">{t("mortgage.monthly")}</p>
        <p className="text-3xl font-semibold text-text">
          {result ? formatPrice(result.monthly, locale) : "—"}
        </p>
        {result ? (
          <p className="mt-2 text-sm text-muted">
            {t("mortgage.split", {
              loan: formatPrice(result.loan, locale),
              interest: formatPrice(result.interest, locale),
            })}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted">{t("mortgage.note")}</p>
      </div>
    </div>
  );
}
