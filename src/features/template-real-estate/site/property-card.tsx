"use client";

import Link from "next/link";
import { propertyState, unitCounts } from "../availability";
import { useRealEstate } from "../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { formatPrice } from "../format";
import { getRealEstateT } from "../messages";
import type { Property } from "../types";
import { findPhoto, SitePhoto } from "./photo";

type Props = {
  property: Property;
  // "tall" is the developer's portrait card; "classic" is the agency's landscape card
  layout?: "classic" | "tall";
};

export function PropertyCard({ property, layout = "classic" }: Props) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const state = propertyState(property);
  const area = config.areas.find((item) => item.id === property.area);
  const hasUnits = property.units.length > 0;
  const counts = unitCounts(property.units);
  const href = `/${locale}${config.basePath}/${config.listingsSegment}/detail?id=${property.id}`;

  const stateLabel =
    state === "available"
      ? t("state.available")
      : state === "reserved"
        ? t("state.reserved")
        : t(hasUnits ? "state.soldOut" : property.purpose === "rent" ? "state.rented" : "state.sold");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-control border border-border bg-bg">
      <div
        className={`relative overflow-hidden bg-surface ${layout === "tall" ? "aspect-4/5" : "aspect-4/3"}`}
      >
        <SitePhoto
          photo={findPhoto(config.photos, property.photos[0])}
          locale={locale}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            state === "available" ? "bg-primary text-on-primary" : "bg-text text-bg"
          }`}
        >
          {stateLabel}
        </span>
      </div>
      <div className="flex grow flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--re-accent) rtl:text-sm rtl:tracking-normal">
          {area?.name[locale]} · {t(`type.${property.type}`)}
        </p>
        <h3 className="text-lg font-semibold leading-snug text-text">
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {property.title[locale]}
          </Link>
        </h3>
        <p className="text-xl font-semibold text-text">
          {layout === "tall" ? `${t("card.from")} ` : ""}
          {formatPrice(property.price, locale)}
          {property.purpose === "rent" ? (
            <span className="text-sm font-normal text-muted"> {t("common.perYear")}</span>
          ) : null}
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm text-muted">
          <li>{t("card.bedrooms", { count: formatNumber(property.bedrooms, locale) })}</li>
          <li>{t("card.bathrooms", { count: formatNumber(property.bathrooms, locale) })}</li>
          <li>{t("card.size", { size: formatNumber(property.size, locale) })}</li>
        </ul>
        {hasUnits ? (
          <p className="text-sm font-semibold text-text">
            {t("card.unitsAvailable", {
              available: formatNumber(counts.available, locale),
              total: formatNumber(counts.total, locale),
            })}
          </p>
        ) : null}
      </div>
    </article>
  );
}
