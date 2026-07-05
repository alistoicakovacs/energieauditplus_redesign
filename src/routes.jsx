import { lazy } from 'react';

/**
 * Single route table — consumed by the client app (App.jsx) and by the
 * build-time prerender (scripts/prerender.mjs via entry-server.jsx).
 *
 * `prerender: false` keeps a route out of the static build (dev-only routes).
 * `file` overrides the output filename (404 host convention).
 */

// Dev-only verification surface — registered only in dev so it never ships
// in the prod client/SSR bundles (and is excluded from sitemap & robots).
const devRoutes = import.meta.env.DEV
  ? [
      {
        path: '/dev/kitchen-sink',
        title: 'Kitchen Sink (dev) — EnergieAudit Plus',
        Component: lazy(() => import('./pages/kitchen-sink/KitchenSinkPage.jsx')),
        prerender: false,
      },
      {
        path: '/dev/motion',
        title: 'Motion-Wrapper (dev) — EnergieAudit Plus',
        Component: lazy(() => import('./pages/dev-motion/DevMotionPage.jsx')),
        prerender: false,
      },
      {
        path: '/dev/patterns',
        title: 'Pattern-Bibliothek (dev) — EnergieAudit Plus',
        Component: lazy(() => import('./pages/dev-patterns/DevPatternsPage.jsx')),
        prerender: false,
      },
    ]
  : [];

export const routes = [
  {
    path: '/',
    title: 'EnergieAudit Plus — Energieberatung aus einer Hand',
    Component: lazy(() => import('./pages/home/HomePage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen',
    title: 'Leistungen — EnergieAudit Plus',
    Component: lazy(() => import('./pages/leistungen/LeistungenPage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/neubau-energieberatung',
    title: 'Neubau & Energieberatung — EnergieAudit Plus',
    Component: lazy(() => import('./pages/neubau-energieberatung/NeubauEnergieberatungPage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/bestandsgebaeude',
    title: 'Energieberatung für Bestandsgebäude — EnergieAudit Plus',
    Component: lazy(() => import('./pages/bestandsgebaeude/BestandsgebaeudePage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/fordermittelservice',
    title: 'Fördermittelservice — EnergieAudit Plus',
    Component: lazy(() => import('./pages/fordermittelservice/FordermittelservicePage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/lebenszyklusanalyse-lca',
    title: 'Lebenszyklusanalyse (LCA) — EnergieAudit Plus',
    Component: lazy(() => import('./pages/lebenszyklusanalyse-lca/LebenszyklusanalysePage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/raumluftmessung-baubiologie',
    title: 'Raumluftmessung & Baubiologie — EnergieAudit Plus',
    Component: lazy(() => import('./pages/raumluftmessung-baubiologie/RaumluftmessungPage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/blower-door-test',
    title: 'Blower-Door-Test — EnergieAudit Plus',
    Component: lazy(() => import('./pages/blower-door-test/BlowerDoorTestPage.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/qng-flow',
    title: 'Nachhaltigkeitsaudit mit QNG-flow — EnergieAudit Plus',
    Component: lazy(() => import('./pages/qng-flow/QngFlowPage.jsx')),
    prerender: true,
  },
  {
    path: '/karriere',
    title: 'Karriere — EnergieAudit Plus',
    Component: lazy(() => import('./pages/karriere/KarrierePage.jsx')),
    prerender: true,
  },
  {
    path: '/ansprechpartner',
    title: 'Ansprechpartner — EnergieAudit Plus',
    Component: lazy(() => import('./pages/ansprechpartner/AnsprechpartnerPage.jsx')),
    prerender: true,
  },
  {
    path: '/kontakt',
    title: 'Kontakt — EnergieAudit Plus',
    Component: lazy(() => import('./pages/kontakt/KontaktPage.jsx')),
    prerender: true,
  },
  {
    path: '/datenschutzerklaerung',
    title: 'Datenschutzerklärung — EnergieAudit Plus',
    Component: lazy(() => import('./pages/datenschutzerklaerung/DatenschutzerklaerungPage.jsx')),
    prerender: true,
  },
  {
    path: '/impressum',
    title: 'Impressum — EnergieAudit Plus',
    Component: lazy(() => import('./pages/impressum/ImpressumPage.jsx')),
    prerender: true,
  },
  ...devRoutes,
  {
    path: '*',
    title: 'Seite nicht gefunden — EnergieAudit Plus',
    Component: lazy(() => import('./pages/not-found/NotFoundPage.jsx')),
    prerender: true,
    prerenderPath: '/404',
    file: '404.html',
  },
];
