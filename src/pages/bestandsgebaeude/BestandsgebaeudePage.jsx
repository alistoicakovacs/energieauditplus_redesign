import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { bestandsgebaeude } from '../../content/services/bestandsgebaeude.js';

/**
 * /leistungen/bestandsgebaeude — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function BestandsgebaeudePage() {
  return <ServiceDetailTemplate content={bestandsgebaeude} />;
}
