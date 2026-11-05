import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { DepartmentsPage } from "@/features/template-clinic/variants/medical-centre/site/departments-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/departments">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "departments") : {};
}

export default async function MedicalCentreDepartmentsRoute({ params }: PageProps<"/[locale]/demos/clinic/medical-centre/departments">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DepartmentsPage />;
}
