import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { HomePage } from "@/features/template-real-estate/variants/agency/site/home-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "home") : {};
}

export default async function AgencyHomeRoute({ params }: PageProps<"/[locale]/demos/real-estate/agency">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage />;
}
