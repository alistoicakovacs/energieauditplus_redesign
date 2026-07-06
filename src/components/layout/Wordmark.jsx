import { Link as RouterLink } from 'react-router';
import styles from './Wordmark.module.css';

/** Real brand logo (blue text + green accent, "…mit QNG-flow").
    Web-safe copy of the client asset "EnergieAudit_…_Logo Blau.svg". */
const LOGO_SRC = '/logos/logo-eaplus.svg';

/**
 * Brand logo wordmark, links to the homepage.
 *
 * @param {object} props
 * @param {'light'|'dark'} [props.tone]  dark = on white (header, the logo
 *   shows in its native blue/green); light = on navy (footer/menu, the
 *   single-color logo is whitened via CSS filter for AA contrast).
 */
export default function Wordmark({ tone = 'dark', className = '', ...rest }) {
  const classes = [styles.wordmark, tone === 'light' ? styles.light : styles.dark, className]
    .filter(Boolean)
    .join(' ');
  return (
    <RouterLink to="/" className={classes} {...rest}>
      <img
        src={LOGO_SRC}
        className={styles.logo}
        alt="EnergieAudit Plus"
        width="794"
        height="242"
        decoding="async"
      />
      {/* Accessible name starts with the visible label (SC 2.5.3); the
          destination hint is appended visually-hidden, not via aria-label. */}
      <span className="visually-hidden"> — zur Startseite</span>
    </RouterLink>
  );
}
