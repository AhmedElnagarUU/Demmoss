import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { ArrowRightIcon } from "./icons";
import { SectionRule, TwoToneHeading } from "./section";

export function GuideTeaser({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const pad = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <section
      aria-labelledby="guide-title"
      className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <SectionRule index={pad.format(4)} label={t("guide.label")} aside={t("guide.aside")} />
      <div className="studio-card mt-10 grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14 lg:p-14">
        <div>
          <TwoToneHeading
            id="guide-title"
            lead={t("guide.titleLead")}
            rest={t("guide.titleRest")}
            className="text-[clamp(1.9rem,3.6vw,3.2rem)]"
          />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{t("guide.text")}</p>
        </div>
        <div className="lg:justify-self-end">
          <Link
            href={`/${locale}/guide`}
            className="studio-pill-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            {t("guide.cta")}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
