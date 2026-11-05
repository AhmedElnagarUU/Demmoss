"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { buttonClasses } from "@/shared/ui/button-styles";
import { RestaurantImage } from "../../../restaurant-image";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { DishCard } from "./dish-card";
import { Section, SectionHeading } from "./section";
import { VisitDetails } from "./visit-details";

// Home: reserve (bookings) → desire (dishes) → premium image (experience) → trust (chef, reviews) → events → visit.
export function HomePage({ locale }: { locale: Locale }) {
  const root = `/${locale}/demos/restaurant/fine-dining`;
  return (
    <>
      <Hero locale={locale} root={root} />
      <Signature locale={locale} root={root} />
      <Experience locale={locale} />
      <ChefTeaser locale={locale} root={root} />
      <Reviews locale={locale} />
      <EventsTeaser locale={locale} root={root} />
      <Section id="visit-title">
        <SectionHeading
          id="visit-title"
          eyebrow={getFineDiningT(locale)("home.visitEyebrow")}
          title={getFineDiningT(locale)("home.visitTitle")}
        />
        <VisitDetails locale={locale} />
      </Section>
    </>
  );
}

function Hero({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const hero = useFineDiningStore((state) => state.content.hero);

  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{hero.title[locale]}</h1>
          <p className="max-w-xl text-lg text-muted">{hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3 font-sans">
            <Link href={`${root}/reserve`} className={buttonClasses("primary")}>
              {t("home.heroCta")}
            </Link>
            <Link href={`${root}/menu`} className={buttonClasses("secondary")}>
              {t("home.heroMenu")}
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-control border border-border">
          <RestaurantImage imageId={hero.image} locale={locale} priority />
        </div>
      </div>
    </section>
  );
}

function Signature({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const items = useFineDiningStore((state) => state.menu.items);
  const currency = useFineDiningStore((state) => state.settings.currency);
  const featured = items.filter((item) => item.featured && item.available);
  if (featured.length === 0) return null;

  return (
    <Section id="signature-title">
      <SectionHeading
        id="signature-title"
        eyebrow={t("home.signatureEyebrow")}
        title={t("home.signatureTitle")}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item) => (
          <li key={item.id}>
            <DishCard item={item} currency={currency} locale={locale} />
          </li>
        ))}
      </ul>
      <Link href={`${root}/menu`} className={`${buttonClasses("secondary")} mt-8 font-sans`}>
        {t("home.viewMenu")}
      </Link>
    </Section>
  );
}

function Experience({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const experience = useFineDiningStore((state) => state.content.experience);

  return (
    <Section id="experience-title" tone="soft">
      <SectionHeading
        id="experience-title"
        eyebrow={t("home.experienceEyebrow")}
        title={experience.title[locale]}
      />
      <p className="mb-10 max-w-2xl text-lg text-muted">{experience.intro[locale]}</p>
      <ul className="grid gap-8 md:grid-cols-3">
        {experience.points.map((point, index) => (
          <li key={index} className="space-y-2 border-t-2 border-(--fd-accent) pt-4">
            <h3 className="text-xl font-bold">{point.title[locale]}</h3>
            <p className="text-muted">{point.text[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ChefTeaser({ locale, root }: { locale: Locale; root: string }) {
  const t = getFineDiningT(locale);
  const about = useFineDiningStore((state) => state.content.about);
  const firstParagraph = about.text[locale].split("\n\n")[0] ?? "";

  return (
    <Section id="chef-title">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-control border border-border">
          <RestaurantImage imageId={about.image} locale={locale} />
        </div>
        <div>
          <SectionHeading id="chef-title" eyebrow={t("home.chefEyebrow")} title={about.title[locale]} />
          <p className="mb-6 text-lg text-muted">{firstParagraph}</p>
          <Link href={`${root}/about`} className={`${buttonClasses("secondary")} font-sans`}>
            {t("home.chefLink")}
          </Link>
        </div>
      </div>
    </Section>
  );
}

function Reviews({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const reviews = useFineDiningStore((state) => state.reviews).filter((review) => review.visible);
  if (reviews.length === 0) return null;

  return (
    <Section id="reviews-title" tone="soft">
      <SectionHeading id="reviews-title" eyebrow={t("home.reviewsEyebrow")} title={t("home.reviewsTitle")} />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id}>
            <figure className="flex h-full flex-col gap-3 rounded-control border border-border bg-bg p-5">
              <p
                role="img"
                aria-label={t("home.rating", { rating: String(review.rating) })}
                className="font-sans text-(--fd-accent)"
              >
                {"★".repeat(review.rating)}
              </p>
              <blockquote className="grow text-lg">{review.text[locale]}</blockquote>
              <figcaption className="font-sans text-sm font-semibold text-muted">
                {review.author[locale]}
              </figcaption>
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
    <Section id="events-title">
      <div className="rounded-control border border-border bg-surface p-8 sm:p-12">
        <SectionHeading id="events-title" eyebrow={t("home.eventsEyebrow")} title={t("home.eventsTitle")} />
        <p className="mb-6 max-w-2xl text-lg text-muted">{t("home.eventsText")}</p>
        <Link href={`${root}/events`} className={`${buttonClasses("primary")} font-sans`}>
          {t("home.eventsCta")}
        </Link>
      </div>
    </Section>
  );
}
