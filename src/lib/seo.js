/**
 * Per-route SEO metadata — consumed by <Seo> (components/layout/Seo.jsx),
 * which renders native <title>/<meta>/<link> tags that React 19 hoists into
 * <head> (client) or emits as a hoistable prefix that scripts/prerender.mjs
 * moves into the static <head>.
 *
 * Titles come from src/routes.jsx (single source); descriptions live here.
 * Descriptions are placeholder quality for the stub pages — real copy comes
 * with the page-content phases.
 */

export const SITE_NAME = 'EnergieAudit Plus';
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://ea-plus.de';

const DEFAULT_DESCRIPTION =
  'EnergieAudit Plus — Energieberatung aus einer Hand: Neubau, Bestand, Fördermittel, LCA, Raumluftmessung, Blower-Door-Test und Nachhaltigkeitsaudit mit QNG-flow.'; // NEW COPY: review

// NEW COPY: review — placeholder meta descriptions (German), per route path.
const descriptions = {
  '/':
    'Energieberatung aus einer Hand: von der Bestandsaufnahme bis zur Baubegleitung. EnergieAudit Plus begleitet Neubau und Sanierung — förderfähig, effizient, persönlich.',
  '/leistungen':
    'Alle Leistungen im Überblick: Neubau- und Bestandsberatung, Fördermittelservice, Lebenszyklusanalyse, Raumluftmessung, Blower-Door-Test und QNG-Nachhaltigkeitsaudit.',
  '/leistungen/neubau-energieberatung':
    'Energieberatung für den Neubau: Effizienzhaus-Planung, Nachweise und Baubegleitung — von Anfang an förderfähig geplant.',
  '/leistungen/bestandsgebaeude':
    'Energieberatung für Bestandsgebäude: Sanierungsfahrplan (iSFP), Energieausweis und Modernisierungskonzepte mit maximaler Förderung.',
  '/leistungen/fordermittelservice':
    'Fördermittelservice: KfW- und BAFA-Zuschüsse identifizieren, beantragen und sichern — wir übernehmen den kompletten Antragsprozess.',
  '/leistungen/lebenszyklusanalyse-lca':
    'Lebenszyklusanalyse (LCA): Ökobilanz für Gebäude transparent berechnet — Grundlage für QNG, BEG-Förderung und nachhaltiges Bauen.',
  '/leistungen/raumluftmessung-baubiologie':
    'Raumluftmessung & Baubiologie: Schadstoffe messen, gesundes Raumklima nachweisen — für Wohn- und Gewerbegebäude.',
  '/leistungen/blower-door-test':
    'Blower-Door-Test: Luftdichtheitsmessung nach Norm — für Neubau, Sanierung und Fördernachweise.',
  '/leistungen/qng-flow':
    'Nachhaltigkeitsaudit mit QNG-flow: digital gesteuert zum QNG-Siegel — Voraussetzung für klimafreundliche Neubauförderung.',
  '/karriere':
    'Karriere bei EnergieAudit Plus: Werde Teil unseres Teams für Energieberatung und nachhaltiges Bauen — offene Stellen und Kultur.',
  '/ansprechpartner':
    'Ihre Ansprechpartner bei EnergieAudit Plus: unser Team für Energieberatung, Fördermittel und Nachhaltigkeit — direkt erreichbar.',
  '/kontakt':
    'Kontakt zu EnergieAudit Plus: Kontaktformular, Telefon, E-Mail und alle Standorte — wir melden uns zeitnah bei Ihnen.',
  '/datenschutzerklaerung': 'Datenschutzerklärung der EnergieAudit Plus GmbH & Co. KG.',
  '/impressum': 'Impressum der EnergieAudit Plus GmbH & Co. KG.',
};

/**
 * Resolve the SEO metadata for a route.
 * @param {string} path   route path from src/routes.jsx ('*' for the 404 route)
 * @param {string} [title] route title from src/routes.jsx
 */
export function getSeoMeta(path, title) {
  const isNotFound = path === '*';
  return {
    title: title ?? SITE_NAME,
    description: descriptions[path] ?? DEFAULT_DESCRIPTION,
    // 404 has no canonical URL and must not be indexed.
    canonical: isNotFound ? null : `${SITE_URL}${path === '/' ? '/' : path}`,
    noindex: isNotFound,
  };
}
