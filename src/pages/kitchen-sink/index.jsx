import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Gauge,
  Home,
  Leaf,
  Mail,
  Wind,
} from 'lucide-react';
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  Container,
  Heading,
  IconChip,
  Input,
  Link,
  Overline,
  Section,
  Select,
  Textarea,
} from '../../components/primitives/index.js';
import styles from './KitchenSink.module.css';

/**
 * /dev/kitchen-sink — every primitive in every variant/size/state.
 * Dev-only: excluded from prerender, sitemap and robots.
 */

const colorGroups = [
  {
    name: 'Brand',
    tokens: ['--brand-blue', '--brand-green', '--brand-amber'],
  },
  {
    name: 'Blue',
    tokens: ['--blue-950', '--blue-900', '--blue-800', '--blue-700', '--blue-600', '--blue-500', '--blue-200', '--blue-100', '--blue-50'],
  },
  {
    name: 'Green',
    tokens: ['--green-800', '--green-700', '--green-600', '--green-500', '--green-400', '--green-100', '--green-50'],
  },
  {
    name: 'Amber',
    tokens: ['--amber-700', '--amber-500', '--amber-100'],
  },
  {
    name: 'Ink / Neutral',
    tokens: ['--ink-900', '--ink-800', '--ink-700', '--ink-600', '--ink-500', '--ink-300', '--ink-200', '--ink-100', '--ink-50', '--surface-alt', '--white'],
  },
  {
    name: 'Semantic',
    tokens: ['--color-primary', '--color-primary-hover', '--color-accent', '--color-accent-fill', '--color-link', '--color-border', '--color-focus-ring', '--color-success', '--color-warning', '--color-danger'],
  },
];

const gradients = ['--grad-brand', '--grad-eco', '--grad-dark', '--grad-sheen'];

const typeScale = [
  { token: '--fs-display', label: 'Display — Hero H1' },
  { token: '--fs-h1', label: 'H1 — Seitentitel' },
  { token: '--fs-h2', label: 'H2 — Abschnitt' },
  { token: '--fs-h3', label: 'H3 — Unterabschnitt' },
  { token: '--fs-h4', label: 'H4' },
  { token: '--fs-lead', label: 'Lead / Intro' },
  { token: '--fs-body', label: 'Body (17px / 1.65)' },
  { token: '--fs-small', label: 'Small / Meta' },
  { token: '--fs-overline', label: 'Overline / Eyebrow' },
  { token: '--fs-stat', label: 'Stat — 150.000 €' },
];

const buttonVariants = ['primary', 'accent', 'outline', 'ghost', 'onDark'];
const buttonSizes = ['sm', 'md', 'lg'];

function Swatch({ token }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchColor} style={{ background: `var(${token})` }} />
      <code className={styles.swatchName}>{token}</code>
    </div>
  );
}

function DemoBlock({ title, onDark = false, children }) {
  return (
    <div className={[styles.demoBlock, onDark ? styles.demoBlockDark : ''].filter(Boolean).join(' ')}>
      <p className={[styles.demoTitle, onDark ? styles.demoTitleDark : ''].filter(Boolean).join(' ')}>{title}</p>
      {children}
    </div>
  );
}

export default function KitchenSinkPage() {
  const [chipSelected, setChipSelected] = useState(true);
  const [loadingDemo, setLoadingDemo] = useState(true);

  return (
    <main>
      {/* ---------- Intro ---------- */}
      <Section>
        <Container>
          <Overline color="green">Dev — Phase 1</Overline>
          <Heading level={1}>Kitchen Sink — Primitives</Heading>
          <p className={styles.lead}>
            Jede Primitive in jeder Variante, Größe und jedem Zustand. Diese Seite ist die
            visuelle Abnahmefläche für Reviewer und ist vom Prerender/Sitemap/Robots
            ausgeschlossen.
          </p>
        </Container>
      </Section>

      {/* ---------- Color tokens ---------- */}
      <Section background="subtle">
        <Container>
          <Overline>Tokens</Overline>
          <Heading level={2}>Farb-Token</Heading>
          {colorGroups.map((group) => (
            <div key={group.name} className={styles.tokenGroup}>
              <Heading level={3} size="h4">
                {group.name}
              </Heading>
              <div className={styles.swatchGrid}>
                {group.tokens.map((t) => (
                  <Swatch key={t} token={t} />
                ))}
              </div>
            </div>
          ))}
          <div className={styles.tokenGroup}>
            <Heading level={3} size="h4">
              Gradients
            </Heading>
            <div className={styles.swatchGrid}>
              {gradients.map((t) => (
                <div key={t} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{ backgroundImage: `var(${t})` }} />
                  <code className={styles.swatchName}>{t}</code>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Type scale ---------- */}
      <Section>
        <Container>
          <Overline>Typografie</Overline>
          <Heading level={2}>Fluide Typo-Skala</Heading>
          <div className={styles.stack}>
            {typeScale.map(({ token, label }) => (
              <div key={token} className={styles.typeRow}>
                <code className={styles.swatchName}>{token}</code>
                <p className={styles.typeSample} style={{ fontSize: `var(${token})` }}>
                  Energieeffizienz, die überzeugt. {label}
                </p>
              </div>
            ))}
            <div className={styles.typeRow}>
              <code className={styles.swatchName}>Fließtext (de, hyphens)</code>
              <p>
                Als unabhängige Energieberatung begleiten wir Bauträger, Architekten und
                Wohnungswirtschaft von der Grundlagenermittlung über die
                Lebenszyklusanalyse bis zur Förderauszahlung — Donaudampfschifffahrts&shy;gesellschaft
                inklusive korrekt gesetzter Silbentrennung. Dazu ein{' '}
                <Link to="/leistungen">interner Link</Link> und ein{' '}
                <Link href="https://www.example.com">externer Link</Link> sowie{' '}
                <em>kursiver</em> und <strong>fetter</strong> Text.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Heading & Overline ---------- */}
      <Section background="subtle">
        <Container>
          <Overline>Primitives</Overline>
          <Heading level={2}>Heading & Overline</Heading>
          <div className={styles.stack}>
            <DemoBlock title="Heading: level (semantisch) ≠ size (visuell)">
              <Heading level={2} size="display">
                h2 als „display"
              </Heading>
              <Heading level={2} size="h1">
                h2 als „h1"
              </Heading>
              <Heading level={3} size="h2">
                h3 als „h2"
              </Heading>
              <Heading level={4} size="h3">
                h4 als „h3"
              </Heading>
              <Heading level={5} size="h4">
                h5 als „h4"
              </Heading>
            </DemoBlock>
            <DemoBlock title="Overline: blue / green">
              <div className={styles.row}>
                <Overline color="blue">Leistung</Overline>
                <Overline color="green">Nachhaltigkeit</Overline>
              </div>
            </DemoBlock>
          </div>
        </Container>
      </Section>

      {/* ---------- Buttons ---------- */}
      <Section>
        <Container>
          <Overline>Primitives</Overline>
          <Heading level={2}>Button</Heading>
          <div className={styles.stack}>
            {buttonVariants.map((variant) => (
              <DemoBlock key={variant} title={`variant="${variant}"`} onDark={variant === 'onDark'}>
                <div className={styles.row}>
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      Termin vereinbaren
                    </Button>
                  ))}
                  <Button variant={variant} icon={ArrowRight}>
                    Mehr erfahren
                  </Button>
                  <Button variant={variant} icon={Calendar} iconPosition="left">
                    Icon links
                  </Button>
                  <Button variant={variant} disabled>
                    Deaktiviert
                  </Button>
                  <Button variant={variant} loading aria-label="Wird gesendet">
                    Wird gesendet …
                  </Button>
                </div>
              </DemoBlock>
            ))}
            <DemoBlock title="Als Link (to / href) + Loading-Toggle">
              <div className={styles.row}>
                <Button to="/kontakt" icon={ArrowRight}>
                  Router-Link-Button
                </Button>
                <Button href="https://www.example.com" variant="outline">
                  Externer Link-Button
                </Button>
                <Button
                  variant="accent"
                  loading={loadingDemo}
                  onClick={() => setLoadingDemo((v) => !v)}
                >
                  Absenden
                </Button>
                <Button variant="ghost" onClick={() => setLoadingDemo((v) => !v)}>
                  Loading umschalten
                </Button>
              </div>
            </DemoBlock>
          </div>
        </Container>
      </Section>

      {/* ---------- Badge / Chip / IconChip ---------- */}
      <Section background="blue-tint">
        <Container>
          <Overline>Primitives</Overline>
          <Heading level={2}>Badge, Chip & IconChip</Heading>
          <div className={styles.stack}>
            <DemoBlock title="Badge: blue / green / amber / neutral">
              <div className={styles.row}>
                <Badge tone="blue">KfW 40</Badge>
                <Badge tone="green">QNG Plus</Badge>
                <Badge tone="amber">Praxistipp</Badge>
                <Badge tone="neutral">DIN 4108</Badge>
              </div>
            </DemoBlock>
            <DemoBlock title="Chip: statisch / interaktiv / ausgewählt / deaktiviert">
              <div className={styles.row}>
                <Chip>Neubau</Chip>
                <Chip onClick={() => setChipSelected((v) => !v)} selected={chipSelected}>
                  Bestandsgebäude
                </Chip>
                <Chip onClick={() => {}}>Fördermittel</Chip>
                <Chip onClick={() => {}} disabled>
                  Deaktiviert
                </Chip>
              </div>
            </DemoBlock>
            <DemoBlock title="IconChip: Töne (blue / green / gradient) × Größen (sm / md / lg)">
              <div className={styles.row}>
                <IconChip icon={Home} tone="blue" size="sm" />
                <IconChip icon={Leaf} tone="green" size="sm" />
                <IconChip icon={Wind} tone="gradient" size="sm" />
                <IconChip icon={Home} tone="blue" size="md" />
                <IconChip icon={Leaf} tone="green" size="md" />
                <IconChip icon={Wind} tone="gradient" size="md" />
                <IconChip icon={Home} tone="blue" size="lg" />
                <IconChip icon={Leaf} tone="green" size="lg" />
                <IconChip icon={Gauge} tone="gradient" size="lg" label="Blower-Door-Messung" />
              </div>
            </DemoBlock>
          </div>
        </Container>
      </Section>

      {/* ---------- Form controls ---------- */}
      <Section>
        <Container>
          <Overline>Primitives</Overline>
          <Heading level={2}>Formular-Controls</Heading>
          <form className={styles.formGrid} onSubmit={(e) => e.preventDefault()} noValidate>
            <Input label="Name" name="name" autoComplete="name" placeholder="Max Mustermann" required />
            <Input
              label="E-Mail"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="max@beispiel.de"
              hint="Wir antworten in der Regel innerhalb eines Werktags."
              required
            />
            <Input
              label="Telefon"
              name="phone"
              type="tel"
              defaultValue="0049"
              error="Bitte geben Sie eine gültige Telefonnummer ein."
            />
            <Input label="Firma (deaktiviert)" name="company" disabled defaultValue="EnergieAudit Plus" />
            <Select
              label="Leistung"
              name="service"
              required
              options={[
                { value: '', label: 'Bitte wählen …', disabled: true },
                { value: 'neubau', label: 'Neubau & Energieberatung' },
                { value: 'bestand', label: 'Bestandsgebäude' },
                { value: 'qng', label: 'Nachhaltigkeitsaudit QNG-flow' },
              ]}
              defaultValue=""
            />
            <Select
              label="Projektphase (Fehler)"
              name="phase"
              error="Bitte wählen Sie eine Projektphase."
              options={[
                { value: '', label: 'Bitte wählen …' },
                { value: 'planung', label: 'Planung' },
                { value: 'bau', label: 'In der Umsetzung' },
              ]}
              defaultValue=""
            />
            <div className={styles.formFull}>
              <Textarea
                label="Ihre Nachricht"
                name="message"
                placeholder="Beschreiben Sie kurz Ihr Projekt …"
                hint="Maximal 5.000 Zeichen."
              />
            </div>
            <div className={styles.formFull}>
              <Textarea
                label="Nachricht (Fehler)"
                name="message2"
                defaultValue="Zu kurz"
                error="Bitte beschreiben Sie Ihr Anliegen etwas ausführlicher."
              />
            </div>
            <div className={styles.formFull}>
              <div className={styles.stackSm}>
                <Checkbox
                  name="consent"
                  required
                  label={
                    <>
                      Ich habe die <Link to="/datenschutzerklaerung">Datenschutzerklärung</Link>{' '}
                      gelesen und stimme der Verarbeitung meiner Daten zu.
                    </>
                  }
                />
                <Checkbox name="copy" defaultChecked label="Kopie der Anfrage an mich senden" />
                <Checkbox
                  name="consentError"
                  label="Zustimmung (Fehlerzustand)"
                  error="Ohne Ihre Zustimmung können wir die Anfrage nicht verarbeiten."
                />
                <Checkbox name="disabledBox" disabled label="Deaktivierte Option" />
                <Checkbox name="disabledChecked" disabled defaultChecked label="Deaktiviert & ausgewählt" />
              </div>
            </div>
            <div className={styles.formFull}>
              <div className={styles.row}>
                <Button type="submit" icon={ArrowRight}>
                  Anfrage senden
                </Button>
                <Button type="reset" variant="ghost">
                  Zurücksetzen
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </Section>

      {/* ---------- Section backgrounds ---------- */}
      {['white', 'subtle', 'blue-tint', 'eco-tint'].map((bg) => (
        <Section key={bg} background={bg} className={styles.sectionDemo}>
          <Container>
            <Overline>Section</Overline>
            <Heading level={2} size="h3">
              background="{bg}"
            </Heading>
            <p>Vertikaler Rhythmus: 64px mobil / 128px ab 1024px.</p>
          </Container>
        </Section>
      ))}
      <Section background="dark" className={styles.sectionDemo}>
        <Container>
          <Overline color="green">Section</Overline>
          <Heading level={2} size="h3">
            background="dark"
          </Heading>
          <p>
            Premium-Dark-Section auf <code className={styles.codeOnDark}>--blue-900</code> mit
            invertiertem Text, <Link variant="onDark" to="/">onDark-Link</Link> und Buttons:
          </p>
          <div className={styles.row}>
            <Button variant="onDark" icon={ArrowRight}>
              Termin vereinbaren
            </Button>
            <Button variant="accent" icon={Mail} iconPosition="left">
              Kontakt
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
