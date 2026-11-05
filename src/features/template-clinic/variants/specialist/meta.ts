import { SPECIALIST_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const specialistMeta = {
  slug: SPECIALIST_SLUG,
  category: "clinic",
  variant: "specialist",
  name: { ar: "د. ريان الحارثي · أخصائي زراعة الأسنان", en: "Dr. Rayan Al Harthi · Implant specialist" },
  pitch: {
    ar: "حوّل استفسارات الزراعة إلى استشارات محجوزة حتى منتصف الليل: أسعار شفافة، قبل وبعد، وحجز بأوقات متاحة فعلًا يصل إلى لوحة التحكم.",
    en: "Turn implant enquiries into booked consultations, even at midnight: clear prices, before and after, and booking into truly free times that land in your dashboard.",
  },
  screenshot: "/demos/clinic-specialist.svg",
} as const;
