import { Link as RouterLink } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { SITE_URL } from '../../lib/seo.js';
import { normalizePathname } from '../../lib/linkUtils.js';
import styles from './Breadcrumbs.module.css';

/**
 * Build a schema.org `BreadcrumbList` object from breadcrumb items.
 *
 * Kept LOCAL to this component (not in lib/seo.js): seo.js is a per-route
 * meta-description map consumed by <Seo>, and wiring structured data into it
 * would change its contract — no clean seam without touching a file outside
 * this package's ownership. Revisit when a second JSON-LD emitter appears.
 *
 * @param {{label: string, to?: string}[]} items In display order; the last
 *   item (current page) may omit `to` — per Google guidance its `item` URL
 *   is optional and left out.
 */
export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${normalizePathname(item.to)}` } : {}),
    })),
  };
}

/**
 * Breadcrumbs — sub-page trail (style guide §5.7) with `BreadcrumbList`
 * JSON-LD. Chevron separators are decorative (`aria-hidden`); the last item
 * is the current page (`aria-current="page"`, not a link). Links keep a
 * 44px touch-target height.
 *
 * @param {object} props
 * @param {{label: string, to?: string}[]} props.items In order, root first;
 *   the last entry is the current page.
 * @param {boolean} [props.jsonLd=true] Emit the JSON-LD `<script>`.
 * @param {string} [props.label='Seitenpfad'] German nav label.
 * @param {string} [props.className]
 */
export default function Breadcrumbs({
  items,
  jsonLd = true,
  label = 'Seitenpfad',
  className = '',
  ...rest
}) {
  const classes = [styles.breadcrumbs, className].filter(Boolean).join(' ');
  const lastIndex = items.length - 1;

  return (
    <nav aria-label={label} className={classes} {...rest}>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(items)) }}
        />
      )}
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.label} className={styles.item}>
            {i > 0 && (
              <ChevronRight className={styles.separator} strokeWidth={2} aria-hidden="true" />
            )}
            {i === lastIndex ? (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              <RouterLink to={item.to} className={styles.link}>
                {item.label}
              </RouterLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
