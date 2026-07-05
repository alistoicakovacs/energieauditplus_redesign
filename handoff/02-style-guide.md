# 02 — Style Guide & Design System

> **EnergieAudit Plus — Website Redesign.** Aesthetic direction: **Clean Clean-Tech** — light, airy, generous whitespace, brand blue + green on white, crisp type, subtle purposeful motion. Goal: *premium, smooth, clean, modern, dynamic — an award-winning feel* that still reads as a trustworthy German B2B energy consultancy.
>
> This document defines the visual language. It is written to be consumed by **Claude design** first (then iterated, then handed to **Claude Code**). All tokens are concrete and copy-paste ready.

---

## 0. Design Principles

1. **Vertrauen durch Klarheit.** Trust is the product. Clean layouts, strong hierarchy, no clutter. Whitespace is a feature, not waste.
2. **Premium, nicht laut.** Restraint over decoration. One bold move per section, never five.
3. **Beweisbar.** The brand sells with numbers (150.000 €, 5 %, n50, 35.000 m³). Make data a visual hero (stat blocks, count-ups, charts).
4. **Ruhige Bewegung.** Motion guides attention and rewards scrolling — it never distracts. Everything respects `prefers-reduced-motion`.
5. **Blau führt, Grün akzentuiert.** Blue carries structure and trust; green signals sustainability and action. White is the canvas.
6. **Konsistent über Geräte.** Identical rendering on every device (see typography web-font strategy).

**Personality keywords for the design model:** *kompetent · unabhängig · partnerschaftlich · präzise · nachhaltig · modern · ruhig-premium.*

---

## 1. Color System

The CI is **refined & deepened**: the exact brand anchors are preserved (`#105388` blue, `#8DC63F` green, `#FFCD57` amber, slate text) and extended into full, accessible scales plus deep-navy surfaces for premium contrast sections. **Background stays white.**

### 1.1 Brand anchors (unverändert / unchanged CI)
| Token | Hex | Role |
|---|---|---|
| `--brand-blue` | `#105388` | Primary brand color (logo, primary actions, headlines accents) |
| `--brand-green` | `#8DC63F` | Accent / sustainability / highlights & fills |
| `--brand-amber` | `#FFCD57` | Warm highlight (Praxistipp, sparingly) |

### 1.2 Blue scale (Primary)
| Token | Hex | Use |
|---|---|---|
| `--blue-950` | `#061E33` | Deepest navy — footer, hero overlays |
| `--blue-900` | `#082A45` | Dark premium sections background |
| `--blue-800` | `#0C3A5E` | Dark section gradients, hovers on dark |
| `--blue-700` | `#105388` | **CI BLUE** — primary buttons, links, key headings |
| `--blue-600` | `#1466A8` | Button hover, active states |
| `--blue-500` | `#1E87C9` | Interactive accents, info |
| `--blue-200` | `#B9D6EA` | Borders on blue tints |
| `--blue-100` | `#E2EEF6` | Tint background (cards, badges) |
| `--blue-50`  | `#F0F6FB` | Lightest blue section background |

### 1.3 Green scale (Accent)
| Token | Hex | Use |
|---|---|---|
| `--green-800` | `#3C6E16` | Green text on light (high contrast) |
| `--green-700` | `#4E8A1F` | **Accessible green** for text, links, icons, outline buttons on white |
| `--green-600` | `#6BA82E` | Hover for green-700 elements |
| `--green-500` | `#8DC63F` | **CI GREEN** — fills, accent shapes, highlights, charts |
| `--green-400` | `#A6D45F` | Soft accent, gradient stop |
| `--green-100` | `#EAF5D8` | Tint background (eco/success cards) |
| `--green-50`  | `#F4FAEA` | Lightest green section background |

> **Contrast rule:** `#8DC63F` (lime) fails WCAG text contrast on white (~1.7:1). **Never use `--green-500` for text or thin icons on white.** Use `--green-700`/`--green-800` for green text & small UI; reserve `--green-500` for large fills, shapes, charts, and as an accent against dark/blue surfaces.

### 1.4 Amber (Warm accent — use sparingly)
| Token | Hex | Use |
|---|---|---|
| `--amber-500` | `#FFCD57` | **CI AMBER** — Praxistipp callouts, highlight underlines, badges |
| `--amber-700` | `#B4791A` | Amber text on white (accessible) |
| `--amber-100` | `#FFF4D6` | Praxistipp callout background |

### 1.5 Neutrals (Slate)
| Token | Hex | Use |
|---|---|---|
| `--ink-900` | `#0F1B2D` | Max-contrast headings |
| `--ink-800` | `#1E293B` | **CI TEXT** — default heading/body-strong color |
| `--ink-700` | `#334155` | Body text |
| `--ink-600` | `#475569` | Secondary text |
| `--ink-500` | `#67768E` | **CI MUTED** — captions, meta, placeholders |
| `--ink-300` | `#CBD5E1` | Borders, dividers (medium) |
| `--ink-200` | `#E2E8F0` | Hairline borders, input borders |
| `--ink-100` | `#F2F5F7` | **CI SUBTLE BG** — alternating sections, cards |
| `--ink-50`  | `#F8FAFC` | Lightest neutral background |
| `--surface-alt` | `#F9F6FE` | **CI ALT BG** — optional faint-lavender alt section |
| `--white` | `#FFFFFF` | Default page background |

### 1.6 Semantic tokens
```
--color-bg            : var(--white);
--color-bg-subtle     : var(--ink-100);
--color-bg-brand      : var(--blue-50);
--color-bg-eco        : var(--green-50);
--color-bg-dark       : var(--blue-900);   /* premium dark sections */
--color-text          : var(--ink-800);
--color-text-muted    : var(--ink-500);
--color-text-invert   : var(--white);
--color-heading       : var(--ink-900);
--color-primary       : var(--blue-700);
--color-primary-hover : var(--blue-600);
--color-accent        : var(--green-700);  /* interactive green */
--color-accent-fill   : var(--green-500);  /* decorative green */
--color-link          : var(--blue-600);
--color-border        : var(--ink-200);
--color-focus-ring    : var(--blue-500);
--color-success       : var(--green-700);
--color-warning       : var(--amber-700);
--color-danger        : #C2410C;
```

### 1.7 Gradients & overlays
```
--grad-brand     : linear-gradient(120deg, #105388 0%, #1E87C9 100%);
--grad-eco       : linear-gradient(120deg, #105388 0%, #4E8A1F 100%);   /* blue→green, signature */
--grad-hero-veil : linear-gradient(180deg, rgba(6,30,51,.15) 0%, rgba(6,30,51,.78) 100%); /* on hero photos */
--grad-dark      : linear-gradient(160deg, #082A45 0%, #061E33 100%);
--grad-sheen     : linear-gradient(100deg, transparent 0%, rgba(255,255,255,.18) 50%, transparent 100%); /* shiny accents */
```
- **Hero photo overlay:** always apply `--grad-hero-veil` (and optionally a left-anchored blue scrim) so white headline text stays ≥ 4.5:1 contrast over any Unsplash image.
- **Signature accent:** the blue→green `--grad-eco` is the brand's visual signature — use on thin rules, icon chips, chart bars, the active slider progress bar, and section dividers.

### 1.8 Usage ratio (the "60-30-10" guide)
- **~70 %** white / `--ink-50/100` backgrounds + slate text.
- **~20 %** blue (primary structure, dark premium sections, buttons).
- **~10 %** green accents + occasional amber highlight.

---

## 2. Typography

> **Brand requirement:** the primary typeface is **Calibri** (Geschäftsführungs-Vorgabe). Calibri is a Microsoft system font and is *not* a free web font, so it only renders natively on Windows. To guarantee **identical rendering on macOS, iOS, Android & Linux**, we self-host a metric-compatible web font and keep Calibri first in the stack.

### 2.1 Font families & web-font strategy
| Role | Brand font | Web implementation | Notes |
|---|---|---|---|
| **Body / UI** | **Calibri** | Self-host **Carlito** (SIL OFL, metric-compatible Calibri clone by Łukasz Dziedzic). Stack: `"Calibri", "Carlito", system-ui, "Segoe UI", sans-serif` | Carlito matches Calibri metrics & shapes → seamless fallback. Free & redistributable. |
| **Display / Headings** | **Cambria** *(recommended companion)* | Self-host **Caladea** (SIL OFL, metric-compatible Cambria clone). Stack: `"Cambria", "Caladea", Georgia, serif` | Cambria + Calibri are Microsoft's *designed* ClearType pairing → adds premium editorial contrast while staying "on-brand-system". |

**Pairing recommendation (answer to "what could we pair Calibri with?"):**
- **Primary (recommended): Calibri (body) + Cambria→Caladea (display headings).** The official Microsoft companion serif. Editorial, premium, trustworthy; clearly distinct from body without importing an unrelated typeface.
- **Alternative A — single-family clean-tech:** Calibri/Carlito *everywhere*, hierarchy built purely from weight + size + tracking. Maximum consistency, very modern, lowest complexity.
- **Alternative B — geometric headline:** Calibri (body) + a geometric sans display (**Montserrat** or **Poppins**) for a more "tech" headline voice.
- *(If the CEO later wants the **exact** Calibri/Cambria web fonts instead of the OFL clones, license **Calibri Web / Cambria Web** from Monotype and swap the `@font-face` sources — the token system below does not change.)*

> **Decision needed in Claude design:** pick Primary vs Alternative A vs B. Default to **Primary** unless told otherwise.

### 2.2 Type scale (fluid, `clamp()` — mobile → desktop)
| Token | Element | Size (clamp) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| `--fs-display` | Hero H1 | `clamp(2.5rem, 1.6rem + 4.5vw, 4.5rem)` | 700 | 1.05 | -0.02em |
| `--fs-h1` | Page H1 | `clamp(2rem, 1.4rem + 3vw, 3.25rem)` | 700 | 1.1 | -0.015em |
| `--fs-h2` | Section H2 | `clamp(1.6rem, 1.2rem + 2vw, 2.5rem)` | 700 | 1.15 | -0.01em |
| `--fs-h3` | Sub H3 | `clamp(1.3rem, 1.1rem + 1vw, 1.75rem)` | 600 | 1.2 | -0.005em |
| `--fs-h4` | H4 | `1.25rem` | 600 | 1.25 | 0 |
| `--fs-lead` | Lead/intro | `clamp(1.125rem, 1rem + .6vw, 1.375rem)` | 400 | 1.5 | 0 |
| `--fs-body` | Body | `1.0625rem` (17px) | 400 | 1.65 | 0 |
| `--fs-small` | Small/meta | `0.9375rem` | 400 | 1.5 | 0 |
| `--fs-overline` | Eyebrow/label | `0.8125rem` | 600 | 1.2 | **0.12em**, UPPERCASE |
| `--fs-stat` | Big number | `clamp(2.5rem, 1.5rem + 4vw, 4rem)` | 700 | 1 | -0.02em |

- **Body base 17px / line-height 1.65** for comfortable German long-form (longer words need air).
- **Headings:** if using the serif display (Primary), keep line-height tight (1.05–1.2). German compound words → enable `hyphens: auto; lang="de"` and avoid forced uppercase on long words.
- **Overline/eyebrow** is a signature element: small uppercase label in `--blue-700` or `--green-700` above most H2s (e.g. „LEISTUNG", „REFERENZEN", „QNG-FLOW").
- **Measure:** body max width ~68–72ch.

---

## 3. Spacing, Grid & Layout

### 3.1 Spacing scale (8-pt based)
`--space-1:4px · -2:8px · -3:12px · -4:16px · -5:24px · -6:32px · -7:48px · -8:64px · -9:96px · -10:128px · -11:160px`

### 3.2 Layout
- **Container max-width:** `1280px` content (`--container`), with a wide `1440px` variant for full-bleed media. Side padding: `clamp(20px, 5vw, 64px)`.
- **Grid:** 12-column, gutter `24px` (desktop) / `16px` (mobile).
- **Section vertical rhythm:** `--space-10` (128px) desktop / `--space-8` (64px) mobile between major sections. Generous — whitespace = premium.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Mobile-first.

### 3.3 Radii
`--radius-sm:8px · --radius-md:14px · --radius-lg:20px · --radius-xl:28px · --radius-pill:999px`. Default for cards/inputs/buttons = `--radius-md`. Large feature cards/media = `--radius-lg/xl`. Soft, rounded but not bubbly.

### 3.4 Elevation / Shadows (soft, premium, low-contrast)
```
--shadow-xs : 0 1px 2px rgba(15,27,45,.06);
--shadow-sm : 0 2px 8px rgba(15,27,45,.06);
--shadow-md : 0 8px 24px rgba(15,27,45,.08);
--shadow-lg : 0 18px 48px rgba(15,27,45,.10);
--shadow-brand : 0 16px 40px rgba(16,83,136,.18);   /* on primary buttons/feature cards */
--ring-focus : 0 0 0 3px rgba(30,135,201,.45);
```
Prefer soft, diffuse shadows + hairline borders (`--color-border`) over heavy drop shadows. Cards lift on hover (`--shadow-md → --shadow-lg`, translateY -4px).

---

## 4. Iconography & Imagery

### 4.1 Icons
- **Library:** **Lucide** (consistent, modern, open-source line icons; pairs with the clean-tech look). Stroke 1.75–2px, size 20/24/32. Color = `--ink-700` default, `--blue-700`/`--green-700` for emphasis.
- **Service icons:** one distinct line icon per service, optionally on a tinted chip (`--blue-100`/`--green-100`) with `--radius-md`. Keep a single consistent set — no mixed icon styles (the current Font-Awesome/eicons mix is dropped).
- Optional subtle **blue→green gradient** stroke on hero/feature icons via SVG.

### 4.2 Photography (Unsplash placeholders)
- **Use Unsplash images as placeholders** throughout (mark every instance clearly so they're swapped for real photos before launch). Provide the Unsplash URL/ID and alt text in components.
- **Search themes:** modern energy-efficient buildings, construction/renovation sites, solar & heat pumps, blower-door / building envelope, architectural facades, engineers/consultants at work, blueprints, sustainable materials, German/European architecture.
- **Treatment:** consistent, calm, slightly cool grade. On photos used behind text, always apply `--grad-hero-veil` (+ optional blue duotone) for legibility. Rounded corners `--radius-lg`. Avoid cheesy stock/handshakes — favour real-feeling building & site imagery.
- **Aspect ratios:** hero 16:9 / 21:9; cards 4:3 or 3:2; portraits 1:1 or 4:5.
- **Placeholder convention:** every `<Image>` gets `data-placeholder="unsplash"` + a `// TODO: replace with real EA+ photo` note.

### 4.3 Brand graphics & data-viz
- **Signature graphic motif:** thin **blue→green gradient lines / connected-node paths** evoking energy flow & process ("aus einer Hand"). Use as section dividers, background accents (very subtle), and to connect process steps.
- **Data is a visual asset:** render the proof numbers as **stat blocks with count-up** and simple **charts** (bar/area/radial) using the CI palette — e.g. KfW funding ceilings, n50 values, CO₂ limits, % of experts. Keep charts minimal, labelled in German.

---

## 5. Components

> Specs below are the canonical component contracts. States: **default / hover / active / focus-visible / disabled**. All interactive elements: visible focus ring (`--ring-focus`), min touch target 44×44px.

### 5.1 Buttons
| Variant | Look | Use |
|---|---|---|
| **Primary** | bg `--blue-700`, text white, `--radius-md`, `--shadow-brand`; hover `--blue-600` + lift; subtle sheen on hover | „Termin vereinbaren", primary CTAs |
| **Accent** | bg `--green-700`, text white; hover `--green-600` | secondary conversion („Kostenloses Erstgespräch") |
| **Secondary/Outline** | transparent, 1.5px border `--blue-700`, text `--blue-700`; hover bg `--blue-50` | „Mehr erfahren", tertiary |
| **Ghost** | text-only `--blue-700`, underline-on-hover | inline/low-emphasis |
| **On-dark** | white bg / `--blue-900` text, or outline white | buttons on dark/photo sections |

- Sizes: sm (36px) / md (44px) / lg (52px). Icon-left or icon-right (Lucide arrow for "Mehr erfahren").
- Optional **Reactbits `Star Border`** treatment on the single hero primary CTA for a premium glow (use once, not everywhere).

### 5.2 Links
Body links: `--blue-600`, underline with 2px offset; hover `--blue-700`. Nav links: `--ink-700`, active = `--blue-700` with animated underline.

### 5.3 Cards
- **Service card:** icon chip + service name (H3) + 1-line German description + „Mehr erfahren →". White, `--radius-lg`, `--shadow-sm`, hairline border; hover → lift + border tints to `--blue-200` + arrow slides. *(Reactbits `Spotlight Card` or `Tilted Card` for feature variants — used selectively.)*
- **Reference/Projekt card:** image (Unsplash) + client name + Leistungs-Tags (pills) + scope; hover zoom on image.
- **Team card:** square portrait + name + role + email/contact icon; subtle hover.
- **Stat card:** big `--fs-stat` number (count-up) + label + optional icon; blue or eco gradient accent.
- **Praxistipp callout:** `--amber-100` bg, amber left border (4px), lightbulb icon, label „Praxistipp".
- **Standort card:** city, address, email alias, mini-map thumbnail.

### 5.4 Forms & inputs (Kontakt, Karriere)
- Inputs: white bg, 1.5px `--ink-200` border, `--radius-md`, 44px+ height, label above (not placeholder-only). Focus → border `--blue-500` + `--ring-focus`. Error = `--color-danger` text + border. Generous spacing.
- Required German legal: DSGVO consent checkbox + link to Datenschutz; honeypot/anti-spam. Success state with confirmation message.

### 5.5 Navigation — Header
- **Sticky, slim header**, white/blur background (`backdrop-filter`), subtle shadow on scroll; transparent over hero at top then solidifies.
- Left: **logo SVG** (existing). Center/right: nav — `Leistungen` (mega-menu), `Über uns`, `Referenzen`, `Karriere`, `Kontakt`. Right: **Primary CTA „Termin vereinbaren"** + phone/WhatsApp icon.
- **Mega-menu „Leistungen":** 2-column dropdown listing all 7 services with icon + name + 3-word descriptor; promotes **QNG-flow** as a featured tile. *(Reactbits `Gooey Nav` optional for the top-level nav indicator — subtle.)*
- Mobile: hamburger → full-screen slide-in menu with accordion for Leistungen; persistent CTA pinned bottom.

### 5.6 Navigation — Footer (enriched vs. current sparse footer)
4–5 columns on dark `--blue-900`: (1) logo + claim + brief positioning + social (LinkedIn — to be added), (2) Leistungen quick-links (all 7), (3) Unternehmen (Über uns, Team, Referenzen, Karriere, Kontakt), (4) Standorte (6 + 2 partners) or contact block, (5) legal (Impressum, Datenschutz, Cookie-Richtlinie). Newsletter/contact CTA optional. Bottom bar: © + legal links + „Made with…" optional. Blue→green hairline on top edge.

### 5.7 Other patterns
- **FAQ accordion** (service pages have FAQs): animated expand, `+/−` or chevron, one-open or multi-open; smooth height via Motion.
- **Tabs / Stepper** for the multi-step processes (every service has a 4–6 step Ablauf, e.g. BzA → BnD): horizontal stepper on desktop, vertical timeline on mobile. *(Reactbits `Stepper`.)*
- **Trust badge strip / Logo loop:** dena · DGNB · KfW · BAFA · QNG · IHK — `--ink-100` strip, grayscale→color on hover. *(Reactbits `Logo Loop` / marquee.)*
- **Testimonial / Google reviews:** card carousel; keep the real Google rating. *(Reactbits `Carousel`.)*
- **Breadcrumbs** on sub-pages.
- **Cookie consent banner** (DSGVO-compliant, minimal, brand-styled).
- **Back-to-top** + scroll progress indicator (thin eco-gradient bar).

---

## 6. Motion & Interaction

> **Library:** **Motion** (`motion.dev`, package `motion`, `motion/react` — the successor to Framer Motion; hardware-accelerated scroll/gesture/layout) as the primary animation layer, complemented by **Reactbits** components (which bundle their own GSAP/Motion/WebGL effects). See `03-development-brief.md` for the section→component map.

### 6.1 Tokens
```
--ease-out    : cubic-bezier(.16, 1, .3, 1);     /* signature smooth ease */
--ease-in-out : cubic-bezier(.65, 0, .35, 1);
--dur-fast    : 150ms;   /* hovers, taps */
--dur-base    : 300ms;   /* most transitions */
--dur-slow    : 600ms;   /* reveals, hero */
--dur-xslow   : 900ms;   /* large hero/cinematic */
```

### 6.2 Principles
- **Entrance reveals:** fade + 16–24px rise on scroll-into-view, staggered 60–80ms across grids. Once per element (no replay loops).
- **Hover feedback** everywhere interactive: lift, color shift, arrow nudge, image zoom — all ≤ `--dur-base`.
- **Hero:** headline word/line reveal (Split/Blur text), subtle background motion (see hero spec), auto-advancing slider with smooth crossfade/slide.
- **Numbers count up** when scrolled into view.
- **Scroll-linked** subtle parallax on hero media and decorative gradient shapes — keep gentle (≤ 8% movement).
- **Page transitions:** quick fade/slide (Next.js) — premium but fast (≤ 400ms).
- **Performance:** animate only `transform` & `opacity`. No layout thrash. Lazy-mount heavy WebGL backgrounds; pause off-screen.
- **Accessibility:** honour `prefers-reduced-motion: reduce` → disable parallax, autoplay, large transforms; keep essential opacity fades only. Slider must be pausable and keyboard-operable.

---

## 7. Accessibility & Quality Baseline

- **WCAG 2.2 AA.** Text contrast ≥ 4.5:1 (≥ 3:1 large). Enforce the green-text rule (§1.3).
- Semantic HTML5 landmarks, one `<h1>` per page, logical heading order.
- Full keyboard operability + visible focus (`--ring-focus`). Skip-to-content link.
- `lang="de"`; alt text in German on all meaningful images; decorative images `alt=""`.
- Slider/carousel: ARIA roles, pause control, no reliance on autoplay, swipe + arrows + keyboard.
- Forms: associated labels, error messaging, DSGVO consent.
- Respect reduced-motion; no content conveyed by color alone.

---

## 8. Quick token reference (`:root`)

```css
:root{
  /* brand */
  --brand-blue:#105388; --brand-green:#8DC63F; --brand-amber:#FFCD57;
  /* blue */
  --blue-950:#061E33; --blue-900:#082A45; --blue-800:#0C3A5E; --blue-700:#105388;
  --blue-600:#1466A8; --blue-500:#1E87C9; --blue-200:#B9D6EA; --blue-100:#E2EEF6; --blue-50:#F0F6FB;
  /* green */
  --green-800:#3C6E16; --green-700:#4E8A1F; --green-600:#6BA82E; --green-500:#8DC63F;
  --green-400:#A6D45F; --green-100:#EAF5D8; --green-50:#F4FAEA;
  /* amber */
  --amber-500:#FFCD57; --amber-700:#B4791A; --amber-100:#FFF4D6;
  /* ink / neutral */
  --ink-900:#0F1B2D; --ink-800:#1E293B; --ink-700:#334155; --ink-600:#475569; --ink-500:#67768E;
  --ink-300:#CBD5E1; --ink-200:#E2E8F0; --ink-100:#F2F5F7; --ink-50:#F8FAFC;
  --surface-alt:#F9F6FE; --white:#FFFFFF;
  /* semantic */
  --color-bg:var(--white); --color-bg-subtle:var(--ink-100); --color-bg-dark:var(--blue-900);
  --color-text:var(--ink-800); --color-text-muted:var(--ink-500); --color-heading:var(--ink-900);
  --color-primary:var(--blue-700); --color-primary-hover:var(--blue-600);
  --color-accent:var(--green-700); --color-accent-fill:var(--green-500);
  --color-link:var(--blue-600); --color-border:var(--ink-200); --color-focus-ring:var(--blue-500);
  /* radius */
  --radius-sm:8px; --radius-md:14px; --radius-lg:20px; --radius-xl:28px; --radius-pill:999px;
  /* motion */
  --ease-out:cubic-bezier(.16,1,.3,1); --ease-in-out:cubic-bezier(.65,0,.35,1);
  --dur-fast:150ms; --dur-base:300ms; --dur-slow:600ms; --dur-xslow:900ms;
  /* type */
  --font-body:"Calibri","Carlito",system-ui,"Segoe UI",sans-serif;
  --font-display:"Cambria","Caladea",Georgia,serif;
}
```

> **Tailwind:** map these to `theme.extend.colors` (`blue.50…950`, `green.50…800`, `ink.50…900`, `amber`), `fontFamily.sans = var(--font-body)`, `fontFamily.display = var(--font-display)`, plus the radius/shadow/duration tokens. Keep CSS variables as the single source of truth; Tailwind references them.
