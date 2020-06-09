const { $, Swiper } = window;

// 移动端设置banner
function initBanner() {
  const $w = $('<div class="swiper-wrapper"></div>');
  $('.b1>a').wrap('<div class="swiper-slide"></div>');
  $('.b1 .swiper-slide').appendTo($w);
  $w.appendTo($('.b1'));
  $('.b1').append('<div class="swiper-pagination"></div>');

  const count = $('.b1 .swiper-wrapper').children().length;
  const loop = count > 1;
  new Swiper('.b1', {
    loop,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: loop ? {
      delay: 3000,
    } : false,
  });
}


$(() => {
  if (window.innerWidth <= 600) {
    initBanner();
  }
});
