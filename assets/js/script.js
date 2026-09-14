const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body;
const header = document.getElementById("site-header");
const nav = document.getElementById("site-nav");
const navToggle = document.getElementById("mobile-nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const scrollTopLink = document.getElementById("scroll-top");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const skillsContainer = document.getElementById("skillsContainer");
const projectGrid = document.getElementById("projectGrid");
const projectFilters = document.getElementById("projectFilters");
const revealElements = Array.from(document.querySelectorAll(".reveal"));

const skillCategories = {
  Languages: ["JavaScript (ES6+)", "C++", "SQL"],
  Frontend: ["React.js", "HTML", "CSS", "Vite"],
  Backend: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "JWT Authentication"],
  Database: ["MongoDB", "MySQL"],
  Cloud: ["Docker", "AWS (ECS, Fargate, ALB)"],
  Tools: ["Git", "GitHub", "Postman"]
};

const technologyKeywords = [
  "React",
  "Node.js",
  "Express",
  "Socket.IO",
  "Yjs",
  "Docker",
  "AWS ECS",
  "MongoDB",
  "JWT",
  "Vite",
  "REST APIs",
  "MySQL",
  "AI"
];

let projectsCache = [];
let activeProjectFilter = "all";

function setNavOpen(isOpen) {
  body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  const icon = navToggle.querySelector("i");
  if (icon) {
    icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!body.classList.contains("nav-open"));
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      const offset = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }

    if (window.innerWidth <= 900) {
      setNavOpen(false);
    }
  });
});

document.addEventListener("click", event => {
  if (window.innerWidth > 900 || !body.classList.contains("nav-open")) {
    return;
  }

  if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
    setNavOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    setNavOpen(false);
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
  scrollTopLink.classList.toggle("active", window.scrollY > 320);
});

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    threshold: 0.5,
    rootMargin: "-15% 0px -35% 0px"
  }
);

document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}

document.addEventListener("visibilitychange", () => {
  const favicon = document.getElementById("favicon");
  if (document.visibilityState === "visible") {
    document.title = "Suraj Kumar | Backend & Full-Stack Developer";
    favicon.setAttribute("href", "assets/images/favicon.png");
    return;
  }

  document.title = "Come Back | Suraj Kumar";
  favicon.setAttribute("href", "assets/images/favhand.png");
});

if (!prefersReducedMotion && window.Typed) {
  new Typed(".typing-text", {
    strings: [
      "backend development",
      "full-stack development",
      "real-time applications",
      "REST APIs",
      "scalable web applications"
    ],
    typeSpeed: 48,
    backSpeed: 24,
    backDelay: 1000,
    loop: true
  });
} else {
  const typingTarget = document.querySelector(".typing-text");
  if (typingTarget) {
    typingTarget.textContent = "backend development";
  }
}

function animateCount(element) {
  const rawTarget = Number(element.dataset.count);
  if (!rawTarget || prefersReducedMotion) {
    return;
  }

  const suffix = element.textContent.trim().replace(/[0-9.]/g, "");
  const duration = 1200;
  const startTime = performance.now();

  function tick(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(rawTarget * progress);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${rawTarget}${suffix}`;
    }
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll("[data-count]").forEach(counter => counterObserver.observe(counter));

async function fetchData(type = "skills") {
  const response = await fetch(type === "skills" ? "./skills.json" : "./projects/projects.json");

  if (!response.ok) {
    throw new Error(`Failed to load ${type}.`);
  }

  return response.json();
}

function renderSkills(skills) {
  const skillMap = new Map(skills.map(skill => [skill.name, skill]));

  skillsContainer.innerHTML = Object.entries(skillCategories)
    .map(([category, names]) => {
      const items = names
        .map(name => skillMap.get(name))
        .filter(Boolean)
        .map(
          skill => `
            <li>
              <img src="${skill.icon}" alt="" aria-hidden="true">
              <span>${skill.name}</span>
            </li>
          `
        )
        .join("");

      return `
        <article class="skills-group">
          <h3>${category}</h3>
          <ul>${items}</ul>
        </article>
      `;
    })
    .join("");
}

function formatCategory(category) {
  return category.replace(/-/g, " ");
}

function extractTechStack(project) {
  const stack = technologyKeywords.filter(keyword => project.desc.includes(keyword));
  return stack.length ? stack : [formatCategory(project.category)];
}

function renderProjectFilters(projects) {
  const categories = ["all", ...new Set(projects.map(project => project.category))];
  projectFilters.innerHTML = categories
    .map(category => {
      const label = category === "all" ? "all" : formatCategory(category);
      return `<button type="button" data-filter="${category}" class="${category === activeProjectFilter ? "active" : ""}">${label}</button>`;
    })
    .join("");
}

function renderProjects() {
  const visibleProjects =
    activeProjectFilter === "all"
      ? projectsCache
      : projectsCache.filter(project => project.category === activeProjectFilter);

  projectGrid.innerHTML = visibleProjects
    .map((project, index) => {
      const stackItems = extractTechStack(project)
        .map(tech => `<li>${tech}</li>`)
        .join("");

      return `
        <article class="project-card ${index === 0 && activeProjectFilter === "all" ? "project-card--featured" : ""}">
          <div class="project-card__media">
            <img src="./assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy">
            <span class="project-card__badge">${formatCategory(project.category)}</span>
          </div>
          <div class="project-card__body">
            <div class="project-card__header">
              <h3>${project.name}</h3>
              <span class="project-card__label">${index === 0 && activeProjectFilter === "all" ? "Featured" : "Project"}</span>
            </div>
            <p>${project.desc}</p>
            <ul class="project-card__stack">${stackItems}</ul>
            <div class="project-card__actions">
              <a href="${project.links.view}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>
              <a href="${project.links.code}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

if (projectFilters) {
  projectFilters.addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");
    if (!button) {
      return;
    }

    activeProjectFilter = button.dataset.filter;
    renderProjectFilters(projectsCache);
    renderProjects();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete your name, email, and message before sending.";
      return;
    }

    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address before sending.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    formStatus.innerHTML =
      'Opening your email app. If nothing happens, email <a href="mailto:surajrajnkh1244@gmail.com">surajrajnkh1244@gmail.com</a> directly.';

    window.location.href = `mailto:surajrajnkh1244@gmail.com?subject=${subject}&body=${bodyText}`;
    contactForm.reset();
  });
}

Promise.all([fetchData("skills"), fetchData("projects")])
  .then(([skills, projects]) => {
    renderSkills(skills);
    projectsCache = projects;
    renderProjectFilters(projects);
    renderProjects();
  })
  .catch(error => {
    console.error(error);
    if (skillsContainer) {
      skillsContainer.innerHTML = '<p class="form-status">Unable to load skills right now.</p>';
    }
    if (projectGrid) {
      projectGrid.innerHTML = '<p class="form-status">Unable to load projects right now.</p>';
    }
  });
