import initListBlock from './initListBlock';
import initComment from './initComment';
import initLive from './initLive';
import initDanmaku from './initDanmaku';
import initFileblock from './initFileblock';

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
  if ($('body').attr('id') !== 'live') return;
  initListBlock();
  initComment();
  initLive();
  initBanner();
  initDanmaku();
  initFileblock();
});
