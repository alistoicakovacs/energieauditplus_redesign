import { BadgeCheck, Building2, Home, Landmark } from 'lucide-react';

/**
 * /leistungen/raumluftmessung-baubiologie — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/raumluftmessung-baubiologie.md → verbatim 1:1, NEVER
 *   rewrite (headings, intro, the four „Wann Sie …"-Karten, 4 steps,
 *   Praxistipp, FAQ, Beratung). Source typos kept 1:1 per the content
 *   mandate (e.g. „akkrediertes Prüfprotokoll" in the intro, step texts
 *   without closing period) — flagged for the client sheet.
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows: NEW COPY: review (numbers verbatim)
 *
 * Structure note (§6.3 mapping): the source has no separate 3-card benefit
 * block; its card grid is „Wann Sie eine Raumluftmessung wirklich brauchen"
 * (4 cards with Pflicht/Zusatzpunkte badges) → mapped onto the Nutzen grid
 * (4 items, within the 3–5 contract). The badge lines („Pflicht",
 * „Optionale Zusatzpunkte") precede each card heading in the source HTML
 * scrape; IconCard has no badge slot, so they open the card text (joined
 * with newlines, collapsing to spaces in the rendered paragraph).
 */

export const raumluftmessungBaubiologie = {
  route: '/leistungen/raumluftmessung-baubiologie',
  name: 'Raumluftmessung & Baubiologie', // verbatim (nav / breadcrumb / route title)

  hero: {
    title: 'Raumluftmessung & Baubiologie', // verbatim raumluftmessung-baubiologie.md (H1)
    // verbatim raumluftmessung-baubiologie.md (claim heading, 1:1)
    subline: 'Ihr Schadstoff-Nachweis für QNG, DGNB und öffentliche Gebäude',
    // verbatim raumluftmessung-baubiologie.md (intro paragraph, 1:1 —
    // incl. source typo „akkrediertes Prüfprotokoll")
    lead: [
      'Die Raumluftmessung ist der wissenschaftliche Nachweis, dass Ihr Gebäude wohngesund ist. Wir führen Schadstoffmessungen auf VOC, Formaldehyd und weitere Innenraumschadstoffe nach DIN EN ISO 16000 durch – akkreditiert, fördersicher und mit klarer Aussage für Ihren Zertifizierungs-Auditor. Ob freiwillig zur Erreichung des QNG-Premium-Standards im Wohnungsbau, als Pflichtnachweis für geförderte Nichtwohngebäude, DGNB-zertifizierte Vorhaben oder öffentliche Baumaßnahmen gemäß Baugenehmigung: Wir liefern Ihnen ein akkrediertes Prüfprotokoll. Aus einer Hand – kombiniert mit Blower-Door-Test, Energieberatung und QNG-Auditierung. Damit werden Risiken reduziert für nachweislich gesunde Innenräume.',
    ],
    chip: 'QNG · DGNB', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/05-raumluft', // reuse hero slide 5 image
      alt: 'Helles, luftiges Wohnzimmer mit großen Fensterflächen', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — the four „Wann Sie …"-Karten, titles + texts verbatim.
     Badge lines open each card text (see structure note above). */
  nutzen: {
    overline: 'Einsatzfälle', // NEW COPY: review (eyebrow)
    heading: 'Wann Sie eine Raumluftmessung wirklich brauchen', // verbatim
    items: [
      {
        icon: Home,
        title: 'Wohngebäude im BiRN-/QNG-System', // verbatim
        text: 'Optionale Zusatzpunkte\nIndikator 1.1.1 – Innenraumlufthygiene\nKeine Pflicht, aber bis zu 50 Checklistenpunkte. Für den QNG-Premium-Standard faktisch erforderlich, da sie die Deklaration emissionsarmer Bauprodukte ergänzt.\nKurz: Pflicht? Nein. Empfohlen? Ja. Notwendig für QNG-Premium? In aller Regel ja.', // verbatim (all four source lines, joined)
      },
      {
        icon: Building2,
        title: 'Nichtwohngebäude im DGNB-/QNG-System', // verbatim
        text: 'Pflicht\nKriterium SOC 1.2\nVerpflichtender Nachweis der Innenraumlufthygiene. Ohne Messung keine Zertifizierung und damit kein Anspruch auf die Förderung.', // verbatim (badge + both source lines, joined)
      },
      {
        icon: BadgeCheck,
        title: 'DGNB-Zertifizierung - WG & NWG', // verbatim (incl. source's plain hyphen)
        text: 'Pflicht\nKriterium SOC 1.2\nMessung spätestens 28 Tage nach Fertigstellung. Bei TVOC > 3.000 µg/m³ oder Formaldehyd > 120 µg/m³ ist keine DGNB-Zertifizierung möglich.', // verbatim (badge + both source lines, joined)
      },
      {
        icon: Landmark,
        title: 'Öffentliche Gebäude', // verbatim
        text: 'Pflicht\nBaugenehmigung\nBei Schulen, Kitas und Verwaltungsgebäuden ist die Raumluftmessung vielfach Bestandteil der Baugenehmigung – auch ohne Fördermittel. Zur Aufnahme des Betriebs muss diese vorliegen.', // verbatim (badge + both source lines, joined)
      },
    ],
  },

  /* §6.3.3 Ablauf — heading + 4 steps verbatim raumluftmessung-baubiologie.md */
  ablauf: {
    heading: 'So läuft Ihre Raumluftmessung ab', // verbatim
    steps: [
      {
        title: 'Vorbesprechung & Messstrategie', // verbatim
        text: 'Wir besprechen den richtigen Messzeitpunkt, die Anzahl der zu messenden Räume (1 Raum je angefangene 150 m² Wohnfläche bei BNK; nutzungsabhängig bei DGNB) und die Anforderungen des jeweiligen Zertifizierungssystems. Wir beraten Sie zu den wichtigsten Punkten', // verbatim (incl. source's missing closing period)
      },
      {
        title: 'Vor-Ort-Probenahme', // verbatim
        text: 'Unsere zertifizierten Sachverständigen führen die Probenahme nach DIN EN ISO 16000-1 (Probenahmestrategie), 16000-3 (Formaldehyd) und 16000-6 (VOC mit Tenax und GC-MS) durch. Die Räume werden zuvor unter standardisierten Bedingungen 8 Stunden geschlossen gehalten („8-Stunden-Vorlauf"). Wir dokumentieren Datum, Uhrzeit, Temperatur, Luftfeuchte und Lüftungssituation', // verbatim (incl. source's missing closing period)
      },
      {
        title: 'Laboranalyse durch akkreditierte Prüfstelle', // verbatim
        text: 'Die Proben werden im akkreditierten Labor analysiert. Sie erhalten je nach Messumfang in 10–15 Werktagen den Prüfbericht mit Einzelverbindungen, TVOC, Formaldehyd und Einstufung gegen alle relevanten Richtwerte (RW I/II UBA, AGÖF-Werte, DGNB-/BNK-Grenzwerte)', // verbatim (incl. source's missing closing period)
      },
      {
        title: 'Prüfbericht', // verbatim
        text: 'Sie erhalten den Prüfbericht als unterschriebenes PDF inklusive klarer Empfehlung: Erfüllt das Gebäude die Anforderungen Ihres Zertifizierungssystems? Welche Punkte bringt das Ergebnis? Wir liefern die Ergebnisse an Ihren QNG-Auditor oder integrieren diese im besten Fall direkt in Ihre Zertifizierungsunterlagen.', // verbatim
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für gesunde Innenräume sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim: „Keine Pflicht, aber bis zu 50 Checklistenpunkte"
        value: 50,
        prefix: 'bis zu ',
        label: 'Checklistenpunkte im BiRN-/QNG-System (Indikator 1.1.1)', // NEW COPY: review (label)
      },
      {
        // verbatim: „Messung spätestens 28 Tage nach Fertigstellung"
        value: 28,
        suffix: ' Tage',
        label: 'Messfrist nach Fertigstellung bei DGNB-Projekten', // NEW COPY: review (label)
      },
      {
        // verbatim: „1 Raum je angefangene 150 m² Wohnfläche bei BNK"
        value: 150,
        prefix: 'je ',
        suffix: ' m²',
        label: 'Wohnfläche wird ein Aufenthaltsraum gemessen (BNK/QNG-Wohn)', // NEW COPY: review (label)
      },
      {
        // verbatim: „in 10–15 Werktagen den Prüfbericht"
        value: 15,
        prefix: '10–',
        suffix: ' Werktage',
        label: 'bis zum Prüfbericht aus dem akkreditierten Labor', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 Praxistipp — verbatim heading fragment (after „Praxistipp: ") */
  praxistipp: 'Heizen und Lüften lässt Schadstoffe zügig ausdünsten',

  /* §6.3.6 FAQ — heading + 7 Q/A verbatim */
  faq: {
    heading: 'FAQ', // verbatim (source heading)
    items: [
      {
        question: '1. Wann muss die Raumluftmessung im QNG durchgeführt werden?', // verbatim
        answer:
          'Spätestens vier Wochen nach Fertigstellung des Gebäudes. Voraussetzung: Alle Gewerke abgenommen, Lüftungsanlage in Betrieb, Bodenbeläge, Wand- und Deckenbeläge eingebaut. Die Räume sollten möglichst noch ohne lose Möblierung sein. Bei DGNB-Projekten gilt eine Frist von 28 Tagen.', // verbatim
      },
      {
        question: '2. Wie viele Räume müssen gemessen werden?', // verbatim
        answer:
          'Bei BNK/QNG-Wohn: ein Aufenthaltsraum (Wohn-, Schlaf- oder Kinderzimmer) pro angefangene 150 m² Wohnfläche. Bei mehreren gleichen Räumen wird der mit dem größten Verhältnis Oberfläche zu Volumen gewählt. Bei DGNB richtet sich die Anzahl nach der Nutzung des Gebäudes.', // verbatim
      },
      {
        question: '3. Wie viel kostet eine Raumluftmessung?', // verbatim
        answer:
          'Die Kosten hängen vom Messumfang und der Anzahl der Räume ab. Für eine VOC- und Formaldehydmessung in einem Einfamilienhaus im Rahmen der Baubetreuung liegen die Kosten in der Regel bei ca. 1.200 € netto. Bei Mehrfamilienhäusern, gewerblichen oder öffentlichen Gebäuden erstellen wir Ihnen ein individuelles Angebot.', // verbatim
      },
      {
        question: '4. Was passiert, wenn die Grenzwerte überschritten werden?', // verbatim
        answer:
          'Bei Überschreitung erstellen wir einen Maßnahmenplan mit konkreten Handlungsempfehlungen. Anschließend ist eine Wiederholungsmessung möglich.', // verbatim
      },
      {
        question: '5. Welche Normen liegen der Raumluftmessung zugrunde?', // verbatim
        answer:
          'Unsere Messungen erfolgen nach DIN EN ISO 16000-1 (Messstrategie), -3 (Formaldehyd, DNPH), -5 (VOC-Messstrategie), -6 (VOC mit Tenax/GC-MS), VDI 4300-Reihe sowie den Richtlinien des Verbands deutscher Baubiologen (VDB). Für die Bewertung nutzen wir die Richtwerte RW I und RW II des Umweltbundesamtes, die AGÖF-Neubau-Orientierungswerte sowie die Anforderungen des jeweiligen Zertifizierungssystems (QNG, BNK, DGNB, BNB).', // verbatim
      },
      {
        question: '6. Was ist der Unterschied zwischen Deklaration von Schadstoffen und Messung von Schadstoffen?', // verbatim
        answer:
          'Die Deklaration (Teilindikator 1.1) ist der Nachweis über die eingesetzten emissionsarmen Bauprodukte (Sicherheitsdatenblätter, Herstellererklärungen, Umweltkennzeichen). Die Messung (Teilindikator 1.2, SOC 1.2) ist die labortechnische Überprüfung der tatsächlichen Raumluftqualität.', // verbatim
      },
      {
        question: '7. Lohnt sich die Raumluftmessung auch ohne Zertifizierung?', // verbatim
        answer:
          'Ja. Eine Schadstoffmessung ist die einzige Möglichkeit, Wohngesundheit objektiv nachzuweisen. Für Bauherren, Vermieter, Mieter und Käufer ist sie ein Qualitätsnachweis.', // verbatim
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block (the source's
     two-line support sentence joined into one line) */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    support:
      'Sprechen Sie direkt und kostenlos mit Herr Thomas Schubert über Raumluftmessung und Baubiologie und den richtigen Weg für Ihr Projekt.', // verbatim (incl. source grammar „mit Herr Thomas Schubert")
    primary: { label: 'Jetzt hier Termin buchen', to: '/kontakt' }, // label verbatim
  },
};

export default raumluftmessungBaubiologie;
