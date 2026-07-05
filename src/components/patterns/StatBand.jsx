import { Container, Heading, Overline, Section } from '../primitives/index.js';
import Reveal from '../motion/Reveal.jsx';
import StaggerGroup from '../motion/StaggerGroup.jsx';
import StatCard from './StatCard.jsx';
import styles from './StatBand.module.css';

/**
 * StatBand — dark proof section (plan §5 Tier 2 item 10): `Section`
 * `background="dark"` with 3–4 dark-tone StatCards entering via
 * StaggerGroup (60–80ms). CountUp/entrance behavior (below-fold arming,
 * reduced motion → final state) is inherited from the motion wrappers.
 *
 * @param {object} props
 * @param {string} [props.overline] Green eyebrow above the title.
 * @param {string} [props.title] Section heading.
 * @param {Array<{value:number, prefix?:string, suffix?:string, decimals?:number,
 *   label:string, icon?:import('react').ComponentType}>} props.stats
 * @param {1|2|3|4|5|6} [props.headingLevel=2]
 * @param {string} [props.className]
 */
export default function StatBand({
  overline,
  title,
  stats,
  headingLevel = 2,
  className = '',
  ...rest
}) {
  return (
    <Section background="dark" className={className} {...rest}>
      <Container>
        {(overline || title) && (
          <div className={styles.head}>
            {overline && <Overline color="green">{overline}</Overline>}
            {title && (
              <Heading level={headingLevel} size="h2" className={styles.title}>
                {title}
              </Heading>
            )}
          </div>
        )}
        <StaggerGroup className={styles.grid}>
          {stats.map((stat) => (
            <Reveal key={stat.label} className={styles.cell}>
              <StatCard tone="dark" {...stat} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
