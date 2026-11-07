import { FINE_DINING_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const fineDiningMeta = {
  slug: FINE_DINING_SLUG,
  category: "restaurant",
  variant: "fine-dining",
  name: { ar: "فيردانت تيبل · مطعم متوسطي راقٍ", en: "Verdant Table · Fine dining" },
  pitch: {
    ar: "احجز طاولتك في ثوانٍ: حجوزات ليلًا ونهارًا دون مكالمات فائتة، وطلبات عشاءات خاصة تصل إلى لوحة التحكم.",
    en: "Fill your tables: reservations day and night with no missed calls, and private dinner requests that land in your dashboard.",
  },
  screenshot: "/demos/restaurant-fine-dining.svg",
} as const;
