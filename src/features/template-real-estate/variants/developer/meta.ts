import { DEVELOPER_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const developerMeta = {
  slug: DEVELOPER_SLUG,
  category: "real-estate",
  variant: "developer",
  name: { ar: "رواسي · مطوّر فلل ومساكن", en: "Rawasi · Villa developer" },
  pitch: {
    ar: "بِع وحداتك بثقة: توفّر الوحدات تتحدث لحظيًا من لوحة التحكم، وطلبات معاينة خاصة وكتيبات تصل مباشرة إلى فريق المبيعات.",
    en: "Sell units with confidence: unit availability updates live from your dashboard, and private viewing and brochure requests go straight to your sales team.",
  },
  screenshot: "/demos/real-estate-developer.svg",
} as const;
