import { ArrowRight } from 'lucide-react';
import { Heading, IconChip } from '../primitives/index.js';
import { Link as RouterLink } from 'react-router';
import Card from './Card.jsx';
import styles from './IconCard.module.css';

/**
 * IconCard — Card-family variant for icon + title + one short text, with an
 * optional list of related links (plan §6.1.3 USP cards, §6.1.5 Zielgruppen
 * audience cards). Without `links` it is a static informational tile;
 * with `links` it stays a non-link container (multiple inner links, like
 * StandortCard) whose rows are full-width 44px touch targets.
 *
 * @param {object} props
 * @param {import('react').ComponentType} props.icon Lucide icon component.
 * @param {string} props.title
 * @param {string} [props.description] One or two German sentences.
 * @param {{label: string, to: string}[]} [props.links] Related page links.
 * @param {'blue'|'green'|'gradient'} [props.tone='blue'] IconChip tone.
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * @param {string} [props.className]
 */
export default function IconCard({
  icon,
  title,
  description,
  links = [],
  tone = 'blue',
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const classes = [styles.iconCard, className].filter(Boolean).join(' ');
  return (
    <Card as="article" interactive={links.length > 0} className={classes} {...rest}>
      <IconChip icon={icon} tone={tone} size="md" />
      <Heading level={headingLevel} size="h4" className={styles.title}>
        {title}
      </Heading>
      {description && <p className={styles.description}>{description}</p>}
      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map(({ label, to }) => (
            <li key={to}>
              <RouterLink to={to} className={styles.link}>
                <span>{label}</span>
                <ArrowRight className={styles.linkIcon} strokeWidth={2} aria-hidden="true" />
              </RouterLink>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
