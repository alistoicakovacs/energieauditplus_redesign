import {
  Building,
  Building2,
  DraftingCompass,
  Eye,
  Handshake,
  Home,
  Landmark,
  PackageCheck,
  Scale,
  Workflow,
} from 'lucide-react';
import { services } from '../lib/navigation.js';
import { heroSlides } from './heroSlides.js';

/**
 * Homepage content (plan §6.1) — single source for src/pages/home/HomePage.jsx.
 *
 * Copy provenance (per block, see inline comments):
 * - handoff/content/home.md      → verbatim 1:1, NEVER rewrite
 * - handoff/content/ueber-uns.md → verbatim 1:1 (USP texts, Ablauf intro)
 * - handoff/content/nachhaltigkeitsaudit-qng-flow.md → verbatim (QNG teaser)
 * - handoff/content/kontakt.md   → verbatim (Standorte)
 * - handoff/01-company-research.md → verbatim quotes (proof numbers)
 * - everything else is flagged NEW COPY: review
 */

/* ---------------------------------------------------------------- */
/* §6.1.3 Positionierung — heading + intro verbatim home.md          */
/* ---------------------------------------------------------------- */

export const welcome = {
  // verbatim home.md „Herzlich willkommen bei EnergieAudit Plus!"
  heading: 'Herzlich willkommen bei EnergieAudit Plus!',
  // verbatim home.md (welcome paragraph, 1:1)
  body:
    'Als erfahrenes Team aus Handwerksmeistern und Ingenieuren begleiten wir Ihr Unternehmen kompetent, partnerschaftlich und zuverlässig durch jedes Projekt. Wir verbinden fundiertes Know-how mit einer offenen, transparenten Arbeitsweise – damit Sie sich von Anfang an gut aufgehoben fühlen. Lernen Sie uns kennen als Komplettanbieter im Bereich Energieberatung und Nachhaltigkeitszertifizierung mit QNG. Erfahren Sie, was uns ausmacht.',
  // Button labels verbatim home.md (Buttons/CTAs under the welcome block).
  ctas: [
    { label: 'Ansprechpartner', to: '/ansprechpartner', variant: 'outline' },
    { label: 'Kostenloses Erstgespräch', to: '/kontakt', variant: 'primary' },
  ],
};

/* 5 USP cards — titles + texts verbatim handoff/content/ueber-uns.md.
   Icons are presentation only (decorative). */
export const usps = [
  {
    icon: Scale,
    title: 'Unabhängig beraten',
    text: 'Anbieterneutral, ohne Herstellerbindung und ohne Provisionen. Maßgeblich ist allein Ihr Projekt.',
  },
  {
    icon: Workflow,
    title: 'Schlanke Prozesse',
    text: 'Klare, einfache Abläufe ohne unnötige Bürokratie. Wir bündeln Nachweise, Fristen und Full-Service an einem Ort.',
  },
  {
    icon: PackageCheck,
    title: 'Alles aus einer Hand',
    text: 'Beratung, Audit und Zertifizierung aus einem Haus – weniger Schnittstellen, klare Verantwortung.',
  },
  {
    icon: Eye,
    title: 'Transparent und nachvollziehbar',
    text: 'Sie wissen jederzeit, wo Ihr Projekt steht. Wir sprechen offen über Möglichkeiten und Grenzen.',
  },
  {
    icon: Handshake,
    title: 'Partnerschaftlich und praxisnah',
    text: 'Wir denken mit und richten unsere Empfehlungen auf die Umsetzung am Bau aus.',
  },
];

// verbatim ueber-uns.md closing line („Kurz gesagt: …")
export const uspSummary = 'Kurz gesagt: ehrliche Beratung, klare Abläufe und belastbare Ergebnisse.';

/* ---------------------------------------------------------------- */
/* §6.1.4 Leistungen bento — names/routes from navigation.js          */
/* (verbatim kontakt.md nav), one-liners from the hero microcopy      */
/* (dev brief §5.4 — flagged PROPOSAL there, client sign-off pending) */
/* ---------------------------------------------------------------- */

const heroLineByRoute = Object.fromEntries(heroSlides.map((s) => [s.to, s.line]));

/** The 6 regular services (QNG-flow renders as the FeaturedCard instead). */
export const bentoServices = services
  .filter((service) => !service.featured)
  .map((service) => ({
    icon: service.icon,
    title: service.name, // verbatim home.md „Unsere Leistungen"
    description: heroLineByRoute[service.to], // dev brief §5.4 (verbatim)
    to: service.to,
  }));

export const bentoFeatured = {
  overline: 'Nachhaltigkeitsaudit', // NEW COPY: review (eyebrow)
  title: 'Nachhaltigkeitsaudit mit QNG-flow', // verbatim home.md
  // verbatim nachhaltigkeitsaudit-qng-flow.md (intro, first sentence)
  description:
    'Das Qualitätssiegel Nachhaltiges Gebäude (QNG) ist der staatliche Nachweis für nachhaltiges Bauen in Deutschland – und gleichzeitig der Schlüssel zur höchsten Förderstufe der KfW-Programme 297/298 „Klimafreundlicher Neubau".',
  cta: { label: 'Mehr erfahren', to: '/leistungen/qng-flow' }, // verbatim home.md
};

/** Embedded stat tile — numbers verbatim nachhaltigkeitsaudit-qng-flow.md. */
export const bentoStat = {
  value: 150000,
  prefix: 'bis zu',
  suffix: ' €',
  label: 'KfW-Förderkredit pro Wohneinheit',
};

/* ---------------------------------------------------------------- */
/* §6.1.5 Zielgruppen „Für wen" — NEW COPY: review (whole section,    */
/* audiences per plan §13.2; service links = real routes)             */
/* ---------------------------------------------------------------- */

export const zielgruppen = {
  overline: 'Für wen', // NEW COPY: review
  heading: 'Für wen wir arbeiten', // NEW COPY: review
  items: [
    {
      icon: Building2,
      title: 'Bauträger & Projektentwickler',
      // NEW COPY: review
      description:
        'Förderfähig planen, wirtschaftlich bauen: Nachweise, Ökobilanz und Zertifizierung termingerecht aus einer Hand.',
      links: [
        { label: 'Nachhaltigkeitsaudit mit QNG-flow', to: '/leistungen/qng-flow' },
        { label: 'Neubau & Energieberatung', to: '/leistungen/neubau-energieberatung' },
        { label: 'Lebenszyklusanalyse (LCA)', to: '/leistungen/lebenszyklusanalyse-lca' },
      ],
    },
    {
      icon: DraftingCompass,
      title: 'Architekten & Planer',
      // NEW COPY: review
      description:
        'Wir ergänzen Ihre Planung um Energiekonzept, Bauphysik und normgerechte Nachweise — abgestimmt auf Ihre Termine.',
      links: [
        { label: 'Neubau & Energieberatung', to: '/leistungen/neubau-energieberatung' },
        { label: 'Lebenszyklusanalyse (LCA)', to: '/leistungen/lebenszyklusanalyse-lca' },
        { label: 'Blower-Door-Test', to: '/leistungen/blower-door-test' },
      ],
    },
    {
      icon: Building,
      title: 'Wohnungswirtschaft',
      // NEW COPY: review
      description:
        'Bestände strategisch sanieren: mit Sanierungsfahrplan, maximaler Förderung und geprüfter Umsetzung.',
      links: [
        { label: 'Energieberatung für Bestandsgebäude', to: '/leistungen/bestandsgebaeude' },
        { label: 'Fördermittelservice', to: '/leistungen/fordermittelservice' },
        { label: 'Nachhaltigkeitsaudit mit QNG-flow', to: '/leistungen/qng-flow' },
      ],
    },
    {
      icon: Landmark,
      title: 'Kommunen',
      // NEW COPY: review
      description:
        'Energieberatung für kommunale Gebäude — unabhängig, transparent und förderkonform.',
      links: [
        { label: 'Energieberatung für Bestandsgebäude', to: '/leistungen/bestandsgebaeude' },
        { label: 'Fördermittelservice', to: '/leistungen/fordermittelservice' },
        { label: 'Neubau & Energieberatung', to: '/leistungen/neubau-energieberatung' },
      ],
    },
    {
      icon: Home,
      title: 'Private Bauherren',
      // NEW COPY: review
      description:
        'Vom Erstgespräch bis zur Förderauszahlung — verständlich erklärt und persönlich begleitet.',
      links: [
        { label: 'Neubau & Energieberatung', to: '/leistungen/neubau-energieberatung' },
        { label: 'Energieberatung für Bestandsgebäude', to: '/leistungen/bestandsgebaeude' },
        { label: 'Raumluftmessung & Baubiologie', to: '/leistungen/raumluftmessung-baubiologie' },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- */
/* §6.1.6 Kinetic positioning statement — NEW COPY: review            */
/* (verb-led statement, the plan's §6.1.6 example wording)            */
/* ---------------------------------------------------------------- */

export const kineticStatement =
  'Energieeffizienz ist keine Kür mehr. Sie ist die Grundlage jedes förderfähigen Projekts.';

/* ---------------------------------------------------------------- */
/* §6.1.7 StatBand — proof numbers                                    */
/* ---------------------------------------------------------------- */

export const statBand = {
  overline: 'Zahlen & Fakten', // NEW COPY: review
  title: 'Zahlen, die für uns sprechen.', // NEW COPY: review (claim ≤ 8 words)
  stats: [
    {
      // company research §2 (verbatim quote): dena-gelistet in „ca. 5 % aller
      // Energieberater, die Sie bei jedem Gebäude unterstützen können."
      value: 5,
      prefix: 'ca. ',
      suffix: ' %',
      label: 'aller Energieberater: dena-gelistet für Wohngebäude, Nichtwohngebäude und Denkmal',
    },
    {
      // verbatim nachhaltigkeitsaudit-qng-flow.md („bis zu 150.000 € pro Wohneinheit")
      value: 150000,
      prefix: 'bis zu ',
      suffix: ' €',
      label: 'KfW-Förderkredit pro Wohneinheit',
    },
    {
      // kontakt.md: 6 eigene Standorte (plus Partnerstandorte, see standorte below)
      value: 6,
      label: 'eigene Standorte — plus Partner im Westen und Süden', // NEW COPY: review
    },
    {
      // team.md: 12 Teammitglieder listed
      value: 12,
      label: 'Expertinnen & Experten im Team',
    },
  ],
};

/* ---------------------------------------------------------------- */
/* §6.1.8 QNG-flow product teaser — verbatim                          */
/* handoff/content/nachhaltigkeitsaudit-qng-flow.md                   */
/* ---------------------------------------------------------------- */

export const qngTeaser = {
  overline: 'Unsere eigene Entwicklung', // verbatim fragment (section heading)
  title: 'Nachhaltigkeit muss nicht kompliziert sein.', // verbatim (also hero slide 7 claim)
  // verbatim nachhaltigkeitsaudit-qng-flow.md
  body:
    'Mit QNG-flow haben wir eine digitale Plattform, die den gesamten Weg zur Nachhaltigkeitszertifizierung klarer, einfacher und transparenter macht.',
  // verbatim nachhaltigkeitsaudit-qng-flow.md (intro, closing sentence)
  proof:
    'So sichern Sie sich bis zu 150.000 € KfW-Förderkredit pro Wohneinheit und einen attraktiven Tilgungszuschuss.',
  cta: { label: 'Mehr erfahren', to: '/leistungen/qng-flow' }, // verbatim home.md
  image: {
    stem: '/images/hero/07-qng-flow',
    alt: 'Mehrfamilienhaus mit Holzfassade – nachhaltige Bauweise', // NEW COPY: review (placeholder photo)
  },
};

/* ---------------------------------------------------------------- */
/* §6.1.9 Ablauf — 4 steps                                            */
/* ---------------------------------------------------------------- */

export const ablauf = {
  overline: 'Ablauf', // NEW COPY: review
  heading: 'Ihr Weg zur Förderung', // NEW COPY: review
  // verbatim ueber-uns.md (intro paragraph, closing sentence)
  intro:
    'Von der ersten Bestandsaufnahme über die Nachweise für Baugenehmigung und Fördermittel bis zur Auszahlung stehen wir an Ihrer Seite.',
  // Step titles per plan §6.1.9; step texts NEW COPY: review
  steps: [
    { title: 'Erstgespräch', text: 'Kostenlos und unverbindlich: Wir klären Ziel, Gebäude und Förderlage.' },
    { title: 'Analyse', text: 'Bestandsaufnahme und Energiekonzept — belastbare Zahlen als Entscheidungsgrundlage.' },
    { title: 'Nachweise', text: 'Alle Nachweise für Baugenehmigung, KfW und BAFA — erstellt aus einer Hand.' },
    { title: 'Förderauszahlung', text: 'Wir begleiten die Umsetzung bis zur Auszahlung Ihrer Fördermittel.' },
  ],
  cta: { label: 'Kostenloses Erstgespräch', to: '/kontakt' }, // verbatim home.md button
};

/* ---------------------------------------------------------------- */
/* §6.1.10 Google reviews — verbatim home.md (Trustindex widget,      */
/* Stand 25.06.2026). Quotes 1:1 including reviewer typos; the        */
/* Trustindex boilerplate sentence and „Gepostet auf Google" are      */
/* widget chrome, not review text. rating: the widget displays these  */
/* as 5-star Google reviews — verify against the live widget.         */
/* ---------------------------------------------------------------- */

export const reviews = {
  overline: 'Kundenstimmen', // NEW COPY: review
  heading: 'Google-Bewertungen', // verbatim home.md (section heading)
  note: 'Stand: 25.06.2026', // provenance note from home.md header
  items: [
    {
      quote:
        'Das Team von EnergieAudit ist absolut professionell, stets sehr gut erreichbar und stand uns bei unserem schwierigen Bauvorhaben bis zum Ende zuverlässig zur Seite. Danke dafür, immer wieder gerne!',
      name: 'J.',
      rating: 5,
      date: '31/05/2026',
    },
    {
      quote:
        'Sehr sehr schnelle Bearbeitung des Förderantrages. Die Mitarbeiter sind sehr nett und zuvorkommend. Telefonisch ist auch immer jemand erreichbar und wenn mal nicht, wird man in kürzester Zeit zurückgerufen. Also besser geht es nicht. Ich kann das Unternehmen nur weiterempfehlen.',
      name: 'Ute Skrempa',
      rating: 5,
      date: '12/05/2026',
    },
    {
      quote:
        'Super angenehme, professionelle und vor allem menschliche Zusammenarbeit. Immer wieder gerne.',
      name: 'Michael Arnold',
      rating: 5,
      date: '11/05/2026',
    },
    {
      quote:
        'Saubere Arbeit als Energieberater und sachverständige Zusammenarbeit für mich als Heizungsbauer.',
      name: 'Guido Dräger',
      rating: 5,
      date: '11/05/2026',
    },
    {
      // verbatim incl. reviewer's typo „mehrere Größe Projekte"
      quote:
        'Fachkompetente Betreuung durch Herr Lippe und seinem Team. Wir haben schon mehrere Größe Projekte miteinander umgesetzt. Absolut zuverlässig und professionell.',
      name: 'Der Philipp',
      rating: 5,
      date: '11/05/2026',
    },
    {
      quote:
        'Herr Krumm hat uns bei der Sanierung des Pfarrhauses in Satow in bauphysikalischen Fragen super unterstützt und wir konnten so die obere Decke denkmalgerecht sanieren und gut dämmen.',
      name: 'Ulrike Ahnert',
      rating: 5,
      date: '07/05/2026',
    },
    {
      quote:
        'Vom ersten bis zum letzten Kontakt stimmig: freundlich, fix, auf Mehrwerte und Bauausführungsfehler hinweisend und erinnernd in der Abrechnung. Ich bin sehr zufrieden.',
      name: 'Oliver Kempke',
      rating: 5,
      date: '09/12/2025',
    },
    {
      // two paragraphs in the source, joined with a space (whitespace only)
      quote:
        'Ich wurde von Herrn Lippe & Herrn Borck bei 2 Sanierungsvorhaben begleitet und war von A-Z bei dem Vorhaben sehr gut aufgehoben nachdem ich vorher 2x den Energieberater gewechselt habe. Vor allem bei der Relevanz von 6 stelligen Fördermitteln sollte man nicht am Energieberater sparen!',
      name: 'Christoph Eichelbaum',
      rating: 5,
      date: '11/07/2025',
    },
  ],
};

/* ---------------------------------------------------------------- */
/* §6.1.11 Standorte teaser — names/addresses verbatim kontakt.md.    */
/* Coordinates (WGS84) are for the static map dots only.              */
/* Erkelenz/Friedeburg + Schorndorf are partner locations             */
/* (Energieberatungsexperts EBE GmbH / SW Bautechnik GmbH).           */
/* ---------------------------------------------------------------- */

export const standorte = {
  overline: 'Standorte', // NEW COPY: review
  heading: 'Unsere Standorte', // verbatim kontakt.md
  // NEW COPY: review (teaser line)
  intro: 'Sechs eigene Standorte und starke Partner — von Ostbrandenburg bis Baden-Württemberg.',
  zentrale: {
    name: 'Strausberg - Zentrale', // verbatim kontakt.md
    addressLines: ['Garzauer Chaussee 1a', '15344 Strausberg'], // verbatim kontakt.md
    phone: '03341 4272935', // verbatim kontakt.md
    email: 'strausberg@ea-plus.de', // verbatim kontakt.md
  },
  locations: [
    { name: 'Strausberg - Zentrale', lat: 52.58, lon: 13.88 },
    { name: 'Güstrow', lat: 53.79, lon: 12.17 },
    { name: 'Heiligengrabe bei Wittstock', lat: 53.14, lon: 12.37 },
    { name: 'Bad Langensalza', lat: 51.1, lon: 10.65 },
    { name: 'Berlin', lat: 52.52, lon: 13.4 },
    { name: 'Bad Belzig', lat: 52.14, lon: 12.59 },
    { name: 'Erkelenz', lat: 51.08, lon: 6.31, partner: true },
    { name: 'Friedeburg', lat: 53.45, lon: 7.84, partner: true },
    { name: 'Schorndorf bei Stuttgart', lat: 48.81, lon: 9.53, partner: true },
  ],
  cta: { label: 'Alle Standorte & Kontakt', to: '/kontakt' }, // NEW COPY: review
};

/* ---------------------------------------------------------------- */
/* §6.1.12 CTABand                                                    */
/* ---------------------------------------------------------------- */

export const ctaBand = {
  // plan §6.1.12 wording (claim voice, 6 words)
  title: 'Sichern Sie sich Ihr kostenloses Erstgespräch.',
  // NEW COPY: review
  support: 'Kostenlos und unverbindlich — wir klären Ziel, Gebäude und Förderlage.',
};
