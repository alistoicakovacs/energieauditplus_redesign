import { Badge, Button, Container, Heading, Overline, Section } from '../primitives/index.js';
import {
  Accordion,
  BackToTop,
  Breadcrumbs,
  CTABand,
  IconCard,
  KineticStatement,
  PraxistippCallout,
  ScrollProgress,
  ServiceCard,
  StatBand,
  Stepper,
} from '../patterns/index.js';
import { Reveal, StaggerGroup } from '../motion/index.js';
import { getRelatedServiceCards } from '../../content/leistungen.js';
import { buildFaqJsonLd, buildServiceJsonLd, getSeoMeta } from '../../lib/seo.js';
import styles from './ServiceDetailTemplate.module.css';

/** Escape `<` so JSON-LD can never close its own <script> tag. */
const jsonLdString = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Top-level serviceContent keys the template renders (README schema).
    Unknown keys throw in DEV so a typo can't silently vanish a section. */
const KNOWN_CONTENT_KEYS = new Set([
  'route',
  'name',
  'hero',
  'nutzen',
  'platform',
  'kinetic',
  'ablauf',
  'details',
  'stats',
  'praxistipp',
  'faq',
  'ctaBand',
]);

/**
 * ServiceDetailTemplate — the plan §6.3 service-detail skeleton, rendered
 * from ONE `serviceContent` object (schema: src/components/templates/README.md;
 * instances: src/content/services/*.js). Section order:
 *
 *   1 Breadcrumbs + page hero (image + --grad-hero-veil, H1, lead, chip, CTAs)
 *   2 Nutzen (IconCards)               — §6.3.2
 *   3 KineticStatement (optional, §13.3 — QNG page only)
 *   4 Platform extras (QNG flagship)   — feature grid + screenshot placeholder
 *   5 Ablauf (Stepper, verbatim steps) — §6.3.3
 *   6 Details (Accordion, optional)    — §6.3.4
 *   7 Proof numbers (StatBand)         — §6.3.5
 *   8 Praxistipp + FAQ (Accordion + FAQPage JSON-LD) — §6.3.6
 *   9 Cross-sell (2–3 ServiceCards via relatedServices) — §6.3.7
 *  10 CTABand                          — §6.3.8
 *
 * JSON-LD: BreadcrumbList (via Breadcrumbs), Service (always), FAQPage
 * (only when `faq` has items) — all as body scripts, which Google parses.
 *
 * Copy is content-owned EXCEPT the template-owned fixed strings (identical
 * on every service page, listed in templates/README.md): breadcrumb labels
 * „Start"/„Leistungen", hero overline „Leistung", hero CTAs
 * „Termin vereinbaren" / „Kostenloses Erstgespräch", Ablauf eyebrow
 * „Ablauf" (NEW COPY: review) and cross-sell heading „Mehr erfahren"
 * (verbatim content .md section heading).
 */
export default function ServiceDetailTemplate({ content }) {
  const {
    route,
    name,
    hero,
    nutzen,
    platform,
    kinetic,
    ablauf,
    details,
    stats,
    praxistipp,
    faq,
    ctaBand,
  } = content;

  if (import.meta.env.DEV) {
    for (const [key, value] of Object.entries({ route, name, hero, nutzen, ablauf, ctaBand })) {
      if (!value) throw new Error(`ServiceDetailTemplate: serviceContent.${key} is required`);
    }
    for (const key of Object.keys(content)) {
      if (!KNOWN_CONTENT_KEYS.has(key)) {
        throw new Error(
          `ServiceDetailTemplate: unknown serviceContent key "${key}" — ` +
            'the template would silently ignore it (schema: templates/README.md)'
        );
      }
    }
  }

  const hasFaq = (faq?.items?.length ?? 0) > 0;
  const related = getRelatedServiceCards(route);
  const breadcrumbs = [
    { label: 'Start', to: '/' },
    { label: 'Leistungen', to: '/leistungen' },
    { label: name },
  ];
  // JSON-LD Service name = the plain service name (no site suffix); the
  // description reuses the route's meta description (lib/seo.js map).
  const serviceJsonLd = buildServiceJsonLd({
    name,
    path: route,
    description: getSeoMeta(route).description,
  });

  return (
    <>
      {/* Structured data (§9): Service always, FAQPage only with real FAQs.
          BreadcrumbList comes from the Breadcrumbs pattern below. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceJsonLd) }}
      />
      {hasFaq && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString(buildFaqJsonLd(faq.items)) }}
        />
      )}

      {/* 1 — Breadcrumb trail (above the hero: keeps AA contrast off the photo) */}
      <Container className={styles.breadcrumbBar}>
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* 1 — Page hero: photo + --grad-hero-veil + left scrim (HeroSlider's
          §7.2 readability recipe), static — no slider choreography. */}
      <div className={styles.hero}>
        <div className={styles.heroMedia}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${hero.image.stem}-800.webp 800w, ${hero.image.stem}-1600.webp 1600w`}
              sizes="100vw"
            />
            {/* TODO: replace with real EA+ photo */}
            <img
              className={styles.heroImage}
              src={`${hero.image.stem}-1600.jpg`}
              srcSet={`${hero.image.stem}-800.jpg 800w, ${hero.image.stem}-1600.jpg 1600w`}
              sizes="100vw"
              alt={hero.image.alt}
              width="1600"
              height="900"
              loading="eager"
              fetchPriority="high"
              data-placeholder="unsplash"
            />
          </picture>
          <div className={styles.heroVeil} aria-hidden="true" />
          <div className={styles.heroScrim} aria-hidden="true" />
        </div>
        <Container className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Overline as="p" color="green" className={styles.heroOverline}>
              Leistung
            </Overline>
            <Heading level={1} size="display" className={styles.heroTitle}>
              {hero.title}
            </Heading>
            {hero.subline && <p className={styles.heroSubline}>{hero.subline}</p>}
            {hero.lead.map((paragraph, i) => (
              // eslint-disable-next-line react/no-array-index-key -- static verbatim list
              <p key={i} className={styles.heroLead}>
                {paragraph}
              </p>
            ))}
            {(hero.chip || hero.stat) && (
              <p className={styles.heroProof}>
                {hero.chip && <Badge tone="green">{hero.chip}</Badge>}
                {hero.stat && (
                  <span className={styles.heroStat}>
                    <strong>{hero.stat.value}</strong> {hero.stat.label}
                  </span>
                )}
              </p>
            )}
            <div className={styles.heroActions}>
              <Button to="/kontakt" variant="accent" size="lg">
                Termin vereinbaren
              </Button>
              <Button to="/kontakt" variant="onDark" size="lg">
                Kostenloses Erstgespräch
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* 2 — Nutzen / Für wen (§6.3.2) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            {nutzen.overline && <Overline color="green">{nutzen.overline}</Overline>}
            <Heading level={2}>{nutzen.heading}</Heading>
            {nutzen.intro?.map((paragraph, i) => (
              // eslint-disable-next-line react/no-array-index-key -- static verbatim list
              <p key={i} className="prose">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <StaggerGroup className={styles.nutzenGrid}>
            {nutzen.items.map((item) => (
              <Reveal key={item.title}>
                <IconCard icon={item.icon} title={item.title} description={item.text} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 3 — Kinetic statement (§13.3: one per page, QNG page only; owns its
          scroll choreography, so no Reveal wrapper). Placed before the
          platform section: it is the platform block's verbatim opening line. */}
      {kinetic && (
        <Section>
          <Container>
            <KineticStatement text={kinetic} />
          </Container>
        </Section>
      )}

      {/* 4 — Platform extras (QNG flagship, §6.3 „QNG-flow page gets extra") */}
      {platform && (
        <Section background="dark">
          <Container>
            <div className={styles.platformGrid}>
              <Reveal className={styles.platformText}>
                <Overline color="green">{platform.overline}</Overline>
                <Heading level={2}>{platform.heading}</Heading>
                {platform.tagline && (
                  <p className={styles.platformTagline}>
                    <strong>{platform.tagline}</strong>
                  </p>
                )}
                {platform.body.map((paragraph, i) => (
                  // eslint-disable-next-line react/no-array-index-key -- static verbatim list
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>
              <Reveal>
                {/* TODO: replace the placeholder with a real QNG-flow
                    product screenshot (client asset, not yet delivered). */}
                <div
                  className={styles.screenshot}
                  data-placeholder="screenshot"
                  role="img"
                  aria-label={platform.screenshot.ariaLabel}
                >
                  <span>{platform.screenshot.label}</span>
                </div>
              </Reveal>
            </div>
            {platform.features && (
              <StaggerGroup className={styles.featureGrid}>
                {platform.features.map((feature) => (
                  <Reveal key={feature.title}>
                    <IconCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.text}
                      tone="green"
                    />
                  </Reveal>
                ))}
              </StaggerGroup>
            )}
          </Container>
        </Section>
      )}

      {/* 5 — Ablauf (§6.3.3): verbatim steps */}
      <Section background="subtle">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">Ablauf</Overline> {/* NEW COPY: review (eyebrow) */}
            <Heading level={2}>{ablauf.heading}</Heading>
          </Reveal>
          <Reveal>
            <Stepper steps={ablauf.steps} />
          </Reveal>
        </Container>
      </Section>

      {/* 6 — Details / Normen & Leistungsumfang (§6.3.4, optional) */}
      {details && (
        <Section>
          <Container>
            <Reveal className={styles.sectionHead}>
              {details.overline && <Overline>{details.overline}</Overline>}
              <Heading level={2}>{details.heading}</Heading>
              {details.intro?.map((paragraph, i) => (
                // eslint-disable-next-line react/no-array-index-key -- static verbatim list
                <p key={i} className="prose">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal className={styles.accordionWrap}>
              <Accordion
                items={details.items.map((item) => ({
                  title: item.title,
                  content: toParagraphs(item.content),
                }))}
              />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 7 — Proof numbers (§6.3.5): StatBand, REAL numbers only */}
      {stats && <StatBand overline={stats.overline} title={stats.title} stats={stats.items} />}

      {/* 8 — Praxistipp + FAQ (§6.3.6) */}
      {(hasFaq || praxistipp) && (
        <Section>
          <Container>
            {praxistipp && (
              <Reveal className={styles.praxistipp}>
                <PraxistippCallout>{praxistipp}</PraxistippCallout>
              </Reveal>
            )}
            {hasFaq && (
              <>
                <Reveal className={styles.sectionHead}>
                  {faq.overline && <Overline color="green">{faq.overline}</Overline>}
                  <Heading level={2}>{faq.heading}</Heading>
                </Reveal>
                <Reveal className={styles.accordionWrap}>
                  <Accordion
                    items={faq.items.map((item) => ({
                      title: item.question,
                      content: toParagraphs(item.answer),
                    }))}
                  />
                </Reveal>
              </>
            )}
          </Container>
        </Section>
      )}

      {/* 9 — Cross-sell (§6.3.7): 2–3 related services (map: content/leistungen.js) */}
      {related.length > 0 && (
        <Section background="subtle">
          <Container>
            <Reveal className={styles.sectionHead}>
              <Heading level={2}>Mehr erfahren</Heading> {/* verbatim (content .md section heading) */}
            </Reveal>
            <StaggerGroup className={styles.relatedGrid}>
              {related.map((service) => (
                <Reveal key={service.to}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    to={service.to}
                  />
                </Reveal>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      )}

      {/* 10 — CTABand (§6.3.8) */}
      <Reveal>
        <CTABand
          title={ctaBand.title}
          support={ctaBand.support}
          primary={ctaBand.primary}
          secondary={ctaBand.secondary}
        />
      </Reveal>

      {/* Global chrome (same as HomePage): eco scroll progress + back-to-top
          (fixed, end of DOM so the button is the last tab stop). */}
      <ScrollProgress />
      <BackToTop />
    </>
  );
}

/** string | string[] → <p> list (verbatim paragraphs from the content files). */
function toParagraphs(content) {
  const paragraphs = Array.isArray(content) ? content : [content];
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        // eslint-disable-next-line react/no-array-index-key -- static verbatim list
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
}
