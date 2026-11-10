import Link from "next/link";
import { categories } from "@/features/gallery/categories";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { CategoryIcon } from "./icons";

export function Industries({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <section
      aria-labelledby="industries-label"
      className="mx-auto max-w-[1320px] px-5 pt-20 sm:px-8 lg:px-12"
    >
      <p id="industries-label" className="font-mono-label text-center text-faint">
        {t("industries.label")}
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/${locale}/demos#cat-${category.slug}`}
              className="inline-flex items-center gap-2.5 rounded text-[0.9375rem] text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              <CategoryIcon slug={category.slug} className="size-4 text-faint" />
              {category.name[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
