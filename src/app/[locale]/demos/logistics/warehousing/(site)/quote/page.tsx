import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-logistics/variants/warehousing/metadata";
import { QuotePage } from "@/features/template-logistics/variants/warehousing/site/inner-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/quote">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "quote") : {};
}

export default async function WarehousingQuotePageRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/quote">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <QuotePage locale={locale} />;
}
