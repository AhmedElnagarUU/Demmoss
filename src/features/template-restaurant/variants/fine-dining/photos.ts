import type { LibraryPhoto } from "../../images";

// Every photo of Verdant Table, in one list: the site, the seed, and the dashboard pickers all use these ids.
// Photos come from Unsplash (see the credit on the About page). To change one, change its `source` here.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const fineDiningPhotos: readonly LibraryPhoto[] = [
  {
    id: "hero-table",
    source: unsplash("1504674900247-0877df9cc836"),
    width: 900,
    height: 900,
    alt: { ar: "طبق موسمي مصوَّر من الأعلى", en: "Seasonal plate from above" },
  },
  {
    id: "chef",
    source: unsplash("1577219491135-ce391730fb2c"),
    width: 800,
    height: 800,
    alt: { ar: "أحد شيفَي المطبخ", en: "Chef" },
  },
  {
    id: "chef-team",
    source: unsplash("1551218808-94e220e084d2"),
    width: 800,
    height: 800,
    alt: { ar: "الشيف الثاني في المطبخ", en: "Chef" },
  },
  {
    id: "dish-bowl",
    source: unsplash("1540189549336-e6e99c3679fe"),
    width: 800,
    height: 800,
    alt: { ar: "طبق حبوب بخضار من الحديقة", en: "Grain bowl with garden vegetables" },
  },
  {
    id: "dish-mezze",
    source: unsplash("1512621776951-a57141f2eefd"),
    width: 800,
    height: 800,
    alt: { ar: "سلطة حصاد الحديقة", en: "Garden harvest salad" },
  },
  {
    id: "dish-pasta",
    source: unsplash("1476224203421-9ac39bcb3327"),
    width: 800,
    height: 800,
    alt: { ar: "معكرونة تالياتيلي بالزعفران", en: "Saffron tagliolini" },
  },
  {
    id: "dish-lamb",
    source: unsplash("1550966871-3ed3cdb5ed0c"),
    width: 800,
    height: 800,
    alt: { ar: "لحم ضأن مشوي على النار", en: "Fire-roasted lamb" },
  },
  {
    id: "dish-tomato-pasta",
    source: unsplash("1473093295043-cdd812d0e601"),
    width: 800,
    height: 800,
    alt: { ar: "معكرونة في طبق أبيض", en: "Pasta on a white plate" },
  },
  {
    id: "dish-plate",
    source: unsplash("1414235077428-338989a2e8c0"),
    width: 800,
    height: 800,
    alt: { ar: "طبق راقٍ مقدَّم بعناية", en: "Fine dining plate" },
  },
  {
    id: "footer-bowl",
    source: unsplash("1546069901-ba9599a7e63c"),
    width: 300,
    height: 300,
    alt: { ar: "وعاء سلطة", en: "Salad bowl" },
  },
  {
    id: "dish-dessert",
    source: unsplash("1592861956120-e524fc739696"),
    width: 800,
    height: 800,
    alt: { ar: "طبق حلوى", en: "A dessert plate" },
  },
];
