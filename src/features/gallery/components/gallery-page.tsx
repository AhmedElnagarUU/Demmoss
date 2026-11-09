import { Suspense } from "react";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { LinkButton } from "@/shared/ui/link-button";
import { getAllDemos } from "../catalog";
import { categories } from "../categories";
import { groupDemosByCategory } from "../grouping";
import { galleryT } from "../translate";
import { DemoCard } from "./demo-card";
import { GalleryFilter, GalleryFilterView } from "./gallery-filter";

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = galleryT(locale);
  const common = getT(locale);
  const groups = groupDemosByCategory(getAllDemos(), categories);

  const empty = (
    <section key="empty" aria-labelledby="empty-title" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="site-panel p-6 sm:p-10">
        <h2 id="empty-title" className="text-2xl font-semibold text-text">
          {t("empty.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{t("empty.text")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton
            href={`/${locale}/start`}
            className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
          >
            {t("empty.start")}
          </LinkButton>
          <TrackedWhatsAppButton
            locale={locale}
            label={common("common.whatsapp")}
            message={common("common.whatsappMessage", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME })}
            className="site-pill site-btn-ghost"
          />
        </div>
      </div>
    </section>
  );

  const sections = groups.map(({ category, demos }) => ({
    slug: category.slug,
    content: (
      <section
        key={category.slug}
        aria-labelledby={`cat-${category.slug}`}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          <h2 id={`cat-${category.slug}`} className="text-2xl font-semibold text-text">
            {category.name[locale]}
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {demos.map((demo) => (
            <DemoCard key={demo.slug} locale={locale} demo={demo} />
          ))}
        </div>
      </section>
    ),
  }));
  const filter = {
    basePath: `/${locale}/demos`,
    label: t("filter.label"),
    allLabel: t("filter.all"),
    chips: groups.map(({ category }) => ({ slug: category.slug, label: category.name[locale] })),
    sections,
    empty,
  };

  return (
    <main id="main" className="flex flex-col gap-12 pb-20">
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="site-grid-lines pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[-14rem] mx-auto h-[26rem] w-[min(48rem,100%)] rounded-full bg-primary/10 blur-[110px]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 pt-16 sm:px-6 sm:pt-24">
          <p className="site-badge">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
            {t("hero.badge")}
          </p>
          <h1 className="site-display mt-6 max-w-3xl text-4xl text-text sm:text-6xl">{t("hero.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t("hero.text")}</p>
        </div>
      </header>
      <Suspense fallback={<GalleryFilterView {...filter} selected={undefined} />}>
        <GalleryFilter {...filter} />
      </Suspense>
    </main>
  );
}
