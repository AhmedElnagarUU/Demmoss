# Software Guide: draft content (EN + AR)

Status: **draft for review**. After approval, this text moves into
`src/features/software-guide/content/en.json` and `ar.json` (same structure, see `docs/features/software-guide.md`).

Writing rules: short sentences, no technical words without an explanation, every point tied to what the business gains.
Arabic is written as natural Arabic, not a word-for-word translation.

---

## 1. Hero

**EN**
- Title: **Know what you need before you pay for it**
- Subtitle: Website, dashboard, system, SaaS… they sound alike but they solve different problems. In a few minutes you'll know the difference and which one fits your business.
- Buttons: Find what fits me (→ quiz) · See live demos

**AR**
- العنوان: **اعرف ما تحتاجه قبل أن تدفع ثمنه**
- الوصف: موقع، لوحة تحكم، نظام، SaaS… أسماء متشابهة لكنها تحل مشاكل مختلفة. خلال دقائق ستعرف الفرق بينها، وأيها يناسب نشاطك.
- الأزرار: ساعدني أختار (→ الاختبار) · شاهد نماذج حيّة

---

## 2. Why it matters (facts)

> ⚠️ Figures are indicative, collected from industry reports and vendor studies. **Verify each one before publishing**
> (sources at the end). Each fact keeps a `source` field in the content file.

| id | EN | AR | Source |
|---|---|---|---|
| search-first | Most customers search online before choosing a local business, and many decide in under half an hour. | معظم العملاء يبحثون على الإنترنت قبل اختيار أي نشاط تجاري قريب منهم، وكثير منهم يقرر خلال أقل من نصف ساعة. | BrightLocal consumer search research (2026), via Network Solutions / Wix roundups |
| trust | About 3 in 4 people judge a business's credibility by its website. | حوالي ٣ من كل ٤ أشخاص يحكمون على مصداقية النشاط التجاري من موقعه الإلكتروني. | Stanford credibility research, cited in Zippia / Network Solutions |
| mobile | Around two thirds of web visits now come from phones. | حوالي ثلثي زيارات المواقع اليوم تأتي من الهواتف. | Small business website statistics 2026 roundups |
| after-hours | Up to 40% of online bookings happen outside working hours, when nobody answers the phone. | ما يصل إلى ٤٠٪ من الحجوزات الإلكترونية تتم خارج ساعات العمل، في الوقت الذي لا يرد فيه أحد على الهاتف. | SchedulingKit online booking statistics (vendor data) |
| whatsapp | In the Gulf, WhatsApp reaches almost everyone (about 96% of people in the UAE). A website that connects to WhatsApp meets customers where they already are. | في الخليج يصل واتساب إلى الجميع تقريبًا (حوالي ٩٦٪ من سكان الإمارات). والموقع المرتبط بواتساب يقابل العميل حيث هو أصلًا. | WhatsApp Business UAE guide (2026), Infobip WhatsApp statistics |

---

## 3. The four types

Analogy used throughout: **your business is a shop.**

### 3.1 Profile website · الموقع التعريفي

**EN**
- In one line: Your business's front window on the internet.
- Analogy: The sign and the brochure of your shop, open 24 hours a day.
- What it does: Shows who you are, your services, your work, and how to reach you (call, WhatsApp, map).
- Examples: A company website, a clinic's information site, a portfolio for a designer or a lawyer.
- Good for: Being found on Google, building trust, turning visitors into calls and WhatsApp messages.
- You manage: Little. Text and photos change sometimes.
- Effort: Low · Time: fastest to launch.

**AR**
- باختصار: واجهة نشاطك على الإنترنت.
- التشبيه: لافتة محلك وكتيّب التعريف به، مفتوحان ٢٤ ساعة.
- ماذا يفعل: يعرّف بك وبخدماتك وأعمالك، ويوضح كيف يتواصل معك العميل (اتصال، واتساب، خريطة).
- أمثلة: موقع شركة، موقع تعريفي لعيادة، معرض أعمال لمصمم أو محامٍ.
- مناسب لـ: الظهور في جوجل، بناء الثقة، وتحويل الزائر إلى مكالمة أو رسالة واتساب.
- ما تديره: القليل؛ تعديل النصوص والصور من وقت لآخر.
- الجهد: منخفض · الوقت: الأسرع في الإطلاق.

### 3.2 Functional website + dashboard · موقع تفاعلي مع لوحة تحكم

**EN**
- In one line: A website that does work for you, plus a dashboard where you manage it.
- Analogy: A shop with a reception desk that takes bookings and orders even when you're closed, and an office where you see everything.
- What it does: Customers book, order, or send requests on the site. You see and manage them in your dashboard, and you edit the site's content yourself.
- Examples: A restaurant with table booking, a clinic with appointments, a company that receives quote requests, a small online store.
- Good for: Saving time on calls, not missing customers at night, keeping every request organized in one place.
- You manage: Daily: bookings, orders, requests, content.
- Effort: Medium.

**AR**
- باختصار: موقع يعمل بدلًا منك، ومعه لوحة تحكم تدير منها كل شيء.
- التشبيه: محل فيه موظف استقبال يستلم الحجوزات والطلبات حتى وأنت مغلق، ومكتب ترى منه كل ما يحدث.
- ماذا يفعل: العميل يحجز أو يطلب أو يرسل استفسارًا من الموقع، وأنت تراه وتديره من لوحة التحكم، وتعدّل محتوى الموقع بنفسك.
- أمثلة: مطعم بحجز طاولات، عيادة بحجز مواعيد، شركة تستقبل طلبات عروض أسعار، متجر إلكتروني صغير.
- مناسب لـ: توفير وقت المكالمات، عدم خسارة عملاء الليل، وتنظيم كل الطلبات في مكان واحد.
- ما تديره: يوميًا: الحجوزات والطلبات والمحتوى.
- الجهد: متوسط.

### 3.3 Custom business system · نظام إدارة مخصص لنشاطك

**EN**
- In one line: Software for your team, built around the way you work.
- Analogy: The back office and stockroom of your shop, organized exactly your way.
- What it does: Organizes internal work: customers, stock, staff, tasks, invoices, reports. Mainly used by your team, not the public.
- Examples: A system to follow customers and sales (CRM), inventory for a store, job tracking for a maintenance company, a school's student management.
- Good for: Replacing paper, Excel sheets, and scattered WhatsApp groups. Fewer mistakes, clear reports.
- You manage: Your team uses it every day, with accounts and permissions.
- Effort: Medium to high, depending on how much it does.

**AR**
- باختصار: برنامج لفريقك، مبني على طريقة عملك أنت.
- التشبيه: المكتب الخلفي والمخزن في محلك، مرتبان تمامًا بالطريقة التي تناسبك.
- ماذا يفعل: ينظم العمل الداخلي: العملاء، المخزون، الموظفين، المهام، الفواتير، التقارير. يستخدمه فريقك أساسًا، وليس الجمهور.
- أمثلة: نظام لمتابعة العملاء والمبيعات (CRM)، إدارة مخزون لمتجر، متابعة أعمال شركة صيانة، إدارة الطلاب في مدرسة.
- مناسب لـ: الاستغناء عن الورق وملفات الإكسل ومجموعات الواتساب المتفرقة. أخطاء أقل وتقارير واضحة.
- ما تديره: فريقك يستخدمه كل يوم، بحسابات وصلاحيات.
- الجهد: متوسط إلى مرتفع حسب حجمه.

### 3.4 SaaS product · منتج برمجي بنظام الاشتراك (SaaS)

**EN**
- In one line: Software that **you sell** to many businesses for a monthly subscription.
- Analogy: Instead of running one shop, you build a ready "shop system" and rent it to hundreds of shop owners.
- What it does: Many companies sign up, each with its own account, data, and team, and pay you a subscription.
- Examples: A booking platform for all clinics in a city, an accounting app for small shops, a delivery-management tool for restaurants.
- Good for: Building a software business with recurring income.
- You manage: Customers' accounts, subscriptions and payments, support, and continuous improvement.
- Effort: High. It's a product and a company, not a single project.
- Important: If the software is only for **your own** business, you don't need a SaaS. You need a **custom business system** (3.3).

**AR**
- باختصار: برنامج **تبيعه أنت** لشركات كثيرة مقابل اشتراك شهري.
- التشبيه: بدل أن تدير محلًا واحدًا، تبني "نظام محل" جاهزًا وتؤجره لمئات من أصحاب المحلات.
- ماذا يفعل: شركات كثيرة تسجّل، لكل منها حسابها وبياناتها وفريقها، وتدفع لك اشتراكًا.
- أمثلة: منصة حجز لكل العيادات في مدينة، تطبيق محاسبة للمحلات الصغيرة، أداة لإدارة التوصيل للمطاعم.
- مناسب لـ: بناء شركة برمجيات بدخل متكرر.
- ما تديره: حسابات العملاء، الاشتراكات والمدفوعات، الدعم الفني، والتطوير المستمر.
- الجهد: مرتفع؛ إنه منتج وشركة، وليس مشروعًا واحدًا.
- مهم: إذا كان البرنامج لنشاطك **أنت** فقط، فأنت لا تحتاج SaaS، بل تحتاج **نظام إدارة مخصص** (٣.٣).

---

## 4. Comparison table

| | Profile website | Functional website + dashboard | Custom business system | SaaS product |
|---|---|---|---|---|
| **Main goal** | Be found and trusted | Receive bookings/orders/requests and manage them | Organize your internal work | Sell software to many businesses |
| **Who uses it** | Your customers (they read) | Your customers (they act) + you | Your team | Many companies and their teams |
| **Your daily work in it** | Rarely | Every day | Every day, with your team | Running a software business |
| **Accounts** | None | You (sometimes customers too) | Staff with permissions | Every subscribing company and its users |
| **Effort & budget** | Low | Medium | Medium–high | High |
| **Ongoing care** | Light | Regular | Regular | Continuous |

| | الموقع التعريفي | موقع تفاعلي مع لوحة تحكم | نظام إدارة مخصص | منتج SaaS |
|---|---|---|---|---|
| **الهدف الأساسي** | الظهور وبناء الثقة | استقبال الحجوزات والطلبات وإدارتها | تنظيم العمل الداخلي | بيع البرنامج لشركات كثيرة |
| **من يستخدمه** | عملاؤك (يتصفحون) | عملاؤك (يتفاعلون) وأنت | فريقك | شركات كثيرة وفرقها |
| **عملك اليومي عليه** | نادرًا | كل يوم | كل يوم مع فريقك | إدارة شركة برمجيات |
| **الحسابات** | لا يوجد | أنت (وأحيانًا العملاء) | الموظفون بصلاحيات | كل شركة مشتركة ومستخدموها |
| **الجهد والميزانية** | منخفض | متوسط | متوسط إلى مرتفع | مرتفع |
| **المتابعة بعد الإطلاق** | خفيفة | منتظمة | منتظمة | مستمرة |

---

## 5. Rent or build?

**EN**
- Title: Ready-made tool or your own?
- Text: For many needs there are ready-made online tools you rent monthly. They're quick to start. Your own (custom) software costs more at the start, but it fits your exact way of working, carries your brand, and belongs to you.
- Rent when: your need is common, you want to start this week, and the monthly cost stays small.
- Build when: the tools force you into workarounds, you pay for many subscriptions that don't talk to each other, your way of working is what makes you different, or the subscriptions over a few years would cost more than building.
- Smart mix: Many businesses rent tools for common tasks and build only the part that makes them special.

**AR**
- العنوان: أداة جاهزة أم برنامجك الخاص؟
- النص: لكثير من الاحتياجات توجد أدوات جاهزة على الإنترنت تستأجرها شهريًا، وهي سريعة في البدء. أما برنامجك الخاص فتكلفته في البداية أعلى، لكنه يناسب طريقة عملك بالضبط، ويحمل علامتك التجارية، ويكون ملكك.
- استأجر عندما: يكون احتياجك شائعًا، وتريد البدء هذا الأسبوع، وتبقى التكلفة الشهرية بسيطة.
- ابنِ عندما: تجبرك الأدوات الجاهزة على حلول ملتوية، أو تدفع اشتراكات كثيرة لا تتكامل مع بعضها، أو تكون طريقة عملك هي ما يميزك، أو تصبح الاشتراكات على مدى سنوات أغلى من البناء.
- الحل الذكي: كثير من الأنشطة تستأجر الأدوات للمهام المعتادة، وتبني فقط الجزء الذي يميزها.

---

## 6. How software is built (in shop terms)

| id | EN | AR |
|---|---|---|
| front | **The front (what customers see):** pages, buttons, forms. Like the shop floor and window. | **الواجهة (ما يراه العميل):** الصفحات والأزرار والنماذج. مثل صالة المحل وواجهته. |
| dashboard | **The dashboard (what you see):** where you read requests and change content. Like your office. | **لوحة التحكم (ما تراه أنت):** حيث تتابع الطلبات وتعدّل المحتوى. مثل مكتبك. |
| server | **The server (the brain):** receives each request, checks it, and decides what to do. Like the staff behind the counter. | **الخادم (العقل):** يستقبل كل طلب ويتحقق منه ويقرر ماذا يفعل. مثل الموظفين خلف الكاونتر. |
| database | **The database (the memory):** where customers, bookings, and orders are stored safely. Like a well-organized filing cabinet. | **قاعدة البيانات (الذاكرة):** حيث تُحفظ بيانات العملاء والحجوزات والطلبات بأمان. مثل خزانة ملفات مرتبة. |
| domain-hosting | **Domain and hosting:** the domain is your address (yourname.com); hosting is the land the shop stands on. Both are renewed yearly or monthly. | **الدومين والاستضافة:** الدومين هو عنوانك (yourname.com)، والاستضافة هي الأرض التي يقف عليها المحل. ويُجدَّد كلاهما سنويًا أو شهريًا. |
| care | **Ongoing care:** updates, security, backups, and improvements. Like servicing a car so it keeps running. | **المتابعة والصيانة:** التحديثات والحماية والنسخ الاحتياطي والتحسينات. مثل صيانة السيارة لتبقى تعمل. |

---

## 7. Myths vs truth

| id | Myth (EN) | Truth (EN) | الخرافة (AR) | الحقيقة (AR) |
|---|---|---|---|---|
| one-time-cost | "A website is paid once and that's it." | Building is paid once, but the domain, hosting, updates, and security continue. Plan a small yearly budget. | "الموقع يُدفع ثمنه مرة واحدة وانتهى." | البناء يُدفع مرة، لكن الدومين والاستضافة والتحديثات والحماية مستمرة. خصّص ميزانية سنوية بسيطة. |
| launch-is-finish | "Once it's launched, the work is done." | Launch is the start. You learn from visitors, improve, and add what brings more customers. | "بمجرد إطلاق الموقع ينتهي العمل." | الإطلاق هو البداية. تتعلم من الزوار وتحسّن وتضيف ما يجلب عملاء أكثر. |
| social-is-enough | "My Instagram/Facebook page is enough." | You don't own your social page, and its reach can change overnight. Your website is yours, builds trust, and works with your social pages and WhatsApp. | "صفحتي على إنستغرام أو فيسبوك تكفي." | أنت لا تملك صفحتك على مواقع التواصل، ووصولها قد يتغير بين ليلة وضحاها. موقعك ملكك، ويبني الثقة، ويعمل جنبًا إلى جنب مع صفحاتك وواتساب. |
| more-features | "More features means a better website." | Every feature should bring value. Start with what brings customers or saves time, then grow. | "مميزات أكثر تعني موقعًا أفضل." | كل ميزة يجب أن تضيف قيمة. ابدأ بما يجلب العملاء أو يوفر الوقت، ثم توسّع. |
| need-saas | "I need a SaaS for my business." | SaaS is software you sell to other businesses. For your own work you usually need a functional website or a custom system. | "أحتاج SaaS لنشاطي." | الـ SaaS برنامج تبيعه لشركات أخرى. أما لعملك أنت فغالبًا تحتاج موقعًا تفاعليًا أو نظامًا مخصصًا. |
| cheapest | "The cheapest offer is the best deal." | The real cost includes the customers you lose if the site is slow, confusing, or not trusted. Compare value, not only price. | "العرض الأرخص هو الصفقة الأفضل." | التكلفة الحقيقية تشمل العملاء الذين تخسرهم إذا كان الموقع بطيئًا أو مربكًا أو لا يوحي بالثقة. قارن القيمة، لا السعر فقط. |
| they-will-come | "If I build it, customers will come." | A website needs to be shared, found on Google, and linked from your social pages and WhatsApp. | "بمجرد أن أبني الموقع سيأتي العملاء." | الموقع يحتاج أن يُنشر ويظهر في جوجل ويُربط بصفحاتك وواتساب. |
| my-customers | "My customers don't look online." | Most customers check online before they call or visit, even for local businesses. | "عملائي لا يبحثون على الإنترنت." | معظم العملاء يبحثون على الإنترنت قبل أن يتصلوا أو يزوروا، حتى في الأنشطة المحلية. |

---

## 8. Which one fits me? (quiz)

Each option has a `type`: `profile` · `functional` · `system` · `saas`.

**Q1. What's your main goal? · ما هدفك الأساسي؟**
- Be known and trusted by customers · أن يعرفني العملاء ويثقوا بي → `profile`
- Receive bookings, orders, or requests online · أن أستقبل حجوزات أو طلبات أو استفسارات عبر الإنترنت → `functional`
- Organize my team's daily work · أن أنظم العمل اليومي لفريقي → `system`
- Sell software to other businesses · أن أبيع برنامجًا لشركات أخرى → `saas`

**Q2. Who will use it most? · من سيستخدمه أكثر؟**
- Customers who want to learn about me · عملاء يريدون التعرف عليّ → `profile`
- Customers who take an action, and me managing it · عملاء يتخذون إجراءً، وأنا أدير ذلك → `functional`
- My employees · موظفيّ → `system`
- Many companies, each with its own team · شركات كثيرة، لكل منها فريقها → `saas`

**Q3. What will you do in it every day? · ماذا ستفعل فيه يوميًا؟**
- Almost nothing. Just update information sometimes · تقريبًا لا شيء، فقط أحدّث المعلومات أحيانًا → `profile`
- Follow up on bookings and customer requests · أتابع الحجوزات وطلبات العملاء → `functional`
- Manage stock, tasks, invoices, or staff · أدير المخزون أو المهام أو الفواتير أو الموظفين → `system`
- Manage subscribers, payments, and support · أدير المشتركين والمدفوعات والدعم → `saas`

**Q4. Who needs an account to log in? · من يحتاج حسابًا لتسجيل الدخول؟**
- Nobody · لا أحد → `profile`
- Only me (and maybe my customers) · أنا فقط (وربما عملائي) → `functional`
- My staff, with different permissions · موظفيّ، بصلاحيات مختلفة → `system`
- Every subscribing company and its users · كل شركة مشتركة ومستخدموها → `saas`

**Q5. How do you want to start? · كيف تريد أن تبدأ؟**
- Quickly and simply, then grow · بسرعة وببساطة، ثم أتوسع → `profile`
- With something that starts saving me time right away · بشيء يبدأ بتوفير وقتي فورًا → `functional`
- Replace my paperwork and Excel sheets with one system · أستبدل الأوراق وملفات الإكسل بنظام واحد → `system`
- Build a product and a business around it · أبني منتجًا وشركة حوله → `saas`

**Results**

| type | EN | AR |
|---|---|---|
| profile | **A profile website fits you.** You need customers to find you, trust you, and contact you. Start here; you can add bookings later. | **الموقع التعريفي يناسبك.** تحتاج أن يجدك العملاء ويثقوا بك ويتواصلوا معك. ابدأ من هنا، ويمكنك إضافة الحجوزات لاحقًا. |
| functional | **A functional website with a dashboard fits you.** Let the site take bookings and requests day and night while you manage everything from one place. | **الموقع التفاعلي مع لوحة التحكم يناسبك.** دع الموقع يستقبل الحجوزات والطلبات ليلًا ونهارًا، وأنت تدير كل شيء من مكان واحد. |
| system | **A custom business system fits you.** Bring your team's work into one organized system built around how you work. | **نظام الإدارة المخصص يناسبك.** اجمع عمل فريقك في نظام واحد منظم مبني على طريقة عملك. |
| saas | **A SaaS product fits you.** You're building software as a business. Let's plan the first version that proves the idea. | **منتج SaaS يناسبك.** أنت تبني البرمجيات كمشروع تجاري. لنخطط معًا لأول نسخة تثبت الفكرة. |
| tie | **You're between {a} and {b}.** A short chat will show which one brings you more value. | **أنت بين {a} و{b}.** محادثة قصيرة ستوضح أيهما يحقق لك قيمة أكبر. |

Buttons: Start your project · See matching demos · Talk on WhatsApp
الأزرار: ابدأ مشروعك · شاهد نماذج مناسبة · تحدث معنا على واتساب

---

## 9. Glossary

| id | EN | AR |
|---|---|---|
| domain | **Domain:** your website's address, like yourname.com. | **الدومين (النطاق):** عنوان موقعك، مثل yourname.com. |
| hosting | **Hosting:** the computer on the internet where your website lives, always on. | **الاستضافة:** جهاز على الإنترنت يعيش عليه موقعك ويعمل دائمًا. |
| responsive | **Responsive:** the site adjusts itself to phones, tablets, and computers. | **متجاوب:** الموقع يضبط نفسه تلقائيًا على الهاتف والتابلت والكمبيوتر. |
| seo | **SEO:** work that helps your site appear in Google results. | **تحسين الظهور في محركات البحث (SEO):** عمل يساعد موقعك على الظهور في نتائج جوجل. |
| https | **HTTPS / SSL:** the lock icon in the browser; it protects the data your customers send. | **HTTPS / SSL:** علامة القفل في المتصفح؛ تحمي البيانات التي يرسلها عملاؤك. |
| dashboard | **Dashboard:** the private page where you manage your site and your requests. | **لوحة التحكم:** الصفحة الخاصة التي تدير منها موقعك وطلباتك. |
| cms | **Content management:** editing your site's text and photos yourself, without a developer. | **إدارة المحتوى:** تعديل نصوص موقعك وصوره بنفسك، دون الحاجة لمبرمج. |
| mvp | **First version (MVP):** the smallest version that delivers real value, launched fast and improved later. | **النسخة الأولى (MVP):** أصغر نسخة تقدم قيمة حقيقية، تُطلق بسرعة وتُحسّن لاحقًا. |
| backup | **Backup:** a saved copy of your site and data, in case something goes wrong. | **النسخ الاحتياطي:** نسخة محفوظة من موقعك وبياناتك تحسبًا لأي مشكلة. |

---

## 10. Final call to action

**EN**
- Title: Now you know what you need. Let's build it.
- Text: Tell us about your project in one minute, or try a live demo and see how it works for a business like yours.
- Buttons: Start your project · See live demos · Talk on WhatsApp

**AR**
- العنوان: الآن تعرف ما تحتاجه، فلنبنِه معًا.
- النص: أخبرنا عن مشروعك في دقيقة واحدة، أو جرّب نموذجًا حيًّا وشاهد كيف يعمل لنشاط مثل نشاطك.
- الأزرار: ابدأ مشروعك · شاهد نماذج حيّة · تحدث معنا على واتساب

---

## Sources (research, November 2026)

Most figures come from industry roundups and vendor studies; verify against the original reports before publishing.

- Website vs web app vs SaaS:
  [Subscribed.FYI: Web App vs SaaS](https://subscribed.fyi/?p=25888) ·
  [Website vs Web App vs SaaS, which does your business need](https://csgtech.in/blogs/website-vs-web-app-vs-saas-which-one-does-your-business-need) ·
  [Website vs Web App: What You Need (2026)](https://www.essentialdesigns.net/news/website-vs-web-app-what-you-need-2026)
- Consumer behaviour and credibility:
  [Network Solutions: 50+ small business website statistics 2026](https://www.networksolutions.com/blog/small-business-website-statistics/) ·
  [Wix: Small business website statistics 2026](https://www.wix.com/blog/small-business-website-statistics) ·
  [Zippia: Website statistics](https://www.zippia.com/advice/website-statistics/)
- Online booking and after-hours:
  [SchedulingKit: Online booking statistics 2026](https://schedulingkit.com/hub/scheduling/online-booking-statistics) ·
  [SchedulingKit: After-hours booking statistics](https://schedulingkit.com/statistics/after-hours-booking-statistics) ·
  [SimplyBook.me: Online booking statistics 2026](https://simplybook.me/en/blog/online-booking-statistics)
- WhatsApp in the Middle East:
  [WhatsApp Business API in UAE: 2026 guide](https://chatdaddy.tech/blog/whatsapp-business-api-uae) ·
  [Infobip: WhatsApp statistics 2026](https://www.infobip.com/blog/whatsapp-statistics) ·
  [Cequens: WhatsApp Business in MEA](https://cequens.com/blog/everything-you-need-to-know-about-whatsapp-business-in-the-middle-east-and-north-africa)
- Misconceptions and costs:
  [Increo: 5 common misconceptions about websites](https://increo.no/en/blog/5-common-misunderstandings-about-websites) ·
  [Bannerview: misconceptions about owning a website](https://www.bannerview.com/blog/aminto/BOSVIEW/4-Common-Misconceptions-About-What-It-Takes-to-Own-and-Care-for-a-Website)
- Rent vs build:
  [Itomic: tailored or ready-made web apps for small businesses](https://www.itomic.com.au/tailored-fit-or-ready-made-navigating-the-web-app-dilemma-for-small-businesses/) ·
  [Kolonell: custom web app vs off-the-shelf SaaS (2026)](https://kolonell.com/en/blog/custom-web-app-vs-off-the-shelf-saas-2026)
