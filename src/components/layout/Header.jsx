import { useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Menu } from 'lucide-react';
import { Button, Container } from '../primitives/index.js';
import MegaMenu from '../patterns/MegaMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import Wordmark from './Wordmark.jsx';
import { mainNavLinks, contact } from '../../lib/navigation.js';
import { normalizePathname } from '../../lib/linkUtils.js';
import styles from './Header.module.css';

const underlineSpring = { type: 'spring', stiffness: 500, damping: 40 };

/** Sliding active-nav underline — shared layoutId animates between items. */
function ActiveUnderline() {
  return (
    <motion.span
      layoutId="nav-underline"
      className={styles.underline}
      transition={underlineSpring}
      aria-hidden="true"
    />
  );
}

/**
 * Global two-tier header: navy utility strip (phone / email / Standorte)
 * + sticky white main bar (wordmark, nav with mega-menu, CTA). The strip
 * collapses and a shadow appears once the page scrolls (Motion useScroll).
 */
export default function Header() {
  const pathname = normalizePathname(useLocation().pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));

  const leistungenActive = pathname.startsWith('/leistungen');

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      {/* ---- utility strip ---- */}
      <div className={styles.utility}>
        <Container width="wide" className={styles.utilityInner}>
          <div className={styles.utilityGroup}>
            <a className={styles.utilityLink} href={contact.phoneHref}>
              <Phone className={styles.utilityIcon} aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <a className={styles.utilityLink} href={contact.emailHref}>
              <Mail className={styles.utilityIcon} aria-hidden="true" />
              {contact.emailDisplay}
            </a>
          </div>
          <div className={`${styles.utilityGroup} ${styles.utilityMeta}`}>
            <span className={styles.utilityHint}>
              <Clock className={styles.utilityIcon} aria-hidden="true" />
              {contact.hours}
            </span>
            <RouterLink className={styles.utilityLink} to="/kontakt">
              <MapPin className={styles.utilityIcon} aria-hidden="true" />
              Strausberg · Berlin · Güstrow — alle Standorte
            </RouterLink>
          </div>
        </Container>
      </div>

      {/* ---- main bar ---- */}
      <div className={styles.bar}>
        <Container width="wide" className={styles.barInner}>
          <Wordmark tone="dark" />

          <nav className={styles.nav} aria-label="Hauptnavigation">
            <ul className={styles.navList}>
              <li>
                <MegaMenu
                  active={leistungenActive}
                  underline={leistungenActive ? <ActiveUnderline /> : null}
                />
              </li>
              {mainNavLinks.map(({ name, to }) => {
                const active = pathname === to;
                return (
                  <li key={to}>
                    <RouterLink
                      to={to}
                      className={styles.navLink}
                      data-active={active || undefined}
                      aria-current={active ? 'page' : undefined}
                    >
                      {name}
                      {active && <ActiveUnderline />}
                    </RouterLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button to="/kontakt" size="sm" className={styles.cta}>
              Termin vereinbaren
            </Button>
            {/* Icon-only hamburger — plain <button>: the Button primitive is
                the labelled pill CTA, not an icon toggle. */}
            <button
              ref={hamburgerRef}
              type="button"
              className={styles.hamburger}
              aria-label="Menü öffnen"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className={styles.hamburgerIcon} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={({ restoreFocus = true } = {}) => {
          setMobileOpen(false);
          if (restoreFocus) hamburgerRef.current?.focus();
        }}
      />
    </header>
  );
}
