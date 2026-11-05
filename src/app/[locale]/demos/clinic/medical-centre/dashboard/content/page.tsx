import { ContentPage } from "@/features/template-clinic/dashboard/content-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MedicalCentreDashboardContentPageRoute() {
  return <ContentPage />;
}
