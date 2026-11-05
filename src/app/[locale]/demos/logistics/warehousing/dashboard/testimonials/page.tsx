import { TestimonialsPage } from "@/features/template-logistics/dashboard/testimonials-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WarehousingDashboardTestimonialsPageRoute() {
  return <TestimonialsPage />;
}
