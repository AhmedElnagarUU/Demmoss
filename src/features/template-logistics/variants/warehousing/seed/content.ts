import type { CaseStudy } from "../../../modules/case-studies/types";
import type { StorageRates } from "../../../modules/storage-rates/types";
import type { Warehouse } from "../../../modules/warehouses/types";
import type { Content, FaqItem, Settings, Testimonial } from "../../../types";

// Makhzan 3PL: pallet storage and e-commerce fulfilment in Riyadh and Jebel Ali. Prices in SAR.

export const seedSettings: Settings = {
  businessName: { ar: "مخزن", en: "Makhzan 3PL" },
  nameEdited: false,
  palette: "red",
  phone: "+966 11 555 0172",
  whatsapp: "966115550172",
  address: {
    ar: "المدينة الصناعية الثانية، الرياض",
    en: "Second Industrial City, Riyadh",
  },
  currency: "SAR",
  officeOpen: "08:00",
  officeClose: "17:00",
};

export const seedContent: Content = {
  hero: {
    title: {
      ar: "تخزين وتجهيز لوجستي بلا تأخير ولا تكاليف خفية",
      en: "Reliable storage and 3PL fulfilment without delays or hidden costs",
    },
    subtitle: {
      ar: "تحكّم كامل في كل مرحلة. نعمل وفق معايير صارمة ونسلّم في الموعد، من مستودعين في الرياض وجبل علي.",
      en: "Full control at every stage. We operate to strict standards and deliver on time, from two warehouses in Riyadh and Jebel Ali.",
    },
  },
  about: {
    title: { ar: "شريكك اللوجستي منذ أكثر من 20 عامًا", en: "Your logistics partner for more than 20 years" },
    text: {
      ar: "نخزّن بضاعتك ونجهّز طلباتك ونوصلها لعملائك، بتسعير شهري واضح وفريق يرد عليك في اليوم نفسه.",
      en: "We store your goods, pick your orders and deliver them to your customers, with clear monthly pricing and a team that answers the same day.",
    },
  },
  contact: {
    title: { ar: "كم طبلية تحتاج؟", en: "How many pallets do you need?" },
    text: {
      ar: "قدّر تكلفتك الشهرية ثم أرسل لنا الطلب. يتصل بك مدير الحساب خلال يوم عمل.",
      en: "Estimate your monthly cost, then send us the request. An account manager calls you within one working day.",
    },
  },
};

export const seedFaq: FaqItem[] = [
  {
    id: "faq-minimum",
    question: { ar: "ما أقصر مدة تخزين؟", en: "What is the minimum storage period?" },
    answer: {
      ar: "لا يوجد التزام طويل. يمكنك حجز الطبليات من شهر واحد، وتحصل على سعر أفضل كلما طالت المدة.",
      en: "There is no long lock-in. You can book pallet space from one month, with better rates for longer periods.",
    },
  },
  {
    id: "faq-accounting",
    question: {
      ar: "ما طرق محاسبة المخزون المتاحة؟",
      en: "Which inventory accounting methods do you support?",
    },
    answer: {
      ar: "الوارد أولًا يصرف أولًا، والوارد أخيرًا يصرف أولًا، وحسب الدفعة، وحسب الرقم التسلسلي، وحسب تاريخ الانتهاء، ويُضبط لكل منتج.",
      en: "FIFO, LIFO, by batch, by serial number and by expiry date, configured per product.",
    },
  },
  {
    id: "faq-appointments",
    question: {
      ar: "كيف تعمل مواعيد الاستلام والشحن؟",
      en: "How do receiving and shipping appointments work?",
    },
    answer: {
      ar: "تحجز الموعد عبر مدير حسابك ونؤكده خلال ساعات، ثم نتابع وصول الشاحنة عند البوابة.",
      en: "Book a slot through your account manager. We confirm within hours and track the truck on arrival.",
    },
  },
  {
    id: "faq-returns",
    question: { ar: "هل تتعاملون مع المرتجعات؟", en: "Can you handle returns and repackaging?" },
    answer: {
      ar: "نعم. نفحص المرتجعات ونصنّفها ونعيد وضع الملصقات ونعيدها للمخزون أو نتلفها وفق قواعدك.",
      en: "Yes. Returns are inspected, graded, relabelled and restocked or disposed of according to your rules.",
    },
  },
  {
    id: "faq-insurance",
    question: { ar: "هل مخزوني مؤمَّن؟", en: "Is my stock insured?" },
    answer: {
      ar: "المسؤولية الأساسية مشمولة. وتتوفر تغطية كاملة للبضاعة كخيار إضافي في المقدّر أعلاه.",
      en: "Basic liability is included. Full cargo insurance is available as an add-on in the estimator above.",
    },
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-sultan",
    author: { ar: "سلطان المطيري", en: "Sultan Al-Mutairi" },
    role: { ar: "مؤسس، زهرة للأثاث المنزلي", en: "Founder, Zahra Home Brands" },
    text: {
      ar: "في موسم يوم التأسيس تضاعفت طلباتنا ثلاث مرات وخرجت كلها في موعدها دون أن نستأجر مساحة إضافية.",
      en: "Our orders tripled around Founding Day and every one went out on time, without us renting extra space.",
    },
    visible: true,
  },
  {
    id: "t-dalal",
    author: { ar: "دلال الشهري", en: "Dalal Al-Shehri" },
    role: { ar: "المديرة التنفيذية، نخلة للتمور", en: "CEO, Nakhla Dates" },
    text: {
      ar: "نظام الدفعات وتاريخ الانتهاء أنهى الهالك تقريبًا. أعرف كل يوم ما الذي يجب أن يخرج أولًا.",
      en: "Batch and expiry tracking almost ended our write-offs. I know every day what has to leave first.",
    },
    visible: true,
  },
  {
    id: "t-majed",
    author: { ar: "ماجد العنزي", en: "Majed Al-Anazi" },
    role: { ar: "مدير العمليات، رمال للإلكترونيات", en: "Operations director, Rimal Electronics" },
    text: {
      ar: "تقارير المخزون تصلني جاهزة، وأستطيع أن أعرف سعر أي توسّع قبل أن أتصل بهم.",
      en: "The stock reports arrive ready, and I can price any expansion before I even call them.",
    },
    visible: true,
  },
  {
    id: "t-hanan",
    author: { ar: "حنان الزهراني", en: "Hanan Al-Zahrani" },
    role: { ar: "مؤسسة، سما للأطفال", en: "Founder, Sama Kids" },
    text: {
      ar: "المرتجعات كانت كابوسًا، والآن تُفحص وتعود للرف في يومين.",
      en: "Returns used to be a nightmare. Now they are inspected and back on the shelf in two days.",
    },
    visible: true,
  },
];

export const seedWarehouses: Warehouse[] = [
  {
    id: "riyadh",
    name: { ar: "مركز الرياض", en: "Riyadh Hub" },
    address: {
      ar: "طريق الخرج، المدينة الصناعية الثانية، الرياض",
      en: "Al-Kharj Road, Second Industrial City, Riyadh",
    },
    areaM2: 3200,
    rackHeightM: 8,
    dockDoors: 12,
    capacityPallets: 4200,
    occupiedPallets: 3860,
  },
  {
    id: "jebel-ali",
    name: { ar: "ملحق جبل علي", en: "Jebel Ali Annex" },
    address: { ar: "المنطقة الحرة بجبل علي، دبي", en: "Jebel Ali Free Zone, Dubai" },
    areaM2: 1800,
    rackHeightM: 6,
    dockDoors: 6,
    capacityPallets: 2400,
    occupiedPallets: 1150,
  },
];

// Estimator rates in SAR. The owner edits them in the dashboard.
export const seedStorageRates: StorageRates = {
  palletPerMonth: 38,
  discount6Months: 0.08,
  discount12Months: 0.15,
  handlingPerMonth: 150,
  pickingPerOrder: 3.5,
  insurancePercent: 2,
  minimumMonthly: 1200,
};

export const seedCaseStudies: CaseStudy[] = [
  {
    id: "case-retail",
    sector: { ar: "التجزئة", en: "Retail" },
    title: {
      ar: "تقليص زمن التجهيز لعلامة أثاث منزلي سريعة النمو",
      en: "Cutting pick times for a fast-growing home goods brand",
    },
    text: {
      ar: "أعدنا ترتيب 4,000 صنف على الرفوف واعتمدنا التجهيز بالمناطق في المستودعين.",
      en: "We re-slotted 4,000 SKUs and introduced zone picking across both sites.",
    },
    metricValue: "-38%",
    metricLabel: { ar: "زمن دورة الطلب", en: "order cycle time" },
    visible: true,
  },
  {
    id: "case-food",
    sector: { ar: "الأغذية والمشروبات", en: "Food & beverage" },
    title: {
      ar: "تخزين بتحكّم في تاريخ الانتهاء لموزّع تمور وحلويات",
      en: "Expiry-controlled storage for a dates and sweets distributor",
    },
    text: {
      ar: "المحاسبة بأقرب انتهاء أولًا وتتبّع الدفعات أنهيا الهالك تقريبًا.",
      en: "First-expiry-first-out accounting and batch tracking removed write-offs almost entirely.",
    },
    metricValue: "-92%",
    metricLabel: { ar: "هالك المخزون", en: "stock write-offs" },
    visible: true,
  },
  {
    id: "case-ecommerce",
    sector: { ar: "التجارة الإلكترونية", en: "E-commerce" },
    title: {
      ar: "التوسع في موسم الذروة دون تكاليف ثابتة إضافية",
      en: "Peak-season scaling without extra fixed costs",
    },
    text: {
      ar: "مساحة طبليات مرنة وتجميع الحزم استوعبا ثلاثة أضعاف الطلبات في موسم الأعياد في موعدها.",
      en: "Flexible pallet space and kitting handled a threefold holiday surge on time.",
    },
    metricValue: "99.9%",
    metricLabel: { ar: "الشحن في الموعد", en: "on-time dispatch" },
    visible: true,
  },
];
