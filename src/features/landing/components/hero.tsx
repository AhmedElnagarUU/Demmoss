import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { ArrowUpRightIcon } from "./icons";

// Huge thin orbit arcs and fine guide lines behind the headline. Decorative only.
function HeroArcs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="studio-guides absolute inset-0" />
      <svg
        viewBox="0 0 1350 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        className="absolute inset-0 size-full text-white"
      >
        <ellipse cx="675" cy="470" rx="980" ry="350" strokeOpacity="0.1" transform="rotate(-9 675 470)" />
        <ellipse cx="675" cy="330" rx="880" ry="230" strokeOpacity="0.16" transform="rotate(5 675 330)" />
        <ellipse cx="675" cy="640" rx="1100" ry="150" strokeOpacity="0.1" transform="rotate(-2 675 640)" />
        <ellipse cx="500" cy="330" rx="720" ry="560" strokeOpacity="0.07" transform="rotate(-30 500 330)" />
      </svg>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <section className="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
      <HeroArcs />
      <div className="relative mx-auto flex min-h-[34rem] max-w-[1180px] flex-col items-center px-5 pb-44 pt-16 text-center sm:min-h-[40rem] sm:px-8 sm:pb-52 sm:pt-24">
        <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-muted">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-text" />
          <span className="text-text">{t("hero.eyebrow")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("hero.eyebrowTopics")}</span>
        </p>

        <h1 className="studio-hero-title mt-8 max-w-[13em] text-balance text-text sm:mt-10">
          {t("hero.title")}
        </h1>

        <div className="mt-10 sm:mt-12">
          <Link
            href={`/${locale}/start`}
            className="group inline-flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            <span className="studio-cta-glow min-h-[3.25rem] px-7 text-[0.9375rem]">{t("hero.cta")}</span>
            <span
              aria-hidden="true"
              className="flex size-[3.25rem] items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-text transition-colors group-hover:bg-white/10"
            >
              <ArrowUpRightIcon className="size-4" />
            </span>
          </Link>
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-faint">
          <span>{t("hero.note")}</span>
          <Link
            href={`/${locale}/demos`}
            className="inline-flex items-center gap-1.5 rounded text-text underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("hero.demos")}
            <ArrowUpRightIcon className="size-3" />
          </Link>
        </p>
      </div>
    </section>
  );
}
