import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/specialist/metadata";
import { PricesPage } from "@/features/template-clinic/variants/specialist/site/prices-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/prices">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "prices") : {};
}

export default async function SpecialistPricesRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/prices">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PricesPage />;
}
