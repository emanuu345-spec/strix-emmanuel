# Emmanuel — personal site

AI engineer & software consultant. Nakuru, Kenya, building for businesses across Kenya.

Vite + GSAP (ScrollTrigger) + Lenis, plain JS. All copy, contacts and projects live in `src/data.js`.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs dist/ (deploy anywhere static, e.g. Vercel)
```

## Contact form → private enquiries sheet

The contact form sends with one tap to `/api/enquiry` (a Vercel serverless function in `api/enquiry.js`).
It validates the enquiry, drops spam (hidden honeypot field + rate limit), and appends a row to a private
Google Sheet that only you can see. Visitors never see an email address or get redirected.

One-time setup:
1. Create a Google Sheet ("Website enquiries") → Extensions → Apps Script → paste `enquiries-sheet.gs`.
2. Set `SECRET` in the script to a long random string. Deploy → New deployment → Web app
   (Execute as: Me, Who has access: Anyone) → copy the `/exec` URL.
3. In Vercel → Project → Settings → Environment Variables, add `ENQUIRY_WEBHOOK_URL` (the `/exec` URL)
   and `ENQUIRY_WEBHOOK_SECRET` (the same secret), then redeploy.

Until that's done, the form shows a friendly "try again or message me on WhatsApp" fallback.
