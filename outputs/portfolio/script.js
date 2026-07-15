const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  links.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((button) => button.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.dataset.filter;
  projects.forEach((project) => project.classList.toggle('hidden', category !== 'all' && !project.dataset.category.includes(category)));
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const architectureDetails = {
  edge: ['01 / 05', 'Client & edge', 'Fast, secure entry points with responsive clients, authentication, CDN delivery, and thoughtful API boundaries.', ['React, Next.js & React Native', 'CloudFront & Cognito', 'REST, GraphQL & OAuth']],
  api: ['02 / 05', 'API gateway', 'A clear front door for services: authentication, rate limiting, request shaping, and predictable contracts for every client.', ['API design & versioning', 'Authentication & authorization', 'Rate limits & observability']],
  services: ['03 / 05', 'Domain services', 'Business workflows belong in focused services with explicit ownership, robust validation, and boundaries that stay understandable.', ['NestJS & .NET services', 'Domain-driven boundaries', 'Caching & async processing']],
  data: ['04 / 05', 'Data & events', 'Events decouple work that should not block a user request. Data stores are chosen deliberately for the access pattern they serve.', ['Kafka, SQS & webhooks', 'RDS, MongoDB & Redis', 'Analytics with Redshift & Athena']],
  ops: ['05 / 05', 'Cloud operations', 'Production needs feedback loops. I build systems with deployment pipelines, monitoring, tracing, and recovery in mind from the start.', ['AWS Lambda, ECS & EC2', 'CloudWatch & OpenTelemetry', 'CI/CD, Docker & Kubernetes']]
};

document.querySelectorAll('.arch-node').forEach((node) => node.addEventListener('click', () => {
  const detail = architectureDetails[node.dataset.arch];
  document.querySelectorAll('.arch-node').forEach((button) => button.classList.remove('active'));
  node.classList.add('active');
  document.querySelector('.panel-index').textContent = detail[0];
  document.querySelector('[data-panel-title]').textContent = detail[1];
  document.querySelector('[data-panel-copy]').textContent = detail[2];
  document.querySelector('[data-panel-list]').innerHTML = detail[3].map((item) => `<li>${item}</li>`).join('');
}));
