import type { LibraryPhoto } from "../../images";

// Every photo of Sole Trattoria, in one list: the site, the seed, and the dashboard pickers all use these ids.
// Sources are the Unsplash photos named in the source design (theme-sources/06-sole-trattoria.html).
// A photo that cannot load shows its alt text.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const fastFoodPhotos: readonly LibraryPhoto[] = [
  {
    id: "pizza-hero",
    source: unsplash("1565299624946-b28f40a0ae38"),
    width: 900,
    height: 900,
    alt: { ar: "بيتزا من فرن الحطب", en: "Wood-fired pizza" },
  },
  {
    id: "pizza-margherita",
    source: unsplash("1565299624946-b28f40a0ae38"),
    width: 800,
    height: 800,
    alt: { ar: "بيتزا مارغريتا بالريحان", en: "A margherita pizza with basil" },
  },
  {
    id: "pizza-diavola",
    source: unsplash("1513104890138-7c749659a591"),
    width: 800,
    height: 800,
    alt: { ar: "بيتزا ديافولا حارة", en: "A spicy diavola pizza" },
  },
  {
    id: "pizza-quattro-formaggi",
    source: unsplash("1574071318508-1cdbab80d002"),
    width: 800,
    height: 800,
    alt: { ar: "بيتزا بأربعة أجبان", en: "A four-cheese pizza" },
  },
  {
    id: "pasta-tagliatelle",
    source: unsplash("1621996346565-e3dbc646d9a9"),
    width: 800,
    height: 800,
    alt: { ar: "تالياتيلي بصلصة الراجو", en: "Tagliatelle with ragu" },
  },
  {
    id: "pasta-spaghetti",
    source: unsplash("1473093295043-cdd812d0e601"),
    width: 800,
    height: 800,
    alt: { ar: "سباغيتي بصلصة الطماطم", en: "Spaghetti with tomato sauce" },
  },
  {
    id: "pasta-pappardelle",
    source: unsplash("1476224203421-9ac39bcb3327"),
    width: 800,
    height: 800,
    alt: { ar: "بابارديلي بصلصة الفطر", en: "Pappardelle with mushroom sauce" },
  },
  {
    id: "antipasti-bruschetta",
    source: unsplash("1546069901-ba9599a7e63c"),
    width: 800,
    height: 800,
    alt: { ar: "بروسكيتا بالطماطم", en: "Tomato bruschetta" },
  },
  {
    id: "antipasti-caprese",
    source: unsplash("1512621776951-a57141f2eefd"),
    width: 800,
    height: 800,
    alt: { ar: "سلطة كبريزي", en: "A caprese salad" },
  },
  {
    id: "antipasti-burrata",
    source: unsplash("1550966871-3ed3cdb5ed0c"),
    width: 800,
    height: 800,
    alt: { ar: "طبق بوراتا كريمية", en: "A creamy burrata plate" },
  },
  {
    id: "antipasti-arancini",
    source: unsplash("1533777857889-4be7c70b33f7"),
    width: 800,
    height: 800,
    alt: { ar: "كرات أرانشيني مقرمشة", en: "Crispy arancini balls" },
  },
  {
    id: "dolci-tiramisu",
    source: unsplash("1592861956120-e524fc739696"),
    width: 800,
    height: 800,
    alt: { ar: "قطعة تيراميسو", en: "A slice of tiramisu" },
  },
  {
    id: "drink-aperol",
    source: unsplash("1514933651103-005eec06c04b"),
    width: 800,
    height: 800,
    alt: { ar: "مشروب أبيرول سبرتز", en: "An Aperol spritz" },
  },
  {
    id: "drink-chianti",
    source: unsplash("1510812431401-41d2bd2722f3"),
    width: 800,
    height: 800,
    alt: { ar: "كأس نبيذ أحمر", en: "A glass of red wine" },
  },
  {
    id: "dining-room",
    source: unsplash("1517248135467-4c7edcad34c4"),
    width: 900,
    height: 600,
    alt: { ar: "صالة مطعم سولي تراتوريا", en: "The Sole Trattoria dining room" },
  },
];
