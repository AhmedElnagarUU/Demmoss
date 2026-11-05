"use client";

import { Button } from "@/shared/ui/button";
import { getRestaurantT } from "../messages";
import { useRestaurant } from "./restaurant-context";
import { trackEdit } from "./track-edit";
import { PageHeader, StatusBadge } from "./ui";

export function ReviewsPage() {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const reviews = store((state) => state.reviews);
  const setReviewVisible = store((state) => state.setReviewVisible);

  return (
    <div className="space-y-6">
      <PageHeader title={t("reviews.title")} intro={t("reviews.intro")} />
      <ul className="space-y-3">
        {reviews.map((review) => (
          <li key={review.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-text">
                {review.author[locale]} <span className="text-muted">{"★".repeat(review.rating)}</span>
              </p>
              <StatusBadge label={review.visible ? t("reviews.shown") : t("reviews.hidden")} />
            </div>
            <p className="text-text">{review.text[locale]}</p>
            <Button
              variant="secondary"
              aria-label={`${review.visible ? t("common.hide") : t("common.show")}: ${review.author[locale]}`}
              onClick={() => {
                setReviewVisible(review.id, !review.visible);
                trackEdit("reviews", config.slug, locale);
              }}
            >
              {review.visible ? t("common.hide") : t("common.show")}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
