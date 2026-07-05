import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Heading, IconChip } from '../primitives/index.js';
import Card from './Card.jsx';
import styles from './ServiceCard.module.css';

const arrowSpring = { type: 'spring', stiffness: 400, damping: 24 };

/** Contract: ONE-liner. Beyond this the card stops scanning as a tile. */
const MAX_DESCRIPTION_CHARS = 120;

/** Hooks into the Card's propagated `hover`/`press` variant labels. */
const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
  press: { x: 4 },
};

/**
 * ServiceCard — icon chip + service name + one-liner + „Mehr erfahren"
 * (style guide §5.3). The whole card is the click target (single link);
 * on hover the card lifts (Card base) and the arrow slides right (Motion
 * variant propagation from the Card's whileHover).
 *
 * @param {object} props
 * @param {import('react').ComponentType} props.icon Lucide icon component.
 * @param {string} props.title Service name (semantic H3 by default).
 * @param {string} props.description One German sentence.
 * @param {string} props.to Route of the service page.
 * @param {'blue'|'green'|'gradient'} [props.tone='blue'] IconChip tone.
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * @param {string} [props.className]
 */
export default function ServiceCard({
  icon,
  title,
  description,
  to,
  tone = 'blue',
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const warnedRef = useRef(false);
  if (
    import.meta.env.DEV &&
    description &&
    description.length > MAX_DESCRIPTION_CHARS &&
    !warnedRef.current
  ) {
    warnedRef.current = true;
    // eslint-disable-next-line no-console
    console.warn(
      `[ServiceCard] Beschreibung von „${title}" hat ${description.length} Zeichen — der Kontrakt (Style Guide §5.3) verlangt einen Einzeiler (≤ ${MAX_DESCRIPTION_CHARS}).`
    );
  }

  const classes = [styles.service, className].filter(Boolean).join(' ');
  return (
    <Card to={to} className={classes} {...rest}>
      <IconChip icon={icon} tone={tone} size="md" />
      <Heading level={headingLevel} size="h4" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
      <span className={styles.more}>
        Mehr erfahren
        <motion.span
          className={styles.arrow}
          variants={arrowVariants}
          transition={arrowSpring}
          aria-hidden="true"
        >
          <ArrowRight className={styles.arrowIcon} strokeWidth={2} />
        </motion.span>
      </span>
    </Card>
  );
}
