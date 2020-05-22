const { $, Swiper } = window;

// 大banner
function initBanner() {
  new Swiper('.header-banner', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });
}

$(() => {
  initBanner();
});
