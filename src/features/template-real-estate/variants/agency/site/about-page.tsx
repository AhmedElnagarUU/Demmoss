"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { Eyebrow, Section, SectionTitle } from "../../../site/site-ui";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { AgentsGrid } from "./agents-grid";
import { Principles } from "./principles";

const stats = ["sold", "years", "recommend"] as const;

// About & team. Goal: trust, why owners and buyers choose this agency. Photo credit is here, as the design rules ask.
export function AboutPage() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const content = useAgencyStore((state) => state.content);

  return (
    <>
      <Section id="about-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Eyebrow>{t("about.eyebrow")}</Eyebrow>
            <SectionTitle id="about-title" level={1}>
              {content.about.title[locale]}
            </SectionTitle>
            <p className="text-lg leading-relaxed text-muted">{content.about.text[locale]}</p>
            <ul className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((key) => (
                <li key={key}>
                  <p className="text-2xl font-extralight text-text">{t(`stats.${key}.value`)}</p>
                  <p className="text-sm text-muted">{t(`stats.${key}.label`)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-4/3 overflow-hidden rounded-control bg-surface">
            <SitePhoto
              photo={findPhoto(config.photos, "city-night")}
              locale={locale}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </Section>

      <section aria-labelledby="about-why" className="bg-primary text-on-primary">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
          <SectionTitle id="about-why" className="mb-12">
            {t("principles.title")}
          </SectionTitle>
          <Principles />
        </div>
      </section>

      <Section id="team-title">
        <Eyebrow>{t("agents.eyebrow")}</Eyebrow>
        <SectionTitle id="team-title" className="mb-10">
          {t("agents.title")}
        </SectionTitle>
        <AgentsGrid />
        <p className="mt-12 text-sm text-muted">{t("about.credit")}</p>
      </Section>
    </>
  );
}
