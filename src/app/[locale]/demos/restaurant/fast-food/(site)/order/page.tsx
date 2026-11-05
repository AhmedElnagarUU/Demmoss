import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fast-food/metadata";
import { OrderPage } from "@/features/template-restaurant/variants/fast-food/site/order-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/order">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "order") : {};
}

export default async function FastFoodOrderPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/order">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <OrderPage locale={locale} />;
}
