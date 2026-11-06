import Link from 'next/link';
import Page from '../../components/Page';
import Row from '../../components/Row';
import { projects } from '../../data/studio';
import { asset } from '../../lib/assets';
export default function Project({ project, next }) {
  const image = (src, alt, className) => <figure className={`media ${className || ''}`}><img src={asset(src)} alt={alt} width="960" height="600" loading="lazy" /></figure>;
  return <Page title={project.title} description={project.intro}><main id="main" className="case">
    <div className="case-cover"><img src={asset(`/images/${project.slug}-hero.svg`)} alt={`${project.title} concept identity`} width="1920" height="1080" fetchPriority="high" /></div>
    <section className="rows case-words" aria-label="Project overview"><Row><h1>{project.headline}</h1></Row><Row><p className="muted">{project.intro}</p></Row><div className="rows case-facts"><Row label="Client"><p>{project.client}</p></Row><Row label="What it is"><p>{project.kind}</p></Row><Row label="Year"><p>{project.year}</p></Row><Row label="Services"><p>{project.services.join(', ')}</p></Row></div><Row label="The question"><p>{project.question}</p></Row><Row label="The idea"><p>{project.idea}</p></Row><Row label="The system"><p>{project.detail}</p></Row><Row><Link className="pill pill-secondary" href="/contact/">Start a similar project</Link></Row></section>
    <section className="case-media" aria-label={`${project.title} concept gallery`}>
      <div className="media-line">{image(`/images/${project.slug}-mark.svg`, `${project.title} wordmark study`)}{image(project.cover, `${project.title} cover composition`)}</div>
      {image(`/images/${project.slug}-hero.svg`, `${project.title} identity in context`)}
      <div className="media-line">{image(`/images/${project.slug}-detail.svg`, `${project.title} typography and colour study`)}{image(`/images/${project.slug}-mark.svg`, `${project.title} identity detail`)}</div>
      {image(`/images/${project.slug}-web.svg`, `${project.title} website concept`)}
      <div className="media-line">{image(project.cover, `${project.title} art direction study`)}{image(`/images/${project.slug}-detail.svg`, `${project.title} application study`)}</div>
      {image(`/images/${project.slug}-mark.svg`, `${project.title} final wordmark`)}
    </section>
    <section className="rows case-credits" aria-label="Credits"><Row label="Credits"><div className="credits"><div><p className="muted">Concept &amp; design</p><p>{project.credit}</p></div><div><p className="muted">About this project</p><p>Fictional work for layout preview.</p></div></div></Row></section>
    <section className="case-next"><Row label="Next"><Link className="text-link" href={`/projects/${next.slug}/`}>{next.title} · {next.kind}</Link></Row></section>
  </main></Page>;
}
export function getStaticPaths() { return { paths: projects.map(({ slug }) => ({ params: { slug } })), fallback: false }; }
export function getStaticProps({ params }) { const index = projects.findIndex(({ slug }) => slug === params.slug); return { props: { project: projects[index], next: projects[(index + 1) % projects.length] } }; }
