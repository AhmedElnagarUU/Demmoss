import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/developer/metadata";
import { HomePage } from "@/features/template-real-estate/variants/developer/site/home-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "home") : {};
}

export default async function DeveloperHomeRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage />;
}
