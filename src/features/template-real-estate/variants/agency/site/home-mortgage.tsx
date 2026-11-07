"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { formatNumber } from "@/features/demo-engine/format/format";
import { useRealEstate } from "../../../context";
import { formatPrice } from "../../../format";
import { calculateMortgage } from "../../../modules/mortgage/calc";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { Reveal } from "./reveal";
import { container, h2Class, labelClass, pillLine, rtlSafe, sectionPad } from "./styles";

// Price slider in riyals: the source's $100k-$3M range at about 3.75 riyals to the dollar, same step count.
const PRICE = { min: 400_000, max: 11_250_000, step: 50_000, start: 3_200_000 };

const rowLabel = `mb-2 flex justify-between text-[10px] uppercase tracking-[0.22em] text-muted ${rtlSafe}`;

type SliderProps = {
  id: string;
  label: string;
  value: number;
  shown: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function Slider({ id, label, value, shown, min, max, step, onChange }: SliderProps) {
  const fill = `${((value - min) / (max - min)) * 100}%`;
  return (
    <div className="mb-[26px]">
      <label htmlFor={id} className={rowLabel}>
        <span>{label}</span>
        <b className={`text-[13px] font-medium tracking-[0.1em] text-text ${rtlSafe}`}>{shown}</b>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--p": fill } as CSSProperties}
        className="re-range"
      />
    </div>
  );
}

// "Plan your monthly payment": the working mortgage calculator in the source's look (four sliders, a big number,
// a principal / interest bar). Goal: leads (a buyer who sees the payment is ready to call), then a valuation request for sellers.
export function HomeMortgage() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const defaultRate = useAgencyStore((state) => state.settings.mortgageRate);
  const [price, setPrice] = useState(PRICE.start);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(25);

  const result = calculateMortgage({
    price,
    downPaymentPercent: downPayment,
    years,
    annualRatePercent: rate,
  });
  const principalShare = result ? (result.loan / result.total) * 100 : 0;
  const interestShare = result ? (result.interest / result.total) * 100 : 0;

  return (
    <section
      id="mortgage"
      aria-labelledby="mortgage-title"
      className={`${sectionPad} scroll-mt-20 overflow-x-clip`}
    >
      <div
        className={`${container} grid grid-cols-2 items-center gap-[60px] max-[1024px]:grid-cols-1 max-[1024px]:gap-10`}
      >
        <Reveal>
          <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("mortgage.eyebrow")}</p>
          <h2 id="mortgage-title" className={h2Class}>
            {t("mortgage.title")}
          </h2>
          <p className={`mt-[22px] max-w-[420px] text-sm text-muted ${rtlSafe}`}>{t("mortgage.lead")}</p>
          <Link href={`/${locale}${config.basePath}/contact`} className={`${pillLine} mt-[30px]`}>
            {t("mortgage.valuation")}
          </Link>
        </Reveal>
        <Reveal>
          <div className="rounded-[28px] bg-surface p-[42px] max-[640px]:px-5 max-[640px]:py-[26px]">
            <Slider
              id="mortgage-price"
              label={t("mortgage.price")}
              value={price}
              shown={formatPrice(price, locale)}
              min={PRICE.min}
              max={PRICE.max}
              step={PRICE.step}
              onChange={setPrice}
            />
            <Slider
              id="mortgage-down"
              label={t("mortgage.down")}
              value={downPayment}
              shown={`${formatNumber(downPayment, locale)}% (${formatPrice((price * downPayment) / 100, locale)})`}
              min={5}
              max={60}
              step={1}
              onChange={setDownPayment}
            />
            <Slider
              id="mortgage-rate"
              label={t("mortgage.rate")}
              value={rate}
              shown={`${formatNumber(rate, locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
              min={1}
              max={10}
              step={0.05}
              onChange={setRate}
            />
            <Slider
              id="mortgage-years"
              label={t("mortgage.term")}
              value={years}
              shown={t("mortgage.yearsValue", { count: formatNumber(years, locale) })}
              min={5}
              max={35}
              step={5}
              onChange={setYears}
            />
            <div className="border-t border-border pt-6" aria-live="polite">
              <p className="text-[clamp(34px,4vw,52px)] font-extralight leading-[1.1] tracking-[0.06em] rtl:font-light rtl:tracking-normal">
                {result ? formatPrice(result.monthly, locale) : "—"}{" "}
                <small className={`text-xs uppercase tracking-[0.2em] text-muted ${rtlSafe}`}>
                  {t("mortgage.perMonth")}
                </small>
              </p>
              <div className="mb-3 mt-5 flex h-2.5 overflow-hidden rounded-full bg-border">
                <i
                  className="block bg-text transition-[width] duration-400 motion-reduce:transition-none"
                  style={{ width: `${principalShare}%` }}
                />
                <i
                  className="block bg-(--re-gold) transition-[width] duration-400 motion-reduce:transition-none"
                  style={{ width: `${interestShare}%` }}
                />
              </div>
              <p
                className={`flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.16em] text-muted ${rtlSafe}`}
              >
                <span className="flex items-center gap-2 before:size-2 before:rounded-full before:bg-text">
                  {t("mortgage.principal")}{" "}
                  <b className="font-medium text-text">{result ? formatPrice(result.loan, locale) : "—"}</b>
                </span>
                <span className="flex items-center gap-2 before:size-2 before:rounded-full before:bg-(--re-gold)">
                  {t("mortgage.interest")}{" "}
                  <b className="font-medium text-text">
                    {result ? formatPrice(result.interest, locale) : "—"}
                  </b>
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
