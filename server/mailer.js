/**
 * Transactional mail abstraction (plan §2 backend row + §8.1).
 *
 * Key handling: the Resend API key is read from `process.env.RESEND_API_KEY`
 * on the SERVER ONLY — it is never imported into client code, so it can never
 * reach `dist/`. Without the key (local dev), the composed email is LOGGED and
 * nothing is sent: the whole submission flow is exercisable locally with zero
 * credentials and zero external network calls.
 *
 * Data minimisation (plan §8.1): the production (key-present) path sends the
 * mail and does NOT log the message body. Only the dev/no-key path prints the
 * body — there, logging IS the delivery stand-in.
 */

/**
 * @typedef {object} MailInput
 * @property {string} to        Recipient (from CONTACT_TO).
 * @property {string} from      Verified sender (from CONTACT_FROM).
 * @property {string} [replyTo] Submitter's address, so a reply reaches them.
 * @property {string} subject
 * @property {string} text      Plain-text body (preferred, plan §8.1).
 * @property {string} [html]    Optional HTML alternative (fully escaped).
 */

/**
 * Send (or, in dev, log) the notification email.
 * @param {MailInput} mail
 * @returns {Promise<{ delivered: boolean, dev?: boolean, id?: string }>}
 */
export async function sendMail({ to, from, replyTo, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // DEV MODE — no credentials, no external call. Log the composed email so
    // the flow is fully testable locally.
    // eslint-disable-next-line no-console
    console.log(
      [
        '',
        '─── [contact] DEV mailer: RESEND_API_KEY not set — email NOT sent, logged instead ───',
        `To:       ${to ?? '(CONTACT_TO not set)'}`,
        `From:     ${from ?? '(CONTACT_FROM not set)'}`,
        `Reply-To: ${replyTo ?? '—'}`,
        `Subject:  ${subject}`,
        '',
        text,
        '──────────────────────────────────────────────────────────────────────────────',
        '',
      ].join('\n')
    );
    return { delivered: false, dev: true };
  }

  if (!to) throw new Error('CONTACT_TO is not configured — cannot send notification email.');
  if (!from) throw new Error('CONTACT_FROM is not configured — cannot send notification email.');

  // Production path: authenticated Resend API call. No message-body logging.
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
      ...(html ? { html } : {}),
    }),
  });

  if (!res.ok) {
    // Do not echo the response body (may contain request echoes); status only.
    throw new Error(`Resend API responded ${res.status}`);
  }

  const data = await res.json().catch(() => ({}));
  return { delivered: true, id: data?.id };
}
