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
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Projects | Suraj Kumar";
    $("#favicon").attr("href", "../assets/images/favicon.png");
  } else {
    document.title = "Come Back | Suraj Kumar";
    $("#favicon").attr("href", "../assets/images/favhand.png");
  }
});

function getProjects() {
  return fetch("projects.json").then(response => response.json());
}

function showProjects(projects) {
  const projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";

  projects.forEach(project => {
    projectsHTML += `
      <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
          <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="${project.name}" />
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
        </div>
      </div>`;
  });

  projectsContainer.innerHTML = projectsHTML;

  const $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    masonry: {
      columnWidth: 200
    }
  });

  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    const filterValue = $(this).attr("data-filter");
    $grid.isotope({filter: filterValue});
  });
}

getProjects().then(showProjects);
