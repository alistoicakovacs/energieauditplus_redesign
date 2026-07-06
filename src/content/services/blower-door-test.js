import { Crosshair, Fan, ShieldCheck } from 'lucide-react';

/**
 * /leistungen/blower-door-test — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/blower-door-test.md → verbatim 1:1, NEVER rewrite
 *   (headings, intro, benefit cards, Einsatzgebiete, 4 steps, Praxistipp,
 *   FAQ, Beratung). Source typos kept 1:1 per the content mandate (e.g.
 *   card title „bis 35000m3 Luftvolumen", step titles with trailing colon,
 *   FAQ 3 „bei großen Gebäude") — flagged for the client sheet.
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows: NEW COPY: review (numbers verbatim)
 *
 * Structure note (§6.3 mapping): the source's three „Der Fokus: …" lines
 * are card-footer badges scraped out of position; they are kept verbatim
 * in linear source order — the first as details intro, the other two at
 * the end of the Verfahren-A accordion item (both precede the „Gewerbe- &
 * Großobjekte" heading in the source). CTA: the source page has TWO CTAs
 * (Angebotsanfrage + Checkliste); the Checkliste download asset does not
 * exist yet, so both route to /kontakt (TODO, flagged).
 */

export const blowerDoorTest = {
  route: '/leistungen/blower-door-test',
  name: 'Blower-Door-Test', // verbatim (page H1 / nav)

  hero: {
    title: 'Blower-Door-Test', // verbatim blower-door-test.md (H1)
    // verbatim blower-door-test.md (claim heading, 1:1)
    subline: 'Blower-Door-Test: Luftdichtheitsmessung für KfW, GEG und zur Qualitätssicherung',
    // verbatim blower-door-test.md (intro paragraph, 1:1)
    lead: [
      'Ein Blower-Door-Test ist die zentrale Qualitätssicherungs-Maßnahme für die Gebäudehülle. Wir führen zertifizierte Luftdichtheitsmessungen nach DIN EN ISO 9972 durch, ermitteln den n50-Wert Ihres Gebäudes und liefern Ihnen die rechtssichere Dokumentation für KfW-Förderung, GEG-Nachweis, BAFA-Programme und QNG-Zertifizierung. Vom Einfamilienhaus über die energetische Sanierung bis zur Logistikhalle messen wir mit Originalgeräten des Branchenführers BlowerDoor: drei MultipleFan-Systeme und ein MiniFan im Eigenbestand, ergänzt durch ein Partnernetzwerk.',
    ],
    chip: 'bis 35.000 m³', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/06-blower-door', // reuse hero slide 6 image
      alt: 'Moderne Gebäudehülle: weiße Fassade mit Glasfront im Detail', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — 3 benefit cards, titles + texts verbatim */
  nutzen: {
    overline: 'Ihr Nutzen', // NEW COPY: review (eyebrow)
    heading: 'Ihre Vorteile auf einen Blick', // NEW COPY: review (source has no section heading over the 3 cards)
    items: [
      {
        icon: ShieldCheck,
        title: 'Luftdichtheit rechtssicher nachweisen', // verbatim
        text: 'Wir erstellen die geeichten Mess- und Prüfprotokolle, die Ihr Kunde, die KfW oder Dritte verlangen – normgerecht, fristgerecht, vollständig ohne zusätzlichen Koordinierungsaufwand', // verbatim (incl. missing period)
      },
      {
        icon: Crosshair,
        title: 'Präzise Schwachstellenanalyse', // verbatim
        text: 'Wir lokalisieren Leckagen, bevor daraus durch Feuchteeintrag in die Konstruktion teure Bauschäden entstehen. Mit Nebelgenerator, Anemometer und Thermografie zeigen wir exakt, wo die Hülle undicht ist', // verbatim (incl. missing period)
      },
      {
        icon: Fan,
        title: 'Wir messen mit eigener Technik bis 35000m3 Luftvolumen', // verbatim (incl. source's „35000m3" — flag to client before launch)
        text: 'Mit drei MultipleFan-Systemen messen wir auch große Volumina im Multi-Fan-Verbund. Vom MiniFan für kompakte Wohneinheiten bis zur Logistikhalle: Wir haben die passende Konfiguration vorrätig', // verbatim (incl. missing period)
      },
    ],
  },

  /* §6.3.3 Ablauf — heading + 4 steps verbatim blower-door-test.md
     (step titles keep the source's trailing colons 1:1) */
  ablauf: {
    heading: 'Der Prozess: In 4 Schritten zum Zertifikat', // verbatim
    steps: [
      {
        title: 'Vorbereitungs-Check:', // verbatim (incl. trailing colon)
        text: 'Wir beraten Sie zum optimalen Messzeitpunkt im Bauablauf und prüfen die Unterlagen: Grundrisse und Schnitte für die Volumenberechnung nach DIN EN ISO 9972, das vereinbarte Luftdichtheitskonzept und die geforderten n50-Grenzwerte aus Ihrem Gebäudekonzept. Bei komplexen Projekten ist ein Vorabtermin vor Ort im Preis enthalten', // verbatim (incl. missing period)
      },
      {
        title: 'System-Installation:', // verbatim (incl. trailing colon)
        text: 'Unsere zertifizierten Messtechniker bauen das BlowerDoor-System in eine Außentür oder ein Fenster ein, beraten entsprechend dem gewählten Verfahren und fahren die Messung in beiden Druckrichtungen. Aus der Auswertung mehrerer Messpunkte ergibt sich der n50-Wert sowie der korrespondierende Wert q50, die je nach Förderstandard nachzuweisen sind', // verbatim (incl. missing period)
      },
      {
        title: 'Schwachstellenanalyse:', // verbatim (incl. trailing colon)
        text: 'Während der Druckhaltung orten wir verbliebene Undichtigkeiten mit Nebelgenerator und Anemometer. Auf Wunsch ergänzen wir die Leckageortung um eine thermografische Untersuchung – besonders aussagekräftig bei kalter Witterung und in der Bauphase, wenn noch kein Trockenbau oder Dacheindeckung erfolgt ist. Wenn gewünscht erhält jede dokumentierte Leckage eine Fotodokumentation mit Verortung im Grundriss', // verbatim (incl. missing period + source grammar)
      },
      {
        title: 'Digitale Auswertung:', // verbatim (incl. trailing colon)
        text: 'Sie erhalten Ihr Prüfprotokoll zeitnah als PDF: mit allen normgeforderten Angaben zu Gebäudegeometrie, Messbedingungen, Messwerten und ermitteltem n50-Wert.', // verbatim
      },
    ],
  },

  /* §6.3.4 Details — „Einsatzgebiete und Verfahren" (verbatim heading,
     intro = the first „Der Fokus:" line, 3 accordion items). Template
     renders details after the Ablauf; in the source this section sits
     before the process — flagged order deviation. */
  details: {
    heading: 'Blower-Door-Test: Einsatzgebiete und Verfahren', // verbatim
    // verbatim — the first „Der Fokus:" badge line (directly follows the
    // section heading in the source scrape)
    intro: ['Der Fokus: Vermeidung teurer Rückbauarbeiten und nachweislich hohe Ausführungsqualität.'],
    items: [
      {
        title: 'Qualitätssicherung während der Bauphase (Verfahren B)', // verbatim
        content: [
          'Die wirkungsvollste Form der Qualitätssicherung ist die Messung zum richtigen Zeitpunkt: Wir prüfen die luftdichte Ebene – also Dampfbremse, Innenputz und Anschlüsse – solange diese noch sichtbar und zugänglich ist. Nach dem Leitfaden des Fachverbands Luftdichtheit im Bauwesen (FLiB) erfolgt die Überprüfung der Luftdichtheitsebene idealerweise gewerkeweise, bevor Folgegewerke wie Trockenausbau oder Estrich die Ebene überdecken.', // verbatim
          'In dieser Phase identifizieren wir typische Schwachstellen, bevor sie verbaut werden: Dachflächenfenster mit unzureichendem Anschluss, Durchdringungen am Fußpunkt des Daches durch Heizungs- und Elektroinstallation, gerissene Holzbalken im Anschluss an die Dampfbremse oder die Anarbeitung an Giebelwände und Innenwände in Holzständerbauweise. Wer hier nacharbeiten muss, tut das mit Tackernadel und Klebeband – nicht mit Rückbau.', // verbatim
        ],
      },
      {
        title: 'Offizieller GEG-Nachweis & Schlussprüfung (Verfahren A)', // verbatim
        content: [
          'Der energetische Fingerabdruck Ihrer fertigen Immobilie. Diese Messung im bezugsfertigen Zustand ist die Voraussetzung für die finale Bestätigung Ihrer KfW-Effizienzhaus- oder Effizienzgebäude-Klasse und damit für die Auszahlung Ihrer Fördergelder. Sie ist ebenfalls der formale Nachweis nach GEG, sofern dort eine Luftdichtheitsmessung gefordert ist – etwa bei Gebäuden mit raumlufttechnischen Anlagen.', // verbatim
          'Wir messen geeicht und normgerecht nach DIN EN ISO 9972, dokumentieren beide Druckrichtungen (Über- und Unterdruck), erstellen das Prüfprotokoll inklusive aller geforderten Randbedingungen und übergeben es Ihnen digital – bereit zur Einreichung bei Ihrem Kunden, KfW oder dem zuständigen Energieeffizienz-Experten.', // verbatim
          'Der Fokus: Qualitätsnachweis gegenüber Banken, Behörden und Förderstellen.', // verbatim (badge line, kept in linear source order)
          'Der Fokus: Überregionale Abwicklung des gesamten Leistungsspektrums in Nord- und Ostdeutschland - alles aus einer Hand.', // verbatim (badge line incl. plain hyphen, kept in linear source order — precedes the Gewerbe heading in the scrape)
        ],
      },
      {
        title: 'Gewerbe- & Großobjekte', // verbatim
        content: [
          'Bei Hallen, Bürokomplexen, Schulen, Kitas oder Logistikzentren skaliert unsere Messtechnik mit dem Projekt. Wir setzen drei Original-BlowerDoor-MultipleFan-Systeme ein und betreiben sie bei Bedarf im Multi-Fan-Verbund – so erreichen wir auch in großen Lufträumen die normgerechte Druckdifferenz von 50 Pa. Für noch größere Gebäude arbeiten wir mit einem Netzwerk spezialisierter Partner zusammen, die uns mit drei Wochen Vorlauf weitere Geräte stellen.', // verbatim
          'Komplexe Gebäudegeometrien, mehrere Brandabschnitte, Foyers mit hohen Lufträumen, unterirdische Geschosse oder ein Baugebiet mit 60 gleichen Gebäuden erfordern eine sorgfältige Planung der Messzonen und Gerätekonfiguration. Diese Vorbereitung übernehmen wir vor der Anfahrt – inklusive Abstimmung mit Ihrem Projektsteuerer und dem ausführenden Gewerk.', // verbatim
        ],
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für dichte Gebäude sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim card title: „bis 35000m3 Luftvolumen"
        value: 35000,
        prefix: 'bis ',
        suffix: ' m³',
        label: 'Luftvolumen messen wir mit eigener Technik', // NEW COPY: review (label)
      },
      {
        // verbatim: „die normgerechte Druckdifferenz von 50 Pa"
        value: 50,
        suffix: ' Pa',
        label: 'normgerechte Druckdifferenz nach DIN EN ISO 9972', // NEW COPY: review (label)
      },
      {
        // verbatim: „drei MultipleFan-Systeme und ein MiniFan im Eigenbestand"
        value: 3,
        label: 'Original-BlowerDoor-MultipleFan-Systeme im Eigenbestand', // NEW COPY: review (label)
      },
      {
        // verbatim: „dokumentieren beide Druckrichtungen (Über- und Unterdruck)"
        value: 2,
        label: 'Druckrichtungen (Über- und Unterdruck) in jedem Prüfprotokoll', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 Praxistipp — verbatim heading fragment (after „Praxistipp: ") */
  praxistipp: 'Falten im Klebeband vermeiden und Formteile nutzen',

  /* §6.3.6 FAQ — heading + 6 Q/A verbatim (source typos kept 1:1) */
  faq: {
    heading: 'FAQ', // verbatim (source heading)
    items: [
      {
        question: '1. Wann sollte der Test stattfinden?', // verbatim
        answer:
          'Idealerweise findet nach Verfahren B der Test nach Fenstereinbau und Fertigstellung der luftdichten Ebene, aber vor dem Verkleiden der Wände statt. Hier sind die Kosten für Nacharbeiten am geringsten.', // verbatim
      },
      {
        question: '2. Ist der Test für QNG/KFN Pflicht?', // verbatim
        answer:
          'Ja, für die notwendigen Nachweise ist der Nachweis der Luftdichtheit ein obligatorischer Bestandteil der Zertifizierung – insbesondere beim Einbau einer Lüftungsanlage.', // verbatim
      },
      {
        question: '3. Ist ein Blower-Door-Test auch bei einer Sanierung oder im Altbau sinnvoll?', // verbatim
        answer:
          'Absolut. Gerade bei der energetischen Sanierung hilft der Test, versteckte Schwachstellen in der bestehenden Bausubstanz zu finden. So verhindern Sie, dass teure Heizenergie durch unbemerkte Fugen im Dach oder Feuchtigkeit an unvorgesehenen Stellen kondensiert. Auch wird die Heizlastberechnung maßgeblich von der Gebäudedichtheit beeinflusst. Um die Wärmepumpe nicht zu groß oder zu klein auszulegen ist der Test hier insbesondere bei großen Gebäude zu empfehlen.', // verbatim (incl. source's „bei großen Gebäude")
      },
      {
        question: '4. Was passiert bei Leckagen?', // verbatim
        answer:
          'Wir vereinbaren den Termin frühzeitig mit Ihren ausführenden Unternehmen und weisen auf offensichtliche Schwachstellen schon vorher hin. Beim Termin selbst können alle gemeinsam die Baustelle begehen und auf Wunsch dokumentieren wir die Schwachstellen präzise, sodass Sie gezielt nachbessern können. Eine Nachmessung kann dann zeitnah erfolgen ist aber in der Regel vermeidbar.', // verbatim (incl. source's missing comma „erfolgen ist aber")
      },
      {
        question: '5. Erhalte ich das Ergebnis sofort nach dem Test?', // verbatim
        answer:
          'Unsere Experten geben Ihnen direkt vor Ort eine erste Einschätzung und besprechen den ermittelten n50-Wert mit Ihnen. Die detaillierte Auswertung und das offizielle, rechtssichere Prüfprotokoll erhalten Sie in der Regel innerhalb weniger Werktage digital als PDF.', // verbatim
      },
      {
        question: '6. Was passiert, wenn das Gebäude den Test nicht besteht?', // verbatim
        answer:
          'Sollte der n50-Wert über den zulässigen Grenzwerten liegen, nutzen wir die laufende Messung zur gezielten Leckageortung. Wir zeigen Ihnen genau auf, an welchen Stellen nachgebessert werden muss. Nach der Mängelbeseitigung kann eine zeitnahe Nachmessung erfolgen, um die Konformität für die KfW-Förderung sicherzustellen. Eine Nachmessung probieren wir stets zu vermeiden und ist bei Beachtung der klassischen Fehlerquellen selten.', // verbatim (incl. source grammar in the last sentence)
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block (the source's
     two-line support sentence joined into one line). Both source CTAs kept
     verbatim; the Checkliste download asset does not exist yet, so both
     route to /kontakt. TODO: link the real Checkliste asset when the
     client delivers it. */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    support:
      'Mit unserem Blower-Door-Test decken wir Leckagen frühzeitig auf und sichern die Qualität Ihres Bauprojekts.', // verbatim
    primary: { label: 'Angebotsanfrage - Blower-Door-Test', to: '/kontakt' }, // label verbatim (incl. plain hyphen)
    secondary: { label: 'Checkliste - Blower-Door-Test', to: '/kontakt' }, // label verbatim (incl. plain hyphen)
  },
};

export default blowerDoorTest;
