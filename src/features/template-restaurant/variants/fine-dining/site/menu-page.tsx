"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { DishCard } from "./dish-card";
import { Section, SectionHeading } from "./section";

// Menu: guests decide what they will enjoy before they arrive (fewer questions, more confident bookings).
export function MenuPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const menu = useFineDiningStore((state) => state.menu);
  const currency = useFineDiningStore((state) => state.settings.currency);

  return (
    <Section id="menu-title">
      <SectionHeading level={1} id="menu-title" eyebrow={t("menu.eyebrow")} title={t("menu.title")} />
      <p className="mb-12 max-w-2xl text-lg text-muted">{t("menu.intro")}</p>

      <div className="space-y-14">
        {menu.categories.map((category) => {
          const items = menu.items.filter((item) => item.categoryId === category.id);
          if (items.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`menu-${category.id}`}>
              <h2
                id={`menu-${category.id}`}
                className="mb-6 border-b border-border pb-2 text-2xl font-bold text-(--fd-accent)"
              >
                {category.name[locale]}
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <DishCard item={item} currency={currency} locale={locale} withImage={false} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
