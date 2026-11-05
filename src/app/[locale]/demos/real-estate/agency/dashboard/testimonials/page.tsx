import { TestimonialsPage } from "@/features/template-real-estate/dashboard/testimonials-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AgencyDashboardTestimonialsRoute() {
  return <TestimonialsPage />;
}
