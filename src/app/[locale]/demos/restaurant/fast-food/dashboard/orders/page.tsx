import { notFound } from "next/navigation";
import { FastFoodOrders } from "@/features/template-restaurant/variants/fast-food/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FastFoodOrdersRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/dashboard/orders">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FastFoodOrders locale={locale} />;
}
