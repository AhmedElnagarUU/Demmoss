import type { Content, Settings, Testimonial } from "../../../types";

// The starting content of the Solenne Estates demo: the source design's own business, a developer of villas,
// coastal homes, and penthouses. English is the source's text word for word; Arabic is natural Arabic.

export const seedSettings: Settings = {
  businessName: { ar: "سولين للعقارات", en: "Solenne Estates" },
  nameEdited: false,
  palette: "sand",
  phone: "+1 (555) 010-2090",
  whatsapp: "966500000200",
  address: {
    ar: "٢٤ لاندن رو، هالمارك ريدج، إكزامبل سيتي ٠٠٠٠٠",
    en: "24 Linden Row, Hallmark Ridge, Example City 00000",
  },
  hours: {
    ar: "الاثنين – الجمعة ٩:٠٠ – ١٨:٠٠ · السبت بموعد مسبق",
    en: "Mon – Fri 9:00 – 18:00 · Sat by appointment",
  },
  mortgageRate: 5.5,
};

export const seedContent: Content = {
  hero: {
    title: { ar: "بيوت تشكّلها الطبيعة", en: "Homes shaped by landscape" },
    subtitle: {
      ar: "نصمّم وننفّذ فللًا ومنازل معمارية تستقر بهدوء في مكانها وتزداد جمالًا مع الوقت.",
      en: "We design and build villas and architectural homes that sit quietly in their setting and grow more beautiful with time.",
    },
  },
  about: {
    title: { ar: "بُنيت ببطء، لتُسكن لأجيال", en: "Built slowly, lived in for generations" },
    text: {
      ar: "تأسست سولين للعقارات عام ٢٠٠٩ على يد مجموعة صغيرة من المعماريين والبنّائين آمنوا بأن البيت ينبغي أن يكون استجابة لمكانه. وبعد خمسة عشر عامًا ما زلنا صغارًا عن قصد، نتولى عددًا قليلًا من المساكن كل عام لينال كل منها اهتمامنا الكامل.",
      en: "Solenne Estates was founded in 2009 by a small group of architects and builders who believed a home should be a response to its place. Fifteen years on, we remain deliberately small, taking on a handful of residences each year so that every one receives our full attention.",
    },
  },
  contact: {
    title: { ar: "احجز معاينة", en: "Book a viewing" },
    text: {
      ar: "زر الاستوديو أو المسكن نفسه. نعرض عليك الوحدات المتاحة حاليًا ونجيب عن كل سؤال.",
      en: "Visit the studio or the residence itself. We show you what is available now and answer every question.",
    },
  },
};

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-amelia",
    name: { ar: "أميليا ويوناس هـ.", en: "Amelia & Jonas H." },
    context: { ar: "فيلا الغابة، هالمارك ريدج", en: "Forest Villa, Hallmark Ridge" },
    text: {
      ar: "فهموا سفح التلّ قبل أن يرسموا خطًا واحدًا. وبعد عامين ما زال البيت يفاجئنا بضوء جديد كل صباح.",
      en: "They understood the hillside before they drew a single line. Two years on, the house still surprises us with new light every morning.",
    },
    visible: true,
  },
  {
    id: "t-marcus",
    name: { ar: "ماركوس ت.", en: "Marcus T." },
    context: { ar: "منزل ساحلي، كيب ليندن", en: "Coastal Home, Cape Linden" },
    text: {
      ar: "هادئون ودقيقون وصادقون من البداية إلى النهاية. سُلّم المشروع في موعده وضمن الميزانية تمامًا، وقيل لي إن ذلك مستحيل.",
      en: "Calm, precise and honest throughout. The build finished on schedule and exactly on budget, which I had been told was impossible.",
    },
    visible: true,
  },
  {
    id: "t-priya",
    name: { ar: "بريا ن.", en: "Priya N." },
    context: { ar: "بنتهاوس المدينة، برج أوريليا", en: "City Penthouse, Aurelia Tower" },
    text: {
      ar: "بنتهاوسنا هادئ بأجمل معاني الكلمة. كل مادة وكل وصلة تُظهر عناية أناس يحبون صنعتهم حقًا.",
      en: "Our penthouse feels quiet in the best sense. Every material, every junction, shows the care of people who truly love their craft.",
    },
    visible: true,
  },
];

// The team shown on the site (fixed content, not edited in the dashboard).
export const seedTeam = [
  {
    id: "luca",
    name: { ar: "لوكا ماركيتي", en: "Luca Marchetti" },
    role: { ar: "كبير المعماريين", en: "Principal Architect" },
    photo: "team-luca",
  },
  {
    id: "daniel",
    name: { ar: "دانيال رييس", en: "Daniel Reyes" },
    role: { ar: "رئيس قسم التنفيذ", en: "Head of Construction" },
    photo: "team-daniel",
  },
  {
    id: "erik",
    name: { ar: "إريك ليندكفيست", en: "Erik Lindqvist" },
    role: { ar: "مدير التصميم الداخلي", en: "Interior Director" },
    photo: "team-erik",
  },
] as const;
