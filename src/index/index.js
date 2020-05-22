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

// 9宫格banner
function init9Banner() {
  const swiper = new Swiper('.pad-banner', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
    },
  });
  swiper.autoplay.stop();
  setTimeout(() => {
    swiper.autoplay.start();
  }, 700);
}

// 活动banner
function initEvent() {
  const swiper = new Swiper('.events .content', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
    },
  });
  swiper.autoplay.stop();
  setTimeout(() => {
    swiper.autoplay.start();
  }, 1400);
}

// 直播广告banner
function initLiveAds() {
  const swiper = new Swiper('.live-ads .content', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
    },
  });
  swiper.autoplay.stop();
  setTimeout(() => {
    swiper.autoplay.start();
  }, 2100);
}

$(() => {
  initBanner();
  init9Banner();
  initEvent();
  initLiveAds();
});
