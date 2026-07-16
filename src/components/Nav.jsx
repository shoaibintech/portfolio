import { useState } from 'react';
import { capture } from '../lib/analytics.js';

export default function Nav({ theme, onTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="nav wrap">
    <a className="brand" href="#/" onClick={() => capture('navigation_clicked', { target: 'home' })}><span>SA</span> SHOAIB ALI</a>
    <nav className={`nav-links ${open ? 'open' : ''}`}>
      <a href="#/work" onClick={() => { capture('navigation_clicked', { target: 'work' }); setOpen(false); }}>Work</a><a href="#/architecture" onClick={() => { capture('navigation_clicked', { target: 'architecture' }); setOpen(false); }}>Architecture</a><a href="#/experience" onClick={() => { capture('navigation_clicked', { target: 'experience' }); setOpen(false); }}>Experience</a><a href="#/now" onClick={() => { capture('navigation_clicked', { target: 'now' }); setOpen(false); }}>Now</a><a href="#/blog" onClick={() => { capture('navigation_clicked', { target: 'blog' }); setOpen(false); }}>Blog</a><a href="#/contact" onClick={() => { capture('navigation_clicked', { target: 'contact' }); setOpen(false); }}>Contact</a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><i /><i /></button>
    <button className="theme-button" onClick={onTheme} aria-label="Change colour mode">{theme === 'dark' ? '☼' : '◐'}</button>
  </header>;
}
