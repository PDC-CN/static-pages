const { $, Swiper } = window;

// 大banner
function initBanner() {
  const count = $('.header-banner .swiper-wrapper').children().length;
  const loop = count > 1;
  new Swiper('.header-banner', {
    loop,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: loop ? {
      delay: 3000,
    } : false,
  });
}

$(() => {
  initBanner();
});
