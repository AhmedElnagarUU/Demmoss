import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { Section } from "./section";

export function GuideTeaser({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="guide-title" badge={t("guide.badge")} title={t("guide.title")} intro={t("guide.text")}>
      <div className="site-panel mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-10 text-center sm:px-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -end-20 -top-24 size-64 rounded-full bg-primary/15 blur-3xl"
        />
        <span className="relative flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
          >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5A2.5 2.5 0 0 0 16.5 16H4z" />
            <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H19v5H6.5A2.5 2.5 0 0 1 4 18.5z" />
            <path d="M8 7h7M8 10h5" />
          </svg>
        </span>
        <LinkButton
          href={`/${locale}/guide`}
          className="site-pill relative gap-2 bg-primary text-on-primary hover:bg-primary-hover"
        >
          {t("guide.cta")}
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
      </div>
    </Section>
  );
}
