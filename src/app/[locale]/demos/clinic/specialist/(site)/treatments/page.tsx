import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/specialist/metadata";
import { TreatmentsPage } from "@/features/template-clinic/variants/specialist/site/treatments-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/treatments">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "treatments") : {};
}

export default async function SpecialistTreatmentsRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/specialist/treatments">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <TreatmentsPage />;
}
