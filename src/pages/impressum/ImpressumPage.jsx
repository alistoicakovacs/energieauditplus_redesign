import { Fragment } from 'react';
import { Link } from '../../components/primitives/index.js';
import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout.jsx';
import { telHref } from '../../lib/linkUtils.js';
import { impressum } from '../../content/impressum.js';

/**
 * /impressum (plan §6.7) — single-column legal page. All legal copy is VERBATIM
 * from content/impressum.js (source handoff/content/impressum.md; 1:1 from the
 * live site — see that module for per-block provenance). Composed exclusively
 * from the library (§3); no page-local CSS needed (LegalLayout owns layout).
 * Phone/E-Mail are rendered as tel:/mailto: links with verbatim display text.
 */
export default function ImpressumPage() {
  return (
    <LegalLayout
      breadcrumb={impressum.breadcrumb}
      overline={impressum.overline}
      title={impressum.title}
    >
      {impressum.sections.map((section) => (
        <LegalSection key={section.id} id={section.id} heading={section.heading}>
          {section.contact ? (
            <>
              <p>
                {section.contact.phoneLabel}{' '}
                <Link href={`tel:${telHref(section.contact.phone)}`}>
                  {section.contact.phone}
                </Link>
              </p>
              <p>
                {section.contact.emailLabel}{' '}
                <Link href={`mailto:${section.contact.email}`}>
                  {section.contact.email}
                </Link>
              </p>
            </>
          ) : (
            section.groups.map((group, groupIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={groupIndex}>
                {group.map((line, lineIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={lineIndex}>
                    {lineIndex > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            ))
          )}
        </LegalSection>
      ))}
    </LegalLayout>
  );
}
