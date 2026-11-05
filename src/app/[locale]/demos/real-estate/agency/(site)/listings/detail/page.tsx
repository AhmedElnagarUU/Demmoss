import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { PropertyPage } from "@/features/template-real-estate/variants/agency/site/property-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/listings/detail">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "property") : {};
}

export default async function AgencyPropertyPageRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/listings/detail">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PropertyPage />;
}
