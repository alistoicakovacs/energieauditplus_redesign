import { BadgeEuro, FileSignature, Route } from 'lucide-react';

/**
 * /leistungen/bestandsgebaeude — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/bestandsgebaeude.md → verbatim 1:1, NEVER rewrite
 *   (headings, intro, benefit cards, 5 steps, Praxistipp, FAQ, Beratung).
 *   Source typos kept 1:1 per the content mandate (e.g. „ca. 5% aller
 *   Energieberater die Sie", „Praxistip", double spaces in FAQ 3) —
 *   flagged for the client sheet.
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows/headings without source heading:
 *   NEW COPY: review (numbers verbatim)
 */

export const bestandsgebaeude = {
  route: '/leistungen/bestandsgebaeude',
  name: 'Energieberatung für Bestandsgebäude', // verbatim (nav / breadcrumb / route title)

  hero: {
    title: 'Bestandsgebäude & Energieberatung', // verbatim bestandsgebaeude.md (H1)
    // verbatim bestandsgebaeude.md (claim heading, 1:1 incl. em dashes)
    subline: 'Vom Altbau zum förderfähigen Effizienzgebäude — strukturiert, rechtssicher, wirtschaftlich',
    // verbatim bestandsgebaeude.md (intro, both paragraphs 1:1 —
    // incl. source's missing comma „aller Energieberater die Sie")
    lead: [
      'Eine professionelle Energieberatung ist die Grundlage jeder geförderten Sanierung in Deutschland. Wir analysieren Ihr Bestandsgebäude und entwickeln ein wirtschaftlich tragfähiges Sanierungskonzept — egal, ob Einfamilienhaus, Mehrfamilienhaus, Bürogebäude oder Gewerbeobjekt.',
      'Als zugelassene Energieeffizienz-Experten der dena für Wohngebäude, Nichtwohngebäude sowie Denkmäler gehören wir zu den ca. 5% aller Energieberater die Sie bei jedem Gebäude unterstützen können. Wir begleiten Sie von der Bestandsaufnahme über die Förderantragstellung bis zur baubegleitenden Qualitätssicherung und Vertretung in Vollmacht gegenüber dem Fördermittelgeber.',
    ],
    chip: 'iSFP · BAFA · KfW', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/02-bestand', // reuse hero slide 2 image
      alt: 'Fassade eines Bestands-Mehrfamilienhauses mit Balkonen', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — 3 benefit cards, titles + texts verbatim */
  nutzen: {
    overline: 'Ihr Nutzen', // NEW COPY: review (eyebrow)
    heading: 'Ihre Vorteile auf einen Blick', // NEW COPY: review (source has no section heading over the 3 cards)
    items: [
      {
        icon: BadgeEuro,
        title: 'Rechtssicher Fördermittel beantragen', // verbatim
        text: 'Wir prüfen und besprechen Bundes- und Landesförderungen sowie kombinieren die wirtschaftlichste Lösung für Ihr Projekt', // verbatim (incl. missing period)
      },
      {
        icon: Route,
        title: 'Objektbezogene Sanierungsstrategie', // verbatim
        text: 'Vom individuellen Sanierungsfahrplan (iSFP) bis zur Effizienzhaus-Komplettsanierung — wir entwickeln den Weg, der zu Ihrer Immobilie und Ihrem Budget passt', // verbatim (incl. missing period)
      },
      {
        icon: FileSignature,
        title: 'Individuelle Vertragslösungen und Leistungspakete', // verbatim
        text: 'Vor jeder Zusammenarbeit erhalten Sie ein konkretes Angebot mit klar definierten Leistungen, Verantwortlichkeiten und optionalen Serviceleistungen.', // verbatim
      },
    ],
  },

  /* §6.3.3 Ablauf — heading + 5 steps verbatim bestandsgebaeude.md */
  ablauf: {
    heading: 'Der Prozess: In 5 Schritten zur Förderung', // verbatim
    steps: [
      {
        title: 'Bestandsaufnahme & Datenanalyse', // verbatim
        text: 'Wir sichten Pläne, Baubeschreibung und Verbrauchsdaten der letzten drei Heizperioden, definieren die thermische Hülle und führen einen Vor-Ort-Termin mit Plausibilitätscheck durch. Bei Bedarf ergänzen wir Thermografie oder Blower-Door-Test zur Schwachstellenanalyse.', // verbatim
      },
      {
        title: 'Energetische Bewertung & Schwachstellenanalyse', // verbatim
        text: 'Bestimmung der U-Werte aller Bauteile, Berechnung des Jahresheizwärmebedarfs, der Anlagenverluste und des Primärenergiebedarfs nach GEG. Der Bedarfs zu Verbrauchs-Abgleich zeigt, ob das Gebäude wirklich so verbraucht, wie es rechnerisch sollte.', // verbatim (incl. source's „Bedarfs zu Verbrauchs-Abgleich" hyphenation)
      },
      {
        title: 'Sanierungskonzept & Wirtschaftlichkeit', // verbatim
        text: 'Wir entwickeln entweder ein Gesamtsanierungskonzept auf Effizienzhausniveau oder einen schrittweisen Sanierungsfahrplan (iSFP). Jede Maßnahme wird auf GEG-Konformität, Förderfähigkeit und Wirtschaftlichkeit (Differenzkostenbetrachtung nach VDI 2067) geprüft.', // verbatim
      },
      {
        title: 'Förderantrag', // verbatim
        text: 'Wir stellen die Förderanträge bei BAFA bzw. KfW (über Ihre Hausbank), begleiten die Bauausführung als Energieeffizienz-Experte und erstellen die abschließende Verwendungsnachweiserklärung — die Voraussetzung für die Auszahlung der Zuschüsse und Tilgungszuschüsse.', // verbatim
      },
      {
        title: 'Baubegleitung', // verbatim
        text: 'Bei der Baubegleitung stellen wir sicher, dass Ihr Bauvorhaben die geplante energetische Qualität auch tatsächlich erreicht. Wir prüfen die Ausführungsplanung und kontrollieren stichprobenartig die wärmetechnisch relevanten Gewerke – von Dämmung und Luftdichtheit bis zur Anlagentechnik. Final stellen wir die Bestätigung nach Durchführung (BnD / TPN) für den Fördermittelgeber aus, womit die Grundlage für die Auszahlung Ihrer Fördermittel vorliegt.', // verbatim
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für Ihre Sanierung sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim intro: „gehören wir zu den ca. 5% aller Energieberater"
        value: 5,
        prefix: 'ca. ',
        suffix: ' %',
        label: 'aller Energieberater können Sie bei jedem Gebäude unterstützen', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 5: „fördert die Energieberatung … mit bis zu 50 % der förderfähigen Kosten"
        value: 50,
        prefix: 'bis zu ',
        suffix: ' %',
        label: 'BAFA-Förderung der Energieberatung für Wohngebäude', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 4: „rechnen wir in der Regel mit 6 bis 10 Wochen"
        value: 10,
        prefix: '6 bis ',
        suffix: ' Wochen',
        label: 'von der Beauftragung bis zum fertigen iSFP-Bericht', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 4: „binnen einer Woche nach Vorliegen aller Unterlagen"
        value: 1,
        prefix: 'binnen ',
        suffix: ' Woche',
        label: 'zur Bestätigung zum Antrag (BzA) als Kalkulationsgrundlage', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 Praxistipp — verbatim heading fragment (after „Praxistipp: ") */
  praxistipp: 'Funktionierende Anlagen- und Gebäudeteile zu ersetzen ist selten wirtschaftlich',

  /* §6.3.6 FAQ — heading + 5 Q/A verbatim (source typos kept 1:1) */
  faq: {
    heading: 'FAQ', // verbatim (source heading)
    items: [
      {
        question: '1. Wann lohnt sich eine Energieberatung im Bestand?', // verbatim
        answer:
          'Immer dann, wenn ohnehin Modernisierungs- oder Instandhaltungsarbeiten anstehen — also vor dem Heizungstausch, Fenstertausch, einer Fassadenrenovierung oder Dachsanierung. Ohne Beratung gehen bis zu 5 Prozentpunkte iSFP-Bonus und teils mehrere zehntausend Euro Fördermittel verloren. Wir betrachten mit Ihnen das Gebäude und stellen ein Konzept auf bei welchem Bestandteile des Gebäudes modernisiert werden, wenn diese das Ende ihrer Funktionstüchtigkeit erreicht haben. Wenn Bauteile oder Anlagen erneuert werden, dann wird gleich ein zukunftsfähiger Standard unter Zuhilfenahmen von Fördermitteln realisiert.', // verbatim (incl. source's „Zuhilfenahmen" + missing comma „Konzept auf bei welchem")
      },
      {
        question: '2. Welche Förderprogramme stehen zur Auswahl?', // verbatim
        answer:
          'Drei Programme decken praktisch alle Sanierungsfälle ab: die BAFA-Einzelmaßnahmen (BEG EM) für punktuelle Maßnahmen, das KfW-Effizienzhaus (Programm 261 für Wohngebäude, 461 für Nichtwohngebäude) für umfassende Sanierungen und Umnutzungen, KfW Programm für Heizungstausch ( Programm 458 für Privat, 459, 522 für Unternehmen) sowie die steuerliche Förderung nach § 35c EStG für selbstgenutztes Wohneigentum. Dabei ist die steuerliche Förderung nach §35c EStG für selbstnutzende Hauseigentümer die einzige Förderung die nachträglich zum Steuerjahr geltend gemacht werden kann.', // verbatim (incl. source's stray space „( Programm" + missing comma „Förderung die")
      },
      {
        question: '3. Wer darf eine geförderte Energieberatung durchführen?', // verbatim
        answer:
          'Nur Energieeffizienz-Expertinnen und -Experten, die in der Expertenliste des Bundes (dena) geführt werden, dürfen Förderanträge bei KfW und BAFA stellen. Bei KfW-Effizienzhaus-Vorhaben ist die Einbindung verpflichtend.  Bei reinen Heizungsförderungen stellen auch oft die ausführenden Unternehmen den Antrag. Praxistip: Haben Sie ein ausführendes Unternehmen beauftragt sollten Sie selbst die Umfeldkosten im Blick halten – die welche nicht von dem Unternehmen abgerechnet werden. Die BAFA hat hierzu eine  Liste solcher förderfähiger Kosten veröffentlicht.', // verbatim (incl. source's double spaces + „Praxistip")
      },
      {
        question: '4. Wie lange dauert eine Energieberatung?', // verbatim
        answer:
          'Von der Beauftragung bis zum fertigen iSFP-Bericht rechnen wir in der Regel mit 6 bis 10 Wochen. Komplettsanierungen zum Effizienzhaus benötigen längere Vorlaufzeiten, da auch die Hausbank für den KfW-Kredit eingebunden werden muss. Unsererseits kann eine Bestätigung zum Antrag (BzA) als Kalkulationsgrundlage für die Hausbank binnen einer Woche nach Vorliegen aller Unterlagen bereitgestellt werden.', // verbatim
      },
      {
        question: '5. Was kostet die Beratung selbst?', // verbatim
        answer:
          'Die BAFA fördert die Energieberatung für Wohngebäude mit bis zu 50 % der förderfähigen Kosten. Wir stimmen mit Ihnen Ihre Ziele und das Projekt ab bevor wir Ihnen ein Angebot erstellen – die Kosten liegen in der Regel effektiv zwischen 2-4% der förderfähigen Kosten. Bei allen Kunden wird unsere Pauschalisierung der Planungskosten trotz hoher Flexibilität im Leistungsspektrum sowie faire Zahlungspläne geschätzt.', // verbatim (incl. source grammar „sowie faire Zahlungspläne geschätzt")
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block. The source
     page has NO support sentence here (unlike the other services) — none
     is invented. */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    primary: { label: 'Jetzt hier Termin buchen', to: '/kontakt' }, // label verbatim
  },
};

export default bestandsgebaeude;
