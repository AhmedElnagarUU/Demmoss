import type { LibraryPhoto } from "../../images";

// Every photo of Smash Lab, in one list: the site, the seed, and the dashboard pickers all use these ids.
// Photos come from Unsplash. To change one, change its `source` here. A photo that cannot load shows its alt text.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const fastFoodPhotos: readonly LibraryPhoto[] = [
  {
    id: "burger-hero",
    source: unsplash("1568901346375-23c9450c58cd"),
    width: 900,
    height: 900,
    alt: { ar: "برجر مشوي بالجبن", en: "A smash burger with melted cheese" },
  },
  {
    id: "burger-classic",
    source: unsplash("1550547660-d9450f859349"),
    width: 800,
    height: 800,
    alt: { ar: "برجر مع بطاطس مقرمشة", en: "A burger served with crispy fries" },
  },
  {
    id: "burger-stack",
    source: unsplash("1571091718767-18b5b1457add"),
    width: 800,
    height: 800,
    alt: { ar: "برجر مرتفع بطبقتين", en: "A tall double burger" },
  },
  {
    id: "burger-dark",
    source: unsplash("1553979459-d2229ba7433b"),
    width: 800,
    height: 800,
    alt: { ar: "برجر فاخر على طاولة خشبية", en: "A premium burger on a wooden table" },
  },
  {
    id: "burger-chicken",
    source: unsplash("1606755962773-d324e0a13086"),
    width: 800,
    height: 800,
    alt: { ar: "ساندويتش دجاج مقرمش", en: "A crispy chicken sandwich" },
  },
  {
    id: "burger-fries",
    source: unsplash("1572802419224-296b0aeee0d9"),
    width: 800,
    height: 800,
    alt: { ar: "وجبة برجر وبطاطس", en: "A burger and fries meal" },
  },
  {
    id: "fries",
    source: unsplash("1573080496219-bb080dd4f877"),
    width: 800,
    height: 800,
    alt: { ar: "بطاطس مقلية ذهبية", en: "Golden french fries" },
  },
  {
    id: "shake",
    source: unsplash("1572448862527-d3c904757de6"),
    width: 800,
    height: 800,
    alt: { ar: "ميلك شيك كريمي", en: "A creamy milkshake" },
  },
  {
    id: "drink",
    source: unsplash("1514933651103-005eec06c04b"),
    width: 800,
    height: 800,
    alt: { ar: "مشروب بارد", en: "A cold drink" },
  },
  {
    id: "dining-room",
    source: unsplash("1517248135467-4c7edcad34c4"),
    width: 900,
    height: 600,
    alt: { ar: "صالة المطعم", en: "The restaurant dining room" },
  },
];
