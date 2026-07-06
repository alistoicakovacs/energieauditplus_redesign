import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { lebenszyklusanalyseLca } from '../../content/services/lebenszyklusanalyse-lca.js';

/**
 * /leistungen/lebenszyklusanalyse-lca — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function LebenszyklusanalysePage() {
  return <ServiceDetailTemplate content={lebenszyklusanalyseLca} />;
}
