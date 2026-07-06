import {
  BadgeCheck,
  BadgeEuro,
  CalendarClock,
  FolderOpen,
  ListChecks,
  PackageCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

/**
 * /leistungen/qng-flow — serviceContent for the ServiceDetailTemplate
 * (plan §6.3 skeleton + the flagship extras: platform feature grid,
 * „bis zu 150.000 €" hero stat, screenshot placeholder, KineticStatement).
 * Schema documented in src/components/templates/README.md.
 *
 * Copy provenance:
 * - handoff/content/nachhaltigkeitsaudit-qng-flow.md → verbatim 1:1, NEVER
 *   rewrite (headings, intro, benefit cards, platform copy, 7 steps, FAQ,
 *   Beratung). Source typos are kept 1:1 per the content mandate
 *   (e.g. FAQ 3 „…QNG-Zertifizierung? sie?", FAQ 2 „ür die meisten…").
 * - hero chip: dev brief §5.4 microcopy (verbatim there)
 * - hero image/alt: reused from src/content/heroSlides.js (placeholder photo)
 * - stat labels + section eyebrows + screenshot caption: NEW COPY: review
 *   (numbers verbatim)
 */

export const qngFlow = {
  route: '/leistungen/qng-flow',
  name: 'Nachhaltigkeitsaudit mit QNG-flow', // verbatim (page H1 / nav)

  hero: {
    title: 'Nachhaltigkeitsaudit mit QNG-flow', // verbatim (H1)
    // verbatim nachhaltigkeitsaudit-qng-flow.md (claim heading, 1:1)
    subline: 'QNG-Zertifizierung & KfW-Förderung – Ihr Weg zum nachhaltigen Gebäude',
    // verbatim nachhaltigkeitsaudit-qng-flow.md (intro paragraph, 1:1)
    lead: [
      'Das Qualitätssiegel Nachhaltiges Gebäude (QNG) ist der staatliche Nachweis für nachhaltiges Bauen in Deutschland – und gleichzeitig der Schlüssel zur höchsten Förderstufe der KfW-Programme 297/298 „Klimafreundlicher Neubau". Wir begleiten Sie als zertifizierte Energieeffizienz-Experten und Nachhaltigkeitsberater durch den gesamten Prozess: von der ersten Konzeptidee über die Ökobilanzierung (LCA) bis zur Übergabe des Zertifikats. Ob Einfamilienhaus, Mehrfamilienhaus oder Quartiersentwicklung – mit unserer eigens entwickelten Plattform QNG-flow machen wir aus komplexen Anforderungen einen strukturierten, planbaren Prozess. So sichern Sie sich bis zu 150.000 € KfW-Förderkredit pro Wohneinheit und einen attraktiven Tilgungszuschuss.',
    ],
    chip: 'eigene Plattform', // dev brief §5.4 (verbatim proof chip)
    // §6.3 flagship extra: the hero stat — numbers verbatim
    stat: {
      value: 'bis zu 150.000 €',
      label: 'KfW-Förderkredit pro Wohneinheit', // verbatim fragment
    },
    image: {
      stem: '/images/hero/07-qng-flow', // reuse hero slide 7 image
      alt: 'Mehrfamilienhaus mit Holzfassade – nachhaltige Bauweise', // NEW COPY: review (from heroSlides.js)
    },
  },

  /* §6.3.2 Nutzen — heading, intro + 3 benefit cards verbatim */
  nutzen: {
    overline: 'Ihr Nutzen', // NEW COPY: review (eyebrow)
    heading: 'Lohnt sich das QNG-Siegel? Der Förder-Vorteil auf einen Blick', // verbatim
    // verbatim nachhaltigkeitsaudit-qng-flow.md (both paragraphs 1:1; the
    // source's **bold** markers are markdown formatting, not text)
    intro: [
      'Der größte Hebel des QNG-Siegels lässt sich in Euro beziffern. In der KFN-Förderung der KfW (Programme 297/298) erhöht ein QNG-Zertifikat den zinsverbilligten Kreditrahmen von bis zu 100.000 € auf bis zu 150.000 € pro Wohneinheit – ein Plus von 50.000 € je Wohnung. Bei einem Mehrfamilienhaus mit zehn Einheiten bedeutet das bis zu 500.000 € zusätzlichen Förderkredit zu vergünstigten Konditionen. Außerdem erhalten Investoren erhöhte steuerliche Abschreibungen in Verbindung mit dem EH 40 Standard womit bis zu 32% in den ersten 4 Jahren des Gebäudes abgeschrieben werden können.',
      'Das QNG zahlt sich damit nicht nur ökologisch aus, sondern rechnet sich – und steigert zugleich die Wertbeständigkeit Ihrer Immobilie. Punkte vorher zu bedenken wie Barrierefreiheit, Einbruchschutz und das dokumentieren aller verbauten technischen Komponenten sichert langfristig hohe Qualität in Betrieb und Wohnen.',
    ],
    items: [
      {
        icon: BadgeEuro,
        title: 'Maximale Förderung sichern', // verbatim
        text: 'Mit dem QNG-Zertifikat erschließen Sie die höchste Förderstufe der KfW: bis zu 150.000 € Kreditvolumen pro Wohneinheit – statt 100.000 € ohne Siegel. Wir liefern alle Nachweise rechtssicher', // verbatim
      },
      {
        icon: TrendingUp,
        title: 'Wertstabile Immobilie schaffen', // verbatim
        text: 'QNG-zertifizierte Gebäude erfüllen ökologische, ökonomische und soziokulturelle Qualitätsstandards über den gesamten Lebenszyklus. Das Ergebnis: höhere Vermarktungsfähigkeit, geringere Betriebskosten und nachweisbare Klimafreundlichkeit', // verbatim
      },
      {
        icon: PackageCheck,
        title: 'Komplettbegleitung aus einer Hand', // verbatim
        text: 'Energieberatung, Ökobilanz, Auditierung und Dokumentation – alles bei einem Ansprechpartner. Mit QNG-flow behalten Sie jederzeit den Überblick über Unterlagen, Fristen und offene Punkte', // verbatim
      },
    ],
  },

  /* §6.3 flagship extra: platform section — copy verbatim. Its verbatim
     opening line („Nachhaltigkeit muss nicht kompliziert sein.") renders as
     the KineticStatement leading into this section (see `kinetic` below). */
  platform: {
    overline: 'Unsere eigene Entwicklung', // verbatim (heading fragment before the colon)
    heading: 'QNG-flow entlastet Sie von Bürokratie und Doppelarbeit', // verbatim (heading remainder)
    // verbatim nachhaltigkeitsaudit-qng-flow.md (platform paragraphs, 1:1)
    body: [
      'Mit QNG-flow haben wir eine digitale Plattform, die den gesamten Weg zur Nachhaltigkeitszertifizierung klarer, einfacher und transparenter macht.',
      'QNG-flow bündelt diesen Prozess an einem Ort: Unterlagen, Prüfschritte, Zuständigkeiten, Fristen und Zertifizierungsanforderungen werden strukturiert geführt. So sehen unsere Kunden jederzeit, welche Nachweise bereits vorliegen, welche Punkte noch offen sind und was für den nächsten Schritt benötigt wird.',
      'Ein Nachhaltigkeitsaudit betrachtet die graue Energie der Baustoffe durch eine Lebenszyklusanalyse und erfordert eine Vielzahl von Nachweisen für Förderprogramme. Genau hier entstehen in vielen Projekten komplexe Abstimmungen zwischen Bauherr, Energieberater, Auditor, Fachplanern und ausführenden Firmen.',
      'Hier setzt unsere Software an und wird ergänzt durch passende Servicepakete. Vom ersten Nachhaltigkeits-Check über die strukturierte QNG-Begleitung bis zur Ansprache aller Beteiligten und Unterstützung jedes Einzelnen im Zertifizierungsprozess.',
      'Unser Ziel ist einfach: Wir machen Nachhaltigkeitszertifizierung planbar, verständlich und effizient. Aus komplexen Anforderungen wird ein geführter Prozess, der unseren Kunden Sicherheit gibt und den Aufwand deutlich reduziert.',
    ],
    // Feature grid — the five things QNG-flow keeps structured; titles are
    // the verbatim enumeration from the paragraph above („Unterlagen,
    // Prüfschritte, Zuständigkeiten, Fristen und Zertifizierungs-
    // anforderungen werden strukturiert geführt").
    features: [
      { icon: FolderOpen, title: 'Unterlagen' }, // verbatim
      { icon: ListChecks, title: 'Prüfschritte' }, // verbatim
      { icon: Users, title: 'Zuständigkeiten' }, // verbatim
      { icon: CalendarClock, title: 'Fristen' }, // verbatim
      { icon: BadgeCheck, title: 'Zertifizierungsanforderungen' }, // verbatim
    ],
    screenshot: {
      // TODO: replace with a real QNG-flow product screenshot (client asset).
      label: 'Screenshot: die QNG-flow Plattform (folgt)', // NEW COPY: review (placeholder caption)
      ariaLabel: 'Platzhalter für einen Screenshot der QNG-flow Plattform', // NEW COPY: review
    },
  },

  /* §13.3 kinetic statement (allowed on this page; one only) — verbatim:
     the platform block's opening line, rendered as the page's one
     typographic moment leading into the platform section. */
  kinetic: 'Nachhaltigkeit muss nicht kompliziert sein.',

  /* §6.3.3 Ablauf — heading + 7 steps verbatim (Stepper contract
     extended to 7 for exactly this page, see Stepper.jsx) */
  ablauf: {
    heading: 'Der Prozess: In 7 Schritten zur Förderung', // verbatim
    steps: [
      {
        title: 'Grundkonzept & LCA-Vorprüfung (EH40)', // verbatim
        text: 'Bevor irgendetwas anderes startet, erarbeiten wir das Nachhaltigkeitskonzept: Welche Förderstufe ist realistisch? Wie sieht eine erste Ökobilanz (LCA) aus? Welche Baustoffe und welche Anlagentechnik bringen Sie sicher unter die QNG-Grenzwerte für Treibhausgasemissionen und Primärenergie? Dieses Konzept bildet die Basis für den GEG-Nachweis und die spätere BzA', // verbatim (incl. missing full stop)
      },
      {
        title: 'Bestätigung zum Antrag (BzA)', // verbatim
        text: 'Die BzA ist die Eintrittskarte zur KfW-Förderung. Sie wird vor Baubeginn über Ihre Hausbank bei der KfW eingereicht und bestätigt, dass Ihr Vorhaben die Anforderungen an Effizienzhaus 40 und QNG-PLUS einhalten wird. Wir liefern die BzA-Daten so, dass sie nahtlos in die spätere Bestätigung nach Durchführung (BnD) und in die QNG-Dokumentation übergehen', // verbatim
      },
      {
        title: 'Zertifizierungskonzept & Projektanmeldung', // verbatim
        text: 'Parallel melden wir Ihr Projekt bei der Zertifizierungsstelle (z. B. BiRN) an. Pro gewünschtem Zertifikat ist eine eigene Projektanmeldung notwendig – bei baugleichen Gebäuden lassen sich über den Wiederholungsfaktor Kosten sparen. Das Zertifizierungskonzept legt fest, welcher QNG-Standard (PLUS oder PREMIUM) angestrebt wird und welche Steckbriefe in welcher Tiefe bearbeitet werden', // verbatim
      },
      {
        title: 'BNK-Dokumentation & Projektmappe', // verbatim
        text: 'Hier beginnt die eigentliche Fleißarbeit. Wir führen die Baudokumentation, besuchen die Baustelle, sammeln Fachunternehmererklärungen, prüfen Bauprodukte auf VOC- und Formaldehyd-Werte und stellen sicher, dass alle Anforderungen der QNG-Anhänge (insbesondere Anhang 313 zur Schadstoffvermeidung) eingehalten werden.', // verbatim
      },
      {
        title: 'Fertigstellung Gebäudehülle und Anlagentechnik', // verbatim
        text: 'Nach Fertigstellung dokumentieren wir den Bauzustand mit 360°-Kameras, Thermografie und – falls beauftragt – Blower-Door-Test. Diese Nachweise fließen direkt ins digitale Gebäudehandbuch ein und decken sowohl die KfW- als auch die QNG-Anforderungen ab', // verbatim
      },
      {
        title: 'Fortschreibung aller Nachweise & BnD', // verbatim
        text: 'Wir aktualisieren den GEG-Nachweis, die Ökobilanz und alle relevanten Steckbriefe auf den realisierten Bauzustand. Die Bestätigung nach Durchführung (BnD) wird erstellt und über Ihren Energieeffizienz-Experten bei der Hausbank zur Auszahlung des KfW-Kredits eingereicht', // verbatim
      },
      {
        title: 'Konformitätsprüfung & Übergabe der QNG-Urkunde', // verbatim
        text: 'Die akkreditierte Zertifizierungsstelle prüft die eingereichte Dokumentation in einer rund acht- bis zehnwöchigen Konformitätsprüfung. Nach erfolgreicher Prüfung erhalten Sie die QNG-Urkunde – Ihr offizieller Nachweis für staatlich anerkannte Nachhaltigkeit', // verbatim
      },
    ],
  },

  /* §6.3.5 proof numbers — every NUMBER verbatim from the content file;
     labels condensed for the StatCard format (NEW COPY: review) */
  stats: {
    overline: 'Zahlen & Fakten', // NEW COPY: review
    title: 'Zahlen, die für das QNG-Siegel sprechen.', // NEW COPY: review (claim ≤ 8 words)
    items: [
      {
        // verbatim: „ein Plus von 50.000 € je Wohnung"
        value: 50000,
        prefix: '+ ',
        suffix: ' €',
        label: 'mehr Förderkredit je Wohnung mit QNG-Siegel', // NEW COPY: review (label)
      },
      {
        // verbatim: „bis zu 500.000 € zusätzlichen Förderkredit" (10 Einheiten)
        value: 500000,
        prefix: 'bis zu ',
        suffix: ' €',
        label: 'zusätzlicher Förderkredit bei zehn Wohneinheiten', // NEW COPY: review (label)
      },
      {
        // verbatim: „bis zu 32% in den ersten 4 Jahren … abgeschrieben"
        value: 32,
        prefix: 'bis zu ',
        suffix: ' %',
        label: 'Abschreibung in den ersten 4 Jahren (EH 40 + QNG)', // NEW COPY: review (label)
      },
      {
        // verbatim FAQ 3: „beim Einfamilienhaus ab rund 595 € (zzgl. MwSt.)"
        value: 595,
        prefix: 'ab rund ',
        suffix: ' €',
        label: 'Zertifizierungsgebühr beim Einfamilienhaus (zzgl. MwSt.)', // NEW COPY: review (label)
      },
    ],
  },

  /* §6.3.6 FAQ — headings + 5 Q/A verbatim (source typos kept 1:1) */
  faq: {
    overline: 'FAQ', // verbatim (source heading)
    heading: '5 häufige Fragen', // verbatim
    items: [
      {
        question: '1. Wann muss ich mein Projekt für QNG anmelden?', // verbatim
        answer:
          'Optimalerweise erfolgt die Anmeldung bei der Zertifizierungsstelle zeitgleich mit dem KfW-Antrag – also vor Baubeginn und vor Abschluss von Liefer- oder Leistungsverträgen. Eine spätere Anmeldung ist bis kurz vor Einreichung der Konformitätsprüfung möglich, technisch aber riskant. Wir empfehlen den frühen Einstieg, weil viele QNG-Anforderungen bereits in der Planungsphase berücksichtigt werden müssen.', // verbatim
      },
      {
        question: '2. Was ist der Unterschied zwischen QNG-PLUS und QNG-PREMIUM?', // verbatim
        answer: [
          'QNG-PLUS bescheinigt eine überdurchschnittliche, QNG-PREMIUM eine deutlich überdurchschnittliche Nachhaltigkeitsqualität. Die Unterschiede liegen vor allem in den Anforderungen an Treibhausgasemissionen, Schadstoffvermeidung und Barrierefreiheit. Für die KfW-Förderung „Klimafreundlicher Neubau mit QNG” reicht QNG-PLUS aus.', // verbatim
          'ür die meisten Investoren ist allerdings der steuerliche Vorteil durch die erhöhte Abschreibung bei fremdgenutzten Immobilien der entscheidende Faktor. Für Einfamilienhausbesitzer verspricht das Siegel höhere Prozessqualität; verpflichtende Beratungen zu verschiedenen Themen wie Einbruchschutz und Barrierefreiheit gehören genauso dazu wie das alle Ausführungsunterlagen vor Baubeginn vorlagen. Weiterhin ist für alle Nutzer generell das QNG Siegel attraktiv, da es niedrigere Schadstoffbelastungen im Innenraum verspricht.', // verbatim (source typo „ür" kept 1:1 — flag to client before launch)
        ],
      },
      {
        question: '3. Welche Kosten entstehen für eine QNG-Zertifizierung? sie?', // verbatim (source typo kept 1:1 — flag to client before launch)
        answer:
          'Die Gebühren der Zertifizierungsstelle staffeln sich nach Anzahl der Wohneinheiten – beim Einfamilienhaus ab rund 595 € (zzgl. MwSt.), bei einem 10-Wohneinheiten-Gebäude rund 1.995 € (zzgl. MwSt.). Hinzu kommen unsere Honorare für Auditierung, Ökobilanzierung und Baubegleitung. Diese Kosten sind im KFN-Programm mitförderfähig.', // verbatim
      },
      {
        question: '4. Wer darf das QNG-Zertifikat ausstellen?', // verbatim
        answer:
          'Nicht wir, sondern eine akkreditierte Zertifizierungsstelle (z. B. BiRN, DGNB) vergibt das Siegel nach unabhängiger Prüfung. Wir bereiten als Ihre Auditoren sämtliche Nachweise, Berechnungen und Dokumentationen vor und reichen diese zur Konformitätsprüfung ein. Die Konformitätsprüfung dauert in der Regel acht bis zehn Wochen – abhängig von der Qualität der Einreichung.', // verbatim
      },
      {
        question: '5. Was passiert, wenn das Gebäude später umgebaut wird?', // verbatim
        answer:
          'Während der Laufzeit Ihres KfW-Kreditvertrags können Änderungen, die QNG-relevante Auflagen verletzen, die Förderung gefährden. Dokumentieren Sie Umbauten in der Gebäudeakte – auch über die Vertragslaufzeit hinaus. Das schützt die Förderung und steigert den Wiederverkaufswert.', // verbatim
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

export default qngFlow;
