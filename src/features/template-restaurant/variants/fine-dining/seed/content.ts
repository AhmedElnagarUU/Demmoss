import type { Content, OpeningDay, Review, Settings } from "../../../types";

// Verdant Table: a farm-to-table modern Mediterranean restaurant (theme-sources/03-verdant-table.html).
// All visible text is { ar, en }. In a hero title, the word between *stars* is the gold italic accent word.

// Source opening hours: Tuesday to Thursday 17:00-22:00, Friday and Saturday 17:00-23:30, Sunday brunch 11:00-15:00,
// Monday closed. day: 0 = Sunday ... 6 = Saturday.
const hours: OpeningDay[] = [
  { day: 0, closed: false, open: "11:00", close: "15:00" },
  { day: 1, closed: true, open: "17:00", close: "22:00" },
  { day: 2, closed: false, open: "17:00", close: "22:00" },
  { day: 3, closed: false, open: "17:00", close: "22:00" },
  { day: 4, closed: false, open: "17:00", close: "22:00" },
  { day: 5, closed: false, open: "17:00", close: "23:30" },
  { day: 6, closed: false, open: "17:00", close: "23:30" },
];

export const seedSettings: Settings = {
  businessName: { ar: "فيردانت تيبل", en: "Verdant Table" },
  nameEdited: false,
  palette: "verdant",
  phone: "(555) 010-0142",
  whatsapp: "966115550142",
  address: {
    ar: "12 طريق البستان، غرينفيلد",
    en: "12 Orchard Lane, Greenfield",
  },
  currency: "SAR",
  hours,
};

export const seedContent: Content = {
  hero: {
    title: {
      ar: "مواسم تُقدَّم *ببساطة* على المائدة",
      en: "Seasons, set *simply* on the table",
    },
    subtitle: {
      ar: "فيردانت تيبل مطبخ متوسطي حديث يطبخ من الأرض إلى الطبق. كل طبق يبدأ بمزرعة صغيرة، وحصاد صباحي ناضج، ونار هادئة.",
      en: "Verdant Table is a modern Mediterranean kitchen cooking from the ground up. Every plate begins with a small farm, a ripe morning harvest and a slow fire.",
    },
    image: "hero-table",
  },
  about: {
    title: { ar: "قصتنا", en: "Our Story" },
    text: {
      ar: "بدأ فيردانت تيبل بشجرة زيتون واحدة، وفرن حطب، وإيمان بأن الطعام الجيد يجب أن يحمل طعم الأرض التي نبت فيها. نطبخ مما تهديه إلينا المزارع المجاورة كل صباح، ونزيّن أطباقنا بالأعشاب والحمضيات وزيت الزيتون الجيد. لا استعجال، ولا شيء مخفي.",
      en: "Verdant Table began with a single olive tree, a wood oven and a belief that good food should taste of where it grew. We cook with what the neighbouring farms hand us each morning, finishing plates with herbs, citrus and good oil. Nothing hurried, nothing hidden.",
    },
    image: "dish-plate",
  },
  experience: {
    title: { ar: "نطبخ من الأرض إلى الطبق", en: "Cooking from the ground up" },
    intro: {
      ar: "كل طبق يبدأ بمزرعة صغيرة، وحصاد صباحي ناضج، ونار هادئة.",
      en: "Every plate begins with a small farm, a ripe morning harvest and a slow fire.",
    },
    points: [
      {
        title: { ar: "مزرعة صغيرة", en: "A small farm" },
        text: {
          ar: "نطبخ مما تهديه إلينا المزارع المجاورة كل صباح.",
          en: "We cook with what the neighbouring farms hand us each morning.",
        },
      },
      {
        title: { ar: "حصاد صباحي ناضج", en: "A ripe morning harvest" },
        text: {
          ar: "نُنهي الأطباق بالأعشاب والحمضيات وزيت الزيتون الجيد. لا استعجال ولا شيء مخفي.",
          en: "Plates are finished with herbs, citrus and good oil. Nothing hurried, nothing hidden.",
        },
      },
      {
        title: { ar: "نار هادئة", en: "A slow fire" },
        text: {
          ar: "فرن حطب، وإيمان بأن الطعام الجيد يجب أن يحمل طعم أرضه.",
          en: "A wood oven and a belief that good food should taste of where it grew.",
        },
      },
    ],
  },
  contact: {
    title: { ar: "زورونا", en: "Find us" },
    text: {
      ar: "انضموا إلينا على العشاء. سنتصل بكم لتأكيد الحجز.",
      en: "Join us for dinner. We will confirm by phone.",
    },
  },
};

export const seedReviews: Review[] = [
  {
    id: "review-1",
    author: { ar: "نورة العتيبي", en: "Noura Al-Otaibi" },
    rating: 5,
    text: {
      ar: "سلطة الحديقة كأنها قُطفت قبل ساعة. جلسنا حتى الحلوى دون أن ننظر إلى الساعة.",
      en: "The garden salad tasted like it was picked an hour before. We stayed through dessert without checking the time.",
    },
    visible: true,
  },
  {
    id: "review-2",
    author: { ar: "عمر الخطيب", en: "Omar Al-Khatib" },
    rating: 5,
    text: {
      ar: "حجزت عبر الموقع بعد منتصف الليل واتصلوا بي صباحًا للتأكيد. لحم الضأن المشوي على النار هو الأفضل هذا العام.",
      en: "I booked online after midnight and got the confirmation call by morning. The fire-roasted lamb is the best I have had this year.",
    },
    visible: true,
  },
  {
    id: "review-3",
    author: { ar: "سارة المنصور", en: "Sara Al-Mansour" },
    rating: 5,
    text: {
      ar: "هادئ ودافئ وكعكة زيت الزيتون لا تُنسى. مثالي للعشاء العائلي.",
      en: "Quiet, warm, and the olive oil cake is unforgettable. Perfect for a family dinner.",
    },
    visible: true,
  },
  {
    id: "review-4",
    author: { ar: "فيصل الحربي", en: "Faisal Al-Harbi" },
    rating: 4,
    text: {
      ar: "استضفنا عشاءً لاثني عشر شخصًا. صمّم المطبخ قائمة ثابتة حول الحصاد وكانت الخدمة سلسة.",
      en: "We hosted a dinner for twelve. The kitchen planned a set menu around the harvest and service was smooth.",
    },
    visible: true,
  },
  {
    id: "review-5",
    author: { ar: "دينا الرفاعي", en: "Dina Al-Rifai" },
    rating: 5,
    text: {
      ar: "برانش الأحد جعل ذكرى زواجنا مميزة.",
      en: "The Sunday brunch made our anniversary special.",
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
