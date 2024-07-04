/*-----------------------------------------------------------------------------------

    Theme Name: Services - The Best Service Industry Theme
    Description: The Best Service Industry Theme
    Author: Chitrakoot Web
    Version: 2.0

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. Sticky Header
        03. Scroll To Top
        04. Parallax
        05. Video
        06. Wow animation - on scroll
        07. Resize function
        08. FullScreenHeight function
        09. ScreenFixedHeight function
        10. Copy to clipboard
        11. FullScreenHeight and screenHeight with resize function
        12. Sliders
        13. Tabs
        14. CountUp
        15. Countdown
        16. Datetimepicker
        17. Current Year
        18. Isotop
        
    ---------------------------------- */

(function ($) {
  "use strict";

  var $window = $(window);

  // index页面品类浮动效果
  document.addEventListener('DOMContentLoaded', function() {
    function activateCategoryItem(index) {
      const items = document.querySelectorAll('.category-item');
      if (items[index]) {
        items[index].classList.add('active');
      }
    }

    function deactivateCategoryItem(index) {
      const items = document.querySelectorAll('.category-item');
      if (items[index]) {
        items[index].classList.remove('active');
      }
    }

    window.activateCategoryItem = activateCategoryItem;
    window.deactivateCategoryItem = deactivateCategoryItem;
  });

  /*------------------------------------
            01. Preloader
        --------------------------------------*/

  $("#preloader").fadeOut("normall", function () {
    $(this).remove();
  });

  /*------------------------------------
            02. Sticky Header
        --------------------------------------*/

  $window.on("scroll", function () {
    var scroll = $window.scrollTop();
    var logochange = $(".navbar-brand img");
    var logodefault = $(".navbar-brand.logodefault img");
    if (scroll <= 50) {
      $("header").removeClass("scrollHeader").addClass("fixedHeader");
      logochange.attr("src", "/img/logos/logo-inner.png");
      logodefault.attr("src", "/img/logos/logo.png");
    } else {
      $("header").removeClass("fixedHeader").addClass("scrollHeader");
      logochange.attr("src", "/img/logos/logo.png");
      logodefault.attr("src", "/img/logos/logo.png");
    }
  });

  /*------------------------------------
            03. Scroll To Top
        --------------------------------------*/

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

  /*------------------------------------
            04. Parallax
        --------------------------------------*/

  // sections background image from data background
  var pageSection = $(".parallax,.bg-img");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")",
      );
    }
  });

  /*------------------------------------
            05. Video
        --------------------------------------*/

  // It is for local video
  $(".story-video").magnificPopup({
    delegate: ".video",
    type: "iframe",
  });

  $(".popup-social-video").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  $(".source-modal").magnificPopup({
    type: "inline",
    mainClass: "mfp-fade",
    removalDelay: 160,
  });

  /*------------------------------------
            06. Wow animation - on scroll
        --------------------------------------*/

  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: false, // default
    live: true, // default
  });
  wow.init();

  // if ($(".tilt").length !== 0) {
  //     $('.tilt').tilt({
  //         maxTilt:        9,
  //         perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
  //         scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
  //         speed:          300,    // Speed of the enter/exit transition.
  //         reset:          true   // If the tilt effect has to be reset on exit.
  //     });
  // }

  /*------------------------------------
            07. Resize function
        --------------------------------------*/

  $window.resize(function (event) {
    setTimeout(function () {
      SetResizeContent();
    }, 500);
    event.preventDefault();
  });

  /*------------------------------------
            08. FullScreenHeight function
        --------------------------------------*/

  function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $window.height();
    element.css("min-height", $minheight);
  }

  /*------------------------------------
            09. ScreenFixedHeight function
        --------------------------------------*/

  function ScreenFixedHeight() {
    var $headerHeight = $("header").height();
    var element = $(".screen-height");
    var $screenheight = $window.height() - $headerHeight;
    element.css("height", $screenheight);
  }

  /*------------------------------------
            10. Copy to clipboard
        --------------------------------------*/

  if ($(".copy-clipboard").length !== 0) {
    new ClipboardJS(".copy-clipboard");
    $(".copy-clipboard").on("click", function () {
      var $this = $(this);
      var originalText = $this.text();
      $this.text("Copied");
      setTimeout(function () {
        $this.text("Copy");
      }, 2000);
    });
  }

  /*------------------------------------
            11. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/

  function SetResizeContent() {
    fullScreenHeight();
    ScreenFixedHeight();
  }

  SetResizeContent();

  // === when document ready === //
  $(document).ready(function () {
    /*------------------------------------
            12. Sliders
        --------------------------------------*/

    // testmonial-carousel
    $(".testimonial-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 15,
      items: 1,
      responsive: {
        0: {
          nav: false,
          dots: false,
        },
        991: {
          nav: false,
          dots: true,
        },
      },
    });

    // testmonial2-carousel
    $(".testimonial2-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // testmonial3-carousel (Index Car Wash)
    $(".testimonial3-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: false,
      autoplayTimeout: 5000,
      smartSpeed: 900,
      nav: false,
      dots: false,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });

    // testmonial4-carousel (Index Roofing)
    $(".testimonial4-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 15,
      items: 1,
    });

    // testimonial5-carousel (Index Laundry)
    $(".testimonial5-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: false,
      autoplay: true,
      thumbs: true,
      thumbsPrerendered: true,
      center: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      margin: 15,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });

    // testimonial6-carousel (Index Decorator)
    $(".testimonial6-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 1500,
      nav: true,
      center: false,
      dots: false,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      margin: 20,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        768: {
          items: 1,
        },
      },
    });

    // testmonial7-carousel (Index Courier)
    $(".testimonial7-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 20,
      responsive: {
        0: {
          items: 1,
          margin: 0,
          dots: false,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });

    // testimonial8-carousel (Index Tech-repair)
    $(".testimonial8-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      margin: 30,
      smartSpeed: 1500,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // testimonial9-carousel (Index Electrician)
    $(".testimonial9-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      margin: 15,
      smartSpeed: 1500,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 2,
        },
        992: {
          items: 2,
        },
      },
    });

    // testimonial10-carousel (Index Plumber)
    $(".testimonial10-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      margin: 30,
      smartSpeed: 1500,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
      },
    });

    // testimonial11-carousel (Index Mechanic)
    $(".testimonial11-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      margin: 15,
      smartSpeed: 1500,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // testimonials-style2
    $(".testimonials-style2").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 20,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        575: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });

    // Sliderfade2 (Index Gardener)
    $(".slider-fade2").owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      margin: 0,
      nav: false,
      autoplay: true,
      smartSpeed: 1500,
      mouseDrag: false,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        767: {
          nav: false,
          dots: true,
        },
      },
    });

    // Sliderfade3 (Index Gardener)
    $(".slider-fade3").owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      margin: 0,
      nav: false,
      autoplay: true,
      smartSpeed: 1500,
      mouseDrag: false,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
    });

    // service-carousel (Index Car Wash)
    $(".service-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: true,
      margin: 20,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
      },
    });

    // service2-carousel (Index Laundry)
    $(".service2-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      dots: false,
      center: false,
      margin: 0,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // service3-carousel (Index Decorator)
    $(".service3-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          margin: 0,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // service4-carousel (Index Tech-repair)
    $(".service4-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: false,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
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

    // service5-carousel (Index Electrician)
    $(".service5-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // service6-carousel (Index House Cleaner)
    $(".service6-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: false,
      center: false,
      margin: 15,
      responsive: {
        0: {
          items: 1,
        },
        575: {
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

    // portfolio-carousel (Index Gardener)
    $(".portfolio-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: false,
      margin: 0,
      responsive: {
        0: {
          items: 1,
        },
        576: {
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

    // portfolio2-carousel (Index Roofing)
    $(".portfolio2-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      margin: 20,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        992: {
          items: 3,
          dots: false,
        },
        1200: {
          items: 3,
        },
      },
    });

    // portfolio3-carousel (Index Decorator)
    $(".portfolio3-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      dots: false,
      center: true,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        768: {
          items: 2,
        },
        992: {
          items: 2,
        },
      },
    });

    // portfolio4-carousel (Index Electrician)
    $(".portfolio4-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // portfolio5-carousel
    $(".portfolio5-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 20,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        575: {
          items: 1,
        },
        767: {
          items: 2,
        },
        991: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });

    // portfolio5-carousel (Index Plumber)
    $(".portfolio5-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: false,
      center: false,
      margin: 20,
      responsive: {
        0: {
          items: 1,
        },
        575: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
      },
    });

    // project details carousel
    $(".project-details").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
          margin: 15,
        },
        768: {
          items: 2,
          margin: 15,
        },
        992: {
          items: 3,
        },
      },
    });

    // blog-post carousel
    $(".blog-post-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 900,
      nav: false,
      dots: false,
      items: 1,
      margin: 15,
    });

    // blog-carousel (Index Roofing)
    $(".blog-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 15,
      items: 1,
    });

    // blog2-carousel (Index Tech-repair)
    $(".blog2-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
      },
    });

    // certificate-carousel
    $(".certificate-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 15,
      responsive: {
        0: {
          items: 1,
          margin: 0,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // client carousel
    $(".client-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 900,
      nav: false,
      dots: false,
      items: 1,
      margin: 15,
    });

    // common-banner
    $(".common-banner .owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      navText: [
        '<span class="fas fa-chevron-left"></span>',
        '<span class="fas fa-chevron-right"></span>',
      ],
      margin: 0,
      autoplay: true,
      smartSpeed: 500,
      mouseDrag: false,
      thumbs: false,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      responsive: {
        0: {
          nav: false,
          dots: false,
        },
        991: {
          nav: true,
          dots: false,
        },
        1200: {
          nav: true,
          dots: false,
        },
      },
    });

    // brand-carousel
    $(".brand-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: false,
      center: false,
      margin: 0,
      responsive: {
        0: {
          items: 1,
        },
        575: {
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

    // team-carousel
    $(".team-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: true,
      center: false,
      margin: 20,
      responsive: {
        0: {
          items: 1,
        },
        575: {
          items: 2,
        },
        992: {
          items: 3,
        },
        // 1200: {
        //   items: 4,
        // },
      },
    });

    // why-choose-carousel (Index Mechanic)
    $(".why-choose-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: false,
      dots: true,
      center: false,
      margin: 30,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    // related-products carousel (Index Product Details)
    $(".related-products").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: true,
      center: false,
      margin: 0,
      responsive: {
        0: {
          items: 1,
        },
        767: {
          items: 2,
        },
        768: {
          items: 2,
        },
        992: {
          items: 4,
        },
      },
    });

    // Laundry, Carwash
    $(".banner3 .owl-carousel").owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: true,
      navText: [
        '<span class="fas fa-chevron-left"></span>',
        '<span class="fas fa-chevron-right"></span>',
      ],
      dots: false,
      center: false,
      items: 1,
      margin: 0,
    });

    // Default owlCarousel
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      margin: 0,
      autoplay: true,
      smartSpeed: 1500,
    });

    // Slider text animation
    var owl = $(".common-banner");
    owl.on("changed.owl.carousel", function (event) {
      var item = event.item.index - 2; // Position of the current item
      $("h1").removeClass("animated fadeInUp");
      $("h2").removeClass("animated fadeInUp");
      $(".text-animations").removeClass("animated");
      $(".butn").removeClass("animated fadeInUp");
      $(".owl-item")
        .not(".cloned")
        .eq(item)
        .find(".text-animations")
        .addClass("animated");
      $(".owl-item")
        .not(".cloned")
        .eq(item)
        .find("h1")
        .addClass("animated fadeInUp");
      $(".owl-item")
        .not(".cloned")
        .eq(item)
        .find("h2")
        .addClass("animated fadeInUp");
      $(".text-animations").textillate("in");
      $(".owl-item")
        .not(".cloned")
        .eq(item)
        .find(".butn")
        .addClass("animated fadeInUp");
    });

    if ($("#rev_slider_1").length !== 0) {
      var tpj = jQuery;
      var revapi4;
      tpj(document).ready(function () {
        if (tpj("#rev_slider_1").revolution == undefined) {
          revslider_showDoubleJqueryError("#rev_slider_1");
        } else {
          revapi4 = tpj("#rev_slider_1")
            .show()
            .revolution({
              sliderLayout: "fullwidth",
              delay: 12000,
              responsiveLevels: [4096, 1400, 1200, 768, 576],
              gridwidth: [1340, 1200, 990, 570, 420],
              gridheight: [700, 700, 700, 550, 500],
              hideThumbs: 10,
              fullScreenAutoWidth: "on",
              fullScreenOffsetContainer: "header",
              navigation: {
                onHoverStop: "off",
                touch: {
                  touchenabled: "on",
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: "horizontal",
                  drag_block_vertical: false,
                },
                arrows: {
                  enable: true,
                  style: "zeus",
                  tmp: '<div class="tp-arr-allwrapper">  <div class="tp-arr-imgholder"></div> <div class="tp-arr-titleholder">{{title}}</div> </div>',
                  left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 50,
                    v_offset: -40,
                  },
                  right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 50,
                    v_offset: -40,
                  },
                },
                bullets: {
                  style: "",
                  enable: false,
                  hide_onmobile: false,
                  hide_onleave: true,
                  hide_delay: 200,
                  hide_delay_mobile: 1200,
                  hide_under: 0,
                  hide_over: 9999,
                  direction: "horizontal",
                  space: 12,
                  h_align: "center",
                  v_align: "bottom",
                  h_offset: 0,
                  v_offset: 30,
                  tmp: "",
                },
              },

              spinner: "spinner4",
            });
        }
      });
    }

    // Revolution BlurEffectSlider
    if ($("#rev_slider_151_1").length !== 0) {
      var tpj = jQuery;
      var revapi151;
      tpj(document).ready(function () {
        if (tpj("#rev_slider_151_1").revolution == undefined) {
          revslider_showDoubleJqueryError("#rev_slider_151_1");
        } else {
          revapi151 = tpj("#rev_slider_151_1")
            .show()
            .revolution({
              sliderType: "standard",
              jsFileLocation: "revolution/js/",
              sliderLayout: "fullscreen",
              dottedOverlay: "none",
              delay: 9000,
              navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "vertical",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                  touchenabled: "on",
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: "horizontal",
                  drag_block_vertical: false,
                },
                arrows: {
                  style: "uranus",
                  enable: true,
                  hide_onmobile: false,
                  hide_over: 479,
                  hide_onleave: false,
                  tmp: "",
                  left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0,
                  },
                  right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0,
                  },
                },
              },
              responsiveLevels: [1240, 1024, 778, 480],
              visibilityLevels: [1240, 1024, 778, 480],
              gridwidth: [1240, 1024, 778, 480],
              gridheight: [868, 768, 960, 720],
              lazyType: "none",
              scrolleffect: {
                blur: "on",
                maxblur: "20",
                on_slidebg: "on",
                direction: "top",
                multiplicator: "2",
                multiplicator_layers: "2",
                tilt: "10",
                disable_on_mobile: "off",
              },
              parallax: {
                type: "scroll",
                origo: "slidercenter",
                speed: 400,
                levels: [
                  5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55,
                ],
              },
              shadow: 0,
              spinner: "spinner3",
              stopLoop: "off",
              stopAfterLoops: -1,
              stopAtSlide: -1,
              shuffle: "off",
              autoHeight: "off",
              fullScreenAutoWidth: "off",
              fullScreenAlignForce: "off",
              fullScreenOffsetContainer: "",
              fullScreenOffset: "0",
              hideThumbsOnMobile: "off",
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
              },
            });
        }
      });
    }

    /*------------------------------------
            13. Tabs
        --------------------------------------*/

    //Horizontal Tab
    if ($(".horizontaltab").length !== 0) {
      $(".horizontaltab").easyResponsiveTabs({
        type: "default", //Types: default, vertical, accordion
        width: "auto", //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: "hor_1", // The tab groups identifier
        activate: function (event) {
          // Callback function if tab is switched
          var $tab = $(this);
          var $info = $("#nested-tabInfo");
          var $name = $("span", $info);
          $name.text($tab.text());
          $info.show();
        },
      });
    }

    //Vertical Tab
    if ($(".verticaltab").length !== 0) {
      $(".verticaltab").easyResponsiveTabs({
        type: "vertical", //Types: default, vertical, accordion
        width: "auto", //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: "accordion", // Start closed if in accordion view
        tabidentify: "hor_1", // The tab groups identifier
        activate: function (event) {
          // Callback function if tab is switched
          var $tab = $(this);
          var $info = $("#nested-tabInfo2");
          var $name = $("span", $info);
          $name.text($tab.text());
          $info.show();
        },
      });
    }

    /*------------------------------------
            14. CountUp
        --------------------------------------*/

    $(".countup").counterUp({
      delay: 25,
      time: 2000,
    });

    /*------------------------------------
            15. Countdown
        --------------------------------------*/

    // CountDown for coming soon page
    $(".countdown").countdown({
      date: "01 Dec 2024 00:01:00", //set your date and time. EX: 15 May 2014 12:00:00
      format: "on",
    });

    /*------------------------------------
            16. Datetimepicker
        --------------------------------------*/

    $(".form_date").datetimepicker({
      language: "en",
      weekStart: 1,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0,
    });
    $(".form_time").datetimepicker({
      language: "en",
      weekStart: 1,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 1,
      minView: 0,
      maxView: 1,
      forceParse: 0,
    });

    /*------------------------------------
            17. Current Year
        --------------------------------------*/

    $(".current-year").text(new Date().getFullYear());
  });

  // === when window loading === //
  $window.on("load", function () {
    /*------------------------------------
            18. Isotop
        --------------------------------------*/

    var $PortfolioGallery = $(".portfolio-gallery").isotope({
      // options
    });

    $(".portfolio-gallery").lightGallery();

    $(".portfolio-link").on("click", (e) => {
      e.stopPropagation();
    });

    // stellar
    $window.stellar();
  });
})(jQuery);
