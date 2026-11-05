import { notFound } from "next/navigation";
import { FreightShipments } from "@/features/template-logistics/variants/freight/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FreightShipmentsRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/freight/dashboard/shipments">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FreightShipments locale={locale} />;
}
