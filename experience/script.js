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

const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true
});

srtop.reveal(".experience .timeline", {delay: 400});
srtop.reveal(".experience .timeline .container", {interval: 400});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Achievements | Suraj Kumar";
    $("#favicon").attr("href", "../assets/images/favicon.png");
  } else {
    document.title = "Come Back | Suraj Kumar";
    $("#favicon").attr("href", "../assets/images/favhand.png");
  }
});
