import { AGENCY_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const agencyMeta = {
  slug: AGENCY_SLUG,
  category: "real-estate",
  variant: "agency",
  name: { ar: "هارتويل وشركاه · وكالة عقارية", en: "Hartwell & Co. Realty · Real estate agency" },
  pitch: {
    ar: "حوّل الزوار إلى معاينات: عقارات للبيع والإيجار بتصميم هادئ، حاسبة تمويل تؤهّل العميل، وطلبات معاينة وتقييم تصل إلى لوحة التحكم.",
    en: "Turn browsers into viewings: buy and rent listings, a mortgage calculator that qualifies buyers, and valuation requests that land in your dashboard.",
  },
  screenshot: "/demos/real-estate-agency.jpg",
} as const;
