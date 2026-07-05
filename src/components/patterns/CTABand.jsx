import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, Container, Heading, Section } from '../primitives/index.js';
import styles from './CTABand.module.css';

/**
 * CTABand — the conversion band reused at the bottom of every page
 * (plan §5 Tier 2 item 10; §13.1 claim-voice: title ≤ 8 words, verb-led).
 * One line of support copy, primary „Termin vereinbaren" Button, optional
 * secondary. Subtle premium background: `blue-tint` Section with a soft
 * decorative glow, or the dark variant on `--grad-dark`.
 *
 * @param {object} props
 * @param {string} props.title Claim-style heading (≤ 8 words — DEV-warned).
 * @param {string} [props.support] One supporting line.
 * @param {{label: string, to: string}} [props.primary] Defaults to
 *   „Termin vereinbaren" → /kontakt.
 * @param {{label: string, to: string}} [props.secondary]
 * @param {'blue-tint'|'dark'} [props.variant='blue-tint']
 * @param {1|2|3|4|5|6} [props.headingLevel=2]
 * @param {string} [props.className]
 */
export default function CTABand({
  title,
  support,
  primary = { label: 'Termin vereinbaren', to: '/kontakt' },
  secondary,
  variant = 'blue-tint',
  headingLevel = 2,
  className = '',
  ...rest
}) {
  const warnedRef = useRef(false);
  if (
    import.meta.env.DEV &&
    title &&
    title.trim().split(/\s+/).length > 8 &&
    !warnedRef.current
  ) {
    warnedRef.current = true;
    // eslint-disable-next-line no-console
    console.warn(
      `[CTABand] Titel „${title}" hat mehr als 8 Wörter — Plan §13.1 verlangt Claim-Stil (≤ 8, verbgeführt).`
    );
  }

  const dark = variant === 'dark';
  const classes = [styles.band, dark ? styles.dark : styles.blueTint, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Section background={dark ? 'dark' : 'blue-tint'} className={classes} {...rest}>
      <Container className={styles.inner}>
        <Heading level={headingLevel} size="h2" className={styles.title}>
          {title}
        </Heading>
        {support && <p className={styles.support}>{support}</p>}
        <div className={styles.actions}>
          <Button
            variant={dark ? 'onDark' : 'primary'}
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            to={primary.to}
          >
            {primary.label}
          </Button>
          {secondary && (
            <Button variant={dark ? 'accent' : 'outline'} size="lg" to={secondary.to}>
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
