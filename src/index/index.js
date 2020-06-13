import { getI18n } from '../_common';

const { $, Swiper } = window;

const i18n = getI18n({
  en: {
    live: 'Fashion Week Lives',
    live2url: '/en/lives?classify=activity',
    live2: 'Design Forum Lives',
  },
  'zh-CN': {
    live: '点击进入时尚周直播间',
    live2url: '/zh-CN/lives?classify=activity',
    live2: '点击PDC设计智汇直播间',
  },
});

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

// 几个直播按钮
function initLiveBtns() {
  $('#index .live .content .b1 a').append(`<div class="play-btn">
    <div>
      <div class="i"><img src="https://assets.zjzsxhy.com/upload/69bfc70d-e0d0-4b75-bc9a-03c5081e0334.svg" alt=""></div>
      <div class="t">${i18n.live}</div>
    </div>
  </div>`);

  $('#index .events .left .b1 img').wrap(`<a href="${i18n.live2url}"></a>`);
  $('#index .events .left .b1 a').append(`<div class="play-btn">
    <div>
      <div class="i"><img src="https://assets.zjzsxhy.com/upload/69bfc70d-e0d0-4b75-bc9a-03c5081e0334.svg" alt=""></div>
      <div class="t">${i18n.live2}</div>
    </div>
  </div>`);
}


$(() => {
  initBanner();
  init9Banner();
  initEvent();
  initLiveAds();
  initLiveBanner();
  initLiveBtns();
});
