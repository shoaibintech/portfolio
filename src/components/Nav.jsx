export default function Nav({ theme, onTheme }) {
  return <header className="nav wrap">
    <a className="brand" href="#/"><span>SA</span> SHOAIB ALI</a>
    <nav className="nav-links">
      <a href="#/work">Work</a><a href="#/architecture">Architecture</a><a href="#/experience">Experience</a><a href="#/now">Now</a><a href="#/blog">Blog</a><a href="#/contact">Contact</a>
    </nav>
    <button className="theme-button" onClick={onTheme} aria-label="Change colour mode">{theme === 'dark' ? '☼' : '◐'}</button>
  </header>;
}
