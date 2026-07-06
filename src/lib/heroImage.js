/**
 * Hero image responsive contract — single source of truth shared by the
 * HeroSlider slide, the static service-detail hero, and the per-route LCP
 * preload (src/routes.jsx → scripts/prerender.mjs). Keeping the `sizes`,
 * `srcSet` and preload in one place guarantees the preloaded resource is
 * byte-identical to the one <picture> selects (no double-download, §9).
 *
 * Variants on disk (public/images/hero/<stem>-<w>.<ext>) for every hero photo:
 *   widths 400 / 800 / 1600, formats avif · webp · jpg
 * with the project invariant avif < webp < jpg at each width.
 *
 * `HERO_SIZES` deliberately under-declares the rendered slot on phones
 * (≤767px → 60vw). The hero is full-bleed (100vw) but sits behind the
 * veil + left scrim, so a ~2× density source is visually indistinguishable.
 * Under DPR the picker then lands on the 800w variant on phones (400w on very
 * small screens) instead of the 1600w one — cutting the mobile LCP image from
 * ~171KB (1600w webp) to ~15–28KB (800w avif). Desktop still gets 1600w.
 */
export const HERO_SIZES = '(max-width: 767px) 60vw, 100vw';

/** `<stem>-400.<ext> 400w, …800w, …1600w` for one format. */
export function heroSrcSet(stem, ext) {
  return `${stem}-400.${ext} 400w, ${stem}-800.${ext} 800w, ${stem}-1600.${ext} 1600w`;
}

/**
 * route.preloadImage descriptor for a hero stem — AVIF (the format <picture>
 * prefers). Browsers that don't support AVIF simply ignore the typed preload
 * and fetch the WebP/JPG the <picture> resolves for them.
 */
export function heroPreload(stem) {
  return { imageSrcSet: heroSrcSet(stem, 'avif'), imageSizes: HERO_SIZES, type: 'image/avif' };
}
