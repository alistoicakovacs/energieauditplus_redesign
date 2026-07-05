import { useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { DUR_BASE, EASE_IN_OUT } from '../motion/motionTokens.js';
import styles from './Accordion.module.css';

/**
 * Panel variants: Motion applies `visibility: hidden` at the END of the
 * collapse and `visible` at the START of the expand, so closed content
 * leaves the a11y tree / tab order without a separate state machine.
 */
const panelVariants = {
  open: { height: 'auto', visibility: 'visible' },
  closed: { height: 0, visibility: 'hidden' },
};

/**
 * Accordion — FAQ pattern (plan §5 Tier 2 item 10). The ONE permitted
 * height animation (plan §7.6: Motion, contained — the animated element
 * clips its own overflow, so no layout thrash outside the panel). Chevron
 * rotates on open. Under reduced motion the toggle is instant.
 *
 * A11y (WAI-ARIA accordion): trigger `<button>` inside a heading,
 * `aria-expanded`/`aria-controls`, panel `role="region"` +
 * `aria-labelledby`; keyboard: Enter/Space toggle (native button),
 * ArrowUp/ArrowDown/Home/End move focus between triggers.
 *
 * @param {object} props
 * @param {{id?: string, title: string, content: import('react').ReactNode}[]} props.items
 * @param {boolean} [props.multiple=false] Allow several panels open at once.
 * @param {Array<string|number>} [props.defaultOpen=[]] Initially open items
 *   (item `id`s, or indices for items without one).
 * @param {1|2|3|4|5|6} [props.headingLevel=3] Heading level of the triggers.
 * @param {string} [props.className]
 */
export default function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  headingLevel = 3,
  className = '',
  ...rest
}) {
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  const triggerRefs = useRef([]);
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  const toggle = (key) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const onTriggerKeyDown = (event, index) => {
    const triggers = triggerRefs.current.filter(Boolean);
    let target = -1;
    if (event.key === 'ArrowDown') target = (index + 1) % triggers.length;
    else if (event.key === 'ArrowUp') target = (index - 1 + triggers.length) % triggers.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = triggers.length - 1;
    if (target >= 0) {
      event.preventDefault();
      triggers[target]?.focus();
    }
  };

  const HeadingTag = `h${headingLevel}`;
  const transition = reduced ? { duration: 0 } : { duration: DUR_BASE, ease: EASE_IN_OUT };
  const classes = [styles.accordion, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {items.map((item, i) => {
        const key = item.id ?? i;
        const isOpen = open.has(key);
        const buttonId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={key} className={styles.item}>
            <HeadingTag className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(key)}
                onKeyDown={(event) => onTriggerKeyDown(event, i)}
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
              >
                <span className={styles.triggerLabel}>{item.title}</span>
                <motion.span
                  className={styles.chevron}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={transition}
                  aria-hidden="true"
                >
                  <ChevronDown className={styles.chevronIcon} strokeWidth={2} />
                </motion.span>
              </button>
            </HeadingTag>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              variants={panelVariants}
              transition={transition}
            >
              <div className={styles.panelInner}>{item.content}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
