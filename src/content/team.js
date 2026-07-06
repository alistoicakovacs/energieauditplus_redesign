/**
 * /ansprechpartner — team roster + page copy (plan §6.5).
 * Consumed by src/pages/ansprechpartner/AnsprechpartnerPage.jsx.
 *
 * Copy provenance:
 * - handoff/content/team.md → the 12 team members, the closing heading
 *   („Wir freuen uns auf Sie!") and the intro line are VERBATIM 1:1, never
 *   rewritten. The source gives each person ONE undifferentiated role string
 *   (e.g. „Zimmerermeister / M. Sc. / Energieberater / Auditor /
 *   Geschäftsführer"). Direction-B TeamCard renders a short green role
 *   overline + a credentials line, so each string is split for DISPLAY only:
 *   `role` = the last verbatim segment (the position), `credentials` = the
 *   preceding verbatim segments with the source's own delimiter kept intact
 *   (no words changed, no punctuation normalized). See the inconsistency
 *   notes below — all reported to the client, none silently „fixed".
 * - hero.title + ctaBand.support: NEW COPY: review (flagged inline).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TEAM-DATA INCONSISTENCIES (team.md) — reconcile with client before launch,
 * transcribed verbatim here, NOT corrected:
 *  1. Phone formatting differs for the SAME Strausberg-Zentrale number:
 *     Frederik Lippe „033414272935" (no space) vs everyone else at the
 *     Zentrale „03341 4272935" (with space). Footer uses „033414272935".
 *     → tel: links normalize to identical digits (lib/linkUtils.telHref);
 *       only the on-screen display differs. Confirm canonical format.
 *  2. Two „Geschäftsführer" (Frederik Lippe, Thomas Schubert) and two
 *     „Teamleiter" (Dominique Krumm, Jakob Borck). Consistent across
 *     team.md / ueber-uns.md / home.md / 01-company-research.md, so likely
 *     intentional — confirm.
 *  3. Role-string delimiter is inconsistent in the source: „ / " for
 *     members 1–7, „, " (comma) for members 8–10 (Striewski, Albrecht,
 *     Heber). Kept per-member verbatim; confirm a house style.
 *  4. Location strings do NOT map 1:1 to the six canonical Standorte
 *     (content/home.js / kontakt.md: Strausberg-Zentrale, Güstrow,
 *     Heiligengrabe bei Wittstock, Bad Langensalza, Berlin, Bad Belzig).
 *     Dominique Krumm's „Güstrow/Wittstock" fuses two separate Standorte;
 *     no member is at „Bad Langensalza". This is why the optional Standort
 *     filter (§6.5) is OMITTED — the data is not clean enough to filter on
 *     without inventing a mapping. Reconcile team locations ↔ Standorte.
 *  5. Members listed at Berlin (Schubert, Dietrichs) still show the
 *     Strausberg-Zentrale phone „03341 4272935" (Strausberg area code),
 *     not a Berlin number. Confirm the reachable number per person.
 *
 * PORTRAITS: no real photos exist yet. Per §6.5 the placeholders must NOT be
 * hotlinked (zero external requests). We therefore render TeamCard's built-in
 * monogram fallback (omit `photoSrc`) rather than Unsplash stand-ins — no fake
 * portraits, no network calls. TODO: add real portraits (client asset) and
 * set `photoSrc`/`photoAlt` per member before launch.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* §6.5 hero */
export const hero = {
  overline: 'Team', // verbatim team.md (source page H1 „Team")
  title: 'Ihre Ansprechpartner', // NEW COPY: review — the nav/route term; the
  // source H1 is only „Team" (too thin as an H1 and duplicated by the eyebrow)
  // verbatim team.md (intro under „Wir freuen uns auf Sie!")
  lead:
    'Umfassende Beratungs- und Planungsservices für energieoptimierte Gebäude. Von der Bestandsaufnahme bis zur Baubegleitung stehen wir Ihnen zur Seite.',
};

/**
 * The 12 team members, in the source order of team.md. Each field verbatim;
 * `role`/`credentials` split for display only (see module header).
 */
export const team = [
  {
    name: 'Frederik Lippe',
    role: 'Geschäftsführer',
    credentials: 'Zimmerermeister / M. Sc. / Energieberater / Auditor',
    location: 'Strausberg - Zentrale',
    email: 'f.lippe@ea-plus.de',
    phone: '033414272935', // NOTE 1: no space (source verbatim)
  },
  {
    name: 'Thomas Schubert',
    role: 'Geschäftsführer',
    credentials: 'Energieberater / Baubiologe / Auditor',
    location: 'Berlin',
    email: 't.schubert@ea-plus.de',
    phone: '03341 4272935', // NOTE 5: Strausberg number for a Berlin location
  },
  {
    name: 'Patricia Klose',
    role: 'Office Managerin',
    location: 'Strausberg - Zentrale',
    email: 'p.klose@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Dominique Krumm',
    role: 'Teamleiter',
    credentials: 'Zimmerermeister / Energieberater / Auditor',
    location: 'Güstrow/Wittstock', // NOTE 4: fuses two canonical Standorte
    email: 'd.krumm@ea-plus.de',
    phone: '03843 2298907',
  },
  {
    name: 'Jakob Borck',
    role: 'Teamleiter',
    credentials: 'Zimmerermeister / Energieberater / Auditor',
    location: 'Bad Belzig',
    email: 'j.borck@ea-plus.de',
    phone: '+49 1742 434739',
  },
  {
    name: 'Thomas Reber',
    role: 'Projektkoordinator',
    location: 'Strausberg - Zentrale',
    email: 't.reber@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Fabian Dietrichs',
    role: 'Energieberater',
    credentials: 'Zimmerermeister',
    location: 'Berlin',
    email: 'f.dietrichs@ea-plus.de',
    phone: '03341 4272935', // NOTE 5: Strausberg number for a Berlin location
  },
  {
    name: 'Ramon Striewski',
    role: 'Nachhaltigkeitsexperte',
    credentials: 'Bauzeichner, Energieberater', // NOTE 3: comma delimiter (source verbatim)
    location: 'Strausberg - Zentrale',
    email: 'r.striewski@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Jens Albrecht',
    role: 'Nachhaltigkeitsexperte',
    credentials: 'Dipl.-Ing. für Naturschutz', // NOTE 3: comma delimiter in source
    location: 'Strausberg - Zentrale',
    email: 'j.albrecht@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Johann Heber',
    role: 'Blower-Door-Sachverständiger',
    credentials: 'Tischlermeister', // NOTE 3: comma delimiter in source
    location: 'Strausberg - Zentrale',
    email: 'j.heber@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Corinna Holzgreve',
    role: 'Sachbearbeiterin',
    location: 'Strausberg - Zentrale',
    email: 'c.holzgreve@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Elmar Hartmann',
    role: 'Technischer Sachbearbeiter',
    location: 'Strausberg - Zentrale',
    email: 'e.hartmann@ea-plus.de',
    phone: '03341 4272935',
  },
];

/* §6.5 closing CTABand */
export const ctaBand = {
  title: 'Wir freuen uns auf Sie!', // verbatim team.md (closing heading)
  // NEW COPY: review — „Sie" is correct here (Ansprechpartner uses Anrede „Sie")
  support:
    'Sie erreichen jede Ansprechpartnerin und jeden Ansprechpartner direkt per E-Mail oder Telefon — oder vereinbaren Sie gleich einen Termin.',
};
