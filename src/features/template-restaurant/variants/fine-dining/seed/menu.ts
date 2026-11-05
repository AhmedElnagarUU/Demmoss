import type { Menu, MenuItem } from "../../../types";

type Dish = Omit<MenuItem, "categoryId" | "available" | "featured"> & { featured?: true };

function dishes(categoryId: string, list: Dish[]): MenuItem[] {
  return list.map((dish) => ({ available: true, featured: false, ...dish, categoryId }));
}

export const seedMenu: Menu = {
  categories: [
    { id: "cold", name: { ar: "مقبلات باردة", en: "Cold mezze" } },
    { id: "hot", name: { ar: "مقبلات ساخنة", en: "Hot mezze" } },
    { id: "mains", name: { ar: "الأطباق الرئيسية", en: "Mains" } },
    { id: "desserts", name: { ar: "الحلويات", en: "Desserts" } },
    { id: "drinks", name: { ar: "المشروبات", en: "Drinks" } },
  ],
  items: [
    ...dishes("cold", [
      {
        id: "hummus",
        name: { ar: "حمّص بالصنوبر", en: "Hummus with pine nuts" },
        description: {
          ar: "حمّص ناعم بالطحينة والليمون مع صنوبر محمّص.",
          en: "Silky chickpea purée with tahini, lemon, and toasted pine nuts.",
        },
        price: 32,
        image: "dish-mezze",
        tags: ["vegetarian"],
        featured: true,
      },
      {
        id: "muhammara",
        name: { ar: "محمّرة", en: "Muhammara" },
        description: {
          ar: "فلفل أحمر مشوي وجوز ودبس رمّان.",
          en: "Roasted red pepper, walnuts, and pomegranate molasses.",
        },
        price: 36,
        image: "dish-mezze",
        tags: ["vegetarian", "spicy"],
      },
      {
        id: "fattoush",
        name: { ar: "فتّوش", en: "Fattoush" },
        description: {
          ar: "خضار مقرمشة وسمّاق وخبز محمّص مع صلصة الرمّان.",
          en: "Crisp vegetables, sumac, and toasted bread with pomegranate dressing.",
        },
        price: 34,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
      {
        id: "tabbouleh",
        name: { ar: "تبّولة", en: "Tabbouleh" },
        description: {
          ar: "بقدونس مفروم ناعمًا وطماطم ونعناع وبرغل مع الليمون.",
          en: "Finely chopped parsley, tomato, mint, and bulgur with lemon.",
        },
        price: 30,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("hot", [
      {
        id: "rakakat",
        name: { ar: "رقاقات بالجبن", en: "Cheese rakakat" },
        description: {
          ar: "رقاقات مقرمشة محشوة بجبن أبيض ذائب وأعشاب.",
          en: "Crisp pastry rolls filled with melted white cheese and herbs.",
        },
        price: 38,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
      {
        id: "kibbeh",
        name: { ar: "كبّة لبنيّة", en: "Kibbeh with yogurt" },
        description: {
          ar: "كبّة مشكَّلة باليد تُطهى في لبن دافئ بالثوم.",
          en: "Hand-shaped kibbeh simmered in warm garlic yogurt.",
        },
        price: 44,
        image: "dish-mezze",
        tags: [],
      },
      {
        id: "halloumi",
        name: { ar: "حلّوم مشوي", en: "Grilled halloumi" },
        description: {
          ar: "حلّوم ذهبي مع طماطم كرزية وزعتر طازج.",
          en: "Golden halloumi with cherry tomatoes and fresh thyme.",
        },
        price: 42,
        image: "dish-mezze",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("mains", [
      {
        id: "ouzi",
        name: { ar: "أوزي لحم", en: "Lamb ouzi" },
        description: {
          ar: "كتف ضأن مطهو ببطء على أرز متبّل مع اللوز والبازلاء، يُخبز في عجينة.",
          en: "Slow-roasted lamb shoulder on spiced rice with almonds and peas, baked in pastry.",
        },
        price: 118,
        image: "dish-grill",
        tags: ["chef"],
        featured: true,
      },
      {
        id: "mixed-grill",
        name: { ar: "مشاوي مشكّلة", en: "Mixed grill" },
        description: {
          ar: "كفتة ضأن وشيش طاووق وريش ضأن مشوية على الفحم مع خضار مشوية.",
          en: "Lamb kofta, shish tawook, and lamb chops from the charcoal grill, with grilled vegetables.",
        },
        price: 135,
        image: "dish-grill",
        tags: [],
        featured: true,
      },
      {
        id: "sayadieh",
        name: { ar: "صيادية سمك", en: "Sayadieh fish" },
        description: {
          ar: "سمك قاروس على أرز بالبصل المكرمل مع صلصة المكسرات المحمّصة.",
          en: "Sea bass on caramelized-onion rice with a toasted-nut sauce.",
        },
        price: 96,
        image: "dish-grill",
        tags: [],
      },
      {
        id: "tawook",
        name: { ar: "شيش طاووق", en: "Chicken shish tawook" },
        description: {
          ar: "أسياخ دجاج متبّلة بالثوم تُقدَّم مع التوم والبطاطس.",
          en: "Garlic-marinated chicken skewers with toum and fries.",
        },
        price: 78,
        image: "dish-grill",
        tags: [],
      },
    ]),
    ...dishes("desserts", [
      {
        id: "kunafa",
        name: { ar: "كنافة", en: "Kunafa" },
        description: {
          ar: "كنافة ساخنة مقرمشة بالجبن الذائب وقطر ماء الزهر.",
          en: "Warm crisp kunafa with melted cheese and orange blossom syrup.",
        },
        price: 42,
        image: "dish-dessert",
        tags: ["chef"],
        featured: true,
      },
      {
        id: "mouhalabieh",
        name: { ar: "مهلّبية بالفستق", en: "Mouhalabieh with pistachio" },
        description: {
          ar: "مهلّبية ناعمة بماء الورد والفستق المجروش.",
          en: "Silky milk pudding with rose water and crushed pistachio.",
        },
        price: 32,
        image: "dish-dessert",
        tags: ["vegetarian"],
      },
    ]),
    ...dishes("drinks", [
      {
        id: "lemon-mint",
        name: { ar: "ليمون بالنعناع", en: "Fresh lemon mint" },
        description: {
          ar: "ليمون طازج مخفوق مع النعناع والثلج.",
          en: "Fresh lemon blended with mint and ice.",
        },
        price: 24,
        image: "dish-drink",
        tags: ["vegetarian"],
      },
      {
        id: "coffee",
        name: { ar: "قهوة عربية", en: "Arabic coffee" },
        description: {
          ar: "قهوة بالهيل تُقدَّم في دلّة مع التمر.",
          en: "Cardamom coffee served in a dallah with dates.",
        },
        price: 18,
        image: "dish-drink",
        tags: [],
      },
      {
        id: "jallab",
        name: { ar: "جلّاب", en: "Jallab" },
        description: {
          ar: "دبس تمر وماء ورد على الثلج مع صنوبر وزبيب.",
          en: "Date molasses and rose water over ice with pine nuts and raisins.",
        },
        price: 26,
        image: "dish-drink",
        tags: ["vegetarian", "new"],
      },
    ]),
  ],
};
