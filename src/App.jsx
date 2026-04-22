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
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "ForgeChat",
    subtitle: "AI Powered Chat Application",
    description:
      "ChatGPT-like full-stack web application with secure authentication, AI-powered conversations, and persistent chat history.",
    bullets: [
      "Built a ChatGPT-like web app with user auth, persistent chat history, and AI-powered responses via OpenAI API.",
      "Designed REST APIs with MongoDB schemas for users, threads, and messages, optimized for fast query performance.",
      "Deployed as a monorepo on Render with Express serving the React production build and environment-based config.",
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
      "Built a real-time chat platform with instant messaging, user authentication, and secure session management.",
      "Implemented WebSocket-based messaging with Socket.io for low-latency communication across rooms.",
      "Designed MongoDB schemas for messages, users, and conversations, then deployed on Render with production logging.",
    ],
    tech: ["MERN Stack", "Socket.io", "MongoDB", "Express.js", "Render"],
    image: "/talk-space-real.png",
    liveUrl: "https://talk-space-z1i1.onrender.com",
    githubUrl: "https://github.com/Suraj1307/talk-space",
  },
  {
    title: "StaySpot",
    subtitle: "Property Rental Platform",
    description:
      "Full-stack property rental platform with role-based authentication, listing management, and production deployment.",
    bullets: [
      "Designed and deployed a full-stack property rental platform with role-based auth serving 50+ listings and secure login.",
      "Built RESTful APIs for CRUD operations, advanced filter and search, and map integration using Google Maps API.",
      "Led server-side pagination, efficient DB indexing, modular service layers, Jest tests, and CI/CD workflows to reduce deployment time by 70%.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap", "Render"],
    image: "/stayspot-real.png",
    liveUrl: "https://project-iugf.onrender.com",
    githubUrl: "https://github.com/Suraj1307/Project",
  },
  {
    title: "Emotion Classification",
    subtitle: "Attention-Based BiLSTM for Social Media",
    description:
      "Production-ready deep learning system for classifying emotions in noisy social media text with attention-based interpretability and interactive UI.",
    bullets: [
      "Built an Attention-Based BiLSTM pipeline to classify 7 emotions from noisy social media text with confidence-aware predictions.",
      "Added attention visualization, confidence insights, batch analysis, and fast inference through an interactive deployed interface.",
      "Structured the project end-to-end across training, inference, deployment, and UI for a practical NLP system with real-world usability.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "Gradio", "NumPy", "Pandas"],
    image: "/emotion-detector-real.png",
    liveUrl: "https://huggingface.co/spaces/SurajAI2025/Emotion",
    githubUrl: "https://github.com/Suraj1307/Emotion_Detector",
  },
];

const skillGroups = [
  {
    title: "Languages",
    icon: <CodeIcon />,
    items: ["C++", "JavaScript", "Python"],
    tone: "tone-languages",
    level: "Strong",
  },
  {
    title: "Backend",
    icon: <ServerIcon />,
    items: ["Node.js", "Express", "REST APIs", "JWT", "WebSockets"],
    tone: "tone-backend",
    level: "Strongest",
  },
  {
    title: "Frontend",
    icon: <MenuIcon />,
    items: ["React", "HTML", "CSS"],
    tone: "tone-frontend",
    level: "Production-ready",
  },
  {
    title: "Database",
    icon: <ServerIcon />,
    items: ["MongoDB", "MySQL"],
    tone: "tone-database",
    level: "Comfortable",
  },
  {
    title: "Tools",
    icon: <TrophyIcon />,
    items: ["Git", "Postman", "AWS (deployment & cloud basics)"],
    tone: "tone-tools",
    level: "Daily use",
  },
];

const achievements = [
  {
    title: "LeetCode Consistency",
    value: "500+ Problems",
    description: "Solved 500+ DSA problems with strong focus on patterns, speed, and consistency.",
  },
  {
    title: "Contest Rating",
    value: "1539",
    description: "LeetCode rating reflecting steady contest growth, with strong practice in arrays, graphs, and dynamic programming.",
  },
  {
    title: "Academic Record",
    value: "8.94 CGPA",
    description: "B.Tech in Computer Science and Engineering at KIIT.",
  },
  {
    title: "Certifications",
    value: "3 Credentials",
    description: "Verified learning across Generative AI, AWS Data Engineering, and Cybersecurity.",
  },
];

const educationItems = [
  {
    title: "Kalinga Institute of Industrial Technology",
    subtitle: "B.Tech in Computer Science and Engineering",
    period: "Jul 2023 - Present",
    metric: "CGPA: 8.94",
    description:
      "Currently pursuing Computer Science and Engineering with consistent academic performance and strong focus on backend development, DSA, and real-world project building.",
  },
  {
    title: "S T Raza International School",
    subtitle: "CBSE Class XII",
    period: "2020 - 2022",
    metric: "Percentage: 83.4%",
    description:
      "Completed senior secondary education with Physics, Chemistry, and Mathematics. Calculated from the five scored subjects shown on the marksheet: 417 out of 500.",
  },
  {
    title: "Resi Sun Beam Public School",
    subtitle: "CBSE Class X",
    period: "2020",
    metric: "Percentage: 89.4%",
    description:
      "Completed secondary education with strong performance across the five main subjects shown on the marksheet: 447 out of 500, with top scores in Social Science 95 and Sanskrit 94.",
  },
];

const certifications = [
  {
    title: "Google Cloud - Generative AI",
    issuer: "Google Cloud",
    period: "Oct 2024",
    description:
      "Hands-on training in generative AI fundamentals, prompt engineering, and cloud-based AI services.",
    link: "https://drive.google.com/file/d/1-nhYre7vjjKVA04L7pKyonUw6ASbdDXg/view?usp=drive_link",
  },
  {
    title: "AWS Data Engineering",
    issuer: "AWS",
    period: "Jun 2025",
    description:
      "Focused on scalable data pipelines, cloud data processing, and data engineering workflows on AWS.",
    link: "https://drive.google.com/file/d/1JoDHG87yO0W-F2TgDM09uCqxU4-pV8UU/view?usp=drive_link",
  },
  {
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata Forage",
    period: "Jul 2025",
    description:
      "Practical exposure to cybersecurity analysis, threat assessment, and incident response scenarios.",
    link: "https://drive.google.com/file/d/1GyKIfLl2XuAlyEmZMLWZtJNXiCUTpztf/view?usp=drive_link",
  },
];

const heroHighlights = [
  "Backend-first engineering mindset",
  "Real-time applications with WebSockets",
  "Secure APIs, clean architecture, scalable delivery",
];

const updatedHeroStats = [
  { value: "4", label: "Production-ready projects" },
  { value: "500+", label: "DSA problems solved" },
  { value: "8.94", label: "CGPA at KIIT CSE" },
];

const heroRoles = [
  "a Backend Developer",
  "a Full-Stack Engineer",
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

const resumeUrl =
  "https://raw.githubusercontent.com/Suraj1307/Portfolio/main/public/SurajKumar_Resume.pdf";

const strongSkills = new Set([
  "Node.js",
  "Express",
  "MongoDB",
  "React",
  "JWT",
  "WebSockets",
]);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const viewportMiddle = window.scrollY + window.innerHeight * 0.35;

      const active =
        sections.find((section) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          return viewportMiddle >= sectionTop && viewportMiddle < sectionBottom;
        }) || sections[sections.length - 1];

      if (active?.id) {
        setActiveSection(active.id);
      }
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
    setMenuOpen(false);
  }, [activeSection]);

  useEffect(() => {
    const onScroll = () => {
      setNavbarScrolled(window.scrollY > 100);
      const scrollTrigger = Math.max(
        320,
        (document.documentElement.scrollHeight - window.innerHeight) * 0.3,
      );
      setShowScrollTop(window.scrollY > scrollTrigger);
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
        resumeHref={resumeUrl}
        scrolled={navbarScrolled}
      />

      <main>
        <section className="hero section" id="home">
          <div className="container hero-home" data-reveal>
            <div className="hero-copy">
              <p className="hero-greeting">Hi, I&apos;m</p>
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
                <span className="status-pill">
                  <i />
                  Open to internships & junior roles - available from May 2026
                </span>
              </div>

              <div className="hero-actions">
                <a
                  className="button primary"
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
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
                  src="/profile-photo.jpeg"
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
              <p className="about-text about-cta">
                Currently seeking backend/full-stack internships or SDE roles starting
                May 2026.
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

        <section className="section" id="projects">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Projects</p>
              <h2>Selected builds that reflect backend engineering ability</h2>
              <p>
                Real-world projects that demonstrate backend engineering, API design,
                and full-stack delivery.
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

        <section className="section" id="skills">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Skills</p>
              <h2>Technologies and tools I use to build production-focused software</h2>
              <p>The core stack I use to build reliable, production-ready software.</p>
            </div>

            <div className="section-frame">
              <div className="skills-grid">
                {skillGroups.map((group) => (
                  <article
                    className={`skill-card ${group.tone}`}
                    key={group.title}
                    data-reveal
                    style={{ transitionDelay: `${skillGroups.indexOf(group) * 70}ms` }}
                  >
                    <div className="skill-card-top">
                      <div className="skill-icon">{group.icon}</div>
                      <div className="skill-heading-copy">
                        <h3>{group.title}</h3>
                        <span className="skill-level">{group.level}</span>
                      </div>
                    </div>
                    <div className="chip-wrap">
                      {group.items.map((item) => (
                        <span
                          className={`chip ${strongSkills.has(item) ? "chip-strong" : ""}`}
                          key={item}
                        >
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
                Academic and coding milestones that reflect my engineering approach.
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

        <section className="section" id="education">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Education</p>
              <h2>Academic foundation behind the projects and problem solving</h2>
              <p>
                Current college performance plus school records that show consistent
                academic discipline over time.
              </p>
            </div>

            <div className="education-grid">
              {educationItems.map((item) => (
                <article
                  className="education-card"
                  key={item.title}
                  data-reveal
                  style={{ transitionDelay: `${educationItems.indexOf(item) * 90}ms` }}
                >
                  <div className="education-content">
                    <p className="education-period">{item.period}</p>
                    <h3>{item.title}</h3>
                    <p className="education-subtitle">{item.subtitle}</p>
                    <p className="education-metric">{item.metric}</p>
                    <p className="education-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Certifications</p>
              <h2>Additional credentials that support my backend and engineering profile</h2>
              <p>
                Certifications aligned with cloud, AI, and security fundamentals
                that complement my project work and coursework.
              </p>
            </div>

            <div className="certification-grid">
              {certifications.map((item) => (
                <article
                  className="certification-card"
                  key={item.title}
                  data-reveal
                  style={{ transitionDelay: `${certifications.indexOf(item) * 90}ms` }}
                >
                  <div className="certification-top">
                    <p className="certification-issuer">{item.issuer}</p>
                    <span className="certification-period">{item.period}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a
                    className="certification-link"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Certificate
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-layout">
            <div className="contact-panel" data-reveal>
              <div className="section-heading left-aligned">
                <p className="eyebrow">Contact</p>
                <h2>Let&apos;s build something great together</h2>
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
