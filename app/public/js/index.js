var $window = $(window);

$(document).ready(function () {
  /*------------------------------------
            1. CountUp
        --------------------------------------*/

  $(".countup").counterUp({
    delay: 25,
    time: 2000,
  });

  // scroll to top
  $window.on("scroll", function () {
    if ($(this).scrollTop() > 500) {
      $(".scroll-to-top").fadeIn(400);
    } else {
      $(".scroll-to-top").fadeOut(400);
    }
  });

  $(".scroll-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600,
    );
  });

  // redirect
  $(".animate-redirect a[href^='#']").click(function (e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;

    $("body, html").animate(
      {
        scrollTop: position,
      },
      1000,
    );
  });

  // maindemos-carousel
  $(".maindemos-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    autoplay: false,
    smartSpeed: 1500,
    nav: false,
    dots: false,
    center: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      767: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  // innerpages-carousel
  $(".innerpages-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    autoplay: true,
    smartSpeed: 1500,
    nav: true,
    dots: false,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    center: false,
    margin: 10,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        nav: false,
      },
      576: {
        items: 1,
        nav: false,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  });

  $(".current-year").text(new Date().getFullYear());
});
