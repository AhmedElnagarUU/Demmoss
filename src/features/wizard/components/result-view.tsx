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
      <h1 className="text-2xl font-bold sm:text-3xl">
        {type === "business" ? t("result.businessTitle") : t("result.ideaTitle")}
      </h1>

      {type !== "business" && <p className="text-base text-muted">{t("result.ideaText")}</p>}

      {type === "business" && (
        <section className="flex flex-col gap-3" aria-labelledby="demos-title">
          <h2 id="demos-title" className="text-xl font-semibold">
            {showCategoryDemos ? t("result.demosTitle") : t("result.demosFallbackTitle")}
          </h2>
          {!showCategoryDemos && <p className="text-base text-muted">{t("result.demosFallbackText")}</p>}
          {demos.length > 0 && (
            <ul className="flex flex-col gap-3">
              {demos.map((demo) => (
                <li key={demo.slug} className="flex flex-col gap-2 rounded-control border border-border p-4">
                  <span className="font-semibold">{demo.name[locale]}</span>
                  <span className="text-sm text-muted">{demo.pitch[locale]}</span>
                  <Link
                    href={`/${locale}/demos/${demo.category}/${demo.variant}`}
                    className="font-semibold text-primary underline"
                  >
                    {t("result.tryDemo")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!showCategoryDemos && (
            <LinkButton href={`/${locale}/demos`} variant="secondary" className="self-start">
              {t("result.allDemos")}
            </LinkButton>
          )}
        </section>
      )}

      <ResultWhatsApp locale={locale} type={type} fieldName={fieldName} />
    </>
  );
}
