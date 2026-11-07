import type { Photo } from "../../site/photo";

// Every photo of the Solenne Estates site, in one list (the CDN addresses of the source design). Use photoUrl / photoSrcSet to show them.
// Moving to self-hosted files later means changing `src` here only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

const landscape = { width: 1200, height: 800 } as const;
const portrait = { width: 600, height: 750 } as const;

export const developerPhotos: readonly Photo[] = [
  {
    id: "hero-landscape",
    src: unsplash("1449844908441-8829872d2607"),
    width: 1800,
    height: 1000,
    alt: { ar: "منزل معماري وسط الطبيعة", en: "An architectural home in the landscape" },
  },
  {
    id: "studio-exterior",
    src: unsplash("1600607687939-ce8a6c25118c"),
    ...landscape,
    alt: { ar: "واجهة مسكن حديث من مساكن سولين", en: "Modern Solenne residence exterior" },
  },
  {
    id: "panorama",
    src: unsplash("1486406146926-c627a92ad1ab"),
    width: 1800,
    height: 900,
    alt: { ar: "أفق المدينة وقت الغروب", en: "The city skyline at sunset" },
  },
  {
    id: "villa-hills",
    src: unsplash("1613490493576-7fde63acd811"),
    ...landscape,
    alt: { ar: "فيلا بين التلال بواجهة زجاجية", en: "A hillside villa with a glass front" },
  },
  {
    id: "penthouse-sky",
    src: unsplash("1502672260266-1c1ef2d93688"),
    ...landscape,
    alt: { ar: "غرفة معيشة في بنتهاوس بإطلالة", en: "A penthouse living room with a view" },
  },
  {
    id: "coastal-pool",
    src: unsplash("1600585154340-be6161a56a0c"),
    ...landscape,
    alt: { ar: "منزل ساحلي بمسبح", en: "A coastal home with a pool" },
  },
  {
    id: "villa-terrace",
    src: unsplash("1512917774080-9991f1c4c750"),
    ...landscape,
    alt: { ar: "فيلا بتراس واسع", en: "A villa with a wide terrace" },
  },
  {
    id: "penthouse-interior",
    src: unsplash("1618220179428-22790b461013"),
    ...landscape,
    alt: { ar: "تصميم داخلي هادئ لبنتهاوس", en: "A calm penthouse interior" },
  },
  {
    id: "coastal-house",
    src: unsplash("1600596542815-ffad4c1539a9"),
    ...landscape,
    alt: { ar: "منزل ساحلي أبيض بحديقة", en: "A white coastal house with a garden" },
  },
  {
    id: "team-elena",
    src: unsplash("1494790108377-be9c29b29330"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة إيلينا ماركيتي", en: "Portrait of Elena Marchetti" },
  },
  {
    id: "team-daniel",
    src: unsplash("1507003211169-0a1dd7228f2d"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة دانيال رييس", en: "Portrait of Daniel Reyes" },
  },
  {
    id: "team-sofia",
    src: unsplash("1573496359142-b8d87734a5a2"),
    ...portrait,
    portrait: true,
    alt: { ar: "صورة صوفيا ليندكفيست", en: "Portrait of Sofia Lindqvist" },
  },
];
