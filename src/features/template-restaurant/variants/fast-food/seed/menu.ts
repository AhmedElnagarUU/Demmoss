import type { Menu, MenuItem } from "../../../types";

type Dish = Omit<MenuItem, "categoryId" | "available" | "featured"> & { featured?: true };

function dishes(categoryId: string, list: Dish[]): MenuItem[] {
  return list.map((dish) => ({ available: true, featured: false, ...dish, categoryId }));
}

// Smash Lab: smash burgers, sides, shakes, and a kids meal. Prices in SAR.
export const seedMenu: Menu = {
  categories: [
    { id: "burgers", name: { ar: "برجر", en: "Burgers" } },
    { id: "sides", name: { ar: "أطباق جانبية", en: "Sides" } },
    { id: "shakes", name: { ar: "ميلك شيك ومشروبات", en: "Shakes & drinks" } },
    { id: "kids", name: { ar: "للأطفال", en: "Kids" } },
  ],
  items: [
    ...dishes("burgers", [
      {
        id: "classic",
        name: { ar: "كلاسيك سماش", en: "Classic Smash" },
        description: {
          ar: "قرص لحم بقري مهروس على الشواية، جبنة شيدر، مخلل، بصل مكرمل وصلصة سماش في خبز بريوش.",
          en: "A smashed beef patty, cheddar, pickles, caramelized onion, and Smash sauce in a brioche bun.",
        },
        price: 29,
        image: "burger-classic",
        tags: ["chef"],
        featured: true,
      },
      {
        id: "double",
        name: { ar: "دبل سماش", en: "Double Smash" },
        description: {
          ar: "قرصان من اللحم المهروس وطبقتان من الجبنة الذائبة لمن يريد شبعًا حقيقيًا.",
          en: "Two smashed patties and two layers of melted cheese, for a real appetite.",
        },
        price: 39,
        image: "burger-stack",
        tags: [],
        featured: true,
      },
      {
        id: "truffle",
        name: { ar: "ترافل سماش", en: "Truffle Smash" },
        description: {
          ar: "لحم مهروس مع جبنة سويسرية ومايونيز الكمأة وفطر مشوي.",
          en: "Smashed beef with Swiss cheese, truffle mayo, and grilled mushrooms.",
        },
        price: 49,
        image: "burger-dark",
        tags: ["new"],
      },
      {
        id: "chicken",
        name: { ar: "كرسبي تشيكن", en: "Crispy Chicken" },
        description: {
          ar: "صدر دجاج مقرمش بتتبيلة حارّة وسلطة كرنب وصلصة العسل والحار.",
          en: "Crispy chicken breast with a spicy marinade, slaw, and hot honey sauce.",
        },
        price: 34,
        image: "burger-chicken",
        tags: ["spicy"],
      },
    ]),
    ...dishes("sides", [
      {
        id: "fries",
        name: { ar: "بطاطس", en: "Fries" },
        description: {
          ar: "بطاطس ذهبية مقرمشة مع ملح البحر.",
          en: "Golden, crispy fries with sea salt.",
        },
        price: 12,
        image: "fries",
        tags: ["vegetarian"],
      },
      {
        id: "cheese-fries",
        name: { ar: "بطاطس بالجبن", en: "Cheese fries" },
        description: {
          ar: "بطاطس مغطاة بصلصة الجبن الدافئة وبصل أخضر.",
          en: "Fries covered in warm cheese sauce and spring onion.",
        },
        price: 18,
        image: "fries",
        tags: ["vegetarian"],
        featured: true,
      },
      {
        id: "onion-rings",
        name: { ar: "حلقات البصل", en: "Onion rings" },
        description: {
          ar: "حلقات بصل بتغليفة مقرمشة مع صلصة الرانش.",
          en: "Crunchy battered onion rings with ranch dip.",
        },
        price: 15,
        image: "fries",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("shakes", [
      {
        id: "vanilla",
        name: { ar: "ميلك شيك فانيلا", en: "Vanilla shake" },
        description: {
          ar: "آيس كريم فانيلا طبيعي مخفوق مع حليب بارد.",
          en: "Real vanilla ice cream blended with cold milk.",
        },
        price: 22,
        image: "shake",
        tags: ["vegetarian"],
      },
      {
        id: "lotus",
        name: { ar: "ميلك شيك لوتس", en: "Lotus shake" },
        description: {
          ar: "آيس كريم وكريمة لوتس مع فتات البسكويت المقرمش.",
          en: "Ice cream and Lotus spread with crunchy biscuit crumbs.",
        },
        price: 26,
        image: "shake",
        tags: ["vegetarian", "new"],
        featured: true,
      },
      {
        id: "soft-drinks",
        name: { ar: "مشروبات غازية", en: "Soft drinks" },
        description: {
          ar: "اختر من المشروبات الغازية الباردة.",
          en: "Choose from our cold soft drinks.",
        },
        price: 8,
        image: "drink",
        tags: [],
      },
    ]),
    ...dishes("kids", [
      {
        id: "kids-meal",
        name: { ar: "وجبة ميني برجر", en: "Mini burger meal" },
        description: {
          ar: "برجر صغير مع بطاطس وعصير صغير.",
          en: "A small burger with fries and a small juice.",
        },
        price: 24,
        image: "burger-classic",
        tags: [],
      },
    ]),
  ],
};
