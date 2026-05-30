$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
    $(this).attr("aria-expanded", $(".navbar").hasClass("nav-toggle"));
  });
});
