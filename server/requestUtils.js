/**
 * Shared request helpers for the contact-form adapters (api/contact.js and
 * server/dev-server.mjs). Kept tiny and dependency-free.
 */

/**
 * Coerce a consent value into a strict boolean. Only two shapes count as
 * consent, matching exactly how the two real submit paths encode it:
 *   - JSON (enhanced fetch): boolean `true`
 *   - urlencoded (native no-JS checkbox): the string `'on'`
 * Nothing else (`'true'`, `'1'`, `'yes'`, …) is accepted, so the recorded
 * DSGVO consent is never looser than the zod `literal(true)` schema claims.
 */
export function coerceConsent(value) {
  return value === true || value === 'on';
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

/**
 * Resolve the client IP for rate-limiting from a TRUSTED source only.
 *
 * `X-Forwarded-For` is `client, proxy1, proxy2, …` where each hop APPENDS the
 * peer it saw. Everything a client sends is prepended and is therefore
 * forgeable — so the naive "leftmost entry" is attacker-controlled and lets a
 * bot rotate `X-Forwarded-For: 9.9.9.<i>` to dodge the per-IP cap. Instead we
 * trust only entries our own infrastructure appended:
 *
 *   trustedProxyHops = N  ⇒ take the Nth entry FROM THE RIGHT (the address the
 *     outermost of our N trusted reverse proxies observed = the real client).
 *     Forged left-side entries are ignored.
 *   trustedProxyHops = 0  ⇒ there is NO trusted proxy in front (direct socket,
 *     e.g. the local dev harness): XFF / X-Real-IP are fully client-controlled,
 *     so we ignore them entirely and key on the socket peer (`fallback`).
 *
 * DEPLOYMENT ASSUMPTION (must be configured, see .env.example TRUSTED_PROXY_HOPS):
 * the hop count MUST match the number of reverse proxies between the public
 * internet and this process, otherwise the app either trusts a forgeable entry
 * (too high) or reads a proxy address (too low). When the platform exposes a
 * non-forgeable client header (Vercel's `x-vercel-forwarded-for`, which the
 * platform sets and strips any client copy of), we prefer it.
 *
 * @param {Record<string,string|string[]>} headers
 * @param {string} fallback  socket peer address (trusted transport source)
 * @param {number} [trustedProxyHops]  overrides env TRUSTED_PROXY_HOPS (default 1)
 */
export function clientIp(headers = {}, fallback = 'unknown', trustedProxyHops) {
  const hops = Number.isFinite(trustedProxyHops)
    ? trustedProxyHops
    : Number(process.env.TRUSTED_PROXY_HOPS ?? 1);

  // No trusted proxy ⇒ forwarded headers are client-controlled; use the socket.
  if (!(hops > 0)) return fallback || 'unknown';

  // Platform-trusted header wins (set by the platform, client copy stripped).
  const vercel = headers['x-vercel-forwarded-for'];
  if (typeof vercel === 'string' && vercel.trim()) return vercel.split(',')[0].trim();

  const xffRaw = headers['x-forwarded-for'];
  const xff = Array.isArray(xffRaw) ? xffRaw.join(',') : xffRaw;
  if (typeof xff === 'string' && xff.trim()) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[Math.max(0, parts.length - hops)];
  }

  const real = headers['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real;
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
