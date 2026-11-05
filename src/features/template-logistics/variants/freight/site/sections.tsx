"use client";

import Link from "next/link";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import type { Locale } from "@/shared/i18n/config";
import { FaqAccordion } from "../../../components/faq-accordion";
import { Photo, type PhotoData } from "@/features/demo-engine/photo/photo";
import { formatPrice } from "@/features/demo-engine/format/format";
import { getLogisticsT } from "../../../messages";
import { getFreightT } from "../messages";
import { freightPhotos } from "../photos";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { Section } from "./section";
import { card, pillButton } from "./styles";

type Props = { locale: Locale };

const serviceCards = [
  { key: "air", photo: freightPhotos.airFreight },
  { key: "sea", photo: freightPhotos.seaFreight },
  { key: "road", photo: freightPhotos.roadFreight },
  { key: "rail", photo: freightPhotos.railFreight },
  { key: "customs", photo: freightPhotos.customs },
] as const satisfies readonly { key: string; photo: PhotoData }[];

// The five services with their starting price per kg, read from the rates the owner edits.
export function ServiceCards({ locale }: Props) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const rates = useFreightStore((state) => state.rates);
  const currency = useFreightStore((state) => state.settings.currency);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {serviceCards.map(({ key, photo }) => {
        const rate = key === "customs" ? undefined : rates.modes.find((item) => item.mode === key);
        return (
          <li key={key} className={`${card} flex flex-col overflow-hidden`}>
            <div className="aspect-[3/2] bg-bg">
              <Photo
                photo={photo}
                locale={locale}
                widths={[400, 640, 900]}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="flex grow flex-col gap-3 p-5">
              <h3 className="text-xl font-extrabold">{shared(`services.${key}`)}</h3>
              <ul className="list-disc space-y-1 ps-5 text-muted">
                <li>{t(`services.${key}.b1`)}</li>
                <li>{t(`services.${key}.b2`)}</li>
              </ul>
              <p className="mt-auto font-bold text-(--lg-accent)">
                {rate
                  ? t("services.from", { price: formatPrice(rate.ratePerKg, currency, locale) })
                  : t("services.contact")}
              </p>
              {rate ? (
                <p className="text-sm text-muted">
                  {t("services.minimum", { price: formatPrice(rate.minimumCharge, currency, locale) })}
                </p>
              ) : null}
              <Link href={`${root}/quote`} className={pillButton("outline")}>
                {t("services.quote")}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const routeKeys = ["r1", "r2", "r3", "r4", "r5", "r6"] as const;
const routePhotos = [
  freightPhotos.ship,
  freightPhotos.port,
  freightPhotos.seaFreight,
  freightPhotos.railFreight,
  freightPhotos.airplane,
  freightPhotos.roadFreight,
];

export function RoutesSection({ locale }: Props) {
  const t = getFreightT(locale);
  return (
    <Section id="routes" eyebrow={t("routes.eyebrow")} title={t("routes.title")} intro={t("routes.text")}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routeKeys.map((key, index) => (
          <li key={key} className={`${card} flex items-center gap-4 p-3`}>
            <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-bg">
              <Photo
                photo={routePhotos[index] ?? freightPhotos.ship}
                locale={locale}
                widths={[160, 240]}
                sizes="80px"
              />
            </div>
            <div>
              <h3 className="font-extrabold">{t(`routes.${key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`routes.${key}.detail`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const planPrices = { start: 199, business: 749, enterprise: null } as const;

export function PricingSection({ locale }: Props) {
  const t = getFreightT(locale);
  const currency = useFreightStore((state) => state.settings.currency);
  const root = `/${locale}${FREIGHT_ROOT}`;
  return (
    <Section id="pricing" eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} intro={t("pricing.text")}>
      <ul className="grid gap-5 lg:grid-cols-3">
        {(["start", "business", "enterprise"] as const).map((plan) => {
          const price = planPrices[plan];
          const popular = plan === "business";
          return (
            <li
              key={plan}
              className={`${card} flex flex-col gap-4 p-6 ${popular ? "border-2 border-primary" : ""}`}
            >
              {popular ? (
                <p className="text-sm font-bold text-(--lg-accent)">{t("pricing.popular")}</p>
              ) : null}
              <h3 className="text-xl font-extrabold">{t(`pricing.${plan}.name`)}</h3>
              <p className="text-3xl font-extrabold">
                {price === null ? t("pricing.custom") : formatPrice(price, currency, locale)}
                {price === null ? null : (
                  <span className="text-base font-semibold text-muted"> {t("pricing.perShipment")}</span>
                )}
              </p>
              <p className="text-muted">{t(`pricing.${plan}.text`)}</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>{t(`pricing.${plan}.f1`)}</li>
                <li>{t(`pricing.${plan}.f2`)}</li>
                <li>{t(`pricing.${plan}.f3`)}</li>
                <li>{t(`pricing.${plan}.f4`)}</li>
              </ul>
              <Link
                href={`${root}/quote`}
                className={`${pillButton(popular ? "primary" : "outline")} mt-auto`}
              >
                {t(`pricing.${plan}.cta`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function TestimonialsSection({ locale }: Props) {
  const t = getFreightT(locale);
  const testimonials = useFreightStore((state) => state.testimonials);
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
  const t = getFreightT(locale);
  return (
    <Section id="faq" eyebrow={t("faq.eyebrow")} title={t("faq.title")} intro={t("faq.text")}>
      <FaqAccordion store={useFreightStore} locale={locale} itemClassName="rounded-[22px]" />
    </Section>
  );
}

export function QuoteBand({ locale }: Props) {
  const t = getFreightT(locale);
  const content = useFreightStore((state) => state.content.contact);
  const whatsapp = useFreightStore((state) => state.settings.whatsapp);
  const root = `/${locale}${FREIGHT_ROOT}`;
  return (
    <section aria-labelledby="quote-band-title" className="mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-4 rounded-[22px] bg-primary p-8 text-on-primary md:p-12">
        <h2 id="quote-band-title" className="text-3xl font-extrabold">
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
