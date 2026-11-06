import Link from 'next/link';
import Page from '../components/Page';
import Row from '../components/Row';
import ContactLinks from '../components/ContactLinks';
import ProjectCard from '../components/ProjectCard';
import { projects, studio } from '../data/studio';
export default function Home() {
  return <Page><div className="landing"><main id="main" className="landing-main"><section className="rows" aria-label="About the studio">
    <Row label="Studio"><h1>{studio.description}</h1></Row>
    <Row label="Selected work"><p>{projects.map((project, index) => <span key={project.slug}><Link className="text-link" href={`/projects/${project.slug}/`}>{project.title}</Link>{index < projects.length - 1 ? ', ' : '.'}</span>)}</p></Row>
    <Row label="Also"><p className="muted">{studio.aside}</p></Row>
    <Row><ContactLinks /></Row>
  </section><section className="covers" aria-label="Selected concept projects">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index < 4} />)}</section><p className="draft-note">A studio in progress. All projects shown are placeholders.</p></main></div></Page>;
}
