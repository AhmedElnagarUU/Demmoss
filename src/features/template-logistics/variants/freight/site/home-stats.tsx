"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFreightT } from "../messages";
import { CountUp, Reveal } from "./section";
import { container } from "./styles";

const stats = [
  { key: "years", suffix: null },
  { key: "clients", suffix: "stats.clients.suffix" },
  { key: "countries", suffix: null },
  { key: "ontime", suffix: "stats.ontime.suffix" },
] as const;

// The grey strip of the source: four numbers that count up when the strip enters the viewport.
export function HomeStats({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);

  return (
    <section aria-label={t("stats.years.label")} className="overflow-x-clip pt-[100px] max-[640px]:pt-[70px]">
      <div className={container}>
        <Reveal>
          <dl className="lg-stats grid grid-cols-4 overflow-hidden rounded-[28px] bg-(--lg-band) max-[1024px]:grid-cols-2">
            {stats.map(({ key, suffix }) => (
              <div key={key} className="flex flex-col p-[44px_34px] max-[640px]:p-[28px_20px]">
                <dt className="order-2 mt-3 block text-sm text-muted">{t(`stats.${key}.label`)}</dt>
                <dd className="order-1 block text-[clamp(38px,4.5vw,60px)] font-light leading-none tracking-[-0.04em] text-text rtl:tracking-normal">
                  <CountUp
                    target={Number(t(`stats.${key}.value`))}
                    decimals={Number(t(`stats.${key}.decimals`))}
                    suffix={suffix ? t(suffix) : ""}
                    locale={locale}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
