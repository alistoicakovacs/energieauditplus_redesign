import { Link as RouterLink } from 'react-router';
import styles from './Wordmark.module.css';

/**
 * Typographic logo wordmark, links to the homepage.
 * TODO: replace with real logo (SVG asset).
 *
 * @param {object} props
 * @param {'light'|'dark'} [props.tone]  dark = on white (header), light = on navy (footer/menu)
 */
export default function Wordmark({ tone = 'dark', className = '', ...rest }) {
  const classes = [styles.wordmark, tone === 'light' ? styles.light : styles.dark, className]
    .filter(Boolean)
    .join(' ');
  return (
    <RouterLink to="/" className={classes} aria-label="EnergieAudit Plus — zur Startseite" {...rest}>
      {/* TODO: replace with real logo */}
      <span className={styles.name}>
        EnergieAudit<span className={styles.plus}>Plus</span>
      </span>
      <span className={styles.kicker} aria-hidden="true">
        Gebäudeenergieberatung
      </span>
    </RouterLink>
  );
}
