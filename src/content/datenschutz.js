/**
 * Datenschutzerklärung — SECTION SKELETON + PLACEHOLDERS ONLY.
 *
 * CRITICAL (build plan §6.7): there is NO verbatim Datenschutz source in the
 * handoff. The binding legal prose MUST be supplied verbatim from the live
 * site AND pass legal review — it is NOT authored here. This module therefore
 * ships a well-structured DSGVO section skeleton where every legal body is a
 * flagged, greppable PLACEHOLDER (`PLACEHOLDER: legal …`).
 *
 * NO binding legal prose is invented in this file.
 *
 * The three sections below additionally carry a FACTUAL build disclosure
 * (`note`) — short, factual statements of NEW data-processing facts this build
 * introduces, which counsel must fold into the reviewed text:
 *   1. Hosting            — provider still TBD (Vercel/Netlify), self-hosted assets.
 *   2. Kontaktformular    — mail sent via Resend (Auftragsverarbeiter), no DB.
 *   3. Cookies/Einwilligung — no consent-requiring technology used in v1.
 * These are facts about the build, not legal wording; the binding text stays a
 * PLACEHOLDER in each of these sections too.
 */

const PLACEHOLDER =
  'PLACEHOLDER: legal text — supply verbatim from the live site and confirm via legal review before launch. Do not invent binding prose.';

export const datenschutz = {
  route: '/datenschutzerklaerung',
  breadcrumb: 'Datenschutzerklärung', // NEW COPY: review (nav label)
  overline: 'Rechtliches', // NEW COPY: review (section eyebrow)
  title: 'Datenschutzerklärung', // NEW COPY: review (page H1 label)

  // Page-level banner making the draft status obvious in the browser. Factual,
  // non-binding — flagged for counsel/coordinator, not published prose.
  reviewNotice:
    'Entwurf / Gerüst: Die verbindlichen Rechtstexte dieser Datenschutzerklärung stehen noch aus. Sie sind vor dem Launch wortgetreu von der Live-Seite zu übernehmen und juristisch zu prüfen (siehe markierte PLACEHOLDER-Abschnitte).',

  // TOC + section order. `id` powers the in-page anchor nav; `heading` is the
  // <h2> label. `placeholder` = binding-text stub (always). `note` = optional
  // FACTUAL build disclosure (the three NEW-disclosure sections only).
  sections: [
    {
      id: 'verantwortlicher',
      heading: 'Verantwortlicher',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'grundlagen',
      heading: 'Allgemeine Hinweise und Rechtsgrundlagen',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'hosting',
      heading: 'Hosting und Bereitstellung der Website',
      placeholder: PLACEHOLDER,
      // FACTUAL build disclosure #1 (hosting provider) — for legal review.
      note: [
        'Diese Website wird bei einem externen Hosting-Dienstleister betrieben. Der konkrete Anbieter steht zum Zeitpunkt dieses Builds noch nicht endgültig fest (in Prüfung: Vercel oder Netlify); Name, Sitz und der Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO sind nach der Auswahl zu ergänzen.',
        'Schriftarten, Bilder und Kartenmaterial werden selbst gehostet ausgeliefert. Es werden keine Inhalte von Drittanbieter-CDNs nachgeladen; beim Aufruf der Website werden somit keine Daten an Dritte übertragen, die über den technisch notwendigen Verbindungsaufbau zum Hoster hinausgehen.',
      ],
      noteFlag: 'PLACEHOLDER: legal — Hosting-Anbieter (Name/Sitz/AV-Vertrag) nach Auswahl ergänzen.',
    },
    {
      id: 'server-logfiles',
      heading: 'Server-Logfiles',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'kontaktformular',
      heading: 'Kontaktaufnahme und Kontaktformular',
      placeholder: PLACEHOLDER,
      // FACTUAL build disclosure #2 (form processor / Resend) — for legal review.
      note: [
        'Die über das Kontaktformular übermittelten Angaben (u. a. Name, E-Mail-Adresse und Nachricht) werden ausschließlich zur Bearbeitung der Anfrage verarbeitet und als E-Mail an unser Postfach zugestellt.',
        'Der E-Mail-Versand erfolgt über den Dienstleister Resend (Resend), mit dem ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO zu schließen ist. Eine dauerhafte Speicherung der Formulardaten in einer Datenbank findet nicht statt.',
        'Zum Schutz vor automatisiertem Missbrauch (Spam) werden ein verstecktes Honeypot-Feld sowie eine serverseitige Rate-Limitierung eingesetzt; es kommt kein CAPTCHA zum Einsatz.',
      ],
      noteFlag:
        'PLACEHOLDER: legal — Rechtsgrundlage, Speicherdauer und AV-Vertrag (Resend) durch Counsel bestätigen/ergänzen.',
    },
    {
      id: 'schriftarten-medien',
      heading: 'Schriftarten und eingebundene Medien',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'cookies-einwilligung',
      heading: 'Cookies und Einwilligung',
      placeholder: PLACEHOLDER,
      // FACTUAL build disclosure #3 (no consent tool) — for legal review.
      note: [
        'In der aktuellen Version dieser Website werden keine einwilligungspflichtigen Technologien eingesetzt: keine Analyse- oder Tracking-Dienste, keine Drittanbieter-Requests und keine nicht notwendigen Cookies.',
        'Schriften und Bilder werden selbst gehostet; Terminbuchung (Outlook Bookings) und WhatsApp sind ausgehende Links, keine eingebetteten Inhalte. Ein Cookie- bzw. Consent-Banner wird daher nicht eingesetzt.',
      ],
      noteFlag:
        'PLACEHOLDER: legal — erneut prüfen, sobald Analyse-/Drittanbieter-Technologie hinzukommt (dann Consent nötig).',
    },
    {
      id: 'betroffenenrechte',
      heading: 'Ihre Rechte als betroffene Person',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'beschwerderecht',
      heading: 'Beschwerderecht bei der Aufsichtsbehörde',
      placeholder: PLACEHOLDER,
    },
    {
      id: 'aktualitaet',
      heading: 'Aktualität und Änderung dieser Datenschutzerklärung',
      placeholder: PLACEHOLDER,
    },
  ],
};
