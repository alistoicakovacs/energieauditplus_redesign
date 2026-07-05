# Design System → Figma Library · Build Plan

**Date:** 2026-06-26 · **Project:** EnergieAudit Plus website redesign
**Source of truth:** `handoff/02-style-guide.md` (approved design spec)
**Deliverable:** A Figma design library ("EnergieAudit Plus — Design System") built via the Figma MCP, to serve as the visual source of truth for designing pages before/alongside the Next.js build.

## Decisions (confirmed with user)

- **Deliverable format:** Figma design library (not coded foundation / not standalone HTML).
- **Scope:** Foundations + core components (~10). Not foundations-only, not the full §5 set.
- **Font pairing:** Primary — **Carlito** (Calibri clone, OFL) for body/UI, **Caladea** (Cambria clone, OFL) for display headings. Chosen because both are available natively in Figma (Google Fonts), so the file renders identically for anyone who opens it, while staying metric-true to the brand's Calibri/Cambria. Code stage keeps `"Calibri","Carlito",…` / `"Cambria","Caladea",…` stacks.

## Library structure

### 1. Foundations — Variables
- **Color / primitive:** `blue 50,100,200,500,600,700,800,900,950` · `green 50,100,400,500,600,700,800` · `amber 100,500,700` · `ink 50,100,200,300,500,600,700,800,900` · `surface-alt` · `white`. Values verbatim from §8.
- **Color / semantic (aliased to primitives):** `bg, bg-subtle, bg-brand, bg-eco, bg-dark, text, text-muted, text-invert, heading, primary, primary-hover, accent, accent-fill, link, border, focus-ring, success, warning, danger`.
- **Spacing:** `space-1…11` = 4,8,12,16,24,32,48,64,96,128,160 px.
- **Radius:** `sm 8 · md 14 · lg 20 · xl 28 · pill 999`.

### 2. Text styles (desktop max sizes; clamp range recorded in each style description)
| Style | Font | Size/px | Weight | LH | Tracking |
|---|---|---|---|---|---|
| Display | Caladea | 72 | 700 | 1.05 | -0.02em |
| H1 | Caladea | 52 | 700 | 1.1 | -0.015em |
| H2 | Caladea | 40 | 700 | 1.15 | -0.01em |
| H3 | Caladea | 28 | 600 | 1.2 | -0.005em |
| H4 | Caladea | 20 | 600 | 1.25 | 0 |
| Stat | Caladea | 64 | 700 | 1.0 | -0.02em |
| Lead | Carlito | 22 | 400 | 1.5 | 0 |
| Body | Carlito | 17 | 400 | 1.65 | 0 |
| Small | Carlito | 15 | 400 | 1.5 | 0 |
| Overline | Carlito | 13 | 600 | 1.2 | +0.12em, UPPERCASE |

### 3. Effect & layout styles
- **Shadows (effect styles):** `shadow-xs/sm/md/lg/brand`, `ring-focus`. Values from §3.4.
- **Layout grid style:** 12 columns, 1280 container, 24px gutter.

### 4. Core components (variant sets where relevant)
- **Button** — variant (Primary/Accent/Outline/Ghost/On-dark) × size (sm 36 / md 44 / lg 52) × state (default/hover/active/focus-300/disabled), optional leading/trailing Lucide icon.
- **Link** — Body link + Nav link, with hover/active states.
- **Overline/eyebrow** — uppercase label in blue-700 or green-700.
- **Card / Service** — icon chip + H3 + 1-line desc + "Mehr erfahren →"; default + hover (lift, border→blue-200).
- **Card / Reference** — image + client + Leistungs-tags + scope.
- **Card / Team** — square portrait + name + role + contact icon.
- **Card / Stat** — big Stat number + label + eco-gradient accent.
- **Form input** — label-above; default/focus/error/disabled.
- **Badge / pill** — tag (blue-100 / green-100 tints).
- **Header** — sticky slim, logo + nav + CTA + phone; Leistungen mega-menu; desktop + mobile (hamburger) frames.
- **Footer** — dark `blue-900`, 4–5 columns, eco-gradient top edge.
- **CTA band** — "Bereit für Ihr Projekt? Termin vereinbaren" section block.

### 5. Cover / documentation page
- Usage notes, 70/20/10 color ratio guide, the green-text contrast rule (§1.3: never `green-500` for text on white).
- **Gradient swatches** (`grad-brand, grad-eco, grad-hero-veil, grad-dark, grad-sheen`) — rendered as fills, since Figma variables can't store gradients.
- **Motion tokens** (`ease-out, ease-in-out, dur-fast/base/slow/xslow`) documented as a reference frame for the code stage.

## Known caveats (intentional, lossless to the code stage)
- Gradients & motion easings/durations cannot be Figma variables → captured as documented swatches/reference on the cover page.
- Fluid `clamp()` type collapses to fixed px in Figma → desktop max used as the style value, full clamp recorded in each style's description.
- Not a git repository → this doc is saved but not committed.

## Out of scope (this pass)
Full §5 component set (FAQ accordion, stepper/timeline, logo loop, testimonial carousel, breadcrumbs, cookie banner, Praxistipp callout, Standort card, floating contact, back-to-top, scroll progress) — deferred to a later pass.

## Open items carried from handoff (not blocking this build)
Hero-slider microcopy · URL structure & 301s · CMS for Team/Referenzen · real photography · contact-form backend. These affect the site build, not the design-system library.

---

## Build result (2026-06-26) — DELIVERED

**Figma file:** EnergieAudit Plus — Design System · `fileKey 9LNbES4qpDoHgOmBxzIoWP`
https://www.figma.com/design/9LNbES4qpDoHgOmBxzIoWP

**Pages (in order):** Cover · Foundations · ———  Components  ——— · Button · Link & Overline · Badge · Form Input · Cards · Header · Footer · CTA Band · ———  Utilities  ——— · Icons

**Foundations:** 66 variables (31 primitive + 19 semantic colors, 11 spacing, 5 radius; semantic aliased to primitives, targeted scopes, WEB `var(--…)` code syntax), 10 text styles (Caladea/Carlito), 6 effect styles (5 shadows + Focus ring), 0 broken aliases. Gradients + motion + usage rules documented on the Foundations page.

**Components (21 definitions):** Button (15: Variant×Size, Label/Show-Icon props) · Link (4) · Overline (2) · Badge (4) · Form Input (4) · Cards Service/Stat/Reference/Team · Header Desktop/Mobile · Footer · CTA Band · 8 Lucide icons. All visual props bound to variables; Header/CTA reuse Button instances.

**Light-only:** no Dark mode (brand mandates white canvas); dark premium surfaces use `color/bg-dark` (blue-900).

### Technical learnings (for resuming / extending the file)
- **`node.resize(w,h)` resets an auto-layout frame's sizing modes to FIXED.** After any `resize()` on a hugging container, re-set `primaryAxisSizingMode='AUTO'` (or `layoutSizingVertical='HUG'`), else the frame collapses and content overflows/clips. Bit Cards + Footer during the build; both fixed.
- **Paint binding: prefer the primitive variable for tinted fills.** Binding a paint to an aliased *semantic* color occasionally leaves the paint rendering its base color (black) instead of resolving (hit on a Badge `color/bg-subtle` fill). Binding to the underlying primitive (e.g. `ink/100`) resolves reliably. Build the lookup by `variable.name`, not by the `dsb/key` plugin-data (primitives are keyed `primitive/<name>` there).
- **Fonts:** Carlito + Caladea are available in Figma but ship only Regular + Bold; spec weight 600 maps to Bold.
- **`use_figma` is atomic** — a script that throws makes no changes; safe to fix and re-run.

### Not in this pass (next steps)
Code Connect mappings (needs the Next.js codebase) · full §5 component set (FAQ accordion, stepper, logo loop, carousel, breadcrumbs, cookie banner, Praxistipp callout, Standort card, floating contact, back-to-top, scroll progress) · publishing the file as a shared Team Library.
