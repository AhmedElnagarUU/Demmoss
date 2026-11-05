import type { Photo } from "../../site/photo";

// Every photo of the specialist site, in one list (CDN addresses from the design). Use SitePhoto to show them.
// Moving to self-hosted files later means changing `src` here only.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

const landscape = { width: 1200, height: 800 } as const;
const portrait = { width: 600, height: 750 } as const;

export const specialistPhotos: readonly Photo[] = [
  {
    id: "doctor",
    src: unsplash("1612349317150-e413f6a5b16d"),
    ...portrait,
    portrait: true,
    alt: {
      ar: "د. ريان الحارثي، جراح الفم والفكين",
      en: "Dr. Rayan Al Harthi, oral and maxillofacial surgeon",
    },
  },
  {
    id: "extraction",
    src: unsplash("1579684385127-1ef15d508118"),
    ...landscape,
    alt: { ar: "أدوات جراحة الأسنان على الصينية", en: "Dental surgery instruments on a tray" },
  },
  {
    id: "full-arch",
    src: unsplash("1606811971618-4486d14f3f99"),
    ...landscape,
    alt: { ar: "مريضة ترى نتيجة ابتسامتها في المرآة", en: "A patient checking her new smile in a mirror" },
  },
  {
    id: "bone-graft",
    src: unsplash("1631217868264-e5b90bb7e133"),
    ...landscape,
    alt: {
      ar: "مراجعة مسح ثلاثي الأبعاد مع الفريق الجراحي",
      en: "Reviewing a 3D scan with the surgical team",
    },
  },
  {
    id: "sinus-lift",
    src: unsplash("1588776814546-1ffcf47267a5"),
    ...landscape,
    alt: { ar: "غرفة عمليات أسنان حديثة", en: "A modern dental operating room" },
  },
];
