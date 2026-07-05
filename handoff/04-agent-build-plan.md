# 04 — Agent Build Plan (Senior Dev/Designer Handoff)

> **EnergieAudit Plus — Website Build.** This is the execution plan for AI agents building the production website. It is written from the perspective of the lead developer/designer and is **binding**: where this plan references `02-style-guide.md` or `03-development-brief.md`, those documents are the source of truth for tokens and content; where this plan differs (stack, page scope), **this plan wins**.
>
> **North star:** a premium, calm, trustworthy German B2B site that converts visitors into booked consultations. Premium = restraint, whitespace, precision, fluid motion. Trust = clarity, proof numbers, legal correctness, speed.

---

## 0. Source-of-truth map (read before building anything)

| Artifact | Use for |
|---|---|
| `handoff/02-style-guide.md` | All design tokens: color scales, type scale, spacing, radii, shadows, motion tokens, component visual contracts |
| `handoff/03-development-brief.md` | Section-by-section page anatomy, hero slider spec (§5), Reactbits/effect map (§7), SEO details (§9) |
| `handoff/content/*.md` | **Verbatim German copy — use 1:1, never rewrite.** New microcopy (buttons, meta, hero lines) allowed but flag `<!-- NEW COPY: review -->` |
| Figma design system (`fileKey 9LNbES4qpDoHgOmBxzIoWP`) | Visual reference for revamped components: buttons (pill), team card (Direction B), two-tier header, mega-menu tiles, reference card, footer |
| `handoff/01-company-research.md` | Tone, USPs, proof numbers, target audiences |

**Rule for every agent:** before implementing a component or page, read its spec in the docs above. Do not invent visual language — it is already locked.

---

## 1. Scope — pages to build

Per client direction, the site ships with exactly these routes:

```
/                                            Homepage
/leistungen                                  Leistungen (overview of all 7)
/leistungen/neubau-energieberatung           Neubau & Energieberatung
/leistungen/bestandsgebaeude                 Energieberatung für Bestandsgebäude
/leistungen/fordermittelservice              Fördermittelservice
/leistungen/lebenszyklusanalyse-lca          Lebenszyklusanalyse (LCA)
/leistungen/raumluftmessung-baubiologie      Raumluftmessung & Baubiologie
/leistungen/blower-door-test                 Blower-Door-Test
/leistungen/qng-flow                         Nachhaltigkeitsaudit mit QNG-flow (flagship)
/karriere                                    Karriere (Anrede „du")
/ansprechpartner                             Ansprechpartner (team directory)
/kontakt                                     Kontakt (form + Standorte)
/datenschutzerklaerung                       Datenschutzerklärung
/impressum                                   Impressum
```

- **Language:** German throughout (`lang="de"`), Anrede „Sie" — except `/karriere` („du").
- `Über uns` / `Referenzen` from the old brief are **out of scope for v1** (their content may be partially reused inside Homepage sections). Keep component design generic enough to add them later.
- 404 page required (branded, links back to Leistungen + Kontakt).

---

## 2. Tech stack (fixed)

| Layer | Choice | Notes |
|---|---|---|
| Build tool | **Vite 6** | Fast dev/build, first-class React |
| UI | **React 19** (JavaScript + JSX) | Function components + hooks only. No class components. |
| Routing | **React Router 7** | With route-level code splitting (`lazy`) |
| Pre-rendering | **vite-plugin-ssr / static prerender of all 14 routes** | Non-negotiable for SEO on a lead-gen SPA: every route must ship crawlable HTML. If prerendering proves unstable, escalate — do not ship a client-only SPA. |
| Styling | **Plain CSS** — design tokens as CSS custom properties in `tokens.css` + **CSS Modules** per component | No Tailwind, no CSS-in-JS runtime. Tokens are the single source of truth. |
| Animation (primary) | **Motion** (`motion`, `motion/react` — motion.dev) | Scroll reveals, layout transitions, page transitions, hero slider, spring physics, `useScroll`/`useInView` |
| Animation (secondary) | **anime.js v4** | SVG line-drawing (process/eco-gradient paths), timeline-choreographed micro-interactions, staggered grid entrances where fine-grained timeline control beats Motion |
| Icons | **lucide-react** | Single icon set, stroke 1.75–2px. Never mix icon libraries. |
| Forms | **react-hook-form + zod** | Client validation mirrors server validation |
| Form backend | Serverless function (Vercel/Netlify function or small Node endpoint) → transactional mail (Resend) | See §8 Security — the form is the highest-risk surface |
| Fonts | Self-hosted **Carlito** (metric Calibri clone) + **Caladea** (metric Cambria clone), `@font-face`, `font-display: swap`, preloaded WOFF2 | Stack: body `"Calibri","Carlito",system-ui,"Segoe UI",sans-serif`; display `"Cambria","Caladea",Georgia,serif`. **Never load fonts from Google Fonts CDN** (DSGVO — Landgericht München ruling). |
| Images | Unsplash placeholders via downloaded local files (not hotlinked at runtime), AVIF/WebP + `srcset`, every instance tagged `data-placeholder="unsplash"` + `{/* TODO: replace with real EA+ photo */}` | Hotlinking Unsplash leaks visitor IPs to a third party — download at build time. |

### Division of labor: Motion vs anime.js

- **Motion owns:** everything tied to React state/scroll/route — `AnimatePresence` page transitions, `layout`/`layoutId` shared-element transitions (mega-menu, card→detail), scroll-triggered reveals (`whileInView`), hero slider crossfades, hover/tap springs, count-up numbers (`animate` + `useMotionValue`).
- **anime.js owns:** SVG path drawing (the signature blue→green process line, section dividers), complex multi-element timelines (e.g. hero first-load choreography: veil → headline words → chip → CTA in one timeline), playful stagger patterns on static grids.
- **Never both on the same element.** One animation owner per element, decided in the component spec.
- Both must gate behind `prefers-reduced-motion` (see §7.5).

---

## 3. Project structure

```
src/
  main.jsx                    entry, router, <MotionConfig reducedMotion="user">
  routes.jsx                  route table, lazy imports, scroll restoration
  styles/
    tokens.css                ALL custom properties (copy §8 of style guide verbatim)
    base.css                  reset, typography defaults, focus styles, utilities
    fonts.css                 @font-face Carlito/Caladea
  components/
    primitives/               Button, Link, Container, Section, Heading, Overline,
                              Badge, Chip, IconChip, Input, Textarea, Select, Checkbox
    patterns/                 Card (Service/Team/Stat/Standort variants), Accordion,
                              Stepper, StatBand, CTABand, TrustStrip, TestimonialCarousel,
                              Breadcrumbs, HeroSlider, MegaMenu, CookieConsent,
                              ScrollProgress, BackToTop, PraxistippCallout
    layout/                   Header, Footer, PageShell, SEO (head manager)
    motion/                   Reveal, StaggerGroup, CountUp, PageTransition,
                              SplitTextReveal, EcoLineDraw (anime.js), ParallaxMedia
  content/                    one .js/.json module per page importing verbatim copy
  pages/                      one folder per route, composing patterns only
  lib/                        seo.js (JSON-LD builders), analytics.js (consent-gated),
                              validation.js (zod schemas shared with server)
server/ (or api/)             contact.js — form endpoint (validation, rate limit, mail)
public/                       fonts/, images/, favicon set, robots.txt, sitemap.xml
```

**The reuse mandate (this is the #1 review criterion):** pages may **only** compose components from `primitives/`, `patterns/`, `layout/`, `motion/`. If a page needs a one-off style, it gets added to the system (new variant prop), never inlined. No raw `<button>`, no hex colors outside `tokens.css`, no ad-hoc font sizes, no local `box-shadow` values. A grep for `#[0-9a-fA-F]{6}` outside `tokens.css` must return zero hits at review time.

---

## 4. Design tokens (deltas from the style guide)

Adopt `02-style-guide.md` §8 `:root` block **verbatim**, with one client-driven adjustment:

- CI text color is **`#1E1E1E`** (client CI). Set `--ink-800: #1E1E1E` as the default text/heading-strong value. Keep the rest of the slate scale for muted/secondary/borders as specified.
- Anchors unchanged: `--brand-blue: #105388` (primary, structure, buttons), `--brand-green: #8DC63F` (accent **fills only**).
- **Hard contrast rule (repeat because agents violate it):** `#8DC63F` on white fails WCAG (~1.7:1). Never use it for text, thin icons, or borders that convey meaning on light backgrounds. Green text/UI on white = `--green-700 #4E8A1F`. `#8DC63F` is for large fills, chips on dark, charts, gradient stops, the eco progress bar.
- Signature gradient `--grad-eco` (`#105388 → #4E8A1F`): thin rules, active states, stepper lines, scroll progress. This is the brand's visual fingerprint — use it consistently, sparingly.
- Ratio discipline: ~70% white/neutral, ~20% blue, ~10% green/amber.

Typography = Calibri(Carlito) body @17px/1.65 + Cambria(Caladea) display headings, fluid `clamp()` scale from style guide §2.2. Eyebrow/overline (uppercase, tracked, blue-700 or green-700) above every section H2 — signature element. `hyphens: auto` on German body text.

---

## 5. Component library — build order & contracts

Build and visually verify components **in isolation first** (a `/dev/kitchen-sink` route rendering every component in every state — kept out of the sitemap/robots), then compose pages.

### Tier 1 — Primitives (block everything else)
1. **Button** — variants `primary | accent | outline | ghost | onDark`, sizes `sm|md|lg`, pill radius (per Figma revamp), optional Lucide icon left/right, hover = lift + `--shadow-brand` + arrow nudge (Motion spring), visible focus ring, `disabled` + `loading` states. One component, used for every clickable action on the site.
2. **Container / Section** — max-width 1280 (wide 1440 variant), side padding `clamp(20px,5vw,64px)`, Section handles vertical rhythm (128/64px) + background variants `white | subtle | blue-tint | eco-tint | dark`.
3. **Heading + Overline** — enforce type scale; Heading takes `level` (semantic) and `size` (visual) separately so heading order stays logical.
4. **Form controls** — Input/Textarea/Select/Checkbox: 44px+ height, label above, error slot, focus ring, `aria-describedby` wiring.

### Tier 2 — Patterns
5. **Header** — two-tier per Figma (navy utility strip + white main bar), sticky, blur backdrop, shadow appears on scroll (Motion `useScroll`). Nav: Leistungen (mega-menu), Karriere, Ansprechpartner, Kontakt + primary CTA „Termin vereinbaren" + phone. Mobile: hamburger → full-screen slide-in (`AnimatePresence`), accordion for Leistungen, CTA pinned to bottom.
6. **MegaMenu** — 2-column panel, 7 service tiles (icon chip + name + 3-word descriptor), QNG-flow as featured dark tile. Opens on hover *and* click, closes on `Esc`/outside click, full keyboard operability (arrow keys through tiles). Motion: `layout` scale/fade, 200ms.
7. **Footer** — dark `--blue-900`, eco-gradient hairline top edge, per Figma brand column; columns: Leistungen (7 links), Unternehmen (Karriere, Ansprechpartner, Kontakt), Kontakt/Standorte, Rechtliches (Impressum, Datenschutzerklärung).
8. **Card family** — one `Card` base (white, `--radius-lg`, hairline border, `--shadow-sm`, hover lift −4px + shadow-md, Motion spring) with variants: `ServiceCard` (icon chip, H3, one-liner, „Mehr erfahren →" arrow slide), `TeamCard` (Figma Direction B: diagonal-cut photo, name, green rule, role overline, mail/phone icon buttons), `StatCard` (CountUp number + label), `StandortCard`, `FeaturedCard` (QNG-flow, dark/gradient).
9. **HeroSlider** — the showpiece; full spec in dev brief §5. 7 slides, autoplay 6s, pause on hover/focus/interaction, eco-gradient progress bar, numbered indicators, desktop side service-nav, swipe + arrows + keyboard, `aria-roledescription="carousel"`, visible pause button. Motion crossfade + per-slide `SplitTextReveal`; subtle Ken-Burns on image (disabled under reduced motion, autoplay off too).
10. **Stepper/Timeline** (Ablauf sections), **Accordion** (FAQ — Motion height animation, chevron rotate), **StatBand** (dark section + CountUp), **CTABand** (reused on every page bottom), **TrustStrip** (dena · DGNB · KfW · BAFA · QNG · IHK marquee, grayscale→color hover), **TestimonialCarousel**, **Breadcrumbs**, **PraxistippCallout** (amber), **CookieConsent**, **ScrollProgress** (eco gradient), **BackToTop**.

### Tier 3 — Motion wrappers
11. **Reveal** (fade + 20px rise, `whileInView`, once), **StaggerGroup** (60–80ms children stagger), **CountUp**, **PageTransition** (`AnimatePresence`, ≤400ms fade/slide, scroll-to-top on navigate), **SplitTextReveal** (word-level, hero only), **EcoLineDraw** (anime.js `stroke-dashoffset` SVG draw for process lines/dividers), **ParallaxMedia** (≤8% movement).

**Contract for every interactive component:** default / hover / active / focus-visible / disabled states; 44×44px min touch target; keyboard operable; German `aria-label`s.

---

## 6. Page specs (composition + funnel role)

Every page ends with **CTABand + Footer**. Every page has unique `<title>`/meta description (German), OG image, JSON-LD, breadcrumbs (except home).

### 6.1 Homepage `/` — funnel: orient → prove → route to service or contact
1. **HeroSlider** (§5 of brief — microcopy table in brief §5.4, flag as NEW COPY). Headlines render as **short declarative claims** (see §13.1), description one small line beneath — not paragraph-style.
2. **TrustStrip** — immediately under hero. Trust before scroll depth.
3. **Positionierung** — short intro + 5 USP icon cards (Unabhängig · Schlanke Prozesse · Aus einer Hand · Transparent · Partnerschaftlich), stagger reveal. Copy: `content/home.md`.
4. **Leistungen grid** — 7 ServiceCards as an **asymmetric bento grid**: QNG-flow featured large (dark/gradient tile), one embedded stat tile („bis zu 150.000 € / WE") inside the grid. Each card → service detail (primary funnel edge).
5. **Zielgruppen „Für wen"** *(added per §13.2)* — 4–5 audience cards: Bauträger & Projektentwickler · Architekten & Planer · Wohnungswirtschaft · Kommunen · Private Bauherren. Each card lists its 2–3 most relevant Leistungen as links. NEW COPY, flag for review.
6. **Kinetic positioning statement** *(added per §13.3)* — full-width oversized display-type statement, e.g. „Energieeffizienz ist keine Kür mehr. Sie ist die Grundlage jedes förderfähigen Projekts." (NEW COPY), scroll-linked word-by-word color reveal (Motion `useScroll`). The one theatrical typographic moment on the page.
7. **StatBand (dark)** — count-ups: „5 % der Energieberater" · „bis zu 150.000 € / WE" · „6 Standorte" · projects. Proof = conversion fuel.
8. **QNG-flow product teaser** — flagship platform band, dark premium, „Mehr erfahren" → `/leistungen/qng-flow`.
9. **Ablauf** — 4 steps (Erstgespräch → Analyse → Nachweise → Förderauszahlung) with EcoLineDraw connecting them. Shows the visitor the *low-friction path* — the step-1 CTA is „Kostenloses Erstgespräch".
10. **Google reviews carousel** (real rating).
11. **Standorte teaser** — Germany map graphic (static SVG, no Google Maps) → `/kontakt`.
12. **CTABand** — „Sichern Sie sich Ihr kostenloses Erstgespräch."

### 6.2 `/leistungen` — funnel: compare → pick service
Hero intro (verbatim from `leistungen-uebersicht.md`) → 7 ServiceCards grid (QNG-flow featured) → USP reminder strip → Ablauf → CTABand.

### 6.3 Service detail template (×7) — funnel: convince → contact
Identical skeleton, content per `content/<service>.md` verbatim:
1. Page hero: Overline „LEISTUNG", H1, lead paragraph, proof chip, primary CTA „Termin vereinbaren" + secondary „Kostenloses Erstgespräch", Unsplash hero with `--grad-hero-veil`, breadcrumbs.
2. Nutzen / Für wen (icon list).
3. Ablauf — Stepper with the page's 4–6 verbatim steps.
4. Details / Normen & Leistungsumfang — accordion or two-column.
5. Proof numbers — StatCards.
6. FAQ accordion (verbatim where present) + `FAQPage` JSON-LD.
7. Cross-sell — 2–3 related ServiceCards (Neubau ↔ Blower-Door ↔ QNG etc.). Keeps non-converters in the funnel.
8. CTABand.
**QNG-flow page** gets extra: platform feature grid, „bis zu 150.000 €" hero stat, screenshot placeholder.

### 6.4 `/karriere` — funnel: apply. Anrede „du", verbatim `karriere.md`
Hero → Kultur/Benefits cards → offene Stellen (accordion or cards) → Bewerbungs-Ablauf stepper → application CTA (mailto or form — same security rules as Kontakt if a form).

### 6.5 `/ansprechpartner` — funnel: human trust → direct contact
Hero → TeamCard grid (Figma Direction B; portraits = Unsplash placeholders marked for replacement; data from `content/team.md` — note the team-data inconsistencies flagged in the handoff, reconcile before launch) → optional Standort filter → CTABand. Every card exposes direct mail/phone — direct human contact is a premium trust signal in German B2B.

### 6.6 `/kontakt` — the conversion floor
1. Hero: „Wir freuen uns auf Ihr Projekt" tone, phone + email prominently **above** the form (never force the form).
2. **Contact form** (see §8) — build as a **2-step Projekt-Anfrage** (per §13.4): **Step 1** = „Worum geht es?" — Leistung/Projektart as large selectable cards (7 Leistungen + Allgemein) + optional Projektphase; **Step 2** = Name, Firma (optional), E-Mail, Telefon (optional), Nachricht, **DSGVO consent checkbox** (link to Datenschutzerklärung, unchecked by default), honeypot. Motion layout transition between steps, progress indicated, back-navigation preserves input, fully keyboard-operable; degrades to a single flat form without JS. Success state = inline confirmation (no redirect), with „Termin direkt buchen" (Outlook Bookings link) as next step.
3. Direct channels: Tel, E-Mail, WhatsApp, Bookings link.
4. 6 Standorte + 2 Partner as StandortCards + static map. Copy: `content/kontakt.md`.

### 6.7 Legal — `/datenschutzerklaerung`, `/impressum`
Readable legal template: narrow measure, TOC sidebar for the long Datenschutzerklärung, no decorative motion. Impressum from `content/impressum.md`; **Datenschutzerklärung: copy verbatim from the live site and have it legally reviewed — must also name the form processor/mail service, hosting provider, and consent tool added by this build.**

---

## 7. Motion & interaction plan

7.1 **Global defaults:** every section's content enters via `Reveal`/`StaggerGroup` (fade + 16–24px rise, once, `--ease-out`, 300–600ms). Hovers ≤150ms. Nothing loops except the hero autoplay and TrustStrip marquee (both pausable).

7.2 **Page transitions:** `AnimatePresence` fade/slide ≤400ms; scroll restored to top; focus moved to the new `<h1>` (a11y).

7.3 **Layout transitions:** Motion `layout`/`layoutId` for mega-menu open/close and the active-nav underline sliding between items.

7.4 **anime.js set pieces:** (a) hero first-load timeline (veil settle → headline words → proof chip → CTAs), (b) EcoLineDraw on Ablauf steppers and section dividers, (c) mega-menu tile stagger-in.

7.5 **Reduced motion:** `<MotionConfig reducedMotion="user">` + a shared `usePrefersReducedMotion()` consumed by every anime.js call site. Under reduce: no autoplay, no parallax, no Ken-Burns, no line-draw (render final state), keep ≤200ms opacity fades only.

7.6 **Performance rules:** animate `transform`/`opacity` only; no animation of `height` except Accordion (Motion, contained); `will-change` applied by Motion, not by hand; heavy set pieces lazy-mounted below fold; IntersectionObserver pauses off-screen loops. Budget: main-thread animation work must not push INP > 200ms.

---

## 8. Security & privacy (non-negotiable gate before launch)

### 8.1 Contact form (highest-risk surface)
- **Server-side validation** with the same zod schema as the client (never trust the client). Length caps (message ≤ 5,000 chars), strict email format, reject unexpected fields.
- **Anti-spam, layered:** honeypot field (CSS-hidden, any value ⇒ silently drop) + minimum-time-to-submit check (< 3s ⇒ drop) + **rate limiting** on the endpoint (e.g. 5 req/h per IP). No CAPTCHA in v1 (hurts premium feel + DSGVO complexity); escalate to Turnstile only if spam volume demands.
- **Output handling:** treat all input as text — HTML-escape everything interpolated into notification emails; plain-text email body preferred. No user input ever echoed into the page unescaped (React escapes by default — **`dangerouslySetInnerHTML` is banned repo-wide**, including for legal pages: convert them to JSX/MDX at build time).
- Mail via authenticated API (Resend) — API key only in server env, never in client bundle. Verify no secret ever appears in `dist/`.
- POST only, JSON, same-origin check (`Origin` header) on the endpoint.
- **Data minimisation:** don't log message bodies; store nothing beyond the forwarded email (no DB in v1). This keeps the DSGVO surface small.

### 8.2 Transport & headers (host/config level)
- HTTPS only, HSTS (`max-age=63072000; includeSubDomains`).
- **CSP** (start strict, loosen only with justification): `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'` — plus `connect-src` for the form endpoint. Document every exception in the repo.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- All external links `rel="noopener noreferrer"`.

### 8.3 DSGVO
- **Zero third-party requests before consent.** Self-hosted fonts, downloaded images, static map (no Google Maps iframe). Outlook Bookings = outbound **link**, not embed, in v1.
- Cookie consent banner only if/when consent-requiring tech exists (analytics). Prefer **cookieless, privacy-friendly analytics** (Plausible/Matomo, IP-anonymized) — ideally no banner needed at all: cleaner premium UX *and* compliant.
- Consent checkbox on the form: unchecked by default, links to `/datenschutzerklaerung`, submission blocked without it.

### 8.4 Supply chain & repo hygiene
- Lockfile committed; `npm audit` clean (no high/critical) at each phase gate; pin major versions; no abandoned packages for core UI. Reactbits-style snippets are **copied in and reviewed**, not installed as a dependency.
- No secrets in the repo — `.env` + host env vars; `.env.example` documents required vars.

---

## 9. SEO, performance, accessibility gates

- **SEO:** prerendered HTML per route; unique title/description; canonical; OG/Twitter cards with brand `og:image`; `sitemap.xml` + `robots.txt`; JSON-LD — `Organization` (multi-location `LocalBusiness`), `Service` per Leistung, `BreadcrumbList`, `FAQPage`; **301 redirects** from old live URLs (`/neubau-energieberatung/` → `/leistungen/neubau-energieberatung`, `/nachhaltigkeitsaudit-qng-flow/` → `/leistungen/qng-flow`, etc.) configured at the host.
- **Performance budget:** Lighthouse ≥ 95 all categories · LCP < 2.0s (preload hero slide 1 image + both WOFF2s) · INP < 200ms · CLS < 0.1 (fixed aspect ratios on all media) · initial JS < 150KB gzip (route-split; anime.js only in chunks that use it).
- **A11y (WCAG 2.2 AA):** style guide §7 checklist + slider pause control, skip-link, focus management on route change, `:focus-visible` ring everywhere, form error announcements (`aria-live`), green-contrast rule enforced.

---

## 10. Build phases — agent work packages

Each phase has a **gate**; do not start the next phase until the gate passes. One agent (or agent team) per package; packages within a phase marked ∥ can run in parallel.

**Phase 1 — Foundation** *(blocks everything)*
Scaffold Vite+React+Router+prerender · `tokens.css`/`base.css`/`fonts.css` · primitives (Button, Container, Section, Heading, Overline, form controls) · `/dev/kitchen-sink`.
**Gate:** kitchen-sink shows all primitive states; fonts render Carlito/Caladea; zero hard-coded colors outside tokens; keyboard focus visible everywhere.

**Phase 2 — Global shell** ∥ **Motion wrappers**
Header + MegaMenu + mobile menu · Footer · PageShell + SEO head manager + PageTransition ∥ Reveal/StaggerGroup/CountUp/SplitTextReveal/EcoLineDraw/ParallaxMedia.
**Gate:** full keyboard walk of header/mega-menu/mobile menu; reduced-motion verified on every wrapper.

**Phase 3 — HeroSlider + Homepage**
The showpiece gets its own package: build HeroSlider in isolation against brief §5, then compose the homepage.
**Gate:** slider passes a11y checklist (pause, keyboard, swipe, ARIA); autoplay pauses on hover/focus; LCP with slide-1 image < 2.0s on throttled 4G; microcopy flagged for review.

**Phase 4 — Service template + 7 service pages** ∥ **Card family + patterns (Stepper, Accordion, StatBand, CTABand, TrustStrip)**
Build the template once, then instantiate 7 pages pulling verbatim content.
**Gate:** diff each page's rendered text against `content/*.md` — zero unintended rewrites; cross-sell links correct; FAQPage JSON-LD validates.

**Phase 5 — Karriere · Ansprechpartner · Kontakt (incl. form backend)**
**Gate:** form security checklist §8.1 fully verified (honeypot, rate limit, server validation, no secrets in bundle); consent flow blocks submission; success state links to Bookings.

**Phase 6 — Legal pages · SEO wiring · redirects · sitemap · security headers**
**Gate:** all §8.2 headers present (check with securityheaders.com equivalent); JSON-LD validates; 301 map complete; legal copy flagged for counsel review.

**Phase 7 — Polish & audit**
Motion polish pass (timing consistency, stagger rhythm) · reduced-motion full sweep · WCAG audit (axe + manual keyboard/screen-reader pass) · CWV pass on throttled devices · content proofread vs `content/*.md` · cross-browser (Chromium, Firefox, Safari incl. iOS) · placeholder-image inventory list for the client.
**Gate (launch checklist):** Lighthouse ≥ 95 ×4 · `npm audit` clean · zero console errors · zero third-party requests pre-consent · all TODO placeholders inventoried · client sign-off on hero microcopy + font pairing.

---

## 11. Definition of done (per component / per page)

A component is done when: matches Figma/style-guide spec · all 5 interaction states · keyboard + screen-reader operable · reduced-motion behavior defined · used via the shared library only · appears in kitchen-sink · no token violations.
A page is done when: composed from library components only · verbatim copy verified · meta + JSON-LD present · responsive 320px→1536px with no CLS · passes axe with zero critical issues · funnel CTAs present (primary „Termin vereinbaren" reachable within one viewport of any scroll position via header/CTA band).

---

## 12. Open items to confirm with the client (do not block Phase 1–2)

1. Hero-slider microcopy sign-off (brief §5.4).
2. Font pairing final call (default: Calibri/Carlito + Cambria/Caladea — proceed with default).
3. Form backend provider + the exact notification mailbox.
4. Outlook Bookings: link-out (recommended v1) vs embed (needs consent handling).
5. Analytics: none vs Plausible/Matomo (recommended) vs GA4 (needs consent banner).
6. Team data reconciliation for `/ansprechpartner` (roles, count, GF).
7. Timeline for real photography to replace Unsplash placeholders.
8. Legal review of Datenschutzerklärung updated for the new stack.

---

## 13. Inspiration sweep findings (2026-07-05) — binding amendments

> Method: analyzed award-winning live sites in our exact niche (Awwwards nominees/winners for energy + sustainability consulting: **SLR Consulting** — world's leading sustainability consultancy, **Better Energy** (DK), **Sunsure Energy**, **Caeli Energie**, **Breakthrough Energy**, **Acron Energy Upgrades**) plus Dribbble's energy-consulting/sustainable-energy tag landscape. Structure, nav, headings, and CTA patterns were extracted from the live HTML. Patterns below appeared across ≥3 sources and are adopted as amendments; sections 6.1 and 6.6 already reflect them.

### 13.1 Claim-voice headlines (adopted)
Every strong site in the niche leads with a short **declarative purpose claim**, not a descriptive sentence: „Making Sustainability Happen." (SLR) · „Together we power the green transition" (Better Energy) · „Making India's Power Move" (Sunsure) · „Empowering innovators to build the future of energy" (Breakthrough). **Rule:** hero H1s and section statements are ≤ 8 words, verb-led, confident; supporting detail moves to the small line below. Apply to the hero slider headlines and all CTABand titles. (Sunsure also confirms the per-slide hero-H1 slider pattern we spec'd — it's current practice in this niche, not a gimmick.)

### 13.2 Audience segmentation section (adopted → homepage §6.1.5)
SLR (Sectors), Better Energy (Data centres/Healthcare/Manufacturing/Transport), Caeli (Professionnels/Particuliers/Collectivités) all segment by *who the visitor is*, not only by service. This is a funnel improvement: a Bauträger and a private Bauherr need different entry points into the same 7 Leistungen. Cards link into services pre-filtered by relevance and can pre-select the „Betreff" in the contact funnel (`/kontakt?leistung=x`).

### 13.3 One kinetic typographic statement per page (adopted → homepage §6.1.6)
The premium sites each have exactly **one** oversized editorial-type moment (SLR: „Sustainability is no longer discretionary."). It carries authority cheaply — pure typography, no imagery, scroll-linked reveal. Ours is German, verb-led, flagged NEW COPY. **Restraint rule stands:** one per page, homepage + optionally QNG-flow page only.

### 13.4 Forms as a crafted moment (adopted → Kontakt §6.6)
Caeli Energie is tagged specifically for `forms-and-input` craft — in this niche a beautiful form is a differentiator, not plumbing. Hence the 2-step Projekt-Anfrage: step 1 is a low-friction card choice (no typing → higher commitment before personal data is requested), step 2 the identity fields. Server contract and §8.1 security are unchanged (single POST on final submit).

### 13.5 Footer as a designed set piece (reinforced → §5 Tier 2 item 7)
`footer-design` recurred as an award tag (Caeli, Ivy). Our dark footer gets one signature move: **oversized wordmark row** (clipped, low-contrast, full-bleed at the very bottom) above the legal bar — cheap, premium, on-brand. Everything else per Figma footer component.

### 13.6 Confirmed, no change needed
- **Lean top nav** (Better Energy runs 5 items) — our 4 items + mega-menu is right.
- **Sector/stat/proof bands, count-ups, case-study teasers** (Sunsure, SLR) — already spec'd.
- **Storytelling scroll + marquee + subtle 3D** — award sites use GSAP/locomotive-scroll/WebGL; our Motion + anime.js plan covers the same effects. WebGL stays out of v1 (perf budget, restraint).
- **Content hub / „Latest Thinking"** (SLR) — authority builder, but Phase 2 (blog decision, §12.5 of brief).
- **Palette direction:** the niche splits between forest-dark-green minimalism (Dribbble trend) and light/airy blue-green (Better Energy, Sunsure). Our locked „Clean Clean-Tech" white + `#105388`/`#8DC63F` sits squarely in the second, credible camp — no change; the dark `--blue-900` premium bands provide the contrast moments the dark-palette sites get for free.

### 13.7 Pinterest sweep (2026-07-05) — the anti-template guardrail
A scan of Pinterest's energy/green-energy/B2B web-design idea hubs shows the niche's mainstream is dominated by **interchangeable solar/eco templates** (WordPress/Framer/Webflow themes: Soleil, Solvance, Solak, Greenly …) sharing the same tropes. These tropes now read as *cheap*, and agents must actively avoid them:
- ❌ Glowing green gradients on near-black backgrounds as the primary mood.
- ❌ Leaf/globe/hands-holding-plant iconography; generic solar-panel + wind-turbine hero stock (only show solar/panels where a Leistung is actually about them).
- ❌ Overloaded heroes: badge + headline + paragraph + two buttons + trust logos + floating cards all at once.
- ❌ Template-y "eco" typefaces and rounded-everything softness.
- ✅ Our counter-position (already locked, now with a reason): white/airy engineering precision, editorial serif display (Caladea), German technical proof (DIN norms, n50, €-ceilings) as design material, real architecture/building-envelope/measurement-device imagery. The premium references worth keeping from the sweep — **Wunder** ("Real estate's most trusted energy partner") and **Monting** — succeed through restraint and confident type, which is exactly our lane.
Pattern-level confirmations from the sweep: dark hero + slideshow animation is an established premium hero pattern (validates the HeroSlider), and hero craft guidance consistently stresses a single focal point with a clear CTA hierarchy per slide (max: eyebrow, claim-H1, one short line, proof chip, two CTAs — nothing else).

### 13.8 Reference list for the design agents
When building a section, agents may consult these live sites for craft-level reference (spacing rhythm, type confidence, hover restraint): slrconsulting.com (nav/mega-menu, sector cards, statement band) · betterenergy.com (calm hero, segmentation) · sunsure-energy.com (hero slider, proof/quote funnel) · caeli-energie.com (form craft, benefit quartet) · breakthroughenergy.org (typographic hero). **Reference means pattern-level inspiration — never copy layouts or copywriting.**
