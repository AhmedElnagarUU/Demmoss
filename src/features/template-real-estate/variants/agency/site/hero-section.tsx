"use client";

import { useState, type FormEvent } from "react";
import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import type { Purpose } from "../../../types";
import { getRealEstateT } from "../../../messages";
import { homeTypes, noFilter, type HomeFilter, type HomeType } from "../home-filter";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { fieldClass, fieldLabel, h1Class, labelClass, pillDark, container, rtlSafe } from "./styles";

const typeLabel = { townhouse: "hero.house", apartment: "hero.apartment", villa: "hero.villa" } as const;

// The hero of the source: a label, the big thin headline, a round-topped photo with two glowing hotspots,
// and the Buy / Rent search card that overlaps the bottom of the hero. Goal: leads (every visitor starts a search).
export function HeroSection({ onSearch }: { onSearch: (filter: HomeFilter) => void }) {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const content = useAgencyStore((state) => state.content);

  return (
    <section
      aria-labelledby="hero-title"
      id="top"
      className="relative overflow-x-clip pt-[130px] max-[640px]:pt-[100px]"
    >
      <div className={container}>
        <div className="grid grid-cols-[1.1fr_1fr] items-stretch gap-[60px] max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:gap-5">
          <div className="flex flex-col justify-center pb-[170px] pt-[50px] max-[1024px]:pb-0 max-[1024px]:pt-5">
            <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("hero.eyebrow")}</p>
            <h1 id="hero-title" className={h1Class}>
              {content.hero.title[locale]}
            </h1>
            <p className={`mt-7 max-w-[440px] text-sm tracking-[0.04em] text-muted ${rtlSafe}`}>
              {content.hero.subtitle[locale]}
            </p>
          </div>
          <HeroPhoto />
        </div>
        <HeroSearch onSearch={onSearch} />
      </div>
    </section>
  );
}

function HeroPhoto() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  return (
    <div className="relative min-h-[640px] overflow-hidden rounded-[200px_200px_24px_24px] max-[1024px]:order-2 max-[1024px]:min-h-[480px] max-[1024px]:rounded-[140px_140px_20px_20px] max-[640px]:min-h-[380px] max-[640px]:rounded-[110px_110px_18px_18px]">
      <div className="absolute inset-0">
        <SitePhoto
          photo={findPhoto(config.photos, "hero-pool")}
          locale={locale}
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
      </div>
      <Hotspot
        left="30%"
        top="42%"
        label={t("hero.poolHotspot")}
        tip={t("hero.poolTip")}
        note={t("hero.poolNote")}
      />
      <Hotspot
        left="68%"
        top="62%"
        label={t("hero.livingHotspot")}
        tip={t("hero.livingTip")}
        note={t("hero.livingNote")}
      />
    </div>
  );
}

// A pulsing dot that shows a small note on hover, focus or tap. Its place belongs to the photo (the pool, the living room),
// so it is set with left/top on purpose and does not mirror in RTL.
function Hotspot({
  left,
  top,
  label,
  tip,
  note,
}: {
  left: string;
  top: string;
  label: string;
  tip: string;
  note: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={shown}
      onClick={() => setShown((value) => !value)}
      style={{ left, top }}
      className="group absolute grid size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span aria-hidden="true" className="re-anim-pulse size-[18px] rounded-full bg-white" />
      <span
        aria-hidden="true"
        style={{ left: "50%" }}
        className={`pointer-events-none absolute bottom-[30px] -translate-x-1/2 whitespace-nowrap rounded-xl bg-black/90 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${rtlSafe} ${shown ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
      >
        {tip}
        <small className="mt-0.5 block text-[10px] tracking-[0.1em] text-(--re-beige)">{note}</small>
      </span>
    </button>
  );
}

function HeroSearch({ onSearch }: { onSearch: (filter: HomeFilter) => void }) {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const shared = getRealEstateT(locale);
  const [purpose, setPurpose] = useState<Purpose>("sale");
  const [area, setArea] = useState("");
  const [type, setType] = useState<HomeType | "">("");
  const [band, setBand] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    onSearch({ ...noFilter, purpose, type, area, band });
  }

  return (
    <form
      onSubmit={submit}
      aria-label={t("hero.searchLabel")}
      className="relative z-5 -mt-[90px] w-[min(760px,62%)] rounded-[28px] bg-surface px-[26px] pb-[26px] pt-[22px] shadow-[0_30px_70px_rgba(17,17,17,0.12)] max-[1024px]:-mt-[60px] max-[1024px]:w-full max-[640px]:-mt-10 max-[640px]:px-4 max-[640px]:pb-5 max-[640px]:pt-[18px]"
    >
      <div
        role="group"
        aria-label={shared("filters.purpose")}
        className="mb-4 flex gap-[26px] border-b border-border"
      >
        {config.purposes.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={purpose === item}
            onClick={() => {
              setPurpose(item);
              setBand("");
            }}
            className={`-mb-px cursor-pointer border-b border-transparent pb-3 pt-1.5 text-[11px] uppercase tracking-[0.22em] text-muted aria-pressed:border-text aria-pressed:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe}`}
          >
            {t(item === "sale" ? "hero.buy" : "hero.rent")}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-3.5 max-[1024px]:grid-cols-2">
        <div>
          <label htmlFor="hero-area" className={fieldLabel}>
            {t("hero.location")}
          </label>
          <select
            id="hero-area"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className={fieldClass}
          >
            <option value="">{t("hero.anyLocation")}</option>
            {config.areas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-type" className={fieldLabel}>
            {t("hero.type")}
          </label>
          <select
            id="hero-type"
            value={type}
            onChange={(event) => setType(homeTypes.find((item) => item === event.target.value) ?? "")}
            className={fieldClass}
          >
            <option value="">{t("hero.allTypes")}</option>
            {homeTypes.map((item) => (
              <option key={item} value={item}>
                {t(typeLabel[item])}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-price" className={fieldLabel}>
            {t("hero.price")}
          </label>
          <select
            id="hero-price"
            value={band}
            onChange={(event) => setBand(event.target.value)}
            className={fieldClass}
          >
            <option value="">{t("hero.anyPrice")}</option>
            {config.priceBands
              .filter((item) => item.purpose === purpose)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {shared(`band.${item.id}`)}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" className={`${pillDark} max-[1024px]:col-span-full`}>
          {t("hero.search")}
        </button>
      </div>
    </form>
  );
}
