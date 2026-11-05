"use client";

import type { Locale } from "@/shared/i18n/config";
import { RestaurantImage } from "../../../restaurant-image";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { Section, SectionHeading } from "./section";

const promises = ["first", "second", "third"] as const;

// About: the chef's story and the kitchen's promises build trust and justify the premium.
export function AboutPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const about = useFineDiningStore((state) => state.content.about);
  const paragraphs = about.text[locale].split("\n\n");

  return (
    <>
      <Section id="about-title">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              level={1}
              id="about-title"
              eyebrow={t("about.eyebrow")}
              title={about.title[locale]}
            />
            <div className="space-y-4 text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-control border border-border">
            <RestaurantImage imageId={about.image} locale={locale} />
          </div>
        </div>
      </Section>

      <Section id="promises-title" tone="soft">
        <h2 id="promises-title" className="mb-8 text-3xl font-bold">
          {t("about.promisesTitle")}
        </h2>
        <ul className="grid gap-8 md:grid-cols-3">
          {promises.map((promise) => (
            <li key={promise} className="space-y-2 border-t-2 border-(--fd-accent) pt-4">
              <h3 className="text-xl font-bold">{t(`about.promises.${promise}.title`)}</h3>
              <p className="text-muted">{t(`about.promises.${promise}.text`)}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
