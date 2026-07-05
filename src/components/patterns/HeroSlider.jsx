import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { heroSlides, AUTOPLAY_MS } from '../../content/heroSlides.js';
import HeroSlide from './heroSlider/HeroSlide.jsx';
import styles from './HeroSlider.module.css';

const COUNT = heroSlides.length;

/**
 * HeroSlider — the homepage showpiece (dev brief §5, plan §5 Tier 2 item 9).
 * 7 slides (one per Leistung), autoplay 6 s, eco-gradient progress bar,
 * numbered indicators, desktop side service-nav, swipe + arrows + keyboard.
 *
 * Autoplay pause/stop policy (conservative standard, documented per gate):
 * - TEMPORARY pause: mouse hover (pointerType-guarded — a tap must not
 *   stall autoplay), KEYBOARD focus inside the slider (`:focus-visible`
 *   only — pointer-click focus, e.g. on the Play button, must not
 *   immediately re-pause), or the hero scrolling out of view (plan §7.6:
 *   no off-screen loops) — autoplay resumes with the remaining time when
 *   the condition ends.
 * - PERMANENT stop (for the session): ANY manual slide change — arrow
 *   buttons, arrow keys, indicators, side-nav, swipe. The visible play
 *   button is the explicit way to re-enable autoplay afterwards.
 * - The pause/play button toggles the user's own pause. Under reduced
 *   motion autoplay is disabled entirely and the button is hidden (CSS);
 *   slides remain fully manually operable.
 *
 * A11y (dev brief §5.3): implicit region (section + label) with
 * `aria-roledescription="carousel"`, slides as `role="group"` +
 * `aria-roledescription="slide"` with „Folie X von 7", inactive slides
 * `inert` (with focus rescued to the root on slide change), live region
 * polite whenever autoplay is not running, off while it is.
 *
 * Hydration/LCP contract: slide 1 is fully present in the prerendered HTML
 * (H1 text, eager image with fetchpriority="high") and is never re-hidden —
 * entrance animation only ever applies to slides activated later
 * (SplitTextReveal `forceArm` via activation generations). The progress bar
 * is driven imperatively (ref + transform) so the 60 fps timer causes zero
 * React re-renders (plan §7.6 INP budget).
 */
export default function HeroSlider() {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const pointerStart = useRef(null);
  const elapsedRef = useRef(0);

  const [index, setIndex] = useState(0);
  // Per-slide activation generation; bumping remounts the headline reveal.
  const [gens, setGens] = useState(() => heroSlides.map(() => 0));
  // Which slides have their image mounted (SSG: only slide 1 → lean LCP).
  const [imagesMounted, setImagesMounted] = useState(() => new Set([0]));
  const [stopped, setStopped] = useState(false); // permanent (session) stop
  const [paused, setPaused] = useState(false); // pause button
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  const reduced = usePrefersReducedMotion();
  const inViewNow = useInView(rootRef, { amount: 0.3 });

  const playing = !reduced && !stopped && !paused && !hovered && !focusWithin && inViewNow;
  // The user's intent (ignoring the temporary pauses) — drives the button.
  const autoplayEnabled = !stopped && !paused;

  // Single slide-change path (used by goTo and the autoplay timer).
  const advance = (next) => {
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
    setGens((g) => g.map((gen, i) => (i === next ? gen + 1 : gen)));
    setIndex(next);
    // The outgoing slide turns `inert` on commit; focus inside it would be
    // expelled to <body> and arrow keys would die. Park focus on the
    // carousel root (tabIndex={-1}) instead — before inert applies.
    const focused = document.activeElement;
    if (
      rootRef.current &&
      focused &&
      rootRef.current.contains(focused) &&
      focused.closest('[aria-roledescription="slide"]')
    ) {
      rootRef.current.focus({ preventScroll: true });
    }
  };

  const goTo = (target, viaUser) => {
    const next = ((target % COUNT) + COUNT) % COUNT;
    if (viaUser) setStopped(true);
    if (next === index) return;
    advance(next);
  };

  // Mount the active image and preload both neighbours (Prev/jump nav would
  // otherwise show a bare scrim). Runs post-hydration only, so the static
  // HTML stays slide-1-only.
  useEffect(() => {
    setImagesMounted((prev) => {
      const wanted = [index, (index + 1) % COUNT, (index - 1 + COUNT) % COUNT].filter(
        (i) => !prev.has(i)
      );
      if (wanted.length === 0) return prev;
      const nextSet = new Set(prev);
      wanted.forEach((i) => nextSet.add(i));
      return nextSet;
    });
  }, [index]);

  // Autoplay timer: rAF accumulator (freezes while not playing, resumes with
  // the remaining time). Delta is clamped so a backgrounded tab doesn't jump.
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      elapsedRef.current += Math.min(now - last, 100);
      last = now;
      if (elapsedRef.current >= AUTOPLAY_MS) {
        advance((index + 1) % COUNT);
        return;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${elapsedRef.current / AUTOPLAY_MS})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1, true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1, true);
    }
  };

  // Swipe is touch/pen only (brief §5.2) — a mouse drag must keep its
  // native meaning (text selection), not flip slides.
  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    // Keep receiving the pointer when a finger/pen drifts off the viewport
    // mid-swipe (otherwise pointerup lands elsewhere and the swipe is lost).
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Inactive pointer (e.g. synthetic test events) — swipe still works.
    }
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      goTo(dx < 0 ? index + 1 : index - 1, true);
    }
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
  };

  return (
    <section
      ref={rootRef}
      /* Focus parking spot for the slide-change focus rescue (see advance);
         implicit region role via <section> + aria-label. */
      tabIndex={-1}
      className={styles.root}
      aria-roledescription="carousel"
      aria-label="Unsere Leistungen"
      onKeyDown={handleKeyDown}
      /* Hover-pause is a mouse affordance: an emulated mouseenter from a tap
         would stall autoplay indefinitely on touch devices. */
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setHovered(false);
      }}
      /* Focus-pause only for keyboard focus (:focus-visible): pointer clicks
         focus buttons too, and e.g. tapping Play would immediately re-pause. */
      onFocus={(event) => {
        if (event.target.matches(':focus-visible')) setFocusWithin(true);
      }}
      onBlur={handleBlur}
    >
      <div
        className={styles.viewport}
        aria-live={playing ? 'off' : 'polite'}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {heroSlides.map((slide, i) => (
          <HeroSlide
            key={slide.to}
            slide={slide}
            index={i}
            count={COUNT}
            active={i === index}
            gen={gens[i]}
            showImage={imagesMounted.has(i)}
            eager={i === 0}
          />
        ))}
      </div>

      {/* Desktop side service-nav (dev brief §5.2): at-a-glance services
          menu; clicking jumps to the slide (and stops autoplay). */}
      <nav className={styles.sideNav} aria-label="Leistungen – Foliennavigation">
        <ul className={styles.sideNavList}>
          {heroSlides.map((slide, i) => (
            <li key={slide.to}>
              <button
                type="button"
                className={i === index ? `${styles.sideNavItem} ${styles.sideNavItemActive}` : styles.sideNavItem}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i, true)}
              >
                {slide.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.controls}>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={styles.controlButton}
            aria-label="Vorherige Folie"
            onClick={() => goTo(index - 1, true)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.controlButton}
            aria-label="Nächste Folie"
            onClick={() => goTo(index + 1, true)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.playPause}`}
            aria-label={
              autoplayEnabled
                ? 'Automatische Wiedergabe pausieren'
                : 'Automatische Wiedergabe starten'
            }
            onClick={() => {
              if (autoplayEnabled) {
                setPaused(true);
              } else {
                setStopped(false);
                setPaused(false);
              }
            }}
          >
            {autoplayEnabled ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>

          <div className={styles.indicators} role="group" aria-label="Folie auswählen">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.to}
                type="button"
                className={i === index ? `${styles.indicator} ${styles.indicatorActive}` : styles.indicator}
                aria-label={`Folie ${i + 1} von ${COUNT}: ${slide.name}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i, true)}
              >
                <span className={styles.indicatorNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.indicatorDot} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={styles.progress} aria-hidden="true">
            <div ref={barRef} className={styles.progressFill} />
          </div>
        </div>
      </div>
    </section>
  );
}
