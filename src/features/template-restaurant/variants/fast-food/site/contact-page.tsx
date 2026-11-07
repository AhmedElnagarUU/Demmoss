"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { FastFoodPhoto } from "./fast-food-photo";
import { Section, SectionHeading } from "./section";
import { serifFont } from "./styles";
import { VisitDetails } from "./visit-details";

// Contact: where, when, how to call; plus the short story of the shop (trust).
export function ContactPage({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const contact = useFastFoodStore((state) => state.content.contact);
  const about = useFastFoodStore((state) => state.content.about);

  return (
    <>
      <Section id="contact-title">
        <SectionHeading
          level={1}
          id="contact-title"
          eyebrow={t("contact.eyebrow")}
          title={contact.title[locale]}
        />
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">{contact.text[locale]}</p>
        <VisitDetails locale={locale} />
      </Section>
      <Section id="story-title" tone="soft">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border">
            <FastFoodPhoto imageId={about.image} locale={locale} sizes="(min-width: 768px) 520px, 90vw" />
          </div>
          <div className="space-y-4">
            <h2 id="story-title" className={`${serifFont} text-[clamp(30px,4vw,44px)] leading-[1.2]`}>
              {about.title[locale]}
            </h2>
            {about.text[locale].split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted">
                {paragraph}
              </p>
            ))}
            <p className="text-sm text-muted">{t("contact.photoCredit")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
