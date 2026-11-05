import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { ListingsPage } from "@/features/template-real-estate/variants/agency/site/listings-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/listings">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "listings") : {};
}

export default async function AgencyListingsRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/listings">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ListingsPage />;
}
