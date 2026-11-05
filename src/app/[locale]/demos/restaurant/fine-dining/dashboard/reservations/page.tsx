import { notFound } from "next/navigation";
import { FineDiningReservations } from "@/features/template-restaurant/variants/fine-dining/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FineDiningReservationsRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/dashboard/reservations">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FineDiningReservations locale={locale} />;
}
