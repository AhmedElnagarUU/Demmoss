"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { FaqAccordion } from "../../../components/faq-accordion";
import { Photo } from "@/features/demo-engine/photo/photo";
import { formatNumber } from "../../../format";
import { freePallets, occupancyPercent } from "../../../modules/warehouses/availability";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";
import { Section } from "./section";
import { card } from "./styles";

type Props = { locale: Locale };

const warehousePhotos = { riyadh: warehousingPhotos.riyadh, "jebel-ali": warehousingPhotos.jebelAli };

// Both warehouses with their specifications and free pallet spots, read from what the owner edits.
export function WarehouseCards({ locale }: Props) {
  const t = getWarehousingT(locale);
  const warehouses = useWarehousingStore((state) => state.warehouses);
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {warehouses.map((warehouse) => {
        const photo =
          warehousePhotos[warehouse.id as keyof typeof warehousePhotos] ?? warehousingPhotos.riyadh;
        const almostFull = occupancyPercent(warehouse) >= 90;
        return (
          <li key={warehouse.id} className={`${card} overflow-hidden`}>
            <div className="aspect-[3/2] bg-bg">
              <Photo
                photo={photo}
                locale={locale}
                widths={[480, 800]}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-xl font-extrabold">{warehouse.name[locale]}</h3>
              <p className="text-muted">{warehouse.address[locale]}</p>
              <dl className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-bg p-2">
                  <dt className="text-xs font-semibold text-muted">{t("warehousesSection.area")}</dt>
                  <dd className="font-extrabold">
                    {t("warehousesSection.squareMeters", { count: formatNumber(warehouse.areaM2, locale) })}
                  </dd>
                </div>
                <div className="rounded-xl bg-bg p-2">
                  <dt className="text-xs font-semibold text-muted">{t("warehousesSection.rack")}</dt>
                  <dd className="font-extrabold">
                    {t("warehousesSection.meters", { count: formatNumber(warehouse.rackHeightM, locale) })}
                  </dd>
                </div>
                <div className="rounded-xl bg-bg p-2">
                  <dt className="text-xs font-semibold text-muted">{t("warehousesSection.docks")}</dt>
                  <dd className="font-extrabold">{formatNumber(warehouse.dockDoors, locale)}</dd>
                </div>
              </dl>
              <p className="font-bold text-(--lg-accent)">
                {t("warehousesSection.free", { count: formatNumber(freePallets(warehouse), locale) })}
                {almostFull ? ` · ${t("warehousesSection.full")}` : ""}
              </p>
              <p className="text-sm text-muted">
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
    <ul className="grid gap-5 md:grid-cols-3">
      {visible.map((item) => (
        <li key={item.id} className={`${card} flex flex-col gap-3 p-6`}>
          <p className="text-sm font-bold uppercase text-(--lg-accent)">{item.sector[locale]}</p>
          <h3 className="text-lg font-extrabold">{item.title[locale]}</h3>
          <p className="text-muted">{item.text[locale]}</p>
          <p className="mt-auto border-t border-border pt-3">
            <strong dir="ltr" className="block text-start text-3xl font-extrabold">
              {item.metricValue}
            </strong>
            <span className="text-sm text-muted">{item.metricLabel[locale]}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialsSection({ locale }: Props) {
  const t = getWarehousingT(locale);
  const testimonials = useWarehousingStore((state) => state.testimonials);
  const visible = testimonials.filter((item) => item.visible);
  if (visible.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")}>
      <ul className="grid gap-5 md:grid-cols-2">
        {visible.map((item) => (
          <li key={item.id} className={`${card} p-6`}>
            <blockquote className="text-lg">“{item.text[locale]}”</blockquote>
            <p className="mt-4 font-bold">{item.author[locale]}</p>
            <p className="text-sm text-muted">{item.role[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function FaqSection({ locale }: Props) {
  const t = getWarehousingT(locale);
  return (
    <Section id="faq" eyebrow={t("faq.eyebrow")} title={t("faq.title")} intro={t("faq.text")}>
      <FaqAccordion store={useWarehousingStore} locale={locale} itemClassName="rounded-2xl" />
    </Section>
  );
}

export function QuoteBand({ locale }: Props) {
  const t = getWarehousingT(locale);
  const content = useWarehousingStore((state) => state.content.contact);
  const whatsapp = useWarehousingStore((state) => state.settings.whatsapp);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  return (
    <section aria-labelledby="quote-band-title" className="mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-4 rounded-2xl bg-primary p-8 text-on-primary md:p-12">
        <h2 id="quote-band-title" className="text-3xl font-extrabold">
          {content.title[locale]}
        </h2>
        <p className="max-w-2xl text-lg">{content.text[locale]}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${root}/quote`}
            className="inline-flex min-h-11 items-center rounded-xl bg-bg px-6 font-bold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("quoteBand.cta")}
          </Link>
          <a
            href={whatsappUrl(whatsapp, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl border-2 border-on-primary px-6 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("quoteBand.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
