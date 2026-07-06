import { ArrowRight } from 'lucide-react';
import { Badge, Button, Container, Heading } from '../../primitives/index.js';
import SplitTextReveal from '../../motion/SplitTextReveal.jsx';
import { HERO_SIZES, heroSrcSet } from '../../../lib/heroImage.js';
import styles from '../HeroSlider.module.css';

/**
 * One hero slide (dev brief §5.1 anatomy — and nothing more, per plan §13.7:
 * eyebrow, claim-H1, one short line, one proof chip, two CTAs).
 *
 * - Semantics: slide 1 renders the page `<h1>` (it is the LCP element and is
 *   fully present in the prerendered HTML); slides 2–7 render `<h2>` so the
 *   document keeps exactly one h1. Visual size is identical (`display`).
 * - Inactive slides are `inert`: invisible to AT and unreachable by Tab, so
 *   the stacked DOM never traps keyboard users (contract §5 Tier 2 item 9).
 * - Headline reveal: the SplitTextReveal is keyed by activation generation.
 *   gen 0 is the initial render — static words, never re-hidden at hydration
 *   (LCP contract). Every later activation remounts it with `forceArm` so
 *   the word reveal replays; under reduced motion it stays static.
 * - Image mounting is controlled by the parent (`showImage`): at SSG time
 *   only slide 1's image is in the HTML (eager + fetchpriority="high");
 *   the rest mount lazily as they become active/next.
 */
export default function HeroSlide({ slide, index, count, active, gen, showImage, eager }) {
  return (
    <div
      className={active ? `${styles.slide} ${styles.slideActive}` : styles.slide}
      role="group"
      aria-roledescription="slide"
      aria-label={`Folie ${index + 1} von ${count}`}
      inert={!active}
    >
      <div className={styles.media}>
        {showImage && (
          <picture>
            {/* AVIF > WebP > JPG. `sizes` deliberately under-declares the slot on
                phones (≤767px → 60vw) so the srcSet picker lands on the 800w (or
                400w on tiny screens) variant instead of the 1600w one after DPR
                multiplication — the hero sits behind the veil+scrim, so a ~2×
                density source is indistinguishable while cutting the LCP image
                from ~171KB (1600w webp) to ~15–28KB (800w avif). Desktop still
                gets 1600w. Mirrors the preload in routes.jsx. */}
            <source type="image/avif" srcSet={heroSrcSet(slide.image, 'avif')} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={heroSrcSet(slide.image, 'webp')} sizes={HERO_SIZES} />
            {/* TODO: replace with real EA+ photo */}
            <img
              className={styles.image}
              src={`${slide.image}-1600.jpg`}
              srcSet={heroSrcSet(slide.image, 'jpg')}
              sizes={HERO_SIZES}
              alt={slide.alt}
              width="1600"
              height="900"
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : undefined}
              decoding={eager ? undefined : 'async'}
              data-placeholder="unsplash"
            />
          </picture>
        )}
        <div className={styles.veil} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <Container className={styles.slideContainer}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowCount}>
              Leistung {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <span className={styles.eyebrowName}>{slide.name}</span>
          </p>
          <Heading level={index === 0 ? 1 : 2} size="display" className={styles.claim}>
            {/* amount 0.1: a remounted (gen>0) reveal must fire even when the
                hero is only partially in view (manual nav mid-scroll) — the
                default 0.5 could leave a headline hidden. gen 0 is unarmed,
                so this never affects the prerendered slide. */}
            <SplitTextReveal key={gen} text={slide.claim} forceArm={gen > 0} amount={0.1} />
          </Heading>
          <p className={styles.line}>{slide.line}</p>
          <p className={styles.chipRow}>
            <Badge tone="green">{slide.chip}</Badge>
          </p>
          <div className={styles.actions}>
            <Button to={slide.to} variant="accent" icon={ArrowRight}>
              Mehr erfahren
            </Button>
            <Button to="/kontakt" variant="onDark">
              Termin vereinbaren
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
