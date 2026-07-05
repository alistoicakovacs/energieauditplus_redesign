/** Shared helpers for anchor-rendering components (Button, Link). */

/** True for absolute http(s) URLs — i.e. links leaving the SPA. */
export function isExternalUrl(href) {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}

/** Rel attributes for external links per security baseline (§8.2). */
export function relForHref(href) {
  return isExternalUrl(href) ? { rel: 'noopener noreferrer' } : {};
}

/**
 * Trailing-slash-insensitive pathname. Static hosts serve /foo/ for /foo, so
 * every route-equality check (active nav, transition keys) must normalize —
 * otherwise SSR (rendered at /foo) and hydration (at /foo/) disagree.
 */
export function normalizePathname(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}
