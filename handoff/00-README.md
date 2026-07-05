# EnergieAudit Plus — Website Redesign · Handoff-Paket

**Erstellt:** Juni 2026 · **Sprache der Website:** Deutsch · **Ziel:** premium, modern, dynamisch, „award-winning" — und vertrauenswürdig für ein deutsches B2B-Energieberatungsunternehmen.

Dieses Paket ist die vollständige Übergabe vom Research bis zur Entwicklung. **Pipeline:**

```
Dieses Handoff  →  Claude design (Design-Generierung)  →  Iteration  →  Claude Code (Build)
```

---

## So nutzt du dieses Paket

1. **Claude design:** Füttere primär [`02-style-guide.md`](./02-style-guide.md) (Designsystem) + [`03-development-brief.md`](./03-development-brief.md) (Aufbau & Seiten). Beginne mit Homepage + Hero-Service-Slider (das Aushängeschild) und dem Service-Detail-Template.
2. **Iteration:** Offene Entscheidungen siehe unten + `03 §10`. Vor allem: Font-Pairing-Variante und Hero-Slider-Microcopy bestätigen.
3. **Claude Code:** Baue gemäß `03`. **Alle bestehenden Texte 1:1** aus [`/content`](./content) übernehmen — nicht umschreiben. Tech-Empfehlung: Next.js + Tailwind + Motion + Reactbits (siehe `03 §2`).

---

## Inhalt des Pakets

| Datei | Inhalt |
|---|---|
| [`00-README.md`](./00-README.md) | Dieses Dokument — Übersicht, Pipeline, Entscheidungen |
| [`01-company-research.md`](./01-company-research.md) | Verdichtetes Unternehmensprofil (Wer, Leistungen, Zielgruppen, Tonalität, Ist-CI, Lücken) |
| [`02-style-guide.md`](./02-style-guide.md) | Designsystem: Farben (Tokens), Typografie, Spacing, Komponenten, Motion, A11y |
| [`03-development-brief.md`](./03-development-brief.md) | IA/Sitemap, Seiten-Templates, **Hero-Slider-Spec**, Reactbits/Motion-Map, Tech, SEO, Phasen |
| [`content/*.md`](./content) | **Verbatim-Texte** aller Seiten (1:1, zur Wiederverwendung im Build) |

### `/content` — Verbatim-Texte (1:1)
`home.md` · `leistungen-uebersicht.md` · `neubau-energieberatung.md` · `bestandsgebaeude.md` · `fordermittelservice.md` · `lebenszyklusanalyse-lca.md` · `raumluftmessung-baubiologie.md` · `blower-door-test.md` · `nachhaltigkeitsaudit-qng-flow.md` · `gebaeudeenergieberatung.md` · `ueber-uns.md` · `team.md` · `referenzen.md` · `karriere.md` · `kontakt.md` · `impressum.md`
> **Datenschutz & Cookie-Richtlinie** sind sehr lang — beim Build verbatim direkt von den Live-URLs (`/datenschutzerklarung/`, `/cookie-richtlinie-eu/`) übernehmen und juristisch prüfen lassen.
> Quell-Eigenheiten/Tippfehler wurden bewusst 1:1 belassen (z. B. „Praxistip"). Vor Launch gegen die Live-Seite gegenlesen.

---

## Wichtigste Design-Entscheidungen (bereits abgestimmt)

- **Aesthetic:** „Clean Clean-Tech" — hell, viel Weißraum, **Marken-Blau + Grün auf Weiß**.
- **Farben:** bestehende CI **verfeinert & vertieft** (Anker bleiben: Blau `#105388`, Grün `#8DC63F`, Amber `#FFCD57`) + zugängliche Skalen + tiefes Navy für Premium-Sektionen. Tokens in `02`.
- **Typografie:** **Calibri** bleibt Markenschrift (Vorgabe GF). Web-Umsetzung über metrik-kompatible OFL-Klone **Carlito** (Calibri) + **Caladea** (Cambria) → identisches Rendering auf allen Geräten. Empfohlenes Pairing: Calibri (Fließtext) + Cambria/Caladea (Headlines). Alternativen dokumentiert in `02 §2`.
- **Hero:** dynamischer, auto-laufender **Service-Slider** — pro Slide eine Leistung mit **kurzer Beschreibung** + CTA. Spec in `03 §5`.
- **Motion:** **Motion** (`motion.dev`, Nachfolger von Framer Motion) als Animationsbasis + **Reactbits**-Komponenten. Dezent, „prefers-reduced-motion" respektiert.
- **Bilder:** **Unsplash-Platzhalter** (klar markiert, vor Launch durch echte Fotos ersetzen).
- **Scope:** Schlüssel-Templates in der Tiefe + vollständige IA; restliche Seiten nutzen diese Templates.

## Offene Punkte (vor/während Build klären — Details in `03 §10`)
1. Font-Pairing-Variante (Default: Calibri + Cambria/Caladea).
2. Hero-Slider-Microcopy (Vorschlag in `03 §5.4`) freigeben.
3. URL-Struktur `/leistungen/*` + 301-Redirects (SEO).
4. CMS für Team/Referenzen/Blog? (Phase 2)
5. LinkedIn/Social anlegen & verlinken? (aktuell keine).
6. Blog/Insights jetzt oder Phase 2?
7. Echte Fotografie — Zeitplan zum Ersetzen der Platzhalter.
8. `/leistungen` + Legacy `/gebaeudeenergieberatung` zusammenführen.
9. Team-Daten konsolidieren (Rollen, Anzahl, GF).
10. Kontaktformular-Backend + Bookings-Einbindung.

---

## Leitprinzipien in einem Satz
**Vertrauen durch Klarheit, Premium durch Zurückhaltung, Beweis durch Zahlen — Blau führt, Grün akzentuiert, Weiß ist die Bühne.**
