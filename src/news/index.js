const { $, Swiper } = window;

// 移动端设置banner
function initBanner() {
  const $w = $('<div class="swiper-wrapper"></div>');
  $('.b1>a').wrap('<div class="swiper-slide"></div>');
  $('.b1 .swiper-slide').appendTo($w);
  $w.appendTo($('.b1'));
  $('.b1').append('<div class="swiper-pagination"></div>');

  new Swiper('.b1', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
    },
  });
}


$(() => {
  if (window.innerWidth <= 600) {
    initBanner();
  }
});
