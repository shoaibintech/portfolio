import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import LightPrompt from './components/LightPrompt.jsx';
import Home from './pages/Home.jsx';
import Notes from './pages/Notes.jsx';

const pageFromHash = () => location.hash.replace('#/', '') || 'home';

export default function App() {
  const [page, setPage] = useState(pageFromHash());
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'dark');
  const [showPrompt, setShowPrompt] = useState(false);
  useEffect(() => { const sync = () => setPage(pageFromHash()); addEventListener('hashchange', sync); return () => removeEventListener('hashchange', sync); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  useEffect(() => { if (['work', 'architecture', 'experience', 'contact'].includes(page)) requestAnimationFrame(() => document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' })); }, [page]);
  useEffect(() => { if (theme === 'dark' && !sessionStorage.getItem('light-prompt-seen')) { const timer = setTimeout(() => setShowPrompt(true), 5000); return () => clearTimeout(timer); } }, [theme]);
  const chooseLight = () => { setTheme('light'); setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const dismissPrompt = () => { setShowPrompt(false); sessionStorage.setItem('light-prompt-seen', 'true'); };
  const content = page === 'architecture' ? <Notes type="architecture" /> : page === 'now' ? <Notes type="now" /> : page === 'blog' ? <Notes type="blog" /> : <Home />;
  return <><Nav theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />{content}<Footer />{showPrompt && <LightPrompt onAccept={chooseLight} onDismiss={dismissPrompt} />}</>;
}

function Footer() { return <footer className="footer shell"><a className="brand" href="#/">SA <span>SHOAIB ALI</span></a><p>© {new Date().getFullYear()} Shoaib Ali</p><nav><a href="#/now">Now</a><a href="#/blog">Blog</a><a href="https://www.linkedin.com/in/shoaibintech" target="_blank" rel="noreferrer">LinkedIn</a></nav></footer>; }
