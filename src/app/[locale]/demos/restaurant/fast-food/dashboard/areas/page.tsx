import { notFound } from "next/navigation";
import { FastFoodAreas } from "@/features/template-restaurant/variants/fast-food/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FastFoodAreasRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/dashboard/areas">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FastFoodAreas locale={locale} />;
}
