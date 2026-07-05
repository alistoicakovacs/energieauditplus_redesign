import { Link as RouterLink } from 'react-router';
import styles from './Link.module.css';

/**
 * Inline text link (style guide §5.2). Router link via `to`, anchor via `href`.
 * @param {object} props
 * @param {string} [props.to]
 * @param {string} [props.href]
 * @param {'default'|'onDark'} [props.variant]
 */
export default function Link({ to, href, variant = 'default', className = '', children, ...rest }) {
  const classes = [styles.link, variant === 'onDark' ? styles.onDark : '', className]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <RouterLink to={to} className={classes} {...rest}>
        {children}
      </RouterLink>
    );
  }

  const isExternal = href && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
