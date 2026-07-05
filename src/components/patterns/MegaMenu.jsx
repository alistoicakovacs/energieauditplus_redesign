import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { IconChip, Link } from '../primitives/index.js';
import { services } from '../../lib/navigation.js';
import styles from './MegaMenu.module.css';

const panelMotion = {
  initial: { opacity: 0, scale: 0.96, y: -8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: -6 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
};

/**
 * „Leistungen" mega-menu (desktop): disclosure button + 2-column tile panel.
 * Opens on hover and click; closes on Esc, outside click, focus-out and
 * route change. Arrow keys move through the tiles (Tab order stays native).
 *
 * @param {object} props
 * @param {boolean} [props.active]  current route is under /leistungen
 * @param {import('react').ReactNode} [props.underline]  active-nav underline element
 */
export default function MegaMenu({ active = false, underline = null }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const hoverTimer = useRef(null);
  const panelId = useId();
  const { pathname } = useLocation();

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const close = useCallback((focusTrigger = false) => {
    clearHoverTimer();
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  // Close on route change (tile click navigates).
  useEffect(() => {
    clearHoverTimer();
    setOpen(false);
  }, [pathname]);

  // Close on click/tap outside.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, close]);

  const tiles = () =>
    Array.from(panelRef.current?.querySelectorAll('a[href]') ?? []);

  const focusTile = (index) => {
    const list = tiles();
    if (list.length === 0) return;
    const next = ((index % list.length) + list.length) % list.length;
    list[next].focus();
  };

  const onTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      // Panel mounts on next frame; focus the first tile once it exists.
      requestAnimationFrame(() => focusTile(0));
    }
  };

  const onPanelKeyDown = (event) => {
    const list = tiles();
    const current = list.indexOf(document.activeElement);
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        focusTile(current + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        focusTile(current - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTile(0);
        break;
      case 'End':
        event.preventDefault();
        focusTile(list.length - 1);
        break;
      default:
        break;
    }
  };

  const onWrapperKeyDown = (event) => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      close(true);
    }
  };

  // Keyboard users tabbing past the last tile: close so the menu never lingers.
  const onWrapperBlur = (event) => {
    if (!wrapperRef.current?.contains(event.relatedTarget)) close();
  };

  const onPointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return;
    clearHoverTimer();
    setOpen(true);
  };

  const onPointerLeave = (event) => {
    if (event.pointerType !== 'mouse') return;
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onKeyDown={onWrapperKeyDown}
      onBlur={onWrapperBlur}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* Disclosure trigger — plain <button>: the Button primitive is the pill
          CTA; nav triggers are their own visual pattern. */}
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        data-active={active || undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        onKeyDown={onTriggerKeyDown}
      >
        Leistungen
        <ChevronDown className={styles.chevron} data-open={open || undefined} aria-hidden="true" />
        {underline}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            ref={panelRef}
            className={styles.panel}
            onKeyDown={onPanelKeyDown}
            {...panelMotion}
          >
            <div className={styles.card}>
              <ul className={styles.grid}>
                {services.map((service, index) => (
                  <li
                    key={service.to}
                    className={service.featured ? styles.featuredItem : undefined}
                  >
                    <RouterLink
                      to={service.to}
                      className={service.featured ? styles.featuredTile : styles.tile}
                    >
                      <IconChip
                        icon={service.icon}
                        tone={service.featured ? 'gradient' : index % 2 === 0 ? 'blue' : 'green'}
                        size="sm"
                      />
                      <span className={styles.tileText}>
                        <span className={styles.tileName}>{service.name}</span>
                        {/* NEW COPY: review — tile descriptors */}
                        <span className={styles.tileDesc}>{service.descriptor}</span>
                      </span>
                      {service.featured && (
                        <ArrowRight className={styles.featuredArrow} aria-hidden="true" />
                      )}
                    </RouterLink>
                  </li>
                ))}
              </ul>
              <div className={styles.panelFooter}>
                <Link to="/leistungen" className={styles.allLink}>
                  Alle Leistungen im Überblick
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
