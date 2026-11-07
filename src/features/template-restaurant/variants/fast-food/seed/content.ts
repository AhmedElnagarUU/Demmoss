import type { Content, OpeningDay, Review, Settings } from "../../../types";

// Sole Trattoria: a family-owned pizza and pasta restaurant with pickup and delivery. All visible text is { ar, en }.

const openEveryDay: OpeningDay[] = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day,
  closed: false,
  open: "12:00",
  close: "22:30",
}));

export const seedSettings: Settings = {
  businessName: { ar: "سولي تراتوريا", en: "Sole Trattoria" },
  nameEdited: false,
  palette: "tomato",
  phone: "+966 11 555 0188",
  whatsapp: "966115550188",
  address: {
    ar: "طريق العليا، حي العليا، الرياض",
    en: "Olaya Street, Al Olaya District, Riyadh",
  },
  currency: "SAR",
  hours: openEveryDay,
};

export const seedContent: Content = {
  hero: {
    title: {
      ar: "بيتزا وباستا",
      en: "PIZZA & PASTA",
    },
    subtitle: {
      ar: "عجينة ممدودة باليد وصلصة طماطم مطهوة ببطء ومعكرونة تُفرد كل صباح. شمس إيطاليا على طبقك منذ 1998.",
      en: "Hand-stretched dough, slow tomato sauce and pasta rolled every morning. Italian sunshine on your plate, since 1998.",
    },
    image: "pizza-hero",
  },
  about: {
    title: {
      ar: "مائدة مشمسة للعائلة والأصدقاء",
      en: "A Sunlit Table for Family & Friends",
    },
    text: {
      ar: "في سولي تراتوريا نطبخ كما كبرنا: بسيط، موسمي، وكريم. من أول عجينة في الصباح إلى آخر إسبريسو في الليل، كل طبق يُحضَّر ليجمع الناس حول المائدة.",
      en: "At Sole Trattoria we cook the way we grew up: simple, seasonal and generous. From the first dough of the morning to the last espresso of the night, every plate is made to bring people closer.",
    },
    image: "dining-room",
  },
  // for fast food this block is "How it works"
  experience: {
    title: { ar: "اطلب، تابع، استمتع", en: "Order, track, enjoy" },
    intro: {
      ar: "ثلاث خطوات بسيطة، من غير تطبيق ومن غير تسجيل.",
      en: "Three simple steps, with no app and no sign-up.",
    },
    points: [
      {
        title: { ar: "اختر بيتزتك أو معكرونتك", en: "Choose your pizza or pasta" },
        text: {
          ar: "تصفّح القائمة وأضف ما تحب إلى السلّة، ولا تفوّت عروض اليوم.",
          en: "Browse the menu, add what you like to the cart, and check today's offers.",
        },
      },
      {
        title: { ar: "استلام أو توصيل", en: "Pickup or delivery" },
        text: {
          ar: "مرّ وخذ طلبك، أو اختر منطقتك ونوصله إليك. وتدفع عند الاستلام.",
          en: "Pick it up, or choose your area and we bring it to you. You pay on receipt.",
        },
      },
      {
        title: { ar: "تابعه مباشرة", en: "Follow it live" },
        text: {
          ar: "صفحة خاصة بطلبك تتغير حالتها لحظة بلحظة، فلا تحتاج إلى الاتصال بنا.",
          en: "Your order gets its own page that updates as we work, so you never need to call us.",
        },
      },
    ],
  },
  contact: {
    title: { ar: "زرنا أو اتصل بنا أو راسلنا", en: "Find us, call us, or message us" },
    text: {
      ar: "نستقبلك في فرع العليا يوميًا. تعال لتذوق البيتزا من فرن الحطب والمعكرونة الطازجة، وراسلنا عبر واتساب للأسئلة السريعة أو للطلبات الكبيرة.",
      en: "Visit our Olaya branch every day. Come for wood-fired pizza and fresh pasta, and message us on WhatsApp for quick questions or large orders.",
    },
  },
};

export const seedReviews: Review[] = [
  {
    id: "review-1",
    author: { ar: "مارتا ر.", en: "Marta R." },
    role: { ar: "مرشدة محلية", en: "Local guide" },
    rating: 5,
    text: {
      ar: "المارغريتا أفضل ما تذوقته خارج نابولي. أطراف مقرمشة وموزاريلا كريمية وريحان طازج. عدنا مرتين هذا الأسبوع.",
      en: "The margherita is the best I've had outside Naples. Crisp edges, creamy mozzarella, fresh basil. We came back twice this week.",
    },
    visible: true,
  },
  {
    id: "review-2",
    author: { ar: "دانيال ك.", en: "Daniel K." },
    role: { ar: "زبون دائم", en: "Regular" },
    rating: 5,
    text: {
      ar: "التالياتيلي بالراجو طعمها كغداء الأحد عند جدتي. خدمة دافئة وقاعة مشرقة وجميلة.",
      en: "Tagliatelle al ragu tasted like Sunday at my grandmother's. Warm service and a gorgeous bright dining room.",
    },
    visible: true,
  },
  {
    id: "review-3",
    author: { ar: "صوفيا ل.", en: "Sofia L." },
    role: { ar: "زائرة موثّقة", en: "Verified diner" },
    rating: 4,
    text: {
      ar: "مكان رائع لعيد ميلاد عائلي. أحب الأطفال البيتزا وأحببنا التيراميسو. احجزوا مسبقًا في عطلة الأسبوع.",
      en: "Great for a family birthday. Kids loved the pizza, we loved the tiramisu. Book ahead on weekends.",
    },
    visible: true,
  },
];
