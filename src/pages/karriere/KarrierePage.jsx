import { Send } from 'lucide-react';
import {
  Badge,
  Button,
  Container,
  Heading,
  Overline,
  Section,
} from '../../components/primitives/index.js';
import {
  Accordion,
  BackToTop,
  Breadcrumbs,
  CTABand,
  IconCard,
  ScrollProgress,
  Stepper,
} from '../../components/patterns/index.js';
import { Reveal, StaggerGroup } from '../../components/motion/index.js';
import { ablauf, ausbildung, ctaBand, hero, stelle, vorteile, werte } from '../../content/karriere.js';
import styles from './Karriere.module.css';

/**
 * /karriere (plan §6.4) — funnel: apply. Anrede „du" THROUGHOUT (verbatim
 * karriere.md; new microcopy is „du" too — see content/karriere.js for the
 * verbatim/NEW-COPY provenance and the flagged source quirks). Composed
 * exclusively from the library (§3); layout CSS is grid/spacing only.
 *
 * Hero → Werte (IconCards) → Vorteile (IconCards) → offene Stellen +
 * Ausbildung (Accordion) → Bewerbungs-Ablauf (Stepper) → CTABand. The form
 * backend is another agent's work and unavailable here, so every application
 * CTA is a `mailto:` (no dependency) — TODO: could become the Kontakt form.
 */

/** A job/apprenticeship posting rendered as one Accordion panel. */
function positionPanel(position) {
  return (
    <div className={styles.position}>
      {position.meta && (
        <p className={styles.positionMeta}>
          <Badge tone="blue">{position.meta}</Badge>
        </p>
      )}
      {position.groups.map((group) => (
        <div key={group.heading} className={styles.positionGroup}>
          <Heading level={4} size="h4" className={styles.positionGroupHeading}>
            {group.heading}
          </Heading>
          <ul className={styles.positionList}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <Button
        variant="primary"
        size="md"
        icon={Send}
        iconPosition="left"
        href={position.apply.href}
        className={styles.positionApply}
      >
        {position.apply.label}
      </Button>
    </div>
  );
}

export default function KarrierePage() {
  return (
    <>
      {/* Breadcrumbs: Start → Karriere */}
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={[{ label: 'Start', to: '/' }, { label: 'Karriere' }]} />
      </Container>

      {/* 1 — Hero */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{hero.overline}</Overline>
            <Heading level={1}>{hero.title}</Heading>
            <div className="prose">
              {hero.lead.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <Button
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="left"
                href={hero.primaryCta.href}
              >
                {hero.primaryCta.label}
              </Button>
              <Button variant="outline" size="lg" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 2 — Unsere Werte */}
      <Section background="subtle">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">{werte.overline}</Overline>
            <Heading level={2}>{werte.heading}</Heading>
          </Reveal>
          <StaggerGroup className={styles.werteGrid}>
            {werte.items.map((item) => (
              <Reveal key={item.title}>
                <IconCard icon={item.icon} title={item.title} description={item.text} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 3 — Deine Vorteile (benefit tiles, title only) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{vorteile.overline}</Overline>
            <Heading level={2}>{vorteile.heading}</Heading>
          </Reveal>
          <StaggerGroup className={styles.vorteileGrid}>
            {vorteile.items.map((item) => (
              <Reveal key={item.title}>
                <IconCard icon={item.icon} title={item.title} tone="green" />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 4 — Offene Stellenangebote */}
      <Section background="subtle">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">{stelle.overline}</Overline>
            <Heading level={2}>{stelle.heading}</Heading>
            <p className="prose">{stelle.intro}</p>
          </Reveal>
          <Reveal>
            <Accordion
              items={[{ title: stelle.position.title, content: positionPanel(stelle.position) }]}
              defaultOpen={[0]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 5 — Ausbildung bei EnergieAudit Plus */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{ausbildung.overline}</Overline>
            <Heading level={2}>{ausbildung.heading}</Heading>
            <p className="prose">{ausbildung.intro}</p>
          </Reveal>
          <Reveal>
            <Accordion
              items={[
                { title: ausbildung.position.title, content: positionPanel(ausbildung.position) },
              ]}
              defaultOpen={[0]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 6 — So läuft deine Bewerbung (application process + Initiativbewerbung) */}
      <Section background="subtle">
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
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="left"
              href={ablauf.apply.href}
            >
              {ablauf.apply.label}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 7 — CTABand */}
      <Reveal>
        <CTABand title={ctaBand.title} support={ctaBand.support} />
      </Reveal>

      {/* Global chrome (same as the other content pages). */}
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
