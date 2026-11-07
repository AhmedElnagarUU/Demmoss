"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { getAgencyT } from "../messages";
import { Principles } from "./principles";
import { Reveal } from "./reveal";
import { container, h2Class, labelClass, rtlSafe, sectionPad } from "./styles";

// A heading whose message has "|" where the source has a line break: "Three principles,|one calm process".
// A space comes before the break so the text still reads right without it.
function BrokenTitle({ text }: { text: string }) {
  const lines = text.split("|");
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? (
            <>
              {" "}
              <br />
            </>
          ) : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

// "Why Hartwell": the dark band with three principles. Goal: trust.
export function WhySection() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className={`${sectionPad} scroll-mt-20 overflow-x-clip bg-(--re-dark) text-white`}
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} mb-[22px] text-(--re-gold)`}>{t("principles.eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 id="why-title" className={`${h2Class} text-white`}>
            <BrokenTitle text={t("principles.title")} />
          </h2>
        </Reveal>
        <Reveal>
          <Principles />
        </Reveal>
      </div>
    </section>
  );
}

const hoodMessage = {
  riverside: "hoods.riverside",
  "old-town": "hoods.oldTown",
  hillcrest: "hoods.hillcrest",
  harbour: "hoods.harbour",
} as const;

// "Where we work": a night photo with four columns, one per neighbourhood; each opens the listings of that area.
// Goal: leads (visitors find their own neighbourhood). Under 640px the photo sits behind a 2x2 grid, like the source.
export function Neighbourhoods() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const root = `/${locale}${config.basePath}`;
  const areas = config.areas.flatMap((area) => {
    const message = hoodMessage[area.id as keyof typeof hoodMessage];
    return message ? [{ area, message }] : [];
  });

  return (
    <section
      id="hoods"
      aria-labelledby="hoods-title"
      className="relative h-[620px] scroll-mt-20 overflow-x-clip bg-(--re-dark) text-white before:absolute before:inset-0 before:z-1 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.75))] max-[1024px]:h-[560px] max-[640px]:h-auto max-[640px]:before:hidden"
    >
      <div className="absolute inset-0">
        <SitePhoto photo={findPhoto(config.photos, "city-night")} locale={locale} sizes="100vw" />
      </div>
      <div className="absolute inset-x-0 top-[60px] z-3 max-[640px]:relative max-[640px]:top-0 max-[640px]:pb-5 max-[640px]:pt-14">
        <div className={container}>
          <p className={`${labelClass} mb-[22px] text-(--re-beige)`}>{t("hoods.eyebrow")}</p>
          <h2 id="hoods-title" className={`${h2Class} text-white`}>
            {t("hoods.title")}
          </h2>
        </div>
      </div>
      <ul className="absolute inset-0 z-2 grid grid-cols-4 max-[640px]:relative max-[640px]:grid-cols-2 max-[640px]:grid-rows-[200px_200px]">
        {areas.map(({ area, message }) => (
          <li
            key={area.id}
            className="flex border-s border-white/30 first:border-s-0 max-[640px]:nth-[3]:border-s-0 max-[640px]:nth-[n+3]:border-t"
          >
            <Link
              href={`${root}/listings?area=${area.id}`}
              className="flex w-full flex-col justify-end px-7 pb-[50px] transition-colors duration-[400ms] hover:bg-(--re-beige)/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white max-[640px]:px-3.5 max-[640px]:pb-5"
            >
              <span
                className={`text-sm font-normal uppercase leading-[1.2] tracking-[0.22em] text-(--re-beige) max-[640px]:text-[11px] rtl:leading-[1.5] ${rtlSafe}`}
              >
                {area.name[locale]}
              </span>
              <span className={`mt-1.5 text-xs tracking-[0.08em] text-white/85 ${rtlSafe}`}>
                {t(message)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
