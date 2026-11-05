import { notFound } from "next/navigation";
import { WarehousingStorageRates } from "@/features/template-logistics/variants/warehousing/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WarehousingStorageRatesRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/dashboard/storage-rates">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarehousingStorageRates locale={locale} />;
}
