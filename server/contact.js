/**
 * Framework-agnostic contact-form handler (plan §8.1 — the highest-risk
 * surface). A single pure function, `handleContactSubmission(input, meta)`,
 * runs every security gate and returns `{ status, contentType, payload, … }`.
 * Thin adapters (api/contact.js for Vercel-style hosts, server/dev-server.mjs
 * for local testing) parse the request into `input`/`meta`, call this, and
 * write the result to the wire.
 *
 * Gates, in order (plan §8.1):
 *   1. POST only.
 *   2. Same-origin check (Origin header).
 *   3. Rate limit (5/h per IP, in-memory — see server/rateLimit.js caveat).
 *   4. Honeypot — any value ⇒ silently accept-but-drop (returns success so
 *      bots can't tell it was rejected).
 *   5. Min-time-to-submit — < 3s ⇒ silently drop (JS submissions only; a
 *      no-JS submit carries no client timestamp and skips this check).
 *   6. Server-side zod validation in STRICT mode (rejects unexpected fields,
 *      caps message length, strict email, requires consent).
 *   7. Compose a PLAIN-TEXT email (HTML alternative fully escaped) and send
 *      via the injected mailer (Resend in prod, log in dev).
 *
 * Output handling: all input is treated as text and HTML-escaped before it is
 * ever interpolated into the HTML mail alternative or the no-JS HTML response.
 * No user input is echoed to the page; `dangerouslySetInnerHTML` is not used.
 *
 * Testability: every external dependency (mailer, rate limiter, clock,
 * allowed origins, recipient) is injectable through `meta`, so the gates can
 * be exercised in isolation without any network or environment.
 */
import { parseContactStrict, leistungLabel, projektphaseLabel } from '../src/lib/validation.js';
import { sendMail as defaultSendMail } from './mailer.js';
import { createRateLimiter } from './rateLimit.js';

/** Success/error copy — verbatim handoff/content/kontakt.md „Status- und Fehlermeldungen". */
const SUCCESS_MESSAGE =
  'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns zeitnah bei Ihnen.';
const ERROR_MESSAGE =
  'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.';
const RATE_LIMIT_MESSAGE =
  'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.';

/** Minimum time (ms) a real user needs to fill the form (plan §8.1). */
const MIN_SUBMIT_MS = 3000;

/** Process-wide default limiter (adapters share it; tests inject their own). */
const defaultRateLimiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function defaultAllowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const site = process.env.SITE_URL ?? process.env.VITE_SITE_URL;
  return [...new Set([...(site ? [site] : []), ...fromEnv])];
}

/**
 * Origin allow-list check. A present Origin must be explicitly allow-listed OR
 * a localhost/127.0.0.1 origin (any port — dev convenience; never a real prod
 * origin). An absent Origin is permitted (some same-origin posts / curl); a
 * contact form has no cookies/session, so CSRF impact is negligible.
 */
function isOriginAllowed(origin, allowed) {
  if (!origin) return true;
  if (allowed.includes(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  } catch {
    return false;
  }
}

/** JSON result envelope. `delivered`/`reason` are for tests/logging only. */
function json(status, payload, { delivered = false, reason } = {}) {
  return { status, contentType: 'application/json', payload, delivered, reason };
}

/** Minimal standalone HTML page for no-JS (native form) responses. */
function htmlPage(status, title, headline, message, reason) {
  const body = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>${escapeHtml(title)} — EnergieAudit Plus</title>
    <style>
      body{font-family:"Calibri",system-ui,"Segoe UI",sans-serif;line-height:1.65;color:#1E1E1E;
        max-width:40rem;margin:0 auto;padding:3rem 1.25rem}
      h1{font-family:"Cambria",Georgia,serif;color:#0F1B2D}
      a{color:#1466A8}
      .card{border:1px solid #E2E8F0;border-radius:20px;padding:2rem}
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${escapeHtml(headline)}</h1>
      <p>${escapeHtml(message)}</p>
      <p><a href="/kontakt">Zur&uuml;ck zur Kontaktseite</a></p>
    </div>
  </body>
</html>`;
  return { status, contentType: 'text/html', payload: body, delivered: false, reason };
}

/** Content-negotiated success (drops still return this so bots learn nothing). */
function success(acceptsHtml, meta) {
  if (acceptsHtml) return htmlPage(200, 'Anfrage gesendet', 'Vielen Dank!', SUCCESS_MESSAGE, meta.reason);
  return json(200, { ok: true, message: SUCCESS_MESSAGE }, meta);
}

/** Content-negotiated failure: HTML page for no-JS clients, JSON otherwise. */
function fail(status, message, { acceptsHtml, fields, reason }) {
  if (acceptsHtml) return htmlPage(status, 'Fehler', 'Es ist ein Fehler aufgetreten', message, reason);
  return json(status, { ok: false, error: message, ...(fields ? { fields } : {}) }, { reason });
}

/**
 * @param {Record<string, unknown>} input  Parsed request body.
 * @param {object} [meta]
 * @param {string}   [meta.method='POST']
 * @param {string|null} [meta.origin=null] Origin request header.
 * @param {string}   [meta.ip='unknown']
 * @param {number}   [meta.now=Date.now()]
 * @param {boolean}  [meta.acceptsHtml=false] Native form post (Accept: text/html).
 * @param {string[]} [meta.allowedOrigins]  Overrides env-derived allow-list.
 * @param {object}   [meta.rateLimiter]     Overrides the shared limiter.
 * @param {Function} [meta.sendMail]        Overrides the mailer.
 * @param {string}   [meta.recipient]       Overrides CONTACT_TO.
 * @param {string}   [meta.sender]          Overrides CONTACT_FROM.
 * @param {number}   [meta.minSubmitMs]     Overrides the 3s floor.
 * @returns {Promise<{status:number, contentType:string, payload:any, delivered:boolean, reason?:string}>}
 */
export async function handleContactSubmission(input, meta = {}) {
  const {
    method = 'POST',
    origin = null,
    ip = 'unknown',
    now = Date.now(),
    acceptsHtml = false,
    allowedOrigins = defaultAllowedOrigins(),
    rateLimiter = defaultRateLimiter,
    sendMail = defaultSendMail,
    recipient = process.env.CONTACT_TO,
    sender = process.env.CONTACT_FROM ?? 'EnergieAudit Plus <noreply@ea-plus.de>',
    minSubmitMs = MIN_SUBMIT_MS,
  } = meta;

  // 1 — POST only.
  if (method !== 'POST') {
    return json(405, { ok: false, error: 'Method Not Allowed' }, { reason: 'method' });
  }

  // 2 — Same-origin check. A present Origin must be allow-listed; an absent
  // Origin (some same-origin posts, curl) is permitted and documented — a
  // contact form has no cookies/session, so CSRF impact is negligible.
  if (!isOriginAllowed(origin, allowedOrigins)) {
    return fail(403, 'Forbidden', { acceptsHtml, reason: 'origin' });
  }

  const body = input && typeof input === 'object' ? input : {};

  // 3 — Rate limit (every processed request counts).
  const rl = rateLimiter.check(ip, now);
  if (!rl.allowed) {
    return fail(429, RATE_LIMIT_MESSAGE, { acceptsHtml, reason: 'rate-limited' });
  }

  // 4 — Honeypot: any value ⇒ silently accept-but-drop (return success).
  const honeypot = typeof body.website === 'string' ? body.website.trim() : body.website;
  if (honeypot) {
    return success(acceptsHtml, { reason: 'honeypot' });
  }

  // 5 — Min-time-to-submit (JS submissions only). `renderedAt` is the epoch-ms
  // the form mounted, stamped client-side. No-JS posts carry no timestamp and
  // skip this check.
  const renderedAt = Number(body.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0 && now - renderedAt < minSubmitMs) {
    return success(acceptsHtml, { reason: 'too-fast' });
  }

  // 6 — Strict server-side validation (independent of the client). Strip the
  // anti-spam meta first; everything else must match the schema exactly.
  const { website, renderedAt: _t, ...core } = body;
  void website;
  void _t;
  const parsed = parseContactStrict(core);
  if (!parsed.success) {
    const fields = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key && !fields[key]) fields[key] = issue.message;
    }
    return fail(400, 'Bitte prüfen Sie Ihre Eingaben.', { acceptsHtml, fields, reason: 'invalid' });
  }

  // 7 — Compose + send. Plain text preferred; HTML alternative fully escaped.
  const data = parsed.data;
  const line = (k, v) => `${k}: ${v ?? '—'}`;
  const text = [
    'Neue Projekt-Anfrage über das Kontaktformular (ea-plus.de/kontakt)',
    '',
    line('Leistung', leistungLabel(data.leistung)),
    line('Projektphase', data.projektphase ? projektphaseLabel(data.projektphase) : '—'),
    line('Name', data.name),
    line('Firma', data.company || '—'),
    line('E-Mail', data.email),
    line('Telefon', data.phone || '—'),
    '',
    'Nachricht:',
    data.message,
    '',
    '—',
    'Einwilligung Datenschutzerklärung: erteilt',
    `Eingegangen: ${new Date(now).toISOString()}`,
  ].join('\n');

  const html =
    `<h2>Neue Projekt-Anfrage</h2>` +
    `<p>Über das Kontaktformular (ea-plus.de/kontakt)</p>` +
    `<table cellpadding="6" style="border-collapse:collapse">` +
    [
      ['Leistung', leistungLabel(data.leistung)],
      ['Projektphase', data.projektphase ? projektphaseLabel(data.projektphase) : '—'],
      ['Name', data.name],
      ['Firma', data.company || '—'],
      ['E-Mail', data.email],
      ['Telefon', data.phone || '—'],
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="vertical-align:top"><strong>${escapeHtml(k)}</strong></td>` +
          `<td>${escapeHtml(v)}</td></tr>`
      )
      .join('') +
    `</table>` +
    `<p><strong>Nachricht:</strong><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>` +
    `<hr><p><small>Einwilligung Datenschutzerklärung: erteilt · ` +
    `Eingegangen: ${escapeHtml(new Date(now).toISOString())}</small></p>`;

  try {
    await sendMail({
      to: recipient,
      from: sender,
      replyTo: data.email,
      subject: `Neue Projekt-Anfrage – ${leistungLabel(data.leistung)}`,
      text,
      html,
    });
  } catch {
    // Do not log the message body (data minimisation, plan §8.1).
    return fail(502, ERROR_MESSAGE, { acceptsHtml, reason: 'mail-error' });
  }

  return success(acceptsHtml, { delivered: true, reason: 'sent' });
}

export { SUCCESS_MESSAGE, ERROR_MESSAGE, MIN_SUBMIT_MS };
