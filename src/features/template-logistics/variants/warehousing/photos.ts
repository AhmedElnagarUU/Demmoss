import type { PhotoData } from "@/features/demo-engine/photo/photo";

// Every photo of the Makhzan 3PL site, from the Unsplash photos of the source design (Stackwell 3PL).
// They are served by the photo CDN through photoUrl(); moving to self-hosted files later is a change in this list only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const warehousingPhotos = {
  exterior: {
    src: unsplash("1566576721346-d4a3b4eaeb55"),
    width: 1400,
    height: 900,
    alt: { ar: "واجهة مستودع مخزن", en: "The Makhzan warehouse exterior" },
  },
  boxes: {
    src: unsplash("1565891741441-64926e441838"),
    width: 1200,
    height: 800,
    alt: { ar: "صناديق على الرفوف", en: "Boxes on shelves" },
  },
  docks: {
    src: unsplash("1586528116311-ad8dd3c8310d"),
    width: 1200,
    height: 800,
    alt: { ar: "أرصفة التحميل", en: "Loading docks" },
  },
  riyadh: {
    src: unsplash("1587293852726-70cdb56c2866"),
    width: 1200,
    height: 800,
    alt: { ar: "ممرات مركز الرياض ورفوفه", en: "Aisles and racks of the Riyadh Hub" },
  },
  jebelAli: {
    src: unsplash("1605745341112-85968b19335b"),
    width: 1200,
    height: 800,
    alt: { ar: "ملحق جبل علي من الداخل", en: "Inside the Jebel Ali Annex" },
  },
} as const satisfies Record<string, PhotoData>;
