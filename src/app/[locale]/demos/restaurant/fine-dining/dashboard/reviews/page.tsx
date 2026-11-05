import { ReviewsPage } from "@/features/template-restaurant/dashboard/reviews-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function FineDiningDashboardReviewsPageRoute() {
  return <ReviewsPage />;
}
