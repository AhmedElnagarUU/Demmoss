import Link from "next/link";
import { categoryName, isCategorySlug } from "@/features/gallery/categories";
import { getAllDemos, getDemosByCategory } from "@/features/gallery/catalog";
import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { getWizardT } from "../messages";
import type { LeadType } from "../types";
import { fieldOther } from "../types";
import { ResultWhatsApp } from "./result-whatsapp";

type Props = { locale: Locale; type: LeadType; field: string | undefined };

export function ResultView({ locale, type, field }: Props) {
  const t = getWizardT(locale);
  const category = isCategorySlug(field) ? field : undefined;
  const fieldName = category
    ? categoryName(category, locale)
    : type === "business" && field === fieldOther
      ? t("details.fieldOther")
      : undefined;

  const categoryDemos = type === "business" && category ? getDemosByCategory(category) : [];
  const showCategoryDemos = categoryDemos.length > 0;
  const demos = showCategoryDemos ? categoryDemos : getAllDemos();

  return (
    <>
      <h1 className="site-display text-3xl text-text sm:text-4xl">
        {type === "business" ? t("result.businessTitle") : t("result.ideaTitle")}
      </h1>

      {type !== "business" && <p className="text-base leading-relaxed text-muted">{t("result.ideaText")}</p>}

      {type === "business" && (
        <section className="flex flex-col gap-3" aria-labelledby="demos-title">
          <h2 id="demos-title" className="text-xl font-semibold text-text">
            {showCategoryDemos ? t("result.demosTitle") : t("result.demosFallbackTitle")}
          </h2>
          {!showCategoryDemos && <p className="text-base text-muted">{t("result.demosFallbackText")}</p>}
          {demos.length > 0 && (
            <ul className="flex flex-col gap-3">
              {demos.map((demo) => (
                <li key={demo.slug} className="site-tile flex flex-col gap-2 p-4">
                  <span className="font-semibold text-text">{demo.name[locale]}</span>
                  <span className="text-sm text-muted">{demo.pitch[locale]}</span>
                  <Link
                    href={`/${locale}/demos/${demo.category}/${demo.variant}`}
                    className="w-fit rounded-full font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    {t("result.tryDemo")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!showCategoryDemos && (
            <LinkButton href={`/${locale}/demos`} variant="secondary" className="site-pill self-start">
              {t("result.allDemos")}
            </LinkButton>
          )}
        </section>
      )}

      <ResultWhatsApp locale={locale} type={type} fieldName={fieldName} />
    </>
  );
}
