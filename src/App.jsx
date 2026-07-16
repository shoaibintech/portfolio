import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav.jsx';
import LightPrompt from './components/LightPrompt.jsx';
import BackToTop from './components/BackToTop.jsx';
import AnalyticsConsent from './components/AnalyticsConsent.jsx';
import Home from './pages/Home.jsx';
import Notes from './pages/Notes.jsx';
import { capture, hasAnalyticsConsent, initAnalytics } from './lib/analytics.js';

const pageFromHash = () => location.hash.replace('#/', '') || 'home';

export default function App() {
  const [page, setPage] = useState(pageFromHash());
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'dark');
  const [showPrompt, setShowPrompt] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(hasAnalyticsConsent());
  const scrollMilestones = useRef(new Set());
  useEffect(() => { const sync = () => setPage(pageFromHash()); addEventListener('hashchange', sync); return () => removeEventListener('hashchange', sync); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  useEffect(() => { if (analyticsEnabled) initAnalytics(); }, [analyticsEnabled]);
  useEffect(() => { if (analyticsEnabled) capture('portfolio_page_view', { page }); }, [page, analyticsEnabled]);
  useEffect(() => { if (!analyticsEnabled) return; scrollMilestones.current = new Set(); const trackDepth = () => { const available = document.documentElement.scrollHeight - window.innerHeight; if (available <= 0) return; const depth = Math.round((window.scrollY / available) * 100); [25, 50, 75, 100].forEach((milestone) => { if (depth >= milestone && !scrollMilestones.current.has(milestone)) { scrollMilestones.current.add(milestone); capture('scroll_depth_reached', { page, depth: milestone }); } }); }; window.addEventListener('scroll', trackDepth, { passive: true }); return () => window.removeEventListener('scroll', trackDepth); }, [page, analyticsEnabled]);
  useEffect(() => { if (['work', 'architecture', 'experience', 'contact'].includes(page)) requestAnimationFrame(() => document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' })); }, [page]);
  useEffect(() => { if (theme === 'dark' && window.innerWidth > 760 && !sessionStorage.getItem('light-prompt-seen')) { const timer = setTimeout(() => setShowPrompt(true), 5000); return () => clearTimeout(timer); } }, [theme]);
  const chooseLight = () => { setTheme('light'); capture('theme_changed', { theme: 'light', source: 'prompt' }); setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const dismissPrompt = () => { setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const toggleTheme = () => { const nextTheme = theme === 'dark' ? 'light' : 'dark'; setTheme(nextTheme); capture('theme_changed', { theme: nextTheme, source: 'toggle' }); };
  const nav = <Nav theme={theme} onTheme={toggleTheme} />;
  const content = page === 'now' ? <Notes type="now" /> : page === 'blog' ? <Notes type="blog" /> : <Home nav={nav} />;
  return <>{page === 'now' || page === 'blog' ? nav : null}{content}<Footer /><BackToTop /><AnalyticsConsent onChange={setAnalyticsEnabled} />{showPrompt && <LightPrompt onAccept={chooseLight} onDismiss={dismissPrompt} />}</>;
}

function Footer() { return <footer className="footer wrap"><a className="brand" href="#/"><span>SA</span> SHOAIB ALI</a><p>© {new Date().getFullYear()} Shoaib Ali. Built with intent.</p><div><a href="#/now">Now</a><a href="#/blog">Blog</a><a href="https://www.linkedin.com/in/shoaibintech" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>; }
