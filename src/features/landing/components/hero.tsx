import { LightRays } from "@/features/site-shell/components/light-rays";
import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { HeroPreviews } from "./hero-previews";
import { HillArcs } from "./hill-arcs";

export function Hero({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const title = t("hero.title");
  const accent = t("hero.accent");
  const lead = accent && title.endsWith(accent) ? title.slice(0, -accent.length).trimEnd() : title;

  return (
    <section className="relative overflow-hidden pb-16 sm:pb-24">
      <div aria-hidden="true" className="site-grid-lines pointer-events-none absolute inset-0" />
      <LightRays className="absolute inset-x-0 bottom-0 h-[78%]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-12rem] mx-auto h-[30rem] w-[min(52rem,100%)] rounded-full bg-primary/10 blur-[110px]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="site-badge">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          {t("hero.badge")}
        </p>

        <h1 className="site-display mt-6 text-balance text-[2.5rem] text-text sm:text-6xl lg:text-[4.15rem]">
          <span>{lead}</span>{" "}
          {accent ? (
            <span className="site-accent-box">
              {accent}
              <span aria-hidden="true" className="site-cursor" />
            </span>
          ) : null}
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {t("hero.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton
            href={`/${locale}/start`}
            className="site-pill gap-2 bg-primary text-on-primary hover:bg-primary-hover"
          >
            {t("hero.start")}
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5 rtl:rotate-180">
              <path
                d="M2 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LinkButton>
          <LinkButton
            href={`/${locale}/demos`}
            variant="secondary"
            className="site-pill site-btn-secondary gap-2"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M7 5.5v9l7-4.5-7-4.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {t("hero.demos")}
          </LinkButton>
        </div>
      </div>

      <HeroPreviews locale={locale} />
      <HillArcs />
    </section>
  );
}
