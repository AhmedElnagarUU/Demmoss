"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "../../../format";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { FineDiningPhoto, Plate } from "./fine-dining-photo";
import { Icon, type IconName } from "./icons";
import { MenuLine } from "./menu-line";
import { Section, SectionHeading } from "./section";
import { displayFont, outlineButton, scriptAccent, solidButton } from "./styles";
import { VisitDetails } from "./visit-details";

// Photos of the experience band, in the order of the experience points the owner edits.
const experiencePhotos = ["interior", "ambience-glass", "dish-lamb"] as const;

const promises: { key: "reserve" | "charcoal" | "fresh" | "occasion"; icon: IconName }[] = [
  { key: "reserve", icon: "calendar" },
  { key: "charcoal", icon: "flame" },
  { key: "fresh", icon: "leaf" },
  { key: "occasion", icon: "star" },
];

// Home: reserve (bookings) → promises and story (trust) → dishes and experience (desire) → menu → reviews → events → visit.
export function HomePage({ locale }: { locale: Locale }) {
  const root = `/${locale}/demos/restaurant/fine-dining`;
  return (
    <>
      <Hero locale={locale} root={root} />
      <Promises locale={locale} />
      <Story locale={locale} root={root} />
      <Signature locale={locale} root={root} />
      <Experience locale={locale} />
      <MenuPreview locale={locale} root={root} />
      <Reviews locale={locale} />
      <EventsTeaser locale={locale} root={root} />
      <ReserveBand locale={locale} root={root} />
    </>
  );
}

function Hero({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const hero = useFineDiningStore((state) => state.content.hero);

  return (
    <section className="bg-[radial-gradient(ellipse_at_70%_40%,var(--color-surface),var(--color-bg)_70%)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1fr_1.1fr] md:py-24">
        <div className="space-y-6">
          <h1 className={`${displayFont} text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl`}>
            {hero.title[locale]}
          </h1>
          <p className="max-w-md text-lg text-muted">{hero.subtitle[locale]}</p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-6 rtl:space-x-reverse">
              {(["chef", "chef-team"] as const).map((id) => (
                <div key={id} className="size-12 overflow-hidden rounded-full border border-(--fd-accent)">
                  <FineDiningPhoto imageId={id} locale={locale} sizes="48px" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted">
              <span className={`${displayFont} block text-lg text-(--fd-accent)`}>
                {t("home.chefsTitle")}
              </span>
              {t("home.chefsText")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/reserve`} className={solidButton}>
              {t("home.heroCta")}
            </Link>
            <Link href={`${root}/menu`} className={outlineButton}>
              {t("home.heroMenu")}
            </Link>
          </div>
        </div>
        <Plate
          imageId={hero.image}
          locale={locale}
          sizes="(min-width: 768px) 540px, 90vw"
          priority
          className="mx-auto w-full max-w-lg"
        />
      </div>
    </section>
  );
}

function Promises({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);

  return (
    <section aria-label={t("home.promisesLabel")} className="border-y border-border bg-surface">
      <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((promise) => (
          <li key={promise.key} className="flex items-start gap-4">
            <Icon name={promise.icon} />
            <div>
              <p className={`${displayFont} text-xl font-semibold`}>
                {t(`home.promises.${promise.key}.title`)}
              </p>
              <p className="text-sm text-muted">{t(`home.promises.${promise.key}.text`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Story({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const about = useFineDiningStore((state) => state.content.about);
  const firstParagraph = about.text[locale].split("\n\n")[0] ?? "";

  return (
    <Section id="story-title">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          id="story-title"
          locale={locale}
          eyebrow={t("home.storyEyebrow")}
          title={about.title[locale]}
        />
        <p className="mb-8 text-lg text-muted">{firstParagraph}</p>
        <Link href={`${root}/about`} className={outlineButton}>
          {t("home.chefLink")}
        </Link>
      </div>
    </Section>
  );
}

function Signature({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const items = useFineDiningStore((state) => state.menu.items);
  const currency = useFineDiningStore((state) => state.settings.currency);
  const featured = items.filter((item) => item.featured && item.available);
  const first = featured[0];
  if (!first) return null;

  return (
    <section aria-labelledby="signature-title" className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1fr_1.15fr]">
        <Plate
          imageId={first.image}
          locale={locale}
          sizes="(min-width: 1024px) 460px, 80vw"
          className="mx-auto w-full max-w-md"
        />
        <div className="border border-border bg-bg/60 p-6 sm:p-10">
          <p className={scriptAccent(locale)}>{t("home.signatureEyebrow")}</p>
          <h2 id="signature-title" className={`${displayFont} mb-6 text-3xl font-semibold sm:text-4xl`}>
            {t("home.signatureTitle")}
          </h2>
          <ul>
            {featured.map((item) => (
              <li key={item.id} className="flex items-center gap-4 border-t border-border py-4">
                <div className="size-16 shrink-0 overflow-hidden rounded-full border border-(--fd-accent)">
                  <FineDiningPhoto imageId={item.image} locale={locale} sizes="64px" />
                </div>
                <div className="grow">
                  <h3 className={`${displayFont} text-xl font-semibold`}>{item.name[locale]}</h3>
                  <p className="text-sm text-muted">{item.description[locale]}</p>
                </div>
                <p className={`${displayFont} text-xl font-semibold text-(--fd-accent)`}>
                  {formatPrice(item.price, currency, locale)}
                </p>
              </li>
            ))}
          </ul>
          <Link href={`${root}/menu`} className={`${outlineButton} mt-6`}>
            {t("home.viewMenu")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Experience({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const experience = useFineDiningStore((state) => state.content.experience);

  return (
    <Section id="experience-title">
      <SectionHeading
        id="experience-title"
        locale={locale}
        eyebrow={t("home.experienceEyebrow")}
        title={experience.title[locale]}
      />
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">{experience.intro[locale]}</p>
      <ul className="grid gap-10 md:grid-cols-3">
        {experience.points.map((point, index) => (
          <li key={index} className="text-center">
            <Plate
              imageId={experiencePhotos[index % experiencePhotos.length] ?? "interior"}
              locale={locale}
              sizes="(min-width: 768px) 320px, 70vw"
              className="mx-auto mb-6 w-full max-w-xs border-4 border-text/90"
            />
            <h3 className={`${displayFont} text-2xl font-semibold`}>{point.title[locale]}</h3>
            <p className="mt-1 text-muted">{point.text[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function MenuPreview({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const menu = useFineDiningStore((state) => state.menu);
  const currency = useFineDiningStore((state) => state.settings.currency);
  const categories = menu.categories.filter((category) =>
    menu.items.some((item) => item.categoryId === category.id),
  );
  const [chosen, setChosen] = useState("");
  const active = categories.find((category) => category.id === chosen) ?? categories[0];
  if (!active) return null;
  const items = menu.items.filter((item) => item.categoryId === active.id);

  return (
    <Section id="preview-title" tone="soft">
      <SectionHeading
        id="preview-title"
        locale={locale}
        eyebrow={t("home.previewEyebrow")}
        title={t("home.previewTitle")}
      />
      <div
        role="group"
        aria-label={t("home.previewTabs")}
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={category.id === active.id}
            onClick={() => setChosen(category.id)}
            className="min-h-11 border border-border px-5 text-xs font-medium uppercase tracking-[0.18em] hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary rtl:text-base rtl:normal-case rtl:tracking-normal focus-visible:outline-2 focus-visible:outline-focus"
          >
            {category.name[locale]}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-4xl gap-x-14 md:grid-cols-2">
        {items.map((item) => (
          <MenuLine key={item.id} item={item} currency={currency} locale={locale} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href={`${root}/menu`} className={outlineButton}>
          {t("home.viewMenu")}
        </Link>
      </div>
    </Section>
  );
}

function Reviews({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const reviews = useFineDiningStore((state) => state.reviews).filter((review) => review.visible);
  if (reviews.length === 0) return null;

  return (
    <Section id="reviews-title">
      <SectionHeading
        id="reviews-title"
        locale={locale}
        eyebrow={t("home.reviewsEyebrow")}
        title={t("home.reviewsTitle")}
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id}>
            <figure className="flex h-full flex-col gap-3 border border-border bg-surface p-6">
              <p
                role="img"
                aria-label={t("home.rating", { rating: String(review.rating) })}
                className="text-(--fd-accent)"
              >
                {"★".repeat(review.rating)}
              </p>
              <blockquote className={`${displayFont} grow text-xl`}>{review.text[locale]}</blockquote>
              <figcaption className="text-sm font-medium text-muted">{review.author[locale]}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function EventsTeaser({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);

  return (
    <section aria-labelledby="events-title" className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-[1fr_1.2fr]">
        <Plate
          imageId="dish-plate"
          locale={locale}
          sizes="(min-width: 768px) 360px, 70vw"
          className="mx-auto w-full max-w-xs"
        />
        <div className="space-y-4">
          <p className={scriptAccent(locale)}>{t("home.eventsEyebrow")}</p>
          <h2 id="events-title" className={`${displayFont} text-3xl font-semibold sm:text-4xl`}>
            {t("home.eventsTitle")}
          </h2>
          <p className="max-w-xl text-lg text-muted">{t("home.eventsText")}</p>
          <Link href={`${root}/events`} className={solidButton}>
            {t("home.eventsCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReserveBand({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);

  return (
    <Section id="visit-title">
      <SectionHeading
        id="visit-title"
        locale={locale}
        eyebrow={t("home.visitEyebrow")}
        title={t("home.visitTitle")}
      />
      <div className="mb-12 text-center">
        <Link href={`${root}/reserve`} className={solidButton}>
          {t("home.heroCta")}
        </Link>
      </div>
      <VisitDetails locale={locale} />
    </Section>
  );
}
