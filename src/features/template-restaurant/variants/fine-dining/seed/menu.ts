import type { Menu, MenuItem } from "../../../types";

type Dish = Omit<MenuItem, "categoryId" | "available" | "featured"> & { featured?: true };

function dishes(categoryId: string, list: Dish[]): MenuItem[] {
  return list.map((dish) => ({ available: true, featured: false, ...dish, categoryId }));
}

// The menu of theme-sources/03-verdant-table.html. Prices are the source dollar prices converted to SAR (x3.75, rounded).
// The three signature dishes of the home page are the featured ones.
export const seedMenu: Menu = {
  categories: [
    { id: "small", name: { ar: "أطباق صغيرة", en: "Small plates" } },
    { id: "mains", name: { ar: "الأطباق الرئيسية", en: "Mains" } },
    { id: "garden", name: { ar: "من الحديقة", en: "From the garden" } },
    { id: "desserts", name: { ar: "الحلويات", en: "Desserts" } },
  ],
  items: [
    ...dishes("small", [
      {
        id: "whipped-feta",
        name: { ar: "جبنة فيتا مخفوقة", en: "Whipped Feta" },
        description: {
          ar: "عسل وفستق وخبز مسطّح دافئ.",
          en: "Honey, pistachio, warm flatbread.",
        },
        price: 42,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
      {
        id: "grilled-octopus",
        name: { ar: "أخطبوط مشوي", en: "Grilled Octopus" },
        description: {
          ar: "ليمون محمّر وحمّص وزيت بابريكا.",
          en: "Charred lemon, chickpea, paprika oil.",
        },
        price: 64,
        image: "dish-plate",
        tags: [],
      },
      {
        id: "marinated-olives",
        name: { ar: "زيتون متبّل", en: "Marinated Olives" },
        description: {
          ar: "قشر برتقال وبذور شمر وإكليل الجبل.",
          en: "Orange zest, fennel seed, rosemary.",
        },
        price: 30,
        image: "dish-bowl",
        tags: ["vegetarian"],
      },
      {
        id: "burrata-peach",
        name: { ar: "بوراتا بالخوخ", en: "Burrata & Peach" },
        description: {
          ar: "ريحان وخل بلسمي معتّق ولوز محمّص.",
          en: "Basil, aged balsamic, toasted almonds.",
        },
        price: 56,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("mains", [
      {
        id: "fire-roasted-lamb",
        name: { ar: "ضأن مشوي على النار", en: "Fire-Roasted Lamb" },
        description: {
          ar: "باذنجان مدخّن وبصل أحمر مخلّل ونعناع.",
          en: "Smoked aubergine, pickled shallot, mint.",
        },
        price: 128,
        image: "dish-lamb",
        tags: ["chef"],
        featured: true,
      },
      {
        id: "saffron-tagliolini",
        name: { ar: "تاليوليني بالزعفران", en: "Saffron Tagliolini" },
        description: {
          ar: "معكرونة مقطّعة باليد وطماطم مطهوة ببطء وزيت الريحان.",
          en: "Hand-cut pasta, slow tomato, basil oil.",
        },
        price: 90,
        image: "dish-pasta",
        tags: ["vegetarian"],
        featured: true,
      },
      {
        id: "sea-bream",
        name: { ar: "سمك الدنيس", en: "Sea Bream" },
        description: {
          ar: "شمر وبرتقال أحمر وصلصة سالسا فيردي.",
          en: "Fennel, blood orange, salsa verde.",
        },
        price: 116,
        image: "dish-plate",
        tags: [],
      },
      {
        id: "wood-oven-chicken",
        name: { ar: "دجاج بفرن الحطب", en: "Wood-Oven Chicken" },
        description: {
          ar: "ليمون مخلّل وبطاطس صغيرة وصلصة الزعتر.",
          en: "Preserved lemon, new potato, thyme jus.",
        },
        price: 102,
        image: "dish-lamb",
        tags: [],
      },
    ]),
    ...dishes("garden", [
      {
        id: "garden-harvest-salad",
        name: { ar: "سلطة حصاد الحديقة", en: "Garden Harvest Salad" },
        description: {
          ar: "طماطم تراثية وأعشاب طرية وفيتا مخفوقة.",
          en: "Heirloom tomato, soft herbs, whipped feta.",
        },
        price: 60,
        image: "dish-mezze",
        tags: ["vegetarian"],
        featured: true,
      },
      {
        id: "charred-cauliflower",
        name: { ar: "قرنبيط محمّر", en: "Charred Cauliflower" },
        description: {
          ar: "طحينة وزبيب ذهبي ودقّة.",
          en: "Tahini, golden raisin, dukkah.",
        },
        price: 52,
        image: "dish-bowl",
        tags: ["vegetarian"],
      },
      {
        id: "herb-grain-bowl",
        name: { ar: "وعاء الحبوب بالأعشاب", en: "Herb Grain Bowl" },
        description: {
          ar: "فريكة ويقطين مشوي ورمّان.",
          en: "Farro, roast squash, pomegranate.",
        },
        price: 68,
        image: "dish-bowl",
        tags: ["vegetarian"],
      },
      {
        id: "roasted-carrots",
        name: { ar: "جزر مشوي", en: "Roasted Carrots" },
        description: {
          ar: "هريس فاصولياء بيضاء وزعتر وبندق.",
          en: "White bean purée, thyme, hazelnut.",
        },
        price: 48,
        image: "dish-plate",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("desserts", [
      {
        id: "olive-oil-cake",
        name: { ar: "كعكة زيت الزيتون", en: "Olive Oil Cake" },
        description: {
          ar: "كريمة حمضيات وكريم فريش.",
          en: "Citrus curd, crème fraîche.",
        },
        price: 38,
        image: "dish-dessert",
        tags: ["vegetarian"],
      },
      {
        id: "honey-panna-cotta",
        name: { ar: "بانا كوتا بالعسل", en: "Honey Panna Cotta" },
        description: {
          ar: "تين وزعتر وجوز محمّص.",
          en: "Fig, thyme, toasted walnut.",
        },
        price: 42,
        image: "dish-dessert",
        tags: ["vegetarian"],
      },
      {
        id: "dark-chocolate-pot",
        name: { ar: "كأس الشوكولاتة الداكنة", en: "Dark Chocolate Pot" },
        description: {
          ar: "ملح بحري وقشر برتقال وزيت زيتون.",
          en: "Sea salt, orange peel, olive oil.",
        },
        price: 45,
        image: "dish-dessert",
        tags: ["vegetarian"],
      },
      {
        id: "seasonal-sorbet",
        name: { ar: "سوربيه الموسم", en: "Seasonal Sorbet" },
        description: {
          ar: "ثلاث كرات من الحديقة.",
          en: "Three scoops from the garden.",
        },
        price: 34,
        image: "dish-dessert",
        tags: ["vegetarian", "new"],
      },
    ]),
  ],
};
