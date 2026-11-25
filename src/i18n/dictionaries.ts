/* ============================================================================
 * UBAID EDITS — Multilingual dictionary (10 locales).
 * ----------------------------------------------------------------------------
 * Pakistan (اردو) · USA (English) · UK (English) · France (Français)
 * UAE (العربية) · Oman (العربية) · Saudi Arabia (العربية)
 * Germany (Deutsch) · Spain (Español) · Turkey (Türkçe)
 * RTL: Urdu + every Arabic locale. Everything else is LTR.
 * ========================================================================== */

export type Locale =
  | "en"
  | "en-GB"
  | "ur"
  | "ar-AE"
  | "ar-OM"
  | "ar-SA"
  | "fr"
  | "de"
  | "es"
  | "tr";

export type Dict = Omit<typeof en, "dir"> & { dir: "ltr" | "rtl" };

/* Language switcher metadata (navbar dropdown) — country is shown next to the
 * native language name so visitors instantly find their region. */
export const LOCALES: {
  id: Locale;
  label: string;
  country: string;
  short: string;
  dir: "ltr" | "rtl";
}[] = [
  { id: "ur", label: "اردو", country: "Pakistan", short: "UR", dir: "rtl" },
  { id: "en", label: "English", country: "USA", short: "EN", dir: "ltr" },
  { id: "en-GB", label: "English", country: "UK", short: "UK", dir: "ltr" },
  { id: "fr", label: "Français", country: "France", short: "FR", dir: "ltr" },
  { id: "ar-AE", label: "العربية", country: "UAE", short: "AE", dir: "rtl" },
  { id: "ar-OM", label: "العربية", country: "Oman", short: "OM", dir: "rtl" },
  { id: "ar-SA", label: "العربية", country: "Saudi Arabia", short: "SA", dir: "rtl" },
  { id: "de", label: "Deutsch", country: "Germany", short: "DE", dir: "ltr" },
  { id: "es", label: "Español", country: "Spain", short: "ES", dir: "ltr" },
  { id: "tr", label: "Türkçe", country: "Turkey", short: "TR", dir: "ltr" },
];

export const en = {
  dir: "ltr" as const,
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    testimonials: "Testimonials",
    contact: "Contact",
    hireMe: "HIRE ME",
  },
  hero: {
    label: "HELLO, I'M UBAID",
    line1: "EDIT. CREATE.",
    line2: "INSPIRE.",
    description:
      "I transform ideas into powerful visual experiences through professional video editing, cinematic storytelling, motion graphics and creative advertising.",
    ctaWork: "EXPLORE MY WORK",
    ctaHire: "HIRE ME",
    listen: "LISTEN TO MY INTRO",
    bgPlay: "Play background video",
    bgPause: "Pause background video",
    cinema: "Black screen",
    cinemaExit: "Exit black screen",
    available: "Available for new projects",
    scrollHint: "Scroll to explore",
    portraitCaption: "Ubaid — Video Editor & Motion Graphics Designer",
    statYears: "Years of experience",
    statProjects: "Projects delivered",
    statClients: "Happy clients",
  },
  intro: {
    greeting: "Hi, I'm Ubaid — tap to hear who I am",
    title: "Hi, I'm Ubaid",
    subtitle: "Video Editor & Motion Graphics Designer",
    play: "Play my intro",
    pause: "Pause intro",
    loading: "Preparing voice…",
    years: "Years experience",
    projects: "Projects done",
    clients: "Happy clients",
    blurb:
      "I edit ads, YouTube content, brand commercials and social reels that grab attention and actually sell.",
    hire: "HIRE ME",
    voiceError: "Voice intro is not ready yet — please try again in a moment.",
  },
  marquee: [
    "META ADS",
    "YOUTUBE MANAGEMENT",
    "UGC CREATIVES",
    "COLOR GRADING",
    "SOCIAL REELS",
    "YOUTUBE SHORTS",
    "STORYTELLING",
    "BRAND COMMERCIALS",
  ],
  about: {
    kicker: "ABOUT ME",
    heading: "BEHIND THE VISUALS",
    paragraphs: [
      "I'm Ubaid, a professional video editor and creative content specialist. I work on engaging video content, advertising creatives, YouTube automation and cinematic visual storytelling.",
      "I believe every video should communicate a message, capture attention and create an impact.",
    ],
    philosophyTitle: "Creative philosophy",
    philosophy:
      "Great editing is invisible. Every cut, every frame and every sound has to serve the story — so the audience feels the message before they even notice the craft behind it.",
    expertiseTitle: "Editing expertise",
    expertise: [
      "Advertising creatives built for conversion",
      "Long-form storytelling and documentary editing",
      "YouTube account management — uploads, SEO & channel growth",
      "Color grading and sound design",
      "Social-first cuts, hooks and retention pacing",
    ],
    approachTitle: "How I work",
    approach:
      "Clear communication, honest timelines and a structured review process. You always know where your project stands — from the first draft to the final color-graded master.",
    portraitCaption: "Ubaid — at the editing suite",
  },
  services: {
    kicker: "SERVICES",
    heading: "WHAT I CREATE",
    subtitle:
      "Five focused services, one goal: video content that captures attention and drives results.",
    viewProjects: "View projects",
    items: [
      {
        title: "META ADS & UGC CREATIVES",
        description:
          "Facebook Ads, Instagram Ads, UGC advertisements, product commercials, promotional creatives and conversion-focused video editing.",
        tags: ["Facebook Ads", "Instagram Ads", "UGC", "Conversion"],
      },
      {
        title: "YOUTUBE AUTOMATION",
        description:
          "Faceless YouTube videos, documentary editing, storytelling, long-form editing, stock footage, voice-over synchronization and educational videos.",
        tags: ["Faceless", "Documentary", "Long-form", "Voice-over"],
      },
      {
        title: "YOUTUBE ACCOUNT MANAGEMENT",
        description:
          "Complete management of your YouTube channel — content planning, upload schedule, titles, thumbnails, SEO tags and audience growth.",
        tags: ["Uploads", "SEO", "Thumbnails", "Growth"],
      },
      {
        title: "SOCIAL MEDIA VIDEO CONTENT",
        description:
          "Instagram Reels, TikTok videos, YouTube Shorts, brand reels and promotional content.",
        tags: ["Reels", "TikTok", "Shorts", "Brand content"],
      },
      {
        title: "YOUTUBE AUTOMATION TRAINING",
        description:
          "Learn YouTube automation end-to-end — niche research, script writing, faceless channels, editing systems and monetization, taught on real projects.",
        tags: ["Automation", "Faceless", "Monetization", "Mentorship"],
      },
    ],
  },
  portfolio: {
    kicker: "PORTFOLIO",
    heading: "CINEMATIC VIDEO WORK",
    subtitle:
      "A selection of commercial, restaurant and social content — filter by category and play a preview.",
    openPlayer: "Open player",
    close: "Close",
    allLabel: "ALL PROJECTS",
    empty: "No projects in this category yet — new work is added regularly.",
    realNotice:
      "Real client projects, uploaded straight from the editing suite — new work is added regularly.",
    categories: {
      "meta-ads": "META ADS",
      "ugc-ads": "UGC ADS",
      restaurant: "RESTAURANT VIDEOS",
      "motion-graphics": "MOTION GRAPHICS",
      "social-reels": "SOCIAL MEDIA REELS",
    },
  },
  workflow: {
    kicker: "CREATIVE WORKFLOW",
    heading: "FROM IDEA TO IMPACT",
    subtitle: "A cinematic four-stage process built on communication and craft.",
    steps: {
      discover: {
        title: "DISCOVER",
        description: "Understand the brand and project goals.",
      },
      strategize: {
        title: "STRATEGIZE",
        description: "Develop the creative direction.",
      },
      create: {
        title: "CREATE",
        description: "Edit, animate and polish the content.",
      },
      deliver: {
        title: "DELIVER",
        description: "Deliver professional final videos.",
      },
    },
  },
  testimonials: {
    kicker: "TESTIMONIALS",
    heading: "TRUST BUILT THROUGH CREATIVITY",
    subtitle:
      "Feedback from the brands, restaurants and creators I have edited for — every review below comes from a delivered project.",
    allCountries: "ALL COUNTRIES",
    reviewCount: "reviews",
  },
  contact: {
    kicker: "CONTACT",
    heading: "LET'S CREATE SOMETHING EXTRAORDINARY.",
    subheading:
      "Have an idea, a brand or a project? Let's turn it into powerful visual content.",
    form: {
      name: "Full name",
      email: "Email",
      company: "Company",
      service: "Required service",
      message: "Project description",
      budget: "Budget",
      submit: "SEND PROJECT BRIEF",
      submitting: "Sending…",
      success: "Brief received — I'll reply within one business day.",
      error: "Something went wrong. Please try again or reach me on WhatsApp.",
      required: "Required field",
      invalidEmail: "Please enter a valid email",
    },
    services: [
      "Meta Ads & UGC Creatives",
      "YouTube Automation",
      "YouTube Account Management",
      "Social Media Video Content",
      "YouTube Automation Training",
    ],
    budgets: ["Under $300", "$300 – $800", "$800 – $2,000", "$2,000+", "Let's discuss"],
    directTitle: "Direct channels",
    followTitle: "Follow the work",
    whatsapp: "WhatsApp",
    phone: "Phone call",
  },
  footer: {
    tagline: "EDIT • CREATE • INSPIRE",
    rights: "All rights reserved.",
    quickLinks: "Quick links",
    servicesTitle: "Services",
    contactTitle: "Contact",
  },
  common: {
    demo: "DEMO",
    loading: "Loading…",
    backToTop: "Back to top",
    language: "Language",
  },
  countries: {
    pk: "Pakistan",
    us: "United States",
    uk: "United Kingdom",
    ae: "United Arab Emirates",
    om: "Oman",
    sa: "Saudi Arabia",
    fr: "France",
    de: "Germany",
    es: "Spain",
    tr: "Turkey",
  },
};

export const enGB: Dict = { ...en, dir: "ltr" as const };

export const ar: Dict = {
  dir: "rtl" as const,
  nav: {
    home: "الرئيسية",
    about: "من أنا",
    services: "الخدمات",
    portfolio: "معرض الأعمال",
    testimonials: "آراء العملاء",
    contact: "تواصل معي",
    hireMe: "وظّفني",
  },
  hero: {
    label: "مرحباً، أنا عبيد",
    line1: "حرّر. ابتكر.",
    line2: "ألهم.",
    description:
      "أحوّل الأفكار إلى تجارب مرئية مؤثرة عبر المونتاج الاحترافي، السرد السينمائي، الموشن جرافيك والإعلانات الإبداعية.",
    ctaWork: "استكشف أعمالي",
    ctaHire: "وظّفني",
    listen: "استمع إلى مقدّمتي",
    bgPlay: "تشغيل فيديو الخلفية",
    bgPause: "إيقاف فيديو الخلفية",
    cinema: "شاشة سوداء",
    cinemaExit: "إلغاء الشاشة السوداء",
    available: "متاح لمشاريع جديدة",
    scrollHint: "مرّر للاستكشاف",
    portraitCaption: "عبيد — محرر فيديو ومصمم موشن جرافيك",
    statYears: "سنوات الخبرة",
    statProjects: "مشروع تم تسليمه",
    statClients: "عميل سعيد",
  },
  intro: {
    greeting: "مرحباً، أنا عبيد — اضغط لتعرف من أنا",
    title: "مرحباً، أنا عبيد",
    subtitle: "محرر فيديو ومصمم موشن جرافيك",
    play: "شغّل المقدمة",
    pause: "إيقاف المقدمة",
    loading: "جارٍ تحميل الصوت…",
    years: "سنوات خبرة",
    projects: "مشروع منجز",
    clients: "عميل سعيد",
    blurb: "أعمل على إعلانات ومحتوى يوتيوب وإعلانات العلامات التجارية وريلز اجتماعي يلفت الانتباه ويحقق المبيعات.",
    hire: "وظّفني",
    voiceError: "المقدمة الصوتية غير جاهزة بعد — حاول بعد لحظات.",
  },
  marquee: [
    "إعلانات ميتا",
    "إدارة قناة يوتيوب",
    "محتوى UGC",
    "تدريج الألوان",
    "ريلز اجتماعي",
    "يوتيوب شورتس",
    "سرد قصصي",
    "إعلانات العلامات",
  ],
  about: {
    kicker: "من أنا",
    heading: "خلف المرئيات",
    paragraphs: [
      "أنا عبيد، محرر فيديو محترف ومتخصص في المحتوى الإبداعي. أعمل على محتوى فيديو جذاب، وإعلانات إبداعية، وأتمتة يوتيوب، والسرد المرئي السينمائي.",
      "أؤمن أن كل فيديو يجب أن يوصل رسالة، ويلفت الانتباه، ويصنع أثراً حقيقياً.",
    ],
    philosophyTitle: "فلسفتي الإبداعية",
    philosophy:
      "المونتاج الرائع لا يُلاحَظ. كل قطع وكل إطار وكل صوت يجب أن يخدم القصة، حتى يشعر المشاهد بالرسالة قبل أن يلاحظ الحرفة خلفها.",
    expertiseTitle: "خبرات المونتاج",
    expertise: [
      "إعلانات إبداعية مصممة لتحقيق التحويل",
      "مونتاج قصصي طويل وأفلام وثائقية",
      "إدارة قناة يوتيوب — النشر وتحسين البحث ونمو المشاهدات",
      "تدريج الألوان والتصميم الصوتي",
      "مونتاج موجّه للسوشال: خطافات وإيقاع يحافظ على المشاهدة",
    ],
    approachTitle: "أسلوب عملي",
    approach:
      "تواصل واضح، ومواعيد صادقة، ومراجعات منظمة. ستعرف دائماً حالة مشروعك — من المسودة الأولى حتى النسخة النهائية بعد تدريج الألوان.",
    portraitCaption: "عبيد — في غرفة المونتاج",
  },
  services: {
    kicker: "الخدمات",
    heading: "ما الذي أصنعه",
    subtitle: "خمس خدمات متخصصة وهدف واحد: محتوى مرئي يلفت الانتباه ويحقق النتائج.",
    viewProjects: "شاهد المشاريع",
    items: [
      {
        title: "إعلانات ميتا ومحتوى UGC",
        description:
          "إعلانات فيسبوك وإنستغرام، وإعلانات UGC، وإعلانات المنتجات، والمحتوى الترويجي، ومونتاج فيديو موجّه لرفع معدل التحويل.",
        tags: ["فيسبوك", "إنستغرام", "UGC", "تحويل"],
      },
      {
        title: "أتمتة يوتيوب",
        description:
          "فيديوهات يوتيوب بدون وجه، ومونتاج وثائقي، وسرد قصصي، ومونتاج طويل، ولقطات أرشيفية، ومزامنة التعليق الصوتي، وفيديوهات تعليمية.",
        tags: ["بدون وجه", "وثائقي", "طويل", "تعليق صوتي"],
      },
      {
        title: "إدارة حساب يوتيوب",
        description:
          "إدارة كاملة لقناتك على يوتيوب — تخطيط المحتوى، وجدولة النشر، والعناوين والصور المصغرة ووسوم SEO ونمو الجمهور.",
        tags: ["النشر", "SEO", "صور مصغرة", "نمو"],
      },
      {
        title: "محتوى الفيديو لوسائل التواصل",
        description:
          "ريلز إنستغرام، وفيديوهات تيك توك، وشارتس يوتيوب، وريلز العلامات التجارية والمحتوى الترويجي.",
        tags: ["ريلز", "تيك توك", "شارتس", "محتوى العلامات"],
      },
      {
        title: "تدريب على أتمتة يوتيوب",
        description:
          "تعلّم أتمتة يوتيوب من البداية إلى النهاية — اختيار المجال، وكتابة السكربتات، والقنوات بدون وجه، وأنظمة المونتاج، وتحقيق الربح — بتدريب على مشاريع حقيقية.",
        tags: ["أتمتة", "بدون وجه", "ربح", "إرشاد"],
      },
    ],
  },
  portfolio: {
    kicker: "معرض الأعمال",
    heading: "أعمال فيديو سينمائية",
    subtitle: "مجموعة من المحتوى الإعلاني والمطاعم والاجتماعي — صفّ حسب الفئة وشاهد المعاينة.",
    openPlayer: "افتح المشغّل",
    close: "إغلاق",
    allLabel: "كل المشاريع",
    empty: "لا توجد مشاريع في هذه الفئة بعد — تُضاف أعمال جديدة باستمرار.",
    realNotice: "مشاريع عملاء حقيقية تُرفع مباشرة من غرفة المونتاج — تُضاف أعمال جديدة باستمرار.",
    categories: {
      "meta-ads": "إعلانات ميتا",
      "ugc-ads": "إعلانات UGC",
      restaurant: "فيديوهات المطاعم",
      "motion-graphics": "موشن جرافيك",
      "social-reels": "ريلز التواصل الاجتماعي",
    },
  },
  workflow: {
    kicker: "سير العمل الإبداعي",
    heading: "من الفكرة إلى الأثر",
    subtitle: "عملية سينمائية من أربع مراحل مبنية على التواصل والحرفية.",
    steps: {
      discover: { title: "الاكتشاف", description: "فهم العلامة التجارية وأهداف المشروع." },
      strategize: { title: "التخطيط", description: "تطوير الاتجاه الإبداعي." },
      create: { title: "الإنشاء", description: "المونتاج والتحريك والتلميع." },
      deliver: { title: "التسليم", description: "تسليم فيديوهات نهائية احترافية." },
    },
  },
  testimonials: {
    kicker: "آراء العملاء",
    heading: "ثقة بُنيت بالإبداع",
    subtitle:
      "آراء حقيقية من علامات ومطاعم ومبدعين عملتُ على مشاريعهم — كل مراجعة أدناه من مشروع تم تسليمه.",
    allCountries: "كل البلدان",
    reviewCount: "مراجعات",
  },
  contact: {
    kicker: "تواصل معي",
    heading: "لنصنع شيئاً استثنائياً.",
    subheading: "لديك فكرة أو علامة تجارية أو مشروع؟ لنحوّلها إلى محتوى مرئي قوي.",
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      company: "الشركة",
      service: "الخدمة المطلوبة",
      message: "وصف المشروع",
      budget: "الميزانية",
      submit: "أرسل ملخص المشروع",
      submitting: "جارٍ الإرسال…",
      success: "استلمت ملخص المشروع — سأرد خلال يوم عمل واحد.",
      error: "حدث خطأ ما. حاول مرة أخرى أو تواصل معي عبر واتساب.",
      required: "حقل مطلوب",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    },
    services: [
      "إعلانات ميتا ومحتوى UGC",
      "أتمتة يوتيوب",
      "إدارة حساب يوتيوب",
      "محتوى الفيديو لوسائل التواصل",
      "تدريب على أتمتة يوتيوب",
    ],
    budgets: ["أقل من 300$", "300 – 800$", "800 – 2,000$", "أكثر من 2,000$", "لنناقش"],
    directTitle: "قنوات مباشرة",
    followTitle: "تابع الأعمال",
    whatsapp: "واتساب",
    phone: "اتصال هاتفي",
  },
  footer: {
    tagline: "حرّر • ابتكر • ألهم",
    rights: "جميع الحقوق محفوظة.",
    quickLinks: "روابط سريعة",
    servicesTitle: "الخدمات",
    contactTitle: "تواصل",
  },
  common: {
    demo: "نموذج",
    loading: "جارٍ التحميل…",
    backToTop: "العودة للأعلى",
    language: "اللغة",
  },
  countries: {
    pk: "باكستان",
    us: "الولايات المتحدة",
    uk: "المملكة المتحدة",
    ae: "الإمارات العربية المتحدة",
    om: "عُمان",
    sa: "المملكة العربية السعودية",
    fr: "فرنسا",
    de: "ألمانيا",
    es: "إسبانيا",
    tr: "تركيا",
  },
};

export const arAE: Dict = { ...ar, dir: "rtl" as const };
export const arOM: Dict = { ...ar, dir: "rtl" as const };
export const arSA: Dict = { ...ar, dir: "rtl" as const };

export const ur: Dict = {
  dir: "rtl" as const,
  nav: {
    home: "ہوم",
    about: "میرے بارے میں",
    services: "خدمات",
    portfolio: "پورٹ فولیو",
    testimonials: "تعریفیں",
    contact: "رابطہ",
    hireMe: "ہائر کریں",
  },
  hero: {
    label: "ہیلو، میں عبید ہوں",
    line1: "ایڈٹ کریں۔ تخلیق کریں۔",
    line2: "متاثر کریں۔",
    description:
      "میں پیشہ ورانہ ویڈیو ایڈیٹنگ، سنیمیٹک اسٹوری ٹیلنگ، موشن گرافکس اور تخلیقی اشتہار سازی کے ذریعے خیالات کو مؤثر بصری تجربوں میں بدلتا ہوں۔",
    ctaWork: "میرا کام دیکھیں",
    ctaHire: "ہائر کریں",
    listen: "میرا انٹرو سنیں",
    bgPlay: "بیک گراؤنڈ ویڈیو چلائیں",
    bgPause: "بیک گراؤنڈ ویڈیو روکیں",
    cinema: "بلیک اسکرین",
    cinemaExit: "بلیک اسکرین بند کریں",
    available: "نئے پروجیکٹس کے لیے دستیاب",
    scrollHint: "دیکھنے کے لیے سکرول کریں",
    portraitCaption: "عبید — ویڈیو ایڈیٹر اور موشن گرافکس ڈیزائنر",
    statYears: "سال کا تجربہ",
    statProjects: "مکمل شدہ پروجیکٹس",
    statClients: "مطمئن کلائنٹس",
  },
  intro: {
    greeting: "ہیلو، میں عبید ہوں — دبائیں اور جانیے میں کون ہوں",
    title: "ہیلو، میں عبید ہوں",
    subtitle: "ویڈیو ایڈیٹر اور موشن گرافکس ڈیزائنر",
    play: "میرا انٹرو سنیں",
    pause: "انٹرو روکیں",
    loading: "وائس تیار ہو رہی ہے…",
    years: "سال کا تجربہ",
    projects: "مکمل پروجیکٹس",
    clients: "مطمئن کلائنٹس",
    blurb:
      "میں ایسے ایڈز، یوٹیوب کنٹینٹ، برانڈ کمرشلز اور سوشل ریلز بناتا ہوں جو توجہ حاصل کریں اور فروخت بڑھائیں۔",
    hire: "ہائر کریں",
    voiceError: "وائس انٹرو ابھی تیار نہیں — چند لمحوں بعد دوبارہ کوشش کریں۔",
  },
  marquee: [
    "میٹا ایڈز",
    "یوٹیوب اکاؤنٹ مینجمنٹ",
    "UGC تخلیقات",
    "کلر گریڈنگ",
    "سوشل ریلز",
    "یوٹیوب شارٹس",
    "اسٹوری ٹیلنگ",
    "برانڈ کمرشلز",
  ],
  about: {
    kicker: "میرے بارے میں",
    heading: "بصریات کے پیچھے",
    paragraphs: [
      "میں عبید ہوں، ایک پیشہ ور ویڈیو ایڈیٹر اور تخلیقی مواد کا ماہر۔ میں دلچسپ ویڈیو کنٹینٹ، اشتہاری تخلیقات، یوٹیوب آٹومیشن اور سنیمیٹک اسٹوری ٹیلنگ پر کام کرتا ہوں۔",
      "میرا یقین ہے کہ ہر ویڈیو کو ایک پیغام دینا چاہیے، توجہ حاصل کرنی چاہیے اور اثر پیدا کرنا چاہیے۔",
    ],
    philosophyTitle: "تخلیقی فلسفہ",
    philosophy:
      "بہترین ایڈیٹنگ نامی ہوتی ہے۔ ہر کٹ، ہر فریم اور ہر آواز کہانی کی خدمت کرے — تاکہ ناظرین پیغام محسوس کریں، اس سے پہلے کہ اس کے پیچھے کی مہارت نظر آئے۔",
    expertiseTitle: "ایڈیٹنگ مہارتیں",
    expertise: [
      "کنورژن کے لیے بنائی گئی اشتہاری تخلیقات",
      "لمبی کہانیوں اور ڈاکیومنٹری کی ایڈیٹنگ",
      "یوٹیوب اکاؤنٹ مینجمنٹ — اپ لوڈز، SEO اور چینل گروتھ",
      "کلر گریڈنگ اور ساؤنڈ ڈیزائن",
      "سوشل فرسٹ کٹس، ہکس اور ریٹینشن پیسنگ",
    ],
    approachTitle: "میرا طریقہ کار",
    approach:
      "واضح بات چیت، ایماندار ٹائم لائنز اور منظم ریویو کا عمل۔ آپ ہمیشہ جانتے ہیں کہ آپ کا پروجیکٹ کہاں کھڑا ہے — پہلے ڈرافٹ سے لے کر فائنل کلر گریڈڈ ماسٹر تک۔",
    portraitCaption: "عبید — ایڈیٹنگ سوٹ پر",
  },
  services: {
    kicker: "خدمات",
    heading: "میں جو بناتا ہوں",
    subtitle: "پانچ مرکزی خدمات، ایک ہدف: ایسا ویڈیو کنٹینٹ جو توجہ حاصل کرے اور نتائج دے۔",
    viewProjects: "پروجیکٹس دیکھیں",
    items: [
      {
        title: "میٹا ایڈز اور UGC تخلیقات",
        description:
          "فیس بک ایڈز، انسٹاگرام ایڈز، UGC اشتہارات، پروڈکٹ کمرشلز، پروموشنل تخلیقات اور کنورژن فوکسڈ ویڈیو ایڈیٹنگ۔",
        tags: ["فیس بک ایڈز", "انسٹاگرام ایڈز", "UGC", "کنورژن"],
      },
      {
        title: "یوٹیوب آٹومیشن",
        description:
          "فیس لیس یوٹیوب ویڈیوز، ڈاکیومنٹری ایڈیٹنگ، اسٹوری ٹیلنگ، لانگ فارم ایڈیٹنگ، اسٹاک فوٹیج، وائس اوور سنک اور تعلیمی ویڈیوز۔",
        tags: ["فیس لیس", "ڈاکیومنٹری", "لانگ فارم", "وائس اوور"],
      },
      {
        title: "یوٹیوب اکاؤنٹ مینجمنٹ",
        description:
          "آپ کے یوٹیوب چینل کی مکمل مینجمنٹ — کنٹینٹ پلاننگ، اپ لوڈ شیڈول، ٹائٹلز، تھمب نیلز، SEO ٹیگز اور آڈینس گروتھ۔",
        tags: ["اپ لوڈز", "SEO", "تھمب نیلز", "گروتھ"],
      },
      {
        title: "سوشل میڈیا ویڈیو کنٹینٹ",
        description:
          "انسٹاگرام ریلز، ٹک ٹاک ویڈیوز، یوٹیوب شارٹس، برانڈ ریلز اور پروموشنل کنٹینٹ۔",
        tags: ["ریلز", "ٹک ٹاک", "شارٹس", "برانڈ کنٹینٹ"],
      },
      {
        title: "یوٹیوب آٹومیشن ٹریننگ",
        description:
          "یوٹیوب آٹومیشن شروع سے آخر تک سیکھیں — نیش ریسرچ، اسکرپٹ رائٹنگ، فیس لیس چینلز، ایڈیٹنگ سسٹمز اور مونیٹائزیشن — حقیقی پروجیکٹس پر ٹریننگ کے ساتھ۔",
        tags: ["آٹومیشن", "فیس لیس", "مونیٹائزیشن", "مینٹر شپ"],
      },
    ],
  },
  portfolio: {
    kicker: "پورٹ فولیو",
    heading: "سنیمیٹک ویڈیو ورک",
    subtitle: "کمرشل، ریسٹورنٹ اور سوشل مواد کا منتخب مجموعہ — کیٹیگری فلٹر کریں اور پریویو چلائیں۔",
    openPlayer: "پلیئر کھولیں",
    close: "بند کریں",
    allLabel: "تمام پروجیکٹس",
    empty: "اس کیٹیگری میں ابھی کوئی پروجیکٹ نہیں — نیا کام باقاعدگی سے شامل ہوتا ہے۔",
    realNotice: "حقیقی کلائنٹ پروجیکٹس — براہِ راست ایڈیٹنگ سوٹ سے اپ لوڈ، نیا کام باقاعدگی سے شامل ہوتا ہے۔",
    categories: {
      "meta-ads": "میٹا ایڈز",
      "ugc-ads": "UGC ایڈز",
      restaurant: "ریسٹورنٹ ویڈیوز",
      "motion-graphics": "موشن گرافکس",
      "social-reels": "سوشل میڈیا ریلز",
    },
  },
  workflow: {
    kicker: "تخلیقی ورک فلو",
    heading: "آئیڈیا سے اثر تک",
    subtitle: "بات چیت اور مہارت پر مبنی سنیمیٹک چار مرحلوں کا عمل۔",
    steps: {
      discover: { title: "دریافت", description: "برانڈ اور پروجیکٹ کے اہداف کو سمجھنا۔" },
      strategize: { title: "حکمت عملی", description: "تخلیقی سمت تیار کرنا۔" },
      create: { title: "تخلیق", description: "ایڈٹ، اینیمیٹ اور پالش کرنا۔" },
      deliver: { title: "ڈیلیور", description: "پیشہ ور فائنل ویڈیوز کی فراہمی۔" },
    },
  },
  testimonials: {
    kicker: "تعریفیں",
    heading: "تخلیق سے پیدا ہوئا اعتماد",
    subtitle:
      "ان برانڈز، ریسٹورنٹس اور کریئیٹرز کی حقیقی رائے جن کے لیے میں نے ایڈیٹنگ کی — ہر جائزہ ایک مکمل شدہ پروجیکٹ سے ہے۔",
    allCountries: "تمام ممالک",
    reviewCount: "جائزے",
  },
  contact: {
    kicker: "رابطہ",
    heading: "آئیے کچھ غیر معمولی بنائیں۔",
    subheading: "کوئی آئیڈیا، برانڈ یا پروجیکٹ ہے؟ آئیے اسے مضبوط بصری مواد میں بدلیں۔",
    form: {
      name: "پورا نام",
      email: "ای میل",
      company: "کمپنی",
      service: "مطلوبہ خدمت",
      message: "پروجیکٹ کی تفصیل",
      budget: "بجٹ",
      submit: "پروجیکٹ بریف بھیجیں",
      submitting: "بھیجا جا رہا ہے…",
      success: "بریف موصول ہوا — میں ایک کاروباری دن میں جواب دوں گا۔",
      error: "کچھ غلط ہو گیا۔ دوبارہ کوشش کریں یا وہٹس ایپ پر رابطہ کریں۔",
      required: "ضروری فیلڈ",
      invalidEmail: "درست ای میل درج کریں",
    },
    services: [
      "میٹا ایڈز اور UGC تخلیقات",
      "یوٹیوب آٹومیشن",
      "یوٹیوب اکاؤنٹ مینجمنٹ",
      "سوشل میڈیا ویڈیو کنٹینٹ",
      "یوٹیوب آٹومیشن ٹریننگ",
    ],
    budgets: ["$300 سے کم", "$300 – $800", "$800 – $2,000", "$2,000+", "بات چیت کریں"],
    directTitle: "براہِ راست رابطے",
    followTitle: "کام کو فالو کریں",
    whatsapp: "وہٹس ایپ",
    phone: "فون کال",
  },
  footer: {
    tagline: "ایڈٹ • تخلیق • تحریک",
    rights: "جملہ حقوق محفوظ ہیں۔",
    quickLinks: "فوری لنکس",
    servicesTitle: "خدمات",
    contactTitle: "رابطہ",
  },
  common: {
    demo: "ڈیمو",
    loading: "لوڈ ہو رہا ہے…",
    backToTop: "اوپر جائیں",
    language: "زبان",
  },
  countries: {
    pk: "پاکستان",
    us: "امریکہ",
    uk: "برطانیہ",
    ae: "متحدہ عرب امارات",
    om: "عمان",
    sa: "سعودی عرب",
    fr: "فرانس",
    de: "جرمنی",
    es: "اسپین",
    tr: "ترکی",
  },
};

export const fr: Dict = {
  dir: "ltr" as const,
  nav: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
    portfolio: "Portfolio",
    testimonials: "Témoignages",
    contact: "Contact",
    hireMe: "EMBAUCHEZ-MOI",
  },
  hero: {
    label: "BONJOUR, JE SUIS UBAID",
    line1: "ÉDITER. CRÉER.",
    line2: "INSPIRER.",
    description:
      "Je transforme les idées en expériences visuelles puissantes grâce au montage vidéo professionnel, à la narration cinématographique, aux motion graphics et à la publicité créative.",
    ctaWork: "EXPLORER MES PROJETS",
    ctaHire: "EMBAUCHEZ-MOI",
    listen: "ÉCOUTER MON INTRO",
    bgPlay: "Lire la vidéo de fond",
    bgPause: "Mettre la vidéo de fond en pause",
    cinema: "Écran noir",
    cinemaExit: "Quitter l'écran noir",
    available: "Disponible pour de nouveaux projets",
    scrollHint: "Faites défiler pour explorer",
    portraitCaption: "Ubaid — Monteur vidéo & Motion Designer",
    statYears: "Années d'expérience",
    statProjects: "Projets livrés",
    statClients: "Clients satisfaits",
  },
  intro: {
    greeting: "Bonjour, je suis Ubaid — appuyez pour découvrir qui je suis",
    title: "Bonjour, je suis Ubaid",
    subtitle: "Monteur vidéo & Motion Designer",
    play: "Écouter mon intro",
    pause: "Mettre l'intro en pause",
    loading: "Préparation de la voix…",
    years: "Années d'expérience",
    projects: "Projets réalisés",
    clients: "Clients satisfaits",
    blurb:
      "Je monte des publicités, du contenu YouTube, des spots de marque et des reels sociaux qui captent l'attention et vendent vraiment.",
    hire: "EMBAUCHEZ-MOI",
    voiceError: "L'intro vocale n'est pas encore prête — réessayez dans un instant.",
  },
  marquee: [
    "META ADS",
    "GESTION YOUTUBE",
    "CRÉATIFS UGC",
    "ÉTALONNAGE",
    "REELS SOCIAUX",
    "YOUTUBE SHORTS",
    "NARRATION VISUELLE",
    "SPOTS DE MARQUE",
  ],
  about: {
    kicker: "À PROPOS",
    heading: "DERRIÈRE LES IMAGES",
    paragraphs: [
      "Je suis Ubaid, monteur vidéo professionnel et spécialiste du contenu créatif. Je travaille sur du contenu vidéo captivant, des créatifs publicitaires, l'automatisation YouTube et la narration visuelle cinématographique.",
      "Je crois que chaque vidéo doit transmettre un message, capter l'attention et créer un réel impact.",
    ],
    philosophyTitle: "Philosophie créative",
    philosophy:
      "Un bon montage est invisible. Chaque coupe, chaque image et chaque son doit servir l'histoire — afin que le public ressente le message avant même de remarquer le travail derrière.",
    expertiseTitle: "Expertise montage",
    expertise: [
      "Créatifs publicitaires conçus pour convertir",
      "Montage narratif long format et documentaire",
      "Gestion de chaîne YouTube — publications, SEO et croissance",
      "Étalonnage et design sonore",
      "Montages pensés réseaux : hooks et rythme de rétention",
    ],
    approachTitle: "Ma méthode",
    approach:
      "Communication claire, délais honnêtes et processus de révision structuré. Vous savez toujours où en est votre projet — du premier brouillon au master final étalonné.",
    portraitCaption: "Ubaid — devant sa station de montage",
  },
  services: {
    kicker: "SERVICES",
    heading: "CE QUE JE CRÉE",
    subtitle:
      "Cinq services ciblés, un objectif : du contenu vidéo qui capte l'attention et produit des résultats.",
    viewProjects: "Voir les projets",
    items: [
      {
        title: "META ADS & CRÉATIFS UGC",
        description:
          "Facebook Ads, Instagram Ads, publicités UGC, spots produits, créatifs promotionnels et montage vidéo orienté conversion.",
        tags: ["Facebook Ads", "Instagram Ads", "UGC", "Conversion"],
      },
      {
        title: "AUTOMATISATION YOUTUBE",
        description:
          "Vidéos YouTube sans visage, montage documentaire, storytelling, montage long format, séquences d'archives, synchronisation voix-off et vidéos éducatives.",
        tags: ["Sans visage", "Documentaire", "Long format", "Voix-off"],
      },
      {
        title: "GESTION DE CHAÎNE YOUTUBE",
        description:
          "Gestion complète de votre chaîne YouTube — planification de contenu, calendrier de publication, titres, miniatures, balises SEO et croissance d'audience.",
        tags: ["Publications", "SEO", "Miniatures", "Croissance"],
      },
      {
        title: "CONTENU VIDÉO RÉSEAUX SOCIAUX",
        description:
          "Reels Instagram, vidéos TikTok, YouTube Shorts, reels de marque et contenu promotionnel.",
        tags: ["Reels", "TikTok", "Shorts", "Contenu de marque"],
      },
      {
        title: "FORMATION AUTOMATISATION YOUTUBE",
        description:
          "Apprenez l'automatisation YouTube de A à Z — recherche de niche, scripts, chaînes sans visage, systèmes de montage et monétisation, sur de vrais projets.",
        tags: ["Automatisation", "Sans visage", "Monétisation", "Mentorat"],
      },
    ],
  },
  portfolio: {
    kicker: "PORTFOLIO",
    heading: "TRAVAUX VIDÉO CINÉMATIQUES",
    subtitle:
      "Une sélection de contenus commerciaux, restaurants et sociaux — filtrez par catégorie et lancez un aperçu.",
    openPlayer: "Ouvrir le lecteur",
    close: "Fermer",
    allLabel: "TOUS LES PROJETS",
    empty: "Aucun projet dans cette catégorie pour le moment — de nouveaux travaux arrivent régulièrement.",
    realNotice:
      "Projets clients réels, téléversés directement depuis la suite de montage — de nouveaux travaux arrivent régulièrement.",
    categories: {
      "meta-ads": "META ADS",
      "ugc-ads": "PUBS UGC",
      restaurant: "VIDÉOS RESTAURANTS",
      "motion-graphics": "MOTION GRAPHICS",
      "social-reels": "REELS SOCIAUX",
    },
  },
  workflow: {
    kicker: "WORKFLOW CRÉATIF",
    heading: "DE L'IDÉE À L'IMPACT",
    subtitle: "Un processus cinématographique en quatre étapes, bâti sur la communication et le savoir-faire.",
    steps: {
      discover: { title: "DÉCOUVRIR", description: "Comprendre la marque et les objectifs du projet." },
      strategize: { title: "STRATÉGIE", description: "Développer la direction créative." },
      create: { title: "CRÉER", description: "Monter, animer et peaufiner le contenu." },
      deliver: { title: "LIVRER", description: "Livrer des vidéos finales professionnelles." },
    },
  },
  testimonials: {
    kicker: "TÉMOIGNAGES",
    heading: "UNE CONFIANCE BÂTIE PAR LA CRÉATIVITÉ",
    subtitle:
      "Retours des marques, restaurants et créateurs pour qui j'ai monté — chaque avis vient d'un projet livré.",
    allCountries: "TOUS LES PAYS",
    reviewCount: "avis",
  },
  contact: {
    kicker: "CONTACT",
    heading: "CRÉONS QUELQUE CHOSE D'EXTRAORDINAIRE.",
    subheading:
      "Une idée, une marque, un projet ? Transformons-le en contenu visuel puissant.",
    form: {
      name: "Nom complet",
      email: "E-mail",
      company: "Société",
      service: "Service souhaité",
      message: "Description du projet",
      budget: "Budget",
      submit: "ENVOYER LE BRIEF",
      submitting: "Envoi…",
      success: "Brief bien reçu — je réponds sous un jour ouvré.",
      error: "Une erreur est survenue. Réessayez ou contactez-moi sur WhatsApp.",
      required: "Champ requis",
      invalidEmail: "Veuillez saisir un e-mail valide",
    },
    services: [
      "Meta Ads & Créatifs UGC",
      "Automatisation YouTube",
      "Gestion de chaîne YouTube",
      "Contenu vidéo réseaux sociaux",
      "Formation automatisation YouTube",
    ],
    budgets: ["Moins de 300 $", "300 – 800 $", "800 – 2 000 $", "2 000 $+", "À discuter"],
    directTitle: "Canaux directs",
    followTitle: "Suivre les projets",
    whatsapp: "WhatsApp",
    phone: "Appel téléphonique",
  },
  footer: {
    tagline: "ÉDITER • CRÉER • INSPIRER",
    rights: "Tous droits réservés.",
    quickLinks: "Liens rapides",
    servicesTitle: "Services",
    contactTitle: "Contact",
  },
  common: {
    demo: "DÉMO",
    loading: "Chargement…",
    backToTop: "Haut de page",
    language: "Langue",
  },
  countries: {
    pk: "Pakistan",
    us: "États-Unis",
    uk: "Royaume-Uni",
    ae: "Émirats Arabes Unis",
    om: "Oman",
    sa: "Arabie Saoudite",
    fr: "France",
    de: "Allemagne",
    es: "Espagne",
    tr: "Turquie",
  },
};

export const de: Dict = {
  dir: "ltr" as const,
  nav: {
    home: "Start",
    about: "Über mich",
    services: "Leistungen",
    portfolio: "Portfolio",
    testimonials: "Referenzen",
    contact: "Kontakt",
    hireMe: "ANHEUERN",
  },
  hero: {
    label: "HALLO, ICH BIN UBAID",
    line1: "SCHNEIDEN. GESTALTEN.",
    line2: "BEEINDRUCKEN.",
    description:
      "Ich verwandle Ideen in kraftvolle visuelle Erlebnisse durch professionelle Videobearbeitung, filmisches Storytelling, Motion Graphics und kreative Werbung.",
    ctaWork: "MEINE ARBEITEN ANSEHEN",
    ctaHire: "ANHEUERN",
    listen: "MEIN INTRO ANHÖREN",
    bgPlay: "Hintergrundvideo abspielen",
    bgPause: "Hintergrundvideo pausieren",
    cinema: "Schwarzer Bildschirm",
    cinemaExit: "Schwarzen Bildschirm beenden",
    available: "Verfügbar für neue Projekte",
    scrollHint: "Scrollen zum Entdecken",
    portraitCaption: "Ubaid — Videoeditor & Motion Designer",
    statYears: "Jahre Erfahrung",
    statProjects: "Gelieferte Projekte",
    statClients: "Zufriedene Kunden",
  },
  intro: {
    greeting: "Hallo, ich bin Ubaid — tippen, um zu erfahren, wer ich bin",
    title: "Hallo, ich bin Ubaid",
    subtitle: "Videoeditor & Motion Designer",
    play: "Mein Intro abspielen",
    pause: "Intro pausieren",
    loading: "Stimme wird vorbereitet…",
    years: "Jahre Erfahrung",
    projects: "Projekte erledigt",
    clients: "Zufriedene Kunden",
    blurb:
      "Ich schneide Werbespots, YouTube-Inhalte, Markenfilme und Social Reels, die Aufmerksamkeit erfassen und wirklich verkaufen.",
    hire: "ANHEUERN",
    voiceError: "Das Sprachintro ist noch nicht bereit — bitte gleich nochmal versuchen.",
  },
  marquee: [
    "META ADS",
    "YOUTUBE-MANAGEMENT",
    "UGC CREATIVES",
    "COLOR GRADING",
    "SOCIAL REELS",
    "YOUTUBE SHORTS",
    "STORYTELLING",
    "MARKENSPOTS",
  ],
  about: {
    kicker: "ÜBER MICH",
    heading: "HINTER DEN BILDERN",
    paragraphs: [
      "Ich bin Ubaid, professioneller Videoeditor und Spezialist für kreative Inhalte. Ich arbeite an fesselnden Videoinhalten, Werbekreativen, YouTube-Automatisierung und filmischem visuellem Storytelling.",
      "Ich glaube, dass jedes Video eine Botschaft vermitteln, Aufmerksamkeit erfassen und Wirkung erzielen muss.",
    ],
    philosophyTitle: "Kreative Philosophie",
    philosophy:
      "Gutes Editing ist unsichtbar. Jeder Schnitt, jedes Bild und jeder Ton muss der Geschichte dienen — damit das Publikum die Botschaft spürt, bevor es das Handwerk dahinter bemerkt.",
    expertiseTitle: "Editing-Expertise",
    expertise: [
      "Werbekreatives, das auf Conversion ausgelegt ist",
      "Langformat-Storytelling und Dokumentar-Schnitt",
      "YouTube-Kanal-Management — Uploads, SEO & Kanalwachstum",
      "Color Grading und Sounddesign",
      "Social-First-Schnitte, Hooks und Retention-Timing",
    ],
    approachTitle: "Wie ich arbeite",
    approach:
      "Klare Kommunikation, ehrliche Zeitpläne und ein strukturierter Review-Prozess. Sie wissen immer, wo Ihr Projekt steht — vom ersten Entwurf bis zum finalen Color-Grade-Master.",
    portraitCaption: "Ubaid — am Editing-Platz",
  },
  services: {
    kicker: "LEISTUNGEN",
    heading: "WAS ICH GESTALTE",
    subtitle:
      "Fünf fokussierte Leistungen, ein Ziel: Videoinhalte, die Aufmerksamkeit erfassen und Ergebnisse liefern.",
    viewProjects: "Projekte ansehen",
    items: [
      {
        title: "META ADS & UGC CREATIVES",
        description:
          "Facebook Ads, Instagram Ads, UGC-Werbung, Produktsspots, Promo-Kreatives und conversion-orientierte Videobearbeitung.",
        tags: ["Facebook Ads", "Instagram Ads", "UGC", "Conversion"],
      },
      {
        title: "YOUTUBE AUTOMATION",
        description:
          "Gesichtslose YouTube-Videos, Dokumentar-Schnitt, Storytelling, Langformat-Bearbeitung, Stock-Footage, Voice-Over-Synchronisation und Lernvideos.",
        tags: ["Gesichtslos", "Dokumentation", "Langformat", "Voice-Over"],
      },
      {
        title: "YOUTUBE-KANAL-MANAGEMENT",
        description:
          "Komplette Verwaltung Ihres YouTube-Kanals — Contentplanung, Upload-Plan, Titel, Thumbnails, SEO-Tags und Zielgruppenwachstum.",
        tags: ["Uploads", "SEO", "Thumbnails", "Wachstum"],
      },
      {
        title: "SOCIAL MEDIA VIDEO CONTENT",
        description:
          "Instagram Reels, TikTok-Videos, YouTube Shorts, Marken-Reels und Promo-Inhalte.",
        tags: ["Reels", "TikTok", "Shorts", "Markeninhalte"],
      },
      {
        title: "YOUTUBE-AUTOMATISIERUNG-TRAINING",
        description:
          "YouTube-Automatisierung von A bis Z lernen — Nischenrecherche, Skripte, gesichtslose Kanäle, Editing-Systeme und Monetarisierung, an echten Projekten.",
        tags: ["Automatisierung", "Gesichtslos", "Monetarisierung", "Mentoring"],
      },
    ],
  },
  portfolio: {
    kicker: "PORTFOLIO",
    heading: "FILMISCHES VIDEO-WERK",
    subtitle:
      "Eine Auswahl kommerzieller, Restaurant- und Social-Inhalte — nach Kategorie filtern und Vorschau abspielen.",
    openPlayer: "Player öffnen",
    close: "Schließen",
    allLabel: "ALLE PROJEKTE",
    empty: "Noch keine Projekte in dieser Kategorie — neue Arbeiten kommen regelmäßig dazu.",
    realNotice:
      "Echte Kundenprojekte, direkt vom Schnittplatz hochgeladen — neue Arbeiten kommen regelmäßig dazu.",
    categories: {
      "meta-ads": "META ADS",
      "ugc-ads": "UGC-WERBUNG",
      restaurant: "RESTAURANT-VIDEOS",
      "motion-graphics": "MOTION GRAPHICS",
      "social-reels": "SOCIAL REELS",
    },
  },
  workflow: {
    kicker: "KREATIVER WORKFLOW",
    heading: "VON DER IDEE ZUR WIRKUNG",
    subtitle: "Ein filmischer Vier-Phasen-Prozess, gebaut auf Kommunikation und Handwerk.",
    steps: {
      discover: { title: "ENTDECKEN", description: "Marke und Projektziele verstehen." },
      strategize: { title: "PLANEN", description: "Die kreative Richtung entwickeln." },
      create: { title: "GESTALTEN", description: "Schneiden, animieren und polieren." },
      deliver: { title: "LIEFERN", description: "Professionelle Finalvideos übergeben." },
    },
  },
  testimonials: {
    kicker: "REFERENZEN",
    heading: "VERTRAUEN DURCH KREATIVITÄT",
    subtitle:
      "Feedback von Marken, Restaurants und Creators, für die ich geschnitten habe — jede Bewertung stammt aus einem gelieferten Projekt.",
    allCountries: "ALLE LÄNDER",
    reviewCount: "Bewertungen",
  },
  contact: {
    kicker: "KONTAKT",
    heading: "LASST UNS ETWAS AUßERGEWÖHNLICHES SCHAFFEN.",
    subheading:
      "Eine Idee, eine Marke, ein Projekt? Verwandeln wir es in starke visuelle Inhalte.",
    form: {
      name: "Vollständiger Name",
      email: "E-Mail",
      company: "Unternehmen",
      service: "Gewünschte Leistung",
      message: "Projektbeschreibung",
      budget: "Budget",
      submit: "PROJEKTBRIEF SENDEN",
      submitting: "Wird gesendet…",
      success: "Brief erhalten — ich antworte innerhalb eines Werktags.",
      error: "Etwas ist schiefgelaufen. Bitte erneut versuchen oder per WhatsApp melden.",
      required: "Pflichtfeld",
      invalidEmail: "Bitte eine gültige E-Mail eingeben",
    },
    services: [
      "Meta Ads & UGC Creatives",
      "YouTube Automation",
      "YouTube-Kanal-Management",
      "Social Media Video Content",
      "YouTube-Automatisierung-Training",
    ],
    budgets: ["Unter 300 $", "300 – 800 $", "800 – 2.000 $", "2.000 $+", "Lassen Sie uns sprechen"],
    directTitle: "Direkte Kanäle",
    followTitle: "Der Arbeit folgen",
    whatsapp: "WhatsApp",
    phone: "Telefonanruf",
  },
  footer: {
    tagline: "SCHNEIDEN • GESTALTEN • BEEINDRUCKEN",
    rights: "Alle Rechte vorbehalten.",
    quickLinks: "Schnelllinks",
    servicesTitle: "Leistungen",
    contactTitle: "Kontakt",
  },
  common: {
    demo: "DEMO",
    loading: "Wird geladen…",
    backToTop: "Nach oben",
    language: "Sprache",
  },
  countries: {
    pk: "Pakistan",
    us: "USA",
    uk: "Großbritannien",
    ae: "VAE",
    om: "Oman",
    sa: "Saudi-Arabien",
    fr: "Frankreich",
    de: "Deutschland",
    es: "Spanien",
    tr: "Türkei",
  },
};

export const es: Dict = {
  dir: "ltr" as const,
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    services: "Servicios",
    portfolio: "Portafolio",
    testimonials: "Testimonios",
    contact: "Contacto",
    hireMe: "CONTRÁTAME",
  },
  hero: {
    label: "HOLA, SOY UBAID",
    line1: "EDITAR. CREAR.",
    line2: "INSPIRAR.",
    description:
      "Transformo ideas en experiencias visuales poderosas mediante edición de video profesional, narrativa cinematográfica, motion graphics y publicidad creativa.",
    ctaWork: "EXPLORA MI TRABAJO",
    ctaHire: "CONTRÁTAME",
    listen: "ESCUCHA MI INTRO",
    bgPlay: "Reproducir video de fondo",
    bgPause: "Pausar video de fondo",
    cinema: "Pantalla negra",
    cinemaExit: "Salir de pantalla negra",
    available: "Disponible para nuevos proyectos",
    scrollHint: "Desliza para explorar",
    portraitCaption: "Ubaid — Editor de video y Motion Designer",
    statYears: "Años de experiencia",
    statProjects: "Proyectos entregados",
    statClients: "Clientes felices",
  },
  intro: {
    greeting: "Hola, soy Ubaid — toca para saber quién soy",
    title: "Hola, soy Ubaid",
    subtitle: "Editor de video y Motion Designer",
    play: "Reproducir mi intro",
    pause: "Pausar intro",
    loading: "Preparando la voz…",
    years: "Años de experiencia",
    projects: "Proyectos hechos",
    clients: "Clientes felices",
    blurb:
      "Edito anuncios, contenido de YouTube, comerciales de marca y reels sociales que captan la atención y de verdad venden.",
    hire: "CONTRÁTAME",
    voiceError: "La intro de voz aún no está lista — inténtalo de nuevo en un momento.",
  },
  marquee: [
    "META ADS",
    "GESTIÓN DE YOUTUBE",
    "CREATIVOS UGC",
    "COLOR GRADING",
    "REELS SOCIALES",
    "YOUTUBE SHORTS",
    "STORYTELLING",
    "COMERCIALES DE MARCA",
  ],
  about: {
    kicker: "SOBRE MÍ",
    heading: "DETRÁS DE LAS IMÁGENES",
    paragraphs: [
      "Soy Ubaid, editor de video profesional y especialista en contenido creativo. Trabajo en contenido de video atractivo, creatividades publicitarias, automatización de YouTube y narrativa visual cinematográfica.",
      "Creo que cada video debe comunicar un mensaje, captar la atención y crear un impacto.",
    ],
    philosophyTitle: "Filosofía creativa",
    philosophy:
      "La gran edición es invisible. Cada corte, cada fotograma y cada sonido deben servir a la historia — para que la audiencia sienta el mensaje antes de notar el oficio detrás.",
    expertiseTitle: "Experiencia en edición",
    expertise: [
      "Creatividades publicitarias diseñadas para convertir",
      "Edición narrativa de formato largo y documental",
      "Gestión de canal de YouTube — publicaciones, SEO y crecimiento",
      "Color grading y diseño de sonido",
      "Cortes para redes, ganchos y ritmo de retención",
    ],
    approachTitle: "Cómo trabajo",
    approach:
      "Comunicación clara, plazos honestos y un proceso de revisión estructurado. Siempre sabes en qué está tu proyecto — del primer borrador a la copia maestra con el color final.",
    portraitCaption: "Ubaid — en su suite de edición",
  },
  services: {
    kicker: "SERVICIOS",
    heading: "LO QUE CREO",
    subtitle:
      "Cinco servicios enfocados, una meta: contenido de video que capta la atención y genera resultados.",
    viewProjects: "Ver proyectos",
    items: [
      {
        title: "META ADS & CREATIVOS UGC",
        description:
          "Facebook Ads, Instagram Ads, anuncios UGC, comerciales de producto, creatividades promocionales y edición orientada a la conversión.",
        tags: ["Facebook Ads", "Instagram Ads", "UGC", "Conversión"],
      },
      {
        title: "AUTOMATIZACIÓN DE YOUTUBE",
        description:
          "Videos de YouTube sin rostro, edición documental, narrativa, edición de formato largo, material de archivo, sincronización de voz en off y videos educativos.",
        tags: ["Sin rostro", "Documental", "Formato largo", "Voz en off"],
      },
      {
        title: "GESTIÓN DE CANAL DE YOUTUBE",
        description:
          "Gestión completa de tu canal de YouTube — planificación de contenido, calendario de publicaciones, títulos, miniaturas, etiquetas SEO y crecimiento de audiencia.",
        tags: ["Publicaciones", "SEO", "Miniaturas", "Crecimiento"],
      },
      {
        title: "CONTENIDO DE VIDEO PARA REDES",
        description:
          "Reels de Instagram, videos de TikTok, YouTube Shorts, reels de marca y contenido promocional.",
        tags: ["Reels", "TikTok", "Shorts", "Contenido de marca"],
      },
      {
        title: "FORMACIÓN EN AUTOMATIZACIÓN DE YOUTUBE",
        description:
          "Aprende automatización de YouTube de principio a fin — investigación de nicho, guiones, canales sin rostro, sistemas de edición y monetización, con proyectos reales.",
        tags: ["Automatización", "Sin rostro", "Monetización", "Mentoría"],
      },
    ],
  },
  portfolio: {
    kicker: "PORTAFOLIO",
    heading: "TRABAJO DE VIDEO CINEMATOGRÁFICO",
    subtitle:
      "Una selección de contenido comercial, de restaurantes y social — filtra por categoría y reproduce una vista previa.",
    openPlayer: "Abrir reproductor",
    close: "Cerrar",
    allLabel: "TODOS LOS PROYECTOS",
    empty: "Aún no hay proyectos en esta categoría — se añaden trabajos nuevos con regularidad.",
    realNotice:
      "Proyectos reales de clientes, subidos directamente desde la suite de edición — se añaden trabajos nuevos con regularidad.",
    categories: {
      "meta-ads": "META ADS",
      "ugc-ads": "ANUNCIOS UGC",
      restaurant: "VIDEOS DE RESTAURANTES",
      "motion-graphics": "MOTION GRAPHICS",
      "social-reels": "REELS SOCIALES",
    },
  },
  workflow: {
    kicker: "FLUJO CREATIVO",
    heading: "DE LA IDEA AL IMPACTO",
    subtitle: "Un proceso cinematográfico de cuatro etapas basado en comunicación y oficio.",
    steps: {
      discover: { title: "DESCUBRIR", description: "Entender la marca y los objetivos del proyecto." },
      strategize: { title: "ESTRATEGIA", description: "Desarrollar la dirección creativa." },
      create: { title: "CREAR", description: "Editar, animar y pulir el contenido." },
      deliver: { title: "ENTREGAR", description: "Entregar videos finales profesionales." },
    },
  },
  testimonials: {
    kicker: "TESTIMONIOS",
    heading: "CONFIANZA CONSTRUIDA CON CREATIVIDAD",
    subtitle:
      "Opiniones de marcas, restaurantes y creadores para quienes he editado — cada reseña proviene de un proyecto entregado.",
    allCountries: "TODOS LOS PAÍSES",
    reviewCount: "reseñas",
  },
  contact: {
    kicker: "CONTACTO",
    heading: "CREEMOS ALGO EXTRAORDINARIO.",
    subheading:
      "¿Tienes una idea, una marca o un proyecto? Convirtámoslo en contenido visual poderoso.",
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      company: "Empresa",
      service: "Servicio requerido",
      message: "Descripción del proyecto",
      budget: "Presupuesto",
      submit: "ENVIAR BRIEF DEL PROYECTO",
      submitting: "Enviando…",
      success: "Brief recibido — responderé en un día hábil.",
      error: "Algo salió mal. Inténtalo de nuevo o contáctame por WhatsApp.",
      required: "Campo obligatorio",
      invalidEmail: "Ingresa un correo válido",
    },
    services: [
      "Meta Ads & Creativos UGC",
      "Automatización de YouTube",
      "Gestión de canal de YouTube",
      "Contenido de video para redes",
      "Formación en automatización de YouTube",
    ],
    budgets: ["Menos de $300", "$300 – $800", "$800 – $2,000", "$2,000+", "Hablemos"],
    directTitle: "Canales directos",
    followTitle: "Sigue el trabajo",
    whatsapp: "WhatsApp",
    phone: "Llamada telefónica",
  },
  footer: {
    tagline: "EDITAR • CREAR • INSPIRAR",
    rights: "Todos los derechos reservados.",
    quickLinks: "Enlaces rápidos",
    servicesTitle: "Servicios",
    contactTitle: "Contacto",
  },
  common: {
    demo: "DEMO",
    loading: "Cargando…",
    backToTop: "Volver arriba",
    language: "Idioma",
  },
  countries: {
    pk: "Pakistán",
    us: "Estados Unidos",
    uk: "Reino Unido",
    ae: "EAU",
    om: "Omán",
    sa: "Arabia Saudita",
    fr: "Francia",
    de: "Alemania",
    es: "España",
    tr: "Turquía",
  },
};

export const tr: Dict = {
  dir: "ltr" as const,
  nav: {
    home: "Anasayfa",
    about: "Hakkımda",
    services: "Hizmetler",
    portfolio: "Portfolyo",
    testimonials: "Referanslar",
    contact: "İletişim",
    hireMe: "BENİ İŞE AL",
  },
  hero: {
    label: "MERHABA, BEN UBAİD",
    line1: "KES. YARAT.",
    line2: "İLHAM VER.",
    description:
      "Profesyonel video kurgu, sinematik hikâye anlatımı, motion graphics ve yaratıcı reklamcılıkla fikirleri güçlü görsel deneyimlere dönüştürüyorum.",
    ctaWork: "ÇALIŞMALARIMI KEŞFET",
    ctaHire: "BENİ İŞE AL",
    listen: "TANITIMIMI DİNLE",
    bgPlay: "Arka plan videosunu oynat",
    bgPause: "Arka plan videosunu duraklat",
    cinema: "Siyah ekran",
    cinemaExit: "Siyah ekrandan çık",
    available: "Yeni projelere açık",
    scrollHint: "Keşfetmek için kaydırın",
    portraitCaption: "Ubaid — Video Kurgucu & Motion Tasarımcı",
    statYears: "Yıl deneyim",
    statProjects: "Teslim edilen proje",
    statClients: "Mutlu müşteri",
  },
  intro: {
    greeting: "Merhaba, ben Ubaid — kim olduğumu öğrenmek için dokun",
    title: "Merhaba, ben Ubaid",
    subtitle: "Video Kurgucu & Motion Tasarımcı",
    play: "Tanıtımımı oynat",
    pause: "Tanıtımı duraklat",
    loading: "Ses hazırlanıyor…",
    years: "Yıl deneyim",
    projects: "Tamamlanan proje",
    clients: "Mutlu müşteri",
    blurb:
      "Dikkat çeken ve gerçekten satan reklamlar, YouTube içerikleri, marka filmleri ve sosyal medya reelsleri kurguluyorum.",
    hire: "BENİ İŞE AL",
    voiceError: "Sesli tanıtım henüz hazır değil — birazdan tekrar deneyin.",
  },
  marquee: [
    "META REKLAMLAR",
    "YOUTUBE YÖNETİMİ",
    "UGC İÇERİKLERİ",
    "RENK DÜZENLEME",
    "SOSYAL REELS",
    "YOUTUBE SHORTS",
    "HİKÂYE ANLATIMI",
    "MARKA FİLMLERİ",
  ],
  about: {
    kicker: "HAKKIMDA",
    heading: "GÖRSELLERİN ARKASINDA",
    paragraphs: [
      "Ben Ubaid; profesyonel bir video kurgucu ve yaratıcı içerik uzmanıyım. Etkileyici video içerikleri, reklam kreatifleri, YouTube otomasyonu ve sinematik görsel hikâye anlatımı üzerine çalışıyorum.",
      "Her videonun bir mesaj iletmeyi, dikkat çekmeyi ve etki yaratmayı hak ettiğine inanıyorum.",
    ],
    philosophyTitle: "Yaratıcı felsefe",
    philosophy:
      "İyi kurgu görünmezdir. Her kesiş, her kare ve her ses hikâyeye hizmet etmeli — seyirci, arkasındaki emeği fark etmeden önce mesajı hissetmeli.",
    expertiseTitle: "Kurgu uzmanlığı",
    expertise: [
      "Dönüşüm için tasarlanmış reklam kreatifleri",
      "Uzun format hikâye anlatımı ve belgesel kurgu",
      "YouTube kanal yönetimi — yüklemeler, SEO ve kanal büyümesi",
      "Renk düzenleme ve ses tasarımı",
      "Sosyal odaklı kesimler, kanca (hook) ve izlenme ritmi",
    ],
    approachTitle: "Çalışma şeklim",
    approach:
      "Net iletişim, dürüst zaman çizelgeleri ve yapılandırılmış bir revizyon süreci. Projenizin nerede olduğunu her zaman bilirsiniz — ilk taslaktan renk düzenlemesi yapılmış final kopyasına kadar.",
    portraitCaption: "Ubaid — kurgu masasında",
  },
  services: {
    kicker: "HİZMETLER",
    heading: "NELER YARATIYORUM",
    subtitle:
      "Beş odaklı hizmet, tek amaç: dikkat çeken ve sonuç üreten video içerik.",
    viewProjects: "Projeleri gör",
    items: [
      {
        title: "META REKLAMLAR & UGC KREATİFLERİ",
        description:
          "Facebook Ads, Instagram Ads, UGC reklamları, ürün filmleri, tanıtım kreatifleri ve dönüşüm odaklı video kurgu.",
        tags: ["Facebook Ads", "Instagram Ads", "UGC", "Dönüşüm"],
      },
      {
        title: "YOUTUBE OTOMASYONU",
        description:
          "Yüzsüz YouTube videoları, belgesel kurgu, hikâye anlatımı, uzun format kurgu, arşiv görüntüleri, seslendirme senkronu ve eğitici videolar.",
        tags: ["Yüzsüz", "Belgesel", "Uzun format", "Seslendirme"],
      },
      {
        title: "YOUTUBE KANAL YÖNETİMİ",
        description:
          "YouTube kanalınızın tam yönetimi — içerik planlaması, yükleme takvimi, başlıklar, kapak görselleri, SEO etiketleri ve kitle büyümesi.",
        tags: ["Yüklemeler", "SEO", "Kapak görselleri", "Büyüme"],
      },
      {
        title: "SOSYAL MEDYA VİDEO İÇERİĞİ",
        description:
          "Instagram Reels, TikTok videoları, YouTube Shorts, marka reelsleri ve tanıtım içerikleri.",
        tags: ["Reels", "TikTok", "Shorts", "Marka içeriği"],
      },
      {
        title: "YOUTUBE OTOMASYONU EĞİTİMİ",
        description:
          "YouTube otomasyonunu baştan sona öğrenin — niş araştırması, senaryo yazarlığı, yüzsüz kanallar, kurgu sistemleri ve para kazanma, gerçek projelerle.",
        tags: ["Otomasyon", "Yüzsüz", "Para kazanma", "Mentorluk"],
      },
    ],
  },
  portfolio: {
    kicker: "PORTFOLYO",
    heading: "SİNEMATİK VİDEO ÇALIŞMALARI",
    subtitle:
      "Ticari, restoran ve sosyal içerikten bir seçki — kategoriye göre filtreleyin ve önizlemeyi oynatın.",
    openPlayer: "Oynatıcıyı aç",
    close: "Kapat",
    allLabel: "TÜM PROJELER",
    empty: "Bu kategoride henüz proje yok — yeni çalışmalar düzenli olarak ekleniyor.",
    realNotice:
      "Gerçek müşteri projeleri — doğrudan kurgu odasından yüklendi, yeni çalışmalar düzenli olarak ekleniyor.",
    categories: {
      "meta-ads": "META REKLAMLAR",
      "ugc-ads": "UGC REKLAMLARI",
      restaurant: "RESTORAN VİDEOLARI",
      "motion-graphics": "MOTION GRAPHICS",
      "social-reels": "SOSYAL REELS",
    },
  },
  workflow: {
    kicker: "YARATIC İŞ AKIŞI",
    heading: "FİKİRDEN ETKİYE",
    subtitle: "İletişim ve ustalık üzerine kurulu sinematik, dört aşamalı süreç.",
    steps: {
      discover: { title: "KEŞFET", description: "Markayı ve proje hedeflerini anlamak." },
      strategize: { title: "STRATEJİ", description: "Yaratıcı yönü geliştirmek." },
      create: { title: "YARAT", description: "Kurgulamak, animasyon eklemek ve parlatmak." },
      deliver: { title: "TESLİM", description: "Profesyonel final videolarını teslim etmek." },
    },
  },
  testimonials: {
    kicker: "REFERANSLAR",
    heading: "YARATICILIKLA KAZANILAN GÜVEN",
    subtitle:
      "İçin kurgu yaptığım markaların, restoranların ve içerik üreticilerinin geri bildirimleri — her yorum teslim edilen bir projeden gelir.",
    allCountries: "TÜM ÜLKELER",
    reviewCount: "yorum",
  },
  contact: {
    kicker: "İLETİŞİM",
    heading: "OLAĞANÜSTÜ BİR ŞEY YARATALIM.",
    subheading:
      "Bir fikriniz, markanız veya projeniz mi var? Bunu güçlü görsel içeriğe dönüştürelim.",
    form: {
      name: "Ad soyad",
      email: "E-posta",
      company: "Şirket",
      service: "İstenen hizmet",
      message: "Proje açıklaması",
      budget: "Bütçe",
      submit: "PROJE BRIEFİ GÖNDER",
      submitting: "Gönderiliyor…",
      success: "Brief alındı — bir iş günü içinde yanıt vereceğim.",
      error: "Bir şeyler ters gitti. Tekrar deneyin veya WhatsApp'tan yazın.",
      required: "Zorunlu alan",
      invalidEmail: "Geçerli bir e-posta girin",
    },
    services: [
      "Meta Reklamlar & UGC Kreatifleri",
      "YouTube Otomasyonu",
      "YouTube Kanal Yönetimi",
      "Sosyal Medya Video İçeriği",
      "YouTube Otomasyonu Eğitimi",
    ],
    budgets: ["$300 altı", "$300 – $800", "$800 – $2.000", "$2.000+", "Konuşalım"],
    directTitle: "Doğrudan kanallar",
    followTitle: "Çalışmaları takip et",
    whatsapp: "WhatsApp",
    phone: "Telefon araması",
  },
  footer: {
    tagline: "KES • YARAT • İLHAM VER",
    rights: "Tüm hakları saklıdır.",
    quickLinks: "Hızlı bağlantılar",
    servicesTitle: "Hizmetler",
    contactTitle: "İletişim",
  },
  common: {
    demo: "DEMO",
    loading: "Yükleniyor…",
    backToTop: "Başa dön",
    language: "Dil",
  },
  countries: {
    pk: "Pakistan",
    us: "ABD",
    uk: "Birleşik Krallık",
    ae: "BAE",
    om: "Umman",
    sa: "Suudi Arabistan",
    fr: "Fransa",
    de: "Almanya",
    es: "İspanya",
    tr: "Türkiye",
  },
};

/* All dictionaries keyed by locale (used by the LanguageProvider). */
export const DICTS: Record<Locale, Dict> = {
  en,
  "en-GB": enGB,
  ur,
  "ar-AE": arAE,
  "ar-OM": arOM,
  "ar-SA": arSA,
  fr,
  de,
  es,
  tr,
};
