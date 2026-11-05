"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { TextInput } from "../../dashboard/ui";
import { formatNumber, formatPrice } from "../../format";
import { getLogisticsT } from "../../messages";
import type { StorageEstimate } from "../../types";
import { estimateStorage } from "./estimator";
import type { EstimatorStore } from "./storage-store";

type Props = {
  store: EstimatorStore;
  locale: Locale;
  // what comes under the result: a link to the quote page, or the quote form itself
  renderAction: (estimate: StorageEstimate | null) => ReactNode;
};

const rangeClass =
  "h-11 w-full cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-focus";

// The storage estimator: pallets, months, picking and insurance in, a monthly cost with its breakdown out.
export function EstimatorWidget({ store, locale, renderAction }: Props) {
  const t = getLogisticsT(locale);
  const rates = store((state) => state.storageRates);
  const currency = store((state) => state.settings.currency);

  const [pallets, setPallets] = useState(40);
  const [months, setMonths] = useState(6);
  const [orders, setOrders] = useState("300");
  const [insurance, setInsurance] = useState(false);

  const ordersPerMonth = Math.max(Math.floor(Number(orders)) || 0, 0);
  const quote = estimateStorage(rates, { pallets, months, ordersPerMonth, insurance });
  const estimate: StorageEstimate | null = quote
    ? { kind: "storage", pallets, months, ordersPerMonth, insurance, monthlyTotal: quote.monthlyTotal }
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="space-y-1.5">
            <label htmlFor="est-pallets" className="flex justify-between text-sm font-semibold text-text">
              {t("estimator.pallets")}
              <output htmlFor="est-pallets" className="font-bold">
                {formatNumber(pallets, locale)}
              </output>
            </label>
            <input
              id="est-pallets"
              type="range"
              min={5}
              max={500}
              step={5}
              value={pallets}
              onChange={(event) => setPallets(Number(event.target.value))}
              className={rangeClass}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="est-months" className="flex justify-between text-sm font-semibold text-text">
              {t("estimator.months")}
              <output htmlFor="est-months" className="font-bold">
                {formatNumber(months, locale)}
              </output>
            </label>
            <input
              id="est-months"
              type="range"
              min={1}
              max={24}
              step={1}
              value={months}
              onChange={(event) => setMonths(Number(event.target.value))}
              className={rangeClass}
            />
          </div>
          <TextInput
            id="est-orders"
            label={t("estimator.orders")}
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={0}
            value={orders}
            onChange={(event) => setOrders(event.target.value)}
          />
          <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold text-text">
            <input
              type="checkbox"
              checked={insurance}
              onChange={(event) => setInsurance(event.target.checked)}
              className="size-5 accent-primary"
            />
            {t("estimator.insurance")}
          </label>
        </div>

        <section
          aria-labelledby="est-result"
          className="space-y-3 rounded-2xl bg-primary p-5 text-on-primary sm:p-6"
        >
          <h3 id="est-result" className="text-sm font-semibold">
            {t("estimator.resultTitle")}
          </h3>
          <div aria-live="polite" className="space-y-3">
            {quote ? (
              <>
                <p className="text-3xl font-extrabold sm:text-4xl">
                  {t("estimator.perMonth", { amount: formatPrice(quote.monthlyTotal, currency, locale) })}
                </p>
                <ul className="divide-y divide-on-primary/30">
                  {quote.lines.map((line) => (
                    <li key={line.key} className="flex justify-between gap-4 py-1.5">
                      <span>{t(`estimator.lines.${line.key}`)}</span>
                      <span>{formatPrice(line.amount, currency, locale)}</span>
                    </li>
                  ))}
                </ul>
                {quote.discount > 0 ? (
                  <p className="font-semibold">
                    {t("estimator.discount", { percent: formatNumber(quote.discount * 100, locale) })}
                  </p>
                ) : null}
                <p>
                  {t("estimator.contract", {
                    total: formatPrice(quote.contractTotal, currency, locale),
                    months: formatNumber(months, locale),
                  })}
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold">{t("estimator.empty")}</p>
            )}
          </div>
          <p className="text-sm">{t("estimator.disclaimer")}</p>
        </section>
      </div>
      {renderAction(estimate)}
    </div>
  );
}
