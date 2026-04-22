function Navbar({ activeSection, links, menuOpen, onClose, onToggle, resumeHref, scrolled }) {
  return (
    <header className={`navbar-shell ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar">
        <a className="brand" href="#home" onClick={onClose}>
          <span className="brand-mark">SK</span>
          <span className="brand-copy">
            <strong>Suraj Kumar</strong>
            <small>Backend & Full-Stack Developer</small>
          </span>
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="menu-toggle"
          onClick={onToggle}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a
              className={activeSection === link.id ? "active" : ""}
              href={`#${link.id}`}
              key={link.id}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
          <a className="resume-link" href={resumeHref} onClick={onClose}>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
