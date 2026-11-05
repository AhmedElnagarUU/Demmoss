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
import { GalleryFilter } from "./gallery-filter";

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = galleryT(locale);
  const common = getT(locale);
  const groups = groupDemosByCategory(getAllDemos(), categories);

  const empty = (
    <section key="empty" aria-labelledby="empty-title" className="mx-auto w-full max-w-5xl px-4">
      <div className="rounded-control border border-border bg-surface p-6 sm:p-10">
        <h2 id="empty-title" className="text-2xl font-bold">
          {t("empty.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{t("empty.text")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={`/${locale}/start`}>{t("empty.start")}</LinkButton>
          <TrackedWhatsAppButton
            locale={locale}
            label={common("common.whatsapp")}
            message={common("common.whatsappMessage", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME })}
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
        className="mx-auto w-full max-w-5xl px-4"
      >
        <h2 id={`cat-${category.slug}`} className="text-2xl font-bold">
          {category.name[locale]}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {demos.map((demo) => (
            <DemoCard key={demo.slug} locale={locale} demo={demo} />
          ))}
        </div>
      </section>
    ),
  }));

  return (
    <main id="main" className="flex flex-col gap-10 pb-16">
      <header className="mx-auto w-full max-w-5xl px-4 pt-10 sm:pt-14">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("hero.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t("hero.text")}</p>
      </header>
      <Suspense fallback={null}>
        <GalleryFilter
          basePath={`/${locale}/demos`}
          label={t("filter.label")}
          allLabel={t("filter.all")}
          chips={groups.map(({ category }) => ({ slug: category.slug, label: category.name[locale] }))}
          sections={sections}
          empty={empty}
        />
      </Suspense>
    </main>
  );
}
