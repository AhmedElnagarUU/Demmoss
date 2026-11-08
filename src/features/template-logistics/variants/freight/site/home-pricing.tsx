"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { MutedTail } from "./brand";
import { ArrowIcon, CheckIcon } from "./icons";
import { CenterHead, Reveal } from "./section";
import { btnOutline, btnWhite, container, rtlSafe } from "./styles";

const planBase =
  "flex flex-col rounded-[26px] border border-border bg-surface p-[38px_34px] text-text shadow-[0_10px_40px_rgba(17,17,17,0.06)] " +
  "transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(17,17,17,0.10)] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const planHi = `${planBase} border-text bg-text text-bg shadow-[0_30px_70px_rgba(0,0,0,0.25)]`;

const plans = [
  {
    key: "start",
    price: "pricing.start.price",
    features: ["pricing.start.f1", "pricing.start.f2", "pricing.start.f3", "pricing.start.f4"],
    hi: false,
    cta: "outline",
  },
  {
    key: "business",
    price: "pricing.business.price",
    features: [
      "pricing.business.f1",
      "pricing.business.f2",
      "pricing.business.f3",
      "pricing.business.f4",
      "pricing.business.f5",
    ],
    hi: true,
    cta: "white",
  },
  {
    key: "enterprise",
    price: null,
    features: [
      "pricing.enterprise.f1",
      "pricing.enterprise.f2",
      "pricing.enterprise.f3",
      "pricing.enterprise.f4",
    ],
    hi: false,
    cta: "outline",
  },
] as const;

// The three plans of the source, with the middle one lifted and in ink. Prices stay in SAR.
export function HomePricing({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const currency = useFreightStore((state) => state.settings.currency);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <section id="pricing" className="overflow-x-clip pt-[110px] max-[640px]:pt-20">
      <div className={container}>
        <Reveal>
          <CenterHead
            eyebrow={t("pricing.eyebrow")}
            title={<MutedTail text={t("pricing.title")} />}
            intro={t("pricing.text")}
          />
        </Reveal>
        <div className="grid grid-cols-3 items-stretch gap-[22px] max-[1024px]:mx-auto max-[1024px]:max-w-[520px] max-[1024px]:grid-cols-1">
          {plans.map((plan, index) => {
            const raw = plan.price ? t(plan.price) : "";
            const price = /^\d+$/.test(raw)
              ? formatPrice(Number(raw), currency, locale)
              : t("pricing.custom");
            const cta = plan.cta === "white" ? btnWhite : btnOutline;
            return (
              <div
                key={plan.key}
                className={plan.hi ? "-translate-y-3.5 max-[1024px]:translate-y-0" : undefined}
              >
                <Reveal delay={index as 0 | 1 | 2} className="h-full">
                  <div className={`${plan.hi ? planHi : planBase} h-full`}>
                    {plan.hi ? (
                      <span className="mb-3 self-start rounded-full bg-surface px-3 py-[5px] text-[11px] font-bold text-text">
                        {t("pricing.popular")}
                      </span>
                    ) : null}
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.12em] ${rtlSafe} ${
                        plan.hi ? "text-bg/60" : "text-muted"
                      }`}
                    >
                      {t(`pricing.${plan.key}.tag`)}
                    </span>
                    <div
                      className={`my-4 text-[48px] font-semibold leading-none tracking-[-0.035em] rtl:tracking-normal ${
                        plan.hi ? "text-bg" : "text-text"
                      }`}
                    >
                      {price}
                      <small
                        className={`text-sm font-normal tracking-normal ${plan.hi ? "text-bg/60" : "text-muted"}`}
                      >
                        {" "}
                        {t("pricing.perShipment")}
                      </small>
                    </div>
                    <p className={`mb-[26px] text-sm ${plan.hi ? "text-bg/60" : "text-muted"}`}>
                      {t(`pricing.${plan.key}.text`)}
                    </p>
                    <ul className="mb-[30px] flex-1">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex gap-3 border-t py-[11px] text-sm ${
                            plan.hi ? "border-bg/[0.14] text-bg" : "border-border text-text"
                          }`}
                        >
                          <CheckIcon
                            className={`mt-0.5 size-[18px] shrink-0 ${plan.hi ? "text-bg" : "text-text"}`}
                          />
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                    <Link href={`${root}#contacts`} className={`${cta} justify-center`}>
                      {t(`pricing.${plan.key}.cta`)}
                      <ArrowIcon className="size-[18px] rtl:rotate-180" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
