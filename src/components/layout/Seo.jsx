import { getSeoMeta, SITE_NAME } from '../../lib/seo.js';

/**
 * Per-page head metadata via React 19 native metadata hoisting: rendering
 * <title>/<meta>/<link> anywhere in the tree hoists them into <head> on the
 * client. During the static prerender they are emitted as a hoistable prefix
 * of the fragment; scripts/prerender.mjs moves that prefix into the template
 * <head> so crawlers see per-route title/meta without JavaScript.
 *
 * @param {object} props
 * @param {string} props.path   route path from src/routes.jsx
 * @param {string} [props.title]
 */
export default function Seo({ path, title }) {
  const meta = getSeoMeta(path, title);
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
      {meta.noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      {meta.canonical && <meta property="og:url" content={meta.canonical} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="de_DE" />
    </>
  );
}
