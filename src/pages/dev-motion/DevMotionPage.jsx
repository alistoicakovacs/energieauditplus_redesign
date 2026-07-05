import {
  Container,
  Heading,
  Overline,
  Section,
} from '../../components/primitives/index.js';
import Reveal from '../../components/motion/Reveal.jsx';
import StaggerGroup from '../../components/motion/StaggerGroup.jsx';
import CountUp from '../../components/motion/CountUp.jsx';
import SplitTextReveal from '../../components/motion/SplitTextReveal.jsx';
import EcoLineDraw from '../../components/motion/EcoLineDraw.jsx';
import ParallaxMedia from '../../components/motion/ParallaxMedia.jsx';
import styles from './DevMotion.module.css';

/**
 * /dev/motion — every motion wrapper in action (Phase 2, Package B).
 * Dev-only: excluded from prerender, sitemap and robots.
 *
 * Reduced-motion contract: toggle the OS setting (or DevTools → Rendering →
 * "Emulate CSS media feature prefers-reduced-motion") and every section below
 * must render its FINAL state statically — no reveals, no count-up, no
 * line-draw, no parallax.
 */

const staggerCards = [
  'Energieaudit',
  'Fördermittel',
  'QNG-flow',
  'Blower-Door',
  'LCA',
  'Raumluft',
];

export default function DevMotionPage() {
  return (
    <main>
      {/* ---------- Intro ---------- */}
      <Section>
        <Container>
          <Overline color="green">Dev — Phase 2</Overline>
          <Heading level={1}>Motion-Wrapper</Heading>
          <p className={`${styles.lead} prose`}>
            Jeder Motion-Wrapper in Aktion: Reveal, StaggerGroup, CountUp,
            SplitTextReveal, EcoLineDraw und ParallaxMedia. Diese Seite ist vom
            Prerender/Sitemap/Robots ausgeschlossen.
          </p>
          <p className={`${styles.note} prose`}>
            Hinweis: Mit aktiviertem „Bewegung reduzieren" (OS-Einstellung oder
            DevTools → Rendering → prefers-reduced-motion) muss jede Sektion
            statisch im Endzustand erscheinen — ohne Reveal, CountUp,
            Linienzeichnung oder Parallaxe.
          </p>
        </Container>
      </Section>

      {/* ---------- Reveal ---------- */}
      <Section background="subtle">
        <Container>
          <Reveal>
            <Overline>Motion</Overline>
            <Heading level={2}>Reveal</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.copy}>
              Fade + 20&nbsp;px Rise beim Scrollen in den Viewport — einmalig,
              <code> --ease-out</code>, 300–600&nbsp;ms.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className={styles.demoCard}>Zweiter Block, 200 ms Delay.</div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- StaggerGroup ---------- */}
      <Section>
        <Container>
          <Reveal>
            <Overline>Motion</Overline>
            <Heading level={2}>StaggerGroup</Heading>
            <p className={styles.copy}>
              Sechs Karten, 70&nbsp;ms Versatz — orchestriert vom Parent.
            </p>
          </Reveal>
          <StaggerGroup className={styles.grid}>
            {staggerCards.map((label) => (
              <Reveal key={label}>
                <div className={styles.demoCard}>{label}</div>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* ---------- CountUp ---------- */}
      <Section background="dark">
        <Container>
          <Reveal>
            <Overline color="green">Motion</Overline>
            <Heading level={2} className={styles.onDark}>
              CountUp
            </Heading>
          </Reveal>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountUp value={150000} prefix="bis zu " suffix=" €" />
              </span>
              <span className={styles.statLabel}>Förderung sichern</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountUp value={5} suffix=" %" />
              </span>
              <span className={styles.statLabel}>Zins-Vorteil</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountUp value={1250.5} decimals={1} suffix=" kWh" />
              </span>
              <span className={styles.statLabel}>de-DE Dezimalformat</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- SplitTextReveal ---------- */}
      <Section>
        <Container>
          <Overline color="green">Motion</Overline>
          <Heading level={2}>SplitTextReveal</Heading>
          <p className={styles.copy}>Nur für Hero-Headlines — Wort für Wort.</p>
          <SplitTextReveal
            as="p"
            className={styles.heroHeadline}
            text="Energieberatung, die sich rechnet."
          />
        </Container>
      </Section>

      {/* ---------- EcoLineDraw ---------- */}
      <Section background="subtle">
        <Container>
          <Reveal>
            <Overline>anime.js</Overline>
            <Heading level={2}>EcoLineDraw</Heading>
            <p className={styles.copy}>
              Signatur-Linie Blau→Grün, gezeichnet beim Scrollen in den
              Viewport (IntersectionObserver, anime.js v4).
            </p>
          </Reveal>
          <div className={styles.lineDemo}>
            <p className={styles.demoTitle}>Horizontal (Prozess-Linie)</p>
            <EcoLineDraw d="M2 30 H598" viewBox="0 0 600 60" />
          </div>
          <div className={styles.lineDemo}>
            <p className={styles.demoTitle}>Kurvig (Ablauf-Stepper)</p>
            <EcoLineDraw viewBox="0 0 600 120" duration={1400}>
              <path d="M10 100 C 120 100, 140 20, 250 20 S 380 100, 480 100 S 570 40, 590 30" />
            </EcoLineDraw>
          </div>
        </Container>
      </Section>

      {/* ---------- ParallaxMedia ---------- */}
      <Section>
        <Container>
          <Reveal>
            <Overline color="green">Motion</Overline>
            <Heading level={2}>ParallaxMedia</Heading>
            <p className={styles.copy}>
              ≤&nbsp;8&nbsp;% translateY, scroll-gebunden, ohne CLS (fixe
              Aspect-Ratio, overflow hidden). Platzhalter: Eco-Gradient.
            </p>
          </Reveal>
          <ParallaxMedia aspectRatio="21 / 9" amount={8}>
            <div className={styles.parallaxPlaceholder}>
              <span className={styles.parallaxLabel}>Parallax-Media (Platzhalter)</span>
            </div>
          </ParallaxMedia>
        </Container>
      </Section>

      {/* Spacer so the last demo can scroll fully through the viewport. */}
      <div className={styles.tail} aria-hidden="true" />
    </main>
  );
}
