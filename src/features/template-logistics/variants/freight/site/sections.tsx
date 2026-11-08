"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { Photo, type PhotoData } from "@/features/demo-engine/photo/photo";
import { getFreightT } from "../messages";
import { freightPhotos } from "../photos";
import { FREIGHT_ROOT } from "../slug";
import { ArrowIcon } from "./icons";
import { card, eyebrow, rtlSafe, roundButton } from "./styles";

const serviceCards = [
  { key: "air", photo: freightPhotos.airFreight, target: "/calculator" },
  { key: "sea", photo: freightPhotos.seaFreight, target: "/calculator" },
  { key: "road", photo: freightPhotos.roadFreight, target: "/calculator" },
  { key: "customs", photo: freightPhotos.customs, target: "#faq" },
] as const satisfies readonly { key: string; photo: PhotoData; target: string }[];

type Props = { locale: Locale };

// The four cards of the source: a grey photo, the service name, two short promises and a round arrow.
export function ServiceCards({ locale }: Props) {
  const t = getFreightT(locale);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <ul className="grid grid-cols-4 gap-[18px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
      {serviceCards.map(({ key, photo, target }) => (
        <li key={key}>
          <Link
            href={target.startsWith("#") ? `${root}${target}` : `${root}${target}`}
            className={`${card} group flex h-full flex-col p-5`}
          >
            <div className="mb-[22px] h-[150px] overflow-hidden rounded-2xl">
              <Photo
                photo={photo}
                locale={locale}
                widths={[320, 500, 800]}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                className="grayscale-[0.9] transition-[transform,filter] duration-[1000ms] group-hover:scale-[1.07] group-hover:grayscale-[0.2] motion-reduce:transition-none"
              />
            </div>
            <h3 className="mb-3.5 text-[18px] font-semibold tracking-[-0.01em] text-text">
              {t(`services.${key}.title`)}
            </h3>
            <ul className="flex-1 text-[13px] leading-[1.55] text-muted">
              <li className="relative mb-2 ps-4 before:absolute before:start-[2px] before:top-[9px] before:size-1 before:rounded-full before:bg-text/40">
                {t(`services.${key}.b1`)}
              </li>
              <li className="relative ps-4 before:absolute before:start-[2px] before:top-[9px] before:size-1 before:rounded-full before:bg-text/40">
                {t(`services.${key}.b2`)}
              </li>
            </ul>
            <span
              aria-hidden="true"
              className={`${roundButton} mt-3 self-end group-hover:translate-x-[3px] group-hover:bg-primary group-hover:text-on-primary rtl:group-hover:-translate-x-[3px]`}
            >
              <ArrowIcon className="size-[18px] rtl:rotate-180" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// The services head inside the white about panel: eyebrow, title and the "All services" link.
export function ServicesBlock({ locale }: Props) {
  const t = getFreightT(locale);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <div id="services" className="pt-[60px]">
      <div className="mb-[34px] flex items-end justify-between gap-5 border-t border-border pt-[34px] max-[640px]:flex-col max-[640px]:items-start">
        <div>
          <p className={eyebrow}>{t("services.eyebrow")}</p>
          <h2
            className={`mt-3 text-[clamp(26px,3vw,36px)] font-medium leading-[1.08] tracking-[-0.025em] text-text ${rtlSafe} rtl:leading-[1.3]`}
          >
            {t("services.title")}
          </h2>
        </div>
        <Link
          href={`${root}/services`}
          className="flex items-center gap-3.5 whitespace-nowrap text-[13.5px] font-medium text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          {t("services.all")}
          <ArrowIcon className="size-5 transition-transform duration-[250ms] hover:translate-x-1 rtl:rotate-180" />
        </Link>
      </div>
      <ServiceCards locale={locale} />
    </div>
  );
}
