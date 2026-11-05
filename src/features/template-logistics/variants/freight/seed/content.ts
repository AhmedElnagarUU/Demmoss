import type { Rates } from "../../../modules/rates/types";
import type { Content, FaqItem, Settings, Testimonial } from "../../../types";

// Jisr Cargo: a Jeddah freight forwarder bringing cargo from China and Asia to Saudi Arabia and the Gulf. Prices in SAR.

export const seedSettings: Settings = {
  businessName: { ar: "جسر كارجو", en: "Jisr Cargo" },
  nameEdited: false,
  palette: "graphite",
  phone: "+966 12 555 0148",
  whatsapp: "966125550148",
  address: { ar: "شارع الميناء، حي الشرفية، جدة", en: "Port Street, Al-Sharafiyah, Jeddah" },
  currency: "SAR",
  officeOpen: "08:00",
  officeClose: "17:00",
};

export const seedContent: Content = {
  hero: {
    title: { ar: "نوصّل بضاعتك من آسيا إلى بابك", en: "We bring your cargo from Asia to your door" },
    subtitle: {
      ar: "شحن جوي وبحري وبري وبالقطار من الصين وآسيا إلى السعودية والخليج، مع تخليص جمركي كامل وتتبّع لكل خطوة.",
      en: "Air, sea, road and rail freight from China and Asia to Saudi Arabia and the Gulf, with customs cleared and every step tracked.",
    },
  },
  about: {
    title: { ar: "لوجستيات متكاملة من آسيا لأعمالك", en: "Complete logistics from Asia for your business" },
    text: {
      ar: "نتولى كل مراحل الشحن: التحقق من المورّد، والتجميع، والنقل الدولي، والتخليص الجمركي. عقد واحد، ومدير واحد، وبلا مفاجآت في الفاتورة.",
      en: "We handle every stage: supplier checks, consolidation, international transport and customs clearance. One contract, one manager, no surprises on the invoice.",
    },
  },
  contact: {
    title: { ar: "أخبرنا عن شحنتك", en: "Tell us about your cargo" },
    text: {
      ar: "اكتب لنا من أين تُشحن بضاعتك وإلى أين تريدها، وسيرد عليك مدير الحساب خلال ساعة في أوقات الدوام.",
      en: "Tell us where your cargo ships from and where it should go. An account manager replies within one hour during office hours.",
    },
  },
};

export const seedFaq: FaqItem[] = [
  {
    id: "faq-time",
    question: { ar: "كم تستغرق الشحنة من الصين إلى السعودية؟", en: "How long does a shipment from China to Saudi Arabia take?" },
    answer: {
      ar: "الشحن الجوي من 4 إلى 7 أيام، والقطار من 14 إلى 20 يومًا، والبري من 18 إلى 25 يومًا، والبحري من 28 إلى 40 يومًا حسب الميناء والموسم.",
      en: "Air freight takes 4 to 7 days, rail 14 to 20, road 18 to 25 and sea 28 to 40 days, depending on the port and the season.",
    },
  },
  {
    id: "faq-price",
    question: { ar: "كيف يُحسب السعر؟", en: "How is the price calculated?" },
    answer: {
      ar: "بحسب الوزن أو الحجم أيهما أكبر، ثم المسار ووسيلة النقل. تعطيك الحاسبة مدى السعر فورًا، ونرسل لك عرضًا ثابتًا يذكر كل الرسوم قبل أن تؤكد.",
      en: "By weight or volume, whichever is larger, then the route and the mode. The calculator gives you a price range at once, and we send a fixed quote listing every fee before you confirm.",
    },
  },
  {
    id: "faq-customs",
    question: { ar: "هل تتولون التخليص الجمركي؟", en: "Do you handle customs clearance?" },
    answer: {
      ar: "نعم. نجهّز البيانات الجمركية والشهادات المطلوبة، ونحسب الرسوم، ونتابع الإفراج عن البضاعة في الموانئ السعودية.",
      en: "Yes. We prepare the customs declarations and certificates, calculate the duties and follow the release of your cargo at Saudi ports.",
    },
  },
  {
    id: "faq-insurance",
    question: { ar: "هل بضاعتي مؤمَّنة؟", en: "Is my cargo insured?" },
    answer: {
      ar: "نعم، كل شحنة مغطاة من مستودع المورّد حتى تسليمها لك. ويتوفر تأمين شامل بقيمة البضاعة المصرَّح بها.",
      en: "Yes. Every shipment is covered from the supplier's warehouse until it is handed to you. Full cover for the declared value is available.",
    },
  },
  {
    id: "faq-minimum",
    question: { ar: "ما أصغر شحنة تقبلونها؟", en: "What is the smallest shipment you accept?" },
    answer: {
      ar: "لا يوجد حد أدنى للكمية، لكن لكل وسيلة نقل حد أدنى للرسوم. نجمّع الشحنات الصغيرة مع غيرها لنخفض التكلفة عليك.",
      en: "There is no minimum quantity, but each mode has a minimum charge. We consolidate small shipments with others to keep your cost down.",
    },
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-khalid",
    author: { ar: "خالد الحربي", en: "Khalid Al-Harbi" },
    role: { ar: "مدير المشتريات، فولتلاين للإلكترونيات", en: "Procurement manager, Voltline Electronics" },
    text: {
      ar: "وصلت آخر ثلاث حاويات قبل الموعد بأيام، وتولّت جسر كارجو التخليص دون أن نتصل بالجمارك مرة واحدة.",
      en: "Our last three containers arrived days ahead of plan, and Jisr Cargo cleared customs without us making a single call.",
    },
    visible: true,
  },
  {
    id: "t-reem",
    author: { ar: "ريم الغامدي", en: "Reem Al-Ghamdi" },
    role: { ar: "مؤسِّسة، دار الزين للمفروشات", en: "Founder, Dar Al-Zain Home Goods" },
    text: {
      ar: "جمّعوا بضاعة أربعين مورّدًا في شحنة واحدة فانخفضت تكلفة الشحن بنحو الربع. مدير الحساب أنقذنا أكثر من مرة.",
      en: "They consolidated forty suppliers into one shipment and our freight cost dropped by about a quarter. The account manager saved us more than once.",
    },
    visible: true,
  },
  {
    id: "t-omar",
    author: { ar: "عمر بكر", en: "Omar Bakr" },
    role: { ar: "مدير العمليات، بكر لقطع الغيار", en: "Operations director, Bakr Auto Parts" },
    text: {
      ar: "تتبّع واضح وأسعار صادقة. نقلنا كل شحناتنا الآسيوية إليهم خلال موسم واحد.",
      en: "Clear tracking and honest prices. We moved all our Asian freight to them within one season.",
    },
    visible: true,
  },
  {
    id: "t-lama",
    author: { ar: "لمى العتيبي", en: "Lama Al-Otaibi" },
    role: { ar: "المديرة التشغيلية، لمسة للأزياء", en: "COO, Lamsa Fashion" },
    text: {
      ar: "جوًّا للمجموعات الجديدة وبحرًا لإعادة التخزين، وكل شيء يُدار في مكان واحد. هذا ما تحتاجه علامة تجارية نامية.",
      en: "Air for new collections, sea for restocks, all managed in one place. Exactly what a growing brand needs.",
    },
    visible: true,
  },
];

// Calculator rates in SAR. The owner edits the four modes in the dashboard.
export const seedRates: Rates = {
  modes: [
    { mode: "air", ratePerKg: 16, volumetricKgPerCbm: 167, minimumCharge: 250, daysMin: 4, daysMax: 7 },
    { mode: "sea", ratePerKg: 1.2, volumetricKgPerCbm: 1000, minimumCharge: 350, daysMin: 28, daysMax: 40 },
    { mode: "road", ratePerKg: 4, volumetricKgPerCbm: 333, minimumCharge: 300, daysMin: 18, daysMax: 25 },
    { mode: "rail", ratePerKg: 2.8, volumetricKgPerCbm: 500, minimumCharge: 320, daysMin: 14, daysMax: 20 },
  ],
  origins: [
    { id: "shanghai", name: { ar: "شنغهاي، الصين", en: "Shanghai, China" }, factor: 1 },
    { id: "shenzhen", name: { ar: "شنتشن، الصين", en: "Shenzhen, China" }, factor: 1 },
    { id: "guangzhou", name: { ar: "قوانغتشو، الصين", en: "Guangzhou, China" }, factor: 1.03 },
    { id: "ningbo", name: { ar: "نينغبو، الصين", en: "Ningbo, China" }, factor: 1.02 },
    { id: "yiwu", name: { ar: "ييوو، الصين", en: "Yiwu, China" }, factor: 1.08 },
    { id: "hcmc", name: { ar: "مدينة هو تشي منه، فيتنام", en: "Ho Chi Minh City, Vietnam" }, factor: 1.15 },
  ],
  destinations: [
    { id: "jeddah", name: { ar: "جدة، السعودية", en: "Jeddah, Saudi Arabia" }, factor: 1, extraDays: 0 },
    { id: "dammam", name: { ar: "الدمام، السعودية", en: "Dammam, Saudi Arabia" }, factor: 1.05, extraDays: 2 },
    { id: "riyadh", name: { ar: "الرياض، السعودية", en: "Riyadh, Saudi Arabia" }, factor: 1.1, extraDays: 3 },
    { id: "dubai", name: { ar: "جبل علي، دبي", en: "Jebel Ali, Dubai" }, factor: 0.95, extraDays: 1 },
    { id: "kuwait", name: { ar: "الكويت", en: "Kuwait City" }, factor: 1.15, extraDays: 4 },
    { id: "muscat", name: { ar: "مسقط، عُمان", en: "Muscat, Oman" }, factor: 1.1, extraDays: 3 },
  ],
};
