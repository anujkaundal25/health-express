// All website content lives here, so text can be changed without touching the components.
// Content follows healthexpressambulette.com / health-express-rho.vercel.app.

export const site = {
  name: "Health Express Ambulette",
  legalName: "Health Express Ambulette Inc.",
  url: "https://healthexpressambulette.com",
  title: "Health Express Ambulette – NYC Ambulette & Medical Transport",
  description:
    "Safe, reliable ambulette services NYC and medical transportation services NYC for doctor visits, hospital transfers and non-emergency travel. Medicaid accepted. Open 24/7.",
  phone: "+1 (917)-514-3080",
  phoneHref: "tel:+19175143080",
  whatsapp: "https://wa.me/19175143080",
  email: "dispatch@healthexpressambulette.com",
  address: {
    street: "155 Water Street",
    city: "Brooklyn",
    region: "NY",
    zip: "11201",
    full: "155 Water Street, Brooklyn NY 11201",
  },
  mapEmbed: "https://www.google.com/maps?q=155+Water+Street,+Brooklyn,+NY+11201&output=embed",
  mapLink: "https://www.google.com/maps?q=155+Water+Street,+Brooklyn,+NY+11201",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61584198666363",
    instagram: "https://www.instagram.com/healthexpressambulette/",
  },
  since: 2009,
  locations: ["Brooklyn", "Staten Island"],
  areasServed: ["Brooklyn", "Staten Island", "Queens", "Manhattan", "Bronx", "Nassau County"],
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export type IconName = "van" | "heart" | "stairs" | "stethoscope" | "hospital" | "flask" | "wheelchair";

export type ServicePage = {
  slug: string;
  title: string;
  short: string; // card text
  icon: IconName;
  photo: string; // css photo class (cards)
  heroPhoto: string; // css photo class for the page banner (Vercel photo)
  image: string; // path for OG image
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; text: string }[];
  bullets: { heading: string; items: string[] };
  faqs: { q: string; a: string }[];
};

const whoItsFor = [
  "Cancer patients",
  "Elderly individuals",
  "People with Parkinson’s disease or Alzheimer’s",
  "People with spine or back injuries",
  "Special needs and rehabilitation patients",
  "Patients who are extremely weak",
];

export const servicePages: ServicePage[] = [
  {
    slug: "ambulette-services",
    title: "Ambulette Services",
    short: "Wheelchair-friendly rides for doctor visits, clinics, and hospital transfers.",
    icon: "van",
    photo: "ph-hero",
    heroPhoto: "ph-slide1",
    image: "/images/home/fleet-hero.jpg",
    metaTitle: "Ambulette Services NYC & Brooklyn | Health Express Ambulette",
    metaDescription:
      "Wheelchair-accessible ambulette services in Brooklyn and NYC for doctor visits, clinic trips and hospital transfers. Medicaid accepted. Open 24/7 – call (917) 514-3080.",
    intro:
      "Health Express Ambulette provides safe, wheelchair-accessible rides for patients and their families, with a focus on passenger security, comfort and professional care on every trip.",
    sections: [
      {
        heading: "Doctor visits",
        text: "Older and physically challenged people often have no one to help them get to their appointments. Our hydraulic-lift vans bring wheelchair users right to the clinic entrance, and our staff take you there and back.",
      },
      {
        heading: "Transfers between facilities",
        text: "When a patient needs to move to a hospital with better care, an ambulance is costly and meant for emergencies, and most taxis are not wheelchair-friendly. Our ambulettes are the affordable, comfortable option.",
      },
    ],
    bullets: { heading: "Who our ambulette service is for", items: whoItsFor },
    faqs: [
      { q: "What is the difference between an ambulance and an ambulette?", a: "An ambulance is for emergencies, while an ambulette is for non-emergency medical transportation." },
      { q: "Which areas do you serve?", a: "Brooklyn, Staten Island, Queens, Manhattan, the Bronx and Nassau County." },
    ],
  },
  {
    slug: "private-medical-transportation",
    title: "Private Medical Transportation",
    short: "Private, non-emergency rides for comfortable medical travel.",
    icon: "heart",
    photo: "ph-interior",
    heroPhoto: "ph-van4",
    image: "/images/home/van-interior.jpg",
    metaTitle: "Private Medical Transportation NYC | Health Express Ambulette",
    metaDescription:
      "Luxury private non-emergency medical transportation in NYC. Comfortable, on-time rides to doctors, clinics and hospitals. Credit cards accepted. Call (917) 514-3080.",
    intro:
      "Our private medical transportation is an affordable luxury service for non-emergency medical travel, for riders with or without Medicaid. Riders without Medicaid can pay by credit card.",
    sections: [
      {
        heading: "On-time, comfortable rides",
        text: "We take older adults and people with mobility needs to doctor visits, clinics, hospitals, airports and other destinations — on time and in comfort.",
      },
      {
        heading: "A fleet built for comfort",
        text: "Our vans have high-top roofs, wheelchair lifts, special suspension, front and rear A/C and heating, and secure wheelchair locking. Our chauffeurs are trained in CPR and defensive driving.",
      },
    ],
    bullets: { heading: "Who it’s for", items: whoItsFor },
    faqs: [
      { q: "Do I need Medicaid to ride?", a: "No. Private rides are available to everyone, and riders without Medicaid can pay by credit card." },
      { q: "Can I book for a parent or family member?", a: "Yes. You can book for yourself, your parents or any family member." },
    ],
  },
  {
    slug: "two-men-assist-over-stairs",
    title: "Two Men Assist Over Stairs",
    short: "Two trained staff carry you up or down stairs in buildings without elevators.",
    icon: "stairs",
    photo: "ph-stairs",
    heroPhoto: "ph-slide4",
    image: "/images/home/stairs-assist.jpg",
    metaTitle: "Two Men Assist Over Stairs Ambulette NYC | Health Express Ambulette",
    metaDescription:
      "Live on a 2nd or 3rd floor with no elevator? Two or four trained staff safely carry you over stairs to your ambulette. Up to 650 lb. Call (917) 514-3080.",
    intro:
      "If you live on the 2nd or 3rd floor of a building with no elevator, two men will safely carry you over the steps and into our ambulette.",
    sections: [
      {
        heading: "Safe help on the stairs",
        text: "Where there is no wheelchair access, two — or four — trained staff members carry the rider safely up or down the stairs. We can transport riders up to 650 lb.",
      },
      {
        heading: "Door-to-door care",
        text: "Assistance can be two-person stair help, curbside, or room-to-room. Wheelchair users who need help on stairs should call us right away so we can plan the pickup.",
      },
    ],
    bullets: { heading: "Who it’s for", items: whoItsFor },
    faqs: [
      { q: "How much weight can your team carry?", a: "Two or four trained staff can safely transport riders up to 650 lb." },
      { q: "Do you provide a wheelchair?", a: "Yes, we can provide a wheelchair when needed." },
    ],
  },
  {
    slug: "medicaid-ambulette-service",
    title: "Medicaid Ambulette Service",
    short: "Medicaid-accepted transportation for elderly and disabled patients.",
    icon: "hospital",
    photo: "ph-lift",
    heroPhoto: "ph-slide3",
    image: "/images/home/wheelchair-lift.jpg",
    metaTitle: "Medicaid Ambulette Service Brooklyn & NYC | Health Express Ambulette",
    metaDescription:
      "Medicaid ambulette transportation for elderly and disabled patients in NYC. Registered NY State Medicaid provider. Non-emergency rides to medical appointments.",
    intro:
      "Medicaid is an advantageous program that supports elderly and disabled patients with medical transportation services in NYC so they can attend their doctor’s appointments. Health Express Ambulette is a registered NY State Medicaid provider.",
    sections: [
      {
        heading: "How Medicaid coverage works",
        text: "Non-emergency rides to medical appointments may be covered by Medicaid for riders who qualify for transportation assistance. Medicaid has to approve the trip.",
      },
      {
        heading: "Specialized care on the way",
        text: "Our trained staff give extra support to passengers who need specialized care during transport, with hydraulic-lift vans that bring wheelchairs right to the clinic.",
      },
    ],
    bullets: { heading: "Who it’s for", items: whoItsFor },
    faqs: [
      { q: "Is ambulette covered by Medicaid insurance?", a: "Yes, Medicaid will have to approve though, for those that are qualified for transportation assistance." },
      { q: "Are you a registered Medicaid provider?", a: "Yes, we are registered as a NY State Medicaid provider." },
    ],
  },
  {
    slug: "wheelchair-handicapped-transportation",
    title: "Wheelchair Handicapped Transportation",
    short: "Lift vans with secure locks and A/C for door-to-door travel.",
    icon: "wheelchair",
    photo: "ph-lift",
    heroPhoto: "ph-slide2",
    image: "/images/home/wheelchair-lift.jpg",
    metaTitle: "Wheelchair Transportation NYC | Health Express Ambulette",
    metaDescription:
      "Wheelchair handicapped transportation in NYC: lift-equipped vans with secure wheelchair locks and A/C, door-to-door. Open 24/7. Call (917) 514-3080.",
    intro:
      "Our wheelchair handicapped transportation uses lift-equipped vans with secure wheelchair locks and air conditioning, so riders travel door-to-door safely and comfortably.",
    sections: [
      {
        heading: "Vans made for wheelchairs",
        text: "Our vans have Braun hydraulic and RICON wheelchair lifts, extended roofs, heating and A/C. Regular taxis are often not accessible to wheelchair users — our vans are.",
      },
      {
        heading: "Hospitals, clinics and more",
        text: "We take riders to and from any Brooklyn hospital, clinics, airports and other locations. Drivers can wait during your appointment or come back when you call.",
      },
    ],
    bullets: { heading: "Who it’s for", items: whoItsFor },
    faqs: [
      { q: "Will the driver wait during my appointment?", a: "Yes. Drivers can wait during appointments or return when called." },
      { q: "Do you go to airports?", a: "Yes, we also serve airports and other locations, not only medical facilities." },
    ],
  },
];

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: servicePages.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    label: "Location",
    href: "/ambuletteService",
    children: [
      { label: "Ambulette Service Brooklyn NY", href: "/ambuletteService" },
      { label: "South Brooklyn", href: "/southBrooklyn" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "F.A.Q.", href: "/faq" },
  { label: "Apply as Driver", href: "/driverForm" },
  { label: "Contact Us", href: "/contact" },
];

export const marquee = [
  "Ambulette",
  "Wheelchair",
  "2 Man Assist",
  "Livery",
  "Medicaid Ambulette Service",
  "Private Medical Transportation",
  "We’re Open 24/7",
  "Brooklyn",
  "Staten Island",
];

// The three services featured on the home page
export const services = ["private-medical-transportation", "medicaid-ambulette-service", "two-men-assist-over-stairs"].map(
  (slug) => servicePages.find((s) => s.slug === slug)!
);
export const homeServiceText: Record<string, { title: string; text: string; photo: string; icon: IconName }> = {
  "private-medical-transportation": {
    title: "Private Medical Transportation",
    text: "Expert Ambulette Services specializes in luxury private NYC ambulette service and professional ambulette transportation services, ensuring safe and reliable medical transport",
    photo: "ph-hero",
    icon: "van",
  },
  "medicaid-ambulette-service": {
    title: "Medicaid Ambulette Transportation",
    text: "Medicaid is an advantageous program that supports elderly & disabled patients with medical transportation services NYC to attend their doctor’s appointments.",
    photo: "ph-lift",
    icon: "heart",
  },
  "two-men-assist-over-stairs": {
    title: "Two Men Assist Over Stairs",
    text: "2 men safely carry you over steps if you live on the 2nd or 3rd floor building that has no elevator with our reliable NYC ambulette service.",
    photo: "ph-stairs",
    icon: "stairs",
  },
};

export const fleetPoints = [
  {
    title: "Specialized Support Service",
    text: "We’ve been offering private luxury wheelchair medical transportation services NYC since 2009 — ensuring professionalism, comfort, and care.",
  },
  {
    title: "State of Art Features",
    text: "Our fleet is fully equipped with high top roofs, wheelchair lifts, special suspension, front and rear A/C & heating systems, secure wheelchair locking mechanisms, and reliable NYC ambulette service and medical transportation NYC for all patient needs.",
  },
];

export const steps = [
  { title: "Call us or schedule a callback", text: "Call us now or request a callback and tell us about your transportation needs." },
  { title: "Schedule a pickup", text: "Choose a pickup date and time for your transportation that works for you." },
  { title: "Driver calls you", text: "Your driver will call you 15 minutes prior to your pickup." },
];

// Photos from health-express-rho.vercel.app (downloaded by `npm run fetch-images`)
export const fleetPhotos = Array.from({ length: 7 }, (_, i) => `/images/fleet/van-${i + 1}.jpg`);

export const bookingOptions = ["Livery", "Ambulette", "Wheelchair", "2 Man Assist"];
export const contactLocations = ["Brooklyn", "Staten Island", "Queens", "Manhattan"];

export const transportServices: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Doctors Appointments",
    text: "Have an appointment with the doctor and need ambulette service NYC or medical transportation NYC to the clinic? Health Express Ambulette Inc. staff will drive you to and back from your appointments.",
    icon: "stethoscope",
  },
  {
    title: "Transfer Hospitals",
    text: "You may need to move from one hospital to another for better treatment. Ambulance services are expensive, our private NYC ambulette service and medical transportation NYC are affordable.",
    icon: "hospital",
  },
  {
    title: "Lab Tests",
    text: "Have ongoing blood tests, MRI, and Catscan appointments? Once the doctor has set a schedule, ask the secretary to send it over to us for safe and comfortable ambulette services NYC and medical transportation services NYC.",
    icon: "flask",
  },
];

export const faqs = [
  {
    q: "Difference between Ambulance & Ambulette?",
    a: "Ambulance is for emergencies while ambulette is for non-emergency medical transportation.",
  },
  {
    q: "Is Ambulette covered by Medicaid insurance?",
    a: "Yes, Medicaid will have to approve though, for those that are qualified for transportation assistance.",
  },
  {
    q: "How to start Ambulette service?",
    a: "The process of getting a Non-emergency medical transportation ambulette service from Expert Ambulette Services: 1) Call us now or schedule a callback 2) Schedule a pickup for transportation 3) Driver will call you 15 minutes prior to your pickup. Contact us now for the most comfortable and reliable ambulette transportation service.",
  },
];

// Extra questions for the full FAQ page, answered from facts stated on the website
export const moreFaqs = [
  { q: "Which areas do you serve?", a: "We serve Brooklyn, Staten Island, Queens, Manhattan, the Bronx and Nassau County, and cover all Brooklyn ZIP codes." },
  { q: "Are you open on weekends?", a: "Yes. We’re open 24/7. For same-day requests, please call us." },
  { q: "Can you carry me down the stairs if my building has no elevator?", a: "Yes. With our Two Men Assist service, two or four trained staff carry riders safely over stairs, up to 650 lb." },
  { q: "Can I pay without Medicaid?", a: "Yes. Private rides are available and riders without Medicaid can pay by credit card." },
  { q: "Do your drivers speak other languages?", a: "Our drivers speak English, Spanish and Russian." },
];

export const footerServices = servicePages.map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

export const about = {
  intro:
    "Since 2009, Health Express Ambulette Inc. has specialized in luxury ambulette services, serving patients across New York City’s five boroughs with safe, comfortable and caring non-emergency medical transportation.",
  mission:
    "Our mission is to get every client to their daily appointments safely, comfortably and on time — providing courteous, high-quality service and being considerate, responsible drivers on the road.",
  stats: [
    { value: "2009", label: "Serving NYC since" },
    { value: "10+", label: "Equipped vehicles" },
    { value: "24/7", label: "Open every day" },
    { value: "3", label: "Languages: English, Spanish, Russian" },
  ],
  highlights: [
    { title: "Modern, equipped fleet", text: "More than 10 vehicles with wheelchair lifts, high-top roofs and doors, special suspension, front and rear air conditioning and wheelchair locks." },
    { title: "Trained drivers", text: "Drivers complete a two-day course covering vehicle safety and passenger care, and are trained in CPR and defensive driving." },
    { title: "Tracked for safety", text: "All vehicles are GPS-equipped and satellite-tracked." },
    { title: "Your privacy protected", text: "We comply with HIPAA to keep your health information private." },
  ],
  credentials: [
    "Licensed by the US Department of Transportation",
    "Licensed by the NY State Department of Transportation",
    "Registered as a national health care provider",
    "Registered as a NY State Medicaid provider",
  ],
  values: ["Honesty", "Fairness", "Respect", "Responsibility", "Integrity", "Trust", "Sound business judgment"],
};

export const brooklynNeighborhoods = [
  "Greenpoint", "Williamsburg", "Bushwick", "Bedford-Stuyvesant", "Brooklyn Heights", "Red Hook", "Manhattan Beach",
  "Bay Ridge", "Park Slope", "Prospect Park", "Crown Heights", "Brownsville", "East New York", "East Flatbush",
  "Sunset Park", "Flatbush", "Kensington", "Borough Park", "Canarsie", "Bergen Beach", "Flatlands", "Mill Basin",
  "Marine Park", "Brighton Beach", "Gerritsen Beach", "Sheepshead Bay", "Gravesend", "Midwood", "Bensonhurst",
  "Bath Beach", "Dyker Heights", "Fort Hamilton",
];

export const driverRequirements = [
  "High school diploma or GED",
  "Completed defensive driving course",
  "Consent to background check and drug & alcohol testing",
  "DMV driving record abstract",
  "Medical examination report (19-A) and annual driving record review (19-A)",
  "Article 19-A certification and completed pre-service training",
  "Willing to work weekends and holidays",
  "Three professional references and last 3 employers",
];
