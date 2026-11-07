"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { ItemCard, OfferCard } from "./item-card";
import { Section, SectionHeading } from "./section";
import { serifFont } from "./styles";

// Menu: offers first, then category tabs and items with "Add". Everything here ends in the cart.
export function MenuPage({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const menu = useFastFoodStore((state) => state.menu);
  const offers = useFastFoodStore((state) => state.offers).filter((offer) => offer.active);
  const currency = useFastFoodStore((state) => state.settings.currency);
  const categories = menu.categories.filter((category) =>
    menu.items.some((item) => item.categoryId === category.id),
  );
  const [chosen, setChosen] = useState("");
  const active = categories.find((category) => category.id === chosen) ?? categories[0];
  const items = active ? menu.items.filter((item) => item.categoryId === active.id) : [];

  return (
    <Section id="menu-title">
      <SectionHeading level={1} id="menu-title" eyebrow={t("menu.eyebrow")} title={t("menu.title")} />

      {offers.length > 0 ? (
        <section aria-labelledby="menu-offers" className="mb-14">
          <h2 id="menu-offers" className={`${serifFont} mb-6 text-[clamp(30px,4vw,44px)] leading-[1.2]`}>
            {t("menu.offersTitle")}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id}>
                <OfferCard offer={offer} currency={currency} locale={locale} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div
        role="group"
        aria-label={t("menu.categories")}
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={category.id === active?.id}
            onClick={() => setChosen(category.id)}
            className="min-h-11 rounded-full border-2 border-border bg-surface px-6 text-sm font-medium hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-focus"
          >
            {category.name[locale]}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} currency={currency} locale={locale} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
