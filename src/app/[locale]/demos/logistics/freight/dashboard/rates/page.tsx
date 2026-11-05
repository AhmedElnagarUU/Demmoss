import { notFound } from "next/navigation";
import { FreightRates } from "@/features/template-logistics/variants/freight/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FreightRatesRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/dashboard/rates">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FreightRates locale={locale} />;
}
