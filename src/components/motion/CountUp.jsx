import { useEffect, useMemo, useRef } from 'react';
import { animate, useInView } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_XSLOW } from './motionTokens.js';
import styles from './CountUp.module.css';

/**
 * CountUp — animates a number from 0 to `value` when scrolled into view
 * (once), with German number formatting (`Intl.NumberFormat('de-DE')`).
 *
 * Layout-shift free: a hidden sizer containing the final string reserves the
 * full width (plus `font-variant-numeric: tabular-nums`), and the animated
 * text is stacked on top of it.
 *
 * A11y: screen readers always get the intact final string („bis zu 150.000 €")
 * via a visually-hidden span; the ticking text is `aria-hidden`.
 *
 * SSG/reduced motion: the final formatted value is rendered immediately —
 * that is also what the prerendered HTML contains.
 *
 * @param {object} props
 * @param {number} props.value Target number (e.g. 150000).
 * @param {number} [props.decimals=0] Fraction digits, de-DE formatted.
 * @param {string} [props.prefix=''] Text before the number (e.g. „bis zu ").
 * @param {string} [props.suffix=''] Text after the number (e.g. „ €").
 * @param {number} [props.duration=0.9] Seconds for the count.
 * @param {string} [props.className]
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = DUR_XSLOW,
  className,
  ...rest
}) {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(rootRef, { once: true, amount: 0.6 });

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  );
  const finalText = formatter.format(value);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return undefined;
    if (reduced) {
      node.textContent = finalText;
      return undefined;
    }
    if (!inView) {
      // Not triggered yet: start from 0 (markup/SSG carries the final value).
      node.textContent = formatter.format(0);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = formatter.format(latest);
      },
    });
    return () => controls.stop();
  }, [reduced, inView, value, duration, formatter, finalText]);

  const fullText = `${prefix}${finalText}${suffix}`;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <span ref={rootRef} className={classes} {...rest}>
      {/* Reserves the final width — no layout shift while counting. */}
      <span className={styles.sizer} aria-hidden="true">
        {fullText}
      </span>
      {/* Screen readers read the intact final sentence fragment. */}
      <span className="visually-hidden">{fullText}</span>
      <span className={styles.live} aria-hidden="true">
        {prefix}
        <span ref={numberRef}>{finalText}</span>
        {suffix}
      </span>
    </span>
  );
}
