import type { Photo } from "../../site/photo";

// Every photo of the Noor Medical Centre site, in one list. Use SitePhoto to show them.
// Moving to self-hosted files later means changing `src` here only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

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
    src: unsplash("1631217868264-e5b90bb7e133"),
    ...landscape,
    alt: { ar: "فريق طبي يراجع الفحوصات", en: "A medical team reviewing scans" },
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
    src: unsplash("1559839734-2b71ea197ec2"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. ريم الفهمي", en: "Dr. Reem Al Fahmi" },
  },
  {
    id: "dr-huda",
    src: unsplash("1594824476967-48c8b964273f"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. هدى سعيد", en: "Dr. Huda Saeed" },
  },
  {
    id: "dr-mona",
    src: unsplash("1494790108377-be9c29b29330"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. منى عادل", en: "Dr. Mona Adel" },
  },
  {
    id: "dr-tariq",
    src: unsplash("1537368910025-700350fe46c7"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. طارق ناصر", en: "Dr. Tariq Nasser" },
  },
  {
    id: "dr-lina",
    src: unsplash("1573496359142-b8d87734a5a2"),
    ...portrait,
    portrait: true,
    alt: { ar: "د. لينا قاسم", en: "Dr. Lina Qasim" },
  },
];
