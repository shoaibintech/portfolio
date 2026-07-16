# Shoaib Ali Portfolio

Personal portfolio for Shoaib Ali — a senior full stack engineer focused on backend systems, cloud architecture, AWS, and product delivery.

Live site: [shoaibintech.github.io](https://shoaibintech.github.io/)

## Stack

- React and Vite
- Plain CSS with the existing editorial design system
- GitHub Actions and GitHub Pages
- PostHog for consented, privacy-aware usage analytics
- Formspree for hiring and collaboration inquiries

## Local development

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Content updates

- Project, experience, and architecture content: `src/data/portfolio.js`
- Main page composition: `src/pages/Home.jsx`
- Reusable UI: `src/components/`
- Resume PDF: `public/assets/shoaib-ali-resume.pdf`
- Styles: `src/styles.css`

## Analytics and privacy

PostHog starts only after a visitor opts in. It records non-identifying interaction events such as page views, project clicks, resume downloads, and successful form submission. Form contents stay with Formspree and are never sent to PostHog.

## Deployment

Pushes to `master` trigger the GitHub Actions Pages workflow. The workflow publishes the built `dist` folder.
