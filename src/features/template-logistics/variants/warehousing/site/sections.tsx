"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { Photo } from "@/features/demo-engine/photo/photo";
import { formatNumber } from "../../../format";
import { freePallets, occupancyPercent } from "../../../modules/warehouses/availability";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";

type Props = { locale: Locale };

const warehousePhotos = { riyadh: warehousingPhotos.riyadh, "jebel-ali": warehousingPhotos.jebelAli };

// Both warehouses with their specifications and free pallet spots, read from what the owner edits.
export function WarehouseCards({ locale }: Props) {
  const t = getWarehousingT(locale);
  const warehouses = useWarehousingStore((state) => state.warehouses);
  const spec = "rounded-[10px] bg-surface px-3 py-2.5 text-[11px] text-muted";
  const specValue = "block text-base font-semibold text-text";
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {warehouses.map((warehouse) => {
        const photo =
          warehousePhotos[warehouse.id as keyof typeof warehousePhotos] ?? warehousingPhotos.riyadh;
        const almostFull = occupancyPercent(warehouse) >= 90;
        return (
          <li
            key={warehouse.id}
            className="overflow-hidden rounded-2xl border border-border bg-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
          >
            <div className="h-60 bg-surface">
              <Photo
                photo={photo}
                locale={locale}
                widths={[480, 800]}
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-xl font-semibold">{warehouse.name[locale]}</h3>
              <p className="mb-[18px] text-[13px] text-muted">{warehouse.address[locale]}</p>
              <dl className="grid grid-cols-3 gap-2.5">
                <div className={spec}>
                  <dt>{t("warehousesSection.area")}</dt>
                  <dd className={specValue}>
                    {t("warehousesSection.squareMeters", { count: formatNumber(warehouse.areaM2, locale) })}
                  </dd>
                </div>
                <div className={spec}>
                  <dt>{t("warehousesSection.rack")}</dt>
                  <dd className={specValue}>
                    {t("warehousesSection.meters", { count: formatNumber(warehouse.rackHeightM, locale) })}
                  </dd>
                </div>
                <div className={spec}>
                  <dt>{t("warehousesSection.docks")}</dt>
                  <dd className={specValue}>{formatNumber(warehouse.dockDoors, locale)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm font-semibold text-(--lg-accent)">
                {t("warehousesSection.free", { count: formatNumber(freePallets(warehouse), locale) })}
                {almostFull ? ` · ${t("warehousesSection.full")}` : ""}
              </p>
              <p className="mt-1 text-xs text-muted">
                {t("warehousesSection.capacity")}:{" "}
                {t("warehousesSection.pallets", { count: formatNumber(warehouse.capacityPallets, locale) })}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function CaseStudyCards({ locale, limit }: Props & { limit?: number }) {
  const caseStudies = useWarehousingStore((state) => state.caseStudies);
  const visible = caseStudies.filter((item) => item.visible).slice(0, limit);
  return (
    <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
      {visible.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3.5 rounded-2xl border border-border bg-bg p-[26px] transition-all duration-300 hover:-translate-y-1 hover:border-primary motion-reduce:hover:translate-y-0"
        >
          <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-(--lg-accent) rtl:normal-case rtl:tracking-normal">
            {item.sector[locale]}
          </p>
          <h3 className="text-lg font-semibold leading-[1.3] tracking-[-0.01em] rtl:tracking-normal">
            {item.title[locale]}
          </h3>
          <p className="flex-1 text-[13px] text-muted">{item.text[locale]}</p>
          <p>
            <strong dir="ltr" className="text-[30px] font-semibold tracking-[-0.02em] rtl:tracking-normal">
              {item.metricValue}
            </strong>
            <span className="ms-1.5 text-xs font-medium text-muted">{item.metricLabel[locale]}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function QuoteBand({ locale }: Props) {
  const t = getWarehousingT(locale);
  const content = useWarehousingStore((state) => state.content.contact);
  const whatsapp = useWarehousingStore((state) => state.settings.whatsapp);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  return (
    <section aria-labelledby="quote-band-title" className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="space-y-4 rounded-2xl bg-primary p-8 text-on-primary md:p-12">
        <h2 id="quote-band-title" className="text-3xl font-semibold">
          {content.title[locale]}
        </h2>
        <p className="max-w-2xl text-lg">{content.text[locale]}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${root}/quote`}
            className="inline-flex min-h-11 items-center rounded-full bg-bg px-6 font-bold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("quoteBand.cta")}
          </Link>
          <a
            href={whatsappUrl(whatsapp, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border-2 border-on-primary px-6 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("quoteBand.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
