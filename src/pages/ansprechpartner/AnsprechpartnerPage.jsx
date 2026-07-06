import { Container, Heading, Overline, Section } from '../../components/primitives/index.js';
import {
  BackToTop,
  Breadcrumbs,
  CTABand,
  ScrollProgress,
  TeamCard,
} from '../../components/patterns/index.js';
import { Reveal, StaggerGroup } from '../../components/motion/index.js';
import { ctaBand, hero, team } from '../../content/team.js';
import styles from './Ansprechpartner.module.css';

/**
 * /ansprechpartner (plan §6.5) — funnel: human trust → direct contact.
 * Hero → TeamCard grid (Direction B, monogram placeholders — zero external
 * requests, see content/team.js) → CTABand. Every card exposes a real
 * mailto:/tel: link (the whole point: direct human contact). Composed
 * exclusively from the library (§3); layout CSS is grid only.
 *
 * The optional Standort filter (§6.5) is intentionally omitted — the team
 * location strings do not map cleanly onto the six canonical Standorte
 * (see the inconsistency notes in content/team.js). The source's per-member
 * „Termin vereinbaren" button is represented by the direct mail/phone
 * IconButtons the TeamCard already renders, plus the closing CTABand.
 *
 * Breadcrumb JSON-LD is emitted by <Breadcrumbs>. Person/Organization
 * JSON-LD is deliberately NOT emitted: publishing employee structured data
 * while the phone/location data still has open inconsistencies would be
 * premature — revisit once the client reconciles the roster.
 */
export default function AnsprechpartnerPage() {
  return (
    <>
      {/* Breadcrumbs: Start → Ansprechpartner */}
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={[{ label: 'Start', to: '/' }, { label: 'Ansprechpartner' }]} />
      </Container>

      {/* 1 — Hero intro */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{hero.overline}</Overline>
            <Heading level={1}>{hero.title}</Heading>
            <p className="prose">{hero.lead}</p>
          </Reveal>

          {/* 2 — TeamCard grid. Cards sit directly under the page H1 (no
              intermediate section heading), so each name is an H2 → keeps a
              logical h1→h2 order. Monogram fallback (no photoSrc). */}
          <StaggerGroup className={styles.teamGrid}>
            {team.map((member) => (
              <Reveal key={member.email} className={styles.teamCell}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  credentials={member.credentials}
                  location={member.location}
                  email={member.email}
                  phone={member.phone}
                  headingLevel={2}
                />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 3 — CTABand */}
      <Reveal>
        <CTABand title={ctaBand.title} support={ctaBand.support} />
      </Reveal>

      {/* Global chrome (same as the other content pages). */}
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
