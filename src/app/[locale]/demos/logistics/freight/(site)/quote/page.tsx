import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-logistics/variants/freight/metadata";
import { QuotePage } from "@/features/template-logistics/variants/freight/site/inner-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/quote">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "quote") : {};
}

export default async function FreightQuotePageRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/quote">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <QuotePage locale={locale} />;
}
