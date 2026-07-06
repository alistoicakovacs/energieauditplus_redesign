import { buildOrganizationJsonLd } from '../../lib/seo.js';

// Serialize with `<` escaped so a stray "</script>" in data can never break
// out of the JSON-LD block (mirrors the helper in ServiceDetailTemplate.jsx).
// The data here is a fixed company-identity graph with no user input, but the
// escape is kept for defence-in-depth and CSP-clean output.
const jsonLdString = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * Site-wide `Organization` + multi-location `LocalBusiness` structured data
 * (dev brief §9). Emitted EXACTLY ONCE — mounted only by the homepage
 * (src/pages/home/HomePage.jsx) so the large company-identity graph is not
 * duplicated on every route. `<script type="application/ld+json">` is a data
 * block, not executable script, so it is not subject to CSP `script-src` — it
 * needs no hash and was never the CSP concern (the executable reveal scripts
 * were; those are hash-allowlisted — see docs/security-and-redirects.md).
 */
export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonLdString(buildOrganizationJsonLd()) }}
    />
  );
}
