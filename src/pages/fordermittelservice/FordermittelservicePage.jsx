import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { fordermittelservice } from '../../content/services/fordermittelservice.js';

/**
 * /leistungen/fordermittelservice — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function FordermittelservicePage() {
  return <ServiceDetailTemplate content={fordermittelservice} />;
}
