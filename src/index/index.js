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

  // 标题
  $('.nine-palaces').attr('data-title', $('#index .pads .r1').text());
}

// 活动banner
function initEvent() {
  const swiper = new Swiper('.events .content .left', {
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

// live
function initLiveBanner() {
  new Swiper('.live-ad-banner', {
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


// function t() {
//   var a = $('.live-ad-banner')[0];
//   var b = $('.live .content').parent()[0];
//   b.appendChild(a);
//   $('.live .title').addClass('container padding').removeAttr('style').html(`
//     <div class="title-content">
//       <div class="t1">CANTON FAIR </div>
//       <div class="t2"><div class="s1"><span>SPRING | 春季</span></div><div class="s2">FASHION WEEK</div></div>
//       <div class="t3"><div class="s1"><span>2020</span></div><div class="s2">广交会时尚周</div></div>
//     </div>
//   `);
// }

$(() => {
  initBanner();
  init9Banner();
  initEvent();
  initLiveAds();
  initLiveBanner();

  // TEST
  t();
});
