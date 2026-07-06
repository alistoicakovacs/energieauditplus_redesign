import LegalLayout, {
  LegalNote,
  LegalPlaceholder,
  LegalSection,
} from '../../components/layout/LegalLayout.jsx';
import { datenschutz } from '../../content/datenschutz.js';

/**
 * /datenschutzerklaerung (plan §6.7) — long-form legal page with a sticky TOC.
 *
 * CRITICAL: NO binding legal prose is authored here or in content/datenschutz.js
 * (there is no verbatim Datenschutz source in the handoff). Every section body
 * is a flagged, greppable PLACEHOLDER for counsel to fill from the reviewed live
 * text. Three sections additionally carry a FACTUAL build disclosure (Hosting,
 * Kontaktformular/Resend, Cookies/no-consent) — see content/datenschutz.js.
 * Composed exclusively from the library (§3).
 */
export default function DatenschutzerklaerungPage() {
  const toc = datenschutz.sections.map((section) => ({
    id: section.id,
    label: section.heading,
  }));

  return (
    <LegalLayout
      breadcrumb={datenschutz.breadcrumb}
      overline={datenschutz.overline}
      title={datenschutz.title}
      reviewNotice={datenschutz.reviewNotice}
      toc={toc}
    >
      {datenschutz.sections.map((section) => (
        <LegalSection key={section.id} id={section.id} heading={section.heading}>
          {section.note && <LegalNote paragraphs={section.note} flag={section.noteFlag} />}
          <LegalPlaceholder>{section.placeholder}</LegalPlaceholder>
        </LegalSection>
      ))}
    </LegalLayout>
  );
}
