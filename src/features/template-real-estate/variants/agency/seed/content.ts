import type { Agent } from "../../../modules/agents/types";
import type { Content, Settings, Testimonial } from "../../../types";

// The starting content of the Dar Al Manzil demo: a Riyadh brokerage selling and renting homes in the north of the city.

export const seedSettings: Settings = {
  businessName: { ar: "دار المنزل العقارية", en: "Dar Al Manzil Real Estate" },
  nameEdited: false,
  palette: "bronze",
  phone: "+966 11 000 0100",
  whatsapp: "966500000100",
  address: {
    ar: "طريق الملك فهد، حي العليا، الرياض",
    en: "King Fahd Road, Al Olaya, Riyadh",
  },
  hours: {
    ar: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م · السبت: ١٠:٠٠ ص – ٣:٠٠ م",
    en: "Sun – Thu: 9:00 am – 6:00 pm · Sat: 10:00 am – 3:00 pm",
  },
  mortgageRate: 5.5,
};

export const seedContent: Content = {
  hero: {
    title: { ar: "اعثر على البيت الذي ستسميه وطنك", en: "Find the place you will call home" },
    subtitle: {
      ar: "بيوت مختارة بعناية، ونصيحة صادقة، وفريق يحتفي معك بكل مفتاح يُسلَّم. اشترِ أو استأجر أو بع مع دار المنزل.",
      en: "Carefully chosen homes, honest advice, and a team that celebrates every key handover with you. Buy, rent, or sell with Dar Al Manzil.",
    },
  },
  about: {
    title: { ar: "وسيط عقاري يعرف شوارع الرياض شارعًا شارعًا", en: "A brokerage that knows Riyadh street by street" },
    text: {
      ar: "منذ ٢٠٠٦ ونحن نساعد العائلات على شراء بيوتها وإيجارها في شمال الرياض. وكلاؤنا يسكنون في الأحياء التي يبيعون فيها، ويعرفون المدارس القريبة والشوارع الهادئة وأين يقع أفضل مخبز.",
      en: "Since 2006 we have helped families buy and rent homes in north Riyadh. Our agents live in the districts they sell, and know the nearby schools, the quiet streets, and where the best bakery is.",
    },
  },
  contact: {
    title: { ar: "زورونا أو احجزوا معاينة", en: "Visit us or book a viewing" },
    text: {
      ar: "اختر موعدًا مناسبًا وسيؤكده الوكيل خلال ساعات. هل تفكر في البيع؟ نقدّم تقييمًا مجانيًا لعقارك.",
      en: "Pick a time that suits you and an agent confirms within hours. Thinking of selling? We value your property for free.",
    },
  },
};

export const seedAgents: Agent[] = [
  {
    id: "fahad",
    name: { ar: "فهد الحربي", en: "Fahad Al-Harbi" },
    role: { ar: "المدير العام والوسيط الرئيسي", en: "Managing director and principal broker" },
    phone: "+966 50 000 0101",
    photo: "agent-fahad",
  },
  {
    id: "noura",
    name: { ar: "نورة القحطاني", en: "Noura Al-Qahtani" },
    role: { ar: "مديرة التأجير", en: "Head of lettings" },
    phone: "+966 50 000 0102",
    photo: "agent-noura",
  },
  {
    id: "khalid",
    name: { ar: "خالد الدوسري", en: "Khalid Al-Dosari" },
    role: { ar: "مستشار العقارات الفاخرة", en: "Luxury property advisor" },
    phone: "+966 50 000 0103",
    photo: "agent-khalid",
  },
  {
    id: "lama",
    name: { ar: "لمى الشهري", en: "Lama Al-Shehri" },
    role: { ar: "مستشارة مبيعات", en: "Sales advisor" },
    phone: "+966 50 000 0104",
    photo: "agent-lama",
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-dosari",
    name: { ar: "عائلة الدوسري", en: "The Al-Dosari family" },
    context: { ar: "اشترت فيلا في الملقا", en: "Bought a villa in Al Malqa" },
    text: {
      ar: "وجدوا لنا بيتًا لم نكن لنعثر عليه بأنفسنا. كانوا هادئين وصادقين وصبورين من أول معاينة حتى استلام المفتاح.",
      en: "They found us a home we would never have spotted ourselves. Calm, honest, and patient from the first viewing to the key handover.",
    },
    visible: true,
  },
  {
    id: "t-fahd",
    name: { ar: "تركي الفهد", en: "Turki Al-Fahd" },
    context: { ar: "باع شقة في الياسمين", en: "Sold an apartment in Al Yasmin" },
    text: {
      ar: "بِيعت شقتي خلال أحد عشر يومًا وبسعر أعلى من المطلوب. تقييمهم كان دقيقًا والتواصل لم ينقطع لحظة.",
      en: "My apartment sold in eleven days, above the asking price. Their valuation was spot on and communication never dropped.",
    },
    visible: true,
  },
  {
    id: "t-mutairi",
    name: { ar: "سارة المطيري", en: "Sarah Al-Mutairi" },
    context: { ar: "استأجرت شقة في العليا", en: "Rented an apartment in Al Olaya" },
    text: {
      ar: "كنت جديدة في المدينة وشعرت بالاهتمام. عقد واضح، وصيانة سريعة، وفريق ودود فعلًا.",
      en: "I was new to the city and felt looked after. A clear contract, quick repairs, and a genuinely friendly team.",
    },
    visible: true,
  },
];
