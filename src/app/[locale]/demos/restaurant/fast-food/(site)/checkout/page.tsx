import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fast-food/metadata";
import { CheckoutPage } from "@/features/template-restaurant/variants/fast-food/site/checkout-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/checkout">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "checkout") : {};
}

export default async function FastFoodCheckoutPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fast-food/checkout">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CheckoutPage locale={locale} />;
}
