import { notFound } from "next/navigation";
import { WarehousingWarehouses } from "@/features/template-logistics/variants/warehousing/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WarehousingWarehousesRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/dashboard/warehouses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarehousingWarehouses locale={locale} />;
}
