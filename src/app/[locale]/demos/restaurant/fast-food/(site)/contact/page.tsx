import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fast-food/metadata";
import { ContactPage } from "@/features/template-restaurant/variants/fast-food/site/contact-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/contact">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "contact") : {};
}

export default async function FastFoodContactPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage locale={locale} />;
}
