import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dashboardMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { FineDiningDashboard } from "@/features/template-restaurant/variants/fine-dining/dashboard-pages";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fine-dining/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function FineDiningDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fine-dining/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FineDiningDashboard locale={locale}>{children}</FineDiningDashboard>;
}
