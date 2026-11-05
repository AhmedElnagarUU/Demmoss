import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/developer/metadata";
import { ResidencesPage } from "@/features/template-real-estate/variants/developer/site/residences-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/residences">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "residences") : {};
}

export default async function DeveloperResidencesRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/residences">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ResidencesPage />;
}
