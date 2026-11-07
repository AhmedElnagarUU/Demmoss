"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { formatPrice } from "../../../format";
import { getRealEstateT } from "../../../messages";
import { findPhoto, SitePhoto } from "../../../site/photo";
import type { Property } from "../../../types";
import { getDeveloperT } from "../messages";
import { AreaIcon, BathIcon, BedIcon } from "./icons";
import { rtlSafe } from "./styles";

// One residence card of the source: photo with a small availability tag, then location, name, price and three facts.
// The whole card opens the residence page (unit table, viewing and brochure requests).
export function ResidenceCard({ property }: { property: Property }) {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const shared = getRealEstateT(locale);
  const state = propertyState(property);
  const area = config.areas.find((item) => item.id === property.area);
  const href = `/${locale}${config.basePath}/${config.listingsSegment}/detail?id=${property.id}`;
  const tag = shared(
    state === "available" ? "state.available" : state === "reserved" ? "state.reserved" : "state.soldOut",
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition-[translate,border-color] duration-[400ms] hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--re-accent)_50%,transparent)] motion-reduce:transition-none">
      <div className="relative aspect-4/3 overflow-hidden">
        <SitePhoto
          photo={findPhoto(config.photos, property.photos[0])}
          locale={locale}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[900ms] group-hover:scale-[1.07] motion-reduce:transition-none"
        />
        <span
          className={`absolute start-4 top-4 rounded-full border border-border bg-bg/70 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm ${state === "available" ? "text-(--re-accent)" : "text-text/80"} ${rtlSafe}`}
        >
          {tag}
        </span>
      </div>
      <div className="flex grow flex-col px-[26px] pb-7 pt-[26px]">
        <p className={`text-[10px] uppercase tracking-[0.26em] text-muted ${rtlSafe}`}>
          {area?.name[locale]}
        </p>
        <h3
          className={`mb-1.5 mt-2 text-[19px] font-light uppercase leading-[1.7] tracking-[0.14em] ${rtlSafe}`}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {property.title[locale]}
          </Link>
        </h3>
        <p className={`text-[17px] font-light tracking-[0.08em] text-(--re-accent) ${rtlSafe}`}>
          {formatPrice(property.price, locale)}
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-[22px] gap-y-1 border-t border-border pt-[18px] text-xs text-text/70">
          <Fact icon={<BedIcon className="size-4 stroke-(--re-accent)" />}>
            {t("collection.beds", { count: formatNumber(property.bedrooms, locale) })}
          </Fact>
          <Fact icon={<BathIcon className="size-4 stroke-(--re-accent)" />}>
            {t("collection.baths", { count: formatNumber(property.bathrooms, locale) })}
          </Fact>
          <Fact icon={<AreaIcon className="size-4 stroke-(--re-accent)" />}>
            {t("collection.area", { size: formatNumber(property.size, locale) })}
          </Fact>
        </ul>
      </div>
    </article>
  );
}

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      {icon}
      {children}
    </li>
  );
}
