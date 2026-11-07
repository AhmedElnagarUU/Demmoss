"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import { ReservationForm } from "../../../modules/reservations/reservation-form";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { splitEmphasis } from "./emphasis";
import { Plate, RoundPhoto } from "./fine-dining-photo";
import { Dots, Fork, Leaf, TornEdge } from "./icons";
import { MenuLine } from "./menu-line";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section";
import { btn, container, displayFont, formCard, formSkin, scriptFont } from "./styles";
import { HoursAndMap } from "./visit-details";

// Home, in the source section order: hero → story → signature dishes → gallery band → menu tabs → reserve and visit.
// The reservation form of the source is our closed loop: the booking lands in the dashboard.
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Story locale={locale} />
      <Signature locale={locale} />
      <GalleryBand locale={locale} />
      <MenuTabs locale={locale} />
      <Reserve locale={locale} />
    </>
  );
}

// Hero: radial green glow, two-line serif title with a gold italic word, the two chefs, a round plate with leaves.
function Hero({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const hero = useFineDiningStore((state) => state.content.hero);
  const { before, accent, after } = splitEmphasis(hero.title[locale]);

  return (
    <section
      id="top"
      className="relative bg-[radial-gradient(ellipse_at_70%_40%,var(--fd-band),var(--color-bg)_70%)] pb-[130px] pt-[70px]"
    >
      <div className={`${container} grid items-center gap-10 min-[1025px]:grid-cols-[1fr_1.1fr]`}>
        <Reveal>
          <h1 className={`${displayFont} mb-[22px] text-[clamp(42px,5.5vw,72px)]`}>
            {before}
            {accent ? (
              <em className="font-medium italic text-(--fd-accent) rtl:not-italic">{accent}</em>
            ) : null}
            {after}
          </h1>
          <p className="mb-7 max-w-[460px] opacity-85">{hero.subtitle[locale]}</p>
          <div className="mb-[34px] flex items-center gap-3.5">
            <RoundPhoto imageId="chef" locale={locale} sizes="46px" className="size-[46px]" />
            <RoundPhoto imageId="chef-team" locale={locale} sizes="46px" className="-ms-6 size-[46px]" />
            <span className="text-[13px] tracking-[0.05em] rtl:tracking-normal">
              <b className="block font-(family-name:--fd-display) text-[17px] font-normal leading-[1.2] text-(--fd-accent)">
                {t("home.chefsTitle")}
              </b>
              {t("home.chefsText")}
            </span>
          </div>
          <a href="#reserve" className={btn}>
            {t("home.heroCta")}
          </a>
        </Reveal>
        <Reveal className="relative w-[min(100%,540px)] justify-self-center max-[1024px]:order-first max-[1024px]:w-[min(86%,440px)]">
          <Plate
            imageId={hero.image}
            locale={locale}
            sizes="(min-width: 1025px) 540px, 86vw"
            priority
            className="w-full"
          />
          <Leaf className="-start-[14%] -bottom-[6%] w-[110px]" />
          <Dots className="-end-[6%] -top-[4%] w-[100px]" />
          <Leaf className="-end-[12%] bottom-[12%] w-[70px] rotate-[70deg] max-[640px]:hidden" />
        </Reveal>
      </div>
      <Dots className="start-[6%] bottom-20 w-20 max-[640px]:hidden" />
      <TornEdge shape="hero" fillClass="fill-(--color-surface)" />
    </section>
  );
}

// Story: a big gold script title and one paragraph, centered.
function Story({ locale }: { locale: Locale }) {
  const about = useFineDiningStore((state) => state.content.about);
  const paragraphs = about.text[locale].split("\n\n");

  return (
    <section id="story" className="relative scroll-mt-[70px] bg-surface pb-10 pt-[90px] text-center">
      <Reveal className={container}>
        <h2 className={`${scriptFont} mb-[18px] text-[clamp(44px,6vw,68px)]`}>{about.title[locale]}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mx-auto max-w-[720px] opacity-85 [&:not(:first-child)]:mt-4">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </section>
  );
}

// Signature dishes: the featured dishes, lightest to richest, in a dark panel next to a round bowl photo.
function Signature({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const items = useFineDiningStore((state) => state.menu.items);
  const currency = useFineDiningStore((state) => state.settings.currency);
  const featured = items.filter((item) => item.featured && item.available).sort((a, b) => a.price - b.price);

  return (
    <section id="signature" className="relative scroll-mt-[70px] bg-surface pb-[100px] pt-[50px]">
      <div className={`${container} grid items-center gap-[60px] min-[1025px]:grid-cols-[1fr_1.15fr]`}>
        <Reveal className="relative w-[min(100%,460px)] justify-self-center">
          <Plate
            imageId="dish-bowl"
            locale={locale}
            sizes="(min-width: 1025px) 460px, 86vw"
            className="w-full"
          />
          <Leaf className="-start-[6%] -top-[6%] w-[70px] -rotate-[30deg]" />
          <Dots className="-end-[4%] bottom-[4%] w-[60px]" />
        </Reveal>
        <Reveal className="border border-text/35 bg-(--fd-deep)/75 p-[38px] max-[640px]:p-[22px]">
          <h2 className={`${displayFont} mb-1.5 text-[30px]`}>{t("home.signatureTitle")}</h2>
          <p className="mb-[22px] text-sm opacity-70">{t("home.signatureText")}</p>
          {featured.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[18px] border-t border-text/15 py-4 max-[640px]:flex-wrap"
            >
              <RoundPhoto
                imageId={item.image}
                locale={locale}
                sizes="72px"
                className="size-[72px] shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              />
              <div>
                <h3 className={`${displayFont} text-[21px]`}>{item.name[locale]}</h3>
                <p className="text-sm leading-[1.5] opacity-75">{item.description[locale]}</p>
              </div>
              <span className={`${displayFont} ms-auto text-[22px] text-(--fd-accent)`}>
                {formatPrice(item.price, currency, locale)}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
      <TornEdge shape="signature" fillClass="fill-(--fd-band)" />
    </section>
  );
}

// Gallery band: two plates with a fork between them (the fork lies down on phones).
function GalleryBand({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const plates = [
    { key: "first", imageId: "dish-tomato-pasta" },
    { key: "second", imageId: "dish-plate" },
  ] as const;

  return (
    <section
      id="gallery"
      className="relative scroll-mt-[70px] overflow-hidden bg-(--fd-band) pb-[110px] pt-[90px]"
    >
      <h2 className="sr-only">{t("home.galleryLabel")}</h2>
      <div className={container}>
        <div className="mx-auto grid max-w-[1000px] items-center gap-[30px] min-[641px]:grid-cols-[1fr_70px_1fr]">
          <Reveal>
            <figure className="text-center">
              <Plate
                imageId={plates[0].imageId}
                locale={locale}
                sizes="(min-width: 641px) 400px, 86vw"
                frame="border-[6px] border-text/90"
                className="mx-auto mb-[22px] w-full max-w-[400px]"
              />
              <figcaption>
                <h3 className={`${displayFont} text-[26px]`}>{t("home.gallery.first.title")}</h3>
                <span className="text-[13px] opacity-70">{t("home.gallery.first.text")}</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <Fork className="mx-auto block w-[50px] drop-shadow-[8px_10px_8px_rgba(0,0,0,0.4)] max-[640px]:my-1.5 max-[640px]:w-11 max-[640px]:rotate-90" />
          </Reveal>
          <Reveal>
            <figure className="text-center">
              <Plate
                imageId={plates[1].imageId}
                locale={locale}
                sizes="(min-width: 641px) 400px, 86vw"
                frame="border-[6px] border-text/90"
                className="mx-auto mb-[22px] w-full max-w-[400px]"
              />
              <figcaption>
                <h3 className={`${displayFont} text-[26px]`}>{t("home.gallery.second.title")}</h3>
                <span className="text-[13px] opacity-70">{t("home.gallery.second.text")}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
      <Leaf className="start-[3%] top-10 w-[90px] -rotate-[20deg] max-[640px]:hidden" />
      <Leaf className="end-[8%] bottom-[60px] w-[90px] rotate-[30deg] max-[640px]:hidden" />
      <TornEdge shape="gallery" fillClass="fill-(--color-bg)" />
    </section>
  );
}

// Menu: course tabs and a two-column price list with dotted leaders; the list fades in when the tab changes.
function MenuTabs({ locale }: { locale: Locale }) {
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
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="relative scroll-mt-[70px] bg-bg pb-[100px] pt-[90px]"
    >
      <div className={container}>
        <SectionHeading id="menu-title" title={t("home.menuTitle")} intro={t("home.menuText")} />
        <div
          role="group"
          aria-label={t("home.menuTabs")}
          className="mb-11 flex flex-wrap justify-center gap-2.5"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={category.id === active.id}
              onClick={() => setChosen(category.id)}
              className="cursor-pointer border border-text/35 px-[22px] py-2.5 text-xs font-normal uppercase tracking-[0.18em] transition-colors duration-300 hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary rtl:text-sm rtl:normal-case rtl:tracking-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {category.name[locale]}
            </button>
          ))}
        </div>
        <div
          key={active.id}
          className="fd-anim-fade mx-auto grid max-w-[960px] grid-cols-1 gap-x-[60px] gap-y-2.5 min-[641px]:grid-cols-2"
        >
          {items.map((item) => (
            <MenuLine key={item.id} item={item} currency={currency} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reserve a table: the booking form next to the opening hours and the map.
function Reserve({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const root = `/${locale}/demos/restaurant/fine-dining`;

  return (
    <section
      id="reserve"
      aria-labelledby="reserve-title"
      className="relative scroll-mt-[70px] bg-surface pb-[100px] pt-[90px]"
    >
      <div className={container}>
        <SectionHeading id="reserve-title" title={t("home.reserveTitle")} intro={t("home.reserveText")} />
        <div className="mx-auto grid max-w-[1000px] gap-[50px] min-[1025px]:grid-cols-2">
          <Reveal className={formCard}>
            <h3 className={`${displayFont} mb-[18px] text-[30px]`}>{t("home.bookTitle")}</h3>
            <div className={formSkin}>
              <ReservationForm
                store={useFineDiningStore}
                slug={FINE_DINING_SLUG}
                locale={locale}
                dashboardHref={`${root}/dashboard/reservations`}
              />
            </div>
          </Reveal>
          <Reveal>
            <HoursAndMap locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
