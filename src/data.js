// ─────────────────────────────────────────────────────────────
//  Everything you'll want to edit lives in this file.
//  Copy, contacts, projects, testimonials, FAQ.
// ─────────────────────────────────────────────────────────────

export const contact = {
  email: 'emanuu345@gmail.com',        // swap for hello@yourdomain.co.ke once the domain is live
  whatsapp: '254143925636',            // +254 143 925 636 (no "+" or spaces)
  location: 'Nakuru, Kenya · working with clients across Kenya',
  // Optional: Calendly / Cal.com link for "Book a call". Leave '' to use WhatsApp.
  bookingUrl: '',
  socials: [
    { label: 'GitHub', url: 'https://github.com/emanuu345-spec' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/emmanuel-kiptoo812' },
    // { label: 'X', url: 'https://x.com/…' },  // add when you have one
  ],
};

// What's shipped. Real products only — this is your credibility.
// Client-facing copy: what each product does for its users, never how it's built (no stack, auth or infra details).
export const projects = [
  {
    id: 'student-companion',
    name: 'Student Companion',
    kind: 'Study app · Web + Android',
    year: '2026',
    summary:
      'An AI study companion that knows your timetable, reads your notes and answers questions from your own documents.',
    shipped: [
      'Talk to it: ask questions out loud and hear the answers back',
      'Upload your notes and get answers drawn straight from them',
    ],
    tags: [],
    mock: 'chat',
    url: 'https://student-companion-ruby.vercel.app/',
  },
  {
    id: 'oxe-erp',
    name: 'OXE ERP',
    kind: 'Property management',
    year: '2026',
    summary:
      'Property management for Kenyan landlords and agents. Every unit, tenant and shilling of rent in one place, so nothing slips through the cracks.',
    shipped: [
      'Tenants pay rent by M-Pesa in one tap, and each payment lands on the right unit automatically',
      'A live view of collections, occupancy and arrears across all your properties',
      'A self-service portal where tenants see their balance, receipts and notices',
      'Each team member, from caretaker to accountant, sees exactly what their job needs',
    ],
    tags: ['Landlords', 'Property agents', 'M-Pesa'],
    mock: 'erp',
    url: 'https://oxe-erp-react.vercel.app/',
  },
  {
    id: 'farm-flow',
    name: 'Farm Flow OS',
    kind: 'Dairy farm management',
    year: '2026',
    summary:
      'Run your dairy farm on numbers, not guesswork. Track every cow, every litre and every shilling from your phone.',
    shipped: [
      'Record milk per cow and spot your best and weakest producers at a glance',
      'Herd records for health, breeding and history, always on hand',
      'A simple daily dashboard for the owner and the farm staff',
      'Milk sales and M-Pesa payments tracked, so the books add up',
    ],
    tags: ['Dairy farmers', 'Phone-first', 'M-Pesa'],
    mock: 'farm',
    url: 'https://farm-flow-os-sigma.vercel.app',
  },
  {
    id: 'strix',
    name: 'Strix',
    kind: 'AI agents for business',
    year: '2026',
    summary:
      'Give your business its own team of AI agents. Strix gives every department a digital teammate that works around the clock.',
    shipped: [
      'Ready-made agents for sales, customer support, marketing, finance and operations',
      'Agents answer customers, follow up on leads and draft reports while you focus on growth',
      'Custom agents shaped around how your business actually works',
      'You stay in charge: review, approve and guide every agent from one place',
    ],
    tags: ['Businesses', 'Founders', 'Teams'],
    mock: 'agents',
    url: 'https://strix-lime.vercel.app/',
  },
];

export const services = [
  {
    title: 'AI agents for your business',
    body: 'Agents for sales, support and operations, connected to your tools and data and trained on how you work.',
  },
  {
    title: 'AI-powered CRMs',
    body: 'CRMs that score your leads, write follow-ups, summarise calls and tell your team who to call next.',
  },
  {
    title: 'Agentic ERPs',
    body: 'ERPs with agents built in. They reconcile, reorder, flag anomalies and draft reports while you sleep.',
  },
  {
    title: 'Custom agents & automation',
    body: 'Agents built for your one-off workflows. They use your tools, follow your rules and take busywork off your team.',
  },
  {
    title: 'Ask-your-documents assistants',
    body: 'Ask your documents anything. A private assistant that answers from your company’s own files.',
  },
  {
    title: 'Web & mobile apps',
    body: 'Production apps for web, Android and iOS, from first prototype to app-store release.',
  },
  {
    title: 'Payments & integrations',
    body: 'M-Pesa, card payments, subscriptions, email, SMS and the other tools your business already runs on.',
  },
];

export const process = [
  { step: 'Discover', body: 'A free call. I map your workflow, find where AI actually pays off, and scope it honestly.' },
  { step: 'Design', body: 'Clickable prototypes before code, so you see and feel the product in days, not months.' },
  { step: 'Build', body: 'Weekly demos on a live link. You watch it come together and steer as we go.' },
  { step: 'Launch & evolve', body: 'I deploy, train your team, monitor and improve. You own the code and the data.' },
];

// Real quotes only (past clients, Strix customers, collaborators). The section stays hidden until this array has entries.
// { quote: '…', name: 'Jane Doe', role: 'CEO, Company' }
export const testimonials = [];

export const referral = {
  // TODO: set your real reward before going live
  reward: '10%',
  body: 'Know a business that needs software? Introduce them. When the project is signed, you get a share of the first invoice.',
};

export const faq = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope. After the discovery call you get a fixed quote with clear milestones, so there are no open-ended hourly bills. Smaller automations start small, and full systems are phased so you pay as value lands.',
  },
  {
    q: 'How long does it take?',
    a: 'A focused MVP usually takes 3–6 weeks. You’ll have a working link to click within the first two weeks.',
  },
  {
    q: 'Do I own the code?',
    a: 'Yes. 100%. The code, the data and the accounts are yours, and everything is handed over and documented.',
  },
  {
    q: 'Can you work with my existing system?',
    a: 'Usually, yes. I integrate with what you already use, like spreadsheets, M-Pesa, your current CRM or legacy databases, instead of forcing a rip-and-replace.',
  },
  {
    q: 'What happens after launch?',
    a: 'Optional monthly care plans cover monitoring, fixes, improvements and new features as your business grows.',
  },
];
