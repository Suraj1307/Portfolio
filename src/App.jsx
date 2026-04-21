import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ContactForm from "./components/ContactForm";
import {
  CodeIcon,
  EmailIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  ServerIcon,
  TrophyIcon,
} from "./components/Icons";
import "./styles/app.css";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "ForgeChat",
    subtitle: "AI Powered Chat Application",
    description:
      "ChatGPT-like full-stack web application with secure authentication, AI-powered conversations, and persistent chat history.",
    bullets: [
      "Developed a ChatGPT-like full-stack web application with secure authentication and AI-powered conversations.",
      "Designed REST APIs and MongoDB schemas for users, chat threads, and message history.",
      "Deployed as a single-service monorepo on Render, serving the React production build via Express.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "OpenAI API", "Render"],
    image: "/forgechat-folder.png",
    liveUrl: "https://forgechat.onrender.com",
    githubUrl: "https://github.com/Suraj1307/ForgeChat",
  },
  {
    title: "Talk-Space",
    subtitle: "Real-Time Chat Application",
    description:
      "Production-ready real-time chat platform with secure authentication, instant messaging, and scalable backend APIs.",
    bullets: [
      "Built a production-ready real-time chat platform supporting authentication and instant messaging.",
      "Designed REST APIs and optimized MongoDB schemas for scalable messaging.",
      "Implemented secure authentication, password hashing, session handling, and deployment on Render.",
    ],
    tech: ["MERN Stack", "Socket.io", "MongoDB", "Express.js", "Render"],
    image: "/talk-space-real.png",
    liveUrl: "https://talk-space-z1i1.onrender.com",
    githubUrl: "https://github.com/Suraj1307/talk-space",
  },
];

const skillGroups = [
  {
    title: "Languages",
    icon: <CodeIcon />,
    items: ["C++", "JavaScript", "Python"],
  },
  {
    title: "Backend",
    icon: <ServerIcon />,
    items: ["Node.js", "Express", "REST APIs", "JWT", "WebSockets"],
  },
  {
    title: "Frontend",
    icon: <MenuIcon />,
    items: ["React", "HTML", "CSS"],
  },
  {
    title: "Database",
    icon: <ServerIcon />,
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    icon: <TrophyIcon />,
    items: ["Git", "Postman", "AWS"],
  },
];

const achievements = [
  {
    title: "LeetCode Consistency",
    value: "400+ Problems",
    description: "Solved 400+ DSA problems with strong focus on patterns and speed.",
  },
  {
    title: "Contest Rating",
    value: "1539",
    description: "LeetCode rating reflecting steady problem-solving growth.",
  },
  {
    title: "Academic Record",
    value: "8.93 CGPA",
    description: "B.Tech in Computer Science and Engineering at KIIT.",
  },
];

const heroHighlights = [
  "Backend-first engineering mindset",
  "Real-time applications with WebSockets",
  "Secure APIs, clean architecture, scalable delivery",
];

const updatedHeroStats = [
  { value: "2", label: "Production-ready projects" },
  { value: "400+", label: "DSA problems solved" },
  { value: "8.93", label: "CGPA at KIIT CSE" },
];

const heroRoles = [
  "a Backend Developer",
  "a Full-Stack Developer",
  "a Problem Solver",
];

const contactLinks = [
  {
    label: "Email",
    value: "surajrajnkh1244@gmail.com",
    href: "mailto:surajrajnkh1244@gmail.com",
    icon: <EmailIcon />,
  },
  {
    label: "GitHub",
    value: "github.com/Suraj1307",
    href: "https://github.com/Suraj1307",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/suraj-kumar-a59915285",
    href: "https://www.linkedin.com/in/suraj-kumar-a59915285",
    icon: <LinkedInIcon />,
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;

      let currentSection = sectionIds[0];

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const reveals = document.querySelectorAll("[data-reveal]");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    reveals.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const currentRole = heroRoles[roleIndex];
    const atEnd = typedRole === currentRole;
    const atStart = typedRole === "";

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentRole.slice(0, typedRole.length + 1);
          setTypedRole(next);

          if (next === currentRole) {
            window.setTimeout(() => setIsDeleting(true), 900);
          }
        } else {
          const next = currentRole.slice(0, typedRole.length - 1);
          setTypedRole(next);

          if (next === "") {
            setIsDeleting(false);
            setRoleIndex((value) => (value + 1) % heroRoles.length);
          }
        }
      },
      isDeleting ? 45 : atEnd ? 900 : 85,
    );

    if (isDeleting && atStart) {
      return () => window.clearTimeout(timeout);
    }

    return () => window.clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Navbar
        activeSection={activeSection}
        links={navLinks}
        menuOpen={menuOpen}
        onClose={closeMenu}
        onToggle={() => setMenuOpen((value) => !value)}
        resumeHref="/SurajKumar_Resume.pdf"
      />

      <main>
        <section className="hero section" id="home">
          <div className="container hero-home" data-reveal>
            <div className="hero-copy">
              <p className="eyebrow">Hello, I&apos;m</p>
              <h1>Suraj Kumar</h1>
              <div className="hero-type-line">
                <span className="hero-type-prefix">I&apos;m</span>
                <span className="hero-role typewriter-role">{typedRole}</span>
                <span className="type-cursor">|</span>
              </div>
              <p className="hero-tagline">
                I build scalable web applications and real-time systems
              </p>
              <p className="hero-description">
                Computer Science student focused on backend systems, production-ready
                APIs, and full-stack products that prioritize reliability, speed,
                and clean user experience.
              </p>

              <div className="hero-meta">
                <span>Bhubaneswar, Odisha</span>
                <span>Open to internships and developer roles</span>
              </div>

              <div className="hero-actions">
                <a
                  className="button primary"
                  href="https://github.com/Suraj1307"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  className="button secondary"
                  href="https://www.linkedin.com/in/suraj-kumar-a59915285"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a className="button secondary" href="/SurajKumar_Resume.pdf" download>
                  <ExternalLinkIcon />
                  Download Resume
                </a>
              </div>

              <div className="hero-social-row">
                <a
                  aria-label="GitHub"
                  className="social-pill"
                  href="https://github.com/Suraj1307"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubIcon />
                </a>
                <a
                  aria-label="LinkedIn"
                  className="social-pill"
                  href="https://www.linkedin.com/in/suraj-kumar-a59915285"
                  rel="noreferrer"
                  target="_blank"
                >
                  <LinkedInIcon />
                </a>
                <a
                  aria-label="Email"
                  className="social-pill"
                  href="mailto:surajrajnkh1244@gmail.com"
                >
                  <EmailIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div className="about-visual" data-reveal>
              <div className="about-image-shell">
                <img
                  className="about-image"
                  src="/avatar.svg"
                  alt="Suraj Kumar portrait"
                />
              </div>
            </div>

            <div className="about-copy" data-reveal>
              <div className="section-heading left-aligned">
                <p className="eyebrow">About</p>
                <h2>Backend-focused developer building practical full-stack systems</h2>
              </div>

              <p className="about-text">
                I&apos;m a Computer Science student at KIIT with a strong interest in
                backend engineering, secure authentication flows, and systems that
                handle real-time communication reliably.
              </p>
              <p className="about-text">
                My best work so far has been in full-stack chat platforms where I
                designed APIs, implemented JWT-based auth, connected MongoDB-backed
                services, and delivered responsive interfaces with React.
              </p>
              <p className="about-text">
                I enjoy building practical products, solving DSA problems, and
                improving how real applications perform under everyday usage.
              </p>
              <div className="hero-highlights-list">
                {heroHighlights.map((item) => (
                  <span className="mini-highlight" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="hero-stats about-stats">
                {updatedHeroStats.map((item) => (
                  <div className="stat-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Skills</p>
              <h2>Technologies and tools I use to build production-focused software</h2>
              <p>
                A concise backend-first stack, grouped in the same spirit as the
                referenced portfolio template.
              </p>
            </div>

            <div className="section-frame">
              <div className="skills-grid">
                {skillGroups.map((group) => (
                  <article
                    className="skill-card"
                    key={group.title}
                    data-reveal
                    style={{ transitionDelay: `${skillGroups.indexOf(group) * 70}ms` }}
                  >
                    <div className="skill-card-top">
                      <div className="skill-icon">{group.icon}</div>
                      <h3>{group.title}</h3>
                    </div>
                    <div className="chip-wrap">
                      {group.items.map((item) => (
                        <span className="chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="achievements">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Achievements</p>
              <h2>Education and problem-solving proof points</h2>
              <p>
                The GitHub template uses a structured resume-style flow, so this
                section keeps your academic and coding achievements easy to scan.
              </p>
            </div>

            <div className="section-frame">
              <div className="achievement-grid">
                {achievements.map((item) => (
                  <article
                    className="achievement-card"
                    key={item.title}
                    data-reveal
                    style={{ transitionDelay: `${achievements.indexOf(item) * 80}ms` }}
                  >
                    <div className="achievement-badge">
                      <TrophyIcon />
                    </div>
                    <p className="achievement-title">{item.title}</p>
                    <h3>{item.value}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Projects</p>
              <h2>Selected builds that reflect backend engineering ability</h2>
              <p>
                Two strongest real-world chat applications, displayed in a clean
                project showcase similar to the repo you shared.
              </p>
            </div>

            <div className="section-frame">
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-layout">
            <div className="contact-panel" data-reveal>
              <div className="section-heading left-aligned">
                <p className="eyebrow">Contact</p>
                <h2>Available for backend and full-stack opportunities</h2>
                <p>
                  Reach out for internships, freelance work, or engineering roles
                  where backend quality and real product thinking matter.
                </p>
              </div>

              <div className="contact-links">
                {contactLinks.map((item) => (
                  <a
                    className="contact-link"
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span className="contact-icon">{item.icon}</span>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.value}</small>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="form-panel" data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer links={navLinks} />
      <ScrollToTopButton show={showScrollTop} />
    </div>
  );
}

export default App;
