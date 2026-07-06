# Handoff — EnergieAudit Plus website redesign

**Date:** 2026-07-06 · **Workspace:** `C:\Users\alist\desktop\website redesign`
**Stack:** React 19 + Vite 6 SSG (prerender), CSS Modules + design tokens, DSGVO-strict (no external CDNs; self-hosted fonts).

---

## What this session did (all committed as `15968e0` on `main`)

Full detail is in the commit message + diff — don't re-derive; read `git show 15968e0`. Summary:

1. **Display font → Space Grotesk** (self-hosted, SIL OFL, weights 600/700 only). Body stays **Calibri**. See `src/styles/fonts.css`, `src/styles/tokens.css` (`--font-display`), preload swap in `index.html`.
2. **New `ReviewProof` component** (`src/components/patterns/ReviewProof.{jsx,module.css}`) — replaced the old `TrustStrip` marquee in the under-hero slot. Stacked **white** overlapping monogram bubbles (reviewer initials derived from `src/content/home.js` `reviews.items`) + gold stars + "5,0 aus 50+ Google-Bewertungen" + inline Google "G" SVG. Left-aligned, transparent strip, subtle drop-shadow. Whole band links to `#kundenstimmen` (the existing reviews carousel section #10, which got an `id`).
3. **`TrustStrip` gained `variant="static"`** — the certifier logos (dena/DGNB/KfW/BAFA/QNG/IHK) were **relocated**, not deleted: now a quiet static row above the final CTA on the homepage. Its label uses the display font.
4. **Unified content width → 1360px.** `--container` AND `--container-wide` both set to `1360px` (was 1280/1440). Header, hero, and all sections now share one column.
5. **Hero alignment** (`src/components/patterns/HeroSlider.module.css`): `.content` → `flex:1; max-width:none` + desktop cap changed `min(680px,52vw)` → `100%` so the content column matches the page width (right edge lines up with cards). Subtitle `.line` `46ch` → `39rem` to match the body's 72ch/~620px prose column (also fixes the "Blower-Door" line-break). Controls bar: moved horizontal padding off `.controls` onto `.controlsRow` (now mirrors the `Container` recipe) so arrows/indicators/progress align to the content column.
6. **Calmer backgrounds** on the homepage: dropped `blue-tint` (Standorte → `subtle`), Ablauf `subtle` → white. Palette is now white / subtle / dark only.

**Verification:** `npm run build` passed clean (15 routes prerendered + slash-less twins + sitemap, CSP guard OK). Visual/measurement checks done in Chrome at desktop width.

---

## Git / GitHub state

- **Remote:** `https://github.com/alistoicakovacs/energieauditplus_redesign.git`
- **`main`** = source project (`15968e0`, on top of prior history). Local branch is `master`, tracking `origin/main`.
- **`deploy`** = built static `dist` output (`a22b7d3`).
- **Intentionally untracked / NOT committed** (respecting the repo's existing pattern): proprietary **Calibri** fonts (`public/fonts/calibri-latin-*.woff2`, `*.TTF`, `calibril.ttf`) and a stray `ssgdiff.mjs`. Space Grotesk woff2 + `public/logos/` WERE committed.

---

## Deployment plan

- **Preview NOW:** user drags the **`dist/`** folder onto https://app.netlify.com/drop (root-served → current `base: /` build works unchanged). GitHub Pages is NOT viable for this project repo without base-path surgery (subpath breaks `/assets`, `/fonts`, `/logos`) — deliberately avoided.
- **Final (Strato basic hosting, pending client confirmation):** serves at a domain root, so `base: /` is already correct — upload `dist/` contents to the web root. No rebuild needed.

---

## OPEN ITEMS (need user/client input)

1. **⚠️ Calibri licensing — awaiting user answer.** The `deploy` branch and the `dist` for Netlify contain the proprietary Calibri `.woff2`. If the GitHub repo is **public**, that redistributes a licensed Microsoft font. User must confirm their Calibri Web license covers it, or make the repo private / strip Calibri. I offered to strip Calibri from the `deploy` branch — **not yet done**.
2. **ReviewProof placeholders.** `count="50+"` is a placeholder and `href="#kundenstimmen"` is an in-page anchor (set in `src/pages/home/HomePage.jsx`). Swap for the real Google review count + Google Business review URL when available.
3. Session's work is committed but the user has **not** explicitly asked to keep/merge anything further — repo is in the state above.

---

## Environment gotchas (save time)

- **Vite dev server binds to `localhost` / IPv6 `[::1]` here — use `http://localhost:5173`, NOT `127.0.0.1`** (127.0.0.1 returned connection-refused this session; this is the *opposite* of an older memory note about targeting 127.0.0.1 — trust localhost for this project's dev server).
- Chrome MCP: the CSS viewport (from `getBoundingClientRect`) and screenshot pixel coords differ due to display scaling (DPR ~2 at times); `resize_window` changes the effective CSS viewport. Measure element rects via `javascript_tool` rather than eyeballing screenshot coordinates.
- Page uses a custom scroll manager — `window.scrollTo`/`scrollTop` get reset; scroll via the `computer` tool's wheel action instead.

---

## Suggested skills for the next session

- **`update-config` / memory update** — persist this session's outcomes to `MEMORY.md` (see below) before fully closing out.
- **`verify` / `run`** — if making further UI changes, drive the app (dev server on localhost:5173) to confirm, don't rely on tests alone.
- **`code-review`** — before any further merge/commit of new work.
- **`superpowers:finishing-a-development-branch`** — if the user wants to formally wrap/merge the branch.

## Memory to record (project memory at `.../memory/MEMORY.md`)
- Space Grotesk is now the display font (Calibri body); ReviewProof band replaced the certifier marquee; certifiers relocated static above CTA.
- Site content width unified to 1360px (`--container` + `--container-wide`).
- GitHub repo `energieauditplus_redesign`: `main`=source, `deploy`=dist. Preview via Netlify Drop; final host = Strato (root, base `/`).
- Open: Calibri licensing on public repo/dist; ReviewProof count/href placeholders.
