# templates/ — page-level compositions

A thin fourth composition layer on top of `primitives/`, `patterns/`,
`layout/`, `motion/` (plan §3). A template is a **full-page skeleton** driven
by a single content object — it is not a pattern (patterns are reusable UI
blocks; a template owns page anatomy, section order and JSON-LD emission).
Pages that instantiate a template stay one-liner compositions:
`<ServiceDetailTemplate content={…} />`.

Rules (same reuse mandate as pages, §3):

- Templates compose ONLY `primitives/`, `patterns/`, `motion/` components.
- Module CSS here is layout/composition plus the template-owned hero visuals
  (all values via tokens — no hex, no ad-hoc font sizes, no local shadows).
- All copy lives in `src/content/` modules with per-block provenance.

## ServiceDetailTemplate

Renders the plan §6.3 service-detail skeleton from one `serviceContent`
object (see `src/content/services/*.js`). Sections render conditionally —
a minimal service page needs only `route`, `name`, `hero`, `nutzen`,
`ablauf`, `ctaBand`.

### serviceContent schema

```js
{
  route: '/leistungen/<slug>',      // REQUIRED — must exist in routes.jsx +
                                    // relatedServices (content/leistungen.js)
  name: 'Service-Name',             // REQUIRED — verbatim; breadcrumb label,
                                    // hero eyebrow + Service JSON-LD name
  hero: {                           // REQUIRED — §6.3.1
    title: '…',                     // H1 (verbatim content H1)
    subline: '…',                   // optional; verbatim claim heading
    lead: ['…', …],                 // paragraphs (verbatim intro)
    chip: '…',                      // optional proof chip (Badge)
    stat: { value: '…', label: '…' }, // optional hero stat (QNG flagship)
    image: { stem: '/images/hero/<x>', alt: '…' }, // -800/-1600 jpg+webp variants
  },
  nutzen: {                         // REQUIRED — §6.3.2 icon cards
    overline: '…', heading: '…',
    intro: ['…', …],                // optional paragraphs
    items: [{ icon, title, text }], // 3–5 IconCards
  },
  platform: {                       // optional — QNG flagship extra
    overline, heading, tagline, body: ['…'],
    features: [{ icon, title, text? }],   // feature grid
    screenshot: { label, ariaLabel },     // placeholder (data-placeholder)
  },
  kinetic: '…',                     // optional — §13.3, QNG page only
  ablauf: {                         // REQUIRED — §6.3.3 Stepper
    heading: '…', steps: [{ title, text }],  // 3–7 verbatim steps
  },
  details: {                        // optional — §6.3.4 Accordion
    overline?, heading, intro?,
    items: [{ title, content }],    // content: string | string[]
  },
  stats: {                          // optional — §6.3.5 StatBand
    overline, title,
    items: [{ value, prefix?, suffix?, decimals?, label }], // REAL numbers only
  },
  praxistipp: '…',                  // optional — PraxistippCallout body (verbatim)
  faq: {                            // optional — §6.3.6 Accordion + FAQPage JSON-LD
    overline?, heading,
    items: [{ question, answer: string | string[] }],  // verbatim
  },
  ctaBand: {                        // REQUIRED — §6.3.8
    title, support, primary?: { label, to }, secondary?: { label, to },
  },
}
```

Cross-sell (§6.3.7) is not part of the object: the template resolves it from
`relatedServices[route]` in `src/content/leistungen.js`. Breadcrumb,
`Service` and `FAQPage` JSON-LD are emitted automatically.
