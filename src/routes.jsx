import { lazy } from 'react';

/**
 * Single route table — consumed by the client app (App.jsx) and by the
 * build-time prerender (scripts/prerender.mjs via entry-server.jsx).
 *
 * `prerender: false` keeps a route out of the static build (dev-only routes).
 * `file` overrides the output filename (404 host convention).
 */
export const routes = [
  {
    path: '/',
    title: 'EnergieAudit Plus — Energieberatung aus einer Hand',
    Component: lazy(() => import('./pages/home/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen',
    title: 'Leistungen — EnergieAudit Plus',
    Component: lazy(() => import('./pages/leistungen/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/neubau-energieberatung',
    title: 'Neubau & Energieberatung — EnergieAudit Plus',
    Component: lazy(() => import('./pages/neubau-energieberatung/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/bestandsgebaeude',
    title: 'Energieberatung für Bestandsgebäude — EnergieAudit Plus',
    Component: lazy(() => import('./pages/bestandsgebaeude/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/fordermittelservice',
    title: 'Fördermittelservice — EnergieAudit Plus',
    Component: lazy(() => import('./pages/fordermittelservice/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/lebenszyklusanalyse-lca',
    title: 'Lebenszyklusanalyse (LCA) — EnergieAudit Plus',
    Component: lazy(() => import('./pages/lebenszyklusanalyse-lca/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/raumluftmessung-baubiologie',
    title: 'Raumluftmessung & Baubiologie — EnergieAudit Plus',
    Component: lazy(() => import('./pages/raumluftmessung-baubiologie/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/blower-door-test',
    title: 'Blower-Door-Test — EnergieAudit Plus',
    Component: lazy(() => import('./pages/blower-door-test/index.jsx')),
    prerender: true,
  },
  {
    path: '/leistungen/qng-flow',
    title: 'Nachhaltigkeitsaudit mit QNG-flow — EnergieAudit Plus',
    Component: lazy(() => import('./pages/qng-flow/index.jsx')),
    prerender: true,
  },
  {
    path: '/karriere',
    title: 'Karriere — EnergieAudit Plus',
    Component: lazy(() => import('./pages/karriere/index.jsx')),
    prerender: true,
  },
  {
    path: '/ansprechpartner',
    title: 'Ansprechpartner — EnergieAudit Plus',
    Component: lazy(() => import('./pages/ansprechpartner/index.jsx')),
    prerender: true,
  },
  {
    path: '/kontakt',
    title: 'Kontakt — EnergieAudit Plus',
    Component: lazy(() => import('./pages/kontakt/index.jsx')),
    prerender: true,
  },
  {
    path: '/datenschutzerklaerung',
    title: 'Datenschutzerklärung — EnergieAudit Plus',
    Component: lazy(() => import('./pages/datenschutzerklaerung/index.jsx')),
    prerender: true,
  },
  {
    path: '/impressum',
    title: 'Impressum — EnergieAudit Plus',
    Component: lazy(() => import('./pages/impressum/index.jsx')),
    prerender: true,
  },
  {
    // Dev-only verification surface — excluded from prerender, sitemap & robots.
    path: '/dev/kitchen-sink',
    title: 'Kitchen Sink (dev) — EnergieAudit Plus',
    Component: lazy(() => import('./pages/kitchen-sink/index.jsx')),
    prerender: false,
  },
  {
    path: '*',
    title: 'Seite nicht gefunden — EnergieAudit Plus',
    Component: lazy(() => import('./pages/not-found/index.jsx')),
    prerender: true,
    prerenderPath: '/404',
    file: '404.html',
  },
];
