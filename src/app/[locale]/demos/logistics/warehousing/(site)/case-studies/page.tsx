import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-logistics/variants/warehousing/metadata";
import { CaseStudiesPage } from "@/features/template-logistics/variants/warehousing/site/inner-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/case-studies">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "caseStudies") : {};
}

export default async function WarehousingCaseStudiesPageRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/case-studies">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CaseStudiesPage locale={locale} />;
}
