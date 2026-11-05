import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/developer/metadata";
import { ResidencePage } from "@/features/template-real-estate/variants/developer/site/residence-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/residences/detail">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "residence") : {};
}

export default async function DeveloperResidencePageRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/residences/detail">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ResidencePage />;
}
