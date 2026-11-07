"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatNumber, formatPrice, formatTime } from "@/features/demo-engine/format/format";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { FastFoodPhoto } from "./fast-food-photo";
import { Icon, Leaf, type IconName } from "./icons";
import { MapArt } from "./map-art";
import { ItemCard, OfferCard } from "./item-card";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading } from "./section";
import { container, displayFont, pillOutline, pillSolid, scriptFont, serifFont } from "./styles";

const promises: { key: "oven" | "pasta" | "produce" | "recipes"; icon: IconName }[] = [
  { key: "oven", icon: "oven" },
  { key: "pasta", icon: "pasta" },
  { key: "produce", icon: "produce" },
  { key: "recipes", icon: "heart" },
];

const trackable = "rtl:normal-case rtl:tracking-normal";

// Home, in the source's section order: hero → feature strip → specials → menu price list → about →
// reviews → delivery check (in the reservation slot) → info strip with the map.
export function HomePage({ locale }: { locale: Locale }) {
  const root = `/${locale}/demos/restaurant/fast-food`;
  return (
    <>
      <Hero locale={locale} root={root} />
      <Promises locale={locale} />
      <Specials locale={locale} />
      <MenuPreview locale={locale} root={root} />
      <About locale={locale} root={root} />
      <Reviews locale={locale} />
      <DeliveryCheck locale={locale} root={root} />
      <InfoAndMap locale={locale} />
    </>
  );
}

// Hero: script accent, big two-tone Bebas title over a heart divider, buttons, spinning-ring photo plate and leaves.
function Hero({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const hero = useFastFoodStore((state) => state.content.hero);
  const title = hero.title[locale];
  const breakAt = title.lastIndexOf(" ");
  const accent = breakAt > 0 ? title.slice(breakAt + 1) : "";

  return (
    <section>
      <div
        className={`${container} grid items-center gap-9 pt-[50px] pb-[70px] md:grid-cols-[1.05fr_0.95fr] md:gap-10 max-sm:pt-[30px]`}
      >
        <Reveal>
          <span
            className={`-mb-1.5 block ${scriptFont} text-[54px] leading-none text-(--sl-accent) rotate-[-4deg] max-sm:text-[44px]`}
          >
            {t("home.heroAccent")}
          </span>
          {/* the source h1 size; Arabic gets a smaller clamp and more line height (a long Arabic sentence will not read at 148px Bebas scale) */}
          <h1
            className={`${displayFont} text-[clamp(78px,11vw,148px)] leading-[0.92] rtl:leading-[1.15] rtl:text-[clamp(44px,9vw,110px)]`}
          >
            {accent ? (
              <>
                {title.slice(0, breakAt)} <br />
                <span className="text-(--sl-primary-text)">{accent}</span>
              </>
            ) : (
              title
            )}
          </h1>
          <div aria-hidden="true" className="my-[18px] flex items-center gap-3 text-primary">
            <i className="h-[2px] w-[70px] bg-primary opacity-60" />
            <Icon name="heart" filled className="size-5" />
            <i className="h-[2px] w-[70px] bg-primary opacity-60" />
          </div>
          <p className="mb-[26px] max-w-[420px] text-base text-muted">{hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/menu`} className={pillSolid}>
              {t("home.heroCta")}
              <Icon name="arrow" className="size-4 rtl:rotate-180" />
            </Link>
            <Link href={`${root}/contact`} className={pillOutline}>
              {t("home.heroVisit")}
            </Link>
          </div>
        </Reveal>
        <Reveal className="relative mx-auto aspect-square w-full max-w-[520px] max-sm:w-[88%]">
          <span
            aria-hidden="true"
            className="sl-anim-spin absolute -inset-[4%] rounded-full border-2 border-dashed border-primary opacity-[0.55]"
          />
          <div className="absolute inset-[6%] overflow-hidden rounded-full border-8 border-surface shadow-[0_30px_60px_rgba(80,40,10,0.25)]">
            <FastFoodPhoto
              imageId={hero.image}
              locale={locale}
              sizes="(min-width: 768px) 460px, 88vw"
              priority
            />
          </div>
          <Leaf
            className="sl-anim-float absolute top-[2%] start-[4%] w-[74px]"
            fill="#3f7d3a"
            stem="#a9d3a2"
          />
          <Leaf
            className="sl-anim-float-late absolute bottom-[6%] -end-[2%] w-[90px]"
            fill="#4c9446"
            stem="#b9e0b3"
          />
          <Leaf className="sl-anim-float-later absolute bottom-[20%] -start-[4%] w-[56px]" fill="#35702f" />
        </Reveal>
      </div>
    </section>
  );
}

// Feature strip: one white card overlapping the hero, 4 promises with red icon circles and vertical dividers.
function Promises({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);

  return (
    <div className={`${container} relative z-10 -mt-2.5`}>
      <Reveal>
        <ul
          aria-label={t("home.promisesLabel")}
          className="grid grid-cols-1 gap-y-[26px] rounded-[22px] bg-surface py-[30px] px-[10px] shadow-(--sl-shadow) sm:grid-cols-2 lg:grid-cols-4"
        >
          {promises.map((promise) => (
            <li
              key={promise.key}
              className="flex gap-3.5 border-e border-border px-6 last:border-e-0 sm:max-lg:[&:nth-child(2)]:border-e-0 max-sm:border-e-0 max-sm:px-[14px]"
            >
              <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                <Icon name={promise.icon} className="size-[26px]" />
              </span>
              <div>
                <h4 className={`mb-1 text-[13px] font-bold tracking-[0.07em] ${trackable}`}>
                  {t(`home.promises.${promise.key}.title`)}
                </h4>
                <p className="text-[13px] leading-normal text-muted">
                  {t(`home.promises.${promise.key}.text`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

// Specials: active offers first, then best sellers, in the source dish card (heart, price, green add pill).
function Specials({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const offers = useFastFoodStore((state) => state.offers).filter((offer) => offer.active);
  const items = useFastFoodStore((state) => state.menu.items).filter(
    (item) => item.featured && item.available,
  );
  const currency = useFastFoodStore((state) => state.settings.currency);
  if (offers.length === 0 && items.length === 0) return null;

  return (
    <Section id="specials">
      <SectionHeading id="specials" eyebrow={t("home.bestEyebrow")} title={t("home.bestTitle")} />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[26px]">
        {offers.map((offer) => (
          <li key={offer.id}>
            <Reveal className="h-full">
              <OfferCard offer={offer} currency={currency} locale={locale} />
            </Reveal>
          </li>
        ))}
        {items.map((item) => (
          <li key={item.id}>
            <Reveal className="h-full">
              <ItemCard item={item} currency={currency} locale={locale} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// Menu preview: the white band with category tabs and the two-column price list with dotted leaders.
function MenuPreview({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const menu = useFastFoodStore((state) => state.menu);
  const currency = useFastFoodStore((state) => state.settings.currency);
  const categories = menu.categories.filter((category) =>
    menu.items.some((item) => item.categoryId === category.id),
  );
  const [chosen, setChosen] = useState("");
  const active = categories.find((category) => category.id === chosen) ?? categories[0];
  const rows = active ? menu.items.filter((item) => item.categoryId === active.id) : [];

  return (
    <Section tone="white" id="menu-preview">
      <SectionHeading id="menu-preview" eyebrow={t("menu.eyebrow")} title={t("menu.title")} />
      <Reveal className="mb-9">
        <div role="group" aria-label={t("menu.categories")} className="flex flex-wrap justify-center gap-2.5">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={category.id === active?.id}
              onClick={() => setChosen(category.id)}
              className="cursor-pointer rounded-full border-2 border-border bg-bg px-6 py-2.5 text-sm font-medium transition-colors duration-200 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus hover:border-primary"
            >
              {category.name[locale]}
            </button>
          ))}
        </div>
      </Reveal>
      {/* the key remounts the list on tab change, so the source's fade-in runs again on every switch */}
      <ul key={active?.id} className="grid grid-cols-1 gap-y-[18px] gap-x-[50px] md:grid-cols-2">
        {rows.map((item) => (
          <li
            key={item.id}
            className="sl-anim-fade flex items-start gap-4 rounded-[16px] p-3.5 transition-colors duration-200 hover:bg-bg"
          >
            <span className="block size-[76px] shrink-0 overflow-hidden rounded-full bg-surface">
              <FastFoodPhoto imageId={item.image} locale={locale} sizes="76px" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className={`${serifFont} text-[17px]`}>{item.name[locale]}</h3>
                <i
                  aria-hidden="true"
                  className="-translate-y-1 flex-1 border-b-2 border-dotted border-[#d8c9b3]"
                />
                <b className="text-[17px] font-bold text-(--sl-primary-text)">
                  {formatPrice(item.price, currency, locale)}
                </b>
              </div>
              <p className="text-[13px] text-muted">{item.description[locale]}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Link href={`${root}/menu`} className={pillSolid}>
          {t("home.viewMenu")}
        </Link>
      </div>
    </Section>
  );
}

// About: 4/3 photo with the red year badge, story text, then button + green signature (like the source).
function About({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const about = useFastFoodStore((state) => state.content.about);

  return (
    <Section id="about-title">
      <div className={`grid items-center gap-9 md:grid-cols-[1.05fr_0.95fr] md:gap-[60px]`}>
        <Reveal className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-surface shadow-(--sl-shadow)">
            <FastFoodPhoto imageId={about.image} locale={locale} sizes="(min-width: 768px) 520px, 92vw" />
          </div>
          <div className="absolute bottom-[-22px] start-[-18px] rounded-[18px] bg-primary px-6 py-4 text-center text-on-primary shadow-[0_12px_26px_rgba(217,65,43,0.35)] max-sm:start-2">
            <b className={`block text-[32px] leading-[1.1] font-normal ${scriptFont}`}>
              {t("home.badgeBig")}
            </b>
            <span className={`text-xs tracking-[0.1em] uppercase ${trackable}`}>{t("home.badgeLabel")}</span>
          </div>
        </Reveal>
        <Reveal>
          <Eyebrow startRule={false}>{t("home.aboutEyebrow")}</Eyebrow>
          <h2 id="about-title" className={`${serifFont} mt-2 mb-4 text-[clamp(30px,4vw,44px)] leading-[1.2]`}>
            {about.title[locale]}
          </h2>
          {about.text[locale].split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-[22px] text-muted">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap items-center gap-[26px]">
            <Link href={`${root}/contact`} className={pillSolid}>
              {t("home.aboutCta")}
              <Icon name="arrow" className="size-4 rtl:rotate-180" />
            </Link>
            <span className={`${scriptFont} text-[38px] text-(--sl-accent)`}>{t("home.signature")}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// Reviews: the tinted band with white cards, gold stars, the big red quotation mark and green avatar circles.
function Reviews({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const reviews = useFastFoodStore((state) => state.reviews).filter((review) => review.visible);
  if (reviews.length === 0) return null;

  return (
    <Section tone="band" id="reviews-title">
      <SectionHeading id="reviews-title" eyebrow={t("home.reviewsEyebrow")} title={t("home.reviewsTitle")} />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[26px]">
        {reviews.map((review) => (
          <li key={review.id}>
            <Reveal className="h-full">
              <figure className="relative h-full rounded-[20px] bg-surface p-[28px] shadow-(--sl-shadow)">
                <span
                  aria-hidden="true"
                  className="absolute top-[6px] end-[22px] font-(family-name:--sl-serif) text-[80px] leading-none text-primary opacity-[0.18] select-none"
                >
                  {"\u201C"}
                </span>
                <p
                  role="img"
                  aria-label={t("home.rating", { rating: String(review.rating) })}
                  className="mt-[2px] mb-[10px] text-[13px] tracking-[2px] text-[#e9a21b]"
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                <blockquote className="mt-[10px] mb-[18px] text-[14px] leading-[1.6] text-[#444444]">
                  {review.text[locale]}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="grid size-[42px] shrink-0 place-items-center rounded-full bg-(--sl-accent) font-semibold text-(--sl-on-accent)">
                    {review.author[locale].trim().charAt(0)}
                  </span>
                  <span>
                    <b className="text-base font-bold">{review.author[locale]}</b>
                    <small className="block text-xs text-muted">
                      {review.role?.[locale] ?? t("home.customerLabel")}
                    </small>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// The reservation slot, as a delivery check: script accent + text on one side, a white panel card with
// the delivery-area picker (fee + minimum for the chosen area) and a full-width start-order button.
function DeliveryCheck({ locale, root }: { locale: Locale; root: string }) {
  const t = getFastFoodT(locale);
  const areas = useFastFoodStore((state) => state.areas);
  const currency = useFastFoodStore((state) => state.settings.currency);
  const [chosenId, setChosenId] = useState("");
  const chosen = areas.find((area) => area.id === chosenId) ?? areas[0];
  if (!chosen) return null;

  return (
    <Section id="areas-title">
      <div className="grid items-center gap-9 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className={`block ${scriptFont} text-[42px] leading-none text-(--sl-accent)`}>
            {t("home.deliveryScript")}
          </span>
          <h2
            id="areas-title"
            className={`${serifFont} mt-1.5 mb-3.5 text-[clamp(30px,4vw,44px)] leading-[1.2]`}
          >
            {t("home.areasTitle")}
          </h2>
          <p className="text-muted">{t("home.areasIntro")}</p>
        </Reveal>
        <Reveal>
          <form
            className="grid grid-cols-1 gap-4 rounded-[22px] bg-surface p-8 shadow-(--sl-shadow) max-sm:p-[22px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span
                className={`block text-xs font-semibold uppercase tracking-[0.06em] text-muted ${trackable}`}
              >
                {t("home.areaLabel")}
              </span>
              <select
                value={chosen.id}
                onChange={(event) => setChosenId(event.target.value)}
                className="mt-[5px] block w-full rounded-xl border-[1.5px] border-border bg-bg px-[14px] py-3 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name[locale]}
                  </option>
                ))}
              </select>
            </label>
            <p role="status" className="rounded-xl bg-[#e8f3e6] p-[14px] text-sm font-medium text-[#3d7a39]">
              {t("home.areaSummary", {
                area: chosen.name[locale],
                fee: formatPrice(chosen.fee, currency, locale),
                minimum: formatPrice(chosen.minOrder, currency, locale),
              })}
            </p>
            <Link href={`${root}/menu`} className={`${pillSolid} w-full`}>
              {t("home.startOrder")}
            </Link>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

// Info strip: the red gradient bar with location/hours/phone/delivery, and the CSS map with the pin below.
function InfoAndMap({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const settings = useFastFoodStore((state) => state.settings);
  const name = useFastFoodStore((state) => businessNameOf(state, locale));
  const areaCount = useFastFoodStore((state) => state.areas.length);
  const today = settings.hours.find((day) => day.day === new Date().getDay());
  const hoursText =
    !today || today.closed
      ? t("contact.closedToday")
      : `${formatTime(today.open, locale)} – ${formatTime(today.close, locale)}`;

  const items: { icon: IconName; title: string; text: string; numeric?: boolean }[] = [
    { icon: "pin", title: t("home.info.location"), text: settings.address[locale] },
    { icon: "clock", title: t("home.info.hours"), text: hoursText },
    { icon: "phone", title: t("home.info.call"), text: settings.phone, numeric: true },
    {
      icon: "bike",
      title: t("home.info.delivery"),
      text: t("home.info.deliveryText", { count: formatNumber(areaCount, locale) }),
    },
  ];

  return (
    <div className={`${container} pb-[70px]`}>
      <Reveal>
        <ul
          aria-label={t("home.info.label")}
          className="grid grid-cols-1 gap-y-[26px] rounded-[22px] bg-[linear-gradient(135deg,#e2503a,#b9321f)] py-[30px] px-5 text-white shadow-[0_18px_40px_rgba(217,65,43,0.3)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3.5 border-e border-white/30 px-6 last:border-e-0 max-sm:border-e-0 max-sm:px-[14px]"
            >
              <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-white text-(--sl-primary-text)">
                <Icon name={item.icon} className="size-[26px]" />
              </span>
              <div>
                <h4 className={`mb-1 text-[13px] font-bold tracking-[0.07em] ${trackable}`}>{item.title}</h4>
                <p
                  className="text-[13px] leading-normal text-white/[0.88]"
                  dir={item.numeric ? "ltr" : undefined}
                >
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <MapArt label={t("contact.mapLabel")} className="mt-[26px]">
          <p className="relative rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-on-primary shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
            {t("home.mapPin", { name, address: settings.address[locale] })}
          </p>
        </MapArt>
      </Reveal>
    </div>
  );
}
