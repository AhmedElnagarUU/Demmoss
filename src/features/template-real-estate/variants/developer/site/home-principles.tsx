"use client";

import Link from "next/link";
import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { getDeveloperT } from "../messages";
import { Lines } from "./brand";
import { Reveal } from "./reveal";
import { container, h2Big, labelClass, rtlSafe } from "./styles";

const principles = ["site", "materials", "quiet"] as const;

// Three principles on a black band. Goal: trust (what kind of builder this is) before the visitor sees any price.
export function Principles() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative overflow-x-clip bg-(--re-deep) pb-[120px] pt-[140px] max-[640px]:py-[90px]"
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} text-muted`}>{t("principles.eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 id="principles-title" className={h2Big}>
            <Lines text={t("principles.title")} />
          </h2>
        </Reveal>
        <ol className="mt-20 grid grid-cols-3 max-[640px]:mt-[50px] max-[640px]:grid-cols-1">
          {principles.map((key, index) => (
            <li
              key={key}
              className="border-s border-border px-10 first:border-s-0 first:ps-0 max-[640px]:border-s-0 max-[640px]:border-t max-[640px]:px-0 max-[640px]:py-9 max-[640px]:first:border-t-0 max-[640px]:first:pt-0"
            >
              <Reveal>
                <h3
                  className={`min-h-11 text-[13px] font-normal uppercase leading-[1.7] tracking-[0.24em] text-muted max-[640px]:min-h-0 ${rtlSafe}`}
                >
                  {t(`principles.${key}.title`)}
                </h3>
                <p className="mt-7 text-[13px] leading-[1.9] text-muted rtl:leading-[2]">
                  {t(`principles.${key}.text`)}
                </p>
                <span
                  aria-hidden="true"
                  data-number={`0${index + 1}`}
                  className="mt-12 block text-5xl font-extralight tracking-[0.1em] text-text/20 before:content-[attr(data-number)]"
                />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const panels = [
  { key: "forest", href: "/residences?type=villa" },
  { key: "coastal", href: "/residences?type=coastal" },
  { key: "city", href: "/residences?type=penthouse" },
  { key: "bespoke", href: "/contact" },
] as const;

// One wide photo cut into four panels, one per kind of residence; each opens the matching list. Goal: sales (choose how you want to live).
export function Panorama() {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const root = `/${locale}${config.basePath}`;
  return (
    <section
      id="residences"
      aria-label={t("pano.label")}
      className="relative grid h-[min(88vh,760px)] min-h-[480px] grid-cols-4 overflow-x-clip bg-(--re-deep) max-[640px]:h-auto max-[640px]:min-h-0 max-[640px]:grid-cols-2"
    >
      {panels.map((panel, index) => (
        <Link
          key={panel.key}
          href={`${root}${panel.href}`}
          className="group relative block overflow-hidden border-s border-border first:border-s-0 after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-45% after:to-black/85 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-focus max-[640px]:h-[260px] max-[640px]:border-t max-[640px]:odd:border-s-0"
        >
          <div
            aria-hidden="true"
            style={{ insetInlineStart: `${-index * 100}%` }}
            className="absolute inset-y-0 w-[400%] brightness-60 transition-[filter] duration-[600ms] group-hover:brightness-105 motion-reduce:transition-none"
          >
            <SitePhoto
              photo={findPhoto(config.photos, "panorama")}
              locale={locale}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-x-7 bottom-9 z-[2] max-[640px]:inset-x-3.5 max-[640px]:bottom-[18px]">
            <h3 className={`text-sm font-light uppercase tracking-[0.22em] ${rtlSafe}`}>
              {t(`pano.${panel.key}.title`)}
            </h3>
            <p className="mt-2 max-w-60 text-xs text-text/70 max-[640px]:hidden">
              {t(`pano.${panel.key}.text`)}
            </p>
            <span
              aria-hidden="true"
              className="mt-3.5 inline-block text-[22px] text-(--re-accent) opacity-0 transition-[opacity,translate] duration-[400ms] ltr:-translate-x-3 rtl:translate-x-3 rtl:-scale-x-100 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 max-[640px]:translate-x-0 max-[640px]:opacity-100 motion-reduce:transition-none"
            >
              →
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
