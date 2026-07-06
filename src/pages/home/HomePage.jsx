import { ArrowRight } from 'lucide-react';
import { Badge, Button, Container, Heading, Overline, Section } from '../../components/primitives/index.js';
import {
  BackToTop,
  CTABand,
  FeaturedCard,
  IconCard,
  KineticStatement,
  ScrollProgress,
  ServiceCard,
  StandortCard,
  StandorteMap,
  StatBand,
  StatCard,
  Stepper,
  TestimonialCarousel,
  TrustStrip,
} from '../../components/patterns/index.js';
// Static import (binding hero checklist): the hero is the LCP and must be in
// the route chunk — never React.lazy.
import HeroSlider from '../../components/patterns/HeroSlider.jsx';
// §9 site-wide Organization + multi-location LocalBusiness JSON-LD — emitted
// ONCE, here on the homepage only, to avoid duplicating the company graph.
import OrganizationJsonLd from '../../components/layout/OrganizationJsonLd.jsx';
import { ParallaxMedia, Reveal, StaggerGroup } from '../../components/motion/index.js';
import {
  ablauf,
  bentoFeatured,
  bentoLayout,
  bentoServices,
  bentoStat,
  ctaBand,
  kineticStatement,
  qngTeaser,
  reviews,
  standorte,
  statBand,
  usps,
  uspSummary,
  welcome,
  zielgruppen,
} from '../../content/home.js';
import styles from './Home.module.css';

/**
 * Homepage `/` — the 12 sections of plan §6.1, composed exclusively from the
 * component library (§3 reuse mandate). All copy lives in src/content/home.js
 * with per-block provenance; layout CSS here is grid composition only.
 * The page's single H1 is the hero's slide-1 claim (HeroSlider owns it).
 */
const serviceByRoute = new Map(bentoServices.map((service) => [service.to, service]));

export default function HomePage() {
  return (
    <>
      {/* §9 Structured data: Organization + 6× LocalBusiness (@graph), emitted
          once here as the single site-wide carrier. */}
      <OrganizationJsonLd />

      {/* §9 LCP preload: NOT rendered here. React 19 refuses to hoist a
          responsive image preload (imageSrcSet without href) out of the lazy
          route's Suspense segment, and rendering it inline breaks hydration
          once the prerender moves it into <head>. It therefore lives in the
          prerender pipeline (route.preloadImage in src/routes.jsx →
          scripts/prerender.mjs injects it into the static <head>), exactly
          like the Seo head tags. */}

      {/* 1 — HeroSlider (first child of <main>, own choreography, no Reveal) */}
      <HeroSlider />

      {/* 2 — TrustStrip directly under the hero */}
      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* 3 — Positionierung: welcome intro + 5 USP cards */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>Willkommen</Overline> {/* NEW COPY: review (eyebrow) */}
            <Heading level={2}>{welcome.heading}</Heading>
            <p className="prose">{welcome.body}</p>
            <div className={styles.ctaRow}>
              {welcome.ctas.map((cta) => (
                <Button key={cta.to} variant={cta.variant} size="lg" to={cta.to}>
                  {cta.label}
                </Button>
              ))}
            </div>
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

      {/* 4 — Leistungen: asymmetric bento grid, QNG-flow featured */}
      <Section background="subtle">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>Leistungen</Overline> {/* NEW COPY: review (eyebrow) */}
            <Heading level={2}>Unsere Leistungen</Heading>
          </Reveal>
          {/* Cell order + spans are content-owned (bentoLayout in
              src/content/home.js); this page only resolves and renders. */}
          <StaggerGroup className={styles.bento}>
            {bentoLayout.map((cell) => {
              if (cell.kind === 'featured') {
                return (
                  <Reveal key="featured" className={`${styles.bentoCell} ${styles.bentoFeatured}`}>
                    <FeaturedCard
                      icon={bentoFeatured.icon}
                      overline={bentoFeatured.overline}
                      title={bentoFeatured.title}
                      description={bentoFeatured.description}
                      stat={bentoFeatured.stat}
                      cta={bentoFeatured.cta}
                    />
                  </Reveal>
                );
              }
              if (cell.kind === 'stat') {
                return (
                  <Reveal key="stat" className={styles.bentoCell}>
                    <StatCard
                      icon={bentoStat.icon}
                      value={bentoStat.value}
                      prefix={bentoStat.prefix}
                      suffix={bentoStat.suffix}
                      label={bentoStat.label}
                    />
                  </Reveal>
                );
              }
              const service = serviceByRoute.get(cell.to);
              if (!service) return null; // guarded in DEV by content/home.js
              return (
                <Reveal
                  key={cell.to}
                  className={`${styles.bentoCell}${cell.wide ? ` ${styles.bentoWide}` : ''}`}
                >
                  <ServiceCard {...service} />
                </Reveal>
              );
            })}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 5 — Zielgruppen „Für wen" (NEW COPY: review — whole section) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline color="green">{zielgruppen.overline}</Overline>
            <Heading level={2}>{zielgruppen.heading}</Heading>
          </Reveal>
          <StaggerGroup className={styles.zielgruppenGrid}>
            {zielgruppen.items.map((item) => (
              <Reveal key={item.title}>
                <IconCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  links={item.links}
                />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* 6 — Kinetic positioning statement (NEW COPY: review) — the one
          theatrical typographic moment; owns its scroll choreography, so no
          Reveal wrapper. */}
      <Section>
        <Container>
          <KineticStatement text={kineticStatement} />
        </Container>
      </Section>

      {/* 7 — StatBand (dark, count-ups; reveals internally) */}
      <StatBand overline={statBand.overline} title={statBand.title} stats={statBand.stats} />

      {/* 8 — QNG-flow product teaser (dark premium band) */}
      <Section background="dark">
        <Container>
          <div className={styles.qngGrid}>
            <Reveal className={styles.qngText}>
              <Overline color="green">{qngTeaser.overline}</Overline>
              <Heading level={2}>{qngTeaser.title}</Heading>
              <p>{qngTeaser.body}</p>
              <p>
                <strong>{qngTeaser.proof}</strong>
              </p>
              <div className={styles.qngCta}>
                <Button variant="onDark" size="lg" icon={ArrowRight} to={qngTeaser.cta.to}>
                  {qngTeaser.cta.label}
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <ParallaxMedia aspectRatio="4 / 3" rounded>
                <img
                  src={`${qngTeaser.image.stem}-1600.jpg`}
                  srcSet={`${qngTeaser.image.stem}-800.webp 800w, ${qngTeaser.image.stem}-1600.webp 1600w`}
                  sizes="(min-width: 900px) 40vw, 100vw"
                  alt={qngTeaser.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </ParallaxMedia>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 9 — Ablauf: 4 steps (Stepper draws the eco line internally) */}
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
            <Button variant="primary" size="lg" to={ablauf.cta.to}>
              {ablauf.cta.label}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 10 — Google-Bewertungen (real reviews, verbatim home.md) */}
      <Section>
        <Container>
          <Reveal className={styles.sectionHeadCentered}>
            <Overline color="green">{reviews.overline}</Overline>
            <Heading level={2}>{reviews.heading}</Heading>
            <p>{reviews.note}</p>
          </Reveal>
          <Reveal>
            <TestimonialCarousel items={reviews.items} label={reviews.heading} />
          </Reveal>
        </Container>
      </Section>

      {/* 11 — Standorte teaser: static Germany map + Zentrale + list */}
      <Section background="blue-tint">
        <Container>
          <Reveal className={styles.sectionHead}>
            <Overline>{standorte.overline}</Overline>
            <Heading level={2}>{standorte.heading}</Heading>
            <p className="prose">{standorte.intro}</p>
          </Reveal>
          <div className={styles.standorteGrid}>
            <Reveal>
              <StandorteMap locations={standorte.locations} className={styles.standorteMap} />
            </Reveal>
            <Reveal>
              <StandortCard
                name={standorte.zentrale.name}
                addressLines={standorte.zentrale.addressLines}
                phone={standorte.zentrale.phone}
                email={standorte.zentrale.email}
              />
              <ul className={styles.standorteList}>
                {standorte.locations
                  .filter((location) => !location.zentrale)
                  .map((location) => (
                    <li key={location.name}>
                      <span>{location.name}</span>
                      {location.partner && <Badge tone="green">Partner</Badge>}
                    </li>
                  ))}
              </ul>
              <div className={styles.standorteCta}>
                <Button variant="outline" size="md" icon={ArrowRight} to={standorte.cta.to}>
                  {standorte.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 12 — CTABand */}
      <Reveal>
        <CTABand title={ctaBand.title} support={ctaBand.support} />
      </Reveal>

      {/* Global chrome: eco scroll progress + back-to-top (fixed, end of DOM
          so the button is the last tab stop). */}
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
