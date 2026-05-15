/**
 * Our Solutions — horizontal product carousel + category filter tabs
 */
(function ($) {
  "use strict";

  var slideFilters = [
    ".digestive_care",
    ".respiratory_care",
    ".wellness_products",
    ".immunity_care",
    ".herbal_supplements",
  ];

  $(function () {
    var $carousel = $(".our-solutions-carousel");
    var $panel = $(".our-solutions-panel");
    var $filters = $panel.find(".our-solutions-filters li");

    if (!$carousel.length || typeof $.fn.owlCarousel !== "function") {
      return;
    }

    $carousel.owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: false,
      items: 1,
      smartSpeed: 550,
      autoplay: false,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        1200: { items: 1 },
      },
    });

    function setActiveFilter(index) {
      var selector = slideFilters[index];
      if (!selector) {
        return;
      }
      $filters.removeClass("active");
      $filters.filter('[data-filter="' + selector + '"]').addClass("active");
    }

    $carousel.on("changed.owl.carousel", function (event) {
      if (!event.namespace) {
        return;
      }
      var index = event.relatedTarget.normalize(event.item.index, true);
      if (
        index === 0 &&
        $filters.filter('[data-filter=".all"].active').length
      ) {
        return;
      }
      setActiveFilter(index);
    });

    $filters.on("click", function (e) {
      e.preventDefault();
      var $tab = $(this);
      var slide = parseInt($tab.attr("data-slide"), 10);

      $filters.removeClass("active");
      $tab.addClass("active");

      if (!isNaN(slide)) {
        $carousel.trigger("to.owl.carousel", [slide, 400, true]);
      }

      return false;
    });
  });
})(window.jQuery);
