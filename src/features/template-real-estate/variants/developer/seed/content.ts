import type { Content, Settings, Testimonial } from "../../../types";

// The starting content of the Rawasi demo: a Jeddah developer of villas, coastal homes, and penthouses.

export const seedSettings: Settings = {
  businessName: { ar: "رواسي للتطوير العقاري", en: "Rawasi Development" },
  nameEdited: false,
  palette: "sand",
  phone: "+966 12 000 0200",
  whatsapp: "966500000200",
  address: {
    ar: "طريق الأمير سلطان، حي الشاطئ، جدة",
    en: "Prince Sultan Road, Al Shati, Jeddah",
  },
  hours: {
    ar: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م · السبت: بموعد مسبق",
    en: "Sun – Thu: 9:00 am – 6:00 pm · Sat: by appointment",
  },
  mortgageRate: 5.5,
};

export const seedContent: Content = {
  hero: {
    title: { ar: "بيوت تشكّلها الطبيعة", en: "Homes shaped by their setting" },
    subtitle: {
      ar: "نصمّم وننفّذ فللًا ومنازل معمارية تستقر بهدوء في مكانها وتزداد جمالًا مع الوقت.",
      en: "We design and build villas and architectural homes that settle quietly into their setting and grow more beautiful with time.",
    },
  },
  about: {
    title: { ar: "بُنيت ببطء، لتُسكن لأجيال", en: "Built slowly, lived in for generations" },
    text: {
      ar: "تأسست رواسي عام ٢٠٠٩ على يد مجموعة صغيرة من المعماريين والمنفذين آمنوا بأن البيت استجابة لمكانه. نقبل عددًا محدودًا من المساكن كل عام، ليحظى كل مسكن باهتمامنا الكامل من أول زيارة للموقع حتى تسليم المفتاح.",
      en: "Rawasi was founded in 2009 by a small group of architects and builders who believed a home is a response to its place. We take on a limited number of residences each year, so every one gets our full attention from the first site visit to the key handover.",
    },
  },
  contact: {
    title: { ar: "احجز معاينة خاصة", en: "Book a private viewing" },
    text: {
      ar: "زر استوديو المبيعات أو المشروع نفسه. نعرض عليك الوحدات المتاحة حاليًا ونجيب عن كل سؤال.",
      en: "Visit the sales studio or the project itself. We show you the units available now and answer every question.",
    },
  },
};

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-harbi",
    name: { ar: "عبدالله وهند الحربي", en: "Abdullah and Hind Al-Harbi" },
    context: { ar: "فيلا قمة الهدا", en: "Hada Ridge Villa" },
    text: {
      ar: "فهموا المنحدر قبل أن يرسموا خطًا واحدًا. بعد عامين ما زال البيت يفاجئنا بضوء جديد كل صباح.",
      en: "They understood the slope before they drew a single line. Two years on, the house still surprises us with new light every morning.",
    },
    visible: true,
  },
  {
    id: "t-zahrani",
    name: { ar: "ماجد الزهراني", en: "Majed Al-Zahrani" },
    context: { ar: "بيت شاطئ أبحر", en: "Obhur Shore House" },
    text: {
      ar: "هادئون ودقيقون وصادقون. سُلّم المشروع في موعده وضمن الميزانية تمامًا، وقيل لي إن ذلك مستحيل.",
      en: "Calm, precise, and honest. The build finished on schedule and exactly on budget, which I had been told was impossible.",
    },
    visible: true,
  },
  {
    id: "t-sahli",
    name: { ar: "رنا السهلي", en: "Rana Al-Sahli" },
    context: { ar: "بنتهاوس أفق الكورنيش", en: "Corniche Skyline Penthouse" },
    text: {
      ar: "بنتهاوسنا هادئ بأجمل معاني الكلمة. كل مادة وكل وصلة تُظهر عناية أناس يحبون صنعتهم.",
      en: "Our penthouse feels quiet in the best sense. Every material and every junction shows the care of people who love their craft.",
    },
    visible: true,
  },
];

// The team shown on the site (fixed content, not edited in the dashboard).
export const seedTeam = [
  {
    id: "haifa",
    name: { ar: "م. هيفاء الشريف", en: "Eng. Haifa Al-Sharif" },
    role: { ar: "كبيرة المعماريين والمؤسِّسة", en: "Principal architect and founder" },
    photo: "team-haifa",
  },
  {
    id: "salman",
    name: { ar: "م. سلمان الغامدي", en: "Eng. Salman Al-Ghamdi" },
    role: { ar: "رئيس قسم التنفيذ", en: "Head of construction" },
    photo: "team-salman",
  },
  {
    id: "reema",
    name: { ar: "ريما باخشوين", en: "Reema Bakhashwain" },
    role: { ar: "مديرة التصميم الداخلي", en: "Interior director" },
    photo: "team-reema",
  },
] as const;
