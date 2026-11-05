import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { HomePage } from "@/features/template-clinic/variants/medical-centre/site/home-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "home") : {};
}

export default async function MedicalCentreHomeRoute({ params }: PageProps<"/[locale]/demos/clinic/medical-centre">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage />;
}
