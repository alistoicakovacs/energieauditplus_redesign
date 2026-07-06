import { Button, Container, Heading, Overline, Section } from '../../components/primitives/index.js';
import {
  BackToTop,
  Breadcrumbs,
  CTABand,
  FeaturedCard,
  IconCard,
  ScrollProgress,
  ServiceCard,
  Stepper,
} from '../../components/patterns/index.js';
import { Reveal, StaggerGroup } from '../../components/motion/index.js';
import {
  ablauf,
  ctaBand,
  featured,
  overview,
  serviceCards,
  usps,
  uspSummary,
} from '../../content/leistungen.js';
import styles from './Leistungen.module.css';

/**
 * /leistungen overview (plan §6.2): hero intro (verbatim
 * leistungen-uebersicht.md) → 7-card service grid (QNG-flow featured) →
 * USP reminder strip → Ablauf → CTABand. All copy lives in
 * src/content/leistungen.js (which reuses home.js blocks per the §6.2
 * reuse notes); this page composes library components only (§3).
 */
export default function LeistungenPage() {
  return (
    <>
      {/* Breadcrumbs: Start → Leistungen */}
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={[{ label: 'Start', to: '/' }, { label: 'Leistungen' }]} />
      </Container>

      {/* 1 — Hero intro + 7 ServiceCards grid, QNG-flow featured (§6.2) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{overview.overline}</Overline>
            <Heading level={1}>{overview.heading}</Heading>
            <p className="prose">{overview.lead}</p>
          </Reveal>
          {/* Featured QNG tile leads the grid (§6.2 emphasis, like home's
              bento); the 6 regular cards follow in navigation order.
              headingLevel 2 throughout: the cards sit directly under the
              page H1 (no intermediate section heading) — keeps h1→h2. */}
          <StaggerGroup className={styles.serviceGrid}>
            <Reveal className={`${styles.serviceCell} ${styles.featuredCell}`}>
              <FeaturedCard
                icon={featured.icon}
                overline={featured.overline}
                title={featured.title}
                description={featured.description}
                stat={featured.stat}
                cta={featured.cta}
                headingLevel={2}
              />
            </Reveal>
            {serviceCards
              .filter((service) => !service.featured)
              .map((service) => (
                <Reveal key={service.to} className={styles.serviceCell}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    to={service.to}
                    headingLevel={2}
                  />
                </Reveal>
              ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 2 — USP reminder strip (reuses home's USP data, §6.2) */}
      <Section background="subtle">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">Warum wir</Overline> {/* NEW COPY: review (eyebrow) */}
            <Heading level={2}>Was uns ausmacht</Heading> {/* NEW COPY: review */}
          </Reveal>
          <StaggerGroup className={styles.uspGrid}>
            {usps.map((usp) => (
              <Reveal key={usp.title}>
                <IconCard icon={usp.icon} title={usp.title} description={usp.text} />
              </Reveal>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className={`${styles.uspSummary} prose`}>
              <strong>{uspSummary}</strong>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — Ablauf (reuses home's 4 steps, §6.2) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">{ablauf.overline}</Overline>
            <Heading level={2}>{ablauf.heading}</Heading>
            <p className="prose">{ablauf.intro}</p>
          </Reveal>
          <Reveal>
            <Stepper steps={ablauf.steps} />
          </Reveal>
          <Reveal className={styles.ablaufCta}>
            <Button variant="primary" size="lg" to={ablauf.cta.to}>
              {ablauf.cta.label}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — CTABand (reuses home's band) */}
      <Reveal>
        <CTABand title={ctaBand.title} support={ctaBand.support} />
      </Reveal>

      {/* Global chrome (same as HomePage). */}
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
