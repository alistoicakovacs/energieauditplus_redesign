import { lazy } from 'react';
import { matchRoutes } from 'react-router';
import { heroPreload } from './lib/heroImage.js';

/**
 * Single route table — consumed by the client app (App.jsx) and by the
 * build-time prerender (scripts/prerender.mjs via entry-server.jsx).
 *
 * `prerender: false` keeps a route out of the static build (dev-only routes).
 * `file` overrides the output filename (404 host convention).
 */

/**
 * page(load) → { load, Component }. `load` is the raw dynamic import (used by
 * SSR and by the client's initial hydration to render the ALREADY-RESOLVED
 * component, so no Suspense boundary is created and the page content renders
 * INLINE in <main>). `Component` is the React.lazy wrapper (used for every
 * OTHER route, preserving code-splitting for client-side navigations).
 */
function page(load) {
  return { load, Component: lazy(load) };
}

// Dev-only verification surface — registered only in dev so it never ships
// in the prod client/SSR bundles (and is excluded from sitemap & robots).
const devRoutes = import.meta.env.DEV
  ? [
      {
        path: '/dev/kitchen-sink',
        title: 'Kitchen Sink (dev) — EnergieAudit Plus',
        ...page(() => import('./pages/kitchen-sink/KitchenSinkPage.jsx')),
        prerender: false,
      },
      {
        path: '/dev/motion',
        title: 'Motion-Wrapper (dev) — EnergieAudit Plus',
        ...page(() => import('./pages/dev-motion/DevMotionPage.jsx')),
        prerender: false,
      },
      {
        path: '/dev/hero',
        title: 'Hero-Slider (dev) — EnergieAudit Plus',
        ...page(() => import('./pages/dev-hero/DevHeroPage.jsx')),
        prerender: false,
      },
      {
        path: '/dev/patterns',
        title: 'Pattern-Bibliothek (dev) — EnergieAudit Plus',
        ...page(() => import('./pages/dev-patterns/DevPatternsPage.jsx')),
        prerender: false,
      },
    ]
  : [];

export const routes = [
  {
    path: '/',
    title: 'EnergieAudit Plus — Energieberatung aus einer Hand',
    ...page(() => import('./pages/home/HomePage.jsx')),
    prerender: true,
    // §9 LCP preload for the hero slide-1 image — injected into the static
    // <head> by scripts/prerender.mjs (React 19 does not hoist responsive
    // image preloads out of the lazy route's Suspense segment; rendering the
    // <link> in the page would break hydration). heroPreload() mirrors the
    // slide-1 <picture> exactly (AVIF srcSet + phone-aware sizes) so the
    // preload fetches the same small variant the browser paints — no wasted
    // 1600w download on phones, no double-download.
    preloadImage: heroPreload('/images/hero/01-neubau'),
  },
  {
    path: '/leistungen',
    title: 'Leistungen — EnergieAudit Plus',
    ...page(() => import('./pages/leistungen/LeistungenPage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/neubau-energieberatung',
    title: 'Neubau & Energieberatung — EnergieAudit Plus',
    ...page(() => import('./pages/neubau-energieberatung/NeubauEnergieberatungPage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors the page hero <picture> via heroPreload
    // (hero.image.stem in src/content/services/neubau-energieberatung.js).
    // Convention for every service detail page.
    preloadImage: heroPreload('/images/hero/01-neubau'),
  },
  {
    path: '/leistungen/bestandsgebaeude',
    title: 'Energieberatung für Bestandsgebäude — EnergieAudit Plus',
    ...page(() => import('./pages/bestandsgebaeude/BestandsgebaeudePage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/bestandsgebaeude.js.
    preloadImage: heroPreload('/images/hero/02-bestand'),
  },
  {
    path: '/leistungen/fordermittelservice',
    title: 'Fördermittelservice — EnergieAudit Plus',
    ...page(() => import('./pages/fordermittelservice/FordermittelservicePage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/fordermittelservice.js.
    preloadImage: heroPreload('/images/hero/03-foerdermittel'),
  },
  {
    path: '/leistungen/lebenszyklusanalyse-lca',
    title: 'Lebenszyklusanalyse (LCA) — EnergieAudit Plus',
    ...page(() => import('./pages/lebenszyklusanalyse-lca/LebenszyklusanalysePage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/lebenszyklusanalyse-lca.js.
    preloadImage: heroPreload('/images/hero/04-lca'),
  },
  {
    path: '/leistungen/raumluftmessung-baubiologie',
    title: 'Raumluftmessung & Baubiologie — EnergieAudit Plus',
    ...page(() => import('./pages/raumluftmessung-baubiologie/RaumluftmessungPage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/raumluftmessung-baubiologie.js.
    preloadImage: heroPreload('/images/hero/05-raumluft'),
  },
  {
    path: '/leistungen/blower-door-test',
    title: 'Blower-Door-Test — EnergieAudit Plus',
    ...page(() => import('./pages/blower-door-test/BlowerDoorTestPage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/blower-door-test.js.
    preloadImage: heroPreload('/images/hero/06-blower-door'),
  },
  {
    path: '/leistungen/qng-flow',
    title: 'Nachhaltigkeitsaudit mit QNG-flow — EnergieAudit Plus',
    ...page(() => import('./pages/qng-flow/QngFlowPage.jsx')),
    prerender: true,
    // §9 LCP preload — mirrors hero.image.stem in src/content/services/qng-flow.js.
    preloadImage: heroPreload('/images/hero/07-qng-flow'),
  },
  {
    path: '/karriere',
    title: 'Karriere — EnergieAudit Plus',
    ...page(() => import('./pages/karriere/KarrierePage.jsx')),
    prerender: true,
  },
  {
    path: '/ansprechpartner',
    title: 'Ansprechpartner — EnergieAudit Plus',
    ...page(() => import('./pages/ansprechpartner/AnsprechpartnerPage.jsx')),
    prerender: true,
  },
  {
    path: '/kontakt',
    title: 'Kontakt — EnergieAudit Plus',
    ...page(() => import('./pages/kontakt/KontaktPage.jsx')),
    prerender: true,
  },
  {
    path: '/datenschutzerklaerung',
    title: 'Datenschutzerklärung — EnergieAudit Plus',
    ...page(() => import('./pages/datenschutzerklaerung/DatenschutzerklaerungPage.jsx')),
    prerender: true,
  },
  {
    path: '/impressum',
    title: 'Impressum — EnergieAudit Plus',
    ...page(() => import('./pages/impressum/ImpressumPage.jsx')),
    prerender: true,
  },
  ...devRoutes,
  {
    path: '*',
    title: 'Seite nicht gefunden — EnergieAudit Plus',
    ...page(() => import('./pages/not-found/NotFoundPage.jsx')),
    prerender: true,
    prerenderPath: '/404',
    file: '404.html',
  },
];

/**
 * The route object react-router will match for `url` (deepest match, or the
 * `*` catch-all). Used to resolve the initial route's chunk up front.
 */
export function matchRoute(url) {
  const matches = matchRoutes(routes, url) ?? [];
  return matches.at(-1)?.route ?? routes.find((r) => r.path === '*');
}

/**
 * Build a routes list where the matched route renders its ALREADY-RESOLVED
 * component (the raw import, not React.lazy) — so <Suspense fallback={null}>
 * is a no-op passthrough and the page content renders INLINE. SSR uses this so
 * the crawlable HTML contains the real <main>; the client uses it for the
 * initial hydration so its first render matches the server (no #418 mismatch).
 * Every OTHER route stays lazy → client navigations still code-split.
 */
export async function routesWithResolved(url) {
  const matched = matchRoute(url);
  const mod = await matched.load();
  const Resolved = mod.default;
  return routes.map((r) => (r === matched ? { ...r, Component: Resolved } : r));
}
