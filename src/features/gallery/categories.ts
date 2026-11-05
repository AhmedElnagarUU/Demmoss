import type { Locale } from "@/shared/i18n/config";

export const categories = [
  { slug: "restaurant", name: { ar: "المطاعم", en: "Restaurants" } },
  { slug: "cafe", name: { ar: "المقاهي", en: "Cafés" } },
  { slug: "real-estate", name: { ar: "العقارات", en: "Real estate" } },
  { slug: "clinic", name: { ar: "العيادات", en: "Clinics" } },
  { slug: "logistics", name: { ar: "الشحن والخدمات اللوجستية", en: "Logistics & shipping" } },
  { slug: "marketing-agency", name: { ar: "التسويق والتصميم", en: "Marketing & creative agencies" } },
  { slug: "online-store", name: { ar: "المتاجر الإلكترونية", en: "Online stores" } },
  { slug: "fitness", name: { ar: "النوادي الرياضية واللياقة", en: "Gyms & fitness" } },
  { slug: "education", name: { ar: "التدريب والتعليم", en: "Training & education" } },
  { slug: "services", name: { ar: "شركات الخدمات", en: "Service companies" } },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

// Tuple form that z.enum() accepts; a test keeps it equal to `categories`.
export const categorySlugs: readonly [CategorySlug, ...CategorySlug[]] = [
  "restaurant",
  "cafe",
  "real-estate",
  "clinic",
  "logistics",
  "marketing-agency",
  "online-store",
  "fitness",
  "education",
  "services",
];

export function isCategorySlug(value: string | undefined | null): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

export function categoryName(slug: CategorySlug, locale: Locale): string {
  const category = categories.find((item) => item.slug === slug);
  return category ? category.name[locale] : slug;
}
