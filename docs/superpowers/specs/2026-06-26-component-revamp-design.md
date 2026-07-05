# Component Revamp — Design Spec

**Date:** 2026-06-26
**File:** EnergieAudit Plus — Design System · Figma `fileKey 9LNbES4qpDoHgOmBxzIoWP`
**Scope:** A genuine revamp (not a light touch-up) of three components — **Team Card**, **Header**, **Buttons** — plus a typography change to **Calibri**. Driven by the user's feedback that the prior pass looked too close to the existing site.

> **File state note (corrected):** A misleading `get_metadata` page-listing initially suggested the file held only a *Cover* page. A direct inspection proved otherwise — the full v1 library exists (Button, Cards incl. Card/Team, Header, Footer, etc., 66 variables across Primitives/Color/Spacing/Radius, 10 text styles, 6 effect styles, 8 Lucide icons). This work is therefore an **in-place revamp of the existing components**, not a fresh build. The current components were genuinely plain (serif names, single-bar header), which matches the user's "minor changes" complaint.

---

## 1. Typography — Calibri

- **Single-family system (style-guide "Alternative A"):** Calibri everywhere; hierarchy from weight + size + tracking. The Cambria/Caladea serif companion is **dropped** per the user's "fonts → Calibri" instruction.
- **Figma fonts:** Calibri renders natively on the user's Windows machine; the redistributable web clone is **Carlito** (Regular + Bold only in Figma). Build text styles on Carlito as the file-portable stand-in, stack `"Calibri","Carlito",system-ui,"Segoe UI",sans-serif` for code.
- Headings = Bold, tight tracking (−0.02em); body = Regular; overlines = Bold, uppercase, +0.11–0.14em tracking.

## 2. Brand tokens (unchanged foundations)

- **Blue** `#105388` (CI), scale 50–950. **Green** `#8DC63F` (CI fill) / `#4E8A1F` (green-700, accessible text). **Amber** `#FFCD57`. **Ink** scale `#0F1B2D`→`#F8FAFC`. White canvas.
- Signature accent = **blue→green** linear gradient (`#105388`→`#8DC63F`).
- Green-500 is **fills/accents only**, never text on white (contrast). Green-700 for green text/icons.

## 3. Team Card — "Direction B on white"

Premium energy mood from the dark-glass concept, rebuilt on a **white** card, following the user's reference card anatomy (angled photo → centered name → accent rule → compact icon row).

- **Container:** white, 1px `ink-200` border, radius 18px, soft shadow; hover = lift −8px + larger shadow + Reactbits **Spotlight Card** glow (green, cursor-follow).
- **Top accent:** 3px **blue→green** gradient bar along the card's top edge (the "energy" signature).
- **Photo:** ~240px, **diagonal clip** at the bottom (`polygon(0 0,100% 0,100% 100%,0 85%)`); glass **location pill** (map-pin icon + town) top-right. Monogram placeholder until real photos land.
- **Body (centered):** Name (Calibri Bold ~22px, ink-900) → 42×3px green-500 **rule** → role overline (green-700, uppercase, tracked) → credentials line (ink-600).
- **Actions:** circular icon buttons — **Mail, Phone, WhatsApp** (Lucide line icons, no emojis) — then a **Primary "Termin vereinbaren"** pill CTA (calendar + arrow).
- **Grid:** 4-up row on desktop; the card is the repeating unit.
- **Reactbits:** Spotlight Card (hover), Tilted Card (optional 3D tilt).

## 4. Header — "Direction 2: Two-Tier Trust + mega-menu"

- **Utility strip (top):** navy `blue-900`, thin. Left: phone + email (Lucide icons). Right: hours + locations (Mo–Fr 8–17 · Strausberg · Berlin · Güstrow).
- **Main bar:** white. Left: **logo** (gradient mark + "EnergieAudit**Plus**" wordmark, optional kicker "Gebäudeenergieberatung"). Center: nav — **Leistungen ▾**, Über uns, Referenzen, Karriere, Kontakt, with an animated blue→green underline on hover/active. Right: **WhatsApp** icon button (green) + **Primary "Termin vereinbaren"** CTA.
- **Leistungen mega-menu:** white panel, 4-column grid of the **7 services**, each = Lucide icon in a tinted chip (blue-100/green-100 alternating) + title + one-line desc, plus a dark "Alle Leistungen →" tile. Services: Neubau & Energieberatung, Bestandsgebäude, Fördermittelservice, Lebenszyklusanalyse (LCA), Raumluftmessung & Baubiologie, Blower-Door-Test, Nachhaltigkeitsaudit (QNG-flow).
- Sticky: condenses to a slim bar on scroll (build note for code).

## 5. Buttons — pill family

- **Shape:** fully rounded **pill** (`radius 999px`) across all variants and sizes. Icon buttons = circles.
- **Variants:** Primary (blue-700, white, shadow-brand, hover blue-600 + lift + light **sheen** sweep), Accent (green-700, white), Secondary/Outline (1.5px blue-700 border, hover blue-50), Ghost/Text (blue-700, hover blue-50).
- **Sizes:** S / M / L (padding + font scale; radius stays pill).
- **Icon buttons:** circular — Mail, Phone, WhatsApp (green) — + WhatsApp pill.
- **States:** default, hover (lift), active/pressed (darker, no lift), disabled (ink-100/ink-300), loading (spinner).
- **Star Border: removed** — too much. Hero CTA = Large primary + sheen + lift only. Reactbits reserved to **Magnet** (subtle hover pull) + **Click Spark** (tap), optional.

## 6. Icons

Lucide line style, stroke ~1.85, geometrically centered (verified: mail/phone/WhatsApp all center at 12,12 in a 24-box). No emoji anywhere. Set used: map-pin, mail, phone, message-circle/WhatsApp, calendar, arrow-right, chevron-down, clock + 7 service glyphs.

## 7. Build plan (Figma)

1. **Foundations:** create/confirm color variables (blue/green/amber/ink scales) + Calibri(Carlito) text styles (Display/H1–H3, Body, Overline, Caption) + effect styles (sm/md/lg shadow, brand shadow).
2. **Buttons** component set (variants × sizes × states) — built first; cards/header reuse it.
3. **Team Card** component (+ 4-up grid frame).
4. **Header** component (utility strip + main bar + Leistungen mega-menu variant).
5. Lay out on a clean "Components" page; keep the Cover page.

Eventual code target unchanged: Next.js 15 + Tailwind + Motion + Reactbits.
