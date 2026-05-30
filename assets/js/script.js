const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
    $(this).attr("aria-expanded", $(".navbar").hasClass("nav-toggle"));
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");
    $("#menu").attr("aria-expanded", "false");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    $("section").each(function () {
      const height = $(this).height();
      const offset = $(this).offset().top - 200;
      const top = $(window).scrollTop();
      const id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $('.navbar').find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  $('a[href*="#"]').on("click", function (event) {
    const target = $(this).attr("href");
    if (!target || !target.startsWith("#")) {
      return;
    }

    const destination = $(target);
    if (!destination.length) {
      return;
    }

    event.preventDefault();

    if (prefersReducedMotion) {
      window.location.hash = target;
      return;
    }

    $("html, body").animate({scrollTop: destination.offset().top}, 500, "linear");
  });

  $("#contact-form").on("submit", function (event) {
    event.preventDefault();

    const name = $('input[name="name"]').val().trim();
    const email = $('input[name="email"]').val().trim();
    const phone = $('input[name="phone"]').val().trim();
    const message = $('textarea[name="message"]').val().trim();
    const status = $("#form-status");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      status.text("Please complete your name, email, and message before sending.");
      return;
    }

    if (!emailPattern.test(email)) {
      status.text("Please enter a valid email address before sending.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    status.html(
      'Opening your email app. If nothing happens, email <a href="mailto:surajrajnkh1244@gmail.com">surajrajnkh1244@gmail.com</a> directly.'
    );

    window.location.href = `mailto:surajrajnkh1244@gmail.com?subject=${subject}&body=${body}`;
    this.reset();
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Suraj Kumar | Backend & Full-Stack Developer";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back | Suraj Kumar";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});

if (!prefersReducedMotion) {
  new Typed(".typing-text", {
    strings: [
      "backend development",
      "full-stack development",
      "real-time applications",
      "REST APIs",
      "scalable web applications"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500
  });
} else {
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    typingElement.textContent = "backend development";
  }
}

async function fetchData(type = "skills") {
  const response =
    type === "skills"
      ? await fetch("skills.json")
      : await fetch("./projects/projects.json");

  return response.json();
}

function showSkills(skills) {
  const skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";

  skills.forEach(skill => {
    skillHTML += `
      <div class="bar">
        <div class="info">
          <img src="${skill.icon}" alt="${skill.name}" />
          <span>${skill.name}</span>
        </div>
      </div>`;
  });

  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  const projectsContainer = document.querySelector("#projects .box-container");
  let projectHTML = "";

  projects.forEach(project => {
    projectHTML += `
      <div class="box tilt">
        <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
        <div class="content">
          <div class="tag">
            <h3>${project.name}</h3>
          </div>
          <div class="desc">
            <p>${project.desc}</p>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>`;
  });

  projectsContainer.innerHTML = projectHTML;

  if (!prefersReducedMotion) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15
    });
  }

  if (!prefersReducedMotion) {
    const srtop = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 1000,
      reset: true
    });

    srtop.reveal(".work .box", {interval: 200});
  }
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);

if (!prefersReducedMotion) {
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15
  });

  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true
  });

  srtop.reveal(".home .content h2", {delay: 200});
  srtop.reveal(".home .content p", {delay: 200});
  srtop.reveal(".home .content .btn", {delay: 200});
  srtop.reveal(".home .image", {delay: 400});
  srtop.reveal(".home .linkedin", {interval: 600});
  srtop.reveal(".home .github", {interval: 800});
  srtop.reveal(".home .gmail", {interval: 1000});
  srtop.reveal(".home .resume", {interval: 1200});
  srtop.reveal(".about .content h3", {delay: 200});
  srtop.reveal(".about .content .tag", {delay: 200});
  srtop.reveal(".about .content p", {delay: 200});
  srtop.reveal(".about .content .box-container", {delay: 200});
  srtop.reveal(".about .content .resumebtn", {delay: 200});
  srtop.reveal(".skills .container", {interval: 200});
  srtop.reveal(".skills .container .bar", {delay: 400});
  srtop.reveal(".education .box", {interval: 200});
  srtop.reveal(".experience .timeline", {delay: 400});
  srtop.reveal(".experience .timeline .container", {interval: 400});
  srtop.reveal(".certificates .box", {interval: 200});
  srtop.reveal(".contact .container", {delay: 400});
  srtop.reveal(".contact .container .form-group", {delay: 400});
}
