import type { Photo } from "../../site/photo";

// Every photo of the Noor Medical Centre site, in one list. Use SitePhoto to show them.
// Moving to self-hosted files later means changing `src` here only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

const landscape = { width: 1200, height: 800 } as const;
const portrait = { width: 600, height: 750 } as const;

export const medicalCentrePhotos: readonly Photo[] = [
  {
    id: "centre",
    src: unsplash("1519494026892-80bbd2d6fd0d"),
    ...landscape,
    alt: { ar: "ممر مركز طبي حديث ومضيء", en: "A bright corridor of a modern medical centre" },
  },
  {
    id: "team",
    src: pexels(4173239),
    ...landscape,
    alt: {
      ar: "طبيب يراجع ملف مريض في ممر المركز",
      en: "A doctor reviewing a patient file in the centre corridor",
    },
  },
  {
    id: "dr-ahmad",
    src: unsplash("1622253692010-333f2da6031d"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. أحمد بكر", en: "Dr. Ahmad Bakr" },
  },
  {
    id: "dr-reem",
    src: pexels(5452293),
    ...portrait,
    portrait: true,
    alt: { ar: "د. راشد الفهمي", en: "Dr. Rashid Al Fahmi" },
  },
  {
    id: "dr-huda",
    src: unsplash("1612349317150-e413f6a5b16d"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. حمد سعيد", en: "Dr. Hamad Saeed" },
  },
  {
    id: "dr-mona",
    src: pexels(5452268),
    ...portrait,
    portrait: true,
    alt: { ar: "د. منير عادل", en: "Dr. Munir Adel" },
  },
  {
    id: "dr-tariq",
    src: pexels(8460157),
    ...portrait,
    portrait: true,
    alt: { ar: "د. طارق ناصر", en: "Dr. Tariq Nasser" },
  },
  {
    id: "dr-lina",
    src: unsplash("1582750433449-648ed127bb54"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. ليث قاسم", en: "Dr. Laith Qasim" },
  },
];
