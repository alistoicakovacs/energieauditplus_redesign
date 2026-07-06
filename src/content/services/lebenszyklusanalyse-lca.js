import { BadgeEuro, Gauge, PackageCheck } from 'lucide-react';

/**
 * /leistungen/lebenszyklusanalyse-lca — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/lebenszyklusanalyse-lca.md → verbatim 1:1, NEVER
 *   rewrite (headings, intro, benefit cards, „Was ist eine LCA?", 4 steps,
 *   Praxistipp, FAQ, Beratung). Source typos kept 1:1 per the content
 *   mandate (e.g. FAQ 5 „Spezialssysteme", missing commas) — flagged for
 *   the client sheet.
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows: NEW COPY: review (numbers verbatim)
 *
 * Structure note (§6.3 mapping): „Was ist eine Lebenszyklusanalyse (LCA)?"
 * is a prose section without sub-items → expressed as details heading +
 * intro with an EMPTY accordion (Accordion renders nothing for []). In
 * the source it sits between the benefit cards and the process; the
 * template renders details AFTER the Ablauf — flagged order deviation.
 */

export const lebenszyklusanalyseLca = {
  route: '/leistungen/lebenszyklusanalyse-lca',
  name: 'Lebenszyklusanalyse (LCA)', // verbatim (nav / breadcrumb / route title)

  hero: {
    title: 'Lebenszyklusanalyse (LCA)', // verbatim lebenszyklusanalyse-lca.md (H1)
    // verbatim lebenszyklusanalyse-lca.md (claim heading, 1:1)
    subline: 'Ökobilanzen für Ihre KfW-Förderung, QNG-Zertifizierung und als baurechtlicher Nachweis',
    // verbatim lebenszyklusanalyse-lca.md (intro paragraph, 1:1)
    lead: [
      'Die Lebenszyklusanalyse (LCA) ist heute der entscheidende Nachweis für die staatliche Neubauförderung und das Qualitätssiegel Nachhaltiges Gebäude (QNG). Wir erstellen Ihre Ökobilanz nach DIN EN 15978 auf Basis der ÖKOBAUDAT und der QNG-Bilanzierungsregeln – belastbar, prüfsicher und so früh in der Planung, dass Sie die Grenzwerte sicher und wirtschaftlich einhalten. Ab 2028 kommt die verpflichtende LCA in vielen Bereichen des Bauens auch ohne Fördermittel.',
    ],
    chip: 'DIN EN 15978', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/04-lca', // reuse hero slide 4 image
      alt: 'Rohbau von oben: Bewehrung und Leitungen einer Geschossdecke auf der Baustelle', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — heading + 3 benefit cards verbatim */
  nutzen: {
    overline: 'Ihr Nutzen', // NEW COPY: review (eyebrow)
    heading: 'Ihre Vorteile mit unserer LCA-Beratung', // verbatim
    items: [
      {
        icon: BadgeEuro,
        title: 'Wirtschaftlich Standards erfüllen', // verbatim
        text: 'Mit einer normgerechten LCA und QNG-Zertifizierung erreichen Sie im KFN bis zu 150.000 € KfW-Kredit pro Wohneinheit – plus die erhöhte steuerliche Abschreibung zusammen mit dem EH 40 Standard und dem Qualitätssiegel Nachhaltige Gebäude (QNG).', // verbatim
      },
      {
        icon: Gauge,
        title: 'Grenzwerte sicher einhalten', // verbatim
        text: '24 kg CO₂-Äq./(m²·a) für QNG-PLUS, 20 für QNG-PREMIUM: Wir prüfen Ihre Konstruktion frühzeitig und optimieren Materialwahl sowie Anlagentechnik, bevor teure Planänderungen nötig werden.', // verbatim
      },
      {
        icon: PackageCheck,
        title: 'Komplettnachweis aus einer Hand', // verbatim
        text: 'Energieberatung, LCA, GEG-Nachweis und QNG-Begleitung – wir liefern alle erforderlichen Berechnungen, Plausibilitätsprüfungen und Auditor-Unterlagen aus einer Hand.', // verbatim
      },
    ],
  },

  /* §6.3.3 Ablauf — heading + 4 steps verbatim lebenszyklusanalyse-lca.md */
  ablauf: {
    heading: 'Der LCA-Prozess: In 4 Schritten zur Ökobilanz', // verbatim
    steps: [
      {
        title: 'Ziel und Untersuchungsrahmen', // verbatim
        text: 'Wir definieren die funktionelle Einheit (in der Regel 1 m² Netto-Raumfläche NRF(R) pro Jahr), die Systemgrenzen (welche Bauwerksteile und Anlagen werden bilanziert), den Betrachtungszeitraum (50 Jahre nach QNG) und das Zielsiegel (QNG-PLUS, QNG-PREMIUM, abweichende Standards). Die Systemgrenze kann von der GEG-Bilanz abweichen – im QNG werden auch unbeheizte Bereiche und Außenbauteile berücksichtigt, sofern sie energetisch relevant sind.', // verbatim
      },
      {
        title: 'Sachbilanz – Mengen- und Massenermittlung', // verbatim
        text: 'Hier liegt das Herzstück der Arbeit: Wir erfassen sämtliche Bauteile und Bauteilschichten der Kostengruppen 300 (Bauwerk – Baukonstruktionen) und 400 (Bauwerk – Technische Anlagen) nach DIN 276. Dazu gehören Rohbau, Ausbau, Dämmung, Fenster, Heizung, Lüftung, Sanitär und gegebenenfalls PV-Anlage. Jedem Material wird ein Datensatz aus der ÖKOBAUDAT zugeordnet. Im QNG sind dabei generische Datensätze verpflichtend – produktspezifische EPDs sind aktuell nicht zugelassen.', // verbatim
      },
      {
        title: 'Wirkungsabschätzung', // verbatim
        text: 'Die Mengen werden mit den Umweltkennwerten aus der ÖKOBAUDAT multipliziert und nach Modulen aufgeschlüsselt. Die Hauptindikatoren sind das Treibhauspotenzial (GWP100) in kg CO₂-Äquivalent und der nicht erneuerbare Primärenergiebedarf (PENRT) in MJ bzw. kWh. Der Betrieb des Gebäudes (Modul B6) wird aus der GEG-Berechnung übernommen und mit den QNG-Emissions- und Primärenergiefaktoren verrechnet.', // verbatim
      },
      {
        title: 'Auswertung und Nachweisführung', // verbatim
        text: 'Grundlage jeder QNG-konformen LCA ist die ÖKOBAUDAT, die amtliche Baustoffdatenbank des BMWSB. Sie enthält über 1.200 Datensätze nach DIN EN 15804 mit standardisierten Umweltkennwerten für Baustoffe, Bauteile und Anlagenkomponenten. Ergänzend gelten die QNG-Rechenwerte 2023 mit ergänzenden Vorgaben für Energieträger, Sockelbeträge der Anlagentechnik und Nutzungsdauern. Das bedeutet jedes Material wird unabhängig vom Hersteller oder Transportweg betrachtet.', // verbatim (source text describes the data basis rather than the evaluation — kept 1:1, flagged)
      },
    ],
  },

  /* §6.3.4 Details — „Was ist eine LCA?" prose section (verbatim heading +
     paragraph); items intentionally empty (no sub-items in the source —
     Accordion renders nothing for []). */
  details: {
    heading: 'Was ist eine Lebenszyklusanalyse (LCA)?', // verbatim
    intro: [
      'Eine Lebenszyklusanalyse – im Englischen Life Cycle Assessment, kurz LCA – ist eine systematische Methode zur Bewertung der Umweltwirkungen eines Gebäudes über seinen gesamten Lebensweg. Sie bilanziert alle Phasen von der Rohstoffgewinnung über Herstellung, Transport, Einbau, Nutzung und Instandsetzung bis zum Rückbau und zur Entsorgung. Die LCA gibt Antwort auf eine zentrale Frage des nachhaltigen Bauens: Wie hoch sind die Treibhausgasemissionen und der nicht erneuerbare Primärenergiebedarf eines Gebäudes – nicht nur im Betrieb, sondern auch in seinen Baustoffen?', // verbatim
    ],
    items: [],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für die Ökobilanz sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim: „24 kg CO₂-Äq./(m²·a) für QNG-PLUS"
        value: 24,
        suffix: ' kg',
        label: 'CO₂-Äquivalent pro m² und Jahr — Grenzwert QNG-PLUS', // NEW COPY: review (label)
      },
      {
        // verbatim: „bis zu 150.000 € KfW-Kredit pro Wohneinheit"
        value: 150000,
        prefix: 'bis zu ',
        suffix: ' €',
        label: 'KfW-Kredit pro Wohneinheit mit LCA und QNG im KFN', // NEW COPY: review (label)
      },
      {
        // verbatim: „Sie enthält über 1.200 Datensätze nach DIN EN 15804"
        value: 1200,
        prefix: 'über ',
        label: 'Datensätze nach DIN EN 15804 in der ÖKOBAUDAT', // NEW COPY: review (label)
      },
      {
        // verbatim: „der Betrachtungszeitraum beträgt 50 Jahre Nutzungsdauer"
        value: 50,
        suffix: ' Jahre',
        label: 'Betrachtungszeitraum der Ökobilanz nach QNG', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 Praxistipp — verbatim heading fragment (after „Praxistipp: ") */
  praxistipp: 'Reduzieren ist wirtschaftlicher als durch teure Materialien ersetzen',

  /* §6.3.6 FAQ — heading + 5 Q/A verbatim (source typos kept 1:1) */
  faq: {
    heading: 'FAQ', // verbatim (source heading)
    items: [
      {
        question: '1. Wann muss die LCA spätestens erstellt werden?', // verbatim
        answer:
          'Die Planungs-LCA muss bei Antragstellung der KfW-Förderung vorliegen. Wir empfehlen jedoch, bereits in der Entwurfsphase (LP 2–3) eine erste Bilanzierung durchzuführen, um Materialwahl und Anlagentechnik so abzustimmen, dass die Grenzwerte sicher eingehalten werden. Eine nachträgliche Korrektur am fertigen Gebäude ist teuer.', // verbatim
      },
      {
        question: '2. Welche Daten benötigen Sie von uns als Bauherr?', // verbatim
        answer:
          'Wir brauchen Architekturpläne mit Bauteilaufbauten und Schichtdicken, DIN 277 Flächenberechnung sowie die Anlagentechnik-Wünsche. Vieles davon benötigen Sie auch zur Baugenehmigung – wir prüfen alle Unterlagen und melden uns wenn etwas fehlt.', // verbatim (incl. source's missing comma „melden uns wenn")
      },
      {
        question: '3. Was kostet eine LCA für ein Einfamilien- oder Mehrfamilienhaus?', // verbatim
        answer:
          'Die Kosten richten sich nach Gebäudegröße, Komplexität und gewähltem Siegel oder Rechtsgrundlage. Für ein typisches Einfamilienhaus bewegen sich die Honorare im niedrigen vierstelligen Bereich, für Mehrfamilienhäuser und Nichtwohngebäude entsprechend höher.', // verbatim
      },
      {
        question: '4. Was ist eine LCA (Lebenszyklusanalyse) und wann brauche ich sie für mein Bauvorhaben?', // verbatim
        answer: [
          'Eine LCA (Life Cycle Assessment), im Deutschen Lebenszyklusanalyse oder Ökobilanz, bewertet die Umweltwirkungen eines Gebäudes über seinen gesamten Lebenszyklus nach DIN EN 15978. Zentraler Indikator ist das Treibhauspotenzial (GWP100) in kg CO₂-Äquivalent je Quadratmeter Nettogrundfläche und Jahr. Nach den aktuellen QNG-Bilanzregeln werden dabei die Module A1–A3 (Materialherstellung), B4 und B5 (Austausch) sowie C3 und C4 (Rückbau) berücksichtigt, der Betrachtungszeitraum beträgt 50 Jahre Nutzungsdauer.', // verbatim
          'Verpflichtend ist die LCA in Deutschland für die zentralen Neubau-Förderprogramme: Für die KfW-Programme „Klimafreundlicher Neubau” (KFN, KfW 297/298), „Wohneigentum für Familien” (WEF, KfW 300) sowie „Klimafreundlicher Neubau im Niedrigpreissegment” (KNN) ist die Ökobilanz Bestandteil der technischen Mindestanforderungen. Der GWP-Grenzwert für klimafreundliche Wohngebäude liegt aktuell bei maximal 24 kg CO₂-Äq./(m²NGF·a). Wer zusätzlich das QNG-Siegel in PLUS oder PREMIUM anstrebt, muss strengere LCA-Anforderungen erfüllen und die Berechnung durch einen QNG-zugelassenen Auditor testieren lassen.', // verbatim
          'Mit der EU-Gebäuderichtlinie EPBD wird die LCA-Pflicht ab 1. Januar 2028 auf alle Neubauten über 1.000 m² und ab 1. Januar 2030 auf sämtliche Neubauten ausgeweitet – die Ökobilanz wandelt sich damit vom Förderkriterium zum gesetzlichen Standard. Eine frühe Einbindung in die Planung lohnt sich, da Materialwahl, Konstruktion und Anlagentechnik die LCA-Werte maßgeblich beeinflussen.', // verbatim
        ],
      },
      {
        question: '5. Kann eine Holzbauweise die Grenzwerte automatisch einhalten?', // verbatim
        answer:
          'Holz ist ein hervorragender Baustoff im LCA-Kontext, weil der biogene Kohlenstoff in der Herstellungsphase (A1–A3) als negative CO₂-Emission bilanziert wird. Das ist aber kein Freifahrtschein: Am Lebensende (Modul C3) wird der Kohlenstoff bei energetischer Verwertung wieder freigesetzt. Über den gesamten Lebenszyklus (A–C) sind die Vorteile geringer, das Recyclingpotenzial (Modul D1) wird zudem nur separat ausgewiesen. Wir prüfen für Ihr Projekt, wo der Holzeinsatz wirklich rechnerisch hilft. Die meisten unserer Projekte kommen mit einem schlanken Kalk-Sandstein oder Leichtbeton in Verbindung mit einem WDVS zum Ziel. Wir bilanzieren jedoch mit großer Freude auch Spezialssysteme und viele verschiedene Baustoffe.', // verbatim (incl. source typo „Spezialssysteme" — flag to client before launch)
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block (the source's
     two-line support sentence joined into one line) */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    support:
      'Sprechen Sie direkt und kostenlos mit Herr Thomas Schubert über Lebenszyklusanalysen und den richtigen Weg für Ihr Projekt.', // verbatim (incl. source grammar „mit Herr Thomas Schubert")
    primary: { label: 'Jetzt hier Termin buchen', to: '/kontakt' }, // label verbatim
  },
};

export default lebenszyklusanalyseLca;
