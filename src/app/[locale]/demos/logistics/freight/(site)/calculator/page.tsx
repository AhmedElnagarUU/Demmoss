import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-logistics/variants/freight/metadata";
import { CalculatorPage } from "@/features/template-logistics/variants/freight/site/inner-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/calculator">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "calculator") : {};
}

export default async function FreightCalculatorPageRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/calculator">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CalculatorPage locale={locale} />;
}
