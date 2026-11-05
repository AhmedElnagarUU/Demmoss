import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { ContactPage } from "@/features/template-clinic/variants/medical-centre/site/contact-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/contact">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "contact") : {};
}

export default async function MedicalCentreContactRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage />;
}
