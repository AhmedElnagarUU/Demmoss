import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dashboardMetadata } from "@/features/template-restaurant/variants/fast-food/metadata";
import { FastFoodDashboard } from "@/features/template-restaurant/variants/fast-food/dashboard-pages";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fast-food/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function FastFoodDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fast-food/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FastFoodDashboard locale={locale}>{children}</FastFoodDashboard>;
}
