"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { MenuLine } from "./menu-line";
import { Section, SectionHeading } from "./section";
import { displayFont } from "./styles";

// Menu: guests decide what they will enjoy before they arrive (fewer questions, more confident bookings).
export function MenuPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const menu = useFineDiningStore((state) => state.menu);
  const currency = useFineDiningStore((state) => state.settings.currency);

  return (
    <Section id="menu-title">
      <SectionHeading
        level={1}
        id="menu-title"
        locale={locale}
        eyebrow={t("menu.eyebrow")}
        title={t("menu.title")}
      />
      <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-muted">{t("menu.intro")}</p>

      <div className="space-y-14">
        {menu.categories.map((category) => {
          const items = menu.items.filter((item) => item.categoryId === category.id);
          if (items.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`menu-${category.id}`}>
              <h2
                id={`menu-${category.id}`}
                className={`${displayFont} mb-4 border-b border-(--fd-accent) pb-2 text-3xl font-semibold text-(--fd-accent)`}
              >
                {category.name[locale]}
              </h2>
              <div className="grid gap-x-14 md:grid-cols-2">
                {items.map((item) => (
                  <MenuLine key={item.id} item={item} currency={currency} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
