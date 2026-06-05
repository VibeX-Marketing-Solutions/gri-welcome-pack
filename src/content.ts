// ─────────────────────────────────────────────────────────────────────────
// Single source of content for the GRI NZ Welcome Pack.
// Both the PDF (React) and DOCX renderers read from this file.
// ─────────────────────────────────────────────────────────────────────────

export type Resource = {
  name: string;
  note?: string;
  link?: string;
  contacts?: string[];
  logo?: string;
  /** Placeholder image slot — real photo dropped in later. label shows inside. */
  image?: { src?: string; label: string };
  qr?: string;
  preferred?: boolean;
};

export type Destination = {
  name: string;
  region?: string;
  blurb: string;
};

export type Section = {
  num: number;
  title: string;
  highlight?: string;
  intro?: string;
  resources?: Resource[];
  notes?: string[];
  destinations?: Destination[];
  /** Renders compact cards (no image slot) for link-dense sections. */
  compact?: boolean;
  /** Special full-page renderers. */
  variant?: "map" | "destinations";
  /** When set, a photo divider for this group is rendered before the section. */
  group?: string;
};

export type ThemeGroup = {
  key: string;
  title: string;
  subtitle: string;
  photo: string;
};

export const GROUPS: Record<string, ThemeGroup> = {
  arrival: {
    key: "arrival",
    title: "Arrival & Travel",
    subtitle: "Getting to New Zealand and through the border with ease.",
    photo: "/img/photos/divider-arrival.jpg",
  },
  settling: {
    key: "settling",
    title: "Settling In",
    subtitle: "A roof over your head, a connection, and the essentials of daily life.",
    photo: "/img/photos/divider-settling.jpg",
  },
  money: {
    key: "money",
    title: "Money & Getting Around",
    subtitle: "Tax, banking and transport — the paperwork that gets you moving.",
    photo: "/img/photos/divider-money.jpg",
  },
  daily: {
    key: "daily",
    title: "Daily Life",
    subtitle: "Healthcare, home essentials, groceries and getting around town.",
    photo: "/img/photos/divider-daily.jpg",
  },
  work: {
    key: "work",
    title: "Work & Careers",
    subtitle: "Building your CV, finding part-time work and getting on the road.",
    photo: "/img/photos/divider-work.jpg",
  },
  family: {
    key: "family",
    title: "Family & Exploring",
    subtitle: "Schools, support services and unforgettable places to visit.",
    photo: "/img/photos/divider-family.jpg",
  },
};

export const META = {
  brand: "GRI Education",
  country: "New Zealand",
  title: "Welcome to New Zealand",
  subtitle: "Student Settlement Guide",
  tagline: "Your Future Begins Here",
  edition: "International Student Edition",
  coverPhoto: "/img/photos/cover.jpg",
};

export const DIRECTORS = [
  {
    name: "Mr. Prasad Perera",
    role: "Director & Co-founder",
    org: "GRI Education New Zealand",
    phone: "+64 21 0246 7780",
    email: "prasad.perera@grieducation.com",
  },
  {
    name: "Mr. Nagendra Chauhan",
    role: "Director & Co-founder",
    org: "GRI Education New Zealand",
    phone: "+64 21 0272 0229",
    email: "nagendra.chauhan@grieducation.com",
  },
];

export const LETTER = {
  greeting: "Kia Ora,",
  heading: "Message from the Directors",
  highlight: "Directors",
  paragraphs: [
    "Congratulations on taking this significant step toward your future. Choosing to study in New Zealand is not just an academic decision — it is a life decision. It reflects ambition, courage, and a strong desire to build a better future for yourself and your family.",
    "We understand that moving to a new country can feel both exciting and overwhelming. Leaving familiar surroundings, adapting to a different culture, managing finances independently, and navigating a new education and employment system all require preparation and resilience. That is precisely why we have prepared this Settlement Guide — to ensure you arrive informed, confident, and supported from day one.",
    "At GRI Education, our responsibility does not end with securing your admission or visa approval. In many ways, that is only the beginning. Our true commitment starts when you land in New Zealand. We are here to guide you through settlement, part-time employment pathways, financial planning, visa conditions, career development, and long-term migration options.",
    "Your first six months in New Zealand are especially important. The habits you build, the decisions you make, and the mindset you adopt during this period will significantly influence your long-term outcomes. Please remember that you are not alone in this journey — you are now part of the GRI family.",
  ],
  foundations: [
    "Discipline and effective time management",
    "Responsible financial planning and budgeting",
    "Strict compliance with visa conditions and local laws",
    "Patience and persistence when seeking employment",
    "A willingness to begin with entry-level opportunities and grow steadily",
  ],
  quote:
    "Your journey begins with education, but your future is shaped by the mindset you choose every day.",
};

export const SECTIONS: Section[] = [
  // ── ARRIVAL & TRAVEL ────────────────────────────────────────────────────
  {
    num: 1,
    title: "Air Tickets",
    group: "arrival",
    intro:
      "Looking for the cheapest and most reasonable air tickets? Our preferred partner helps you find the best flight deals — affordable, comfortable, and flexible, with exclusive discounts and a hassle-free booking process, especially for students. Book smart and travel light.",
    resources: [
      {
        name: "Glow Trips",
        note: "Exclusive student fares & flexible booking",
        link: "https://glowtravel.tours/",
        image: { label: "Glow Trips travel photo" },
        qr: "/img/qr/glowtrips.png",
        preferred: true,
      },
    ],
  },
  {
    num: 2,
    title: "New Zealand Traveller Declaration",
    highlight: "Declaration",
    intro:
      "The New Zealand Traveller Declaration (NZTD) is a mandatory online form every traveller must complete before entering New Zealand. It replaces the old paper arrival card and collects your travel details, passport information, NZ contact address, and customs or biosecurity declarations (food, medicine, or large amounts of cash). Complete it online or via the free NZTD app, ideally within 24 hours before departure, to ensure a smooth arrival and avoid delays or fines at the border.",
    resources: [
      {
        name: "NZ Traveller Declaration",
        note: "Official government declaration portal",
        link: "https://www.travellerdeclaration.govt.nz/completing-your-declaration/",
        image: { label: "NZTD / border arrival photo" },
        qr: "/img/qr/nztd.png",
      },
    ],
  },
  {
    num: 3,
    title: "Airport Pickup",
    intro:
      "Airport pickup is a convenient, hassle-free way to start your trip. Choose from taxis, shuttles, and private transfers — or let our partner arrange a warm welcome and transfer for you on arrival.",
    resources: [
      {
        name: "AANS International",
        note: "GRI partner — airport welcome & transfers",
        contacts: ["admin@aansinternational.com", "+64 21 141 9478 (WhatsApp)"],
        image: { label: "Airport pickup / transfer photo" },
        preferred: true,
      },
    ],
  },

  // ── SETTLING IN ─────────────────────────────────────────────────────────
  {
    num: 4,
    title: "SL Hub New Zealand",
    highlight: "SL Hub",
    group: "settling",
    intro:
      "SL Hub is an online platform built to support Sri Lankans living in New Zealand, bringing useful information and services together in one place. It helps you quickly find places, resources, and guidance for daily life, study, and settlement — saving you time and making it easier to adapt to life in New Zealand.",
    resources: [
      {
        name: "SL Hub",
        note: "Community information & services for Sri Lankans in NZ",
        link: "https://www.slhub.co.nz",
        image: { label: "SL Hub community photo" },
        qr: "/img/qr/slhub.png",
      },
    ],
  },
  {
    num: 5,
    title: "Accommodation & Rental",
    highlight: "Accommodation",
    intro:
      "New Zealand offers a wide variety of accommodation to suit every budget and style — from short-stay motels and apartments while you find your feet, to long-term rentals once you're settled. Book something for your first nights before you fly, then explore the options below.",
    resources: [
      {
        name: "AANS International",
        note: "GRI partner — accommodation & settlement support",
        contacts: ["admin@aansinternational.com", "+64 21 141 9478 (WhatsApp)"],
        image: { label: "AANS welcome / housing photo" },
        preferred: true,
      },
      {
        name: "Trade Me Property",
        note: "New Zealand's largest rental marketplace",
        link: "https://www.trademe.co.nz/a/property",
        image: { label: "Trade Me rental listing photo" },
        qr: "/img/qr/trademe-property.png",
      },
      {
        name: "Airbnb",
        note: "Short-stay rooms & whole homes",
        link: "https://www.airbnb.co.nz",
        image: { label: "Airbnb stay photo" },
        qr: "/img/qr/airbnb.png",
      },
      {
        name: "Booking.com",
        note: "Book a motel or apartment before you arrive",
        link: "https://www.booking.com",
        image: { label: "Motel / apartment photo" },
        qr: "/img/qr/booking.png",
      },
    ],
  },
  {
    num: 6,
    title: "Insurance",
    intro:
      "Proper insurance is essential during your studies. International students are required to hold full medical and travel insurance throughout their stay. It covers medical expenses, hospital visits, and emergency treatments — so you receive quality healthcare without high out-of-pocket costs — plus protection for travel delays, lost belongings, and personal liability. Valid insurance gives you peace of mind to focus on your studies.",
    resources: [
      {
        name: "Tiran Mendis — TNC Financial Services",
        note: "GRI partner — student insurance advice",
        contacts: ["+64 27 317 0000", "tmendis@tncfs.co.nz"],
        image: { label: "Insurance advisor photo" },
        preferred: true,
      },
    ],
  },
  {
    num: 7,
    title: "SIM Card & Mobile Services",
    highlight: "Mobile",
    intro:
      "New Zealand offers a range of SIM cards and mobile plans for visitors and residents. Major providers include One NZ, Spark, 2degrees and Skinny. Prepaid SIMs are convenient for newcomers — consider your usage and budget, and check coverage maps for your area. eSIMs are increasingly popular, and mobile hotspots can share Wi-Fi across devices.",
    compact: true,
    resources: [
      {
        name: "2degrees",
        note: "GRI Education will provide you one",
        link: "https://www.2degrees.nz",
        preferred: true,
      },
      { name: "One NZ", link: "https://www.one.nz" },
      { name: "Spark", link: "https://www.spark.co.nz" },
      { name: "Skinny", link: "https://www.skinny.co.nz" },
    ],
  },

  // ── MONEY & GETTING AROUND ───────────────────────────────────────────────
  {
    num: 8,
    title: "Get an IRD Number",
    highlight: "IRD Number",
    group: "money",
    intro:
      "An IRD number is a unique 10-digit number used for tax and financial purposes in New Zealand. It is essential for anyone living, working, or conducting financial activities here — apply for one as soon as you arrive.",
    compact: true,
    resources: [
      {
        name: "Inland Revenue (IRD)",
        note: "Apply online — free",
        link: "https://www.ird.govt.nz",
        qr: "/img/qr/ird.png",
      },
      {
        name: "AA New Zealand",
        note: "Apply in person (cost around $20)",
        link: "https://www.aa.co.nz",
      },
    ],
  },
  {
    num: 9,
    title: "Bank Account",
    intro:
      "A New Zealand bank account lets you manage your money conveniently, avoid currency-exchange fees, receive payments, and use online banking. It also helps you build a local credit history and access emergency funds. Most major banks let you start your application before you arrive.",
    compact: true,
    resources: [
      { name: "ASB Bank", link: "https://www.asb.co.nz", qr: "/img/qr/asb.png" },
      { name: "BNZ", link: "https://www.bnz.co.nz", qr: "/img/qr/bnz.png" },
      { name: "Westpac", link: "https://www.westpac.co.nz", qr: "/img/qr/westpac.png" },
      { name: "ANZ", link: "https://www.anz.co.nz", qr: "/img/qr/anz.png" },
      { name: "Kiwibank", link: "https://www.kiwibank.co.nz", qr: "/img/qr/kiwibank.png" },
    ],
  },
  {
    num: 10,
    title: "Buy or Rent a Car",
    intro:
      "Beyond the major cities, a car gives you real freedom and mobility. Whether you buy for the long term or rent for short-term convenience, personal transport dramatically extends your reach for commutes, groceries, weekend trips, and reaching areas where jobs or accommodation may be located — reducing reliance on limited public schedules and costly rideshares.",
    resources: [
      {
        name: "Blue Dot Rentals",
        note: "Temporary car rental",
        link: "https://bluedotrentals.co.nz",
        image: { label: "Rental car photo" },
        qr: "/img/qr/bluedot.png",
      },
      {
        name: "Trade Me Motors",
        note: "Buy used cars from across NZ",
        link: "https://www.trademe.co.nz/a/motors",
        image: { label: "Used car listing photo" },
        qr: "/img/qr/trademe-motors.png",
      },
      {
        name: "Turners Cars",
        note: "Trusted dealer network nationwide",
        link: "https://www.turners.co.nz",
        image: { label: "Turners car yard photo" },
        qr: "/img/qr/turners.png",
      },
    ],
  },
  {
    num: 11,
    title: "Car Finance",
    intro:
      "Planning to buy a car as a student? A car-finance option can make it much easier. With flexible repayment plans, easy online applications, and support even for newcomers, finance helps you manage transport without a large upfront payment — a smart way to gain independence while you study.",
    resources: [
      {
        name: "Guardian Finance",
        note: "GRI partner — flexible finance for newcomers",
        link: "https://guardianfinance.co.nz/",
        image: { label: "Guardian Finance photo" },
        qr: "/img/qr/guardian.png",
        preferred: true,
      },
    ],
  },

  // ── DAILY LIFE ───────────────────────────────────────────────────────────
  {
    num: 12,
    title: "Enrolling with a Doctor",
    highlight: "Doctor",
    group: "daily",
    intro:
      "Find trusted healthcare professionals in New Zealand with these user-friendly services. Locate qualified doctors, view credentials, and book appointments — and enrol with a local GP so you can access subsidised care close to home.",
    compact: true,
    resources: [
      { name: "Healthline", note: "Free 24/7 health advice — 0800 611 116" },
      { name: "Healthpoint", note: "Find clinics & services", link: "https://www.healthpoint.co.nz/", qr: "/img/qr/healthpoint.png" },
      { name: "Enrol with a GP", note: "Immigration NZ guide", link: "https://www.live-work.immigration.govt.nz/resources/enroling-with-your-local-doctor", qr: "/img/qr/enrol-gp.png" },
      { name: "Find a Doctor", note: "govt.nz directory", link: "https://www.govt.nz/browse/health/gps-and-prescriptions/find-a-doctor/", qr: "/img/qr/find-doctor.png" },
    ],
  },
  {
    num: 13,
    title: "Appliances & Essentials",
    intro:
      "Furnishing your new home is easier when you know where to shop. These stores offer quality appliances and household essentials at good prices — ideal for setting up your accommodation affordably.",
    compact: true,
    resources: [
      { name: "The Warehouse", link: "https://www.thewarehouse.co.nz", qr: "/img/qr/warehouse.png" },
      { name: "Kmart", link: "https://www.kmart.co.nz", qr: "/img/qr/kmart.png" },
      { name: "Briscoes", link: "https://www.briscoes.co.nz", qr: "/img/qr/briscoes.png" },
      { name: "Noel Leeming", link: "https://www.noelleeming.co.nz", qr: "/img/qr/noelleeming.png" },
    ],
  },
  {
    num: 14,
    title: "Groceries",
    intro:
      "Finding good groceries means fresh produce, variety, and budget-friendly options for convenient cooking. These supermarkets cover everything from weekly essentials to ingredients for exploring new cuisines.",
    compact: true,
    resources: [
      { name: "PAK'nSAVE", note: "NZ's lowest food prices", link: "https://www.paknsave.co.nz/", qr: "/img/qr/paknsave.png" },
      { name: "Woolworths", link: "https://www.woolworths.co.nz", qr: "/img/qr/woolworths.png" },
      { name: "New World", link: "https://www.newworld.co.nz/", qr: "/img/qr/newworld.png" },
      { name: "Costco", note: "Auckland only — membership required", link: "https://www.costco.co.nz" },
    ],
  },
  {
    num: 15,
    title: "Bus Cards",
    intro:
      "Bus cards are a convenient, affordable and eco-friendly way to travel around New Zealand's cities and towns, offering discounted fares, easy tap-on use, and real-time travel information. Pick up the card for your region below.",
    compact: true,
    resources: [
      { name: "Auckland — AT HOP", link: "https://at.govt.nz/bus-train-ferry/at-hop-card", qr: "/img/qr/athop.png" },
      { name: "Wellington — Snapper", link: "https://www.snapper.co.nz/buying-a-snapper-card/", qr: "/img/qr/snapper.png" },
      { name: "Christchurch — Metrocard", link: "https://www.metroinfo.co.nz/metrocard/", qr: "/img/qr/metrocard.png" },
      { name: "Hawke's Bay — Bee Card", link: "https://www.gobay.co.nz/bee-card/", qr: "/img/qr/beecard.png" },
      { name: "Dunedin / Queenstown — Bee Card", link: "https://www.orc.govt.nz/public-transport", qr: "/img/qr/beecard-otago.png" },
    ],
  },

  // ── WORK & CAREERS ───────────────────────────────────────────────────────
  {
    num: 16,
    title: "Create Your CV & Cover Letters",
    highlight: "CV",
    group: "work",
    intro:
      "A strong CV written to New Zealand standards makes all the difference when applying for work. Use these tools and templates to build a professional CV and cover letter that local employers expect.",
    compact: true,
    resources: [
      { name: "Smart CV AI", note: "Build a CV with AI", link: "https://smartcvs.ai/", qr: "/img/qr/smartcv.png" },
      { name: "Do It Right", note: "NZ CV & job-ready help", link: "https://www.doitrightnz.co.nz", qr: "/img/qr/doitright.png" },
      { name: "Tāhatu Career Navigator", note: "How to write a CV", link: "https://tahatu.govt.nz/work/applying-for-a-job/how-to-write-a-cv", qr: "/img/qr/tahatu-cv.png" },
      { name: "Canva", note: "Free CV templates", link: "https://www.canva.com", qr: "/img/qr/canva.png" },
      { name: "Seek", note: "Free resume templates", link: "https://www.seek.co.nz/career-advice/article/free-resume-template", qr: "/img/qr/seek-cv.png" },
    ],
  },
  {
    num: 17,
    title: "Part-time Jobs for Students",
    highlight: "Part-time Jobs",
    intro:
      "Part-time work is a great way to earn money, gain valuable experience, and immerse yourself in the local culture — while building your professional network and boosting your employability after graduation.",
    compact: true,
    resources: [
      { name: "Seek", link: "https://www.seek.co.nz", qr: "/img/qr/seek.png" },
      { name: "Trade Me Jobs", link: "https://www.trademe.co.nz/a/jobs", qr: "/img/qr/trademe-jobs.png" },
      { name: "Sidekicker", link: "https://sidekicker.com/", qr: "/img/qr/sidekicker.png" },
      { name: "Student Job Search", link: "https://www.sjs.co.nz", qr: "/img/qr/sjs.png" },
    ],
    notes: [
      "Join Sri Lankan communities in your area — they can be a great source of help and job leads.",
      "It can take time to find a job, and you may not be able to do the same work you did at home. Prepare by bringing savings, and be open to starting at a lower-level role.",
    ],
  },
  {
    num: 18,
    title: "Jobs for Partners on an Open Work Visa",
    highlight: "Open Work Visa",
    intro:
      "If your partner holds an open work visa, there are plenty of ways to find work. Explore flexible gig options, the major job boards, or simply walk in and introduce yourself to local employers.",
    compact: true,
    resources: [
      { name: "Uber & Uber Eats", note: "Flexible driving & delivery work", link: "https://www.uber.com/nz/en/", qr: "/img/qr/uber.png" },
      { name: "Trade Me Jobs", link: "https://www.trademe.co.nz/a/jobs", qr: "/img/qr/trademe-jobs.png" },
      { name: "Seek", link: "https://www.seek.co.nz", qr: "/img/qr/seek.png" },
      { name: "Tāhatu Career Guidance", link: "https://tahatu.govt.nz", qr: "/img/qr/tahatu.png" },
    ],
    notes: [
      "Walk in: take your CV to a chosen employer and have a friendly chat about opportunities.",
    ],
  },
  {
    num: 19,
    title: "Driving Licence",
    intro:
      "Getting mobile is straightforward. You can drive on your Sri Lankan licence for up to 18 months after arriving — after that, you'll need to convert it to a New Zealand licence.",
    compact: true,
    resources: [
      {
        name: "NZ Transport Agency (Waka Kotahi)",
        note: "How to get your NZ driver licence",
        link: "https://drive.govt.nz/#get-my-licence",
        qr: "/img/qr/drive.png",
      },
    ],
    notes: [
      "Drive on your Sri Lankan licence for up to 18 months, then convert to a NZ licence.",
    ],
  },

  // ── FAMILY & EXPLORING ───────────────────────────────────────────────────
  {
    num: 20,
    title: "Schools",
    group: "family",
    intro:
      "Once you've found a school near your home, make sure you register your child there. Use the official directory to find your nearest school and check enrolment zones.",
    resources: [
      {
        name: "Find a School",
        note: "Education Counts — official school directory",
        link: "https://www.educationcounts.govt.nz/find-school",
        image: { label: "NZ school / classroom photo" },
        qr: "/img/qr/findschool.png",
      },
    ],
  },
  {
    num: 21,
    title: "Daycare",
    intro:
      "Wondering how to manage your children's care alongside your studies? These simple steps will help you find a daycare you can trust near your home.",
    compact: true,
    notes: [
      "Search Google for daycare centres near your location.",
      "Ask friends, classmates or community members for recommendations.",
      "Visit centres in person to see the environment before you enrol.",
    ],
  },
  {
    num: 22,
    title: "Citizens Advice Bureau",
    highlight: "Citizens Advice",
    intro:
      "The Citizens Advice Bureau (CAB) is a free and confidential community service available across New Zealand that helps people understand their rights and access support. As a new migrant, you can contact CAB online or visit a local branch for guidance on immigration, employment, housing, healthcare, and consumer rights. Trained volunteers will listen, explain your options, and connect you with the right services — a welcoming place to turn to as you settle in.",
    resources: [
      {
        name: "Citizens Advice Bureau",
        note: "Free, confidential guidance & support",
        link: "https://www.cab.org.nz/",
        image: { label: "CAB / community support photo" },
        qr: "/img/qr/cab.png",
      },
    ],
  },
  {
    num: 23,
    title: "Currency Exchange",
    intro:
      "On arrival you'll want to exchange some currency. You have two main options — the airport for convenience, or a bank for better value. ATMs are always available if you need New Zealand dollars outside opening hours.",
    compact: true,
    resources: [
      { name: "At the Airport", note: "Exchange services such as Travelex — convenient, but can be more expensive." },
      { name: "At a Bank", note: "Exchange at any NZ bank (e.g. Travelex). Use an ATM any time for NZD." },
    ],
  },
  {
    num: 24,
    title: "Places to Visit",
    highlight: "Visit",
    variant: "destinations",
    intro:
      "New Zealand rewards exploration. From adrenaline capitals to geothermal wonders and golden beaches, here are some of the most memorable places to enjoy with family.",
    destinations: [
      { name: "Queenstown", region: "South Island", blurb: "The adventure capital — jet boating, bungy and, in the cooler months, world-class skiing across four ski areas." },
      { name: "Taupō", region: "North Island", blurb: "Bungy, parasailing, bike trails, thermal spas, paddle boarding, whitewater rafting and lake jet-boat rides." },
      { name: "Rotorua", region: "North Island", blurb: "Renowned for geothermal activity, age-old forests, and pristine lakes and rivers found only here." },
      { name: "Waiheke Island", region: "Auckland", blurb: "Famous for wine, beaches and elegant stays — a short ferry from downtown Auckland to an island of wine and sun." },
      { name: "Auckland Zoo", region: "Auckland", blurb: "Home to 135 species and over 1,000 animals — NZ's largest collection of native and exotic wildlife." },
      { name: "Coromandel Peninsula", region: "North Island", blurb: "Rainforest interior and 400km of white-sand beaches — rustic, unspoiled and a walker's paradise." },
      { name: "Hawke's Bay", region: "North Island", blurb: "Wine and vineyards, Art Deco architecture, Cape Kidnappers, fruit orchards, cycling trails and Te Mata Peak." },
      { name: "Mt Ruapehu", region: "North Island", blurb: "The largest ski area in NZ plus volcanic summer adventures — a premier alpine destination." },
      { name: "Abel Tasman", region: "South Island", blurb: "Forest-fringed golden beaches, calm azure waters and granite headlands, with coastal and inland tracks." },
    ],
  },
  {
    num: 25,
    title: "Map of New Zealand",
    highlight: "Map",
    variant: "map",
    intro: "A quick orientation to the regions, cities and destinations referenced throughout this guide.",
  },
];

export const CLOSING = {
  supportTitle: "How GRI Supports You",
  supportHighlight: "GRI",
  supportNum: 26,
  followNum: 27,
  supportIntro:
    "Our commitment continues long after you land. Whenever you feel uncertain, reach out — you are part of the GRI family, and we are here with honest guidance, professional advice, and long-term planning support.",
  services: [
    "Career guidance",
    "Guidance for your next visa process",
    "Guidance for the PR (residency) process",
    "Help finding opportunities in New Zealand",
    "Licensed immigration advisor services",
    "Guidance to start your own business in New Zealand",
  ],
  followTitle: "Visit & Follow Us",
  followHighlight: "Follow",
  followIntro: "Join the GRI New Zealand community and stay connected.",
  socials: [
    { label: "Website", qr: "/img/qr/website.png" },
    { label: "YouTube", qr: "/img/qr/youtube.png" },
    { label: "Facebook", qr: "/img/qr/facebook.png" },
    { label: "Instagram", qr: "/img/qr/instagram.png" },
    { label: "TikTok", qr: "/img/qr/tiktok.png" },
    { label: "WhatsApp", qr: "/img/qr/whatsapp.png" },
  ],
  communityLabel: "GRI New Zealand Community",
  communityQr: "/img/qr/community.png",
};
