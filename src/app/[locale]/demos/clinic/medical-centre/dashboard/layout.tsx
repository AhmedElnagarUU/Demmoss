import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clinicFontClass, siteFontFamily } from "@/features/template-clinic/fonts";
import { MedicalCentreDashboard } from "@/features/template-clinic/variants/medical-centre/dashboard-pages";
import { dashboardMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/clinic/medical-centre/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function MedicalCentreDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/clinic/medical-centre/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={clinicFontClass} style={{ fontFamily: siteFontFamily }}>
      <MedicalCentreDashboard locale={locale}>{children}</MedicalCentreDashboard>
    </div>
  );
}
