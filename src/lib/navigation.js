import {
  HousePlus,
  Building2,
  BadgeEuro,
  Recycle,
  AirVent,
  Gauge,
  Leaf,
} from 'lucide-react';

/**
 * Global navigation data — single source for Header, MegaMenu, MobileMenu
 * and Footer. Service names verbatim from handoff/content/kontakt.md
 * (Hauptnavigation); routes from src/routes.jsx.
 */

// Descriptors are NEW COPY: review (3-word tile subtitles, not from live site).
export const services = [
  {
    name: 'Neubau & Energieberatung',
    to: '/leistungen/neubau-energieberatung',
    icon: HousePlus,
    descriptor: 'Effizient geplant bauen', // NEW COPY: review
  },
  {
    name: 'Energieberatung für Bestandsgebäude',
    to: '/leistungen/bestandsgebaeude',
    icon: Building2,
    descriptor: 'Sanieren mit Fahrplan', // NEW COPY: review
  },
  {
    name: 'Fördermittelservice',
    to: '/leistungen/fordermittelservice',
    icon: BadgeEuro,
    descriptor: 'Zuschüsse voll ausschöpfen', // NEW COPY: review
  },
  {
    name: 'Lebenszyklusanalyse (LCA)',
    to: '/leistungen/lebenszyklusanalyse-lca',
    icon: Recycle,
    descriptor: 'Ökobilanz transparent gemacht', // NEW COPY: review
  },
  {
    name: 'Raumluftmessung & Baubiologie',
    to: '/leistungen/raumluftmessung-baubiologie',
    icon: AirVent,
    descriptor: 'Gesundes Raumklima nachweisen', // NEW COPY: review
  },
  {
    name: 'Blower-Door-Test',
    to: '/leistungen/blower-door-test',
    icon: Gauge,
    descriptor: 'Luftdichtheit sicher geprüft', // NEW COPY: review
  },
  {
    name: 'Nachhaltigkeitsaudit mit QNG-flow',
    to: '/leistungen/qng-flow',
    icon: Leaf,
    descriptor: 'Digital zum QNG-Siegel', // NEW COPY: review
    featured: true,
  },
];

/** Top-level nav links (besides the Leistungen mega-menu trigger). */
export const mainNavLinks = [
  { name: 'Karriere', to: '/karriere' },
  { name: 'Ansprechpartner', to: '/ansprechpartner' },
  { name: 'Kontakt', to: '/kontakt' },
];

/** Zentrale contact data — verbatim from handoff/content/kontakt.md. */
export const contact = {
  phoneDisplay: '03341 4272935',
  phoneHref: 'tel:+4933414272935',
  emailDisplay: 'team@ea-plus.de',
  emailHref: 'mailto:team@ea-plus.de',
  company: 'EnergieAudit Plus GmbH & Co. KG',
  address: {
    street: 'Garzauer Chaussee 1a',
    city: '15344 Strausberg',
  },
  hours: 'Mo–Fr 8–17 Uhr', // per Figma revamp spec §4 (utility strip)
};

/** Location names for the utility strip / footer (details live on /kontakt). */
export const locationNames = [
  'Strausberg',
  'Güstrow',
  'Heiligengrabe',
  'Bad Langensalza',
  'Berlin',
  'Bad Belzig',
  'Erkelenz',
  'Friedeburg',
  'Schorndorf',
];
