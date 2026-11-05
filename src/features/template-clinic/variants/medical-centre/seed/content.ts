import type {
  Content,
  Department,
  Doctor,
  Faq,
  Result,
  Settings,
  Testimonial,
  Treatment,
} from "../../../types";

// Noor Medical Centre: a family medical centre in Jeddah with five departments and six doctors. Invented business for the demo.

export const seedSettings: Settings = {
  businessName: { ar: "مركز نور الطبي", en: "Noor Medical Centre" },
  nameEdited: false,
  palette: "teal",
  phone: "+966 12 555 0188",
  whatsapp: "966125550188",
  address: { ar: "حي الروضة، طريق الأمير سلطان، جدة", en: "Al Rawdah District, Prince Sultan Road, Jeddah" },
};

export const seedContent: Content = {
  hero: {
    title: { ar: "رعاية لكل الأسرة، على بُعد حجز واحد", en: "Care for the whole family, one booking away" },
    subtitle: {
      ar: "ستة أطباء في خمسة تخصصات تحت سقف واحد. اختر طبيبك ووقتًا متاحًا فعلًا من جدوله، دون انتظار على الهاتف.",
      en: "Six doctors in five specialties under one roof. Choose your doctor and a time that is truly free in their schedule, without waiting on the phone.",
    },
  },
  about: {
    title: { ar: "مركز واحد لكل أفراد الأسرة", en: "One centre for every member of the family" },
    text: {
      ar: "نعمل منذ سنوات في جدة على أن تجد الأسرة كل ما تحتاجه من طبيب الأسرة إلى طبيب الأسنان في مكان واحد وبأسعار واضحة.",
      en: "For years we have worked so a family finds everything in one place in Jeddah, from the family doctor to the dentist, at clear prices.",
    },
  },
  contact: {
    title: { ar: "زورونا أو راسلونا", en: "Visit or message us" },
    text: {
      ar: "المركز في حي الروضة بجدة ومواقف السيارات متاحة. للاستفسار السريع راسلنا على واتساب وسنرد في أقرب وقت.",
      en: "The centre is in Al Rawdah, Jeddah, with parking available. For a quick question, message us on WhatsApp and we will reply as soon as we can.",
    },
  },
};

export const seedDepartments: Department[] = [
  {
    id: "general",
    name: { ar: "طب الأسرة", en: "Family medicine" },
    description: {
      ar: "رعاية أولية للبالغين وكبار السن: فحوصات دورية، أمراض مزمنة، وإحالات.",
      en: "Primary care for adults and older patients: check-ups, chronic conditions, and referrals.",
    },
  },
  {
    id: "paediatrics",
    name: { ar: "طب الأطفال", en: "Paediatrics" },
    description: {
      ar: "متابعة نمو الأطفال والتطعيمات وعلاج الأمراض الشائعة.",
      en: "Child growth follow-up, vaccinations, and treatment of common illnesses.",
    },
  },
  {
    id: "dermatology",
    name: { ar: "الأمراض الجلدية", en: "Dermatology" },
    description: {
      ar: "علاج الجلد والشعر والأظافر، من حب الشباب إلى الإكزيما.",
      en: "Skin, hair, and nail care, from acne to eczema.",
    },
  },
  {
    id: "cardiology",
    name: { ar: "أمراض القلب", en: "Cardiology" },
    description: {
      ar: "فحص القلب والضغط وتخطيط القلب والإيكو.",
      en: "Heart and blood pressure checks, ECG, and echocardiography.",
    },
  },
  {
    id: "dental",
    name: { ar: "طب الأسنان", en: "Dentistry" },
    description: {
      ar: "فحص وتنظيف وتبييض وتقويم صحة الفم.",
      en: "Check-ups, cleaning, whitening, and oral health.",
    },
  },
];

export const seedDoctors: Doctor[] = [
  {
    id: "ahmad-bakr",
    name: { ar: "د. أحمد بكر", en: "Dr. Ahmad Bakr" },
    title: { ar: "طبيب أسرة", en: "Family physician" },
    departmentId: "general",
    photo: "dr-ahmad",
    bio: {
      ar: "طبيب أسرة يتابع الأطفال والبالغين وكبار السن، ويؤمن بأن الوقاية أرخص من العلاج.",
      en: "A family physician who looks after children, adults, and older patients, and believes prevention is cheaper than treatment.",
    },
    credentials: [
      { ar: "البورد السعودي في طب الأسرة", en: "Saudi Board in Family Medicine" },
      { ar: "خبرة في إدارة الأمراض المزمنة", en: "Experience in chronic disease care" },
    ],
    years: 14,
    slotMinutes: 20,
    schedule: [
      { from: "08:00", to: "16:00" },
      { from: "08:00", to: "16:00" },
      { from: "08:00", to: "16:00" },
      { from: "08:00", to: "16:00" },
      { from: "08:00", to: "16:00" },
      null,
      { from: "09:00", to: "13:00" },
    ],
  },
  {
    id: "reem-fahmi",
    name: { ar: "د. ريم الفهمي", en: "Dr. Reem Al Fahmi" },
    title: { ar: "طبيبة أسرة (فترة مسائية)", en: "Family physician (evenings)" },
    departmentId: "general",
    photo: "dr-reem",
    bio: {
      ar: "طبيبة أسرة تستقبل المرضى مساءً لمن لا يناسبهم الدوام الصباحي.",
      en: "A family physician who sees patients in the evening, for those who cannot come in the morning.",
    },
    credentials: [
      { ar: "الزمالة السعودية في طب الأسرة", en: "Saudi Fellowship in Family Medicine" },
      { ar: "اهتمام خاص بصحة المرأة", en: "Special interest in women's health" },
    ],
    years: 9,
    slotMinutes: 20,
    schedule: [
      { from: "14:00", to: "21:00" },
      { from: "14:00", to: "21:00" },
      { from: "14:00", to: "21:00" },
      { from: "14:00", to: "21:00" },
      { from: "14:00", to: "21:00" },
      { from: "16:00", to: "21:00" },
      null,
    ],
  },
  {
    id: "huda-saeed",
    name: { ar: "د. هدى سعيد", en: "Dr. Huda Saeed" },
    title: { ar: "استشارية طب الأطفال", en: "Consultant paediatrician" },
    departmentId: "paediatrics",
    photo: "dr-huda",
    bio: {
      ar: "استشارية أطفال تتابع نمو الطفل من الولادة حتى المراهقة، وتشرح لكل أم ما تحتاجه بهدوء.",
      en: "A consultant paediatrician following a child's growth from birth to adolescence, explaining calmly what each parent needs to know.",
    },
    credentials: [
      { ar: "البورد العربي في طب الأطفال", en: "Arab Board in Paediatrics" },
      { ar: "برنامج التطعيمات الوطني", en: "National immunisation programme training" },
    ],
    years: 11,
    slotMinutes: 20,
    schedule: [
      { from: "09:00", to: "17:00" },
      { from: "09:00", to: "17:00" },
      { from: "09:00", to: "17:00" },
      { from: "09:00", to: "17:00" },
      { from: "09:00", to: "17:00" },
      null,
      null,
    ],
  },
  {
    id: "mona-adel",
    name: { ar: "د. منى عادل", en: "Dr. Mona Adel" },
    title: { ar: "أخصائية الأمراض الجلدية", en: "Dermatologist" },
    departmentId: "dermatology",
    photo: "dr-mona",
    bio: {
      ar: "أخصائية جلدية تعالج حب الشباب والإكزيما وتساقط الشعر بخطط واقعية.",
      en: "A dermatologist treating acne, eczema, and hair loss with realistic plans.",
    },
    credentials: [
      { ar: "البورد السعودي في الأمراض الجلدية", en: "Saudi Board in Dermatology" },
      { ar: "تدريب في الجلدية التجميلية", en: "Training in cosmetic dermatology" },
    ],
    years: 8,
    slotMinutes: 30,
    schedule: [
      { from: "10:00", to: "18:00" },
      null,
      { from: "10:00", to: "18:00" },
      null,
      { from: "10:00", to: "18:00" },
      null,
      { from: "10:00", to: "14:00" },
    ],
  },
  {
    id: "tariq-nasser",
    name: { ar: "د. طارق ناصر", en: "Dr. Tariq Nasser" },
    title: { ar: "استشاري أمراض القلب", en: "Consultant cardiologist" },
    departmentId: "cardiology",
    photo: "dr-tariq",
    bio: {
      ar: "استشاري قلب يشخّص الضغط والسكر وآلام الصدر ويتابع مرضى القلب على المدى الطويل.",
      en: "A consultant cardiologist diagnosing blood pressure, diabetes, and chest pain, and following heart patients over the long term.",
    },
    credentials: [
      { ar: "زمالة أمراض القلب", en: "Fellowship in Cardiology" },
      { ar: "خبرة في تخطيط القلب والإيكو", en: "Experience in ECG and echocardiography" },
    ],
    years: 17,
    slotMinutes: 30,
    schedule: [
      { from: "09:00", to: "13:00" },
      { from: "12:00", to: "20:00" },
      null,
      { from: "12:00", to: "20:00" },
      null,
      null,
      null,
    ],
  },
  {
    id: "lina-qasim",
    name: { ar: "د. لينا قاسم", en: "Dr. Lina Qasim" },
    title: { ar: "طبيبة أسنان", en: "Dentist" },
    departmentId: "dental",
    photo: "dr-lina",
    bio: {
      ar: "طبيبة أسنان تهتم بالفحص الدوري وتبييض الأسنان وتجعل الزيارة مريحة للصغار والكبار.",
      en: "A dentist focused on regular check-ups and whitening, making the visit comfortable for children and adults.",
    },
    credentials: [
      { ar: "ماجستير طب الأسنان التجميلي", en: "Master's in Cosmetic Dentistry" },
      { ar: "عضو الجمعية السعودية لطب الأسنان", en: "Member of the Saudi Dental Society" },
    ],
    years: 10,
    slotMinutes: 30,
    schedule: [
      { from: "10:00", to: "18:00" },
      { from: "10:00", to: "18:00" },
      { from: "10:00", to: "18:00" },
      { from: "10:00", to: "18:00" },
      { from: "10:00", to: "18:00" },
      null,
      null,
    ],
  },
];

export const seedTreatments: Treatment[] = [
  {
    id: "general-consult",
    departmentId: "general",
    name: { ar: "استشارة طب الأسرة", en: "Family medicine consultation" },
    description: {
      ar: "فحص عام وتقييم الأعراض وخطة علاج.",
      en: "A general exam, symptom assessment, and a treatment plan.",
    },
    steps: [
      { ar: "تقييم الأعراض", en: "Symptom assessment" },
      { ar: "الفحص السريري", en: "Clinical exam" },
      { ar: "الخطة والوصفة", en: "Plan and prescription" },
    ],
    durationMinutes: 20,
    price: 180,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "annual-check",
    departmentId: "general",
    name: { ar: "فحص صحي شامل", en: "Annual health check" },
    description: {
      ar: "تحاليل أساسية وقياسات وتقرير مكتوب لمن يريد الاطمئنان.",
      en: "Basic blood tests, measurements, and a written report for peace of mind.",
    },
    steps: [],
    durationMinutes: 60,
    price: 650,
    fromPrice: false,
    priceNote: { ar: "تشمل التحاليل الأساسية", en: "Includes the basic blood tests" },
  },
  {
    id: "child-consult",
    departmentId: "paediatrics",
    name: { ar: "استشارة أطفال", en: "Child consultation" },
    description: {
      ar: "فحص الطفل وتقييم نموه ونصائح للأهل.",
      en: "A child's exam, growth assessment, and advice for parents.",
    },
    steps: [],
    durationMinutes: 20,
    price: 220,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "vaccination",
    departmentId: "paediatrics",
    name: { ar: "زيارة تطعيم", en: "Vaccination visit" },
    description: {
      ar: "تطعيمات الجدول الوطني مع فحص سريع قبل التطعيم.",
      en: "National schedule vaccines with a quick exam beforehand.",
    },
    steps: [],
    durationMinutes: 15,
    price: 150,
    fromPrice: true,
    priceNote: { ar: "حسب نوع اللقاح", en: "Depends on the vaccine" },
  },
  {
    id: "skin-consult",
    departmentId: "dermatology",
    name: { ar: "استشارة جلدية", en: "Skin consultation" },
    description: {
      ar: "فحص الجلد وتشخيص المشكلة وخطة علاج.",
      en: "A skin exam, diagnosis, and a treatment plan.",
    },
    steps: [],
    durationMinutes: 30,
    price: 300,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "acne-programme",
    departmentId: "dermatology",
    name: { ar: "برنامج علاج حب الشباب", en: "Acne treatment programme" },
    description: {
      ar: "برنامج متابعة لعدة أسابيع لمن لم تنفع معه العلاجات المنزلية.",
      en: "A multi-week follow-up programme for acne that home care did not clear.",
    },
    steps: [],
    durationMinutes: 30,
    price: 900,
    fromPrice: true,
    priceNote: { ar: "للشهر الأول", en: "For the first month" },
  },
  {
    id: "cardio-consult",
    departmentId: "cardiology",
    name: { ar: "استشارة قلب", en: "Cardiology consultation" },
    description: {
      ar: "تقييم الضغط وآلام الصدر وعوامل الخطورة.",
      en: "Assessment of blood pressure, chest pain, and risk factors.",
    },
    steps: [],
    durationMinutes: 30,
    price: 400,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "ecg-echo",
    departmentId: "cardiology",
    name: { ar: "تخطيط القلب والإيكو", en: "ECG and echo" },
    description: {
      ar: "تخطيط كهربائي وإيكو في الزيارة نفسها.",
      en: "An electrical trace and an echo in the same visit.",
    },
    steps: [],
    durationMinutes: 45,
    price: 550,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "dental-checkup",
    departmentId: "dental",
    name: { ar: "فحص وتنظيف الأسنان", en: "Dental check-up & cleaning" },
    description: {
      ar: "فحص كامل وتنظيف الجير وتعليمات العناية.",
      en: "A full exam, scaling, and care instructions.",
    },
    steps: [],
    durationMinutes: 30,
    price: 250,
    fromPrice: false,
    priceNote: { ar: "", en: "" },
  },
  {
    id: "whitening",
    departmentId: "dental",
    name: { ar: "تبييض الأسنان", en: "Teeth whitening" },
    description: { ar: "تفتيح لون الأسنان في جلسة واحدة بأمان.", en: "Safely lighten teeth in one session." },
    steps: [],
    durationMinutes: 60,
    price: 900,
    fromPrice: true,
    priceNote: { ar: "حسب الدرجة المطلوبة", en: "Depends on the shade wanted" },
  },
];

export const seedResults: Result[] = [
  {
    id: "result-whitening",
    title: { ar: "تبييض الأسنان", en: "Teeth whitening" },
    caption: { ar: "جلسة واحدة في قسم الأسنان", en: "One session in the dental department" },
    look: 0,
    visible: true,
  },
  {
    id: "result-implant",
    title: { ar: "تعويض سنين مفقودين", en: "Two missing teeth replaced" },
    caption: { ar: "بالتعاون مع جراح زراعة شريك", en: "In cooperation with a partner implant surgeon" },
    look: 2,
    visible: true,
  },
];

export const seedFaqs: Faq[] = [
  {
    id: "faq-walkin",
    question: { ar: "هل أستطيع الحضور دون موعد؟", en: "Can I walk in without an appointment?" },
    answer: {
      ar: "نستقبل الحالات العاجلة متى أمكن، لكن الحجز يضمن لك وقتًا محددًا مع الطبيب الذي تريده.",
      en: "We see urgent cases when we can, but booking guarantees you a set time with the doctor you want.",
    },
  },
  {
    id: "faq-insurance",
    question: { ar: "هل تقبلون التأمين الطبي؟", en: "Do you accept medical insurance?" },
    answer: {
      ar: "نتعامل مع عدد من شركات التأمين. أرسل لنا اسم شركتك على واتساب لنؤكد لك التغطية قبل الزيارة.",
      en: "We work with several insurers. Send us your company name on WhatsApp and we confirm coverage before your visit.",
    },
  },
  {
    id: "faq-cancel",
    question: { ar: "كيف ألغي أو أغيّر موعدي؟", en: "How do I cancel or change my appointment?" },
    answer: {
      ar: "راسلنا على واتساب قبل الموعد بيوم على الأقل، وسنحوّلك إلى وقت آخر متاح.",
      en: "Message us on WhatsApp at least a day before, and we will move you to another free time.",
    },
  },
  {
    id: "faq-file",
    question: { ar: "هل يُحفظ ملفي بين الأقسام؟", en: "Is my file shared between departments?" },
    answer: {
      ar: "نعم، لكل مراجع ملف واحد يراه الأطباء المعالجون فقط ليعرفوا تاريخك دون أن تعيد الشرح.",
      en: "Yes, each patient has one file that only treating doctors see, so they know your history without you repeating it.",
    },
  },
  {
    id: "faq-kids",
    question: {
      ar: "ما العمر الأنسب لأول زيارة أسنان للطفل؟",
      en: "When should a child first see a dentist?",
    },
    answer: {
      ar: "من عمر السنتين تقريبًا أو عند ظهور أي ألم، ونجعل الزيارة الأولى قصيرة ولطيفة.",
      en: "From about the age of two, or at any pain, and we keep the first visit short and friendly.",
    },
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-rana",
    name: { ar: "رنا س.", en: "Rana S." },
    context: { ar: "طب الأسرة", en: "Family medicine" },
    text: {
      ar: "حجزت من الجوال في دقيقة واخترت الطبيب بنفسي. لا اتصالات ولا انتظار طويل.",
      en: "I booked from my phone in a minute and picked the doctor myself. No calls, no long wait.",
    },
    visible: true,
  },
  {
    id: "t-omar",
    name: { ar: "والد عمر", en: "Omar's father" },
    context: { ar: "طب الأطفال", en: "Paediatrics" },
    text: {
      ar: "الدكتورة هدى تشرح كل شيء ببساطة، وابني لم يعد يخاف من العيادة.",
      en: "Dr. Huda explains everything simply, and my son is no longer afraid of the clinic.",
    },
    visible: true,
  },
  {
    id: "t-layla",
    name: { ar: "ليلى ح.", en: "Layla H." },
    context: { ar: "الأمراض الجلدية", en: "Dermatology" },
    text: {
      ar: "الأسعار واضحة في الموقع قبل أن آتي، وخطة العلاج كانت واقعية.",
      en: "The prices were clear on the website before I came, and the treatment plan was realistic.",
    },
    visible: true,
  },
];
