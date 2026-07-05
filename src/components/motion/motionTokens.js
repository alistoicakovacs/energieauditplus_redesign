/**
 * JS mirrors of the motion tokens in `src/styles/tokens.css` (§8 style guide).
 * Motion (motion/react) takes numeric seconds + cubic-bezier arrays; anime.js
 * takes milliseconds. Keep these in sync with tokens.css — they are the ONLY
 * place motion timing values may appear in JS.
 */

/** --ease-out: cubic-bezier(.16, 1, .3, 1) — signature smooth ease */
export const EASE_OUT = [0.16, 1, 0.3, 1];

/** --ease-in-out: cubic-bezier(.65, 0, .35, 1) */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

/** --dur-fast: 150ms — hovers, taps */
export const DUR_FAST = 0.15;

/** --dur-base: 300ms — most transitions */
export const DUR_BASE = 0.3;

/** --dur-slow: 600ms — reveals, hero */
export const DUR_SLOW = 0.6;

/** --dur-xslow: 900ms — large hero/cinematic */
export const DUR_XSLOW = 0.9;

/** Grid/entrance stagger (plan §7.1: 60–80ms) */
export const STAGGER = 0.07;
