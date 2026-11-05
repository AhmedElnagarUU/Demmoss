import { notFound } from "next/navigation";
import { FineDiningEventRequests } from "@/features/template-restaurant/variants/fine-dining/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FineDiningEventRequestsRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/dashboard/events">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FineDiningEventRequests locale={locale} />;
}
