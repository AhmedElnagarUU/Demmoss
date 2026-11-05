"use client";

import { Button } from "@/shared/ui/button";
import { getLogisticsT } from "../messages";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { useLogistics } from "./logistics-context";
import { PageHeader, StatusBadge } from "@/features/demo-engine/ui";

export function TestimonialsPage() {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const testimonials = store((state) => state.testimonials);
  const setVisible = store((state) => state.setTestimonialVisible);

  return (
    <div className="space-y-6">
      <PageHeader title={t("testimonials.title")} intro={t("testimonials.intro")} />
      <ul className="space-y-3">
        {testimonials.map((item) => (
          <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-text">
                {item.author[locale]} · {item.role[locale]}
              </p>
              <StatusBadge label={item.visible ? t("testimonials.visible") : t("testimonials.hidden")} />
            </div>
            <p className="text-text">{item.text[locale]}</p>
            <Button
              variant="secondary"
              aria-label={`${item.visible ? t("testimonials.hide") : t("testimonials.show")}: ${item.author[locale]}`}
              onClick={() => {
                setVisible(item.id, !item.visible);
                trackEdit("testimonials", config.slug, locale);
              }}
            >
              {item.visible ? t("testimonials.hide") : t("testimonials.show")}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
