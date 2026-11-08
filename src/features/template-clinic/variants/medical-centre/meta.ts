import { MEDICAL_CENTRE_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const medicalCentreMeta = {
  slug: MEDICAL_CENTRE_SLUG,
  category: "clinic",
  variant: "medical-centre",
  name: { ar: "مركز نور الطبي · مركز متعدد التخصصات", en: "Noor Medical Centre · Multi-specialty centre" },
  pitch: {
    ar: "اترك المريض يختار طبيبه ووقتًا متاحًا فعلًا بدل الاتصال بالاستقبال: أقسام وأطباء وجداول أسبوعية وحجوزات تظهر عند كل طبيب.",
    en: "Let patients choose the doctor and a truly free slot instead of calling reception: departments, doctors, weekly schedules, and bookings that show up under each doctor.",
  },
  screenshot: "/demos/clinic-medical-centre.jpg",
} as const;
