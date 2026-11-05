import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { HomePage } from "@/features/template-restaurant/variants/fine-dining/site/home-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "home") : {};
}

export default async function FineDiningHomePageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
