import { Container, Heading, Section } from '../../components/primitives/index.js';
import HeroSlider from '../../components/patterns/HeroSlider.jsx';

/**
 * /dev/hero — HeroSlider in isolation (Phase 3a), directly below the header
 * so it sits above the fold exactly like on the homepage (LCP/hydration
 * verification). Dev-only: excluded from prerender, sitemap and robots.
 */
export default function DevHeroPage() {
  return (
    <main>
      <HeroSlider />

      <Section background="subtle">
        <Container>
          {/* level 2: the hero's slide-1 claim is the page's single h1 */}
          <Heading level={2} size="h2">
            Hero-Slider — Prüfliste (dev)
          </Heading>
          <ul className="prose">
            <li>
              Autoplay 6 s; pausiert bei Maus-Hover (nicht bei Touch),
              Tastaturfokus im Slider (nicht bei Klick-Fokus) und außerhalb
              des Viewports. Jede manuelle Folienwahl (Pfeile, Tasten,
              Indikatoren, Seitennavigation, Wischen) stoppt Autoplay dauerhaft
              für die Sitzung — der Play-Button startet es wieder.
            </li>
            <li>
              Tastatur: Pfeil links/rechts wechselt Folien (Fokus im Slider);
              Tab erreicht alle Bedienelemente mit sichtbarem Fokusring.
            </li>
            <li>
              Reduzierte Bewegung: kein Autoplay, kein Ken-Burns, kein
              Wort-Reveal; Überblendung ≤ 200 ms; Pause/Play und
              Fortschrittsbalken sind ausgeblendet, manuelle Bedienung bleibt.
            </li>
            <li>
              Hydration: Folie 1 (H1, Bild eager + fetchpriority=high) steht
              vollständig im statischen HTML und wird nie erneut versteckt.
            </li>
          </ul>
        </Container>
      </Section>

      {/* Scroll depth: verifies that autoplay pauses once the hero leaves
          the viewport (plan §7.6 — no off-screen loops). */}
      <Section>
        <Container>
          <p className="prose">
            Scroll-Test: Ist der Hero außerhalb des Viewports, pausiert der
            Autoplay-Timer (kein Loop off-screen) und läuft beim Zurückscrollen
            mit der Restzeit weiter.
          </p>
        </Container>
      </Section>
    </main>
  );
}
