import type { Locale } from "@/shared/i18n/config";

export const categories = [
  { slug: "restaurant", name: { ar: "المطاعم والمقاهي", en: "Restaurants & cafés" } },
  { slug: "clinic", name: { ar: "العيادات", en: "Clinics" } },
  { slug: "real-estate", name: { ar: "العقارات", en: "Real estate" } },
  { slug: "fitness", name: { ar: "النوادي الرياضية واللياقة", en: "Gyms & fitness" } },
  { slug: "education", name: { ar: "التدريب والتعليم", en: "Training & education" } },
  { slug: "services", name: { ar: "شركات الخدمات", en: "Service companies" } },
  { slug: "marketing-agency", name: { ar: "شركات التسويق", en: "Marketing agencies" } },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

// Tuple form that z.enum() accepts; a test keeps it equal to `categories`.
export const categorySlugs: readonly [CategorySlug, ...CategorySlug[]] = [
  "restaurant",
  "clinic",
  "real-estate",
  "fitness",
  "education",
  "services",
  "marketing-agency",
];

export function isCategorySlug(value: string | undefined | null): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

export function categoryName(slug: CategorySlug, locale: Locale): string {
  const category = categories.find((item) => item.slug === slug);
  return category ? category.name[locale] : slug;
}
