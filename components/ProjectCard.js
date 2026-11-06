import Link from 'next/link';
import { asset } from '../lib/assets';
export default function ProjectCard({ project, priority = false }) {
  return <Link href={`/projects/${project.slug}/`} className="cover"><figure className="media"><img src={asset(project.cover)} width="928" height="1044" alt={`${project.title} — fictional ${project.services.join(' and ').toLowerCase()} concept`} loading={priority ? 'eager' : 'lazy'} decoding="async" /></figure><span>{project.title}</span></Link>;
}
