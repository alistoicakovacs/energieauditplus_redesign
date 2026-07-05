import { useEffect, useId, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '../primitives/index.js';
import Wordmark from './Wordmark.jsx';
import ContactLink from './ContactLink.jsx';
import { services, mainNavLinks, contact } from '../../lib/navigation.js';
import { normalizePathname } from '../../lib/linkUtils.js';
import styles from './MobileMenu.module.css';

const overlayMotion = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

const accordionMotion = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
};

// Everything keyboard-focusable inside the dialog, for the focus trap. The
// menu currently only contains links and buttons, but form controls and
// explicit tabindexes are covered so future menu content stays trapped.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Full-screen mobile menu (slide-in dialog): accordion for Leistungen,
 * top-level links, contact shortcuts, CTA pinned to the bottom.
 * Focus is trapped while open; the close button, Esc and route changes
 * close it (full-screen — there is no backdrop to click).
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {(opts?: {restoreFocus?: boolean}) => void} props.onClose
 *   restoreFocus=true (dismiss: Esc/close button) puts focus back on the
 *   hamburger; route-change closes pass false so the page transition can
 *   move focus to the new page's <h1> instead.
 */
export default function MobileMenu({ open, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const accordionId = useId();
  const { pathname } = useLocation();

  // Close on route change (link click navigates).
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (open) onClose({ restoreFocus: false });
    }
  }, [pathname, open, onClose]);

  // Body scroll lock + initial focus while open.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Reset the accordion whenever the menu closes.
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    // Focus trap: cycle within the dialog.
    const focusables = Array.from(
      dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          ref={dialogRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Hauptmenü"
          onKeyDown={onKeyDown}
          {...overlayMotion}
        >
          <div className={styles.top}>
            <Wordmark tone="light" />
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              aria-label="Menü schließen"
              onClick={() => onClose()}
            >
              <X className={styles.closeIcon} aria-hidden="true" />
            </button>
          </div>

          <nav className={styles.nav} aria-label="Hauptnavigation (mobil)">
            <ul className={styles.navList}>
              <li>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesOpen ? accordionId : undefined /* list only when mounted */}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Leistungen
                  <ChevronDown
                    className={styles.chevron}
                    data-open={servicesOpen || undefined}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.ul
                      key="services"
                      id={accordionId}
                      className={styles.serviceList}
                      {...accordionMotion}
                    >
                      {services.map((service) => (
                        <li key={service.to}>
                          <RouterLink to={service.to} className={styles.serviceLink}>
                            {service.name}
                          </RouterLink>
                        </li>
                      ))}
                      <li>
                        <RouterLink to="/leistungen" className={styles.serviceLink}>
                          Alle Leistungen im Überblick
                        </RouterLink>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              {mainNavLinks.map(({ name, to }) => (
                <li key={to}>
                  <RouterLink
                    to={to}
                    className={styles.navLink}
                    aria-current={normalizePathname(pathname) === to ? 'page' : undefined}
                  >
                    {name}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <ContactLink
              href={contact.phoneHref}
              icon={Phone}
              className={styles.contactLink}
              iconClassName={styles.contactIcon}
            >
              {contact.phoneDisplay}
            </ContactLink>
            <ContactLink
              href={contact.emailHref}
              icon={Mail}
              className={styles.contactLink}
              iconClassName={styles.contactIcon}
            >
              {contact.emailDisplay}
            </ContactLink>
          </div>

          <div className={styles.ctaBar}>
            <Button to="/kontakt" size="lg" className={styles.ctaButton}>
              Termin vereinbaren
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
