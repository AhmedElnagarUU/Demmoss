import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { ContactPage } from "@/features/template-real-estate/variants/agency/site/contact-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/contact">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "contact") : {};
}

export default async function AgencyContactRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/agency/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage />;
}
