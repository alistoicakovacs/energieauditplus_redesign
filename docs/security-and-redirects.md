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
| `script-src` | `'self'` | All JS is bundled from the origin. **No `'unsafe-inline'`** — the only inline `<script>`s are `type="application/ld+json"` JSON-LD, which are *data blocks*, not executable script, and are therefore not subject to `script-src` (confirmed in the reality check: zero violations). Zero third-party scripts (DSGVO §8.3: no analytics/tag-manager). |
| `style-src` | `'self' 'unsafe-inline'` | CSS Modules compile to external stylesheets (covered by `'self'`), **but** `'unsafe-inline'` is **required**: the Motion animation library writes inline `style=` attributes for transform/opacity on every animated element, and the app also sets dynamic inline styles — `ParallaxMedia` (`aspectRatio`, `y`), `ScrollProgress` (`scaleX`), `KineticStatement` (`opacity`), `TrustStrip` (`--marquee-duration`), `Stepper` (`--step-count`). Dropping it breaks all scroll/hover motion. CSP `style-src` governs both `<style>` blocks and `style=` attributes; there is no nonce path for library-injected inline styles, so `'unsafe-inline'` stays, documented. |
| `img-src` | `'self' data:` | Local AVIF/WebP/PNG assets (`'self'`) plus `data:` URIs for tiny inline SVG/raster used by some UI. No hotlinked/remote images (DSGVO: Unsplash placeholders are downloaded at build time, never hotlinked). |
| `font-src` | `'self'` | Carlito/Caladea WOFF2 are self-hosted (`public/fonts/`). **Never** Google Fonts CDN (DSGVO — LG München ruling). |
| `connect-src` | `'self'` | The only `fetch` is the form's same-origin `POST /api/contact`. No analytics beacons, no third-party XHR/WebSocket. |

**Nothing loosened for third parties.** There are zero pre-consent third-party
requests (§8.3), so the CSP needs no CDN/analytics/font/host exceptions.

### CSP reality check

The built site was served locally with the **exact production CSP applied as a
real response header** and loaded in a headless browser. Pages checked:
homepage `/`, `/kontakt` (the form page), and a service detail page
(`/leistungen/qng-flow`). Result: **zero CSP violations** in the console; fonts,
images, styles, scroll/hover motion, and the contact form all function. The
JSON-LD `<script type="application/ld+json">` blocks did **not** trip
`script-src 'self'` (data blocks are exempt). See the Phase 6B report for the
captured console output.

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
