import { Phone, Mail, MessageCircle, CalendarCheck } from 'lucide-react';
import { Container, Heading, Overline, Section, IconChip } from '../../components/primitives/index.js';
import {
  BackToTop,
  Breadcrumbs,
  Card,
  ScrollProgress,
  StandortCard,
  StandorteMap,
} from '../../components/patterns/index.js';
import { Reveal, StaggerGroup } from '../../components/motion/index.js';
import { ContactForm } from '../../components/forms/ContactForm/index.js';
import { hero, directChannels, form, standorte, BOOKINGS_URL } from '../../content/kontakt.js';
import styles from './Kontakt.module.css';

/**
 * /kontakt — the conversion floor (plan §6.6). Phone + E-Mail sit prominently
 * ABOVE the form (never force the form first); the 2-step Projekt-Anfrage form
 * follows; then the 6 eigene Standorte + Partnerstandorte as StandortCards with
 * the self-hosted static StandorteMap (no external requests — DSGVO §8.3).
 *
 * Composition only (plan §3 reuse mandate): all copy lives in
 * src/content/kontakt.js; the page composes library components. <Seo> is
 * rendered globally by App.jsx (description in src/lib/seo.js).
 */

const CHANNEL_ICON = {
  phone: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  bookings: CalendarCheck,
};

export default function KontaktPage() {
  return (
    <>
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={[{ label: 'Start', to: '/' }, { label: 'Kontakt' }]} />
      </Container>

      {/* 1 — Hero + direct channels ABOVE the form (§6.6.1 + §6.6.3) */}
      <Section>
        <Container>
          <Reveal className={styles.heroHead}>
            <Overline>{hero.overline}</Overline>
            <Heading level={1}>{hero.heading}</Heading>
            {hero.lead.map((paragraph) => (
              <p key={paragraph} className="prose">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <StaggerGroup className={styles.channelGrid}>
            {directChannels.map((channel) => (
              <Reveal key={channel.kind} className={styles.channelCell}>
                <Card href={channel.href} className={styles.channel}>
                  <IconChip icon={CHANNEL_ICON[channel.kind]} tone="blue" />
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{channel.label}</span>
                    <span className={styles.channelValue}>{channel.value}</span>
                    {channel.note && <span className={styles.channelNote}>{channel.note}</span>}
                  </span>
                </Card>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 2 — 2-step Projekt-Anfrage form (§6.6.2 + §8) */}
      <Section background="subtle" as="section" aria-labelledby="anfrage-heading">
        <Container className={styles.formLayout}>
          <Reveal className={styles.formIntro}>
            <Overline color="green">{form.overline}</Overline>
            <Heading level={2} id="anfrage-heading">
              {form.heading}
            </Heading>
            <p className="prose">{form.lead}</p>
          </Reveal>
          <div className={styles.formCol}>
            <ContactForm bookingsUrl={BOOKINGS_URL} />
          </div>
        </Container>
      </Section>

      {/* 3 — Standorte + static map (§6.6.4) */}
      <Section as="section" aria-labelledby="standorte-heading">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{standorte.overline}</Overline>
            <Heading level={2} id="standorte-heading">
              {standorte.heading}
            </Heading>
            <p className="prose">{standorte.intro}</p>
          </Reveal>

          <Reveal className={styles.mapWrap}>
            <StandorteMap locations={standorte.mapLocations} />
          </Reveal>

          <StaggerGroup className={styles.standortGrid}>
            {standorte.own.map((location) => (
              <Reveal key={location.name} className={styles.standortCell}>
                <StandortCard
                  name={location.name}
                  addressLines={location.addressLines}
                  phone={location.phone}
                  email={location.email}
                />
              </Reveal>
            ))}
          </StaggerGroup>

          <Reveal className={styles.partnerHead}>
            <Heading level={3}>{standorte.partnerHeading}</Heading>
            <p className="prose">{standorte.partnerIntro}</p>
          </Reveal>

          <StaggerGroup className={styles.standortGrid}>
            {standorte.partners.map((location) => (
              <Reveal key={location.email} className={styles.standortCell}>
                <StandortCard
                  name={location.name}
                  addressLines={location.addressLines}
                  phone={location.phone}
                  email={location.email}
                  headingLevel={4}
                />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <ScrollProgress />
      <BackToTop />
    </>
  );
}
