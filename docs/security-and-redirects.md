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
script-src 'self' 'sha256-7mu4H06fwDCjmnxxr/xNHyuQC6pLTHr4M2E4jXw5WZs=' 'sha256-QAlSewaQLi/NPCznjAZSyvQ72heD0VdxmNDDkZeCxgc=';
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
| `script-src` | `'self'` + 2 sha256 hashes | All bundled JS loads from the origin (`'self'`). **No `'unsafe-inline'`.** React 19's `react-dom/static` prerender emits a small, fixed set of **executable inline reveal-timing scripts** (`$RB`/`$RC`/`$RT`/`$RV`) on every page that contains a Suspense boundary — the app wraps its routes in one (`App.jsx`). These are *not* exempt from `script-src` (unlike `ld+json`, which is a non-executable data block and *is* exempt), so the two exact script bodies are allowlisted by **sha256 hash** rather than opening `'unsafe-inline'`. The hashes are stable across pages (2 distinct total across all 23 HTML files). A **build-time guard** (`scripts/prerender.mjs`, `extractInlineScriptHashes` + `loadCspScriptHashes`) re-hashes every emitted inline script and **fails the build** if any hash is missing from this allowlist — so a React version bump that changes a reveal script cannot silently ship a page the production CSP would refuse. The guard reads the hashes straight from `vercel.json`, so the CSP and the guard cannot drift. Zero third-party scripts (DSGVO §8.3). |
| `style-src` | `'self' 'unsafe-inline'` | CSS Modules compile to external stylesheets (covered by `'self'`), **but** `'unsafe-inline'` is **required**: the Motion animation library writes inline `style=` attributes for transform/opacity on every animated element, and the app also sets dynamic inline styles — `ParallaxMedia` (`aspectRatio`, `y`), `ScrollProgress` (`scaleX`), `KineticStatement` (`opacity`), `TrustStrip` (`--marquee-duration`), `Stepper` (`--step-count`). Dropping it breaks all scroll/hover motion. CSP `style-src` governs both `<style>` blocks and `style=` attributes; there is no nonce path for library-injected inline styles, so `'unsafe-inline'` stays, documented. |
| `img-src` | `'self' data:` | Local AVIF/WebP/PNG assets (`'self'`) plus `data:` URIs for tiny inline SVG/raster used by some UI. No hotlinked/remote images (DSGVO: Unsplash placeholders are downloaded at build time, never hotlinked). |
| `font-src` | `'self'` | Carlito/Caladea WOFF2 are self-hosted (`public/fonts/`). **Never** Google Fonts CDN (DSGVO — LG München ruling). |
| `connect-src` | `'self'` | The only `fetch` is the form's same-origin `POST /api/contact`. No analytics beacons, no third-party XHR/WebSocket. |

**Nothing loosened for third parties.** There are zero pre-consent third-party
requests (§8.3), so the CSP needs no CDN/analytics/font/host exceptions.

### CSP reality check

**First pass (defect found).** An initial `script-src 'self'` with no hashes
was **wrong**: `react-dom/static` emits 2 executable inline reveal scripts per
Suspense page, which the CSP refused (`Refused to execute inline script`),
throwing React #419 and leaving revealed content stuck in its hidden
`<template>`. (An early check missed this because the browser-extension console
bridge used at the time did not surface CSP-violation messages.)

**Verification method (repeatable).** `dist/` is served by a throwaway static
server (`scratchpad/csp-server.mjs`) that applies the **exact production
headers read from `vercel.json`**, then a **headless Chrome** run
(`scratchpad/csp-verify.mjs`, playwright-core driving installed Chrome) loads
`/`, `/kontakt`, and `/leistungen/qng-flow`. It captures `securitypolicyviolation`
events (via an init-script listener, isolated from the page CSP), console
errors, and page errors, and on `/kontakt` fires a real `POST /api/contact`
fetch to exercise `connect-src`/`form-action`.

**Result after the hash fix — zero CSP violations on all three pages:**

```
/                    cspViolations: 0  refusedConsole: 0  #419: 0  templates left: 0  h1: yes
/kontakt             cspViolations: 0  refusedConsole: 0  #419: 0  templates left: 0  h1: yes
                     fetch /api/contact: reached server (connect-src allowed)
/leistungen/qng-flow cspViolations: 0  refusedConsole: 0  #419: 0  templates left: 0  h1: yes
SUMMARY: CSP violations 0 · React #419 0 · PASS
```

Fonts, images, styles, and scroll/hover motion all function; no content is left
hidden in a `<template>`. The reveal scripts now execute (hash-allowlisted) and
the `ld+json` blocks were never at issue (data blocks, exempt). The one
remaining console entry is a pre-existing React **#418** hydration notice on the
homepage — not a CSP violation, unrelated to this work, and *not* caused by the
`ld+json` (the service page uses the identical `ld+json`-in-body pattern and is
#418-clean).

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
