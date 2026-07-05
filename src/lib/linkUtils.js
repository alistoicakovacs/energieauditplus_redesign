/** Shared helpers for anchor-rendering components (Button, Link). */

/** True for absolute http(s) URLs — i.e. links leaving the SPA. */
export function isExternalUrl(href) {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}

/** Rel attributes for external links per security baseline (§8.2). */
export function relForHref(href) {
  return isExternalUrl(href) ? { rel: 'noopener noreferrer' } : {};
}
