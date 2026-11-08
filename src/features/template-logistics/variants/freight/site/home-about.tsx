"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
import { getFreightT } from "../messages";
import { freightPhotos } from "../photos";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { Lines, MutedTail } from "./brand";
import { ArrowIcon, GlobeIcon } from "./icons";
import { Reveal } from "./section";
import { ServicesBlock } from "./sections";
import { btnOutline, container, eyebrow, rtlSafe } from "./styles";

// The white panel of the source that overlaps the hero: the about text and two photos, then the four services.
export function HomeAbout({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const content = useFreightStore((state) => state.content);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <div
      id="about"
      className="relative z-[2] mx-auto mt-[-90px] max-w-[1400px] rounded-[32px] bg-surface pb-[70px] pt-[70px] shadow-[0_-10px_60px_rgba(17,17,17,0.06)] max-[1024px]:mx-3 max-[1024px]:mt-[-80px] max-[1024px]:rounded-[26px] max-[640px]:mx-2 max-[640px]:pb-11 max-[640px]:pt-11"
    >
      <div className={container}>
        <div className="grid grid-cols-[1fr_1.1fr] items-center gap-[50px] max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
          <Reveal>
            <p className={eyebrow}>{t("about.eyebrow")}</p>
            <h2
              className={`my-[22px] text-[clamp(26px,3vw,38px)] font-medium leading-[1.08] tracking-[-0.025em] text-text ${rtlSafe} rtl:leading-[1.3]`}
            >
              <MutedTail text={content.about.title[locale]} />
            </h2>
            <p className="max-w-[430px] text-[15px] leading-[1.55] text-muted">
              {content.about.text[locale]}
            </p>
            <div className="my-[34px] flex items-center gap-3.5 text-[13.5px]">
              <GlobeIcon className="size-[38px] shrink-0 text-text" />
              <span>
                <Lines text={t("about.note")} />
              </span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="grid grid-cols-2 items-start gap-5">
              <div className="group aspect-[3/3.6] overflow-hidden rounded-[22px] shadow-[0_10px_40px_rgba(17,17,17,0.06)]">
                <Photo
                  photo={freightPhotos.warehouse}
                  locale={locale}
                  widths={[400, 700, 900]}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="transition-transform duration-[1000ms] group-hover:scale-[1.06] motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-col gap-[18px]">
                <div className="group aspect-square overflow-hidden rounded-[22px] shadow-[0_10px_40px_rgba(17,17,17,0.06)]">
                  <Photo
                    photo={freightPhotos.port}
                    locale={locale}
                    widths={[320, 600]}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="transition-transform duration-[1000ms] group-hover:scale-[1.06] motion-reduce:transition-none"
                  />
                </div>
                <Link href={`${root}#services`} className={`${btnOutline} w-full justify-between`}>
                  {t("about.link")}
                  <ArrowIcon className="size-[18px] rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <ServicesBlock locale={locale} />
      </div>
    </div>
  );
}
