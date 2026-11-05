import type { Content, OpeningDay, Review, Settings } from "../../../types";

// Smash Lab: a burger shop with pickup and delivery. All visible text is { ar, en }.

const openEveryDay: OpeningDay[] = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day,
  closed: false,
  open: "12:00",
  close: "23:30",
}));

export const seedSettings: Settings = {
  businessName: { ar: "سماش لاب", en: "Smash Lab" },
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
      ar: "برجر طازج يُحضَّر أمامك ويصلك ساخنًا",
      en: "Smashed fresh, delivered hot",
    },
    subtitle: {
      ar: "اطلب في دقيقتين، واختر الاستلام أو التوصيل، وتابع طلبك لحظة بلحظة من هاتفك.",
      en: "Order in two minutes, pick it up or get it delivered, and follow your order live from your phone.",
    },
    image: "burger-hero",
  },
  about: {
    title: { ar: "مطبخ صغير وبرجر كبير", en: "A small kitchen with a big burger" },
    text: {
      ar: "بدأ سماش لاب بشواية واحدة وفكرة بسيطة: نهرس اللحم الطازج على الحديد الساخن فيخرج بقشرة مقرمشة وعصارة كاملة. لا نجمّد لحمنا، ولا نحضّر البرجر قبل أن تطلبه.\n\nنعدّ الصلصات في المطبخ كل صباح، ونخبز البريوش طازجًا، ونوصل طلبك إلى بابك ساخنًا أو نجهّزه لك لتمرّ وتأخذه.",
      en: "Smash Lab started with one grill and a simple idea: press fresh beef onto hot iron so it comes out with a crisp crust and all its juice. We never freeze our beef and we never make a burger before you order it.\n\nWe prepare the sauces in our kitchen every morning, bake the brioche fresh, and either bring your order to your door hot or have it ready for you to pick up.",
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
        title: { ar: "اختر برجرك", en: "Choose your burger" },
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
      ar: "نستقبلك في فرع العليا يوميًا. راسلنا عبر واتساب للأسئلة السريعة أو للطلبات الكبيرة.",
      en: "Visit our Olaya branch every day. Message us on WhatsApp for quick questions or large orders.",
    },
  },
};

export const seedReviews: Review[] = [
  {
    id: "review-1",
    author: { ar: "سلطان العنزي", en: "Sultan Al-Anazi" },
    rating: 5,
    text: {
      ar: "وصل الطلب ساخنًا في أقل من نصف ساعة. الدبل سماش أفضل برجر جربته في الرياض.",
      en: "My order arrived hot in under half an hour. The Double Smash is the best burger I have had in Riyadh.",
    },
    visible: true,
  },
  {
    id: "review-2",
    author: { ar: "ريم الغامدي", en: "Reem Al-Ghamdi" },
    rating: 5,
    text: {
      ar: "أحب أنني أتابع طلبي على الصفحة ولا أضطر إلى الاتصال. وميلك شيك اللوتس رائع.",
      en: "I love following my order on the page instead of calling. And the Lotus shake is amazing.",
    },
    visible: true,
  },
  {
    id: "review-3",
    author: { ar: "بدر السبيعي", en: "Bader Al-Subaie" },
    rating: 5,
    text: {
      ar: "ترافل سماش وجبة مختلفة تمامًا. البطاطس بالجبن لا تُفوَّت.",
      en: "The Truffle Smash is on another level. Do not skip the cheese fries.",
    },
    visible: true,
  },
  {
    id: "review-4",
    author: { ar: "لينا الحربي", en: "Lina Al-Harbi" },
    rating: 4,
    text: {
      ar: "طلبت بوكس العائلة لأطفالي وانتهى في دقائق. أتمنى لو توسّعوا في مناطق التوصيل.",
      en: "I ordered the family box for my kids and it disappeared in minutes. I wish they delivered to more areas.",
    },
    visible: true,
  },
  {
    id: "review-5",
    author: { ar: "فيصل الدوسري", en: "Faisal Al-Dosari" },
    rating: 5,
    text: {
      ar: "طلبت للاستلام ووجدته جاهزًا لحظة وصولي. تنظيم ممتاز.",
      en: "I ordered for pickup and it was ready the moment I arrived. Very well organized.",
    },
    visible: true,
  },
  {
    id: "review-6",
    author: { ar: "نورة القحطاني", en: "Noura Al-Qahtani" },
    rating: 3,
    text: {
      ar: "الطعام لذيذ لكن الطلب تأخر قليلًا في ليلة الجمعة.",
      en: "Tasty food, but my order took a little longer on a Friday night.",
    },
    visible: false,
  },
];
