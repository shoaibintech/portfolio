export const projects = [
  { title: 'AIO Restaurant Platform', url: 'https://www.aioapp.com/', meta: 'Platform architecture · Mobile · Integrations', detail: 'All in one AI restaurant management ecosystem serving 30 plus live restaurant locations across operations, inventory, accounting, analytics, and integrations.', category: 'platform mobile', visual: 'aio', color: 'lavender' },
  { title: 'Ultrasound.ai', url: 'https://ultrasound.ai/', meta: 'AI · Machine learning · Healthcare', detail: 'AI powered ultrasound platform for early stage pregnancy prediction using machine learning.', category: 'ai platform', visual: 'ultrasound', color: 'coral' },
  { title: 'LetsData.io', url: 'https://letsdata.io/', meta: 'Next.js · Performance · UX', detail: 'Public facing product site rebuilt end to end in Next.js for improved performance, UX, and maintainability.', category: 'ai platform', visual: 'letsdata', color: 'blue' },
  { title: 'Imateam', url: 'https://imateam.us/', meta: 'React Native · Social', detail: 'Social platform enabling players to connect, collaborate, manage profiles, and build community.', category: 'mobile', visual: 'imateam', color: 'pink' },
  { title: 'Healing Trauma', url: 'https://healingtrauma.co.kr/', meta: 'Research platform · Healthcare', detail: 'Research platform supporting licensed clinicians and researchers studying trauma.', category: 'ai platform', visual: 'healing', color: 'mint' },
];

export const architecture = {
  edge: ['01 / 05', 'Client & edge', 'Fast, secure entry points with responsive clients, authentication, CDN delivery, and thoughtful API boundaries.', ['React, Next.js & React Native', 'CloudFront & Cognito', 'REST, GraphQL & OAuth']],
  api: ['02 / 05', 'API gateway', 'A clear front door for services: authentication, rate limiting, request shaping, and predictable contracts for every client.', ['API design & versioning', 'Authentication & authorization', 'Rate limits & observability']],
  services: ['03 / 05', 'Domain services', 'Business workflows belong in focused services with explicit ownership, robust validation, and boundaries that stay understandable.', ['NestJS & .NET services', 'Domain driven boundaries', 'Caching & async processing']],
  data: ['04 / 05', 'Data & events', 'Events decouple work that should not block a user request. Data stores are chosen deliberately for the access pattern they serve.', ['Kafka, SQS & webhooks', 'RDS, MongoDB & Redis', 'Analytics with Redshift & Athena']],
  ops: ['05 / 05', 'Cloud operations', 'Production needs feedback loops. I build systems with deployment pipelines, monitoring, tracing, and recovery in mind from the start.', ['AWS Lambda, ECS & EC2', 'CloudWatch & OpenTelemetry', 'CI/CD, Docker & Kubernetes']],
};

export const experience = [
  ['2024 to 2026', 'AIO Restaurant Platform', 'Senior Full Stack Engineer · Islamabad, Pakistan', 'Led architecture across a multi tenant restaurant platform, building core inventory, accounting, analytics, and operations modules. Cut average API response time by 80% through database optimization, caching, indexing, and asynchronous processing.'],
  ['2023', 'LetsData.io', 'Frontend Engineer · Remote', 'Led an end to end rebuild of the public site in Next.js with a focus on performance, SEO, responsive UI, and maintainability.'],
  ['2022 to 2023', 'Esquall Technologies', 'Full Stack Developer · Rawalpindi, Pakistan', 'Delivered fintech, music commerce, and social products while mentoring junior engineers and establishing reusable frontend architecture practices.'],
  ['2021 to 2022', 'Creadios', 'Junior React & React Native Developer · Rawalpindi, Pakistan', 'Owned and shipped the Imateam mobile application, helping players connect, socialize, manage profiles, and coordinate activities through a social platform.'],
];

export const filters = [['all', 'All work'], ['platform', 'Platforms'], ['ai', 'AI & data'], ['mobile', 'Mobile']];
