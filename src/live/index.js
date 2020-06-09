import initListBlock from './initListBlock';
import initComment from './initComment';
import initLive from './initLive';
import initDanmaku from './initDanmaku';
import initFileblock from './initFileblock';

const { $, Swiper } = window;

// 大banner
function initBanner() {
  new Swiper('.header-banner', {
    loop: true,
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
    autoplay: {
      delay: 3000,
    },
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
