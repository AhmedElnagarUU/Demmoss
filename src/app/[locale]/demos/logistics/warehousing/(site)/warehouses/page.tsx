import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-logistics/variants/warehousing/metadata";
import { WarehousesPage } from "@/features/template-logistics/variants/warehousing/site/inner-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/warehouses">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "warehouses") : {};
}

export default async function WarehousingWarehousesPageRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/warehouses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarehousesPage locale={locale} />;
}
