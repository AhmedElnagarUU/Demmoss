"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { formatNumber, formatPrice, formatTime } from "@/features/demo-engine/format/format";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { FastFoodPhoto } from "./fast-food-photo";
import { Icon, type IconName } from "./icons";
import { ItemCard, OfferCard } from "./item-card";
import { Section, SectionHeading } from "./section";
import { displayFont, eyebrowClass, pillOutline, pillSolid } from "./styles";

const promises: { key: "smashed" | "fresh" | "delivery" | "live"; icon: IconName }[] = [
  { key: "smashed", icon: "flame" },
  { key: "fresh", icon: "leaf" },
  { key: "delivery", icon: "bike" },
  { key: "live", icon: "clock" },
];

// Home: order now (sales) → promises (trust) → offers and best sellers (sales) → how it works and areas (no doubt) → reviews → info.
export function HomePage({ locale }: { locale: Locale }) {
  const root = `/${locale}/demos/restaurant/fast-food`;
  return (
    <>
      <Hero locale={locale} root={root} />
      <Promises locale={locale} />
      <Offers locale={locale} root={root} />
      <BestSellers locale={locale} root={root} />
      <HowItWorks locale={locale} />
      <Areas locale={locale} />
      <Reviews locale={locale} />
      <InfoStrip locale={locale} root={root} />
    </>
  );
}

function Hero({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const hero = useFastFoodStore((state) => state.content.hero);

  return (
    <section>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div className="space-y-5">
          <p className={eyebrowClass}>{t("home.heroEyebrow")}</p>
          <h1 className={`${displayFont} text-6xl leading-[0.95] text-primary sm:text-8xl`}>
            {hero.title[locale]}
          </h1>
          <p className="max-w-md text-lg text-muted">{hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/menu`} className={pillSolid}>
              {t("home.heroCta")}
            </Link>
            <Link href={`${root}/contact`} className={pillOutline}>
              {t("home.heroVisit")}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/60"
          />
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-bg shadow-2xl">
            <FastFoodPhoto
              imageId={hero.image}
              locale={locale}
              sizes="(min-width: 768px) 440px, 90vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Promises({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);

  return (
    <section aria-label={t("home.promisesLabel")}>
      <ul className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-border bg-surface px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((promise) => (
          <li key={promise.key} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              <Icon name={promise.icon} />
            </span>
            <div>
              <p className="font-bold">{t(`home.promises.${promise.key}.title`)}</p>
              <p className="text-sm text-muted">{t(`home.promises.${promise.key}.text`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Offers({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const offers = useFastFoodStore((state) => state.offers).filter((offer) => offer.active);
  const currency = useFastFoodStore((state) => state.settings.currency);
  if (offers.length === 0) return null;

  return (
    <Section id="offers-title">
      <SectionHeading id="offers-title" eyebrow={t("home.offersEyebrow")} title={t("home.offersTitle")} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <li key={offer.id}>
            <OfferCard offer={offer} currency={currency} locale={locale} />
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link href={`${root}/menu`} className={pillOutline}>
          {t("home.viewMenu")}
        </Link>
      </div>
    </Section>
  );
}

function BestSellers({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const items = useFastFoodStore((state) => state.menu.items).filter(
    (item) => item.featured && item.available,
  );
  const currency = useFastFoodStore((state) => state.settings.currency);
  if (items.length === 0) return null;

  return (
    <Section id="best-title" tone="soft">
      <SectionHeading id="best-title" eyebrow={t("home.bestEyebrow")} title={t("home.bestTitle")} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} currency={currency} locale={locale} />
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link href={`${root}/menu`} className={pillSolid}>
          {t("home.viewMenu")}
        </Link>
      </div>
    </Section>
  );
}

function HowItWorks({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const how = useFastFoodStore((state) => state.content.experience);

  return (
    <Section id="how-title">
      <SectionHeading id="how-title" eyebrow={t("home.howEyebrow")} title={how.title[locale]} />
      <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-lg text-muted">{how.intro[locale]}</p>
      <ol className="grid gap-6 md:grid-cols-3">
        {how.points.map((point, index) => (
          <li key={index} className="space-y-2 rounded-3xl border border-border bg-surface p-6">
            <p className={`${displayFont} text-5xl leading-none text-primary`}>
              {formatNumber(index + 1, locale)}
            </p>
            <h3 className="text-xl font-bold">{point.title[locale]}</h3>
            <p className="text-muted">{point.text[locale]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Areas({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const areas = useFastFoodStore((state) => state.areas);
  const currency = useFastFoodStore((state) => state.settings.currency);
  if (areas.length === 0) return null;

  return (
    <Section id="areas-title" tone="soft">
      <SectionHeading id="areas-title" eyebrow={t("home.areasEyebrow")} title={t("home.areasTitle")} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <li key={area.id} className="space-y-1 rounded-3xl border border-border bg-bg p-5">
            <h3 className="text-xl font-bold">{area.name[locale]}</h3>
            <p className="text-muted">
              {t("home.areaFee", { fee: formatPrice(area.fee, currency, locale) })}
            </p>
            <p className="text-muted">
              {t("home.areaMinimum", { minimum: formatPrice(area.minOrder, currency, locale) })}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Reviews({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const reviews = useFastFoodStore((state) => state.reviews).filter((review) => review.visible);
  if (reviews.length === 0) return null;

  return (
    <Section id="reviews-title">
      <SectionHeading id="reviews-title" eyebrow={t("home.reviewsEyebrow")} title={t("home.reviewsTitle")} />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id}>
            <figure className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-6">
              <p
                role="img"
                aria-label={t("home.rating", { rating: String(review.rating) })}
                className="text-primary"
              >
                {"★".repeat(review.rating)}
              </p>
              <blockquote className="grow">{review.text[locale]}</blockquote>
              <figcaption className="text-sm font-semibold text-muted">{review.author[locale]}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function InfoStrip({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const settings = useFastFoodStore((state) => state.settings);
  const areaCount = useFastFoodStore((state) => state.areas.length);
  const today = settings.hours.find((day) => day.day === new Date().getDay());
  const hoursText =
    !today || today.closed
      ? t("contact.closedToday")
      : `${formatTime(today.open, locale)} – ${formatTime(today.close, locale)}`;

  const items: { icon: IconName; title: string; text: string }[] = [
    { icon: "pin", title: t("home.info.location"), text: settings.address[locale] },
    { icon: "clock", title: t("home.info.hours"), text: hoursText },
    { icon: "phone", title: t("home.info.call"), text: settings.phone },
    {
      icon: "bike",
      title: t("home.info.delivery"),
      text: t("home.info.deliveryText", { count: formatNumber(areaCount, locale) }),
    },
  ];

  return (
    <section aria-label={t("home.info.label")} className="mx-auto max-w-6xl px-4 pb-16">
      <ul className="grid gap-6 rounded-3xl bg-primary px-6 py-8 text-on-primary sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bg text-primary">
              <Icon name={item.icon} />
            </span>
            <div>
              <p className="font-bold">{item.title}</p>
              <p dir={item.icon === "phone" ? "ltr" : undefined} className="text-sm">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link href={`${root}/menu`} className={pillSolid}>
          {t("home.heroCta")}
        </Link>
      </div>
    </section>
  );
}
