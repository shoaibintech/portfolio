import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav.jsx';
import LightPrompt from './components/LightPrompt.jsx';
import BackToTop from './components/BackToTop.jsx';
import AnalyticsPreference from './components/AnalyticsPreference.jsx';
import Home from './pages/Home.jsx';
import Notes from './pages/Notes.jsx';
import { capture, initAnalytics } from './lib/analytics.js';

const pageFromHash = () => location.hash.replace('#/', '') || 'home';

export default function App() {
  const [page, setPage] = useState(pageFromHash());
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'light');
  const [showPrompt, setShowPrompt] = useState(false);
  const scrollMilestones = useRef(new Set());
  useEffect(() => { const sync = () => setPage(pageFromHash()); addEventListener('hashchange', sync); return () => removeEventListener('hashchange', sync); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  useEffect(() => { initAnalytics(); }, []);
  useEffect(() => { capture('portfolio_page_view', { page }); }, [page]);
  useEffect(() => {
    scrollMilestones.current = new Set();
    const trackDepth = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const depth = Math.round((window.scrollY / available) * 100);
      [25, 50, 75, 100].forEach((milestone) => {
        if (depth >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          capture('scroll_depth_reached', { page, depth: milestone });
        }
      });
    };
    window.addEventListener('scroll', trackDepth, { passive: true });
    return () => window.removeEventListener('scroll', trackDepth);
  }, [page]);
  useEffect(() => { if (['work', 'architecture', 'experience', 'contact'].includes(page)) requestAnimationFrame(() => document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' })); }, [page]);
  useEffect(() => {
    if (theme === 'light' && window.innerWidth > 760 && !sessionStorage.getItem('light-prompt-seen')) {
      const timer = setTimeout(() => setShowPrompt(true), 3500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [theme]);
  const chooseDark = () => { setTheme('dark'); capture('theme_changed', { theme: 'dark', source: 'prompt' }); setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const dismissPrompt = () => { setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const toggleTheme = () => { const nextTheme = theme === 'dark' ? 'light' : 'dark'; setTheme(nextTheme); capture('theme_changed', { theme: nextTheme, source: 'toggle' }); };
  const nav = <Nav theme={theme} onTheme={toggleTheme} />;
  const content = page === 'now' ? <Notes type="now" /> : page === 'blog' ? <Notes type="blog" /> : <Home nav={nav} />;
  return <>{page === 'now' || page === 'blog' ? nav : null}{content}<Footer /><BackToTop />{showPrompt && <LightPrompt onAccept={chooseDark} onDismiss={dismissPrompt} />}</>;
}

function Footer() { return <footer className="footer wrap"><a className="brand" href="#/"><span>SA</span> SHOAIB ALI</a><p>© {new Date().getFullYear()} Shoaib Ali. Built with intent.</p><div><a href="#/now" onClick={() => capture('footer_link_clicked', { target: 'now' })}>Now</a><a href="#/blog" onClick={() => capture('footer_link_clicked', { target: 'blog' })}>Blog</a><a href="https://www.linkedin.com/in/shoaibintech" target="_blank" rel="noreferrer" onClick={() => capture('outbound_link_clicked', { target: 'linkedin' })}>LinkedIn</a><AnalyticsPreference /></div></footer>; }
