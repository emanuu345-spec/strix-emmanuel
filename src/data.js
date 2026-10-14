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
export const projects = [
  {
    id: 'student-companion',
    name: 'Student Companion',
    kind: 'AI product · Web + Android',
    year: '2026',
    summary:
      'An AI study companion with a voice assistant called Jarvis. It knows your timetable, reads your notes, and answers from your own documents.',
    shipped: [
      'Voice assistant: speech-to-text and text-to-speech, with daily usage caps',
      'Document knowledge base (RAG): Jarvis answers from uploaded notes',
      'M-Pesa subscriptions via IntaSend, with free trial and paywall',
      'Google sign-in, cross-device sync, Doze-safe Android reminders',
    ],
    stack: ['React', 'Capacitor', 'Node', 'Prisma', 'Postgres', 'LLMs', 'ElevenLabs'],
    mock: 'chat',
    url: '', // TODO: Play Store / live link
  },
  {
    id: 'oxe-erp',
    name: 'OXE ERP',
    kind: 'Property-management ERP',
    year: '2026',
    summary:
      'A property-management ERP for Kenyan landlords. It covers units, tenants, rent and M-Pesa collections, plus a tenant portal and roles for every team member.',
    shipped: [
      'Single role and permission matrix, enforced on every API route',
      'Tenant portal with M-Pesa STK push rent payments',
      '150+ automated authorization and role checks before every release',
      'Google sign-in, 30-day sliding sessions, transactional email and SMS',
    ],
    stack: ['React', 'Node', 'Prisma', 'Postgres', 'M-Pesa', 'Brevo'],
    mock: 'erp',
    url: '',
  },
  {
    id: 'farm-flow',
    name: 'Farm Flow OS',
    kind: 'Operations platform · Agritech',
    year: '2026',
    summary:
      'An operating system for dairy farms. It tracks herds, milk yields and daily operations so the farmer runs on numbers, not guesswork.',
    shipped: [
      'Herd and per-cow milk-yield tracking',
      'Phone-first daily operations dashboard for owner and staff',
      'M-Pesa till payments with idempotent reconciliation',
      'JWT auth, rate-limited login, serverless API on Vercel',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Postgres', 'M-Pesa Daraja'],
    mock: 'farm',
    url: 'https://farm-flow-os-sigma.vercel.app',
  },
  {
    id: 'mist',
    name: 'Mist Launcher',
    kind: 'Android · Consumer',
    year: '2026',
    summary:
      'A native Android home screen with two switchable personalities: a minimal, wallpaper-forward list and an iOS-style app library with its own control center.',
    shipped: [
      'Two switchable home-screen modes, with favorites and settings',
      'Control center with real torch, volume and brightness controls',
      'Designed web-first, then built natively in Jetpack Compose',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Android'],
    mock: 'launcher',
    url: '',
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
    title: 'Knowledge systems (RAG)',
    body: 'Ask your documents anything. Private search grounded in your company’s own data.',
  },
  {
    title: 'Web & mobile apps',
    body: 'Production apps for web, Android and iOS, from first prototype to app-store release.',
  },
  {
    title: 'Payments & integrations',
    body: 'M-Pesa, card payments, subscriptions, email, SMS and the APIs your business already runs on.',
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
