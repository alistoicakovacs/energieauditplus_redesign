import {
  Building2,
  Fan,
  HandCoins,
  Home,
  Leaf,
  MapPin,
  Recycle,
  Users,
  Wind,
} from 'lucide-react';
import { Container, Heading, Overline, Section } from '../../components/primitives/index.js';
import {
  Accordion,
  BackToTop,
  Breadcrumbs,
  CTABand,
  FeaturedCard,
  PraxistippCallout,
  ScrollProgress,
  ServiceCard,
  StandortCard,
  StatBand,
  StatCard,
  Stepper,
  TeamCard,
  TestimonialCarousel,
  TrustStrip,
} from '../../components/patterns/index.js';
import styles from './DevPatterns.module.css';

/**
 * /dev/patterns — every Tier-2 pattern in realistic states (Phase 4
 * patterns, pulled forward). Dev-only: excluded from prerender, sitemap
 * and robots.
 *
 * Content sources: service names/routes = src/routes.jsx; team & contact
 * data = handoff/content/team.md (verbatim); testimonials = real Google
 * reviews from handoff/content/home.md. Everything marked DEMO below is
 * demo-only copy for this page — NOT approved website text.
 */

// Real service names (handoff/content/home.md) + real routes (src/routes.jsx).
// The one-liners are DEMO copy.
const SERVICES = [
  {
    icon: Home,
    title: 'Neubau & Energieberatung',
    description: 'Effizient planen und bauen — von der ersten Idee bis zum Effizienzhaus.', // DEMO
    to: '/leistungen/neubau-energieberatung',
  },
  {
    icon: Building2,
    title: 'Energieberatung für Bestandsgebäude',
    description: 'Sanierungsfahrplan und Energiekonzept für Ihr Bestandsgebäude.', // DEMO
    to: '/leistungen/bestandsgebaeude',
  },
  {
    icon: HandCoins,
    title: 'Fördermittelservice',
    description: 'BAFA- und KfW-Anträge — wir holen die maximale Förderung heraus.', // DEMO
    to: '/leistungen/fordermittelservice',
  },
  {
    icon: Recycle,
    title: 'Lebenszyklusanalyse (LCA)',
    description: 'Ökobilanz über den gesamten Gebäudelebenszyklus — belastbar berechnet.', // DEMO
    to: '/leistungen/lebenszyklusanalyse-lca',
  },
  {
    icon: Wind,
    title: 'Raumluftmessung & Baubiologie',
    description: 'Gesunde Innenraumluft, messbar gemacht — inklusive Schadstoffanalyse.', // DEMO
    to: '/leistungen/raumluftmessung-baubiologie',
  },
  {
    icon: Fan,
    title: 'Blower-Door-Test',
    description: 'Luftdichtheit normgerecht prüfen — Pflichtnachweis sicher bestehen.', // DEMO
    to: '/leistungen/blower-door-test',
  },
];

// Team data verbatim from handoff/content/team.md.
const TEAM = [
  {
    name: 'Frederik Lippe',
    role: 'Geschäftsführer',
    credentials: 'Zimmerermeister · M. Sc. · Auditor',
    location: 'Strausberg',
    email: 'f.lippe@ea-plus.de',
    phone: '033414272935',
    // DEMO photo state: Unsplash placeholder (style guide §4.2) — replace
    // with the real portrait before any page uses this.
    photoSrc:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80',
    photoAlt: 'Porträt von Frederik Lippe (Platzhalterfoto)',
  },
  {
    name: 'Thomas Schubert',
    role: 'Geschäftsführer',
    credentials: 'Energieberater · Baubiologe · Auditor',
    location: 'Berlin',
    email: 't.schubert@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Patricia Klose',
    role: 'Office Managerin',
    credentials: 'Organisation · Ansprechpartnerin Backoffice', // DEMO wording
    location: 'Strausberg',
    email: 'p.klose@ea-plus.de',
    phone: '03341 4272935',
  },
  {
    name: 'Dominique Krumm',
    role: 'Teamleiter',
    credentials: 'Zimmerermeister · Energieberater · Auditor',
    location: 'Güstrow/Wittstock',
    email: 'd.krumm@ea-plus.de',
    phone: '03843 2298907',
  },
];

// Zentrale verbatim from team.md footer; Berlin/Güstrow addresses are DEMO.
const STANDORTE = [
  {
    name: 'Strausberg — Zentrale',
    addressLines: ['Garzauer Chaussee 1a', '15344 Strausberg'],
    phone: '033414272935',
    email: 'team@ea-plus.de',
  },
  {
    name: 'Berlin',
    addressLines: ['Musterstraße 12', '10115 Berlin'], // DEMO address
    phone: '03341 4272935',
  },
  {
    name: 'Güstrow',
    addressLines: ['Beispielweg 3', '18273 Güstrow'], // DEMO address
    phone: '03843 2298907',
  },
];

// DEMO process (typischer Ablauf BzA → BnD).
const ABLAUF = [
  { title: 'Erstgespräch', text: 'Kostenlos und unverbindlich — wir klären Ziel, Gebäude und Förderlage.' },
  { title: 'Bestandsaufnahme', text: 'Vor-Ort-Termin: Hülle, Anlagentechnik und Verbrauchsdaten.' },
  { title: 'Konzept & Förderantrag', text: 'Energiekonzept (BzA) und Antragstellung bei BAFA/KfW.' },
  { title: 'Baubegleitung', text: 'Umsetzung mit geprüfter Qualität (BnD) — wir bleiben an Ihrer Seite.' },
  { title: 'Nachweis & Abschluss', text: 'Verwendungsnachweis, Dokumentation und Auszahlung der Förderung.' },
];

// DEMO FAQ copy.
const FAQ = [
  {
    title: 'Welche Fördermittel kann ich erhalten?',
    content: (
      <p>
        Je nach Vorhaben kommen BAFA-Zuschüsse und KfW-Kredite mit
        Tilgungszuschuss infrage — bei umfassenden Sanierungen bis zu
        150.000&nbsp;€ Kreditrahmen je Wohneinheit. Im Erstgespräch prüfen
        wir, welche Programme sich für Ihr Gebäude kombinieren lassen.
      </p>
    ),
  },
  {
    title: 'Wie läuft ein Energieaudit ab?',
    content: (
      <p>
        Nach der Bestandsaufnahme vor Ort erstellen wir das Energiekonzept,
        stellen die Förderanträge und begleiten die Umsetzung bis zum
        Verwendungsnachweis — alles aus einer Hand.
      </p>
    ),
  },
  {
    title: 'Was ist der QNG-flow?',
    content: (
      <p>
        Unser strukturierter Weg zum Qualitätssiegel Nachhaltiges Gebäude
        (QNG): von der Lebenszyklusanalyse über die Nachweisführung bis zur
        Zertifizierung — Voraussetzung für die KfW-Förderung „Klimafreundlicher
        Neubau".
      </p>
    ),
  },
  {
    title: 'Brauche ich einen Blower-Door-Test?',
    content: (
      <p>
        Für viele Förderprogramme und Effizienzhaus-Nachweise ist die
        Luftdichtheitsmessung Pflicht — und in jedem Fall eine sinnvolle
        Qualitätskontrolle vor dem Innenausbau.
      </p>
    ),
  },
];

// DEMO stats — „12 Expertinnen & Experten" entspricht team.md, Rest Platzhalter.
const STATS = [
  { value: 500, suffix: '+', label: 'begleitete Projekte (Demo-Wert)' },
  { value: 12, label: 'Expertinnen & Experten im Team' },
  { value: 6, label: 'Standorte in Ostdeutschland (Demo-Wert)' },
  { value: 150000, prefix: 'bis zu ', suffix: ' €', label: 'Förderung je Wohneinheit' },
];

// Real Google reviews (handoff/content/home.md, Trustindex widget).
const TESTIMONIALS = [
  {
    quote:
      'Super angenehme, professionelle und vor allem menschliche Zusammenarbeit. Immer wieder gerne.',
    name: 'Michael Arnold',
    rating: 5,
    date: '11/05/2026',
  },
  {
    quote:
      'Saubere Arbeit als Energieberater und sachverständige Zusammenarbeit für mich als Heizungsbauer.',
    name: 'Guido Dräger',
    rating: 5,
    date: '11/05/2026',
  },
  {
    quote:
      'Sehr sehr schnelle Bearbeitung des Förderantrages. Die Mitarbeiter sind sehr nett und zuvorkommend. Telefonisch ist auch immer jemand erreichbar und wenn mal nicht, wird man in kürzester Zeit zurückgerufen. Also besser geht es nicht.',
    name: 'Ute Skrempa',
    rating: 5,
    date: '12/05/2026',
  },
  {
    quote:
      'Fachkompetente Betreuung durch Herr Lippe und seinem Team. Wir haben schon mehrere große Projekte miteinander umgesetzt. Absolut zuverlässig und professionell.',
    name: 'Der Philipp',
    rating: 5,
    date: '11/05/2026',
  },
];

export default function DevPatternsPage() {
  return (
    <main>
      {/* Global chrome patterns (fixed): eco progress bar + back-to-top. */}
      <ScrollProgress />
      <BackToTop />

      {/* ---------- Intro (above fold — everything static, no reveals) ---------- */}
      <Section>
        <Container>
          <Overline color="green">Dev — Phase 4 (vorgezogen)</Overline>
          <Heading level={1}>Pattern-Bibliothek</Heading>
          <p className={`${styles.lead} prose`}>
            Jede Tier-2-Pattern-Komponente in realistischen Zuständen.
            Demo-Inhalte sind im Quelltext als DEMO markiert — kein
            freigegebener Website-Text. Diese Seite ist vom
            Prerender/Sitemap/Robots ausgeschlossen.
          </p>
          <p className={`${styles.note} prose`}>
            ScrollProgress (Eco-Verlaufsbalken oben) und BackToTop (erscheint
            nach ~1,5 Viewports) sind auf dieser Seite montiert. Mit „Bewegung
            reduzieren": kein Balken, Sprung nach oben statt Smooth-Scroll,
            statisches Logo-Band, keine Linienzeichnung, kein Count-up.
          </p>

          <Heading level={2} size="h4" className={styles.sub}>
            Breadcrumbs (mit BreadcrumbList-JSON-LD)
          </Heading>
          <Breadcrumbs
            items={[
              { label: 'Startseite', to: '/' },
              { label: 'Leistungen', to: '/leistungen' },
              { label: 'Blower-Door-Test' },
            ]}
          />
        </Container>
      </Section>

      {/* ---------- Bento grid (homepage §6.1.4 composition) ---------- */}
      <Section background="subtle">
        <Container>
          <div className={styles.sectionHead}>
            <Overline>Karten-Familie</Overline>
            <Heading level={2}>Bento-Grid: ServiceCards + FeaturedCard + StatCard</Heading>
          </div>
          <div className={styles.bento}>
            {SERVICES.slice(0, 4).map((service) => (
              <ServiceCard key={service.to} {...service} />
            ))}
            <FeaturedCard
              className={styles.bentoFeatured}
              icon={Leaf}
              overline="Nachhaltigkeitsaudit"
              title="Nachhaltigkeitsaudit mit QNG-flow"
              description="Unser strukturierter Weg zum Qualitätssiegel Nachhaltiges Gebäude — Voraussetzung für die KfW-Förderung „Klimafreundlicher Neubau“."
              stat={{ value: 150000, prefix: 'bis zu ', suffix: ' €', label: 'Förderung je Wohneinheit' }}
              cta={{ label: 'QNG-flow entdecken', to: '/leistungen/qng-flow' }}
            />
            <StatCard
              icon={Users}
              value={12}
              label="Expertinnen & Experten im Team"
            />
            {SERVICES.slice(4).map((service) => (
              <ServiceCard key={service.to} {...service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- TeamCard (Direction B) ---------- */}
      <Section>
        <Container>
          <div className={styles.sectionHeadCentered}>
            <Overline color="green">Unser Team</Overline>
            <Heading level={2}>TeamCard — Direction B</Heading>
            <p className={styles.note}>
              Erste Karte mit Foto-Platzhalter (Unsplash), übrige mit
              Monogramm. Mail/Telefon sind echte mailto:/tel:-Links (44 px).
            </p>
          </div>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- StandortCard ---------- */}
      <Section background="blue-tint">
        <Container>
          <div className={styles.sectionHead}>
            <Overline>Standorte</Overline>
            <Heading level={2}>StandortCard</Heading>
          </div>
          <div className={styles.standortGrid}>
            {STANDORTE.map((standort) => (
              <StandortCard key={standort.name} {...standort} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Stepper ---------- */}
      <Section>
        <Container>
          <div className={styles.sectionHead}>
            <Overline color="green">Ablauf</Overline>
            <Heading level={2}>Stepper — Linie zeichnet beim Scrollen</Heading>
            <p className={styles.note}>
              Horizontal ab 768 px, vertikale Timeline darunter. Die
              Eco-Verlaufslinie (EcoLineDraw) zeichnet einmalig; mit
              reduzierter Bewegung steht sie sofort im Endzustand.
            </p>
          </div>
          <Stepper steps={ABLAUF} />
        </Container>
      </Section>

      {/* ---------- Accordion ---------- */}
      <Section background="subtle">
        <Container>
          <div className={styles.sectionHead}>
            <Overline>FAQ</Overline>
            <Heading level={2}>Accordion</Heading>
            <p className={styles.note}>
              Einzeln öffnend (erste Frage vorgeöffnet), Tastatur: Pfeiltasten
              / Pos1 / Ende zwischen den Fragen, Enter/Leertaste zum Umschalten.
            </p>
          </div>
          <Accordion items={FAQ} defaultOpen={[0]} />

          <Heading level={3} size="h4" className={styles.sub}>
            Variante: mehrere gleichzeitig offen (multiple)
          </Heading>
          <Accordion items={FAQ.slice(0, 2)} multiple />
        </Container>
      </Section>

      {/* ---------- StatBand (dark) ---------- */}
      <StatBand
        overline="Zahlen, die überzeugen"
        title="StatBand — CountUp im dunklen Band"
        stats={STATS}
      />

      {/* ---------- TrustStrip ---------- */}
      <div className={styles.trustWrap}>
        <Container>
          <p className={styles.trustNote}>
            TrustStrip — Marquee pausiert bei Hover/Fokus und außerhalb des
            Viewports; mit reduzierter Bewegung statische Reihe. Wortmarken
            sind Logo-Platzhalter.
          </p>
        </Container>
        <TrustStrip />
      </div>

      {/* ---------- TestimonialCarousel ---------- */}
      <Section>
        <Container>
          <div className={styles.sectionHeadCentered}>
            <Overline color="green">Kundenstimmen</Overline>
            <Heading level={2}>TestimonialCarousel</Heading>
            <p className={styles.note}>
              Echte Google-Bewertungen (Stand 25.06.2026). Kein Autoplay —
              nur Pfeile, Indikatoren und Wischgeste.
            </p>
          </div>
          <TestimonialCarousel items={TESTIMONIALS} label="Google-Bewertungen" />
        </Container>
      </Section>

      {/* ---------- PraxistippCallout ---------- */}
      <Section background="subtle">
        <Container>
          <div className={styles.sectionHead}>
            <Overline>Hinweise</Overline>
            <Heading level={2}>PraxistippCallout</Heading>
          </div>
          <PraxistippCallout>
            <p>
              Stellen Sie den Förderantrag immer <strong>vor</strong> der
              Auftragsvergabe: Maßnahmen, die vor der Bewilligung beauftragt
              werden, sind nicht förderfähig. Wir übernehmen die
              Antragstellung für Sie. {/* DEMO copy */}
            </p>
          </PraxistippCallout>
        </Container>
      </Section>

      {/* ---------- CTABand (both variants) ---------- */}
      <CTABand
        title="Jetzt Fördermittel sichern"
        support="Kostenloses Erstgespräch — wir melden uns innerhalb eines Werktags."
        secondary={{ label: 'Kostenloses Erstgespräch', to: '/kontakt' }}
      />
      <CTABand
        variant="dark"
        title="Starten Sie Ihr Projekt mit uns"
        support="Von der Bestandsaufnahme bis zur Baubegleitung — alles aus einer Hand."
      />
    </main>
  );
}
