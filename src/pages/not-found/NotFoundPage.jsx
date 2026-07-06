import { Button, Container, Heading, Overline, Section } from '../../components/primitives/index.js';
import { ArrowRight } from 'lucide-react';
import styles from './NotFound.module.css';

/** Branded 404 — links back to Leistungen + Kontakt per build plan §1. */
export default function NotFoundPage() {
  return (
    <Section as="section">
      <Container>
        <div className={styles.inner}>
          <Overline color="blue">Fehler 404</Overline>
          <Heading level={1}>Diese Seite wurde nicht gefunden.</Heading>
          <p className={styles.lead}>
            Die angeforderte Seite existiert nicht oder wurde verschoben. Unsere Leistungen und
            unser Team erreichen Sie weiterhin direkt:
          </p>
          <div className={styles.actions}>
            <Button to="/leistungen" icon={ArrowRight} aria-label="Zu unseren Leistungen">
              Zu den Leistungen
            </Button>
            <Button to="/kontakt" variant="outline" aria-label="Zur Kontaktseite">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
