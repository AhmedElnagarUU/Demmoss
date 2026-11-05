import { notFound } from "next/navigation";
import { WarehousingCaseStudies } from "@/features/template-logistics/variants/warehousing/dashboard-pages";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WarehousingCaseStudiesRoute({
  params,
}: PageProps<"/[locale]/demos/logistics/warehousing/dashboard/case-studies">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarehousingCaseStudies locale={locale} />;
}
