import { InquiriesPage } from "@/features/template-real-estate/modules/inquiries/inquiries-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AgencyDashboardInquiriesRoute() {
  return <InquiriesPage />;
}
