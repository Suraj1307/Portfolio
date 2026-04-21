import { EmailIcon, GitHubIcon, LinkedInIcon } from "./Icons";

function Footer({ links }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">Suraj Kumar</p>
          <p className="footer-copy">
            Backend & Full-Stack Developer focused on scalable applications and
            real-time systems.
          </p>
        </div>

        <div>
          <p className="footer-title">Quick Links</p>
          <div className="footer-links">
            {links.map((link) => (
              <a href={`#${link.id}`} key={link.id}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-title">Connect</p>
          <div className="footer-socials">
            <a
              aria-label="GitHub"
              href="https://github.com/Suraj1307"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/suraj-kumar-a59915285"
              rel="noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a aria-label="Email" href="mailto:surajrajnkh1244@gmail.com">
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Copyright 2026 Suraj Kumar</p>
      </div>
    </footer>
  );
}

export default Footer;
