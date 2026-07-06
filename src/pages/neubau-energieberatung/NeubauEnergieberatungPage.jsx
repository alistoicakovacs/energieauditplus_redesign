import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { neubauEnergieberatung } from '../../content/services/neubau-energieberatung.js';

/**
 * /leistungen/neubau-energieberatung — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function NeubauEnergieberatungPage() {
  return <ServiceDetailTemplate content={neubauEnergieberatung} />;
}
