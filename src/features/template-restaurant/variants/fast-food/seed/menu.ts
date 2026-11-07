import type { Menu, MenuItem } from "../../../types";

type Dish = Omit<MenuItem, "categoryId" | "available" | "featured"> & { featured?: true };

function dishes(categoryId: string, list: Dish[]): MenuItem[] {
  return list.map((dish) => ({ available: true, featured: false, ...dish, categoryId }));
}

// Sole Trattoria: the source's pizza, pasta, antipasti, dolci, and drinks. Prices in SAR (whole numbers).
export const seedMenu: Menu = {
  categories: [
    { id: "pizza", name: { ar: "بيتزا", en: "Pizza" } },
    { id: "pasta", name: { ar: "معكرونة", en: "Pasta" } },
    { id: "antipasti", name: { ar: "مقبلات", en: "Antipasti" } },
    { id: "dolci", name: { ar: "حلويات", en: "Dolci" } },
    { id: "drinks", name: { ar: "مشروبات", en: "Drinks" } },
  ],
  items: [
    ...dishes("pizza", [
      {
        id: "margherita",
        name: { ar: "مارغريتا", en: "Margherita" },
        description: {
          ar: "طماطم وموزاريلا فيور دي لاتي وريحان.",
          en: "Tomato, fior di latte, basil",
        },
        price: 45,
        image: "pizza-margherita",
        tags: ["vegetarian"],
      },
      {
        id: "wood-fired-margherita",
        name: { ar: "مارغريتا فرن الحطب", en: "Wood-Fired Margherita" },
        description: {
          ar: "طماطم وموزاريلا فيور دي لاتي وريحان من فرن الحطب.",
          en: "Tomato, fior di latte, basil",
        },
        price: 49,
        image: "pizza-margherita",
        tags: ["vegetarian", "chef"],
        featured: true,
      },
      {
        id: "diavola",
        name: { ar: "ديافولا", en: "Diavola" },
        description: {
          ar: "سلامي حار وفلفل حار وموزاريلا.",
          en: "Spicy salami, chili, mozzarella",
        },
        price: 52,
        image: "pizza-diavola",
        tags: ["spicy"],
      },
      {
        id: "quattro-formaggi",
        name: { ar: "أربعة أجبان", en: "Quattro Formaggi" },
        description: {
          ar: "أربعة أجبان إيطالية وعسل.",
          en: "Four Italian cheeses, honey",
        },
        price: 58,
        image: "pizza-quattro-formaggi",
        tags: ["vegetarian"],
      },
      {
        id: "prosciutto-rucola",
        name: { ar: "بروشوتو وجرجير", en: "Prosciutto e Rucola" },
        description: {
          ar: "لحم بارما وجرجير وبارميزان.",
          en: "Parma ham, rocket, parmesan",
        },
        price: 62,
        image: "pizza-margherita",
        tags: [],
      },
    ]),
    ...dishes("pasta", [
      {
        id: "tagliatelle-ragu",
        name: { ar: "تالياتيلي بالراجو", en: "Tagliatelle al Ragu" },
        description: {
          ar: "راجو لحم بقري مطهو ببطء.",
          en: "Slow-cooked beef and pork ragu",
        },
        price: 58,
        image: "pasta-tagliatelle",
        tags: ["chef"],
        featured: true,
      },
      {
        id: "spaghetti-pomodoro",
        name: { ar: "سباغيتي بومودورو", en: "Spaghetti Pomodoro" },
        description: {
          ar: "طماطم سان مارزانو وريحان وزيت زيتون.",
          en: "San Marzano, basil, olive oil",
        },
        price: 48,
        image: "pasta-spaghetti",
        tags: ["vegetarian", "chef"],
        featured: true,
      },
      {
        id: "pappardelle-funghi",
        name: { ar: "بابارديلي بالفطر", en: "Pappardelle Funghi" },
        description: {
          ar: "فطر بري وكريمة بارميزان.",
          en: "Wild mushroom, parmesan cream",
        },
        price: 62,
        image: "pasta-pappardelle",
        tags: ["vegetarian"],
      },
      {
        id: "carbonara",
        name: { ar: "كاربونارا", en: "Carbonara" },
        description: {
          ar: "غوانتشالي وصفار بيض وبيكورينو.",
          en: "Guanciale, egg yolk, pecorino",
        },
        price: 55,
        image: "pasta-spaghetti",
        tags: [],
      },
    ]),
    ...dishes("antipasti", [
      {
        id: "bruschetta",
        name: { ar: "بروسكيتا", en: "Bruschetta" },
        description: {
          ar: "خبز مشوي وطماطم وثوم.",
          en: "Grilled bread, tomato, garlic",
        },
        price: 28,
        image: "antipasti-bruschetta",
        tags: ["vegetarian"],
      },
      {
        id: "caprese",
        name: { ar: "كبريزي", en: "Caprese" },
        description: {
          ar: "موزاريلا الجاموس وطماطم وريحان.",
          en: "Buffalo mozzarella, tomato, basil",
        },
        price: 34,
        image: "antipasti-caprese",
        tags: ["vegetarian"],
      },
      {
        id: "burrata",
        name: { ar: "بوراتا", en: "Burrata" },
        description: {
          ar: "بوراتا كريمية وفلفل مشوي.",
          en: "Creamy burrata, roasted peppers",
        },
        price: 42,
        image: "antipasti-burrata",
        tags: ["vegetarian", "new"],
      },
      {
        id: "arancini",
        name: { ar: "أرانشيني", en: "Arancini" },
        description: {
          ar: "كرات ريزوتو مقرمشة بالجبن.",
          en: "Crispy risotto balls, mozzarella",
        },
        price: 30,
        image: "antipasti-arancini",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("dolci", [
      {
        id: "tiramisu",
        name: { ar: "تيراميسو", en: "Tiramisu" },
        description: {
          ar: "ماسكاربوني وإسبريسو وكاكاو.",
          en: "Mascarpone, espresso, cocoa",
        },
        price: 26,
        image: "dolci-tiramisu",
        tags: ["vegetarian", "chef"],
      },
      {
        id: "panna-cotta",
        name: { ar: "بانا كوتا", en: "Panna Cotta" },
        description: {
          ar: "كريمة الفانيلا وكوليس التوت.",
          en: "Vanilla cream, berry coulis",
        },
        price: 24,
        image: "antipasti-burrata",
        tags: ["vegetarian"],
      },
      {
        id: "cannoli",
        name: { ar: "كانولي", en: "Cannoli" },
        description: {
          ar: "ريكوتا صقلية وفستق.",
          en: "Sicilian ricotta, pistachio",
        },
        price: 22,
        image: "antipasti-arancini",
        tags: ["vegetarian"],
      },
      {
        id: "affogato",
        name: { ar: "أفوجاتو", en: "Affogato" },
        description: {
          ar: "جيلاتو غارق في الإسبريسو.",
          en: "Gelato drowned in espresso",
        },
        price: 20,
        image: "dolci-tiramisu",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("drinks", [
      {
        id: "aperol-spritz",
        name: { ar: "أبيرول سبرتز", en: "Aperol Spritz" },
        description: {
          ar: "أبيرول وبروسيكو وصودا.",
          en: "Aperol, prosecco, soda",
        },
        price: 32,
        image: "drink-aperol",
        tags: [],
      },
      {
        id: "chianti-classico",
        name: { ar: "كيانتي كلاسيكو", en: "Chianti Classico" },
        description: {
          ar: "كأس من النبيذ الأحمر التوسكاني.",
          en: "Glass of Tuscan red",
        },
        price: 38,
        image: "drink-chianti",
        tags: [],
      },
      {
        id: "limonata",
        name: { ar: "ليموناتا", en: "Limonata" },
        description: {
          ar: "ليموناضة فوارة منزلية.",
          en: "House-made sparkling lemonade",
        },
        price: 18,
        image: "drink-aperol",
        tags: ["vegetarian"],
      },
      {
        id: "espresso",
        name: { ar: "إسبريسو", en: "Espresso" },
        description: {
          ar: "تحميص إيطالي، جرعة واحدة.",
          en: "Italian roast, single shot",
        },
        price: 12,
        image: "drink-chianti",
        tags: ["vegetarian"],
      },
    ]),
  ],
};
