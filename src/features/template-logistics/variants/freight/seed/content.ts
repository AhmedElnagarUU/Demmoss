import type { Rates } from "../../../modules/rates/types";
import type { Content, FaqItem, Settings, Testimonial } from "../../../types";

// Orbis Cargo: an import freight forwarder moving cargo from China and Asia door to door. Prices in SAR.

export const seedSettings: Settings = {
  businessName: { ar: "أوربس كارجو", en: "Orbis Cargo" },
  nameEdited: false,
  palette: "graphite",
  phone: "+1 555 014 2200",
  whatsapp: "15550142200",
  address: { ar: "شارع الميناء 100، جناح 12", en: "100 Harbor Street, Suite 12" },
  currency: "SAR",
  officeOpen: "09:00",
  officeClose: "21:00",
};

export const seedContent: Content = {
  hero: {
    title: { ar: "نأخذ أعمالك\nإلى أبعد", en: "We move your business\nfurther" },
    subtitle: {
      ar: "توصيل بضائع موثوق ومتكامل من آسيا جوًّا وبحرًا وبرًّا وبالسكك الحديدية. من فحص المورّد حتى باب مستودعك.",
      en: "Reliable turnkey cargo delivery from Asia by air, sea, road and rail. From supplier check to your warehouse door.",
    },
  },
  about: {
    title: { ar: "لوجستيات متكاملة من آسيا\nلأعمالك", en: "Complete logistics from Asia\nfor your business" },
    text: {
      ar: "نتولى كل مرحلة من مراحل التسليم: التوريد، والتحقق من المورّد، والتجميع، والنقل الدولي، والتخليص الجمركي. عقد واحد، ومدير واحد، وبلا مفاجآت.",
      en: "We take care of every stage of delivery: sourcing, supplier verification, consolidation, international transport and customs clearance. One contract, one manager, no surprises.",
    },
  },
  contact: {
    title: { ar: "حدّثنا عن بضاعتك", en: "Tell us about your cargo" },
    text: {
      ar: "املأ النموذج وسنتواصل معك خلال ساعة.",
      en: "Fill in the form and we will contact you within one hour.",
    },
  },
};

export const seedFaq: FaqItem[] = [
  {
    id: "faq-time",
    question: {
      ar: "كم يستغرق التوصيل من الصين؟",
      en: "How long does delivery from China take?",
    },
    answer: {
      ar: "الشحن الجوي من 4 إلى 7 أيام، والسككي من 14 إلى 20، والبري من 18 إلى 25، والبحري من 28 إلى 40 يومًا حسب المسار والموسم.",
      en: "Air freight takes 4–7 days, rail 14–20, road 18–25 and sea 28–40 days depending on the route and season.",
    },
  },
  {
    id: "faq-insurance",
    question: { ar: "هل بضاعتي مؤمَّنة؟", en: "Is my cargo insured?" },
    answer: {
      ar: "نعم. كل شحنة مغطاة من مستودع المورّد حتى تسليمها لك. ويتوفر تأمين شامل ضد جميع المخاطر.",
      en: "Yes. Every shipment is covered from the supplier warehouse until handover to you. Extended all-risk coverage is available.",
    },
  },
  {
    id: "faq-customs",
    question: { ar: "هل تتولون التخليص الجمركي؟", en: "Do you handle customs clearance?" },
    answer: {
      ar: "نجهّز كل المستندات، ونحسب الرسوم، ونخلّص بضاعتك جمركيًا، بما في ذلك الشهادات المطلوبة.",
      en: "We prepare all documents, calculate duties and clear your cargo through customs, including certification where required.",
    },
  },
  {
    id: "faq-minimum",
    question: { ar: "ما أصغر حجم شحنة تقبلونها؟", en: "What is the minimum shipment size?" },
    answer: {
      ar: "لا يوجد حد أدنى صارم. نجمّع الطرود الصغيرة مع شحنات أخرى للحفاظ على أسعار منخفضة.",
      en: "There is no strict minimum. Small parcels are consolidated with other cargo to keep rates low.",
    },
  },
  {
    id: "faq-supplier",
    question: { ar: "هل يمكنكم فحص المورّد قبل الدفع؟", en: "Can you check my supplier before payment?" },
    answer: {
      ar: "نعم. يتحقق فريقنا في آسيا من تسجيل الشركة، ويزور المصنع، ويفحص البضاعة عند الطلب.",
      en: "Yes. Our team in Asia verifies company registration, visits the factory and inspects the goods on request.",
    },
  },
  {
    id: "faq-tracking",
    question: { ar: "كيف أتتبّع شحنتي؟", en: "How can I track my shipment?" },
    answer: {
      ar: "تستلم رابط تتبّع وتحديثات الحالة عند كل مرحلة، ومديرك متاح في أي وقت.",
      en: "You receive a tracking link and status updates at each milestone, and your manager is available any time.",
    },
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-daniel",
    author: { ar: "دانيال رييس", en: "Daniel Reyes" },
    role: { ar: "مدير المشتريات، فولتلاين", en: "Head of Procurement, Voltline" },
    sector: { ar: "متجر إلكترونيات", en: "Electronics retailer" },
    text: {
      ar: "وصلت آخر ثلاث حاويات لدينا قبل الموعد بأيام. وتولّت أوربس التخليص الجمركي دون مكالمة واحدة من طرفنا.",
      en: "Our last three containers arrived days ahead of plan. Orbis handled customs without a single call from our side.",
    },
    visible: true,
  },
  {
    id: "t-amelia",
    author: { ar: "أميليا براندت", en: "Amelia Brandt" },
    role: { ar: "المؤسِّسة، نوردهاوس ليفينغ", en: "Founder, Nordhaus Living" },
    sector: { ar: "علامة مستلزمات منزلية", en: "Home goods brand" },
    text: {
      ar: "جمّعوا أربعين مورّدًا في شحنة واحدة فانخفضت تكلفة الشحن لدينا بمقدار الربع. مدير الحساب الخاص أنقذنا فعلًا.",
      en: "Consolidating forty suppliers into one shipment cut our freight cost by a quarter. The personal manager is a real lifesaver.",
    },
    visible: true,
  },
  {
    id: "t-marcus",
    author: { ar: "ماركوس هيل", en: "Marcus Hale" },
    role: { ar: "مدير العمليات، هيل موتورز", en: "Operations Director, Hale Motors" },
    sector: { ar: "موزّع قطع غيار سيارات", en: "Auto parts distributor" },
    text: {
      ar: "تتبّع واضح وأسعار صادقة. نقلنا كل شحناتنا الآسيوية إلى أوربس في موسم واحد.",
      en: "Transparent tracking and honest pricing. We moved all our Asian freight to Orbis within one season.",
    },
    visible: true,
  },
  {
    id: "t-priya",
    author: { ar: "بريا ناير", en: "Priya Nair" },
    role: { ar: "المديرة التشغيلية، ستوديو أوريلي", en: "COO, Studio Aurelle" },
    sector: { ar: "متجر أزياء إلكتروني", en: "Fashion e-commerce" },
    text: {
      ar: "الشحن الجوي للمجموعات الجديدة، والبحري لإعادة التخزين — كل ذلك يُدار في مكان واحد. بالضبط ما تحتاجه علامة تجارية نامية.",
      en: "Air freight for new collections, sea for restocks — all managed in one place. Exactly what a growing brand needs.",
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
    { id: "yiwu", name: { ar: "ييوو، الصين", en: "Yiwu, China" }, factor: 1.08 },
    { id: "beijing", name: { ar: "بكين، الصين", en: "Beijing, China" }, factor: 1.12 },
    {
      id: "hcmc",
      name: { ar: "مدينة هو تشي منه، فيتنام", en: "Ho Chi Minh City, Vietnam" },
      factor: 1.15,
    },
    { id: "seoul", name: { ar: "سيول، كوريا الجنوبية", en: "Seoul, South Korea" }, factor: 1.2 },
  ],
  destinations: [
    { id: "warsaw", name: { ar: "وارساو، بولندا", en: "Warsaw, Poland" }, factor: 1, extraDays: 0 },
    { id: "hamburg", name: { ar: "هامبورغ، ألمانيا", en: "Hamburg, Germany" }, factor: 1.1, extraDays: 0 },
    {
      id: "rotterdam",
      name: { ar: "روتردام، هولندا", en: "Rotterdam, Netherlands" },
      factor: 1.1,
      extraDays: 0,
    },
    { id: "london", name: { ar: "لندن، المملكة المتحدة", en: "London, UK" }, factor: 1.2, extraDays: 0 },
    { id: "dubai", name: { ar: "دبي، الإمارات", en: "Dubai, UAE" }, factor: 0.9, extraDays: 0 },
    {
      id: "newyork",
      name: { ar: "نيويورك، الولايات المتحدة", en: "New York, USA" },
      factor: 1.4,
      extraDays: 0,
    },
  ],
};
