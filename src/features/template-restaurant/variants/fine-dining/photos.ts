import type { LibraryPhoto } from "../../images";

// Every photo of Zaytouna, in one list: the site, the seed, and the dashboard pickers all use these ids.
// Photos come from Unsplash (see the credit on the About page). To change one, change its `source` here.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const fineDiningPhotos: readonly LibraryPhoto[] = [
  {
    id: "hero-table",
    source: unsplash("1504674900247-0877df9cc836"),
    width: 900,
    height: 900,
    alt: { ar: "طبق موسمي مصوَّر من الأعلى", en: "A seasonal plate seen from above" },
  },
  {
    id: "interior",
    source: unsplash("1517248135467-4c7edcad34c4"),
    width: 900,
    height: 600,
    alt: { ar: "قاعة المطعم بإضاءة دافئة", en: "The dining room in warm light" },
  },
  {
    id: "chef",
    source: unsplash("1577219491135-ce391730fb2c"),
    width: 800,
    height: 800,
    alt: { ar: "الشيف في المطبخ", en: "The chef in the kitchen" },
  },
  {
    id: "chef-team",
    source: unsplash("1551218808-94e220e084d2"),
    width: 800,
    height: 800,
    alt: { ar: "أحد طهاة المطبخ", en: "A cook from the kitchen team" },
  },
  {
    id: "dish-mezze",
    source: unsplash("1512621776951-a57141f2eefd"),
    width: 800,
    height: 800,
    alt: { ar: "طبق مقبلات طازجة", en: "A plate of fresh mezze" },
  },
  {
    id: "dish-bowl",
    source: unsplash("1540189549336-e6e99c3679fe"),
    width: 800,
    height: 800,
    alt: { ar: "طبق حبوب وخضار من الحديقة", en: "A bowl of grains and garden vegetables" },
  },
  {
    id: "dish-grill",
    source: unsplash("1555939594-58d7cb561ad1"),
    width: 800,
    height: 800,
    alt: { ar: "أسياخ مشوية على الفحم", en: "Skewers from the charcoal grill" },
  },
  {
    id: "dish-lamb",
    source: unsplash("1544025162-d76694265947"),
    width: 800,
    height: 800,
    alt: { ar: "طبق لحم مطهو ببطء", en: "A slow-cooked meat dish" },
  },
  {
    id: "dish-plate",
    source: unsplash("1414235077428-338989a2e8c0"),
    width: 800,
    height: 800,
    alt: { ar: "طبق رئيسي مقدَّم بعناية", en: "A carefully plated main dish" },
  },
  {
    id: "dish-dessert",
    source: unsplash("1592861956120-e524fc739696"),
    width: 800,
    height: 800,
    alt: { ar: "طبق حلوى", en: "A dessert plate" },
  },
  {
    id: "dish-drink",
    source: unsplash("1514933651103-005eec06c04b"),
    width: 800,
    height: 800,
    alt: { ar: "مشروب منعش", en: "A refreshing drink" },
  },
  {
    id: "ambience-glass",
    source: unsplash("1510812431401-41d2bd2722f3"),
    width: 800,
    height: 800,
    alt: { ar: "كؤوس على الطاولة في المساء", en: "Glasses on the table in the evening" },
  },
];
