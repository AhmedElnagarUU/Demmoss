import { notFound } from "next/navigation";
import { LeadsPage, leadStatusFromParam } from "@/features/admin/components/leads-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminLeadsRoute({ params, searchParams }: PageProps<"/[locale]/admin/leads">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { status } = await searchParams;
  return <LeadsPage locale={locale} status={leadStatusFromParam(status)} />;
}
