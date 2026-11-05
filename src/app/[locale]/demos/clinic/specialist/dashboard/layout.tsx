import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clinicFontClass, siteFontFamily } from "@/features/template-clinic/fonts";
import { SpecialistDashboard } from "@/features/template-clinic/variants/specialist/dashboard-pages";
import { dashboardMetadata } from "@/features/template-clinic/variants/specialist/metadata";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/clinic/specialist/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function SpecialistDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/clinic/specialist/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={clinicFontClass} style={{ fontFamily: siteFontFamily }}>
      <SpecialistDashboard locale={locale}>{children}</SpecialistDashboard>
    </div>
  );
}
