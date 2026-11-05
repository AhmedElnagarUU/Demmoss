import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/specialist/metadata";
import { ResultsPage } from "@/features/template-clinic/variants/specialist/site/results-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/results">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "results") : {};
}

export default async function SpecialistResultsRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/results">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ResultsPage />;
}
