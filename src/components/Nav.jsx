import { useState } from 'react';

export default function Nav({ theme, onTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="nav wrap">
    <a className="brand" href="#/"><span>SA</span> SHOAIB ALI</a>
    <nav className={`nav-links ${open ? 'open' : ''}`}>
      <a href="#/work" onClick={() => setOpen(false)}>Work</a><a href="#/architecture" onClick={() => setOpen(false)}>Architecture</a><a href="#/experience" onClick={() => setOpen(false)}>Experience</a><a href="#/now" onClick={() => setOpen(false)}>Now</a><a href="#/blog" onClick={() => setOpen(false)}>Blog</a><a href="#/contact" onClick={() => setOpen(false)}>Contact</a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><i /><i /></button>
    <button className="theme-button" onClick={onTheme} aria-label="Change colour mode">{theme === 'dark' ? '☼' : '◐'}</button>
  </header>;
}
