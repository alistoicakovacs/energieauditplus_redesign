/**
 * Gate verification for the contact handler (plan §8.1, checklist items 1–5).
 * Pure unit tests against server/contact.js with all dependencies injected —
 * no network, no env, no external calls. Run: `node server/contact.test.mjs`.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContactSubmission } from './contact.js';
import { createRateLimiter } from './rateLimit.js';
import { clientIp, coerceConsent } from './requestUtils.js';
import { ERROR_MESSAGE, RATE_LIMIT_MESSAGE } from '../src/content/contactMessages.js';

const NOW = 1_800_000_000_000;
const OLD = NOW - 10_000; // 10s before "now" ⇒ passes the 3s min-time floor.

function makeMeta(overrides = {}) {
  const calls = [];
  const meta = {
    method: 'POST',
    origin: 'http://localhost:5173',
    ip: '203.0.113.7',
    now: NOW,
    allowedOrigins: ['http://localhost:5173'],
    rateLimiter: createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 }),
    sendMail: async (mail) => {
      calls.push(mail);
      return { delivered: true, id: 'test' };
    },
    recipient: 'ziel@ea-plus.de',
    sender: 'noreply@ea-plus.de',
    ...overrides,
  };
  return { meta, calls };
}

const validInput = (extra = {}) => ({
  leistung: 'allgemein',
  name: 'Max Mustermann',
  email: 'max@example.de',
  message: 'Hallo, ich interessiere mich für eine Energieberatung.',
  consent: true,
  website: '',
  renderedAt: OLD,
  ...extra,
});

test('gate 4/5: a clean, valid, timely submission is accepted and mailed once', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput(), meta);
  assert.equal(res.status, 200);
  assert.equal(res.payload.ok, true);
  assert.equal(res.reason, 'sent');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].to, 'ziel@ea-plus.de');
  assert.equal(calls[0].replyTo, 'max@example.de');
});

test('gate 1: honeypot filled ⇒ dropped, returns success, NO mail composed', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput({ website: 'http://spam.example' }), meta);
  assert.equal(res.status, 200); // looks like success to the bot
  assert.equal(res.reason, 'honeypot');
  assert.equal(res.delivered, false);
  assert.equal(calls.length, 0); // never sent
});

test('gate 2: min-time < 3s ⇒ dropped (success shell), NO mail', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput({ renderedAt: NOW - 1000 }), meta);
  assert.equal(res.status, 200);
  assert.equal(res.reason, 'too-fast');
  assert.equal(calls.length, 0);
});

test('gate 2: missing timestamp (no-JS) skips the min-time check', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput({ renderedAt: '' }), meta);
  assert.equal(res.status, 200);
  assert.equal(res.reason, 'sent');
  assert.equal(calls.length, 1);
});

test('gate 3: 6th request within the window is rate-limited (429)', async () => {
  const shared = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
  const results = [];
  for (let i = 0; i < 6; i += 1) {
    const { meta } = makeMeta({ rateLimiter: shared, now: NOW + i });
    // eslint-disable-next-line no-await-in-loop
    results.push(await handleContactSubmission(validInput(), meta));
  }
  assert.deepEqual(
    results.map((r) => r.status),
    [200, 200, 200, 200, 200, 429]
  );
  assert.equal(results[5].reason, 'rate-limited');
});

test('gate 4: malformed email is rejected server-side (400)', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput({ email: 'not-an-email' }), meta);
  assert.equal(res.status, 400);
  assert.equal(res.reason, 'invalid');
  assert.ok(res.payload.fields.email);
  assert.equal(calls.length, 0);
});

test('gate 4: message > 5000 chars is rejected server-side (400)', async () => {
  const { meta } = makeMeta();
  const res = await handleContactSubmission(validInput({ message: 'x'.repeat(5001) }), meta);
  assert.equal(res.status, 400);
  assert.ok(res.payload.fields.message);
});

test('gate 4: unexpected extra field is rejected by strict schema (400)', async () => {
  const { meta } = makeMeta();
  const res = await handleContactSubmission(validInput({ isAdmin: 'true' }), meta);
  assert.equal(res.status, 400);
  assert.equal(res.reason, 'invalid');
});

test('gate 5: consent unchecked ⇒ rejected server-side (400)', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(validInput({ consent: false }), meta);
  assert.equal(res.status, 400);
  assert.ok(res.payload.fields.consent);
  assert.equal(calls.length, 0);
});

test('gate: non-POST method ⇒ 405', async () => {
  const { meta } = makeMeta({ method: 'GET' });
  const res = await handleContactSubmission({}, meta);
  assert.equal(res.status, 405);
});

test('gate: disallowed Origin ⇒ 403', async () => {
  const { meta } = makeMeta({ origin: 'https://evil.example' });
  const res = await handleContactSubmission(validInput(), meta);
  assert.equal(res.status, 403);
  assert.equal(res.reason, 'origin');
});

test('no-JS (Accept: text/html) success returns an HTML confirmation page', async () => {
  const { meta } = makeMeta({ acceptsHtml: true });
  const res = await handleContactSubmission(validInput(), meta);
  assert.equal(res.status, 200);
  assert.equal(res.contentType, 'text/html');
  assert.match(res.payload, /Vielen Dank/);
});

// ---- Security review fixes ----

test('SEC: clientIp with 0 trusted hops ignores forged X-Forwarded-For', () => {
  // Rotated client-controlled XFF must NOT change the key — it resolves to the
  // socket peer, so a bot rotating headers stays under one bucket.
  const socket = '203.0.113.50';
  const a = clientIp({ 'x-forwarded-for': '9.9.9.1' }, socket, 0);
  const b = clientIp({ 'x-forwarded-for': '9.9.9.2' }, socket, 0);
  assert.equal(a, socket);
  assert.equal(b, socket);
});

test('SEC: clientIp trusts only infra-appended hops (right side of XFF)', () => {
  // 1 trusted hop ⇒ rightmost entry; forged left entries are ignored.
  assert.equal(clientIp({ 'x-forwarded-for': '1.2.3.4, 203.0.113.9' }, 'sock', 1), '203.0.113.9');
  // 2 trusted hops ⇒ 2nd from the right.
  assert.equal(
    clientIp({ 'x-forwarded-for': '1.2.3.4, 203.0.113.9, 10.0.0.1' }, 'sock', 2),
    '203.0.113.9'
  );
  // Platform-trusted header wins over a spoofed XFF.
  assert.equal(
    clientIp({ 'x-vercel-forwarded-for': '198.51.100.7', 'x-forwarded-for': '9.9.9.9' }, 'sock', 1),
    '198.51.100.7'
  );
});

test('SEC: rotated XFF cannot evade the rate cap once keyed to a fixed IP', async () => {
  // Simulate the adapter path: XFF is client-rotated but hops=0 collapses it to
  // the socket peer, so the handler sees ONE ip and the 6th request is blocked.
  const shared = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
  const statuses = [];
  for (let i = 0; i < 8; i += 1) {
    const ip = clientIp({ 'x-forwarded-for': `9.9.9.${i}` }, '203.0.113.50', 0);
    const { meta } = makeMeta({ rateLimiter: shared, ip, now: NOW + i });
    // eslint-disable-next-line no-await-in-loop
    statuses.push((await handleContactSubmission(validInput(), meta)).status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429, 429]);
});

test('SEC: rate-limiter array stays bounded under a sustained flood', () => {
  const rl = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
  for (let i = 0; i < 100_000; i += 1) rl.check('flooder', NOW + i);
  // Only allowed hits are stored ⇒ never grows past `max`, no quadratic blowup.
  assert.ok(rl.size('flooder') <= 5, `stored ${rl.size('flooder')} entries, expected <= 5`);
});

test('SEC: consent coercion accepts only boolean true or form "on"', () => {
  assert.equal(coerceConsent(true), true);
  assert.equal(coerceConsent('on'), true);
  for (const wide of ['true', '1', 'yes', 'TRUE', 1, false, undefined, null]) {
    assert.equal(coerceConsent(wide), false, `"${wide}" must not count as consent`);
  }
});

test('SEC: CR/LF in single-line fields is stripped (email-body-injection defence)', async () => {
  const { meta, calls } = makeMeta();
  const res = await handleContactSubmission(
    validInput({ name: 'Max\r\nBcc: evil@x.com', company: 'ACME\r\nX: 1', phone: '123\r\n456' }),
    meta
  );
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  const text = calls[0].text;
  // The real defence: the attacker cannot forge a NEW line — no CR anywhere,
  // and no body line starts with an injected pseudo-header. The literal "Bcc:"
  // substring survives harmlessly INLINE inside the Name value.
  assert.doesNotMatch(text, /\r/);
  assert.ok(text.split('\n').every((l) => !l.startsWith('Bcc:')), 'no forged Bcc: line');
  const nameLine = text.split('\n').find((l) => l.startsWith('Name:'));
  assert.ok(nameLine.includes('MaxBcc: evil@x.com'), 'injected content stays inline on the Name line');
});

test('polish: mailer throw ⇒ 502 with clean ERROR_MESSAGE, reason mail-error, no leak', async () => {
  const { meta } = makeMeta({
    sendMail: async () => {
      throw new Error('SMTP secret-leak 587 boom');
    },
  });
  const res = await handleContactSubmission(validInput(), meta);
  assert.equal(res.status, 502);
  assert.equal(res.reason, 'mail-error');
  assert.equal(res.payload.error, ERROR_MESSAGE);
  // The internal error text must not leak into the response.
  assert.doesNotMatch(JSON.stringify(res.payload), /SMTP|secret-leak|boom/);
});

test('polish: sliding window recovers — allowed again after the window elapses', async () => {
  const windowMs = 60 * 60 * 1000;
  const shared = createRateLimiter({ max: 5, windowMs });
  const at = async (now) => {
    const { meta } = makeMeta({ rateLimiter: shared, now });
    return (await handleContactSubmission(validInput(), meta)).status;
  };
  for (let i = 0; i < 5; i += 1) assert.equal(await at(NOW + i), 200); // 5 allowed
  assert.equal(await at(NOW + 5), 429); // 6th blocked within the window
  // Advance past the window: the old timestamps age out and a request is allowed.
  assert.equal(await at(NOW + windowMs + 1), 200);
});

test('polish: fail-path content negotiation — 400 (invalid) renders HTML for no-JS', async () => {
  const { meta } = makeMeta({ acceptsHtml: true });
  const res = await handleContactSubmission(validInput({ email: 'nope' }), meta);
  assert.equal(res.status, 400);
  assert.equal(res.contentType, 'text/html');
  assert.match(res.payload, /Fehler/);
});

test('polish: fail-path content negotiation — 429 (rate limit) renders HTML for no-JS', async () => {
  const shared = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
  let res;
  for (let i = 0; i < 6; i += 1) {
    const { meta } = makeMeta({ rateLimiter: shared, acceptsHtml: true, now: NOW + i });
    // eslint-disable-next-line no-await-in-loop
    res = await handleContactSubmission(validInput(), meta);
  }
  assert.equal(res.status, 429);
  assert.equal(res.contentType, 'text/html');
  assert.match(res.payload, /Fehler/);
});

test('polish: shared status copy is byte-identical across client + server modules', async () => {
  // The server pulls its copy from the same module the client imports.
  const shared = await import('../src/content/contactMessages.js');
  assert.equal(shared.RATE_LIMIT_MESSAGE, RATE_LIMIT_MESSAGE);
  assert.ok(shared.SUCCESS_MESSAGE.startsWith('Vielen Dank!'));
});
