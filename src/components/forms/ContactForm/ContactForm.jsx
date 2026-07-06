import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  MessageSquare,
  Send,
} from 'lucide-react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Heading,
  IconChip,
  Link,
} from '../../primitives/index.js';
import { services, contact } from '../../../lib/navigation.js';
import {
  contactSchema,
  LEISTUNG_OPTIONS,
  LEISTUNG_VALUES,
  PROJEKTPHASE_OPTIONS,
  MESSAGE_MAX,
} from '../../../lib/validation.js';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../content/contactMessages.js';
import styles from './ContactForm.module.css';

/**
 * ContactForm — the 2-step Projekt-Anfrage (plan §6.6 + §13.4) and the site's
 * highest-risk surface (§8.1). Lives under components/forms/ (not patterns/)
 * because it owns stateful behaviour and a network side effect — a different
 * concern from the presentational pattern library; the KontaktPage composes it
 * like any other library component.
 *
 * PROGRESSIVE ENHANCEMENT (plan §6.6 "degrades to a single flat form without
 * JS"): the component renders a plain `<form method="post" action="/api/contact">`
 * whose FIRST render (server prerender + first client render, `enhanced=false`)
 * is a single flat form with native controls (radio cards, native `required`,
 * one submit button). It posts natively and the server content-negotiates an
 * HTML confirmation page for no-JS clients. A mount effect flips `enhanced` to
 * true — matching the SSR snapshot first, then upgrading — and the same fields
 * become a 2-step wizard with motion, focus management and fetch submission.
 * No `dangerouslySetInnerHTML`; React escapes all output.
 *
 * VALIDATION: react-hook-form drives the UI; the resolver runs the SHARED zod
 * schema from lib/validation.js (the exact schema the server re-checks in
 * strict mode). Because no `@hookform/resolvers` package is installed, a tiny
 * local resolver adapts zod issues to RHF errors — no new dependency.
 *
 * @param {object} props
 * @param {string} props.bookingsUrl        Outlook Bookings link (success CTA).
 * @param {string} [props.mailtoHref]        Fallback mailto for the error state.
 * @param {string} [props.datenschutzTo]     Route for the consent link.
 */

const LEISTUNG_ICONS = Object.fromEntries(
  services.map((s) => [s.to.split('/').pop(), s.icon])
);
const iconFor = (value) => LEISTUNG_ICONS[value] ?? MessageSquare;

const PHASE_OPTIONS = [
  { value: '', label: 'Bitte wählen …' }, // verbatim kontakt.md placeholder
  ...PROJEKTPHASE_OPTIONS,
];

/**
 * Local zod → react-hook-form resolver (no `@hookform/resolvers` dependency).
 * Strips client-only meta (honeypot/timestamp) before validation, and — when
 * react-hook-form validates a SUBSET via `trigger(name)` — scopes the returned
 * errors to `options.names` so Step-2 fields don't flag before the user
 * reaches them (advancing Step 1 validates `leistung` only).
 */
function contactResolver(values, _context, options) {
  const { website, renderedAt, ...core } = values;
  void website;
  void renderedAt;
  const result = contactSchema.safeParse(core);
  if (result.success) return { values, errors: {} };

  const names = options?.names;
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (!key) continue;
    if (names && names.length && !names.includes(key)) continue;
    if (!errors[key]) errors[key] = { type: issue.code ?? 'validation', message: issue.message };
  }
  // Only block submission when errors are in scope; otherwise pass values through.
  return { values: Object.keys(errors).length ? {} : values, errors };
}

export default function ContactForm({
  bookingsUrl,
  mailtoHref = contact.emailHref,
  datenschutzTo = '/datenschutzerklaerung',
}) {
  const [enhanced, setEnhanced] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGE);
  const [announce, setAnnounce] = useState('');

  const renderedAtRef = useRef(0);
  const stepHeadingRef = useRef(null);
  const firstStepRender = useRef(true);

  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors, touchedFields, submitCount },
  } = useForm({
    resolver: contactResolver,
    mode: 'onTouched',
    defaultValues: {
      leistung: '',
      projektphase: '',
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  // Enhance after mount: first client render matches the SSR flat form, then
  // upgrades to the wizard (no hydration mismatch).
  useEffect(() => {
    setEnhanced(true);
    renderedAtRef.current = Date.now();
  }, []);

  // Deep-link support (plan §13.2): ?leistung=<slug> preselects Step 1.
  // Unknown values are ignored (the schema enum is the allow-list).
  useEffect(() => {
    const slug = searchParams.get('leistung');
    if (slug && LEISTUNG_OPTIONS.some((o) => o.value === slug)) {
      setValue('leistung', slug);
    }
  }, [searchParams, setValue]);

  // Focus + announce on step change (skip the initial render).
  useEffect(() => {
    if (!enhanced) return;
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step, enhanced]);

  const goToStep2 = () => {
    // Validate only Step 1 (leistung) so Step-2 fields don't flag prematurely.
    if (!LEISTUNG_VALUES.includes(getValues('leistung'))) {
      setError('leistung', { type: 'manual', message: 'Bitte wählen Sie aus, worum es geht.' });
      setFocus('leistung');
      return;
    }
    clearErrors();
    setAnnounce('Schritt 2 von 2: Ihre Kontaktdaten.');
    setStep(2);
  };

  const goToStep1 = () => {
    setAnnounce('Schritt 1 von 2: Worum geht es?');
    setStep(1);
  };

  // Show a field error only once the user has interacted with it (blur) or a
  // submit has been attempted — so advancing to Step 2 never flags empty
  // fields before the user has reached them.
  const errFor = (field) =>
    submitCount > 0 || touchedFields[field] ? errors[field]?.message : undefined;

  const onValid = async (values) => {
    setStatus('submitting');
    setAnnounce('Ihre Anfrage wird gesendet …');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          website: getValues('website') ?? '',
          renderedAt: renderedAtRef.current,
        }),
      });
      if (!res.ok) {
        // Surface the server's specific German copy (e.g. the rate-limit
        // message on 429) instead of the generic fallback when available.
        const body = await res.json().catch(() => null);
        const msg = (body && (body.error || body.message)) || ERROR_MESSAGE;
        setErrorMessage(msg);
        setStatus('error');
        setAnnounce(msg);
        return;
      }
      setStatus('success');
      setAnnounce(SUCCESS_MESSAGE);
    } catch {
      setErrorMessage(ERROR_MESSAGE);
      setStatus('error');
      setAnnounce(ERROR_MESSAGE);
    }
  };

  const onInvalid = (formErrors) => {
    // If the only-Step-1 field is invalid, jump back so the error is visible.
    if (formErrors.leistung) setStep(1);
  };

  const resetForm = () => {
    reset();
    setStep(1);
    setStatus('idle');
    setAnnounce('');
    firstStepRender.current = true;
    renderedAtRef.current = Date.now();
  };

  // ---- Success state (JS only; no-JS gets the server HTML page) ----
  if (status === 'success') {
    return (
      <div className={styles.panel}>
        <div className={styles.successCard} role="status">
          <IconChip icon={Check} tone="green" size="lg" />
          <Heading level={2} size="h3" className={styles.successTitle}>
            Vielen Dank!
          </Heading>
          <p className={styles.successText}>{SUCCESS_MESSAGE}</p>
          <div className={styles.successActions}>
            {bookingsUrl && (
              <Button href={bookingsUrl} variant="primary" size="lg" icon={CalendarCheck} iconPosition="left">
                Termin direkt buchen
              </Button>
            )}
            <Button variant="ghost" size="lg" onClick={resetForm}>
              Weitere Anfrage senden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';

  // ---- Shared field groups (rendered once flat, or one step at a time) ----
  const leistungChooser = (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Gewünschte Leistung *</legend>
      {errors.leistung && (
        <p className={styles.groupError} role="alert">
          {errors.leistung.message}
        </p>
      )}
      <div className={styles.leistungGrid}>
        {LEISTUNG_OPTIONS.map((opt) => {
          const Icon = iconFor(opt.value);
          return (
            <label key={opt.value} className={styles.leistungCard}>
              <input
                type="radio"
                value={opt.value}
                required
                className={styles.leistungInput}
                {...register('leistung')}
              />
              <span className={styles.leistungBody}>
                <IconChip icon={Icon} tone="blue" size="sm" />
                <span className={styles.leistungLabel}>{opt.label}</span>
                <Check className={styles.leistungTick} strokeWidth={3} aria-hidden="true" />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  const projektphaseField = (
    <Select
      label="Projektphase"
      hint="Optional — hilft uns bei der Einordnung."
      options={PHASE_OPTIONS}
      {...register('projektphase')}
    />
  );

  const contactFields = (
    <div className={styles.fieldStack}>
      <Input label="Name" required autoComplete="name" error={errFor('name')} {...register('name')} />
      <Input label="Firma" autoComplete="organization" error={errFor('company')} {...register('company')} />
      <Input
        label="E-Mail"
        type="email"
        required
        autoComplete="email"
        error={errFor('email')}
        {...register('email')}
      />
      <Input label="Telefon" type="tel" autoComplete="tel" error={errFor('phone')} {...register('phone')} />
      <Textarea
        label="Ihre Nachricht"
        required
        rows={6}
        maxLength={MESSAGE_MAX}
        error={errFor('message')}
        {...register('message')}
      />
      <Checkbox
        required
        error={errFor('consent')}
        label={
          <>
            Ich habe die{' '}
            <RouterLink to={datenschutzTo} className={styles.inlineLink}>
              Datenschutzerklärung
            </RouterLink>{' '}
            zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zur Bearbeitung der
            Anfrage zu.
          </>
        }
        {...register('consent')}
      />
    </div>
  );

  // Honeypot: off-screen, not display:none (some bots skip hidden fields),
  // aria-hidden + tabIndex -1 so humans/AT never reach it.
  const honeypot = (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Website (bitte frei lassen)
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </label>
    </div>
  );

  return (
    <div className={styles.panel}>
      {/* Live region for step changes + submit status (aria-live). */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {announce}
      </p>

      {enhanced && (
        <div className={styles.progress}>
          <p className={styles.progressLabel}>
            Schritt <strong>{step}</strong> von 2 —{' '}
            {step === 1 ? 'Worum geht es?' : 'Ihre Kontaktdaten'}
          </p>
          <ol className={styles.progressBar}>
            <li className={step >= 1 ? styles.progressDone : ''} />
            <li className={step >= 2 ? styles.progressDone : ''} />
          </ol>
        </div>
      )}

      <form
        className={styles.form}
        method="post"
        action="/api/contact"
        noValidate={enhanced}
        onSubmit={enhanced ? handleSubmit(onValid, onInvalid) : undefined}
      >
        {status === 'error' && (
          <div className={styles.errorBanner} role="alert">
            <p>{errorMessage}</p>
            <p>
              <Link href={mailtoHref}>{contact.emailDisplay}</Link>
            </p>
          </div>
        )}

        {!enhanced ? (
          // ---- Flat, no-JS form: every field in one column ----
          <>
            <div className={styles.stepBlock}>
              <Heading level={2} size="h4" className={styles.stepTitle}>
                Worum geht es?
              </Heading>
              {leistungChooser}
              {projektphaseField}
            </div>
            <div className={styles.stepBlock}>
              <Heading level={2} size="h4" className={styles.stepTitle}>
                Ihre Kontaktdaten
              </Heading>
              {contactFields}
            </div>
            {honeypot}
            <div className={styles.actions}>
              <Button type="submit" variant="primary" size="lg" icon={Send} iconPosition="left">
                Anfrage senden
              </Button>
            </div>
            <p className={styles.requiredNote}>* Pflichtfelder</p>
          </>
        ) : (
          // ---- Enhanced 2-step wizard ----
          <>
            {/* tabIndex -1 + ref: focus moves to the fresh step container on
                step change so the step heading is announced (motion.div
                forwards the ref; Heading is not a forwardRef component). */}
            <motion.div
              key={step}
              ref={stepHeadingRef}
              tabIndex={-1}
              className={styles.stepBlock}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 ? (
                <>
                  <Heading level={2} size="h4" className={styles.stepTitle}>
                    Worum geht es?
                  </Heading>
                  {leistungChooser}
                  {projektphaseField}
                </>
              ) : (
                <>
                  <Heading level={2} size="h4" className={styles.stepTitle}>
                    Ihre Kontaktdaten
                  </Heading>
                  {contactFields}
                </>
              )}
            </motion.div>

            {honeypot}

            <div className={styles.actions}>
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  icon={ArrowLeft}
                  iconPosition="left"
                  onClick={goToStep1}
                >
                  Zurück
                </Button>
              )}
              {step === 1 ? (
                <Button type="button" variant="primary" size="lg" icon={ArrowRight} onClick={goToStep2}>
                  Weiter
                </Button>
              ) : (
                <Button type="submit" variant="primary" size="lg" icon={Send} iconPosition="left" loading={submitting}>
                  {submitting ? 'Wird gesendet …' : 'Anfrage senden'}
                </Button>
              )}
            </div>
            <p className={styles.requiredNote}>* Pflichtfelder</p>
          </>
        )}
      </form>
    </div>
  );
}
