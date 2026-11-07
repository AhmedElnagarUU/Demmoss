import type { Agent } from "../../../modules/agents/types";
import type { Content, Settings, Testimonial } from "../../../types";

// The starting content of the demo: Hartwell & Co. Realty, from theme-sources/02-hartwell-realty.html (English word for word).

export const seedSettings: Settings = {
  businessName: { ar: "هارتويل وشركاه العقارية", en: "Hartwell & Co. Realty" },
  nameEdited: false,
  palette: "bronze",
  phone: "+1 (555) 010-2030",
  whatsapp: "966500000100",
  address: {
    ar: "١٢ إكزامبل رو، ريفرسايد، ٠٠٠٠٠",
    en: "12 Example Row, Riverside, 00000",
  },
  hours: {
    ar: "الإثنين – الجمعة ٩:٠٠ – ١٨:٠٠ · السبت ١٠:٠٠ – ١٥:٠٠",
    en: "Mon - Fri 9:00 - 18:00 · Sat 10:00 - 15:00",
  },
  mortgageRate: 5.2,
};

export const seedContent: Content = {
  hero: {
    title: { ar: "اعثر على المكان الذي ستسمّيه بيتك", en: "Find the place you'll call home" },
    subtitle: {
      ar: "بيوت مدروسة، ونصيحة صادقة، وفريق يعامل كل تسليم مفتاح كاحتفال صغير. اشترِ أو استأجر أو بِع مع هارتويل.",
      en: "Considered homes, honest advice and a team that treats every key handover like a small celebration. Buy, rent or sell with Hartwell.",
    },
  },
  about: {
    title: {
      ar: "ثلاثة مبادئ، وعملية واحدة هادئة",
      en: "Three principles, one calm process",
    },
    text: {
      ar: "وكلاؤنا يسكنون في الشوارع التي يبيعون فيها. نعرف أي طرق المدارس أسرع، وأي الأزقة تغمرها المياه، وأين يختبئ أفضل مخبز. كل تقييم يأتي مع أدلته، وكل خدمة تحت سقف واحد.",
      en: "Our agents live in the streets they sell. We know which school runs are quick, which lanes flood, and where the best bakery hides. Every valuation comes with its evidence, and every service sits under one roof.",
    },
  },
  contact: {
    title: { ar: "جدولة زيارة", en: "Schedule a visit" },
    text: {
      ar: "اختر وقتًا مناسبًا وسيؤكده أحد الوكلاء قريبًا. هل تفكر في البيع؟ سيقيّم فريقنا بيتك مجانًا.",
      en: "Pick a time that suits you and an agent will confirm shortly. Thinking of selling? Our team will value your home free of charge.",
    },
  },
};

export const seedAgents: Agent[] = [
  {
    id: "eleanor",
    name: { ar: "إليانور هارتويل", en: "Eleanor Hartwell" },
    role: { ar: "الوسيط الرئيسي", en: "Principal Broker" },
    phone: "+1 (555) 010-2031",
    photo: "agent-eleanor",
  },
  {
    id: "james",
    name: { ar: "جيمس كالاواي", en: "James Calloway" },
    role: { ar: "وكيل مبيعات أول", en: "Senior Sales Agent" },
    phone: "+1 (555) 010-2032",
    photo: "agent-james",
  },
  {
    id: "sofia",
    name: { ar: "صوفيا ماركيتي", en: "Sofia Marchetti" },
    role: { ar: "مديرة التأجير", en: "Lettings Director" },
    phone: "+1 (555) 010-2033",
    photo: "agent-sofia",
  },
  {
    id: "marcus",
    name: { ar: "ماركوس بيل", en: "Marcus Bell" },
    role: { ar: "متخصص العقارات الفاخرة", en: "Luxury Specialist" },
    phone: "+1 (555) 010-2034",
    photo: "agent-marcus",
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-maya",
    name: { ar: "مايا ودانيال ر.", en: "Maya & Daniel R." },
    context: { ar: "اشتروا في ريفرسايد", en: "Bought in Riverside" },
    text: {
      ar: "وجدت لنا هارتويل بيتًا ما كنا لنراه على الإنترنت أبدًا. هادئون وصادقون وصبورون بلا حدود، من أول معاينة حتى استلام المفاتيح.",
      en: "Hartwell found us a home we would never have spotted online. Calm, honest and endlessly patient from first viewing to the keys.",
    },
    visible: true,
  },
  {
    id: "t-tomas",
    name: { ar: "توماس ويتفيلد", en: "Tomas Whitfield" },
    context: { ar: "باع في المدينة القديمة", en: "Sold in Old Town" },
    text: {
      ar: "بِيعت شقتنا خلال أحد عشر يومًا وبسعر أعلى من المطلوب. نصيحة التسعير كانت في محلها، والتواصل لم ينقطع للحظة.",
      en: "Our flat sold in eleven days, above asking. The pricing advice was spot on and the communication never dropped for a moment.",
    },
    visible: true,
  },
  {
    id: "t-priya",
    name: { ar: "بريا نائير", en: "Priya Nair" },
    context: { ar: "مستأجرة في حي الميناء", en: "Renting in Harbour District" },
    text: {
      ar: "كمستأجرة لأول مرة في مدينة جديدة، شعرت بالاهتمام الحقيقي. عقود واضحة، وإصلاحات سريعة، وفريق ملّاك ودود فعلًا.",
      en: "As a first-time renter in a new city I felt looked after. Clear contracts, quick repairs, and a genuinely friendly landlord team.",
    },
    visible: true,
  },
];
