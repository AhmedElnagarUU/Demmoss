import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { DoctorPage } from "@/features/template-clinic/variants/medical-centre/site/doctor-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/doctors/detail">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "doctor") : {};
}

export default async function MedicalCentreDoctorRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/doctors/detail">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DoctorPage />;
}
