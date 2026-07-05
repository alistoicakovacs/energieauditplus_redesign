import { Mail, MapPin, Phone } from 'lucide-react';
import { Heading, IconChip } from '../primitives/index.js';
import { telHref } from '../../lib/linkUtils.js';
import Card from './Card.jsx';
import styles from './StandortCard.module.css';

/**
 * StandortCard — location name + address lines + optional phone/mail
 * (style guide §5.3; mini-map thumbnail deferred until real map assets
 * exist). Contact rows are real tel:/mailto: links with 44px touch targets;
 * their visible text carries the meaning (no aria-label needed).
 *
 * @param {object} props
 * @param {string} props.name Location name („Strausberg — Zentrale").
 * @param {string[]} props.addressLines Street/ZIP lines.
 * @param {string} [props.phone]
 * @param {string} [props.email]
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * @param {string} [props.className]
 */
export default function StandortCard({
  name,
  addressLines = [],
  phone,
  email,
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const classes = [styles.standort, className].filter(Boolean).join(' ');
  return (
    <Card as="article" interactive className={classes} {...rest}>
      <div className={styles.head}>
        <IconChip icon={MapPin} tone="blue" size="sm" />
        <Heading level={headingLevel} size="h4" className={styles.name}>
          {name}
        </Heading>
      </div>
      {addressLines.length > 0 && (
        <address className={styles.address}>
          {addressLines.map((line) => (
            <span key={line} className={styles.addressLine}>
              {line}
            </span>
          ))}
        </address>
      )}
      {(phone || email) && (
        <ul className={styles.contacts}>
          {phone && (
            <li>
              <a href={`tel:${telHref(phone)}`} className={styles.contactLink}>
                <Phone className={styles.contactIcon} strokeWidth={1.85} aria-hidden="true" />
                <span>{phone}</span>
              </a>
            </li>
          )}
          {email && (
            <li>
              <a href={`mailto:${email}`} className={styles.contactLink}>
                <Mail className={styles.contactIcon} strokeWidth={1.85} aria-hidden="true" />
                <span>{email}</span>
              </a>
            </li>
          )}
        </ul>
      )}
    </Card>
  );
}
