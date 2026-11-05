import { FREIGHT_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const freightMeta = {
  slug: FREIGHT_SLUG,
  category: "logistics",
  variant: "freight",
  name: { ar: "جسر كارجو · شركة شحن دولي", en: "Jisr Cargo · Freight forwarder" },
  pitch: {
    ar: "حاسبة أسعار وتتبّع شحنات: العميل يعرف السعر ومكان بضاعته دون اتصال، وطلبات الأسعار تصل إلى لوحة التحكم.",
    en: "A price calculator and live shipment tracking: clients see the price and where their cargo is without calling, and quote requests land in your dashboard.",
  },
  screenshot: "/demos/logistics-freight.svg",
} as const;
