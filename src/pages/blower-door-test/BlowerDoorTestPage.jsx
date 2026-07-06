import ServiceDetailTemplate from '../../components/templates/ServiceDetailTemplate.jsx';
import { blowerDoorTest } from '../../content/services/blower-door-test.js';

/**
 * /leistungen/blower-door-test — standard service detail page
 * (plan §6.3): pure ServiceDetailTemplate instantiation, content module only.
 */
export default function BlowerDoorTestPage() {
  return <ServiceDetailTemplate content={blowerDoorTest} />;
}
