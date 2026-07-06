import {
  Clock,
  GraduationCap,
  Handshake,
  Laptop,
  TrendingUp,
  UserCheck,
  Workflow,
  Wrench,
} from 'lucide-react';

/**
 * /karriere — page copy (plan §6.4). Consumed by
 * src/pages/karriere/KarrierePage.jsx.
 *
 * ANREDE „DU": this page uses the informal „du" THROUGHOUT (plan §6.4 +
 * karriere.md). Verbatim source copy is kept 1:1; new microcopy is „du" too.
 *
 * Copy provenance:
 * - handoff/content/karriere.md → all headings, value cards, the open
 *   position, the Ausbildung, benefit labels and the „Jetzt bewerben" /
 *   „Termin vereinbaren" button labels are VERBATIM 1:1, never rewritten.
 * - Bewerbungs-Ablauf (`ablauf`), section eyebrows, the „Deine Vorteile"
 *   heading (source: „Icon-Leiste, ohne eigene Überschrift im Original"),
 *   the ctaBand and all mailto subjects are NEW COPY: review — flagged
 *   inline, written in „du".
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SOURCE QUIRKS (karriere.md) — kept VERBATIM, reported to the client, NOT
 * silently corrected:
 *  A. „erwarten Sie" in the hero's second paragraph (karriere.md line 11)
 *     uses the FORMAL „Sie" even though the source header states the page is
 *     „du" throughout. This is the one unflagged „Sie" on an otherwise „du"
 *     page — confirm whether it should read „erwarten dich".
 *  B. „Ihre Profil" heading in the Ausbildung block (karriere.md line 62) —
 *     flagged in the source itself („so im Original"): wrong possessive
 *     („Ihre") and formal register on a „du" page; likely „Dein Profil".
 *  C. „Planungenergieeffizienter" in the open-positions intro (line 29) —
 *     a missing space („Planung energieeffizienter"). Source typo, kept 1:1.
 * Application funnel: per §6.4 the form backend is another agent's work and
 * not available here, so every application CTA is a `mailto:` (no dependency).
 * TODO: it could become the shared Kontakt form later.
 * ─────────────────────────────────────────────────────────────────────────
 */

const APPLY_EMAIL = 'team@ea-plus.de'; // footer team(at)ea-plus.de → team.md
/** Build a mailto: with a pre-filled subject (subjects are NEW COPY: review). */
const applyHref = (subject) => `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(subject)}`;

/* §6.4 hero */
export const hero = {
  overline: 'Karriere', // verbatim karriere.md (section label / nav term)
  // verbatim karriere.md („Karriere mit Sinn, Entwicklung und Verantwortung");
  // rendered as the H1 (stronger claim than the source's plain „Karriere bei
  // EnergieAudit Plus", which the page <title> and breadcrumb already carry).
  title: 'Karriere mit Sinn, Entwicklung und Verantwortung',
  // verbatim karriere.md (two intro paragraphs). QUIRK A: „erwarten Sie" in
  // the 2nd paragraph is kept 1:1 (see module header).
  lead: [
    'Bei EnergieAudit Plus gestalten wir die Zukunft energieeffizienter Gebäude aktiv mit. Als interdisziplinäres Team aus Energieberatern, Ingenieuren, Projektmanagern und Organisationstalenten arbeiten wir täglich an nachhaltigen Lösungen für Wohn-, Gewerbe- und Industrieobjekte.',
    'Wir suchen Menschen, die Verantwortung übernehmen, mitdenken und gemeinsam mit uns wachsen möchten. Ob Berufseinstieg, Ausbildung oder nächste Karrierestufe — bei uns erwarten Sie moderne Arbeitsweisen, echte Entwicklungsmöglichkeiten und ein Team, das Zusammenarbeit lebt.',
  ],
  primaryCta: { label: 'Jetzt bewerben', href: applyHref('Bewerbung bei EnergieAudit Plus') }, // label verbatim
  secondaryCta: { label: 'Termin vereinbaren', to: '/kontakt' }, // label verbatim (source header button)
};

/* §6.4 Kultur/Werte — heading + 4 value cards verbatim */
export const werte = {
  overline: 'Kultur', // NEW COPY: review (eyebrow)
  heading: 'Unsere Werte', // verbatim karriere.md
  items: [
    {
      icon: Workflow,
      title: 'Lean Management als Unternehmenskultur', // verbatim
      text: 'Klare Prozesse, kurze Entscheidungswege und moderne Arbeitsweisen sorgen für effiziente Zusammenarbeit mit Fokus auf Qualität und Fortschritt.', // verbatim
    },
    {
      icon: Handshake,
      title: 'Verantwortung & Vertrauen', // verbatim
      text: 'Eigenverantwortliches Arbeiten, Vertrauen und Kommunikation auf Augenhöhe prägen unsere tägliche Zusammenarbeit im Team.', // verbatim
    },
    {
      icon: TrendingUp,
      title: 'Entwicklung statt Stillstand', // verbatim
      text: 'Wir fördern Weiterbildung, persönliche Entwicklung und neue Ideen — für langfristige Perspektiven in einer zukunftssicheren Branche.', // verbatim
    },
    {
      icon: Wrench,
      title: 'Praxisnahe Lösungen', // verbatim
      text: 'Wir setzen auf umsetzbare Lösungen mit echtem Mehrwert — praxisorientiert, effizient und nachvollziehbar.', // verbatim
    },
  ],
};

/* §6.4 Benefits — verbatim labels (source: „Icon-Leiste, ohne eigene
   Überschrift im Original"); the section heading is NEW COPY. */
export const vorteile = {
  overline: 'Benefits', // NEW COPY: review (eyebrow)
  heading: 'Deine Vorteile', // NEW COPY: review (source has no heading here)
  items: [
    { icon: Clock, title: 'Flexible Arbeitszeiten' }, // verbatim
    { icon: GraduationCap, title: 'Weiterbildung' }, // verbatim
    { icon: Laptop, title: 'Moderne Arbeitsplätze' }, // verbatim
    { icon: UserCheck, title: 'Eigenverantwortung' }, // verbatim
  ],
};

/* §6.4 Offene Stellenangebote — heading + intro + the one open position,
   all verbatim (QUIRK C: „Planungenergieeffizienter" kept 1:1). */
export const stelle = {
  overline: 'Jobs', // NEW COPY: review (eyebrow)
  heading: 'Offene Stellenangebote', // verbatim
  intro:
    'Unterstütze unser Team bei der Planungenergieeffizienter Gebäude und nachhaltiger Förderprojekte.', // verbatim (source typo kept 1:1)
  position: {
    title: 'Ingenieur / Technischer Mitarbeiter (m/w/d)', // verbatim
    meta: 'Vollzeit | Strausberg bei Berlin', // verbatim
    groups: [
      {
        heading: 'Deine Aufgaben', // verbatim
        items: [
          'Erstellung von Energieausweisen und Effizienznachweisen',
          'Beratung zu Fördermitteln und energetischen Standards',
          'Prüfung technischer Unterlagen und Bilanzierungen',
          'Abstimmung mit Bauherren, Architekten und Projektpartnern',
        ], // verbatim
      },
      {
        heading: 'Dein Profil', // verbatim
        items: [
          'Studium im Bereich Bauwesen, Gebäudetechnik oder vergleichbar',
          'Idealerweise Erfahrung in Energieberatung oder Bauwesen',
          'Kenntnisse im GEG und energetischen Berechnungen',
          'Strukturierte und selbstständige Arbeitsweise',
        ], // verbatim
      },
    ],
    apply: {
      label: 'Jetzt bewerben', // verbatim
      href: applyHref('Bewerbung: Ingenieur / Technischer Mitarbeiter (m/w/d)'),
    },
  },
};

/* §6.4 Ausbildung — heading + intro + the apprenticeship, all verbatim
   (QUIRK B: the „Ihre Profil" group heading is kept 1:1). */
export const ausbildung = {
  overline: 'Ausbildung', // NEW COPY: review (eyebrow)
  heading: 'Ausbildung bei EnergieAudit Plus', // verbatim
  intro:
    'Starte deine berufliche Zukunft in einem modernen Unternehmen mit echten Entwicklungsmöglichkeiten. Als anerkannter Ausbildungsbetrieb der IHK Brandenburg bieten wir praxisnahe Ausbildungsplätze mit direkter Einbindung in reale Projekte und Unternehmensprozesse.', // verbatim
  position: {
    title: 'Kauffrau für Büromanagement', // verbatim
    groups: [
      {
        heading: 'Du lernst bei uns', // verbatim
        items: [
          'Organisation und Bearbeitung von bürowirtschaftlichen Abläufen',
          'Kommunikation mit Kunden und Geschäftspartnern',
          'Terminplanung und Koordination von Abläufen',
          'Erstellung von Rechnungen und Angeboten',
          'Unterstützung in der Buchhaltung und Verwaltung',
          'Umgang mit modernen Büro- und Kommunikationssystemen',
        ], // verbatim
      },
      {
        heading: 'Ihre Profil', // verbatim (QUIRK B: source typo kept 1:1 — flag)
        items: [
          'Einen guten Schulabschluss (mindestens mittlere Reife)',
          'Interesse an kaufmännischen Tätigkeiten und Büroorganisation',
          'Grundkenntnisse in MS Office sind von Vorteil',
          'Sorgfältige und zuverlässige Arbeitsweise',
          'Freundliches Auftreten und Teamfähigkeit',
          'Gute Deutschkenntnisse in Wort und Schrift',
        ], // verbatim
      },
      {
        heading: 'Das bieten wir dir', // verbatim
        items: [
          'Eine abwechslungsreiche und praxisnahe Ausbildung',
          'Betreuung durch erfahrene Ausbilder',
          'Ein kollegiales und unterstützendes Team',
          'Gute Übernahmechancen nach der Ausbildung',
          'Möglichkeiten zur persönlichen und fachlichen Weiterentwicklung',
        ], // verbatim
      },
    ],
    apply: {
      label: 'Jetzt bewerben', // verbatim
      href: applyHref('Bewerbung: Ausbildung Kauffrau für Büromanagement'),
    },
  },
};

/* §6.4 Bewerbungs-Ablauf — NEW COPY: review (whole block, „du"). The source
   has no application process; these 3 steps describe the mailto path. */
export const ablauf = {
  overline: 'Bewerbung', // NEW COPY: review
  heading: 'So läuft deine Bewerbung', // NEW COPY: review
  intro: 'Unkompliziert und persönlich — in drei Schritten zu uns ins Team.', // NEW COPY: review
  steps: [
    {
      title: 'Bewirb dich', // NEW COPY: review
      text: 'Schick uns deine Unterlagen ganz einfach per E-Mail — Lebenslauf und relevante Zeugnisse genügen für den ersten Schritt.', // NEW COPY: review
    },
    {
      title: 'Lern uns kennen', // NEW COPY: review
      text: 'Passt dein Profil, melden wir uns zeitnah und laden dich zu einem persönlichen Gespräch ein — telefonisch oder bei uns vor Ort.', // NEW COPY: review
    },
    {
      title: 'Starte durch', // NEW COPY: review
      text: 'Stimmt die Chemie für beide Seiten, findest du bei uns einen sicheren Arbeitsplatz mit echten Entwicklungsmöglichkeiten.', // NEW COPY: review
    },
  ],
  // §6.4 general Initiativbewerbung path (mailto).
  apply: {
    label: 'Initiativbewerbung senden', // NEW COPY: review
    href: applyHref('Initiativbewerbung'),
  },
};

/* §6.4 closing CTABand — NEW COPY: review („du"). Default primary button is
   the site-wide „Termin vereinbaren" → /kontakt (CTABand default); the
   application mailto lives in the sections above. */
export const ctaBand = {
  title: 'Werde Teil unseres Teams.', // NEW COPY: review (claim, „du", ≤ 8 words)
  support: 'Keine passende Stelle dabei? Wir freuen uns auch über deine Initiativbewerbung.', // NEW COPY: review
};
