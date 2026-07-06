/**
 * Shared contact-form validation (plan §8.1) — the SINGLE zod schema used by
 * BOTH the client (src/components/forms/ContactForm) and the server
 * (server/contact.js). The server never trusts the client: it re-runs this
 * same schema in STRICT mode (rejecting unexpected fields) on every request.
 *
 * Portable by design: this module imports only `zod`. It must NOT import
 * anything Vite-specific (no `import.meta.env`, no CSS, no lucide-react), so
 * the Node server can `import` it directly.
 *
 * Field labels are verbatim from handoff/content/kontakt.md where the live
 * site provides them; the error messages are likewise verbatim from that
 * file's „Status- und Fehlermeldungen" list. Projektphase option labels are
 * NEW COPY (the live form had no such field) — flagged for review.
 */
import { z } from 'zod';

/** Server-side length cap for the free-text message (plan §8.1). */
export const MESSAGE_MAX = 5000;

/**
 * The 7 Leistungen (verbatim navigation labels, per handoff/content/kontakt.md
 * Hauptnavigation) + „Allgemeine Anfrage" (plan §6.6 „7 Leistungen + Allgemein").
 * `value` = the service route's last path segment, so `?leistung=<slug>`
 * deep-links (plan §13.2) map 1:1 onto these.
 */
export const LEISTUNG_OPTIONS = [
  { value: 'neubau-energieberatung', label: 'Neubau & Energieberatung' },
  { value: 'bestandsgebaeude', label: 'Energieberatung für Bestandsgebäude' },
  { value: 'fordermittelservice', label: 'Fördermittelservice' },
  { value: 'lebenszyklusanalyse-lca', label: 'Lebenszyklusanalyse (LCA)' },
  { value: 'raumluftmessung-baubiologie', label: 'Raumluftmessung & Baubiologie' },
  { value: 'blower-door-test', label: 'Blower-Door-Test' },
  { value: 'qng-flow', label: 'Nachhaltigkeitsaudit mit QNG-flow' },
  { value: 'allgemein', label: 'Allgemeine Anfrage' },
];

export const LEISTUNG_VALUES = LEISTUNG_OPTIONS.map((o) => o.value);

/** Optional Projektphase (plan §6.6 Step 1). NEW COPY: review — not on the
    live site; labels chosen to cover the typical project lifecycle. */
export const PROJEKTPHASE_OPTIONS = [
  { value: 'idee', label: 'Idee / Konzept' }, // NEW COPY: review
  { value: 'planung', label: 'Planung' }, // NEW COPY: review
  { value: 'ausfuehrung', label: 'In Ausführung' }, // NEW COPY: review
  { value: 'bestand', label: 'Bestandsgebäude' }, // NEW COPY: review
];

export const PROJEKTPHASE_VALUES = PROJEKTPHASE_OPTIONS.map((o) => o.value);

/**
 * Control-char scrubbing (email-body-injection defence, plan §8.1 output
 * handling). Single-line fields strip ALL C0 controls + DEL, so raw CR/LF in
 * name/company/phone cannot forge extra lines (fake „Bcc:"/fields) into the
 * plain-text ops notification. (Not SMTP header injection — Resend isolates
 * headers — but the body is still user-controlled text.) The message keeps
 * newlines (\n) and tabs (\t); CRLF/CR is normalised to LF first.
 * Regexes built via `new RegExp` from escaped strings so the source stays
 * pure ASCII (no literal control bytes in the file).
 */
const SINGLE_LINE_CONTROLS = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
const MULTILINE_CONTROLS = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');

const stripControls = (v) =>
  typeof v === 'string' ? v.replace(SINGLE_LINE_CONTROLS, '').trim() : v;

const cleanMultiline = (v) =>
  typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(MULTILINE_CONTROLS, '').trim() : v;

/** Optional free-text field: strips control chars, allows empty, caps length. */
const optionalText = (max) =>
  z.preprocess(
    stripControls,
    z.string().max(max, `Bitte kürzen Sie diese Angabe (max. ${max} Zeichen).`).optional()
  );

/** Optional enum from a fixed value set: '' / null / undefined ⇒ undefined. */
const optionalEnum = (values) =>
  z.preprocess((v) => (v === '' || v == null ? undefined : v), z.enum(values).optional());

/**
 * The core contact payload. The client validates against this (non-strict, so
 * client-only meta fields like the honeypot/timestamp are simply stripped
 * before validation); the server validates against `.strict()` (see
 * parseContactStrict) so any unexpected field is rejected.
 *
 * Single-line text fields strip control chars first (email-body-injection
 * defence); the message keeps newlines. Error messages verbatim
 * handoff/content/kontakt.md „Status- und Fehlermeldungen"; the Leistung
 * message is NEW COPY (Step-1 selection).
 */
export const contactSchema = z.object({
  leistung: z.enum(LEISTUNG_VALUES, {
    errorMap: () => ({ message: 'Bitte wählen Sie aus, worum es geht.' }), // NEW COPY: review
  }),
  projektphase: optionalEnum(PROJEKTPHASE_VALUES),
  name: z.preprocess(
    stripControls,
    z
      .string()
      .min(1, 'Bitte geben Sie Ihren Namen an.')
      .max(120, 'Bitte kürzen Sie Ihren Namen (max. 120 Zeichen).')
  ),
  company: optionalText(160),
  email: z.preprocess(
    stripControls,
    z
      .string()
      .min(1, 'Bitte geben Sie eine gültige E-Mail-Adresse an.')
      .max(200, 'Bitte geben Sie eine gültige E-Mail-Adresse an.')
      .email('Bitte geben Sie eine gültige E-Mail-Adresse an.')
  ),
  phone: optionalText(60),
  message: z.preprocess(
    cleanMultiline,
    z
      .string()
      .min(1, 'Bitte geben Sie eine Nachricht ein.')
      .max(MESSAGE_MAX, `Ihre Nachricht ist zu lang (max. ${MESSAGE_MAX} Zeichen).`)
  ),
  // DSGVO consent (plan §8.3): must be literally `true` — an unchecked box
  // (false / missing) fails here, both client- and server-side.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }),
  }),
});

/**
 * Server-side validation gate (plan §8.1): STRICT parse rejects any field the
 * schema does not declare. Call with the core fields only (the caller strips
 * anti-spam meta such as `website`/`renderedAt` first).
 *
 * @param {unknown} input
 * @returns {import('zod').SafeParseReturnType<unknown, object>}
 */
export function parseContactStrict(input) {
  return contactSchema.strict().safeParse(input);
}

/** Human-readable Leistung label for a value (falls back to the raw value). */
export function leistungLabel(value) {
  return LEISTUNG_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Human-readable Projektphase label for a value (falls back to the raw value). */
export function projektphaseLabel(value) {
  return PROJEKTPHASE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
