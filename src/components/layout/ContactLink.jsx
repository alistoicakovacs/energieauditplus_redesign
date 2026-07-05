import { relForHref } from '../../lib/linkUtils.js';

/**
 * Icon + label contact anchor (tel:/mailto:) — shared by the header utility
 * strip, the mobile menu and the footer. Deliberately a raw <a>: the Link
 * primitive is the underlined inline *text* link (style guide §5.2), while
 * contact shortcuts are an icon-led pattern whose look each consumer owns
 * via className/iconClassName.
 *
 * @param {object} props
 * @param {string} props.href                 tel:/mailto:/http(s) target
 * @param {import('react').ComponentType} [props.icon]  Lucide icon component
 * @param {string} [props.className]          anchor styling (consumer module)
 * @param {string} [props.iconClassName]      icon styling (consumer module)
 */
export default function ContactLink({
  href,
  icon: Icon,
  className = '',
  iconClassName = '',
  children,
  ...rest
}) {
  return (
    <a className={className} href={href} {...relForHref(href)} {...rest}>
      {Icon && <Icon className={iconClassName} aria-hidden="true" />}
      {children}
    </a>
  );
}
