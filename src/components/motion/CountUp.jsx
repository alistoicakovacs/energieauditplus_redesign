import { useEffect, useMemo, useRef } from 'react';
import { animate, useInView } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_XSLOW } from './motionTokens.js';
import useBelowFold from './useBelowFold.js';
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
 * Hydration/flash safety: the markup always carries the final value (SSG
 * included) and the DOM structure never changes. The count-from-0 is only
 * armed when the element mounted fully below the fold with motion allowed —
 * a stat already on screen (e.g. when prerendered HTML hydrates) is never
 * reset to 0.
 *
 * @param {object} props
 * @param {number} props.value Target number (e.g. 150000).
 * @param {number} [props.decimals=0] Fraction digits, de-DE formatted.
 * @param {string} [props.prefix=''] Text before the number (e.g. „bis zu ").
 * @param {string} [props.suffix=''] Text after the number (e.g. „ €").
 * @param {number} [props.duration=0.9] Seconds for the count.
 * @param {number} [props.delay=0] Seconds before the count starts once in view.
 * @param {number} [props.amount=0.6] Portion of the element that must be visible to trigger.
 * @param {string} [props.className]
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = DUR_XSLOW,
  delay = 0,
  amount = 0.6,
  className,
  ...rest
}) {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const belowFold = useBelowFold(rootRef);
  const inView = useInView(rootRef, { once: true, amount });

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
    // Never reset a stat that's already on screen — only elements that
    // mounted below the fold (and with motion allowed) count up.
    if (reduced || !belowFold) {
      node.textContent = finalText;
      return undefined;
    }
    if (!inView) {
      // Armed but not triggered yet: start from 0 while off-screen.
      node.textContent = formatter.format(0);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = formatter.format(latest);
      },
    });
    return () => controls.stop();
  }, [reduced, belowFold, inView, value, duration, delay, formatter, finalText]);

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
