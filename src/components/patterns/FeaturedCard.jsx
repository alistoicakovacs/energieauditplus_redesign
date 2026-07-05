import { ArrowRight } from 'lucide-react';
import { Button, Heading, IconChip, Overline } from '../primitives/index.js';
import CountUp from '../motion/CountUp.jsx';
import Card from './Card.jsx';
import styles from './FeaturedCard.module.css';

/**
 * FeaturedCard — dark/gradient premium tile (plan §5 Tier 2 item 8; built
 * for the QNG-flow promotion in the homepage bento grid §6.1.4). Eco-gradient
 * hairline along the top edge (brand fingerprint), optional stat line
 * (CountUp, de-DE) and CTA Button. Grid spanning is done by the caller via
 * `className` (e.g. `grid-column: span 2`).
 *
 * The tile contains a Button, so the card itself is NOT a link (no nested
 * interactive elements) — it still lifts on hover like its siblings.
 *
 * @param {object} props
 * @param {string} [props.overline='Empfohlen'] Green eyebrow (on-dark step).
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {{value:number, prefix?:string, suffix?:string, decimals?:number, label:string}} [props.stat]
 *   Stat line, animated via CountUp (de-DE formatting).
 * @param {{label:string, to:string}} [props.cta] On-dark Button.
 * @param {import('react').ComponentType} [props.icon] Lucide icon (gradient chip).
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * @param {string} [props.className] Extra classes (bento grid span).
 */
export default function FeaturedCard({
  overline = 'Empfohlen',
  title,
  description,
  stat,
  cta,
  icon,
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const classes = [styles.featured, className].filter(Boolean).join(' ');
  return (
    <Card as="article" tone="dark" interactive className={classes} {...rest}>
      {icon && <IconChip icon={icon} tone="gradient" size="md" className={styles.icon} />}
      <Overline color="green" className={styles.overline}>
        {overline}
      </Overline>
      <Heading level={headingLevel} size="h3" className={styles.title}>
        {title}
      </Heading>
      {description && <p className={styles.description}>{description}</p>}
      {stat && (
        <p className={styles.stat}>
          <span className={styles.statValue}>
            <CountUp
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </span>
          <span className={styles.statLabel}>{stat.label}</span>
        </p>
      )}
      {cta && (
        <Button
          variant="onDark"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          to={cta.to}
          className={styles.cta}
        >
          {cta.label}
        </Button>
      )}
    </Card>
  );
}
