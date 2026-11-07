"use client";

import { useEffect, useRef, useState } from "react";
import { useRealEstate } from "../../../context";
import { intlLocale } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";
import { getAgencyT } from "../messages";
import { Reveal } from "./reveal";
import { container, rtlSafe } from "./styles";

const stats = [
  { key: "sold", target: 2400, decimals: 0 },
  { key: "volume", target: 4.5, decimals: 1 },
  { key: "agents", target: 35, decimals: 0 },
  { key: "years", target: 18, decimals: 0 },
] as const;

function formatCount(value: number, decimals: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// A number that counts up (cubic ease-out, 1.6s) once it scrolls into view, like the source. Reduced motion shows the end value.
function CountUp({ target, decimals, locale }: { target: number; decimals: number; locale: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (reduce) {
          setValue(target);
          return;
        }
        let start: number | null = null;
        const step = (now: number) => {
          start = start ?? now;
          const progress = Math.min((now - start) / 1600, 1);
          setValue(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={ref}>{formatCount(value, decimals, locale)}</span>;
}

// Four proof numbers under the hero. Goal: trust (a long, successful record) before the visitor sees the listings.
export function StatsStrip() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  return (
    <Reveal className="mt-[70px]">
      <section aria-label={t("stats.label")} className="border-y border-border bg-surface">
        <ul className={`${container} grid grid-cols-4 max-[640px]:grid-cols-2`}>
          {stats.map((stat) => {
            const [before = "", after = ""] = t(`stats.${stat.key}.format`).split("{value}");
            return (
              <li
                key={stat.key}
                className="border-s border-border px-5 py-[46px] text-center first:border-s-0 max-[640px]:px-2.5 max-[640px]:py-[30px] max-[640px]:nth-[3]:border-s-0 max-[640px]:nth-[n+3]:border-t"
              >
                <b
                  className={`block text-[clamp(30px,3.6vw,52px)] font-extralight leading-[1.1] tracking-[0.06em] rtl:font-light ${rtlSafe}`}
                >
                  {before}
                  <CountUp target={stat.target} decimals={stat.decimals} locale={locale} />
                  {after}
                </b>
                <span className={`text-[10px] uppercase tracking-[0.26em] text-muted ${rtlSafe}`}>
                  {t(`stats.${stat.key}.label`)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </Reveal>
  );
}
