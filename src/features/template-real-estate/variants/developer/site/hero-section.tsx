"use client";

import { useEffect, useState } from "react";
import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { CountUp } from "./count-up";
import { container, pill, rtlSafe } from "./styles";

// The hotspots belong to the photo (the glazing, the cedar, the terrace), so they are placed with left/top on purpose
// and do not mirror in RTL.
const spots = [
  { key: "glazing", left: "18%", top: "34%" },
  { key: "cedar", left: "56%", top: "46%" },
  { key: "terrace", left: "78%", top: "62%" },
] as const;

const stats = [
  { key: "delivered", target: 120, suffix: "plus" },
  { key: "awards", target: 14, suffix: null },
  { key: "referral", target: 98, suffix: "percent" },
] as const;

// The hero of the source: a full-screen photo with three glowing hotspots, the big thin headline, "Since 2009",
// one action, and three counting numbers. Goal: trust first (a long record), then the way into the residences.
export function HeroSection() {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const content = useDeveloperStore((state) => state.content);
  const [openSpot, setOpenSpot] = useState<string | null>(null);

  // a click anywhere else closes the open tip, like the source
  useEffect(() => {
    const close = () => setOpenSpot(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex h-screen min-h-[680px] flex-col justify-end overflow-x-clip max-[640px]:min-h-[760px]"
    >
      <div className="absolute inset-0">
        <SitePhoto
          photo={findPhoto(config.photos, "hero-landscape")}
          locale={locale}
          sizes="100vw"
          priority
        />
      </div>
      <div aria-hidden="true" className="dv-hero-shade absolute inset-0" />
      {spots.map((spot) => (
        <button
          key={spot.key}
          type="button"
          aria-label={t(`hero.hotspots.${spot.key}`)}
          aria-expanded={openSpot === spot.key}
          onClick={(event) => {
            event.stopPropagation();
            setOpenSpot(openSpot === spot.key ? null : spot.key);
          }}
          style={{ left: spot.left, top: spot.top }}
          className="dv-hot"
        >
          <span aria-hidden="true" className="dv-tip">
            {t(`hero.hotspots.${spot.key}`)}
          </span>
        </button>
      ))}
      <div className={`${container} relative pb-10`}>
        <div className="relative flex flex-wrap items-end justify-between gap-10 max-[640px]:flex-col-reverse max-[640px]:items-start max-[640px]:gap-5">
          <h1
            id="hero-title"
            className={`max-w-[11ch] text-[clamp(34px,6.2vw,96px)] font-extralight uppercase leading-[1.08] tracking-[0.12em] ${rtlSafe} rtl:max-w-[7ch] rtl:font-light rtl:leading-[1.4]`}
          >
            {content.hero.title[locale]}
          </h1>
          <p
            className={`-mt-10 self-start text-end text-[clamp(14px,1.6vw,22px)] font-light uppercase tracking-[0.3em] text-(--re-accent) max-[1024px]:mt-0 max-[640px]:text-start ${rtlSafe}`}
          >
            {t("hero.since")}
          </p>
        </div>
        <p
          className={`my-7 max-w-[520px] text-sm tracking-[0.04em] text-text/80 ${rtlSafe} rtl:leading-[1.9]`}
        >
          {content.hero.subtitle[locale]}
        </p>
        <a href="#collection" className={pill}>
          {t("hero.explore")}
        </a>
        <ul
          aria-label={t("stats.label")}
          className="mt-14 grid grid-cols-3 border-t border-border max-[640px]:mt-9 max-[640px]:grid-cols-1"
        >
          {stats.map((stat) => (
            <li
              key={stat.key}
              className="pe-6 pt-6 not-first:border-s not-first:border-border not-first:ps-8 max-[640px]:py-4 max-[640px]:pe-0 max-[640px]:not-first:border-s-0 max-[640px]:not-first:border-t max-[640px]:not-first:ps-0"
            >
              <p
                className={`text-[clamp(30px,3.6vw,52px)] font-extralight leading-[1.1] tracking-[0.08em] rtl:font-light ${rtlSafe}`}
              >
                <CountUp target={stat.target} locale={locale} />
                {stat.suffix ? (
                  <em className="not-italic text-(--re-accent)">{t(`stats.${stat.suffix}`)}</em>
                ) : null}
              </p>
              <p className={`mt-1.5 text-[10px] uppercase tracking-[0.26em] text-muted ${rtlSafe}`}>
                {t(`stats.${stat.key}.label`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
