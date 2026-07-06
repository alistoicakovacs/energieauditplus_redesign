import { contact } from '../lib/navigation.js';
import { telHref } from '../lib/linkUtils.js';

/**
 * Kontakt page content (plan §6.6) — single source for
 * src/pages/kontakt/KontaktPage.jsx.
 *
 * Copy provenance (per block, see inline comments):
 * - handoff/content/kontakt.md → verbatim 1:1 (Standorte, „Direkt erreichbar"
 *   intro, contact data). NEVER rewrite.
 * - Zentrale phone/email reuse src/lib/navigation.js `contact` (itself verbatim
 *   kontakt.md) to keep one source of truth.
 * - Hero heading tone + section eyebrows/headings not present on the live page
 *   are flagged NEW COPY: review.
 * - WhatsApp number + Outlook Bookings URL are PLACEHOLDERS (the live site
 *   exposes neither a number nor a booking URL) — flagged for the client (§12.3).
 */

/* ---------------------------------------------------------------- */
/* §6.6.1 Hero — „Wir freuen uns auf Ihr Projekt" tone               */
/* ---------------------------------------------------------------- */

export const hero = {
  overline: 'Kontakt', // verbatim kontakt.md (page title)
  heading: 'Wir freuen uns auf Ihr Projekt.', // NEW COPY: review (plan §6.6 tone)
  // Both lead paragraphs verbatim kontakt.md („Direkt erreichbar").
  lead: [
    'Sie haben Fragen zu Energieberatung, Fördermitteln, Blower-Door-Tests oder Nachhaltigkeitsanforderungen? Unser Team unterstützt Sie schnell, persönlich und mit praxisnahen Lösungen.',
    'Nutzen Sie das Kontaktformular oder sprechen Sie direkt mit unseren Experten. Wir melden uns zeitnah bei Ihnen zurück.',
  ],
};

/* ---------------------------------------------------------------- */
/* §6.6.3 Direct channels — Tel, E-Mail, WhatsApp, Bookings          */
/* All are outbound LINKS, never embeds (DSGVO §8.3).                 */
/* ---------------------------------------------------------------- */

// PLACEHOLDER (§12.3): the live footer shows only the word „Whatsapp" with no
// number. Derived from the Zentrale line as a best guess — CLIENT MUST CONFIRM
// the real WhatsApp Business number (or drop the channel).
const WHATSAPP_NUMBER = '+4933414272935'; // PLACEHOLDER: review
// PLACEHOLDER (§12.3): Outlook Bookings URL is not published anywhere in the
// handoff. CLIENT MUST PROVIDE the real booking page URL.
export const BOOKINGS_URL = 'https://outlook.office365.com/owa/calendar/EnergieAuditPlus/bookings/'; // PLACEHOLDER: review

export const directChannels = [
  {
    kind: 'phone',
    label: 'Telefon',
    value: contact.phoneDisplay, // verbatim kontakt.md
    href: contact.phoneHref, // tel:+4933414272935 (navigation.js)
    note: contact.hours, // „Mo–Fr 8–17 Uhr" (Figma utility strip)
  },
  {
    kind: 'email',
    label: 'E-Mail',
    value: contact.emailDisplay, // team@ea-plus.de (verbatim kontakt.md)
    href: contact.emailHref,
    note: 'Antwort in der Regel am selben Werktag.', // NEW COPY: review
  },
  {
    kind: 'whatsapp',
    label: 'WhatsApp',
    value: 'Nachricht senden', // NEW COPY: review
    href: `https://wa.me/${telHref(WHATSAPP_NUMBER).replace('+', '')}`,
    note: 'Schnell & unkompliziert.', // NEW COPY: review
    placeholder: true,
  },
  {
    kind: 'bookings',
    label: 'Termin buchen',
    value: 'Online-Termin wählen', // NEW COPY: review
    href: BOOKINGS_URL,
    note: 'Direkt im Kalender reservieren.', // NEW COPY: review
    placeholder: true,
  },
];

/* ---------------------------------------------------------------- */
/* §6.6.2 Form section framing — NEW COPY: review                    */
/* ---------------------------------------------------------------- */

export const form = {
  overline: 'Projekt-Anfrage', // NEW COPY: review
  heading: 'Erzählen Sie uns von Ihrem Vorhaben', // NEW COPY: review
  lead: 'In zwei kurzen Schritten zu Ihrer Anfrage — zuerst das Thema, dann Ihre Kontaktdaten.', // NEW COPY: review
};

/* ---------------------------------------------------------------- */
/* §6.6.4 Standorte — 6 eigene + Partner. Addresses verbatim         */
/* kontakt.md. Coordinates (WGS84) reused from home.js for the        */
/* static map dots only.                                              */
/* ---------------------------------------------------------------- */

export const standorte = {
  overline: 'Standorte', // NEW COPY: review (eyebrow)
  heading: 'Unsere Standorte', // verbatim kontakt.md
  intro:
    'Sechs eigene Standorte und starke Partner — von Ostbrandenburg bis Baden-Württemberg.', // NEW COPY: review
  partnerHeading: 'Partnerstandorte', // NEW COPY: review
  partnerIntro:
    'An diesen Standorten arbeiten wir mit unabhängigen Partnerbüros zusammen.', // NEW COPY: review

  // 6 eigene Standorte — every line verbatim kontakt.md.
  own: [
    {
      name: 'Strausberg - Zentrale',
      addressLines: ['Garzauer Chaussee 1a', '15344 Strausberg'],
      phone: '03341 4272935',
      email: 'strausberg@ea-plus.de',
    },
    {
      name: 'Güstrow',
      addressLines: ['Lange Str.18', '18273 Güstrow'],
      phone: '03843 2298907',
      email: 'guestrow@ea-plus.de',
    },
    {
      name: 'Heiligengrabe bei Wittstock',
      addressLines: ['Wernikower Dorfstr.22', '16909 Heiligengrabe'],
      phone: '03394 7192866',
      email: 'wittstock@ea-plus.de',
    },
    {
      name: 'Bad Langensalza',
      addressLines: ['Lange Str.76', '99947 Bad Langensalza'],
      phone: '01520 4944864',
      email: 'bad-langensalza@ea-plus.de',
    },
    {
      name: 'Berlin',
      addressLines: ['Blücherstr.37', '10961 Berlin'],
      phone: '030 75438943',
      email: 'berlin@ea-plus.de',
    },
    {
      name: 'Bad Belzig',
      addressLines: ['Lüsse 7', '14806 Bad Belzig'],
      phone: '0174 2434739',
      email: 'bad-belzig@ea-plus.de',
    },
  ],

  // Partnerstandorte — 3 entries / 2 partner companies (Erkelenz & Friedeburg
  // share the EBE GmbH office). Company name is the first address line,
  // verbatim kontakt.md.
  partners: [
    {
      name: 'Erkelenz',
      addressLines: ['Energieberatungsexperts EBE GmbH', 'Frieslandstraße 25', '26446 Friedeburg'],
      phone: '0163 7070 270',
      email: 'erkelenz@ea-plus.de',
    },
    {
      name: 'Friedeburg',
      addressLines: ['Energieberatungsexperts EBE GmbH', 'Frieslandstraße 25', '26446 Friedeburg'],
      phone: '0163 7070 270',
      email: 'friedeburg@ea-plus.de',
    },
    {
      name: 'Schorndorf bei Stuttgart',
      addressLines: ['SW Bautechnik GmbH', 'Hofgartenstr. 61', '73614 Schorndorf'],
      phone: '071 81485767',
      email: 'schorndorf@ea-plus.de',
    },
  ],

  // Map dots — WGS84 coords reused from src/content/home.js (map-only).
  mapLocations: [
    { name: 'Strausberg - Zentrale', lat: 52.58, lon: 13.88 },
    { name: 'Güstrow', lat: 53.79, lon: 12.17 },
    { name: 'Heiligengrabe bei Wittstock', lat: 53.14, lon: 12.37 },
    { name: 'Bad Langensalza', lat: 51.1, lon: 10.65 },
    { name: 'Berlin', lat: 52.52, lon: 13.4 },
    { name: 'Bad Belzig', lat: 52.14, lon: 12.59 },
    // KNOWN SOURCE-DATA QUIRK (client reconcile item): the „Erkelenz" entry's
    // verbatim address in kontakt.md reads „26446 Friedeburg" (the shared EBE
    // GmbH office), but the dot is plotted at real Erkelenz (lon 6.31, near
    // Aachen) to match the location NAME. Address/coordinate mismatch is
    // intentional here and flagged for the client — no coordinate change.
    { name: 'Erkelenz', lat: 51.08, lon: 6.31, partner: true },
    { name: 'Friedeburg', lat: 53.45, lon: 7.84, partner: true },
    { name: 'Schorndorf bei Stuttgart', lat: 48.81, lon: 9.53, partner: true },
  ],
};
