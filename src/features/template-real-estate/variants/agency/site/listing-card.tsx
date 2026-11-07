"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { formatPrice } from "../../../format";
import { getRealEstateT } from "../../../messages";
import { findPhoto, SitePhoto } from "../../../site/photo";
import type { Property } from "../../../types";
import { getAgencyT } from "../messages";
import { AreaIcon, BathIcon, BedIcon, HeartIcon } from "./icons";
import { rtlSafe } from "./styles";

// One listing card of the source: photo with a small tag and a heart, then price, address and three facts.
// The whole card opens the property page; the heart (a favourite, kept only while the page is open) sits above that link.
export function ListingCard({ property }: { property: Property }) {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const shared = getRealEstateT(locale);
  const [favorite, setFavorite] = useState(false);
  const state = propertyState(property);
  const href = `/${locale}${config.basePath}/${config.listingsSegment}/detail?id=${property.id}`;

  // a reserved or closed listing says so; otherwise the source's own tag (New, Open house)
  const tag =
    state === "reserved"
      ? shared("state.reserved")
      : state === "sold_out"
        ? shared(property.purpose === "rent" ? "state.rented" : "state.sold")
        : property.tag
          ? t(`featured.tag.${property.tag}`)
          : "";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-surface transition-[translate,box-shadow] duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(17,17,17,0.1)] motion-reduce:transition-none">
      <div className="relative aspect-4/3 overflow-hidden">
        <SitePhoto
          photo={findPhoto(config.photos, property.photos[0])}
          locale={locale}
          sizes="(min-width: 1320px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[800ms] group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        {tag ? (
          <span
            className={`absolute start-3.5 top-3.5 rounded-full bg-surface px-[13px] py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-text ${rtlSafe}`}
          >
            {tag}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={t("featured.favorite")}
          aria-pressed={favorite}
          onClick={() => setFavorite((value) => !value)}
          className="group/heart absolute end-2.5 top-2.5 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <HeartIcon
            className={`size-[17px] transition-colors duration-300 ${favorite ? "fill-[#c0504a] stroke-[#c0504a]" : "stroke-[#111]"}`}
          />
        </button>
      </div>
      <div className="flex grow flex-col px-[22px] pb-6 pt-5">
        <p className={`text-xl font-light tracking-[0.08em] text-text ${rtlSafe}`}>
          {formatPrice(property.price, locale)}
          {property.purpose === "rent" ? (
            <small className="text-[11px] tracking-[0.1em] text-muted"> {shared("common.perYear")}</small>
          ) : null}
        </p>
        <h3
          className={`mb-3.5 mt-1 text-[11px] font-light uppercase leading-[1.7] tracking-[0.12em] text-muted ${rtlSafe}`}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {property.title[locale]}
          </Link>
        </h3>
        <ul className="mt-auto flex gap-4 border-t border-border pt-[13px] text-[11px] tracking-[0.08em]">
          <Fact icon={<BedIcon className="size-[15px] stroke-(--re-gold)" />}>
            {shared("card.bedrooms", { count: formatNumber(property.bedrooms, locale) })}
          </Fact>
          <Fact icon={<BathIcon className="size-[15px] stroke-(--re-gold)" />}>
            {shared("card.bathrooms", { count: formatNumber(property.bathrooms, locale) })}
          </Fact>
          <Fact icon={<AreaIcon className="size-[15px] stroke-(--re-gold)" />}>
            {shared("card.size", { size: formatNumber(property.size, locale) })}
          </Fact>
        </ul>
      </div>
    </article>
  );
}

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      {icon}
      {children}
    </li>
  );
}
