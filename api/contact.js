/**
 * Vercel-style serverless adapter for the contact endpoint (plan §8.1).
 * Framework-agnostic core logic lives in server/contact.js; this file only
 * translates the platform request/response into the handler's `input`/`meta`
 * and back. Netlify/other Node function hosts can wrap the same core the same
 * way.
 *
 * The RESEND_API_KEY / CONTACT_TO / CONTACT_FROM env vars are read on the
 * server inside server/contact.js + server/mailer.js — never here, never in
 * anything bundled to the client.
 */
import { handleContactSubmission } from '../server/contact.js';
import {
  normalizeContactInput,
  parseBody,
  clientIp,
  wantsHtml,
  readRawBody,
} from '../server/requestUtils.js';
import { ERROR_MESSAGE } from '../src/content/contactMessages.js';

export default async function handler(req, res) {
  try {
    // Resolve the body: platforms may pre-parse it (object/string) or leave the
    // raw stream for us.
    let raw;
    if (req.body && typeof req.body === 'object') {
      raw = req.body;
    } else {
      const bodyString =
        typeof req.body === 'string' ? req.body : await readRawBody(req).catch(() => '');
      raw = parseBody(bodyString, req.headers['content-type']);
    }

    const result = await handleContactSubmission(normalizeContactInput(raw), {
      method: req.method,
      origin: req.headers.origin ?? null,
      ip: clientIp(req.headers, req.socket?.remoteAddress),
      acceptsHtml: wantsHtml(req.headers.accept),
    });

    res.statusCode = result.status;
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Cache-Control', 'no-store');
    if (result.status === 405) res.setHeader('Allow', 'POST');
    res.end(
      result.contentType === 'application/json' ? JSON.stringify(result.payload) : result.payload
    );
  } catch {
    // Defense in depth: any unexpected throw yields the clean German error copy,
    // never a raw platform 500. Do not echo the error (data minimisation).
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ ok: false, error: ERROR_MESSAGE }));
  }
}
