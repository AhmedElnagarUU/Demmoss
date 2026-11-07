"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { seedTeam } from "../seed/content";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { Lines } from "./brand";
import { Reveal } from "./reveal";
import { TeamGrid } from "./team-grid";
import { container, h2Big, labelClass, rtlSafe, sectionPad } from "./styles";

// The light band of the source: the studio story, the founder's signature, a photo of a finished residence, and the team.
// The two paragraphs are the editable About text and a fixed second paragraph. Goal: trust (small, careful, in-house).
export function About({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const content = useDeveloperStore((state) => state.content);
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const founder = seedTeam[0];
  // like the source, the title breaks after its comma
  const title = content.about.title[locale].replace(/([,،]) /, "$1\n");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`${sectionPad} relative overflow-x-clip bg-(--re-paper) text-(--re-ink)`}
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} text-(--re-ink-muted)`}>{t("about.eyebrow")}</p>
        </Reveal>
        <Reveal>
          <Heading id="about-title" className={h2Big}>
            <Lines text={title} />
          </Heading>
        </Reveal>
        <div className="mt-[70px] grid grid-cols-2 items-center gap-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-14">
          <Reveal>
            <p className="mb-5 text-sm leading-[2] text-(--re-ink-body) rtl:leading-[2.1]">
              {content.about.text[locale]}
            </p>
            <p className="mb-5 text-sm leading-[2] text-(--re-ink-body) rtl:leading-[2.1]">
              {t("about.second")}
            </p>
            <p className="mt-7 text-[44px] leading-none [font-family:'Brush_Script_MT','Segoe_Script','Snell_Roundhand',cursive] rtl:font-medium rtl:[font-family:inherit] rtl:text-[34px]">
              {founder.name[locale]}
            </p>
            <p className={`mt-2 text-[10px] uppercase tracking-[0.26em] text-(--re-ink-muted) ${rtlSafe}`}>
              {t("about.founderRole")}
            </p>
          </Reveal>
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden">
              <SitePhoto
                photo={findPhoto(config.photos, "studio-exterior")}
                locale={locale}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
        <TeamGrid />
      </div>
    </section>
  );
}
