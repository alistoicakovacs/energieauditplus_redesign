# 05 — Launch Readiness & Client Handoff

> **EnergieAudit Plus website** — build complete across all 7 phases (subagent-driven, each phase spec- + quality-reviewed; the contact form additionally security-reviewed). This document is the launch gate status, the deployment runbook, and the client punch-list.

## 1. Build gate status (§9 / §8 / §10)

| Gate | Target | Result |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 95 | **98–100** (`/` 99, `/kontakt` 100, service 98) |
| Lighthouse A11y / Best-Practices / SEO | ≥ 95 | **A11y ≥ 95** after contrast fixes · **BP 100** · **SEO 100** |
| LCP (mobile, throttled) | < 2.0s | `/kontakt` 1.3s ✓ · `/` 2.16s / service 2.32s (just over ideal, well under 2.5s; Perf still ≥95) |
| CLS | < 0.1 | **0.000** all pages |
| INP | < 200ms | 16–96ms (mega-menu / slide / form / accordion) |
| Initial entry JS | < 150KB gz | **132KB** ✓ (motion-in-entry ~35KB is an optional post-launch slim) |
| `npm audit` | clean | **0 vulnerabilities** |
| Console errors (correctly served) | zero | **zero** on all 14 routes |
| Third-party requests pre-consent | zero | **zero** (self-hosted fonts/images, no analytics, no Google Maps) |
| Secrets in `dist/` | none | **none** (RESEND key server-env only) |
| Crawlable HTML per route | required | **fixed** — `<main>` now ships fully-resolved inline content (was shell-only) |
| Contact form security (§8.1) | full gate | **passed** — server zod validation, honeypot, min-time, rate-limit, escaped mail, no DB, same-origin; 23/23 tests |
| WCAG 2.2 AA | pass | keyboard/focus/forms/slider/reduced-motion pass; contrast fixed to `--green-800` etc. |

**Known residuals (non-blocking):** `/` and service LCP ~2.1–2.3s (limited by hero-photo delivery over Slow-4G; already 27KB AVIF, preloaded). The React #418 seen in dev is an **environment-only** preview-server SPA-fallback artifact — production (Vercel `cleanUrls`) serves correct per-route HTML; no code defect.

## 2. Deployment runbook

**Host:** Vercel is primary (the contact endpoint `api/contact.js` is a Vercel-style function). `public/_headers` + `public/_redirects` are the byte-equivalent Netlify fallback. `vercel.json` carries the 301 redirect map + security headers (HSTS, CSP `script-src 'self'` — no hashes needed after the SSR fix, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none).

**Required environment variables** (see `.env.example`):
- `RESEND_API_KEY` — Resend API key (server env only; unset ⇒ dev logs email instead of sending).
- `CONTACT_TO` / `CONTACT_FROM` — notification mailbox + verified Resend sending address.
- `SITE_URL` / `VITE_SITE_URL` — production origin (default `https://ea-plus.de`).
- `ALLOWED_ORIGINS` — same-origin allowlist for the form POST.
- **`TRUSTED_PROXY_HOPS`** — ⚠️ **must match the host's real proxy hop count** or the form rate-limiter (5/h per IP) is bypassable via `X-Forwarded-For`. Vercel appends the real client IP → set to `1`. Verified correct only when this matches topology.

**Build:** `npm run build` → static `dist/` (15 prerendered pages + 13 extensionless twins) + the Vercel function. The build fails if any `<main>` lacks its `<h1>` inline (SSR guard) or an unexpected inline script appears (CSP guard).

**Post-deploy verification:** confirm each route serves its own HTML (not SPA-fallback); confirm the LCP hero image is the AVIF variant; submit the form and confirm the notification email arrives; run securityheaders.com; validate JSON-LD (Organization/LocalBusiness, Service, FAQPage, BreadcrumbList) in Google Rich Results Test.

## 3. Client punch-list (must resolve before public launch)

**Legal (blocking):**
- **Datenschutzerklärung** — the entire binding body is `PLACEHOLDER: legal` stubs; counsel must supply verbatim privacy text (from the live site) + review. The 3 build-introduced disclosures (Resend as mail processor; hosting provider TBD; no consent tool in v1) are drafted as factual notes for counsel to formalize.
- **Impressum** — re-verify against the live page immediately before launch.

**Assets:**
- Real EA+ photography → 7 hero images (currently Unsplash placeholders, `data-placeholder="unsplash"`), team portraits (currently monogram fallbacks), QNG-flow product screenshot.
- Real logo SVG (wordmark placeholder) + partner/certification logos (TrustStrip text placeholders).
- Real branded 1200×630 `og-default.png`.

**Config / copy:**
- Confirm WhatsApp Business number and Outlook Bookings URL (both placeholders in `content/kontakt.js`).
- Sign off all `NEW COPY: review` strings (hero claims, eyebrows, KineticStatement, meta descriptions, form framing — facts are verbatim-sourced; these are additions the live site lacked).
- Correct or confirm preserved source typos (e.g. Fördermittel „In 6 Schritten" over 7 steps, „Planungenergieeffizienter", karriere „erwarten Sie" / „Ihre Profil", „Praxistip").
- Reconcile team data for `/ansprechpartner` (phone-format drift, Güstrow/Wittstock location fusion, Berlin staff carrying the Strausberg number) — Person/Org JSON-LD is intentionally withheld until reconciled.
- Note: the green CTA/eyebrows are now a slightly deeper forest green (`--green-800`) — required to pass WCAG AA contrast; the style guide's mandated `--green-700` measured 4.2:1 (fails).

## 4. Optional post-launch optimizations (not gate items)
- Slim the entry bundle by route-splitting `motion` out of the always-loaded shell (~15–40KB gz).
- Preload per-route CSS in the prerender to push `/` and service LCP under 2.0s.
- Add CSP `report-to`/`report-uri` once a reporting endpoint exists (needs https staging).
- Consider a checklist asset for the Blower-Door „Checkliste" CTA (currently routes to /kontakt).
