"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { Plate } from "./fine-dining-photo";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { displayFont, scriptFont } from "./styles";

// About: the story and the three things every plate begins with build trust, then guests speak for the kitchen.
export function AboutPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const about = useFineDiningStore((state) => state.content.about);
  const experience = useFineDiningStore((state) => state.content.experience);
  const reviews = useFineDiningStore((state) => state.reviews).filter((review) => review.visible);
  const paragraphs = about.text[locale].split("\n\n");

  return (
    <>
      <Section id="about-title">
        <div className="grid items-center gap-[60px] min-[1025px]:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <h1 id="about-title" className={`${scriptFont} mb-[18px] text-[clamp(44px,6vw,68px)]`}>
              {about.title[locale]}
            </h1>
            <div className="space-y-4 opacity-85">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="justify-self-center">
            <Plate
              imageId={about.image}
              locale={locale}
              sizes="(min-width: 1025px) 460px, 86vw"
              className="w-[min(100%,460px)]"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="experience-title" tone="soft">
        <SectionHeading
          id="experience-title"
          title={experience.title[locale]}
          intro={experience.intro[locale]}
        />
        <ul className="mx-auto grid max-w-[1000px] gap-10 min-[641px]:grid-cols-3">
          {experience.points.map((point, index) => (
            <li key={index} className="border-t border-text/35 pt-4">
              <h3 className={`${displayFont} mb-1 text-[26px]`}>{point.title[locale]}</h3>
              <p className="text-sm opacity-75">{point.text[locale]}</p>
            </li>
          ))}
        </ul>
      </Section>

      {reviews.length > 0 ? (
        <Section id="reviews-title">
          <SectionHeading id="reviews-title" title={t("about.reviewsTitle")} />
          <ul className="grid gap-6 min-[641px]:grid-cols-2 min-[1025px]:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id}>
                <figure className="flex h-full flex-col gap-3 border border-text/35 bg-(--fd-deep)/45 p-[34px] max-[640px]:p-[22px]">
                  <p
                    role="img"
                    aria-label={t("about.rating", { rating: String(review.rating) })}
                    className="text-(--fd-accent)"
                  >
                    {"★".repeat(review.rating)}
                  </p>
                  <blockquote className={`${displayFont} grow text-xl`}>{review.text[locale]}</blockquote>
                  <figcaption className="text-sm opacity-75">{review.author[locale]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-sm opacity-75">{t("about.photoCredit")}</p>
        </Section>
      ) : (
        <p className="pb-12 text-center text-sm opacity-75">{t("about.photoCredit")}</p>
      )}
    </>
  );
}
