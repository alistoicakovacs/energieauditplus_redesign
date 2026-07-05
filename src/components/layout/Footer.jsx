import { Phone, Mail, MapPin } from 'lucide-react';
import { Container, Link } from '../primitives/index.js';
import Wordmark from './Wordmark.jsx';
import ContactLink from './ContactLink.jsx';
import {
  services,
  mainNavLinks,
  legalLinks,
  contact,
  locationNames,
} from '../../lib/navigation.js';
import styles from './Footer.module.css';

/**
 * Global footer on dark navy: eco-gradient hairline, brand column + link
 * columns, the oversized clipped wordmark row (signature move, plan §13.5)
 * and the legal bar.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* eco-gradient hairline — signature top edge */}
      <div className={styles.hairline} aria-hidden="true" />

      <Container width="wide">
        <div className={styles.grid}>
          {/* ---- brand ---- */}
          <div className={styles.brand}>
            <Wordmark tone="light" />
            {/* Claim verbatim from handoff/content/kontakt.md (Footer) */}
            <p className={styles.claim}>
              Umfassende Beratungs- und Planungsservices für energieoptimierte Gebäude. Von der
              Bestandsaufnahme bis zur Baubegleitung stehen wir Ihnen zur Seite.
            </p>
          </div>

          {/* ---- Leistungen ---- */}
          <nav className={styles.col} aria-label="Leistungen">
            <h2 className={styles.colTitle}>Leistungen</h2>
            <ul className={styles.linkList}>
              {services.map(({ name, to }) => (
                <li key={to}>
                  <Link to={to} variant="onDark" className={styles.footerLink}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Unternehmen + Rechtliches ---- */}
          <nav className={styles.col} aria-label="Unternehmen">
            <h2 className={styles.colTitle}>Unternehmen</h2>
            <ul className={styles.linkList}>
              {mainNavLinks.map(({ name, to }) => (
                <li key={to}>
                  <Link to={to} variant="onDark" className={styles.footerLink}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className={styles.colTitle}>Rechtliches</h2>
            <ul className={styles.linkList}>
              {legalLinks.map(({ name, to }) => (
                <li key={to}>
                  <Link to={to} variant="onDark" className={styles.footerLink}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Kontakt / Standorte (handoff/content/kontakt.md) ---- */}
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Kontakt</h2>
            <address className={styles.address}>
              {contact.company}
              <br />
              {contact.address.street}
              <br />
              {contact.address.city}
            </address>
            <ul className={styles.contactList}>
              <li>
                <ContactLink
                  href={contact.phoneHref}
                  icon={Phone}
                  className={styles.contactLink}
                  iconClassName={styles.contactIcon}
                >
                  {contact.phoneDisplay}
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={contact.emailHref}
                  icon={Mail}
                  className={styles.contactLink}
                  iconClassName={styles.contactIcon}
                >
                  {contact.emailDisplay}
                </ContactLink>
              </li>
            </ul>
            <h2 className={styles.colTitle}>Standorte</h2>
            <p className={styles.locations}>{locationNames.join(' · ')}</p>
            <Link to="/kontakt" variant="onDark" className={styles.footerLink}>
              <MapPin className={styles.contactIcon} aria-hidden="true" />
              Alle Standorte ansehen
            </Link>
          </div>
        </div>
      </Container>

      {/* ---- signature move (plan §13.5): oversized clipped wordmark ---- */}
      <div className={styles.wordmarkRow} aria-hidden="true">
        <span className={styles.bigWordmark}>EnergieAudit Plus</span>
      </div>

      {/* ---- legal bar ---- */}
      <div className={styles.legalBar}>
        <Container width="wide" className={styles.legalInner}>
          <p className={styles.copyright}>
            © 2026 {contact.company}. Alle Rechte vorbehalten.
          </p>
          <ul className={styles.legalLinks}>
            {legalLinks.map(({ name, to }) => (
              <li key={to}>
                <Link to={to} variant="onDark" className={styles.footerLink}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
