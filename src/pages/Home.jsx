import ArchitectureSection from '../components/ArchitectureSection.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import WorkSection from '../components/WorkSection.jsx';
import { experience } from '../data/portfolio.js';
import { capture } from '../lib/analytics.js';

const resumeUrl = 'assets/shoaib-ali-resume.pdf';

export default function Home({ nav }) {
  return <main>
    <Hero nav={nav} />
    <AboutSection />
    <WorkSection />
    <ExperienceSection />
    <ArchitectureSection />
    <StackSection />
    <ContactSection />
  </main>;
}

function Hero({ nav }) {
  return <section className="hero" id="home">
    {nav}
    <div className="hero-content wrap">
      <p className="eyebrow rust">Senior full stack engineer · Doha, Qatar</p>
      <h1>Building products<br />that <em>perform.</em></h1>
      <p className="hero-copy">I’m Shoaib Ali, a product focused engineer who takes ambitious web and mobile products from system design to production.</p>
      <div className="hero-actions">
        <a className="button yellow" href="#/work">Explore my work <b>↓</b></a>
        <a className="button dark" href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => capture('resume_viewed', { source: 'hero' })}>View resume <b>↗</b></a>
      </div>
    </div>
    <div className="code-card image-left">const product = {'{'}<br />&nbsp;reliable: <b>true</b>,<br />&nbsp;scalable: <b>true</b>,<br />&nbsp;human: <b>true</b><br />{'}'}</div>
    <div className="hero-image portrait image-right"><img src="assets/shoaib-ali-portrait.png" alt="Portrait of Shoaib Ali" /></div>
    <div className="stats wrap"><div><strong>5+</strong><span>Years shipping<br />production systems</span></div><div><strong>30+</strong><span>Client projects<br />delivered end to end</span></div><div><strong>10×</strong><span>Scale enabled<br />for a core platform</span></div></div>
  </section>;
}

function AboutSection() {
  return <section className="intro wrap" id="about"><p className="eyebrow">About me</p><div className="intro-grid"><h2>From the first sketch<br />to the <span>production release.</span></h2><div><p>My work sits where product thinking and practical engineering meet. I build resilient systems across frontend, backend, cloud infrastructure, and mobile.</p><a className="text-link" href="#/experience">See my experience <b>↓</b></a></div></div></section>;
}

function ExperienceSection() {
  return <section className="experience wrap" id="experience"><div><p className="eyebrow">Career path</p><h2>Building with ownership<br />at every stage.</h2></div><div className="timeline">{experience.map(([period, company, role, detail]) => <article key={company}><span>{period}</span><div><h3>{company}</h3><p className="role">{role}</p><p>{detail}</p></div></article>)}</div></section>;
}

function StackSection() {
  return <section className="stack" id="stack"><div className="wrap"><div className="stack-heading"><p className="eyebrow">Technical toolkit</p><h2>Architecture led,<br />product minded.</h2></div><div className="skills-grid"><article><span>01</span><h3>Backend & APIs</h3><p>Node.js · NestJS · .NET · REST · GraphQL · Redis · SQS</p></article><article><span>02</span><h3>AWS & cloud</h3><p>Lambda · ECS · EC2 · S3 · RDS · CloudWatch · Cognito · Azure</p></article><article><span>03</span><h3>Data & events</h3><p>Kafka · OpenTelemetry · Grafana · Redshift · Athena · RAG</p></article><article><span>04</span><h3>Frontend & mobile</h3><p>React · Next.js · TypeScript · React Native · Redux · Tailwind</p></article></div></div></section>;
}

function ContactSection() {
  return <section className="contact" id="contact"><div className="wrap contact-inner"><p className="eyebrow">Open to the right opportunity</p><h2>Let’s build something<br /><span>that lasts.</span></h2><div className="contact-actions"><a className="button yellow" href={resumeUrl} download onClick={() => capture('resume_downloaded', { source: 'contact' })}>Download resume <b>↓</b></a><a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => capture('resume_viewed', { source: 'contact' })}>View in browser <b>↗</b></a></div><InquiryForm /></div></section>;
}
