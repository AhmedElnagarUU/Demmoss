import { ResultsPage } from "@/features/template-clinic/dashboard/results-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MedicalCentreDashboardResultsPageRoute() {
  return <ResultsPage />;
}
