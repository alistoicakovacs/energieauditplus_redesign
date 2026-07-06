/**
 * Shared request helpers for the contact-form adapters (api/contact.js and
 * server/dev-server.mjs). Kept tiny and dependency-free.
 */

/** Coerce a consent value from JSON (boolean) or a form post ('on'/'true'). */
export function coerceConsent(value) {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

/**
 * Normalise a raw body (from JSON or urlencoded) into the handler `input`.
 * Unknown keys are DELIBERATELY passed through so the server's strict zod
 * validation can reject them (plan §8.1: "reject unexpected fields").
 */
export function normalizeContactInput(raw) {
  const obj = raw && typeof raw === 'object' ? raw : {};
  return { ...obj, consent: coerceConsent(obj.consent) };
}

/** Parse a raw request body string by content-type into a plain object. */
export function parseBody(rawString, contentType = '') {
  const type = String(contentType).toLowerCase();
  if (!rawString) return {};
  if (type.includes('application/json')) {
    try {
      return JSON.parse(rawString);
    } catch {
      return {};
    }
  }
  if (type.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawString));
  }
  // Best-effort: try JSON, then urlencoded.
  try {
    return JSON.parse(rawString);
  } catch {
    return Object.fromEntries(new URLSearchParams(rawString));
  }
}

/** First-hop client IP from proxy headers, falling back to the socket. */
export function clientIp(headers = {}, fallback = 'unknown') {
  const xff = headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  if (Array.isArray(xff) && xff.length) return String(xff[0]).split(',')[0].trim();
  const real = headers['x-real-ip'];
  if (typeof real === 'string' && real.length) return real;
  return fallback || 'unknown';
}

/**
 * True when the client wants an HTML response (a native, no-JS form post).
 * The enhanced fetch path sets `Accept: application/json`, which wins.
 */
export function wantsHtml(acceptHeader = '') {
  const a = String(acceptHeader);
  return a.includes('text/html') && !a.includes('application/json');
}

/** Collect a Node request stream into a string (adapter fallback). */
export function readRawBody(req, limitBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    let data = '';
    let bytes = 0;
    req.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > limitBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
