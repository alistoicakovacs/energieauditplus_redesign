import { AlertTriangle, Info } from 'lucide-react';
import { Container, Heading, Link, Overline } from '../primitives/index.js';
import { BackToTop, Breadcrumbs, ScrollProgress } from '../patterns/index.js';
import styles from './LegalLayout.module.css';

/**
 * LegalLayout — shared page shell for the legal pages (plan §6.7): breadcrumb,
 * a narrow-measure header (Overline + H1 + optional intro/notice), an optional
 * sticky table-of-contents sidebar for long documents, and the readable
 * `.prose` body column. No decorative motion (§6.7).
 *
 * Lives in `layout/` (not `templates/`) because — unlike ServiceDetailTemplate
 * — it does not own a fixed content schema or emit page-specific JSON-LD: it is
 * page CHROME that wraps caller-provided section bodies as `children`. This
 * keeps the legal bodies explicit and auditable in each page (verbatim
 * Impressum vs. flagged Datenschutz placeholders) instead of hidden behind a
 * generic content object. Breadcrumb JSON-LD comes from <Breadcrumbs>.
 *
 * @param {object} props
 * @param {string} props.breadcrumb  current-page breadcrumb label
 * @param {string} props.overline    section eyebrow
 * @param {string} props.title       page H1
 * @param {string} [props.intro]     optional lead paragraph
 * @param {string} [props.reviewNotice]  optional draft-status banner (shown
 *   prominently; used by the Datenschutz skeleton)
 * @param {{id: string, label: string}[]} [props.toc]  when non-empty, renders a
 *   sticky in-page anchor nav + ScrollProgress (long-form layout)
 * @param {import('react').ReactNode} props.children  the section bodies
 */
export default function LegalLayout({
  breadcrumb,
  overline,
  title,
  intro,
  reviewNotice,
  toc,
  children,
}) {
  const longform = Array.isArray(toc) && toc.length > 0;

  return (
    <>
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={[{ label: 'Start', to: '/' }, { label: breadcrumb }]} />
      </Container>

      <Container as="header" className={styles.header}>
        <Overline>{overline}</Overline>
        <Heading level={1}>{title}</Heading>
        {intro && <p className={styles.intro}>{intro}</p>}
        {reviewNotice && (
          <div role="note" className={styles.reviewNotice}>
            <AlertTriangle aria-hidden="true" className={styles.reviewNoticeIcon} />
            <span>{reviewNotice}</span>
          </div>
        )}
      </Container>

      <Container className={longform ? styles.layout : styles.single}>
        {longform && (
          <aside className={styles.tocWrap}>
            <nav aria-label="Inhaltsverzeichnis" className={styles.toc}>
              <p className={styles.tocTitle}>Inhalt</p>
              <ol className={styles.tocList}>
                {toc.map((item) => (
                  <li key={item.id}>
                    <Link href={`#${item.id}`} className={styles.tocLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        <div className={`prose ${styles.body}`}>{children}</div>
      </Container>

      {longform && <ScrollProgress />}
      <BackToTop />
    </>
  );
}

/**
 * One legal section: an anchor target (`id`) with a scroll-margin so the sticky
 * header never covers it, plus its <h2>.
 */
export function LegalSection({ id, heading, children }) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <Heading level={2} size="h3" id={headingId} className={styles.sectionHeading}>
        {heading}
      </Heading>
      {children}
    </section>
  );
}

/**
 * Binding-legal-text placeholder — visually obvious, greppable. Used by the
 * Datenschutz skeleton so counsel can spot every section still to be filled.
 */
export function LegalPlaceholder({ children }) {
  return (
    <div role="note" className={styles.placeholder}>
      <p className={styles.placeholderLabel}>
        <AlertTriangle aria-hidden="true" className={styles.placeholderIcon} />
        Platzhalter — juristisch zu prüfen
      </p>
      <p className={styles.placeholderBody}>{children}</p>
    </div>
  );
}

/**
 * Factual build disclosure — short, NON-binding statements of data-processing
 * facts this build introduces (hosting, form processor, consent). Distinct from
 * a placeholder: these are true and for counsel to fold into the reviewed text.
 *
 * @param {object} props
 * @param {string[]} props.paragraphs  factual statements
 * @param {string} [props.flag]  a `PLACEHOLDER: legal …` line for the still-open
 *   binding detail (e.g. hosting provider name)
 */
export function LegalNote({ paragraphs, flag }) {
  return (
    <div role="note" className={styles.note}>
      <p className={styles.noteLabel}>
        <Info aria-hidden="true" className={styles.noteIcon} />
        Faktische Angabe dieses Builds — für die juristische Prüfung
      </p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.noteBody}>
          {paragraph}
        </p>
      ))}
      {flag && <p className={styles.noteFlag}>{flag}</p>}
    </div>
  );
}
