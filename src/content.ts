// ─────────────────────────────────────────────────────────────────────────
// Single source of content for the GRI NZ Welcome Pack.
// Both the PDF (React) and DOCX renderers read from this file.
// ─────────────────────────────────────────────────────────────────────────

export type Resource = {
  name: string;
  /** Short descriptor shown under the name. */
  note?: string;
  /** Primary URL (rendered as a link + encoded into the QR code). */
  link?: string;
  /** Phone / email / freeform contact lines. */
  contacts?: string[];
  /** Partner/brand logo path under /public/img/partners (optional). */
  logo?: string;
  /** Placeholder image slot — real photo dropped in later. label shows inside. */
  image?: { src?: string; label: string };
  /** Pre-generated QR code path under /public/img/qr (optional). */
  qr?: string;
  /** Marks a "GRI Preferred Partner" callout. */
  preferred?: boolean;
};

export type Section = {
  num: number;
  title: string;
  /** Optional green keyword(s) inside the title to highlight. */
  highlight?: string;
  intro?: string;
  resources?: Resource[];
  /** Extra advisory bullet points (no resource card). */
  notes?: string[];
  /** Theme group this section opens (renders a photo divider before it). */
  group?: ThemeGroup;
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
    subtitle: "Getting to New Zealand and through the border with ease",
    photo: "/img/photos/divider-arrival.jpg",
  },
  settling: {
    key: "settling",
    title: "Settling In",
    subtitle: "A roof, a connection, and the essentials of daily life",
    photo: "/img/photos/divider-settling.jpg",
  },
  money: {
    key: "money",
    title: "Money & Admin",
    subtitle: "Tax, banking and the paperwork that gets you set up",
    photo: "/img/photos/divider-money.jpg",
  },
  work: {
    key: "work",
    title: "Work & Careers",
    subtitle: "Finding part-time work and building your NZ career",
    photo: "/img/photos/divider-work.jpg",
  },
  family: {
    key: "family",
    title: "Family & Exploring",
    subtitle: "Schools, daycare and unforgettable places to visit",
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

// Ordered list of all 27 sections. Sample-phase sections are fully authored;
// the remainder carry titles (for the TOC) and will be filled during rollout.
export const SECTIONS: Section[] = [
  { num: 1, title: "Air Tickets", group: GROUPS.arrival },
  { num: 2, title: "New Zealand Traveller Declaration (NZTD)" },
  { num: 3, title: "Airport Pickup" },
  { num: 4, title: "SL Hub", group: GROUPS.settling },
  {
    num: 5,
    title: "Accommodation & Rental",
    highlight: "Accommodation",
    group: GROUPS.settling,
    intro:
      "New Zealand offers a wide variety of accommodation to suit every budget and style — from short-stay motels and apartments while you find your feet, to long-term rentals once you're settled. Book something for your first nights before you fly, then explore the options below.",
    resources: [
      {
        name: "AANS International",
        note: "GRI partner — accommodation & airport support",
        contacts: ["admin@aansinternational.com", "+64 21 141 9478 (WhatsApp)"],
        logo: "/img/partners/aans.png",
        image: { label: "AANS welcome / housing photo" },
        preferred: true,
      },
      {
        name: "Trade Me Property",
        note: "New Zealand's largest rental marketplace",
        link: "https://www.trademe.co.nz/a/property",
        logo: "/img/partners/trademe.png",
        image: { label: "Trade Me rental listing photo" },
        qr: "/img/qr/trademe-property.png",
      },
      {
        name: "Airbnb",
        note: "Short-stay rooms & whole homes",
        link: "https://www.airbnb.co.nz",
        logo: "/img/partners/airbnb.png",
        image: { label: "Airbnb stay photo" },
        qr: "/img/qr/airbnb.png",
      },
      {
        name: "Booking.com",
        note: "Book a motel or apartment before you arrive",
        link: "https://www.booking.com",
        logo: "/img/partners/booking.png",
        image: { label: "Motel / apartment photo" },
        qr: "/img/qr/booking.png",
      },
    ],
  },
  { num: 6, title: "Insurance" },
  { num: 7, title: "SIM Card & Mobile Services" },
  { num: 8, title: "Get an IRD Number", group: GROUPS.money },
  { num: 9, title: "Bank Account" },
  { num: 10, title: "Buy or Rent a Car", group: GROUPS.money },
  { num: 11, title: "Car Finance" },
  { num: 12, title: "Enrolling with a Doctor" },
  { num: 13, title: "Appliances & Essentials" },
  { num: 14, title: "Groceries" },
  { num: 15, title: "Bus Cards" },
  { num: 16, title: "Create Your CV & Cover Letters", group: GROUPS.work },
  { num: 17, title: "Part-time Jobs for Students" },
  { num: 18, title: "Jobs for Partners on an Open Work Visa" },
  { num: 19, title: "Driving Licence" },
  { num: 20, title: "Schools", group: GROUPS.family },
  { num: 21, title: "Daycare" },
  { num: 22, title: "Citizens Advice Bureau (CAB)" },
  { num: 23, title: "Currency Exchange" },
  { num: 24, title: "Places to Visit" },
  { num: 25, title: "Map of New Zealand" },
  { num: 26, title: "How GRI Supports You During Your Stay" },
  { num: 27, title: "Visit & Follow Us" },
];

export const CLOSING = {
  supportTitle: "How GRI Supports You",
  supportHighlight: "GRI",
  supportIntro:
    "Our commitment continues long after you land. Whenever you feel uncertain, reach out — you are part of the GRI family.",
  services: [
    "Career guidance",
    "Guidance for your next visa process",
    "Guidance for the PR (residency) process",
    "Help finding opportunities in New Zealand",
    "Licensed immigration advisor services",
    "Guidance to start your own business in New Zealand",
  ],
  socials: [
    { label: "Website", qr: "/img/qr/website.png" },
    { label: "YouTube", qr: "/img/qr/youtube.png" },
    { label: "Facebook", qr: "/img/qr/facebook.png" },
    { label: "Instagram", qr: "/img/qr/instagram.png" },
    { label: "TikTok", qr: "/img/qr/tiktok.png" },
    { label: "WhatsApp", qr: "/img/qr/whatsapp.png" },
  ],
};
