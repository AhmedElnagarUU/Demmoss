"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { formatPrice } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";
import { formatNumber } from "../../../format";
import { getLogisticsT } from "../../../messages";
import { estimateStorage } from "../../../modules/storage-rates/estimator";
import type { StorageEstimate } from "../../../types";
import { getWarehousingT } from "../messages";
import { useWarehousingStore } from "../store";

type Props = {
  locale: Locale;
  renderAction: (estimate: StorageEstimate | null) => ReactNode;
};

const chip =
  "inline-block cursor-pointer rounded-full border border-border bg-bg px-4 py-2 text-xs font-medium text-text transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus";

// The Stackwell estimator: pallets, months, picking and insurance in, a monthly cost with its breakdown out.
export function Estimator({ locale, renderAction }: Props) {
  const t = getLogisticsT(locale);
  const local = getWarehousingT(locale);
  const rates = useWarehousingStore((state) => state.storageRates);
  const currency = useWarehousingStore((state) => state.settings.currency);

  const [pallets, setPallets] = useState(40);
  const [months, setMonths] = useState(6);
  const [picking, setPicking] = useState(true);
  const [orders, setOrders] = useState("300");
  const [insurance, setInsurance] = useState(false);

  const ordersPerMonth = picking ? Math.max(Math.floor(Number(orders)) || 0, 0) : 0;
  const quote = estimateStorage(rates, { pallets, months, ordersPerMonth, insurance });
  const estimate: StorageEstimate | null = quote
    ? { kind: "storage", pallets, months, ordersPerMonth, insurance, monthlyTotal: quote.monthlyTotal }
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-7 rounded-2xl bg-surface p-6 sm:p-8">
          <div>
            <label
              htmlFor="est-pallets"
              className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-text"
            >
              {t("estimator.pallets")}
              <output htmlFor="est-pallets" className="font-bold text-(--lg-accent)">
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
              style={{ "--wh-fill": `${((pallets - 5) / (500 - 5)) * 100}%` } as CSSProperties}
              className="wh-range w-full cursor-pointer"
            />
          </div>

          <div>
            <label
              htmlFor="est-months"
              className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-text"
            >
              {t("estimator.months")}
              <output htmlFor="est-months" className="font-bold text-(--lg-accent)">
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
              style={{ "--wh-fill": `${((months - 1) / (24 - 1)) * 100}%` } as CSSProperties}
              className="wh-range w-full cursor-pointer"
            />
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-text">
              {local("estimatorSection.extras")}
            </legend>
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={picking}
                  onChange={(event) => setPicking(event.target.checked)}
                  className="peer sr-only"
                />
                <span className={chip}>{local("estimatorSection.picking")}</span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(event) => setInsurance(event.target.checked)}
                  className="peer sr-only"
                />
                <span className={chip}>{t("estimator.insurance")}</span>
              </label>
            </div>
          </fieldset>

          {picking ? (
            <div>
              <label htmlFor="est-orders" className="mb-2 block text-sm font-semibold text-text">
                {local("estimatorSection.pickingHint")}
              </label>
              <input
                id="est-orders"
                type="number"
                inputMode="numeric"
                dir="ltr"
                min={0}
                value={orders}
                onChange={(event) => setOrders(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus"
              />
            </div>
          ) : null}
        </div>

        <section
          aria-labelledby="est-result"
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-text p-6 text-bg sm:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full bg-primary/35 blur-3xl"
          />
          <h3 id="est-result" className="relative text-sm font-semibold opacity-70">
            {t("estimator.resultTitle")}
          </h3>
          <div aria-live="polite" className="relative flex flex-1 flex-col gap-3">
            {quote ? (
              <>
                <p className="text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] rtl:tracking-normal">
                  {formatPrice(quote.monthlyTotal, currency, locale)}
                </p>
                <p className="text-sm opacity-70">{local("estimatorSection.perMonth")}</p>
                <ul className="divide-y divide-border/60 text-sm">
                  {quote.lines.map((line) => (
                    <li key={line.key} className="flex justify-between gap-4 py-2">
                      <span>{t(`estimator.lines.${line.key}`)}</span>
                      <span>{formatPrice(line.amount, currency, locale)}</span>
                    </li>
                  ))}
                </ul>
                {quote.discount > 0 ? (
                  <p className="text-sm font-semibold">
                    {t("estimator.discount", { percent: formatNumber(quote.discount * 100, locale) })}
                  </p>
                ) : null}
                <p className="text-sm opacity-70">
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
          <p className="relative text-xs opacity-60">{t("estimator.disclaimer")}</p>
        </section>
      </div>
      {renderAction(estimate)}
    </div>
  );
}
