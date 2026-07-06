import { Building2, Factory, HardHat, Scale } from 'lucide-react';

/**
 * /leistungen/fordermittelservice — serviceContent for the
 * ServiceDetailTemplate (plan §6.3 skeleton; schema documented in
 * src/components/templates/README.md).
 *
 * Copy provenance:
 * - handoff/content/fordermittelservice.md → verbatim 1:1, NEVER rewrite
 *   (headings, intro, the four Servicebausteine, „Warum EnergieAudit Plus?",
 *   process steps, FAQ, Beratung). Source typos kept 1:1 per the content
 *   mandate (e.g. „ab.Bei Rückfragen" missing space; the process heading
 *   says „In 6 Schritten" but the source lists SEVEN steps; step 2 carries
 *   a stray „2. " numeral; steps 6+7 end with a colon) — flagged for the
 *   client sheet.
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows/headings without source heading:
 *   NEW COPY: review (numbers verbatim)
 *
 * Structure note (§6.3 mapping): the four Servicebausteine directly follow
 * the intro in the source and map onto the Nutzen card grid (4 items,
 * within the 3–5 contract); „Warum EnergieAudit Plus?" maps onto the
 * details Accordion — which the template renders AFTER the Ablauf
 * (source order has it before). Flagged as template-order deviation.
 */

export const fordermittelservice = {
  route: '/leistungen/fordermittelservice',
  name: 'Fördermittelservice', // verbatim (nav / breadcrumb / route title)

  hero: {
    title: 'Fördermittelservice – skalierbar, schnell, rechtssicher', // verbatim fordermittelservice.md (H1)
    // verbatim fordermittelservice.md (claim heading, 1:1)
    subline: 'Wenn Anforderung zum Vorteil wird',
    // verbatim fordermittelservice.md (intro paragraph, 1:1)
    lead: [
      'Förderung ist für uns kein Beiwerk, sondern ein durchdachter Prozess. Ob Sie Eigentumswohnungen vermarkten, Fenster und Bauteile verkaufen, als institutioneller Eigentümer rechtssichere Begleitung gegenüber dem Fördermittelgeber suchen oder als Generalunternehmer QNG Standards Ihrem Kunden schulden – wir bieten vier aufeinander abgestimmte Servicebausteine, die sich exakt an Ihr Geschäftsmodell anpassen lassen.',
    ],
    chip: '24-h-BzA-Portal', // dev brief §5.4 (verbatim proof chip)
    image: {
      stem: '/images/hero/03-foerdermittel', // reuse hero slide 3 image
      alt: 'Beratungssituation am Schreibtisch: Planungsunterlagen und Laptops', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — the four Servicebausteine, titles + texts verbatim.
     The source has no heading over the four blocks (the intro sentence
     announces them); the heading reuses that verbatim fragment. */
  nutzen: {
    overline: 'Servicebausteine', // NEW COPY: review (eyebrow)
    heading: 'Vier aufeinander abgestimmte Servicebausteine', // NEW COPY: review (verbatim fragment of the intro sentence)
    items: [
      {
        icon: Building2,
        title: 'Immobilienvertrieb', // verbatim
        text: 'Für Bauträger, Projektentwickler und Vertriebe stellen wir einen geschützten Web-Zugang bereit. Darüber erhält Ihr Vertrieb innerhalb von 24 Stunden die Antragsbestätigung (BzA) für seine Kunden – verbindlich, dokumentiert und sofort einsetzbar zur Prüfung der Finanzierung', // verbatim (incl. missing period)
      },
      {
        icon: Factory,
        title: 'Hersteller & Fachbetriebe', // verbatim
        text: 'Fenster- und Türenhersteller, Tischlereien, Maurer, Zimmereien und vergleichbare Fachbetriebe nutzen unsere zentrale Plattform zur unkomplizierten Antragstellung von Einzelmaßnahmen. Ihre Kunden erhalten damit in der Sanierung 15 % Zuschuss – mit zusätzlichem individuellen Sanierungsfahrplan (iSFP) sogar 20 % auf die geplanten Arbeiten', // verbatim (incl. missing period)
      },
      {
        icon: HardHat,
        title: 'QNG-Begleitung für Generalunternehmer und Baufirmen', // verbatim
        text: 'Wenn der Bauherr ein QNG-Siegel anstrebt, hängt der Erfolg an der Qualität Ihrer Zuarbeit. Wir begleiten Generalunternehmer und Baufirmen durch alle QNG-Anforderungen, erstellen die Nachweise gemeinsam und stellen sicher, dass beim Auditor des Bauherrn alles in der geforderten Tiefe ankommt – pünktlich, vollständig, prüfbar', // verbatim (incl. missing period)
      },
      {
        icon: Scale,
        title: 'Bauherrenvertretung gegenüber dem Fördermittelgeber', // verbatim
        text: 'Auf Basis Ihrer Vollmacht übernehmen wir den vollständigen Schriftverkehr mit dem Fördermittelgeber und wickeln diesen rechtssicher ab.Bei Rückfragen oder angezweifelten Positionen reagieren wir umgehend. Sie behalten jederzeit den Überblick, ohne den Aufwand zu tragen.', // verbatim (incl. source's missing space „ab.Bei")
      },
    ],
  },

  /* §6.3.3 Ablauf — heading verbatim; the source lists SEVEN steps under
     „In 6 Schritten" (source inconsistency, kept 1:1 and flagged).
     7 steps are within the Stepper contract (3–7, Phase 4a). */
  ablauf: {
    heading: 'Der Prozess: In 6 Schritten zur Förderung', // verbatim (source heading; 7 steps follow in the source)
    steps: [
      {
        title: 'Erstgespräch & Bedarfsanalyse', // verbatim
        text: 'In einem kurzen Erstgespräch erfassen wir Ihr Vorhaben, die Rahmendaten und Ihre Ziele. Dabei klären wir, ob und in welchem Umfang eine Förderung grundsätzlich infrage kommt.', // verbatim
      },
      {
        title: 'Förderstrategie & Programmkombination', // verbatim; source's stray leading „2. " list-ordinal dropped — the Stepper renders its own step number (would double as „② 2.")
        text: 'Wir gleichen Ihr Vorhaben mit den aktuellen Programmen ab – BAFA, KfW, BEG, KFN, QNG – und ermitteln die Konstellation mit der größten Wirkung. Sie erhalten eine klare Empfehlung mit Förderhöhen, Voraussetzungen und Fristen.', // verbatim
      },
      {
        title: 'Technische Nachweise (BzA / TPB)', // verbatim
        text: 'Als gelistete Energieeffizienz-Experten erstellen wir die Bestätigung zum Antrag (BzA) im EBS-Prüftool der KfW bzw. die Technische Projektbeschreibung (TPB) für das BAFA. Bei Standardvorhaben liegt die Antragsbestätigung innerhalb wenigen Tagen vor.', // verbatim (incl. source grammar „innerhalb wenigen Tagen")
      },
      {
        title: 'Zuwendungsbescheid & Maßnahmenbeginn', // verbatim
        text: 'Mit der Förderzusage geben wir das verbindliche Startsignal für die Umsetzung. Sie wissen genau, welche Auflagen gelten, welche Fristen laufen und worauf in der Bauphase zu achten ist.', // verbatim
      },
      {
        title: 'Begleitung der Umsetzungsphase', // verbatim
        text: 'Wir überwachen und verlängern Fristen (z. B. 36-monatige Umsetzungsfrist KfW), prüfen Rechnungen auf Förderfähigkeit und dokumentieren den Baufortschritt. Bei erteilter Vollmacht übernehmen wir zusätzlich den gesamten Schriftverkehr für Sie.', // verbatim
      },
      {
        title: 'Bestätigung nach Durchführung (BnD / TPN):', // verbatim (incl. source's trailing colon)
        text: 'Nach Fertigstellung bestätigen wir die fachgerechte Umsetzung gegenüber KfW oder BAFA — Voraussetzung für die Auszahlung.', // verbatim
      },
      {
        title: 'Auszahlung & Dokumentation:', // verbatim (incl. source's trailing colon)
        text: 'Wir prüfen die Auszahlungshöhe und gehen optional in den Widerspruch bei nicht anerkannten Belegen und erstellen Stellungnahmen. Sie erhalten final eine vollständige, prüfsichere Dokumentation für die 10-jährige Aufbewahrungspflicht.', // verbatim
      },
    ],
  },

  /* §6.3.4 Details — „Warum EnergieAudit Plus?" (verbatim heading + 3
     blocks). In the source this section sits BEFORE the process; the
     template renders details after the Ablauf — flagged order deviation. */
  details: {
    heading: 'Warum EnergieAudit Plus?', // verbatim
    items: [
      {
        title: 'Förderung als Vertriebsvorteil', // verbatim
        content:
          'Wir machen aus Förderung das, was sie sein sollte: ein klares Verkaufsargument. Mit schneller Antragsbestätigung und transparenten Anforderungen wird die Förderung im Verkaufsgespräch zum konkreten, belegbaren Vorteil. Statt Unsicherheit liefern Sie Ihren Kunden Verlässlichkeit.', // verbatim
      },
      {
        title: 'Fachwissen, das den Unterschied macht', // verbatim
        content:
          'Unsere Energieberater, Sachverständigen und Auditoren arbeiten täglich an der Schnittstelle von Bauphysik, Förderrecht und Praxis. Diese Kombination führt zu Anträgen, die technisch sauber begründet und im Programmkontext belastbar sind.', // verbatim
      },
      {
        title: 'Prüfsicher dokumentiert', // verbatim
        content:
          'Wir bereiten jede Akte so auf, dass sie einer Prüfung durch BAFA, KfW oder Wirtschaftsprüfer jederzeit standhält. Unterlagen ausführender Unternehmen werden gegengeprüft, Rückfragen direkt geklärt und der gesamte Schriftverkehr vollständig archiviert.', // verbatim
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für unseren Service sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim: „innerhalb von 24 Stunden die Antragsbestätigung (BzA)"
        value: 24,
        prefix: 'innerhalb von ',
        suffix: ' Stunden',
        label: 'zur Antragsbestätigung (BzA) über den geschützten Web-Zugang', // NEW COPY: review (label)
      },
      {
        // verbatim: „15 % Zuschuss – mit … (iSFP) sogar 20 %"
        value: 20,
        prefix: 'bis zu ',
        suffix: ' %',
        label: 'Zuschuss für Einzelmaßnahmen mit iSFP (15 % ohne)', // NEW COPY: review (label)
      },
      {
        // verbatim: „36-monatige Umsetzungsfrist KfW"
        value: 36,
        suffix: ' Monate',
        label: 'KfW-Umsetzungsfrist — wir überwachen und verlängern Fristen', // NEW COPY: review (label)
      },
      {
        // verbatim: „für die 10-jährige Aufbewahrungspflicht"
        value: 10,
        suffix: ' Jahre',
        label: 'Aufbewahrungspflicht — abgedeckt durch prüfsichere Dokumentation', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 FAQ — headings + 5 Q/A verbatim (no Praxistipp in the source) */
  faq: {
    overline: 'FAQ', // verbatim (source heading)
    heading: 'Häufig gestellte Fragen', // verbatim
    items: [
      {
        question: '1. Bieten Sie eine Software-Integration für Hersteller und Bauträger?', // verbatim
        answer:
          'Ja. Wir verfügen über eigene Software, die wir als API-Schnittstelle zu CRM/ERP-Systemen oder als eigenständige Web-Anwendung bereitstellen. Für Bauträger-Projekte garantieren wir die BzA innerhalb von 24 Stunden. Wenn Sie entsprechendes Volumen mitbringen entwickeln wir auf Sie maßgeschneiderte Schnittstellen für alle Anwendungsfälle in unserem Leistungsbereich.', // verbatim (incl. source's missing comma „mitbringen entwickeln")
      },
      {
        question: '2. Was kostet Ihr Service für Unternehmenskunden?', // verbatim
        answer:
          'Wir arbeiten mit Pauschalen pro Vorgang oder Volumenstaffeln. In vielen Konstellationen sind unsere Leistungen anteilig refinanzierbar.', // verbatim
      },
      {
        question: '3. Wie werden die Kundendaten verarbeitet?', // verbatim
        answer:
          'Wir verarbeiten Kundendaten ausschließlich zweckgebunden für die Antragstellung und Förderbegleitung, auf Servern in Deutschland und unter strikter Einhaltung der DSGVO. Auf Wunsch schließen wir mit Ihnen eine Auftragsverarbeitungsvereinbarung (AVV) und stellen die für Ihren internen Datenschutzprozess relevanten Unterlagen bereit.', // verbatim
      },
      {
        question: '4. Wir haben doch schon einen QNG-Auditor – wozu brauchen wir Sie zusätzlich?', // verbatim
        answer:
          'Der QNG-Auditor wird vom Bauherrn beauftragt und ist die zertifizierende Instanz. Er prüft, ob die Anforderungen des Siegels erfüllt sind, und stellt das Audit-Ergebnis aus – er ist aber weder verpflichtet noch dafür da, Sie als ausführendes Unternehmen durch die Anforderungen zu führen oder Ihre Unterlagen vorzubereiten. Genau diese Lücke schließen wir: als unabhängiger Partner auf Ihrer Seite kennen wir die Auditorenperspektive aus jahrelanger Praxis und übersetzen die QNG-Anforderungen in konkrete Schritte für Ihre Bau- und Dokumentationsprozesse. So liefern Sie dem Auditor des Bauherrn alles in der geforderten Tiefe – ohne sich selbst in das Regelwerk einarbeiten zu müssen.', // verbatim
      },
      {
        question: '5. Was passiert, wenn ein Antrag abgelehnt wird?', // verbatim
        answer:
          'Wir vertreten Sie im Widerspruchsverfahren — auch mit eigenen Gutachten zur Auslegung der Förderbedingungen. Unsere Erfahrung in solchen Verfahren hat in der Vergangenheit zur Überarbeitung mehrerer KfW-FAQ beigetragen, insbesondere im Bereich Denkmalschutz und Contracting.', // verbatim
      },
    ],
  },

  /* §6.3.8 CTABand — verbatim „Sie brauchen Beratung?" block (the source's
     two-line support sentence joined into one line) */
  ctaBand: {
    title: 'Sie brauchen Beratung?', // verbatim
    support:
      'Sprechen Sie direkt und kostenlos mit Herr Thomas Schubert über Fördermittelservice und den richtigen Weg für Ihr Projekt.', // verbatim (incl. source grammar „mit Herr Thomas Schubert")
    primary: { label: 'Jetzt hier Termin buchen', to: '/kontakt' }, // label verbatim
  },
};

export default fordermittelservice;
