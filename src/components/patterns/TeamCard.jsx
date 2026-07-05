import { Mail, MapPin, Phone } from 'lucide-react';
import { Heading, Overline } from '../primitives/index.js';
import Card from './Card.jsx';
import styles from './TeamCard.module.css';

/** "Frederik Lippe" → "FL" (monogram placeholder until real photos land). */
function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** "03341 4272935" / "+49 1742 434739" → tel:-safe href value. */
function telHref(phone) {
  return phone.replace(/[^+\d]/g, '');
}

/**
 * TeamCard — Figma revamp "Direction B on white" (revamp spec §3, prototype
 * `team-card-B-white.html` translated into the token/primitive system):
 * eco-gradient top edge, diagonal-cut photo (CSS clip-path), glass location
 * pill, centered name → 42×3 green rule → role overline (green-700) →
 * credentials, then circular mail/phone icon buttons (real mailto:/tel:
 * links, 44px, German aria-labels).
 *
 * Photo is placeholder-friendly: without `photoSrc` a monogram renders on
 * the brand-gradient. Multiple inner links → the card itself is not a link
 * (it still lifts on hover).
 *
 * @param {object} props
 * @param {string} props.name Full name.
 * @param {string} props.role Role line (green overline, e.g. „Geschäftsführer").
 * @param {string} [props.credentials] Credentials line („Zimmerermeister · M. Sc.").
 * @param {string} [props.location] Standort for the glass pill („Strausberg").
 * @param {string} [props.email] Renders the mail icon button (mailto:).
 * @param {string} [props.phone] Renders the phone icon button (tel:).
 * @param {string} [props.photoSrc] Portrait URL; omit for monogram placeholder.
 * @param {string} [props.photoAlt] German alt text (defaults to „Porträt von {name}").
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * @param {string} [props.className]
 */
export default function TeamCard({
  name,
  role,
  credentials,
  location,
  email,
  phone,
  photoSrc,
  photoAlt,
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const classes = [styles.team, className].filter(Boolean).join(' ');
  return (
    <Card as="article" interactive className={classes} {...rest}>
      <div className={styles.photo}>
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={photoAlt ?? `Porträt von ${name}`}
            className={styles.photoImg}
            loading="lazy"
          />
        ) : (
          <span className={styles.monogram} aria-hidden="true">
            {initialsOf(name)}
          </span>
        )}
        {location && (
          <span className={styles.pin}>
            <MapPin className={styles.pinIcon} strokeWidth={1.85} aria-hidden="true" />
            {location}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Heading level={headingLevel} size="h4" className={styles.name}>
          {name}
        </Heading>
        <span className={styles.rule} aria-hidden="true" />
        <Overline color="green" className={styles.role}>
          {role}
        </Overline>
        {credentials && <p className={styles.credentials}>{credentials}</p>}
        {(email || phone) && (
          <div className={styles.actions}>
            {email && (
              <a
                href={`mailto:${email}`}
                className={styles.iconButton}
                aria-label={`E-Mail an ${name} schreiben`}
              >
                <Mail className={styles.actionIcon} strokeWidth={1.85} aria-hidden="true" />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${telHref(phone)}`}
                className={styles.iconButton}
                aria-label={`${name} anrufen`}
              >
                <Phone className={styles.actionIcon} strokeWidth={1.85} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
