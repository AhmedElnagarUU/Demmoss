import type { Photo } from "../../site/photo";

// Every photo of the agency site, in one list (CDN addresses from the design). Use photoUrl / photoSrcSet to show them.
// Moving to self-hosted files later means changing `src` here only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

const landscape = { width: 1200, height: 800 } as const;
const portrait = { width: 600, height: 800 } as const;

export const agencyPhotos: readonly Photo[] = [
  {
    id: "hero-pool",
    src: unsplash("1600585154340-be6161a56a0c"),
    ...landscape,
    alt: { ar: "بيت عصري بمسبح", en: "Modern house with pool" },
  },
  {
    id: "villa-garden",
    src: unsplash("1600596542815-ffad4c1539a9"),
    ...landscape,
    alt: { ar: "واجهة فيلا بيضاء بحديقة", en: "White villa facade with a garden" },
  },
  {
    id: "apartment-living",
    src: unsplash("1586023492125-27b2c045efd7"),
    ...landscape,
    alt: { ar: "صالة شقة بإضاءة طبيعية", en: "Apartment living room in daylight" },
  },
  {
    id: "villa-modern",
    src: unsplash("1613490493576-7fde63acd811"),
    ...landscape,
    alt: { ar: "فيلا حديثة بواجهة زجاجية", en: "Modern villa with a glass front" },
  },
  {
    id: "apartment-kitchen",
    src: unsplash("1555041469-a586c61ea9bc"),
    ...landscape,
    alt: { ar: "غرفة معيشة ومطبخ مفتوح", en: "Living room with an open kitchen" },
  },
  {
    id: "townhouse-front",
    src: unsplash("1564013799919-ab600027ffc6"),
    ...landscape,
    alt: { ar: "واجهة دوبلكس سكني", en: "Duplex townhouse front" },
  },
  {
    id: "villa-terrace",
    src: unsplash("1512917774080-9991f1c4c750"),
    ...landscape,
    alt: { ar: "فيلا بمدخل واسع وتراس", en: "Villa with a wide entrance and terrace" },
  },
  {
    id: "apartment-bedroom",
    src: unsplash("1493663284031-b7e3aefcae8e"),
    ...landscape,
    alt: { ar: "غرفة نوم هادئة بتصميم بسيط", en: "Calm bedroom with a simple design" },
  },
  {
    id: "townhouse-garden",
    src: unsplash("1580587771525-78b9dba3b914"),
    ...landscape,
    alt: { ar: "منزل بحديقة أمامية", en: "Home with a front garden" },
  },
  {
    id: "city-night",
    src: unsplash("1486406146926-c627a92ad1ab"),
    ...landscape,
    alt: { ar: "المدينة ليلًا", en: "City at night" },
  },
  {
    id: "agent-james",
    src: unsplash("1507003211169-0a1dd7228f2d"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة جيمس كالاواي", en: "Portrait of James Calloway" },
  },
  {
    id: "agent-eleanor",
    src: unsplash("1494790108377-be9c29b29330"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة إليانور هارتويل", en: "Portrait of Eleanor Hartwell" },
  },
  {
    id: "agent-sofia",
    src: unsplash("1573496359142-b8d87734a5a2"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة صوفيا ماركيتي", en: "Portrait of Sofia Marchetti" },
  },
  {
    id: "agent-marcus",
    src: unsplash("1500648767791-00dcc994a43e"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة ماركوس بيل", en: "Portrait of Marcus Bell" },
  },
];
