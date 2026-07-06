/**
 * Shared contact-form status copy — verbatim handoff/content/kontakt.md
 * „Status- und Fehlermeldungen". Imported by BOTH the client
 * (src/components/forms/ContactForm) and the server (server/contact.js) so the
 * two never drift.
 *
 * Plain strings only: no imports, no mailer, no secrets — safe to include in
 * the client bundle.
 */

export const SUCCESS_MESSAGE =
  'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns zeitnah bei Ihnen.';

export const ERROR_MESSAGE =
  'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.';

export const RATE_LIMIT_MESSAGE =
  'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.';
