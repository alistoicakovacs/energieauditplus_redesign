import { useRef } from 'react';
import { Heading } from '../primitives/index.js';
import EcoLineDraw from '../motion/EcoLineDraw.jsx';
import styles from './Stepper.module.css';

/**
 * Stepper — Ablauf process steps (plan §5 Tier 2 item 10; style guide §5.7):
 * horizontal on desktop, vertical timeline on mobile, 3–6 steps. The
 * connecting line is an `EcoLineDraw` (signature blue→green gradient) that
 * draws in on scroll — under reduced motion it renders fully drawn
 * (final state), handled inside EcoLineDraw.
 *
 * Two orientation-specific lines are rendered and toggled purely via CSS
 * media queries (no JS resize listeners, no hydration mismatch). Numbering
 * is conveyed semantically by the `<ol>`; the visible number chips are
 * decorative duplicates (`aria-hidden`).
 *
 * @param {object} props
 * @param {{title: string, text?: string}[]} props.steps 3–7 process steps.
 * @param {1|2|3|4|5|6} [props.headingLevel=3] Level of the step titles.
 * @param {string} [props.className]
 */
export default function Stepper({ steps, headingLevel = 3, className = '', ...rest }) {
  const warnedRef = useRef(false);
  // Plan §5 originally said 3–6; extended to 7 in Phase 4a because the QNG
  // page's verbatim process is „In 7 Schritten zur Förderung"
  // (handoff/content/nachhaltigkeitsaudit-qng-flow.md — content mandate wins).
  if (import.meta.env.DEV && (steps.length < 3 || steps.length > 7) && !warnedRef.current) {
    warnedRef.current = true;
    // eslint-disable-next-line no-console
    console.warn(
      `[Stepper] ${steps.length} Schritte — der Kontrakt (Plan §5, erweitert Phase 4a) verlangt 3–7.`
    );
  }

  const classes = [styles.stepper, className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={{ '--step-count': steps.length }} {...rest}>
      {/* Horizontal line (desktop): first chip center → last chip center. */}
      <div className={styles.lineDesktop} aria-hidden="true">
        <EcoLineDraw
          d="M2 3 L598 3"
          viewBox="0 0 600 6"
          strokeWidth={3}
          preserveAspectRatio="none"
          className={styles.lineSvg}
        />
      </div>
      {/* Vertical line (mobile timeline). */}
      <div className={styles.lineMobile} aria-hidden="true">
        <EcoLineDraw
          d="M3 2 L3 598"
          viewBox="0 0 6 600"
          strokeWidth={3}
          preserveAspectRatio="none"
          className={styles.lineSvg}
        />
      </div>
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.chip} aria-hidden="true">
              {i + 1}
            </span>
            <div className={styles.content}>
              <Heading level={headingLevel} size="h4" className={styles.title}>
                {step.title}
              </Heading>
              {step.text && <p className={styles.text}>{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
