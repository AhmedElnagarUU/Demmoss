import { FaqPage } from "@/features/template-clinic/dashboard/faq-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function SpecialistDashboardFaqPageRoute() {
  return <FaqPage />;
}
