/**
 * Gate verification for the contact handler (plan §8.1, checklist items 1–5).
 * Pure unit tests against server/contact.js with all dependencies injected —
 * no network, no env, no external calls. Run: `node server/contact.test.mjs`.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContactSubmission } from './contact.js';
import { createRateLimiter } from './rateLimit.js';

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
