import type { LocalizedText } from "@/features/demo-engine/types";

// The built-in image library of the restaurant category (version 1: the owner picks from this list).
// The files are simple placeholder illustrations. To use real photos, replace the files in
// public/demos/restaurant/ (same names, 800x600, optimized WebP) or change `src` here. Nothing else changes.
export type LibraryImage = { id: string; src: string; width: number; height: number; alt: LocalizedText };

const heroTable: LibraryImage = {
  id: "hero-table",
  src: "/demos/restaurant/hero-table.svg",
  width: 800,
  height: 600,
  alt: { ar: "مائدة مُعدّة لعشاء راقٍ", en: "A table set for a fine dinner" },
};

export const restaurantImages: readonly LibraryImage[] = [
  heroTable,
  {
    id: "interior",
    src: "/demos/restaurant/interior.svg",
    width: 800,
    height: 600,
    alt: { ar: "قاعة المطعم بإضاءة دافئة", en: "The dining room in warm light" },
  },
  {
    id: "chef",
    src: "/demos/restaurant/chef.svg",
    width: 800,
    height: 600,
    alt: { ar: "الشيف في المطبخ", en: "The chef in the kitchen" },
  },
  {
    id: "dish-mezze",
    src: "/demos/restaurant/dish-mezze.svg",
    width: 800,
    height: 600,
    alt: { ar: "أطباق مقبلات", en: "Mezze plates" },
  },
  {
    id: "dish-grill",
    src: "/demos/restaurant/dish-grill.svg",
    width: 800,
    height: 600,
    alt: { ar: "طبق مشاوي", en: "A grilled platter" },
  },
  {
    id: "dish-dessert",
    src: "/demos/restaurant/dish-dessert.svg",
    width: 800,
    height: 600,
    alt: { ar: "طبق حلوى", en: "A dessert plate" },
  },
  {
    id: "dish-drink",
    src: "/demos/restaurant/dish-drink.svg",
    width: 800,
    height: 600,
    alt: { ar: "مشروب منعش", en: "A fresh drink" },
  },
];

export function findImage(id: string): LibraryImage {
  return restaurantImages.find((image) => image.id === id) ?? heroTable;
}
