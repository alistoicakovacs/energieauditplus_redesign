import { forwardRef } from 'react';
import { relForHref } from '../../lib/linkUtils.js';
import styles from './IconButton.module.css';

/**
 * IconButton — 44×44px circular icon-only control (contract: min touch
 * target, all five interaction states, German label). Renders a real `<a>`
 * when `href` is given (mailto:/tel:/external), otherwise a `<button>`.
 *
 * `label` is mandatory: icon-only controls carry no visible text, so the
 * German `aria-label` is the accessible name.
 *
 * Used by TeamCard (mail/phone) and TestimonialCarousel (prev/next); reuse
 * it for any future circular icon action (WhatsApp, share, close…).
 *
 * @param {object} props
 * @param {import('react').ComponentType} props.icon Lucide icon component.
 * @param {string} props.label German aria-label („Frederik Lippe anrufen").
 * @param {string} [props.href] Renders an anchor instead of a button.
 * @param {boolean} [props.disabled] Button mode only.
 * @param {string} [props.className]
 */
const IconButton = forwardRef(function IconButton(
  { icon: Icon, label, href, disabled = false, className = '', ...rest },
  ref
) {
  const classes = [styles.iconButton, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} aria-label={label} {...relForHref(href)} {...rest}>
        <Icon className={styles.icon} strokeWidth={1.85} aria-hidden="true" />
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={label}
      disabled={disabled}
      {...rest}
    >
      <Icon className={styles.icon} strokeWidth={1.85} aria-hidden="true" />
    </button>
  );
});

export default IconButton;
