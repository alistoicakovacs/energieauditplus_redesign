/**
 * Local dev harness for the contact endpoint (plan §8.1 — so the whole flow,
 * including honeypot / min-time / rate-limit / validation / consent paths, is
 * exercisable WITHOUT deploying and WITHOUT credentials).
 *
 * Run it, then either:
 *   • start Vite (`npm run dev`) — vite.config.js proxies /api → this server, so
 *     the real form POSTs here; or
 *   • curl it directly, e.g.
 *       curl -si -X POST http://127.0.0.1:8787/api/contact \
 *         -H 'Content-Type: application/json' \
 *         -d '{"leistung":"allgemein","name":"Max","email":"a@b.de",
 *              "message":"Hallo","consent":true}'
 *
 * Without RESEND_API_KEY it logs the composed email and sends nothing.
 * Load a .env manually if you want (`node --env-file=.env server/dev-server.mjs`).
 */
import http from 'node:http';
import { handleContactSubmission } from './contact.js';
import { normalizeContactInput, parseBody, clientIp, wantsHtml, readRawBody } from './requestUtils.js';

const PORT = Number(process.env.CONTACT_DEV_PORT ?? 8787);
// The harness is directly connected (no reverse proxy), so by default it does
// NOT trust X-Forwarded-For — the socket peer is the real client. Override with
// TRUSTED_PROXY_HOPS to emulate a proxied deployment.
const TRUSTED_PROXY_HOPS = Number(process.env.TRUSTED_PROXY_HOPS ?? 0);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host ?? '127.0.0.1'}`);

  if (url.pathname !== '/api/contact') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
    return;
  }

  const bodyString = await readRawBody(req).catch(() => '');
  const raw = parseBody(bodyString, req.headers['content-type']);

  const result = await handleContactSubmission(normalizeContactInput(raw), {
    method: req.method,
    origin: req.headers.origin ?? null,
    ip: clientIp(req.headers, req.socket?.remoteAddress, TRUSTED_PROXY_HOPS),
    acceptsHtml: wantsHtml(req.headers.accept),
  });

  res.statusCode = result.status;
  res.setHeader('Content-Type', result.contentType);
  res.setHeader('Cache-Control', 'no-store');
  if (result.status === 405) res.setHeader('Allow', 'POST');
  res.end(
    result.contentType === 'application/json' ? JSON.stringify(result.payload) : result.payload
  );
});

server.listen(PORT, '127.0.0.1', () => {
  const mode = process.env.RESEND_API_KEY ? 'Resend (live)' : 'DEV log-only (no RESEND_API_KEY)';
  // eslint-disable-next-line no-console
  console.log(`[contact] dev harness on http://127.0.0.1:${PORT}/api/contact — mailer: ${mode}`);
});
