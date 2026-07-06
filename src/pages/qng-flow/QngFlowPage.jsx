import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { qngFlow } from '../../content/services/qng-flow.js';

/**
 * /leistungen/qng-flow — the flagship service page (plan §6.3): pure
 * ServiceDetailTemplate instantiation. The flagship extras (platform
 * feature grid, hero stat, screenshot placeholder, KineticStatement) are
 * optional fields of the content module, not page-level code.
 */
export default function QngFlowPage() {
  return <ServiceDetailTemplate content={qngFlow} />;
}
