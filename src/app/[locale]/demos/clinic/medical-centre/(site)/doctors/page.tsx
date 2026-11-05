import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { DoctorsPage } from "@/features/template-clinic/variants/medical-centre/site/doctors-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/doctors">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "doctors") : {};
}

export default async function MedicalCentreDoctorsRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/doctors">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DoctorsPage />;
}
