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

// 9宫格banner
function init9Banner() {
  const count = $('.pad-banner .swiper-wrapper').children().length;
  const loop = count > 1;
  const swiper = new Swiper('.pad-banner', {
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
  if (loop) {
    swiper.autoplay.stop();
    setTimeout(() => {
      swiper.autoplay.start();
    }, 700);
  }

  // 标题
  $('.nine-palaces').attr('data-title', $('#index .pads .r1').text());
}

// 活动banner
function initEvent() {
  const count = $('.events .content .left .swiper-wrapper').children().length;
  const loop = count > 1;
  const swiper = new Swiper('.events .content .left', {
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
  if (loop) {
    swiper.autoplay.stop();
    setTimeout(() => {
      swiper.autoplay.start();
    }, 1400);
  }
}

// 直播广告banner
function initLiveAds() {
  const count = $('.live-ads .content .swiper-wrapper').children().length;
  const loop = count > 1;
  const swiper = new Swiper('.live-ads .content', {
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
  if (loop) {
    swiper.autoplay.stop();
    setTimeout(() => {
      swiper.autoplay.start();
    }, 2100);
  }
}

// live
function initLiveBanner() {
  const count = $('.live-ad-banner .swiper-wrapper').children().length;
  new Swiper('.live-ad-banner', {
    loop: count > 1,
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
    autoplay: count > 1 ? {
      delay: 3000,
    } : false,
  });
}


$(() => {
  initBanner();
  init9Banner();
  initEvent();
  initLiveAds();
  initLiveBanner();
});
