"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { getWarehousingT } from "../messages";
import { WAREHOUSING_ROOT } from "../slug";
import { Estimator } from "./estimator";
import { HeroSection } from "./hero-section";
import {
  FaqSection,
  LogoStrip,
  QuoteSection,
  StatsSection,
  StorageSection,
  ThreePlSection,
} from "./home-sections";
import { Reveal } from "./reveal";
import { CaseStudyCards, WarehouseCards } from "./sections";
import { blockButton, sectionTitle } from "./styles";

// The home page, section by section in the order of the source design (Stackwell).
export function HomePage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const root = `/${locale}${WAREHOUSING_ROOT}`;

  return (
    <>
      <HeroSection locale={locale} />
      <LogoStrip locale={locale} />

      <Reveal>
        <StorageSection locale={locale} />
      </Reveal>

      <Reveal>
        <ThreePlSection locale={locale} />
      </Reveal>

      <Reveal>
        <StatsSection locale={locale} />
      </Reveal>

      <section id="estimator" className="px-4 py-14 sm:px-6 sm:py-[90px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className={sectionTitle}>{t("estimatorSection.title")}</h2>
            <div className="mt-[34px]">
              <Estimator
                locale={locale}
                renderAction={() => (
                  <Link href={`${root}/quote`} className={blockButton("primary")}>
                    {t("estimatorSection.open")}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-3.5 rtl:rotate-180"
                    >
                      <path
                        d="M2 8h12M9 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="warehouses" className="bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className={sectionTitle}>{t("warehousesSection.title")}</h2>
            <div className="mt-[30px]">
              <WarehouseCards locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="cases" className="px-4 pb-8 pt-20 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className={sectionTitle}>{t("caseStudiesSection.title")}</h2>
            <div className="mt-[30px]">
              <CaseStudyCards locale={locale} limit={3} />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <FaqSection locale={locale} />
      </Reveal>

      <Reveal>
        <QuoteSection locale={locale} />
      </Reveal>
    </>
  );
}
