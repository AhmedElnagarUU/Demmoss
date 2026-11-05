import type { Content, OpeningDay, Review, Settings } from "../../../types";

// Zaytouna: a Levantine fine-dining restaurant. All visible text is { ar, en }.

const openEveryDay: OpeningDay[] = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day,
  closed: false,
  open: "13:00",
  close: "23:30",
}));

export const seedSettings: Settings = {
  businessName: { ar: "زيتونة", en: "Zaytouna" },
  nameEdited: false,
  palette: "olive",
  phone: "+966 11 555 0142",
  whatsapp: "966115550142",
  address: {
    ar: "طريق الأمير محمد بن سلمان، حي الياسمين، الرياض",
    en: "Prince Mohammed bin Salman Road, Al Yasmin District, Riyadh",
  },
  currency: "SAR",
  hours: openEveryDay,
};

export const seedContent: Content = {
  hero: {
    title: {
      ar: "نكهات شامية أصيلة لأجمل أمسياتك",
      en: "Levantine flavors, served for your best evenings",
    },
    subtitle: {
      ar: "وصفات عائلية وأطباق مشوية على الفحم وقاعة هادئة تليق بالعشاءات الطويلة. احجز طاولتك في ثوانٍ.",
      en: "Family recipes, fire-grilled dishes, and a calm room made for long dinners. Reserve your table in seconds.",
    },
    image: "hero-table",
  },
  about: {
    title: { ar: "حكاية الشيف ليلى حدّاد", en: "The story of Chef Layla Haddad" },
    text: {
      ar: "بدأت زيتونة في مطبخ بيت في دمشق، حيث تعلّمت الشيف ليلى حدّاد الطبخ إلى جانب جدّتها. كل وصفة في قائمتنا خرجت من تلك المائدة: تُطهى على مهل، وتُقدَّم بسخاء، وتُتبَّل باليد.\n\nاليوم نطبخ الطعام نفسه بأجود أنواع الضأن المحلي، وسمك يصلنا كل يوم، وزيت زيتون تعصره مزرعة عائلية في الأردن. نؤمن أن العشاء يجب أن يشبه دعوة إلى البيت.",
      en: "Zaytouna started in a home kitchen in Damascus, where Chef Layla Haddad learned to cook beside her grandmother. Every recipe on our menu comes from that table: slow-cooked, generous, and seasoned by hand.\n\nToday we cook the same food with the best local lamb, fish delivered daily, and olive oil pressed by a family farm in Jordan. We believe a dinner should feel like being invited home.",
    },
    image: "chef",
  },
  experience: {
    title: { ar: "أكثر من وجبة: أمسية كاملة", en: "More than a meal: an evening" },
    intro: {
      ar: "كل شيء في زيتونة مصمّم ليبقى مجلسك مكانًا للحديث والاحتفال والجلوس وقتًا أطول.",
      en: "Everything at Zaytouna is designed so your table stays a place to talk, celebrate, and stay a little longer.",
    },
    points: [
      {
        title: { ar: "قاعة خاصة تتسع لـ 20 ضيفًا", en: "A private room for 20" },
        text: {
          ar: "أعياد ميلاد وخطوبة وعشاءات عمل في قاعة لك وحدك مع مضيف مخصص.",
          en: "Birthdays, engagements, and business dinners in a room of your own, with a dedicated host.",
        },
      },
      {
        title: { ar: "عود حيّ كل خميس", en: "Live oud on Thursdays" },
        text: {
          ar: "عازف عود من الثامنة مساءً كل خميس، بصوت هادئ لا يمنع الحديث.",
          en: "A live oud player from 8 pm every Thursday, soft enough for conversation.",
        },
      },
      {
        title: { ar: "وصفات العائلة", en: "Family recipes" },
        text: {
          ar: "مرق يُطهى ببطء وكبّة تُشكَّل باليد وحلويات تُحضَّر كل صباح.",
          en: "Slow-cooked stocks, hand-rolled kibbeh, and desserts made each morning.",
        },
      },
    ],
  },
  contact: {
    title: { ar: "زرنا أو اتصل بنا أو راسلنا", en: "Find us, call us, or message us" },
    text: {
      ar: "موقف مجاني وخدمة صف السيارات أمام المطعم. راسلنا عبر واتساب للأسئلة السريعة.",
      en: "Free parking and valet in front of the restaurant. Message us on WhatsApp for quick questions.",
    },
  },
};

export const seedReviews: Review[] = [
  {
    id: "review-1",
    author: { ar: "نورة العتيبي", en: "Noura Al-Otaibi" },
    rating: 5,
    text: {
      ar: "احتفلنا بعيد ميلاد والدتي في القاعة الخاصة. الأوزي كان رائعًا والفريق انتبه لكل تفصيل.",
      en: "We celebrated my mother's birthday in the private room. The ouzi was perfect and the team remembered every detail.",
    },
    visible: true,
  },
  {
    id: "review-2",
    author: { ar: "عمر الخطيب", en: "Omar Al-Khatib" },
    rating: 5,
    text: {
      ar: "حجزت عبر الموقع بعد منتصف الليل وجاءني التأكيد صباحًا. المشاوي المشكّلة هي الأفضل في المدينة.",
      en: "I booked online after midnight and had my confirmation by morning. The mixed grill is the best in town.",
    },
    visible: true,
  },
  {
    id: "review-3",
    author: { ar: "سارة المنصور", en: "Sara Al-Mansour" },
    rating: 5,
    text: {
      ar: "هادئ ودافئ والكنافة لا تُنسى. مثالي للعشاء العائلي.",
      en: "Quiet, warm, and the kunafa is unforgettable. Perfect for a family dinner.",
    },
    visible: true,
  },
  {
    id: "review-4",
    author: { ar: "فيصل الحربي", en: "Faisal Al-Harbi" },
    rating: 4,
    text: {
      ar: "استضفنا عشاء عمل لاثني عشر شخصًا. كانت الخدمة سلسة والقائمة الخاصة مدروسة.",
      en: "We hosted a business dinner for twelve. Service was smooth and the private menu was well planned.",
    },
    visible: true,
  },
  {
    id: "review-5",
    author: { ar: "دينا الرفاعي", en: "Dina Al-Rifai" },
    rating: 5,
    text: {
      ar: "عزف العود يوم الخميس جعل ذكرى زواجنا مميزة.",
      en: "The live oud on Thursday made our anniversary special.",
    },
    visible: true,
  },
  {
    id: "review-6",
    author: { ar: "خالد الشهري", en: "Khaled Al-Shehri" },
    rating: 3,
    text: {
      ar: "الطعام لذيذ لكننا انتظرنا عشرين دقيقة على طاولتنا في وقت الذروة.",
      en: "Lovely food, but we waited twenty minutes for our table at a busy hour.",
    },
    visible: false,
  },
];
