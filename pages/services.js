import Page from '../components/Page';
import Row from '../components/Row';
import ContactLinks from '../components/ContactLinks';
import ProjectCard from '../components/ProjectCard';
import { projects, services } from '../data/studio';
export default function Services() {
  return <Page title="Services"><main id="main" className="service"><section className="rows" aria-label="Services"><Row label="Services"><h1>Research, identity and digital experiences, on their own or together as one system.</h1></Row>{services.map((service) => <Row key={service.title} label={<h2>{service.title}</h2>}><p>{service.body}</p></Row>)}<Row label="Work"><div className="service-work">{projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Row><Row><ContactLinks /></Row><Row><p className="muted">An outline of the studio. Services and projects are illustrative.</p></Row></section></main></Page>;
}
