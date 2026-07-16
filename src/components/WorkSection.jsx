import { useState } from 'react';
import { filters, projects } from '../data/portfolio.js';
import { capture } from '../lib/analytics.js';
import ProjectVisual from './ProjectVisual.jsx';

export default function WorkSection() {
  const [filter, setFilter] = useState('all');
  const visibleProjects = projects.filter((project) => filter === 'all' || project.category.includes(filter));
  return <section className="work-section" id="work"><div className="wrap section-heading"><div><p className="eyebrow">Selected work</p><h2>Products built to<br />solve real problems.</h2></div><div className="filters">{filters.map(([key, label]) => <button key={key} className={`filter ${filter === key ? 'active' : ''}`} onClick={() => { setFilter(key); capture('work_filter_changed', { filter: key }); }}>{label}</button>)}</div></div><div className="project-grid wrap">{visibleProjects.map((project) => { const index = projects.indexOf(project); return <article className={`project ${index === 0 ? 'project-large' : ''}`} key={project.title}><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} className={`project-art ${project.color}`} onClick={() => capture('project_link_clicked', { project: project.title })}><ProjectVisual type={project.visual} /></a><div className="project-meta"><div><p>{project.meta}</p><h3>{project.title}</h3></div><span>0{index + 1}</span></div><p className="project-detail">{project.detail}</p></article>; })}</div></section>;
}
