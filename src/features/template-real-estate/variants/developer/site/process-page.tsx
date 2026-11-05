"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { Eyebrow, Section, SectionTitle } from "../../../site/site-ui";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { TeamGrid } from "./team-grid";

const steps = ["consult", "design", "build", "handover"] as const;

// Process & studio. Goal: trust and less fear (what the journey looks like). Photo credit is here, as the design rules ask.
export function ProcessPage() {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const content = useDeveloperStore((state) => state.content);

  return (
    <>
      <Section id="process-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Eyebrow>{t("process.eyebrow")}</Eyebrow>
            <SectionTitle id="process-title" level={1}>
              {content.about.title[locale]}
            </SectionTitle>
            <p className="text-lg leading-relaxed text-muted">{content.about.text[locale]}</p>
          </div>
          <div className="aspect-4/3 overflow-hidden rounded-control bg-surface">
            <SitePhoto
              photo={findPhoto(config.photos, "studio-exterior")}
              locale={locale}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </Section>

      <Section id="journey-title" tone="soft">
        <SectionTitle id="journey-title" className="mb-12">
          {t("steps.title")}
        </SectionTitle>
        <ol className="space-y-8">
          {steps.map((key, index) => (
            <li key={key} className="grid gap-2 border-t border-border pt-6 md:grid-cols-[8rem_1fr]">
              <p aria-hidden="true" className="text-3xl font-extralight text-(--re-accent)">
                0{index + 1}
              </p>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{t(`steps.${key}.title`)}</h3>
                <p className="max-w-2xl leading-relaxed text-muted">{t(`process.detail.${key}`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="studio-team-title">
        <Eyebrow>{t("team.eyebrow")}</Eyebrow>
        <SectionTitle id="studio-team-title" className="mb-10">
          {t("team.title")}
        </SectionTitle>
        <TeamGrid />
        <p className="mt-12 text-sm text-muted">{t("process.credit")}</p>
      </Section>
    </>
  );
}
