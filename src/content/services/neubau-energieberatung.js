import { BadgeEuro, FileSignature, PackageCheck } from 'lucide-react';

/**
 * /leistungen/neubau-energieberatung — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/neubau-energieberatung.md → verbatim 1:1, NEVER rewrite
 *   (headings, intro, benefit cards, 6 steps, Praxistipp, FAQ, Beratung)
 * - hero chip + card one-liner: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows: NEW COPY: review (numbers verbatim)
 */

export const neubauEnergieberatung = {
  route: '/leistungen/neubau-energieberatung',
  name: 'Neubau & Energieberatung', // verbatim (page H1 / nav)

  hero: {
    title: 'Neubau & Energieberatung', // verbatim neubau-energieberatung.md (H1)
    // verbatim neubau-energieberatung.md (claim heading, 1:1)
    subline: 'Förderfähig bauen – wir machen Ihren Neubau förderreif',
    // verbatim neubau-energieberatung.md (intro, both paragraphs 1:1)
    lead: [
      'Mit dem „Klimafreundlichen Neubau im Niedrigpreissegment" (KNN, Programm 296) und dem „Klimafreundlichen Neubau" (KFN, Programme 297/298/300) stellt die KfW zinsverbilligte Kredite zwischen 100.000 € und 150.000 € pro Wohneinheit bereit – aber nur, wenn alle technischen Mindestanforderungen lückenlos nachgewiesen werden.',
      'Wir von EnergieAudit Plus erstellen das energetische Konzept, führen die Lebenszyklusanalyse (LCA) durch, begleiten die Nachhaltigkeitszertifizierung (QNG) und liefern Ihnen die rechtssicheren Nachweise für Hausbank, KfW und Dritte – aus einer Hand und in einem konsistenten Datenstand.',
    ],
    chip: 'bis zu 150.000 € / WE', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/01-neubau', // reuse hero slide 1 image
      alt: 'Modernes, energieeffizientes Neubau-Wohnhaus mit großen Glasflächen in der Abenddämmerung', // NEW COPY: review (from heroSlides.js)
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
        text: 'Bis zu 150.000 € zinsverbilligter Kredit pro Wohneinheit', // verbatim
      },
      {
        icon: PackageCheck,
        title: 'Ein Ersteller, alle Nachweise', // verbatim
        text: 'GEG-Nachweis, LCA, QNG-Dokumentation und Blower-Door-Test aus einer Hand – das schafft Vertrauen, fällt leicht zu koordinieren und reduziert Risiken', // verbatim
      },
      {
        icon: FileSignature,
        title: 'Individuelle Vertragslösungen', // verbatim
        text: 'Vor jeder Zusammenarbeit erhalten Sie ein konkretes Angebot mit klar definierten Leistungen, Verantwortlichkeiten und Zahlungsplan', // verbatim
      },
    ],
  },

  /* §6.3.3 Ablauf — heading + 6 steps verbatim neubau-energieberatung.md */
  ablauf: {
    heading: 'Der Prozess: In 6 Schritten zur Förderung', // verbatim
    steps: [
      {
        title: 'Grundkonzept mit Lebenszyklusanalyse', // verbatim
        text: 'Wir erstellen das energetische Gesamtkonzept – GEG-Nachweis für Effizienzhaus 40 oder 55, Wärmebrückengrobplanung, Konzept für sommerlichen Wärmeschutz, energetische Zonierung, Lüftungskonzept nach DIN 1946-6 und Luftdichtheitskonzept. Parallel läuft die erste LCA-Variantenrechnung mit den QNG-Rechenwerten 2023.', // verbatim
      },
      {
        title: 'Wohnflächen- und Baukostenoptimierung (KfW 296)', // verbatim
        text: 'Wir füllen das KNN-Berechnungstool der KfW aus, optimieren das Verhältnis von Raumanzahl zu Wohnfläche und prüfen die standortgerechten modifizierten Lebenszykluskosten gegen den Anforderungswert. Das Ergebnisblatt wird unterzeichnet und ist Grundlage für BzA und BnD.', // verbatim
      },
      {
        title: 'Bestätigung zum Antrag (BzA) und KfW-Antragstellung', // verbatim
        text: 'Wir erstellen die BzA und übergeben sie an Ihren Finanzierungspartner. Der Antrag muss vor jedem Vorhabenbeginn bei der KfW eingehen. Bei Eigentumswohnungsprojekten bieten wir einen Fördermittelservice der dem Vertrieb binnen 24 Stunden eine BzA pro Käufer zusichert.', // verbatim (incl. source's missing comma)
      },
      {
        title: 'Zertifizierungsanmeldung und QNG-Begleitung (KfW 297/298/300)', // verbatim
        text: 'Anmeldung bei der Zertifizierungsstelle, Variantenberechnung LCA/LCC, Zielvereinbarungsgespräch mit dem Bauherrn, fortlaufende Dokumentation der QNG-Kriterien (Innenraumlufthygiene, Trinkwasserhygiene, sommerlicher Wärmeschutz, Tageslicht, Barrierefreiheit, Materialien).', // verbatim
      },
      {
        title: 'Baubegleitung und Fortschreibung aller Nachweise', // verbatim
        text: 'Während der Bauphase besuchen wir die Baustelle, dokumentieren mit 360°-Kamera und Thermografie, prüfen Fachunternehmererklärungen, schreiben den GEG-Nachweis, das Wärmebrückenkonzept und die Oberflächendeklaration kontinuierlich fort und führen den Blower-Door-Test durch.', // verbatim
      },
      {
        title: 'Bestätigung nach Durchführung (BnD) und Übergabe', // verbatim
        text: 'Wir erstellen die Dokumentation zur Konformitätsprüfung und übergeben Ihnen die Gebäudeakte - ergänzt durch das digitale Gebäudehandbuch als Wertsteigerung für Bestand und Wiederverkauf. Nach Ausstellung des QNG-Siegels durch die Zertifizierungsstelle BiRN oder DGNB dürfen wir die BnD ausstellen.', // verbatim (incl. source's plain hyphen)
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für Ihren Neubau sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim: „Bis zu 150.000 € zinsverbilligter Kredit pro Wohneinheit"
        value: 150000,
        prefix: 'bis zu ',
        suffix: ' €',
        label: 'zinsverbilligter KfW-Kredit pro Wohneinheit',
      },
      {
        // verbatim: „binnen 24 Stunden eine BzA pro Käufer"
        value: 24,
        prefix: 'binnen ',
        suffix: ' h',
        label: 'eine BzA pro Käufer bei Eigentumswohnungsprojekten', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 3: „bewertet die Umweltwirkungen Ihres Gebäudes über 50 Jahre"
        value: 50,
        suffix: ' Jahre',
        label: 'Betrachtungszeitraum der Lebenszyklusanalyse', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 5: „bis 12 Monate nach Fertigstellung in Anspruch nehmen"
        value: 12,
        prefix: 'bis ',
        suffix: ' Monate',
        label: 'nach Fertigstellung können Käufer die Förderung noch beantragen', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 Praxistipp — verbatim heading fragment (after „Praxistipp: ") */
  praxistipp: 'Die größten Kosteneinsparungen sind in der Entwurfsphase möglich',

  /* §6.3.6 FAQ — heading + 5 Q/A verbatim (incl. source URLs) */
  faq: {
    heading: 'FAQ', // verbatim (source heading)
    items: [
      {
        question: '1. Was ist der Unterschied zwischen KNN (296) und KFN (297/298/300)?', // verbatim
        answer: [
          'Beim Klimafreundlichen Neubau im Niedrigpreissegment (KNN) reicht der Effizienzhaus-Standard 55 in Kombination mit einer LCA, die das Treibhauspotenzial einhält. Zusätzlich müssen Wohnflächen und Baukosten standortgerecht über das KNN-Berechnungstool der KfW optimiert und begrenzt werden. Förderbetrag: bis zu 100.000 € pro Wohneinheit zu sehr günstigem Zins. Beim Klimafreundlichen Neubau (KFN)  kann bis zu 100 000€/Kredit pro Wohneinheit zu höherem Zins ebenfalls im Effizienzhaus 55 Standard ohne LCA und ohne QNG gebaut werden. Sind erhöhte steuerliche Abschreibungen oder bis zu 150 000€/Kredit pro Wohneinheit geplant ist der Effizienzhaus-Standard 40 verpflichtend, kombiniert mit einer LCA und dem QNG-Siegel.', // verbatim (incl. source's double space + spacing)
          'Tagesaktuelle Zinskonditionen: https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger', // verbatim (TODO: render as Link primitive in a later polish pass)
        ],
      },
      {
        question: '2. Brauche ich für die KfW-Neubauförderung zwingend ein QNG-Siegel?', // verbatim
        answer: [
          'Das QNG-Siegel ist im Programm „Klimafreundlicher Neubau” (KfW 297/298) nicht verpflichtend, eröffnet aber die höhere Förderstufe. Ohne QNG sind bis zu 100.000 Euro je Wohnung als Kreditbetrag möglich, mit QNG-Siegel bis zu 150.000 Euro je Wohnung. Der zinsverbilligte Kredit selbst bleibt unverändert – die zinsverbilligte Summe wird mit QNG aber deutlich größer.', // verbatim
          'Für die meisten Investoren ist allerdings der steuerliche Vorteil durch die erhöhte Abschreibung bei fremdgenutzten Immobilien der entscheidende Faktor. Für Einfamilienhausbesitzer verspricht das Siegel höhere Prozessqualität; verpflichtende Beratungen zu verschiedenen Themen wie Einbruchschutz und Barrierefreiheit gehören genauso dazu wie das alle Ausführungsunterlagen vor Baubeginn vorlagen. Weiterhin ist für alle Nutzer generell das QNG Siegel attraktiv, da es niedrigere Schadstoffbelastungen im Innenraum verspricht.', // verbatim (incl. source grammar)
        ],
      },
      {
        question: '3. Was ist eine LCA und warum brauche ich sie?', // verbatim
        answer:
          'Die Lebenszyklusanalyse bewertet die Umweltwirkungen Ihres Gebäudes über 50 Jahre – von der Rohstoffgewinnung über Herstellung, Nutzung und Instandhaltung bis zum Rückbau. Sie ist Pflichtnachweis für alle KfW-Neubauprogramme außer 297/298 im KfW 55 Standard. Berechnet wird nach Standardwerten pro Baustoff unabhängig vom Hersteller. Das Ergebnis ist das Treibhauspotenzial GWP100 in kg CO₂-Äquivalent pro m² und Jahr. Es muss unter den vom QNG-PLUS vorgegebenen Grenzwert liegen. Ab 2028 wird die LCA für eine Vielzahl an Bauvorhaben verpflichtend.', // verbatim
      },
      {
        question: '4. Müssen meine Wohnungen eine bestimmte Größe haben?', // verbatim
        answer:
          'Beim KNN 296 ja. Die KfW verlangt ein festes Verhältnis zwischen Wohnfläche und Anzahl der Wohnräume nach Wohnflächenverordnung: mindestens 2 Wohn-/Schlaf-/Kinderzimmer bis 55 m², mindestens 3 bis 70 m², mindestens 4 bis 85 m². Seit September 2025 zählt eine Küche oder Wohnküche als zusätzlicher Aufenthaltsraum. In großen Mehrfamilienhäusern mit zwölf oder mehr Wohneinheiten dürfen maximal 25 % der Wohnungen kleiner als 40 m² sein (außer in Wohn- und Pflegeheimen). Das Programm 296 richtet sich an alle, die bezahlbaren, klimafreundlichen Wohnraum schaffen wollen. Es kombiniert drei Anforderungen, die zusammen erfüllt sein müssen: ein moderner energetischer Standard EH 55, eine Lebenszyklusanalyse und eine strenge Flächen- und Kostenoptimierung. Bei KFN 297/298/300 gibt es diese Flächengrenzen nicht.', // verbatim
      },
      {
        question: '5. Wer darf den Antrag stellen und wann?', // verbatim
        answer:
          'Antragsberechtigt sind Privatpersonen, Unternehmen, Wohnungseigentümergemeinschaften und Investoren. Der Antrag muss vor Vorhabenbeginn bei der KfW eingegangen sein – ein Baustart davor ist förderschädlich. Zur Beantragung benötigen Sie zwingend einen in der Energieeffizienz-Expertenliste eingetragenen Energieeffizienz-Experten (EEE) mit Zusatzqualifikation Neubau Wohngebäude. Bei neu errichteten Gebäuden kann ein Käufer die Fördermittel bis 12 Monate nach Fertigstellung in Anspruch nehmen.', // verbatim
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    // verbatim (incl. source grammar „mit Herr Frederik Lippe")
    support:
      'Sprechen Sie direkt und kostenlos mit Herr Frederik Lippe über Neubau und Energieberatung und den richtigen Weg für Ihr Projekt.',
    primary: { label: 'Jetzt hier Termin buchen', to: '/kontakt' }, // label verbatim
  },
};

export default neubauEnergieberatung;
