# Security headers, CSP & 301 redirects (Phase 6B)

Host-config-level SEO/security infra for the EnergieAudit Plus site. Everything
here is **static host configuration**, not runtime JavaScript.

Source of truth: `handoff/04-agent-build-plan.md` §8.2 (transport & headers),
§8.3 (DSGVO), §9 (SEO / 301 map).

## Files

| File | Host | Purpose |
|---|---|---|
| `vercel.json` | Vercel | `redirects` (301), `headers`, `trailingSlash: false`, `cleanUrls: true` |
| `public/_headers` | Netlify | Security headers (`/*`) — copied verbatim into `dist/` by Vite |
| `public/_redirects` | Netlify | 301 redirect map — copied verbatim into `dist/` by Vite |
| `public/robots.txt` | any | Allows all, disallows `/dev/`, references the sitemap |
| `dist/sitemap.xml` | any | Generated at build time by `scripts/prerender.mjs` |

The two host formats are kept in lock-step by hand. Vercel reads `vercel.json`
and ignores `_headers`/`_redirects`; Netlify reads `_headers`/`_redirects` and
ignores `vercel.json`. Shipping both means the host is **not locked in** — deploy
to either without code changes. If you edit one, mirror the change in the other.

`api/contact.js` is a Vercel-style serverless function, so **Vercel is the
primary target**; the Netlify files are the portability fallback (on Netlify the
form endpoint would move to `netlify/functions/contact.js` with the same body).

---

## Security headers (§8.2)

Applied to every response (`source: "/(.*)"` on Vercel, `/*` on Netlify).

| Header | Value | Why |
|---|---|---|
| `Content-Security-Policy` | see below | Restricts every resource class to same-origin. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | 2-year HSTS incl. subdomains. `preload` intentionally omitted (opt-in to the browser preload list is a one-way commitment — enable only after the apex + all subdomains are confirmed HTTPS-only). |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME sniffing. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends only the origin cross-site; no path leakage. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Denies powerful APIs the site never uses. |
| `X-Frame-Options` | `DENY` | Legacy clickjacking defence for browsers predating `frame-ancestors`. |

### Content-Security-Policy — per-source justification

```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self'
```

| Directive | Value | Justification |
|---|---|---|
| `default-src` | `'self'` | Deny-by-default baseline for any class not named below. |
| `base-uri` | `'self'` | Prevents `<base>`-tag injection from re-pointing relative URLs. |
| `object-src` | `'none'` | No `<object>`/`<embed>`/plugins anywhere on the site. |
| `frame-ancestors` | `'none'` | Site is never framed (anti-clickjacking; modern `X-Frame-Options`). |
| `form-action` | `'self'` | The contact form POSTs same-origin `/api/contact` only. |
| `script-src` | `'self'` (no hashes) | All bundled JS loads from the origin (`'self'`). **No `'unsafe-inline'`, no hashes.** The SSR path renders each route's already-resolved component and prerenders with an effectively infinite `progressiveChunkSize` (`src/entry-server.jsx`), so nothing suspends and Fizz never flushes an out-of-order Suspense segment — meaning `react-dom/static` emits **zero** executable inline scripts (no `$RB`/`$RC`/`$RT`/`$RV` reveal scripts). The only inline blocks left are `type="application/ld+json"` data blocks, which are exempt from `script-src`. A **build-time guard** (`scripts/prerender.mjs`, `extractInlineScriptHashes` + `loadCspScriptHashes`) re-hashes every emitted executable inline script and **fails the build** if any is not in the (now empty) allowlist — so if a regression ever lets a Suspense boundary defer content again and reintroduces a reveal script, the build fails loudly rather than shipping a page the production CSP would refuse. Zero third-party scripts (DSGVO §8.3). |
| `style-src` | `'self' 'unsafe-inline'` | CSS Modules compile to external stylesheets (covered by `'self'`), **but** `'unsafe-inline'` is **required**: the Motion animation library writes inline `style=` attributes for transform/opacity on every animated element, and the app also sets dynamic inline styles — `ParallaxMedia` (`aspectRatio`, `y`), `ScrollProgress` (`scaleX`), `KineticStatement` (`opacity`), `TrustStrip` (`--marquee-duration`), `Stepper` (`--step-count`). Dropping it breaks all scroll/hover motion. CSP `style-src` governs both `<style>` blocks and `style=` attributes; there is no nonce path for library-injected inline styles, so `'unsafe-inline'` stays, documented. |
| `img-src` | `'self' data:` | Local AVIF/WebP/PNG assets (`'self'`) plus `data:` URIs for tiny inline SVG/raster used by some UI. No hotlinked/remote images (DSGVO: Unsplash placeholders are downloaded at build time, never hotlinked). |
| `font-src` | `'self'` | Carlito/Caladea WOFF2 are self-hosted (`public/fonts/`). **Never** Google Fonts CDN (DSGVO — LG München ruling). |
| `connect-src` | `'self'` | The only `fetch` is the form's same-origin `POST /api/contact`. No analytics beacons, no third-party XHR/WebSocket. |

**Nothing loosened for third parties.** There are zero pre-consent third-party
requests (§8.3), so the CSP needs no CDN/analytics/font/host exceptions.

### CSP reality check

**History (why hashes were once needed).** An earlier build wrapped its lazy
routes in a `<Suspense>` boundary and prerendered them without resolving the
route first, so `react-dom/static` deferred the page content out of `<main>`
into a trailing `<div hidden>` and emitted 2 executable inline **reveal
scripts** (`$RC`/`$RT`) per page. Those required either `'unsafe-inline'` or an
sha256 allowlist. That whole mechanism has since been removed at the source (see
`src/entry-server.jsx`): the SSR path renders each route's **already-resolved**
component and prerenders with an effectively infinite `progressiveChunkSize`, so
nothing suspends, content renders **inline** in `<main>`, and **zero** inline
reveal scripts are emitted. `script-src` is therefore back to a plain `'self'`
(no hashes), and the build guard now fails if *any* executable inline script
reappears.

**Verification method (repeatable).** `dist/` is served by a throwaway static
server that applies the **exact production headers read from `vercel.json`**
(clean URLs, no SPA fallback, no inline injection), then a **headless Chrome**
run (playwright-core driving installed Chrome) loads `/`, `/kontakt`, and
`/leistungen/neubau-energieberatung`. It captures `securitypolicyviolation`
events (via an init-script listener, isolated from the page CSP), console
errors, and page errors.

**Result with `script-src 'self'` (no hashes) — zero CSP violations, zero
inline scripts, clean hydration on all three pages:**

```
/                                     cspViolations: 0  consoleErrors: 0  #418/#419: 0  templates left: 0  h1: yes
/kontakt                              cspViolations: 0  consoleErrors: 0  #418/#419: 0  templates left: 0  h1: yes
/leistungen/neubau-energieberatung    cspViolations: 0  consoleErrors: 0  #418/#419: 0  templates left: 0  h1: yes
SUMMARY: CSP violations 0 · inline exec scripts 0 · React #418/#419 0 · PASS
```

Fonts, images, styles, and scroll/hover motion all function; `<main>` carries
the real content inline (no `<div hidden>`/`<template>` reveal). The `ld+json`
blocks were never at issue (data blocks, exempt from `script-src`). The React
**#418** hydration notice that the old build logged on the homepage is now
**gone** — the client resolves the initial route's chunk before `hydrateRoot`
(`src/main.jsx`), so its first render matches the server's inline markup.

**Deliberately NOT added:** `upgrade-insecure-requests` (would force https on
the local http test server, making the shipped CSP un-verifiable locally — and
all production subresources are already same-origin https) and `report-to`/
`report-uri` (no reporting endpoint is provisioned in v1). Both can be added
later once a reporting endpoint exists and against an https staging host.

---

## 301 redirect map (§9)

Old live URLs used a **flat** structure with trailing slashes; the new site
nests services under `/leistungen/*` and drops trailing slashes. `trailingSlash:
false` (Vercel) / Netlify's built-in slash-normalization means every old
`/foo/` first collapses to `/foo`, then the rules below map it to the new path.

| Old URL | New URL | Status | Note |
|---|---|---|---|
| `/neubau-energieberatung` | `/leistungen/neubau-energieberatung` | 301 | Confirmed example (§9). |
| `/energieberatung-fuer-bestandsgebaeude` | `/leistungen/bestandsgebaeude` | 301 | Derived from service name. |
| `/bestandsgebaeude` | `/leistungen/bestandsgebaeude` | 301 | Short-slug variant safety net. |
| `/foerdermittelservice` | `/leistungen/fordermittelservice` | 301 | Old `oe` → new `o` slug. |
| `/lebenszyklusanalyse-lca` | `/leistungen/lebenszyklusanalyse-lca` | 301 | |
| `/raumluftmessung-baubiologie` | `/leistungen/raumluftmessung-baubiologie` | 301 | |
| `/blower-door-test` | `/leistungen/blower-door-test` | 301 | |
| `/nachhaltigkeitsaudit-qng-flow` | `/leistungen/qng-flow` | 301 | Confirmed example (§9). |
| `/gebaeudeenergieberatung` | `/leistungen` | 301 | Old umbrella page → new overview. |
| `/ueber-uns` | `/` | 301 | Out of v1 scope → homepage. |
| `/referenzen` | `/` | 301 | Out of v1 scope → homepage. |
| `/datenschutzerklarung` | `/datenschutzerklaerung` | 301 | Live site used the misspelled slug (no `ae`); confirmed in `handoff/content/kontakt.md`. |

Pages whose slug is unchanged (`/kontakt`, `/karriere`, `/ansprechpartner`,
`/impressum`, `/leistungen`) need no explicit rule — the trailing-slash
normalization redirects the old `/kontakt/` → new `/kontakt` on its own.

**Uncertainty note:** the exact old service slugs could not be verified against a
live crawl (only the two examples in §9 are confirmed). The derived slugs follow
the confirmed naming convention; where a service had a plausible short *and* long
old slug (Bestandsgebäude), both are mapped. If a post-launch crawl surfaces an
old slug not covered here, add it to both `vercel.json` and `public/_redirects`.
