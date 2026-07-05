import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import { relForHref } from '../../lib/linkUtils.js';
import styles from './Card.module.css';

const MotionRouterLink = motion.create(RouterLink);

/** Shared hover-lift spring (plan §5 Tier 2 item 8: Motion spring). */
const cardSpring = { type: 'spring', stiffness: 320, damping: 26 };

/**
 * Variant labels propagated to motion children (e.g. the ServiceCard arrow
 * hooks into `hover` to slide). Lift is −4px per the card contract.
 */
export const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
  press: { y: -1 },
};

/**
 * Card — the one base for the whole card family (plan §5 Tier 2 item 8).
 *
 * White surface, `--radius-lg`, hairline border, `--shadow-sm`; interactive
 * cards lift −4px on hover (Motion spring) while CSS raises the shadow to
 * `--shadow-md` and tints the border. Where the card has a single link it
 * becomes the whole-card click target (`to`/`href` renders the card itself
 * as the anchor). Cards with multiple inner links (TeamCard, StandortCard)
 * stay non-link containers and may still opt into the lift via `interactive`.
 *
 * Hydration/flash safety: the card always mounts in its resting state
 * (`initial="rest"` = final state) — no entrance animation lives here, so
 * nothing can flash at hydration. Entrances are composed externally via
 * Reveal/StaggerGroup.
 *
 * Reduced motion: the lift is a transform, dropped automatically by the
 * app-level `<MotionConfig reducedMotion="user">`; the CSS shadow/border
 * hover feedback remains (non-motion state change).
 *
 * @param {object} props
 * @param {keyof JSX.IntrinsicElements} [props.as='article'] Tag when not a link.
 * @param {string} [props.to]   Router target — renders the card as the link.
 * @param {string} [props.href] Anchor target — renders the card as `<a>`.
 * @param {'light'|'dark'} [props.tone='light'] Dark = premium gradient tile.
 * @param {boolean} [props.interactive] Force/suppress the hover lift
 *   (defaults to true when the card is a link).
 * @param {string} [props.className]
 */
export default function Card({
  as = 'article',
  to,
  href,
  tone = 'light',
  interactive,
  className = '',
  children,
  ...rest
}) {
  const isLink = Boolean(to || href);
  const lift = interactive ?? isLink;

  const classes = [
    styles.card,
    tone === 'dark' ? styles.dark : '',
    lift ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const motionProps = lift
    ? {
        initial: 'rest',
        whileHover: 'hover',
        whileTap: 'press',
        variants: cardVariants,
        transition: cardSpring,
      }
    : {};

  if (to) {
    return (
      <MotionRouterLink to={to} className={classes} {...motionProps} {...rest}>
        {children}
      </MotionRouterLink>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...relForHref(href)} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag className={classes} {...motionProps} {...rest}>
      {children}
    </MotionTag>
  );
}
