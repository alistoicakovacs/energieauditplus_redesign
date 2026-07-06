/**
 * Per-route SEO metadata — consumed by <Seo> (components/layout/Seo.jsx),
 * which renders native <title>/<meta>/<link> tags that React 19 hoists into
 * <head> (client) or emits as a hoistable prefix that scripts/prerender.mjs
 * moves into the static <head>.
 *
 * Titles come from src/routes.jsx (single source); descriptions live here.
 * Descriptions are placeholder quality for the stub pages — real copy comes
 * with the page-content phases. Phase 4a delivered the real descriptions for
 * /leistungen, /leistungen/neubau-energieberatung and /leistungen/qng-flow;
 * Phase 4b for the five remaining /leistungen/* service routes.
 *
 * JSON-LD builders: `buildServiceJsonLd` / `buildFaqJsonLd` live here (used
 * by the service detail template). `buildBreadcrumbJsonLd` predates them and
 * stays local to components/patterns/Breadcrumbs.jsx (its only consumer).
 */

export const SITE_NAME = 'EnergieAudit Plus';
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://ea-plus.de';

// Site-wide og:image fallback (1200×630). public/og-default.png is a
// generated branded PLACEHOLDER (wordmark on dark gradient) —
// TODO: replace with a real brand image before launch.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

const DEFAULT_DESCRIPTION =
  'EnergieAudit Plus — Energieberatung aus einer Hand: Neubau, Bestand, Fördermittel, LCA, Raumluftmessung, Blower-Door-Test und Nachhaltigkeitsaudit mit QNG-flow.'; // NEW COPY: review

// NEW COPY: review — placeholder meta descriptions (German), per route path.
const descriptions = {
  '/':
    'Energieberatung aus einer Hand: von der Bestandsaufnahme bis zur Baubegleitung. EnergieAudit Plus begleitet Neubau und Sanierung — förderfähig, effizient, persönlich.',
  // NEW COPY: review — real description (Phase 4a), facts from leistungen-uebersicht.md
  '/leistungen':
    'Sieben Leistungen, ein Partner: Energieberatung für Neubau und Bestand, Fördermittelservice, Lebenszyklusanalyse (LCA), Raumluftmessung, Blower-Door-Test und Nachhaltigkeitsaudit mit QNG-flow.',
  // NEW COPY: review — real description (Phase 4a), facts verbatim neubau-energieberatung.md
  '/leistungen/neubau-energieberatung':
    'Neubau & Energieberatung: GEG-Nachweis, LCA, QNG-Begleitung und Blower-Door-Test aus einer Hand — bis zu 150.000 € zinsverbilligter KfW-Kredit pro Wohneinheit (KNN/KFN).',
  // NEW COPY: review — real description (Phase 4b), facts verbatim bestandsgebaeude.md
  '/leistungen/bestandsgebaeude':
    'Energieberatung für Bestandsgebäude: vom individuellen Sanierungsfahrplan (iSFP) bis zur Effizienzhaus-Komplettsanierung — dena-Experten für Wohngebäude, Nichtwohngebäude und Denkmäler.',
  // NEW COPY: review — real description (Phase 4b), facts verbatim fordermittelservice.md
  '/leistungen/fordermittelservice':
    'Fördermittelservice — skalierbar, schnell, rechtssicher: BzA in 24 Stunden, Einzelmaßnahmen-Plattform, QNG-Begleitung und Bauherrenvertretung gegenüber KfW und BAFA.',
  // NEW COPY: review — real description (Phase 4b), facts verbatim lebenszyklusanalyse-lca.md
  '/leistungen/lebenszyklusanalyse-lca':
    'Lebenszyklusanalyse (LCA): Ökobilanz nach DIN EN 15978 auf Basis der ÖKOBAUDAT — prüfsicher für KfW-Förderung, QNG-PLUS/PREMIUM und die LCA-Pflicht ab 2028.',
  // NEW COPY: review — real description (Phase 4b), facts verbatim raumluftmessung-baubiologie.md
  '/leistungen/raumluftmessung-baubiologie':
    'Raumluftmessung & Baubiologie: VOC- und Formaldehydmessung nach DIN EN ISO 16000 — akkreditierter Prüfbericht für QNG, DGNB und öffentliche Gebäude.',
  // NEW COPY: review — real description (Phase 4b), facts verbatim blower-door-test.md
  '/leistungen/blower-door-test':
    'Blower-Door-Test: Luftdichtheitsmessung nach DIN EN ISO 9972 — n50-Wert und rechtssichere Prüfprotokolle für KfW, GEG und QNG, vom Einfamilienhaus bis zur Logistikhalle.',
  // NEW COPY: review — real description (Phase 4a), facts verbatim nachhaltigkeitsaudit-qng-flow.md
  '/leistungen/qng-flow':
    'Nachhaltigkeitsaudit mit QNG-flow: mit unserer eigenen Plattform strukturiert zum QNG-Siegel und zur höchsten KfW-Förderstufe — bis zu 150.000 € Förderkredit pro Wohneinheit.',
  // NEW COPY: review (Phase 5B), facts verbatim karriere.md — Anrede „du"
  '/karriere':
    'Karriere bei EnergieAudit Plus: Werde Teil unseres interdisziplinären Teams für Energieberatung und nachhaltiges Bauen — offene Stelle als Ingenieur / Technischer Mitarbeiter (m/w/d) und Ausbildung zur Kauffrau für Büromanagement in Strausberg bei Berlin.',
  // NEW COPY: review (Phase 5B), facts verbatim team.md
  '/ansprechpartner':
    'Ihre Ansprechpartner bei EnergieAudit Plus: Geschäftsführung, Energieberater, Auditoren und Nachhaltigkeitsexperten an den Standorten Strausberg, Berlin, Güstrow, Bad Belzig und Wittstock — direkt per E-Mail und Telefon erreichbar.',
  '/kontakt':
    'Kontakt zu EnergieAudit Plus: Kontaktformular, Telefon, E-Mail und alle Standorte — wir melden uns zeitnah bei Ihnen.',
  '/datenschutzerklaerung': 'Datenschutzerklärung der EnergieAudit Plus GmbH & Co. KG.',
  '/impressum': 'Impressum der EnergieAudit Plus GmbH & Co. KG.',
};

/**
 * Resolve the SEO metadata for a route.
 * Per-page overrides (rendered by the page phases via
 * <Seo description=… image=…>) win over the central path-keyed map, which
 * in turn wins over the site defaults.
 *
 * @param {string} path   route path from src/routes.jsx ('*' for the 404 route)
 * @param {string} [title] route title from src/routes.jsx
 * @param {object} [overrides]
 * @param {string} [overrides.description]  page-specific meta description
 * @param {string} [overrides.image]        page-specific og:image (absolute
 *                                          URL or site-root-relative path)
 */
export function getSeoMeta(path, title, overrides = {}) {
  const isNotFound = path === '*';
  const image = overrides.image
    ? overrides.image.startsWith('/')
      ? `${SITE_URL}${overrides.image}`
      : overrides.image
    : DEFAULT_OG_IMAGE;
  return {
    title: title ?? SITE_NAME,
    description: overrides.description ?? descriptions[path] ?? DEFAULT_DESCRIPTION,
    // 404 has no canonical URL and must not be indexed.
    canonical: isNotFound ? null : `${SITE_URL}${path === '/' ? '/' : path}`,
    noindex: isNotFound,
    image,
  };
}

/**
 * schema.org `Service` for a Leistung detail page (dev brief §9). Minimal
 * correct shape: name + url + provider Organization + areaServed. The
 * provider name is the legal entity (verbatim kontakt.md).
 *
 * @param {object} args
 * @param {string} args.name        service name (verbatim)
 * @param {string} [args.description] meta-description-length summary
 * @param {string} args.path        route path (e.g. '/leistungen/qng-flow')
 */
export function buildServiceJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(description ? { description } : {}),
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'Organization',
      name: 'EnergieAudit Plus GmbH & Co. KG',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
  };
}

/**
 * schema.org `FAQPage` for service-page FAQ accordions (dev brief §9).
 * Only emit when the page renders the same Q/A text visibly (Google policy).
 *
 * @param {{question: string, answer: string|string[]}[]} items verbatim Q/A;
 *   multi-paragraph answers may be passed as an array of paragraphs.
 */
export function buildFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(item.answer) ? item.answer.join('\n\n') : item.answer,
      },
    })),
  };
}
