import Link from "next/link";
import { getAllDemos } from "@/features/gallery/catalog";
import { categoryName } from "@/features/gallery/categories";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { ArrowRightIcon } from "./icons";

export function DemoHighlights({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const featured = getAllDemos()[0];

  return (
    <section aria-labelledby="demos-title" className="mx-auto max-w-[1320px] px-5 py-6 sm:px-8 lg:px-12">
      <div className="studio-card grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:p-14">
        <div>
          <p className="font-mono-label text-faint">{t("demos.badge")}</p>
          <h2 id="demos-title" className="studio-display mt-5 text-[clamp(1.9rem,3.6vw,3.2rem)] text-text">
            {t("demos.title")}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{t("demos.text")}</p>
          <Link
            href={`/${locale}/demos`}
            className="studio-pill-primary mt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            {t("demos.cta")}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {featured ? (
          <div aria-hidden="true" className="relative mx-auto h-56 w-full max-w-sm">
            <div className="absolute inset-x-4 inset-y-3 flex rotate-[-9deg] flex-col justify-between rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(90,214,192,0.12),rgba(255,255,255,0.02)_60%)] p-5 shadow-xl shadow-black/50 rtl:rotate-[9deg]">
              <span className="studio-badge self-end">{t("demos.featured")}</span>
              <div>
                <p className="text-lg font-medium text-text">{featured.name[locale]}</p>
                <p className="mt-1 text-xs text-muted">{categoryName(featured.category, locale)}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
