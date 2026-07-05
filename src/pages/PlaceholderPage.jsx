import { Container, Heading, Section } from '../components/primitives/index.js';

/**
 * Phase-1 placeholder page: H1 only, so all 14 routes prerender and can be
 * verified now. Real page compositions arrive in Phases 3–6.
 */
export default function PlaceholderPage({ title, children }) {
  // <main> now lives in the global PageShell — plain <section> here.
  return (
    <Section>
      <Container>
        <Heading level={1}>{title}</Heading>
        {children}
      </Container>
    </Section>
  );
}
