import { services } from '../lib/navigation.js';
import { heroSlides } from './heroSlides.js';
import { ablauf, bentoFeatured, ctaBand, usps, uspSummary } from './home.js';

/**
 * Shared Leistungen content (plan §6.2 + §6.3) — single source for
 * src/pages/leistungen/LeistungenPage.jsx and the cross-sell section of
 * the service detail template (components/templates/ServiceDetailTemplate).
 *
 * Copy provenance (per block, see inline comments):
 * - handoff/content/leistungen-uebersicht.md → verbatim 1:1, NEVER rewrite
 * - service names/routes: src/lib/navigation.js (verbatim kontakt.md nav)
 * - card one-liners: hero microcopy (dev brief §5.4, via heroSlides.js)
 * - USP strip / Ablauf / CTABand: reused from src/content/home.js
 *   (provenance documented there — ueber-uns.md verbatim + flagged NEW COPY)
 * - relatedServices: EDITORIAL CHOICE (Phase 4a) — flagged for review
 */

/* ---------------------------------------------------------------- */
/* §6.2 hero intro                                                   */
/* ---------------------------------------------------------------- */

export const overview = {
  overline: 'Leistungen', // NEW COPY: review (eyebrow)
  heading: 'Unsere Leistungen', // verbatim leistungen-uebersicht.md
  // verbatim leistungen-uebersicht.md (footer intro — the only prose on the
  // source page; reused here as the hero lead)
  lead:
    'Umfassende Beratungs- und Planungsservices für energieoptimierte Gebäude. Von der Bestandsaufnahme bis zur Baubegleitung stehen wir Ihnen zur Seite.',
};

/* ---------------------------------------------------------------- */
/* §6.2 service card grid — 7 cards, QNG-flow featured               */
/* ---------------------------------------------------------------- */

const lineByRoute = Object.fromEntries(heroSlides.map((slide) => [slide.to, slide.line]));

/** All 7 services as ServiceCard-shaped objects (order = navigation order). */
export const serviceCards = services.map((service) => ({
  icon: service.icon,
  title: service.name, // verbatim kontakt.md nav
  description: lineByRoute[service.to], // dev brief §5.4 (verbatim)
  to: service.to,
  featured: Boolean(service.featured),
}));

/** The featured QNG tile reuses the homepage FeaturedCard content
    (provenance: src/content/home.js — verbatim nachhaltigkeitsaudit-qng-flow.md). */
export const featured = bentoFeatured;

/* USP reminder strip + Ablauf + CTABand: reused 1:1 from the homepage
   content module (§6.2 „USP reminder strip" / „Ablauf" reuse mandate). */
export { ablauf, ctaBand, usps, uspSummary };

/* ---------------------------------------------------------------- */
/* §6.3.7 cross-sell relatedness map — EDITORIAL CHOICE (Phase 4a):  */
/* pairs follow the plan's example (Neubau ↔ Blower-Door ↔ QNG,      */
/* Bestand ↔ Fördermittel, …). NEW (structure, not copy) — review.   */
/* ---------------------------------------------------------------- */

export const relatedServices = {
  '/leistungen/neubau-energieberatung': [
    '/leistungen/blower-door-test',
    '/leistungen/qng-flow',
    '/leistungen/fordermittelservice',
  ],
  '/leistungen/bestandsgebaeude': [
    '/leistungen/fordermittelservice',
    '/leistungen/blower-door-test',
    '/leistungen/raumluftmessung-baubiologie',
  ],
  '/leistungen/fordermittelservice': [
    '/leistungen/neubau-energieberatung',
    '/leistungen/bestandsgebaeude',
    '/leistungen/qng-flow',
  ],
  '/leistungen/lebenszyklusanalyse-lca': [
    '/leistungen/qng-flow',
    '/leistungen/neubau-energieberatung',
    '/leistungen/bestandsgebaeude',
  ],
  '/leistungen/raumluftmessung-baubiologie': [
    '/leistungen/bestandsgebaeude',
    '/leistungen/blower-door-test',
    '/leistungen/qng-flow',
  ],
  '/leistungen/blower-door-test': [
    '/leistungen/neubau-energieberatung',
    '/leistungen/qng-flow',
    '/leistungen/raumluftmessung-baubiologie',
  ],
  '/leistungen/qng-flow': [
    '/leistungen/lebenszyklusanalyse-lca',
    '/leistungen/neubau-energieberatung',
    '/leistungen/fordermittelservice',
  ],
};

const cardByRoute = new Map(serviceCards.map((card) => [card.to, card]));

/**
 * Resolve the 2–3 cross-sell ServiceCards for a service route (§6.3.7).
 * Unknown routes fail loudly in DEV (guard below), silently yield [] in prod.
 */
export function getRelatedServiceCards(route) {
  return (relatedServices[route] ?? [])
    .map((to) => cardByRoute.get(to))
    .filter(Boolean);
}

// Same guard pattern as heroSlides/bentoLayout: a renamed or added service
// must fail loudly here, not silently drop a cross-sell card.
if (import.meta.env.DEV) {
  for (const card of serviceCards) {
    if (!card.description) {
      throw new Error(
        `leistungen content: service "${card.to}" has no hero one-liner — ` +
          'update the heroCopy map in src/content/heroSlides.js'
      );
    }
  }
  for (const service of services) {
    if (!relatedServices[service.to]) {
      throw new Error(`leistungen content: no relatedServices entry for "${service.to}"`);
    }
  }
  for (const [route, related] of Object.entries(relatedServices)) {
    if (!cardByRoute.has(route)) {
      throw new Error(`leistungen content: relatedServices keys unknown route "${route}"`);
    }
    for (const to of related) {
      if (!cardByRoute.has(to)) {
        throw new Error(
          `leistungen content: relatedServices["${route}"] references unknown route "${to}"`
        );
      }
      if (to === route) {
        throw new Error(`leistungen content: relatedServices["${route}"] references itself`);
      }
    }
    if (related.length < 2 || related.length > 3) {
      throw new Error(
        `leistungen content: relatedServices["${route}"] must list 2–3 routes (plan §6.3.7)`
      );
    }
  }
}
