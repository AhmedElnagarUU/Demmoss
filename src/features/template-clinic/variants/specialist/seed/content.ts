import type { Content, Doctor, Faq, Result, Settings, Testimonial, Treatment } from "../../../types";

// Dr. Rayan Al Harthi: oral and maxillofacial surgeon, dental implants, Riyadh. Invented business for the demo.

export const seedSettings: Settings = {
  businessName: { ar: "د. ريان الحارثي", en: "Dr. Rayan Al Harthi" },
  nameEdited: false,
  palette: "lime",
  phone: "+966 11 555 0142",
  whatsapp: "966115550142",
  address: { ar: "طريق العليا، حي العليا، الرياض", en: "Olaya Street, Al Olaya, Riyadh" },
};

export const seedContent: Content = {
  hero: {
    title: {
      ar: "جراحة أسنان تبدأ دقتها قبل العملية",
      en: "Surgical dentistry where precision starts before the operation",
    },
    subtitle: {
      ar: "زراعة الأسنان وجراحة الفم في الرياض. كل حالة تُخطَّط ثلاثيًا على الشاشة، فتعرف الخطوات والمدة والسعر قبل أن تجلس على الكرسي.",
      en: "Dental implants and oral surgery in Riyadh. Every case is planned on screen in 3D, so you know the steps, the time, and the price before you sit in the chair.",
    },
  },
  about: {
    title: { ar: "نخطط على الشاشة، ونُتقن على الكرسي", en: "Planned on screen, perfected in the chair" },
    text: {
      ar: "أنا ريان الحارثي، جراح فم ووجه وفكين. منذ أكثر من ثمانية عشر عامًا أعيد بناء ابتسامات مرضى قيل لهم إن حالتهم معقدة. كل عملية نجرّبها رقميًا أولًا، فلا يُترك شيء للمصادفة يوم الجراحة.",
      en: "I'm Rayan Al Harthi, an oral and maxillofacial surgeon. For more than eighteen years I have rebuilt smiles for patients who were told their case was too complex. Every operation is rehearsed digitally first, so on the day nothing is left to chance.",
    },
  },
  contact: {
    title: { ar: "زورونا في العيادة", en: "Visit the clinic" },
    text: {
      ar: "العيادة في طريق العليا بالرياض، ومواقف السيارات متاحة أمام المبنى. للاستفسار السريع راسلنا على واتساب وسنرد في أقرب وقت.",
      en: "The clinic is on Olaya Street in Riyadh, with parking in front of the building. For a quick question, message us on WhatsApp and we will reply as soon as we can.",
    },
  },
};

export const seedDoctor: Doctor = {
  id: "rayan",
  name: { ar: "د. ريان الحارثي", en: "Dr. Rayan Al Harthi" },
  title: {
    ar: "جراح الفم والوجه والفكين، أخصائي زراعة الأسنان",
    en: "Oral & maxillofacial surgeon, implant specialist",
  },
  photo: "doctor",
  bio: {
    ar: "جراح فم ووجه وفكين متخصص في زراعة الأسنان وإعادة بناء الفكين.",
    en: "An oral and maxillofacial surgeon specialising in dental implants and jaw reconstruction.",
  },
  credentials: [
    { ar: "زمالة جراحة الفم والوجه والفكين", en: "Fellowship in oral and maxillofacial surgery" },
    { ar: "عضو الجمعية السعودية لزراعة الأسنان", en: "Member of the Saudi implant dentistry society" },
    { ar: "تدريب متقدم في الجراحة الموجّهة بالحاسوب", en: "Advanced training in computer-guided surgery" },
  ],
  years: 18,
  slotMinutes: 30,
  // Sunday to Thursday, a short Saturday, Friday closed (index 0 = Sunday)
  schedule: [
    { from: "09:00", to: "17:00" },
    { from: "09:00", to: "17:00" },
    { from: "09:00", to: "17:00" },
    { from: "09:00", to: "17:00" },
    { from: "09:00", to: "15:00" },
    null,
    { from: "10:00", to: "14:00" },
  ],
};

export const seedTreatments: Treatment[] = [
  {
    id: "consultation",
    name: { ar: "استشارة ومسح ثلاثي الأبعاد", en: "Consultation & 3D scan" },
    description: {
      ar: "لمن يريد معرفة خياراته وسعره قبل أي التزام: فحص كامل ومسح ثلاثي الأبعاد وخطة مكتوبة.",
      en: "For anyone who wants to know the options and the price before any commitment: a full exam, a 3D scan, and a written plan.",
    },
    steps: [
      { ar: "فحص الفم والأشعة", en: "Oral exam and X-rays" },
      { ar: "مسح ثلاثي الأبعاد للفكين", en: "3D scan of the jaws" },
      { ar: "خطة علاج وسعر مكتوبان", en: "A written treatment plan and price" },
    ],
    durationMinutes: 45,
    price: 250,
    fromPrice: false,
    priceNote: { ar: "تشمل المسح ثلاثي الأبعاد", en: "Includes the 3D scan" },
    photo: "bone-graft",
  },
  {
    id: "extraction",
    name: { ar: "خلع الأسنان الجراحي", en: "Surgical tooth extraction" },
    description: {
      ar: "للأسنان المدفونة أو المكسورة أو التي لا يمكن خلعها بالطريقة العادية، مع الحفاظ على العظم لزراعة لاحقة.",
      en: "For impacted or broken teeth that cannot be removed the usual way, preserving the bone for a later implant.",
    },
    steps: [
      { ar: "تخدير موضعي كامل", en: "Full local anaesthesia" },
      { ar: "خلع بأقل تدخل جراحي", en: "Removal with minimal surgery" },
      { ar: "حماية العظم وتعليمات التعافي", en: "Bone protection and recovery instructions" },
    ],
    durationMinutes: 45,
    price: 450,
    fromPrice: true,
    priceNote: { ar: "حسب صعوبة الحالة", en: "Depends on the difficulty of the case" },
    photo: "extraction",
  },
  {
    id: "implant",
    name: { ar: "زراعة سن واحد", en: "Single dental implant" },
    description: {
      ar: "لمن فقد سنًا واحدًا ويريد بديلًا ثابتًا يشبه السن الطبيعي دون المساس بالأسنان المجاورة.",
      en: "For someone who lost one tooth and wants a fixed replacement that feels natural, without touching the neighbouring teeth.",
    },
    steps: [
      { ar: "تخطيط ثلاثي الأبعاد لموضع الزرعة", en: "3D planning of the implant position" },
      { ar: "وضع الزرعة تحت التخدير الموضعي", en: "Placing the implant under local anaesthesia" },
      { ar: "التئام العظم ثم تركيب التاج", en: "Healing, then fitting the crown" },
    ],
    durationMinutes: 60,
    price: 3800,
    fromPrice: true,
    priceNote: { ar: "تشمل الزرعة والدعامة والتاج", en: "Includes the implant, abutment, and crown" },
  },
  {
    id: "full-arch",
    name: { ar: "ترميم فك كامل", en: "Full-arch restoration" },
    description: {
      ar: "لمن فقد معظم أسنانه أو كلها، وأراد ابتسامة ثابتة على أربع أو ست زرعات بدل الطقم المتحرك.",
      en: "For someone who lost most or all teeth and wants a fixed smile on four or six implants instead of a removable denture.",
    },
    steps: [
      { ar: "تخطيط الابتسامة والجراحة رقميًا", en: "Digital smile and surgery planning" },
      { ar: "جراحة الزرعات في جلسة واحدة", en: "Implant surgery in one session" },
      { ar: "جسر مؤقت ثابت في اليوم التالي", en: "A fixed temporary bridge the next day" },
      { ar: "الجسر النهائي بعد الالتئام", en: "The final bridge after healing" },
    ],
    durationMinutes: 180,
    price: 28000,
    fromPrice: true,
    priceNote: { ar: "للفك الواحد", en: "Per jaw" },
    photo: "full-arch",
  },
  {
    id: "bone-graft",
    name: { ar: "تطعيم العظم", en: "Bone grafting" },
    description: {
      ar: "لمن ضمر عظمه بعد فقد الأسنان ولا يكفي لتثبيت زرعة بأمان.",
      en: "For bone that has shrunk after tooth loss and is not enough to hold an implant safely.",
    },
    steps: [
      { ar: "تقييم كمية العظم بالمسح", en: "Measuring the bone on the scan" },
      { ar: "وضع مادة التطعيم وتغطيتها", en: "Placing and covering the graft" },
      { ar: "فترة التئام ثم الزراعة", en: "A healing period, then the implant" },
    ],
    durationMinutes: 60,
    price: 1800,
    fromPrice: true,
    priceNote: { ar: "حسب حجم المنطقة", en: "Depends on the size of the area" },
    photo: "bone-graft",
  },
  {
    id: "sinus-lift",
    name: { ar: "رفع الجيب الأنفي", en: "Sinus lift" },
    description: {
      ar: "لمن يحتاج زرعات في الفك العلوي الخلفي وارتفاع العظم فيه قليل.",
      en: "For anyone who needs implants in the upper back jaw where the bone height is low.",
    },
    steps: [
      { ar: "تحديد الطريقة المفتوحة أو المغلقة", en: "Choosing the open or closed technique" },
      { ar: "رفع غشاء الجيب بلطف", en: "Gently lifting the sinus membrane" },
      { ar: "التطعيم ثم الزراعة", en: "Grafting, then the implant" },
    ],
    durationMinutes: 90,
    price: 2800,
    fromPrice: true,
    priceNote: { ar: "الطريقة المفتوحة أو المغلقة", en: "Open or closed technique" },
    photo: "sinus-lift",
  },
];

export const seedResults: Result[] = [
  {
    id: "result-front",
    title: { ar: "ثلاثة أسنان أمامية", en: "Three front teeth" },
    caption: { ar: "زراعة فورية وتاج في موعدين", en: "Immediate implants and crowns in two visits" },
    look: 0,
    visible: true,
  },
  {
    id: "result-arch",
    title: { ar: "ابتسامة كاملة", en: "A complete smile" },
    caption: { ar: "ترميم الفك العلوي على أربع زرعات", en: "Upper jaw restored on four implants" },
    look: 1,
    visible: true,
  },
  {
    id: "result-back",
    title: { ar: "أسنان خلفية", en: "Back teeth" },
    caption: { ar: "رفع جيب أنفي ثم زراعتان", en: "Sinus lift, then two implants" },
    look: 2,
    visible: true,
  },
];

export const seedFaqs: Faq[] = [
  {
    id: "faq-pain",
    question: { ar: "هل زراعة السن مؤلمة؟", en: "Is an implant painful?" },
    answer: {
      ar: "تتم الجراحة تحت تخدير موضعي كامل فلا تشعر بألم أثناءها. بعدها يشعر أغلب المرضى بانزعاج خفيف تكفيه مسكنات عادية لأيام قليلة.",
      en: "The surgery is done under full local anaesthesia, so you feel no pain during it. Afterwards most patients have mild discomfort that ordinary painkillers handle for a few days.",
    },
  },
  {
    id: "faq-time",
    question: { ar: "كم تستغرق رحلة العلاج؟", en: "How long does the whole treatment take?" },
    answer: {
      ar: "تختلف الحالات: في بعضها يُركَّب سن مؤقت في اليوم نفسه، وفي أخرى ننتظر التئام العظم عدة أشهر. نحدد لك الجدول كاملًا بعد المسح.",
      en: "It depends on the case: sometimes a temporary tooth is fitted the same day, sometimes we wait a few months for the bone to heal. You get the full schedule after the scan.",
    },
  },
  {
    id: "faq-price",
    question: { ar: "هل السعر المعروض نهائي؟", en: "Is the price shown final?" },
    answer: {
      ar: "السعر المعروض هو نقطة البداية لكل علاج. بعد الفحص والمسح نعطيك سعرًا مكتوبًا ثابتًا قبل أن تبدأ أي خطوة.",
      en: "The price shown is the starting point for each treatment. After the exam and scan you get a fixed written price before any step begins.",
    },
  },
  {
    id: "faq-candidate",
    question: { ar: "هل أستطيع الزراعة إن كان عظمي ضعيفًا؟", en: "Can I have an implant if my bone is weak?" },
    answer: {
      ar: "غالبًا نعم. تطعيم العظم أو رفع الجيب الأنفي يهيئان المكان للزرعة، ونقرر الأنسب لك بعد المسح ثلاثي الأبعاد.",
      en: "Usually yes. Bone grafting or a sinus lift prepares the site, and we decide what suits you after the 3D scan.",
    },
  },
  {
    id: "faq-care",
    question: { ar: "كيف أعتني بالزرعة؟", en: "How do I look after an implant?" },
    answer: {
      ar: "بالتنظيف اليومي نفسه للأسنان الطبيعية، وزيارة متابعة كل ستة أشهر. نتابع كل مريض شخصيًا في السنة الأولى.",
      en: "With the same daily cleaning as natural teeth, plus a check-up every six months. We follow each patient personally in the first year.",
    },
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-khalid",
    name: { ar: "خالد م.", en: "Khalid M." },
    context: { ar: "ترميم فك كامل", en: "Full-arch restoration" },
    text: {
      ar: "جئت وأسناني شبه معدومة وخرجت في اليوم التالي بابتسامة لا أتوقف عن النظر إليها. هدوء ودقة ولطف.",
      en: "I arrived with almost no teeth and left the next evening with a smile I couldn't stop looking at. Calm, precise, kind.",
    },
    visible: true,
  },
  {
    id: "t-noura",
    name: { ar: "نورة ق.", en: "Noura Q." },
    context: { ar: "رفع جيب أنفي وزراعة", en: "Sinus lift and implants" },
    text: {
      ar: "الخطة ثلاثية الأبعاد أرتني بالضبط ما سيحدث. الجراحة نفسها كانت بلا ألم والتعافي أسهل مما توقعت.",
      en: "The 3D plan showed me exactly what would happen. The surgery itself was painless and recovery much easier than expected.",
    },
    visible: true,
  },
  {
    id: "t-faisal",
    name: { ar: "فيصل د.", en: "Faisal D." },
    context: { ar: "زراعة فورية", en: "Immediate implant" },
    text: {
      ar: "بعد سنتين صارت الزرعة كأنها سني الأصلي. الدكتور يتابعني بنفسه وهذا واضح.",
      en: "Two years on, my implant feels like my own tooth. The doctor follows up personally and it shows.",
    },
    visible: true,
  },
];
