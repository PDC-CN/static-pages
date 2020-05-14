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
  });
}

// 9宫格banner
function init9Banner() {
  new Swiper('.pad-banner', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

// 活动banner
function initEvent() {
  new Swiper('.events .content', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

// 直播广告banner
function initLiveAds() {
  new Swiper('.live-ads .content', {
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

$(() => {
  initBanner();
  init9Banner();
  initEvent();
  initLiveAds();
});
