import type { PhotoData } from "@/features/demo-engine/photo/photo";

// Every photo of the Jisr Cargo site, from the Unsplash photos of the source designs (Orbis Cargo and Meridian Route).
// They are served by the photo CDN through photoUrl(); moving to self-hosted files later is a change in this list only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const freightPhotos = {
  airplane: {
    src: unsplash("1436491865332-7a61a109cc05"),
    width: 1200,
    height: 800,
    alt: { ar: "طائرة شحن في الجو", en: "A cargo airplane in the sky" },
  },
  ship: {
    src: unsplash("1494412574643-ff11b0a5c1c3"),
    width: 1200,
    height: 800,
    alt: { ar: "سفينة حاويات في عرض البحر", en: "A container ship at sea" },
  },
  port: {
    src: unsplash("1578575437130-527eed3abbec"),
    width: 1200,
    height: 800,
    alt: { ar: "رافعات الميناء والحاويات", en: "Port cranes and containers" },
  },
  warehouse: {
    src: unsplash("1586528116311-ad8dd3c8310d"),
    width: 1200,
    height: 800,
    alt: { ar: "داخل مستودع الشحن", en: "Inside the freight warehouse" },
  },
  aisles: {
    src: unsplash("1587293852726-70cdb56c2866"),
    width: 1200,
    height: 800,
    alt: { ar: "ممرات المستودع والرفوف", en: "Warehouse aisles and racks" },
  },
  airFreight: {
    src: unsplash("1529078155058-5d716f45d604"),
    width: 1200,
    height: 800,
    alt: { ar: "شحن جوي", en: "Air freight" },
  },
  seaFreight: {
    src: unsplash("1494412651409-8963ce7935a7"),
    width: 1200,
    height: 800,
    alt: { ar: "شحن بحري", en: "Sea freight" },
  },
  roadFreight: {
    src: unsplash("1601584115197-04ecc0da31d7"),
    width: 1200,
    height: 800,
    alt: { ar: "شاحنة على الطريق", en: "A truck on the road" },
  },
  railFreight: {
    src: unsplash("1474487548417-781cb71495f3"),
    width: 1200,
    height: 800,
    alt: { ar: "قطار شحن", en: "A freight train" },
  },
  customs: {
    src: unsplash("1565891741441-64926e441838"),
    width: 1200,
    height: 800,
    alt: { ar: "صناديق جاهزة للتخليص الجمركي", en: "Boxes ready for customs clearance" },
  },
} as const satisfies Record<string, PhotoData>;
