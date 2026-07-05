# 03 — Development Brief

> **EnergieAudit Plus — Website Redesign.** Thorough build brief for a **premium, modern, dynamic German B2B website** with an award-winning feel. Reads alongside [`02-style-guide.md`](./02-style-guide.md) (visual system) and the verbatim copy in [`/content`](./content). **Pipeline:** this brief → **Claude design** (visual generation) → iteration → **Claude Code** (build).
>
> **Sprache: durchgängig Deutsch.** Anrede „Sie" überall, „du" nur auf der Karriere-Seite.

---

## 1. Goals & success criteria

**Business goals**
1. Generate qualified B2B leads → primary conversion **„Termin vereinbaren"** (Outlook Bookings) + **„Kostenloses Erstgespräch"**.
2. Communicate authority & independence (dena/DGNB credentials, „5 %"-Proof, „aus einer Hand").
3. Showcase the 7 services + flagship **QNG-flow** platform.
4. Support recruiting (Karriere) and multi-location credibility.

**Experience goals:** premium, smooth, clean, modern, dynamic — „award-winning". Fast, accessible, trustworthy.

**KPIs / quality bars:** Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y) · Core Web Vitals green (LCP < 2.0s, INP < 200ms, CLS < 0.1) · WCAG 2.2 AA · mobile-first.

---

## 2. Tech stack (recommendation)

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Next.js 15 (App Router) + React 19 + TypeScript** | SEO-critical for German B2B lead-gen; SSR/SSG, image optimization, routing, metadata API. |
| **Styling** | **Tailwind CSS** (tokens from style guide as CSS vars) + minimal CSS modules where needed | Fast, consistent, token-driven. |
| **Animation** | **Motion** (`motion`, `motion/react`) | Successor to Framer Motion; hardware-accelerated scroll/gesture/layout. Primary motion layer. |
| **UI effects** | **Reactbits** (copy-in components) | Dynamic hero, text reveals, backgrounds, cards, marquees. Verify component names on reactbits.dev at build (catalog evolves). |
| **Icons** | **Lucide React** | Clean line icons. |
| **Fonts** | Self-hosted **Carlito** (Calibri clone) + **Caladea** (Cambria clone) via `next/font/local` | Identical cross-device rendering; brand = Calibri. |
| **Forms** | React Hook Form + Zod; serverless route / form service (e.g. Resend / Formspree) | Kontakt + Karriere; DSGVO consent. |
| **Booking** | Embed/deep-link existing **Outlook Bookings** | Keep current scheduling flow. |
| **Content** | Verbatim copy from `/content` as MDX/JSON; **optional headless CMS** (Sanity / Storyblok / Payload) for Team, Referenzen, (future) Blog | Lets non-devs edit growing team & references. Flag as phase-2 option. |
| **Charts/data-viz** | Lightweight (Recharts / visx / SVG) | Render proof-numbers. |
| **Maps** | Static map images or privacy-friendly embed (DSGVO) for Standorte | Avoid Google Maps consent issues; use static or Leaflet/OSM. |
| **Hosting** | **Vercel** | Best Next.js DX, edge, analytics. |
| **Analytics** | Cookie-consent-gated (Plausible/Matomo privacy-friendly, or keep GA4 via Site Kit) | DSGVO. |
| **i18n** | German only (no multilingual now) | Build single-locale; keep architecture i18n-ready if EN later wanted. |

> All tech is a **recommendation** — confirm before build. The style guide & design are stack-agnostic.

---

## 3. Information Architecture & Sitemap

```
/                         Startseite (Homepage) — Hero-Service-Slider + Übersicht
/leistungen               Leistungen — Übersicht aller 7 Leistungen  (konsolidiert; ersetzt auch /gebaeudeenergieberatung)
  /leistungen/neubau-energieberatung          Service-Detail
  /leistungen/bestandsgebaeude                Service-Detail
  /leistungen/fordermittelservice             Service-Detail
  /leistungen/lebenszyklusanalyse-lca         Service-Detail
  /leistungen/raumluftmessung-baubiologie     Service-Detail
  /leistungen/blower-door-test                Service-Detail
  /leistungen/qng-flow                         Service-Detail (Flagship — QNG-flow)
/ueber-uns                Über uns — Story, USPs, Geschäftsführung
/team                     Ansprechpartner — Team-Verzeichnis
  /team/[slug]            Personen-Profil (Template, 13 Personen)
/referenzen               Referenzen — Projekt-Portfolio
  /referenzen/[slug]      Projekt-Detail (optional, Phase 2)
/karriere                 Karriere (Anrede „du") — Kultur + offene Stellen
/kontakt                  Kontakt — Formular + 6 Standorte + 2 Partner
/impressum  /datenschutz  /cookie-richtlinie   Rechtliches
(Phase 2: /insights or /blog)
```

**URL notes:** move service pages under `/leistungen/*` for clean hierarchy; set **301 redirects** from all current flat URLs (`/neubau-energieberatung/` → `/leistungen/neubau-energieberatung` etc.) to preserve SEO. Keep `/qng-flow` slug friendlier than the old `/nachhaltigkeitsaudit-qng-flow/` (redirect old → new). Decide with SEO in mind before launch.

**Templates to design in depth (per scope):** Homepage · Service-Detail · Leistungen-Übersicht · Über uns · Referenzen · Team (+ Profil) · Kontakt · Karriere · Rechts-Seiten · global Header/Footer. The remaining individual pages reuse these templates.

---

## 4. Global components

- **Header** (sticky, transparent-over-hero → solid on scroll): logo · nav (Leistungen mega-menu, Über uns, Referenzen, Karriere, Kontakt) · phone/WhatsApp · **Primary CTA „Termin vereinbaren"**. Mobile: full-screen menu, pinned CTA.
- **Footer** (enriched, dark `--blue-900`): claim + LinkedIn (neu) · Leistungen-Links · Unternehmen-Links · Standorte/Kontakt · Rechtliches. Eco-gradient top edge.
- **Floating contact** (mobile): WhatsApp + call quick-buttons.
- **Cookie consent** (DSGVO), **scroll progress** bar, **back-to-top**.
- **Reusable sections:** CTA band („Bereit für Ihr Projekt? Termin vereinbaren"), trust-badge strip, stats band, testimonial carousel — composed across pages.

---

## 5. Hero Service Slider (the showpiece)

> The homepage hero is a **dynamic, auto-advancing slider that shows off the 7 services — each slide carries a short, brief description of that specific service** + its CTA. This is the signature "wow" moment; make it premium and smooth.

### 5.1 Structure (per slide)
- **Eyebrow/overline:** „LEISTUNG 0X / 07" or service category label.
- **Headline (H1/display):** the service name / its existing claim.
- **Brief description:** 1–2 short German sentences (concise — see proposed microcopy §5.4).
- **Proof chip(s):** one key number badge (e.g. „bis zu 150.000 € / WE", „n50 bis 35.000 m³").
- **Actions:** primary „Mehr erfahren →" (to that service page) + persistent secondary „Termin vereinbaren".
- **Media:** Unsplash background image per service (building/energy theme) with `--grad-hero-veil` + left blue scrim for legibility.

### 5.2 Behavior
- 7 slides, **autoplay** ~6s with smooth crossfade/slide; **pause on hover/focus**; swipe (touch) + arrow keys + clickable progress indicators.
- **Animated progress bar** (eco-gradient) showing time to next slide; numbered indicators „01–07".
- Headline **word/line reveal** on each slide change (Split/Blur text); image subtle Ken-Burns/parallax.
- **Side service-nav (desktop):** a vertical list of the 7 service names beside/below the slider; active one highlighted; clicking jumps to that slide. Doubles as an at-a-glance services menu.
- Persistent **trust-badge strip** below the hero (dena · DGNB · KfW · BAFA · QNG · IHK).

### 5.3 Responsive & a11y
- Mobile: full-bleed image, stacked text bottom-aligned, swipeable, indicators as dots; side-nav collapses into the indicators.
- A11y: `role="region" aria-roledescription="carousel"`, slide labels, live-region politeness off during autoplay, visible pause control, full keyboard support, honours reduced-motion (no autoplay/parallax → manual only).
- Performance: preload first slide image (LCP), lazy-load rest; use `next/image`.

### 5.4 Proposed slide microcopy (PROPOSAL — please review)
> New brief copy derived faithfully from existing service text. The site's existing body copy stays verbatim (`/content`); these short hero lines are *new* and need sign-off. Anrede „Sie".

| # | Headline | Kurzbeschreibung (Vorschlag) | Proof-Chip | CTA → |
|---|---|---|---|---|
| 1 | **Neubau & Energieberatung** | „Wir machen Ihren Neubau förderreif – Energiekonzept, GEG-Nachweis, LCA, QNG und Blower-Door aus einer Hand." | bis zu 150.000 € / WE | `/leistungen/neubau-energieberatung` |
| 2 | **Energieberatung für Bestandsgebäude** | „Vom Altbau zum förderfähigen Effizienzgebäude – strukturiert, rechtssicher und wirtschaftlich saniert." | iSFP · BAFA · KfW | `/leistungen/bestandsgebaeude` |
| 3 | **Fördermittelservice** | „Förderung als Vertriebsvorteil: Wir übernehmen Ihr komplettes Fördermittelmanagement bis zur Auszahlung." | 24-h-BzA-Portal | `/leistungen/fordermittelservice` |
| 4 | **Lebenszyklusanalyse (LCA)** | „Ökobilanzen nach DIN EN 15978 auf Basis der ÖKOBAUDAT – die Datengrundlage für QNG und KfW-Förderung." | DIN EN 15978 | `/leistungen/lebenszyklusanalyse-lca` |
| 5 | **Raumluftmessung & Baubiologie** | „Der wissenschaftliche Nachweis, dass Ihr Gebäude wohngesund ist – akkreditiert nach DIN EN ISO 16000." | QNG · DGNB | `/leistungen/raumluftmessung-baubiologie` |
| 6 | **Blower-Door-Test** | „Die zentrale Qualitätssicherung für die Gebäudehülle – Luftdichtheit nach DIN EN ISO 9972 mit eigener Messtechnik." | bis 35.000 m³ | `/leistungen/blower-door-test` |
| 7 | **Nachhaltigkeitsaudit mit QNG-flow** | „Nachhaltigkeit muss nicht kompliziert sein – QNG-Zertifizierung über unsere eigene Plattform QNG-flow." | eigene Plattform | `/leistungen/qng-flow` |

---

## 6. Page templates (section-by-section)

> Each section notes content source + suggested Reactbits/Motion treatment. Keep motion subtle; one feature effect per section max.

### 6.1 Homepage `/`
1. **Hero Service Slider** (§5).
2. **Trust strip** — credential/partner badges (Logo Loop).
3. **Wer wir sind / Positionierung** — short intro + the 5 USPs as icon cards („Unabhängig · Schlanke Prozesse · Aus einer Hand · Transparent · Partnerschaftlich"). *(Spotlight/Tilt cards; scroll reveal stagger.)* Copy: `content/home.md` + USPs from `01-company-research.md`.
4. **Leistungen-Übersicht** — 7 service cards grid (icon, name, 1-liner, „Mehr erfahren"). Feature **QNG-flow** with a larger/highlighted card. *(Magic Bento / card grid.)*
5. **„5 %"-Proof / Stats band** — big count-up numbers (5 % der Energieberater, 150.000 € / WE, 6 Standorte, X Projekte). *(Count Up on scroll; dark `--blue-900` section with eco-gradient accents.)*
6. **QNG-flow Highlight** — product teaser for the in-house platform: what it is, benefit, screenshot/abstract UI mockup (placeholder). *(Premium dark or blue-tint band; subtle background — Reactbits `Silk`/`Aurora` very low intensity.)*
7. **Ablauf / „So arbeiten wir"** — simple 4-step partnership process (Erstgespräch → Analyse → Nachweise/Umsetzung → Förderauszahlung). *(Stepper / connected eco-gradient line.)*
8. **Referenzen-Teaser** — 3–4 project cards + „Alle Referenzen". 
9. **Google-Bewertungen** — testimonial carousel (keep real reviews/rating). *(Carousel.)*
10. **Standorte-Teaser** — map/Germany graphic with 6+2 locations → „Zum Kontakt".
11. **CTA-Band** — „Sichern Sie sich Ihr kostenloses Erstgespräch" + „Termin vereinbaren".
12. **Footer.**

### 6.2 Service-Detail template (all 7 — drives `/leistungen/*`)
1. **Page hero** — eyebrow „LEISTUNG", H1 = service, lead paragraph (verbatim), primary CTA, hero image (Unsplash), key proof-chip. Breadcrumb.
2. **Nutzen / Für wen** — value props + target audience (icon list).
3. **Ablauf** — the page's 4–6 step process (verbatim steps, e.g. BzA→BnD) as a **Stepper/Timeline**.
4. **Details / Normen & Leistungsumfang** — structured content (DIN norms, deliverables) — accordion or two-column.
5. **Proof / Zahlen** — stat callouts (count-up).
6. **FAQ** — accordion (verbatim Q&A where present).
7. **Cross-sell** — related services (e.g. Blower-Door ↔ Neubau ↔ QNG).
8. **CTA-Band** + Footer.
- **QNG-flow page** gets extra treatment: platform feature section, benefit grid, „bis zu 150.000 €" hero stat.
- Content per page from `content/<service>.md` (verbatim).

### 6.3 Leistungen-Übersicht `/leistungen`
Hero intro + **7 service cards** (consistent grid, QNG-flow featured) + USP reminder + process + CTA. Consolidates the old thin `/leistungen/` and legacy `/gebaeudeenergieberatung/`. Copy: `content/leistungen-uebersicht.md` (+ relevant bits of `gebaeudeenergieberatung.md`).

### 6.4 Über uns `/ueber-uns`
Hero (story/claim) → Positionierung & 5 USPs → „5 %"-Proof → Geschäftsführung (Lippe, Schubert bios) → Werte/Lean → Standorte → Credentials/Mitgliedschaften → CTA. Copy: `content/ueber-uns.md`.

### 6.5 Team `/team` (+ `/team/[slug]`)
Grid of team cards (portrait, name, role, contact). Filter by Standort/Rolle optional. Profile page: portrait, role, focus areas, contact, booking. Copy: `content/team.md`. *(Reactbits `Profile Card` optional.)* Reconcile team-data inconsistencies before launch.

### 6.6 Referenzen `/referenzen` (+ optional detail)
Hero + filterable **project grid** (cards: image, client, Leistungs-Tags, sector) + stats + CTA. Optional case-study detail template (Phase 2). Copy: `content/referenzen.md`.

### 6.7 Karriere `/karriere` — **Anrede „du"**
Hero („Karriere mit Sinn…") → Kultur/Lean/Benefits („Das bieten wir dir") → offene Stellen (Ingenieur/Techn. Mitarbeiter; Ausbildung Kauffrau für Büromanagement) → Bewerbungs-Ablauf → application form/CTA. Keep informal tone. Copy: `content/karriere.md`.

### 6.8 Kontakt `/kontakt`
Hero → **Kontaktformular** (Name, Firma, E-Mail, Telefon, Betreff, Nachricht, DSGVO-Consent) → direkte Kontaktwege (Tel, WhatsApp, E-Mail, Bookings) → **6 Standorte + 2 Partnerfirmen** as cards + map → opening info. Copy: `content/kontakt.md`. Map privacy-friendly (static/OSM).

### 6.9 Rechtliches
Impressum / Datenschutz / Cookie-Richtlinie — clean readable legal template (typographic, TOC for long pages). Copy: `content/impressum.md`; **Datenschutz & Cookie-Richtlinie are long — copy verbatim from the live URLs at build time** (`/datenschutzerklarung/`, `/cookie-richtlinie-eu/`) and have legal counsel confirm.

---

## 7. Section → Reactbits / Motion component map

> Reactbits is built on a mix of CSS, **Motion/GSAP**, and **Three.js/OGL** (WebGL backgrounds). Install via its CLI/copy. **Verify exact component names on reactbits.dev when building** (catalog changes). Use effects sparingly — premium = restraint.

| Section / element | Suggested Reactbits | Motion role |
|---|---|---|
| Hero headline reveal | **Split Text** / **Blur Text** / **Shiny Text** | per-slide text stagger |
| Hero background accent | **Aurora** / **Silk** / **Beams** (very low intensity) or just image + veil | gentle parallax |
| Hero slider shell | **Carousel** (or custom Motion slider) | autoplay, drag, crossfade |
| Trust badges | **Logo Loop** (marquee) | infinite scroll, hover color |
| USP / feature cards | **Spotlight Card** / **Tilted Card** / **Magic Bento** | hover lift, scroll reveal |
| Service grid | card grid + **Magic Bento** for featured QNG-flow | stagger reveal |
| Stat numbers | **Count Up** | trigger on in-view |
| Process / Ablauf | **Stepper** | step transitions, eco-line draw |
| Eyebrow/section labels | **Gradient Text** / overline | fade-in |
| Testimonials | **Carousel** | drag/auto |
| Nav indicator | **Gooey Nav** (optional, subtle) | active underline |
| CTA glow (hero primary only) | **Star Border** | once |
| Decorative dividers | thin eco-gradient SVG / **Threads** (subtle) | scroll-linked |
| Scroll reveals (global) | **Animated Content** / **Fade Content** / **Scroll Reveal** | the default reveal everywhere |
| Click feedback (optional) | **Click Spark** | micro delight |

**Restraint rules:** max one WebGL background on screen at a time; lazy-mount & pause off-screen; never autoplay-loop text effects; all effects degrade gracefully under reduced-motion and on low-end devices.

---

## 8. Content & assets handling

- **Verbatim copy** lives in [`/content/*.md`](./content) — Claude Code must pull headline/body/CTA text from there **unchanged**. Do **not** rewrite existing copy. *New* microcopy (hero slider lines, button labels, meta descriptions) is allowed but flagged for review.
- **Images:** Unsplash placeholders everywhere, each marked `// TODO: replace with real EA+ photo` + alt text in German. Provide an asset list for the client to replace.
- **Logo & favicon:** reuse existing SVG logo (`Group-21*.svg`) + favicon set (or re-export crisp SVG). Provide light/dark variants (dark footer needs a light logo treatment).
- **Brand fonts:** ship Carlito + Caladea web fonts (self-hosted, `next/font/local`); document the Calibri/Cambria → clone mapping.

---

## 9. SEO, performance, accessibility

- **SEO:** per-page `<title>` + meta description (German), Open Graph + Twitter cards (add `og:image` — currently missing), canonical URLs, XML sitemap, robots, **301 redirects** from old URLs. **schema.org**: `Organization`/`LocalBusiness` (+ multiple locations), `Service` per leistung, `BreadcrumbList`, `FAQPage` on service FAQs, `Review`/`AggregateRating` for Google reviews. Strong semantic headings. German keywords (Energieberatung, Förderung KfW/BAFA, QNG, Blower-Door, Energieausweis, iSFP, Brandenburg/Berlin + Standorte).
- **Performance:** SSG where possible; `next/image` (AVIF/WebP, responsive); preload LCP hero image + brand fonts; lazy-load WebGL/below-fold; code-split heavy effects; tiny critical CSS; budget JS. Target CWV green.
- **Accessibility:** WCAG 2.2 AA (style guide §7). Especially: green-text contrast rule, slider keyboard/pause, focus-visible, reduced-motion, form labels, `lang="de"`.

---

## 10. Open decisions / to confirm before/while building

1. **Font pairing:** Primary (Calibri + Cambria/Caladea serif) vs single-family Calibri vs geometric-sans headline. *(Default: Primary.)*
2. **Hero slider microcopy** (§5.4) sign-off.
3. **URL restructure + redirects** (`/leistungen/*`) — confirm with SEO.
4. **CMS yes/no** for Team/Referenzen/Blog (phase 2).
5. **LinkedIn / social** — create & link? (currently none).
6. **Blog/Insights** — in scope now or phase 2?
7. **Real photography** — timeline for replacing Unsplash placeholders.
8. **Consolidate** `/leistungen` + legacy `/gebaeudeenergieberatung` — confirm merge.
9. **Team data** reconciliation (roles, count, who is GF).
10. **Contact form** backend + booking embed approach.

---

## 11. Suggested build phases (for Claude Code)

1. **Foundation:** Next.js + Tailwind + tokens (style guide §8) + fonts + layout primitives (container, grid, typography, buttons, Header/Footer).
2. **Hero Service Slider** + homepage sections.
3. **Service-Detail template** + 7 service pages (content from `/content`).
4. **Über uns · Team · Referenzen · Kontakt · Karriere.**
5. **Legal pages, SEO, schema, redirects, sitemap.**
6. **Motion polish, Reactbits effects, reduced-motion, a11y audit.**
7. **Performance pass (CWV), QA on real devices, content proofread vs live site, launch.**

> Build each template in isolation (Storybook-style/route preview) before composing pages, so components stay focused and reviewable.
