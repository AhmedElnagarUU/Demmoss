import { WAREHOUSING_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
export const warehousingMeta = {
  slug: WAREHOUSING_SLUG,
  category: "logistics",
  variant: "warehousing",
  name: { ar: "ستاكويل · تخزين وخدمات لوجستية", en: "Stackwell · Warehousing & 3PL" },
  pitch: {
    ar: "مقدّر تكلفة التخزين يصل إلى لوحة التحكم مع الطلب: عدد الطبليات والمدة والتجهيز، فتكون مكالمة المبيعات الأولى قصيرة.",
    en: "A storage cost estimator whose numbers travel with the quote request: pallets, months and picking, so the first sales call is short.",
  },
  screenshot: "/demos/logistics-warehousing.jpg",
} as const;
