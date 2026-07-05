import { services } from '../lib/navigation.js';

/**
 * Hero slider content — one slide per Leistung (dev brief §5, order and
 * routes from `services` in src/lib/navigation.js).
 *
 * Copy sources (per slide, see inline flags):
 * - `line` (Kurzbeschreibung) + `chip` (Proof-Chip): verbatim from the
 *   microcopy table in dev brief §5.4 — itself flagged PROPOSAL there, so
 *   the whole table still needs client sign-off.
 * - `claim` (the H1): claim-voice per plan §13.1 — ≤ 8 words, verb-led,
 *   Anrede „Sie". Where §5.4 contains a usable clause it is reused verbatim;
 *   everything else is NEW COPY: review.
 * - `alt`: NEW COPY: review (describes the placeholder photo, will change
 *   with the real EA+ photography).
 *
 * Images: free-license Unsplash placeholders, downloaded at build-prep time
 * and self-hosted under /public/images/hero (no hotlinking, no third-party
 * requests at runtime). `image` is the path stem; variants exist as
 * `<stem>-800.{jpg,webp}` (800×450) and `<stem>-1600.{jpg,webp}` (16:9).
 * TODO: replace with real EA+ photos.
 */

/** Autoplay interval per slide (dev brief §5.2: ~6 s). */
export const AUTOPLAY_MS = 6000;

const heroCopy = {
  '/leistungen/neubau-energieberatung': {
    claim: 'Wir machen Ihren Neubau förderreif.', // brief §5.4 (first clause, verbatim)
    line: 'Energiekonzept, GEG-Nachweis, LCA, QNG und Blower-Door aus einer Hand.', // brief §5.4 (verbatim)
    chip: 'bis zu 150.000 € / WE', // brief §5.4 (verbatim)
    image: '/images/hero/01-neubau',
    alt: 'Modernes, energieeffizientes Neubau-Wohnhaus mit großen Glasflächen in der Abenddämmerung', // NEW COPY: review
  },
  '/leistungen/bestandsgebaeude': {
    claim: 'Wir bringen Ihren Altbau auf Effizienzkurs.', // NEW COPY: review
    line: 'Vom Altbau zum förderfähigen Effizienzgebäude – strukturiert, rechtssicher und wirtschaftlich saniert.', // brief §5.4 (verbatim)
    chip: 'iSFP · BAFA · KfW', // brief §5.4 (verbatim)
    image: '/images/hero/02-bestand',
    alt: 'Fassade eines Bestands-Mehrfamilienhauses mit Balkonen', // NEW COPY: review
  },
  '/leistungen/fordermittelservice': {
    claim: 'Förderung wird Ihr Vertriebsvorteil.', // NEW COPY: review (derived from brief §5.4 „Förderung als Vertriebsvorteil")
    line: 'Wir übernehmen Ihr komplettes Fördermittelmanagement bis zur Auszahlung.', // brief §5.4 (verbatim)
    chip: '24-h-BzA-Portal', // brief §5.4 (verbatim)
    image: '/images/hero/03-foerdermittel',
    alt: 'Beratungssituation am Schreibtisch: Planungsunterlagen und Laptops', // NEW COPY: review
  },
  '/leistungen/lebenszyklusanalyse-lca': {
    claim: 'Wir bilanzieren den Lebenszyklus Ihres Gebäudes.', // NEW COPY: review
    line: 'Ökobilanzen nach DIN EN 15978 auf Basis der ÖKOBAUDAT – die Datengrundlage für QNG und KfW-Förderung.', // brief §5.4 (verbatim)
    chip: 'DIN EN 15978', // brief §5.4 (verbatim)
    image: '/images/hero/04-lca',
    alt: 'Rohbau von oben: Bewehrung und Leitungen einer Geschossdecke auf der Baustelle', // NEW COPY: review
  },
  '/leistungen/raumluftmessung-baubiologie': {
    claim: 'Wir messen, wie gesund Ihr Gebäude ist.', // NEW COPY: review
    line: 'Der wissenschaftliche Nachweis, dass Ihr Gebäude wohngesund ist – akkreditiert nach DIN EN ISO 16000.', // brief §5.4 (verbatim)
    chip: 'QNG · DGNB', // brief §5.4 (verbatim)
    image: '/images/hero/05-raumluft',
    alt: 'Helles, luftiges Wohnzimmer mit großen Fensterflächen', // NEW COPY: review
  },
  '/leistungen/blower-door-test': {
    claim: 'Wir machen Luftdichtheit messbar.', // NEW COPY: review
    line: 'Die zentrale Qualitätssicherung für die Gebäudehülle – Luftdichtheit nach DIN EN ISO 9972 mit eigener Messtechnik.', // brief §5.4 (verbatim)
    chip: 'bis 35.000 m³', // brief §5.4 (verbatim)
    image: '/images/hero/06-blower-door',
    alt: 'Moderne Gebäudehülle: weiße Fassade mit Glasfront im Detail', // NEW COPY: review
  },
  '/leistungen/qng-flow': {
    claim: 'Nachhaltigkeit muss nicht kompliziert sein.', // brief §5.4 (first clause, verbatim)
    line: 'QNG-Zertifizierung über unsere eigene Plattform QNG-flow.', // brief §5.4 (verbatim remainder)
    chip: 'eigene Plattform', // brief §5.4 (verbatim)
    image: '/images/hero/07-qng-flow',
    alt: 'Mehrfamilienhaus mit Holzfassade – nachhaltige Bauweise', // NEW COPY: review
  },
};

// The copy join is keyed on the service route: renaming a route in
// navigation.js must fail loudly here, not ship a half-empty slide.
if (import.meta.env.DEV) {
  for (const service of services) {
    if (!heroCopy[service.to]) {
      throw new Error(
        `heroSlides: no hero copy for service route "${service.to}" — ` +
          'update the heroCopy map in src/content/heroSlides.js'
      );
    }
  }
}

/**
 * The 7 slides in service order. Each entry carries the navigation fields
 * (`name`, `to`, `icon`, `descriptor`) plus the hero copy above.
 */
export const heroSlides = services.map((service) => ({
  ...service,
  ...heroCopy[service.to],
}));
