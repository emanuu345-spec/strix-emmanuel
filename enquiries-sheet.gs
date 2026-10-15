/**
 * Enquiries inbox — Google Apps Script for a private Google Sheet.
 * Receives enquiries from the website's /api/enquiry function and adds one row each.
 * This file is NOT part of the website build; paste it into the Sheet's Apps Script editor.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet, e.g. "Website enquiries".
 *  2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 *  3. Set SECRET below to a long random string (the same value goes in Vercel as ENQUIRY_WEBHOOK_SECRET).
 *  4. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and approve access.
 *  5. Copy the web-app URL (ends in /exec) into Vercel as ENQUIRY_WEBHOOK_URL, then redeploy the site.
 *  If you edit this script later: Deploy → Manage deployments → edit → Version: New version.
 */

const SECRET = 'PASTE-THE-SAME-LONG-RANDOM-STRING-AS-VERCEL';
const SHEET_NAME = 'Enquiries';
// Optional: a short "new enquiry" ping to your inbox. Leave '' for none (enquiries stay in the sheet only).
const NOTIFY_EMAIL = '';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return json({ ok: false, error: 'unauthorized' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Received', 'Name', 'Company', 'Phone', 'Email', 'Enquiry', 'Status']);
      sheet.setFrozenRows(1);
      sheet.getRange('A1:G1').setFontWeight('bold');
    }
    sheet.appendRow([new Date(d.receivedAt || Date.now()), d.name, d.company, d.phone, d.email, d.message, 'New']);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'New website enquiry: ' + d.name, 'Open your Website enquiries sheet:\n' + ss.getUrl());
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
