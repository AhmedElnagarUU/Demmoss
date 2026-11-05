import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { AboutPage } from "@/features/template-real-estate/variants/agency/site/about-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/about">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "about") : {};
}

export default async function AgencyAboutRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPage />;
}
