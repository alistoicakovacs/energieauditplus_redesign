import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { raumluftmessungBaubiologie } from '../../content/services/raumluftmessung-baubiologie.js';

/**
 * /leistungen/raumluftmessung-baubiologie — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function RaumluftmessungPage() {
  return <ServiceDetailTemplate content={raumluftmessungBaubiologie} />;
}
