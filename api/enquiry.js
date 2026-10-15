// Vercel serverless function: POST /api/enquiry
// Validates a contact-form enquiry and saves it as a new row in your private Google Sheet
// (via the Apps Script web app in /enquiries-sheet.gs). Visitors never see where it goes.
//
// Vercel → Project → Settings → Environment Variables:
//   ENQUIRY_WEBHOOK_URL     the Apps Script web-app URL (ends in /exec)
//   ENQUIRY_WEBHOOK_SECRET  any long random string; must match SECRET in the Apps Script

const MAX = { name: 100, company: 120, phone: 30, email: 120, message: 3000 };
const hits = new Map(); // best-effort per-instance rate limit: 5 enquiries / 10 min / IP

// Strip control characters but keep tabs and line breaks (messages are multi-line).
const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ').trim().slice(0, n);
// Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
const cell = (v) => (/^[=+\-@]/.test(v) ? `'${v}` : v);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return res.status(429).json({ ok: false });
  hits.set(ip, [...recent, now]);

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body ||= {};

  // Honeypot: real people never fill the hidden "website" field. Pretend success for bots.
  if (body.website) return res.status(200).json({ ok: true });

  const lead = {
    name: clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    phone: clean(body.phone, MAX.phone),
    email: clean(body.email, MAX.email),
    message: clean(body.message, MAX.message),
  };
  const phoneOk = lead.phone.replace(/\D/g, '').length >= 9;
  const emailOk = !lead.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  if (!lead.name || !lead.message || !phoneOk || !emailOk) return res.status(400).json({ ok: false });

  const url = process.env.ENQUIRY_WEBHOOK_URL;
  const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('enquiry: ENQUIRY_WEBHOOK_URL / ENQUIRY_WEBHOOK_SECRET not set');
    return res.status(503).json({ ok: false });
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret,
        receivedAt: new Date().toISOString(),
        name: cell(lead.name),
        company: cell(lead.company),
        phone: cell(lead.phone),
        email: cell(lead.email),
        message: cell(lead.message),
      }),
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok || !out.ok) throw new Error(`sheet responded ${r.status} ${JSON.stringify(out)}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('enquiry: save failed', err);
    return res.status(502).json({ ok: false });
  }
}
