/**
 * Impressum content — VERBATIM from handoff/content/impressum.md
 * (source: https://ea-plus.de/impressum/). Text is 1:1 from the live site and
 * MUST NOT be changed (build plan §6.7). Re-verify against the live page
 * before launch.
 *
 * Copy provenance:
 * - `title` = md heading „## Impressum" (rendered as the page H1) — verbatim.
 * - `overline` = NEW COPY: review — section eyebrow, not present on the live
 *   page (signature element per style guide; carries no legal meaning).
 * - `breadcrumb` = NEW COPY: review — navigation label.
 * - Every `sections[].heading` + body line = verbatim md, including
 *   punctuation and the missing terminal period in the Streitbeilegung line.
 * - Phone/E-Mail are rendered as tel:/mailto: links by the page; the DISPLAYED
 *   text is the verbatim md value — making them actionable does not alter copy.
 */

export const impressum = {
  route: '/impressum',
  breadcrumb: 'Impressum', // NEW COPY: review (nav label)
  overline: 'Rechtliches', // NEW COPY: review (section eyebrow)
  title: 'Impressum', // verbatim md „## Impressum"

  // Each section renders an <h2> (verbatim heading) followed by its body.
  // `groups` = array of paragraphs; each paragraph is an array of lines
  // joined by <br /> so the verbatim line structure is preserved.
  sections: [
    {
      id: 'anbieter',
      heading: 'EnergieAudit Plus GmbH & Co. KG', // verbatim md „###"
      groups: [
        ['Garzauer Chaussee 1A', 'Gebäude TC 9', '15344 Strausberg'],
        ['Handelsregister: HRA 4373 FF', 'Registergericht: Amtsgericht Frankfurt/Oder'],
        ['Vertreten durch:', 'Lippe Strausberg GmbH', 'Garzauer Chaussee 1A', '15344 Strausberg'],
        ['Diese vertreten durch:', 'Frederik Lippe', 'Thomas Schubert'],
        ['Handelsregister: HRB 20383 FF', 'Registergericht: Amtsgericht Frankfurt/Oder'],
      ],
    },
    {
      id: 'kontakt',
      heading: 'Kontakt', // verbatim md „### Kontakt"
      // Rendered as labelled tel:/mailto: links; text values verbatim.
      contact: {
        phoneLabel: 'Telefon:',
        phone: '+49 3341 4272935',
        emailLabel: 'E-Mail:',
        email: 'team@ea-plus.de',
      },
    },
    {
      id: 'umsatzsteuer-id',
      heading: 'Umsatzsteuer-ID', // verbatim md „### Umsatzsteuer-ID"
      groups: [
        [
          'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:',
          'DE368935688',
        ],
      ],
    },
    {
      id: 'berufshaftpflicht',
      heading: 'Angaben zur Berufshaftpflichtversicherung', // verbatim md „###"
      groups: [
        [
          'Name und Sitz des Versicherers:',
          'SIGNAL IDUNA Allgemeine Versicherung AG',
          'Joseph-Scherer-Straße 3',
          '44139 Dortmund',
        ],
        ['Geltungsraum der Versicherung:', 'Deutschland'],
      ],
    },
    {
      id: 'streitbeilegung',
      heading: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle', // verbatim md „###"
      groups: [
        [
          // Verbatim md — note: no terminal period on the live site. Do not add one.
          'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen',
        ],
      ],
    },
  ],
};
