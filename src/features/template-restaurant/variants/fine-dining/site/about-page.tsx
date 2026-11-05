"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { Plate } from "./fine-dining-photo";
import { Section, SectionHeading } from "./section";
import { displayFont } from "./styles";

const promises = ["first", "second", "third"] as const;

// About: the chef's story and the kitchen's promises build trust and justify the premium.
export function AboutPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const about = useFineDiningStore((state) => state.content.about);
  const paragraphs = about.text[locale].split("\n\n");

  return (
    <>
      <Section id="about-title">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              level={1}
              id="about-title"
              locale={locale}
              eyebrow={t("about.eyebrow")}
              title={about.title[locale]}
            />
            <div className="space-y-4 text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <Plate
            imageId={about.image}
            locale={locale}
            sizes="(min-width: 768px) 460px, 80vw"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </Section>

      <Section id="promises-title" tone="soft">
        <h2
          id="promises-title"
          className={`${displayFont} mb-10 text-center text-3xl font-semibold sm:text-4xl`}
        >
          {t("about.promisesTitle")}
        </h2>
        <ul className="grid gap-8 md:grid-cols-3">
          {promises.map((promise) => (
            <li key={promise} className="space-y-2 border-t border-(--fd-accent) pt-4">
              <h3 className={`${displayFont} text-2xl font-semibold`}>
                {t(`about.promises.${promise}.title`)}
              </h3>
              <p className="text-muted">{t(`about.promises.${promise}.text`)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center text-sm text-muted">{t("about.photoCredit")}</p>
      </Section>
    </>
  );
}
