import { isLogin, getI18n } from './index';

const { $ } = window;

const i18n = getI18n({
  en: {
    title: 'Translate',
  },
  'zh-CN': {
    title: '翻译',
  },
});

const template = `<div id="translateIframe">
  <div class="contact-if-title">${i18n.title}</div>
  <div class="contact-if-title-opt">
    <div class="min-btn opt-btn">
      <svg class="icon" viewBox="0 0 1024 1024"><path d="M195.1 871.4l242.3-242.3 2.2 219.2c0 16.5 13.5 30 30 30s30-13.5 30-30l-2.2-285.1c0-8.8-3.8-16.7-9.8-22.2-5.5-6-13.4-9.8-22.2-9.8H169.8c-16.5 0-30 13.5-30 30s13.5 30 30 30h220.7L152.7 829c-11.7 11.7-11.7 30.8 0 42.4 11.6 11.6 30.7 11.6 42.4 0zM827.3 156.6L585 398.9l-2.2-219.2c0-16.5-13.5-30-30-30s-30 13.5-30 30l2.2 285.1c0 8.8 3.8 16.7 9.8 22.2 5.5 6 13.4 9.8 22.2 9.8h295.6c16.5 0 30-13.5 30-30s-13.5-30-30-30H631.9L869.7 199c11.7-11.7 11.7-30.8 0-42.4-11.7-11.7-30.8-11.7-42.4 0z"></path></svg>
    </div>
    <div class="max-btn opt-btn">
      <svg class="icon" viewBox="0 0 1024 1024"><path d="M444.3 539.9L202 782.2 199.8 563c0-16.5-13.5-30-30-30s-30 13.5-30 30l2.2 285.1c0 8.8 3.8 16.7 9.8 22.2 5.5 6 13.4 9.8 22.2 9.8h295.6c16.5 0 30-13.5 30-30s-13.5-30-30-30H248.9l237.8-237.8c11.7-11.7 11.7-30.8 0-42.4-11.6-11.6-30.7-11.6-42.4 0zM578.1 488l242.3-242.3 2.2 219.2c0 16.5 13.5 30 30 30s30-13.5 30-30l-2.2-285.1c0-8.8-3.8-16.7-9.8-22.2-5.5-6-13.4-9.8-22.2-9.8H552.8c-16.5 0-30 13.5-30 30s13.5 30 30 30h220.7L535.7 445.6c-11.7 11.7-11.7 30.8 0 42.4 11.7 11.7 30.8 11.7 42.4 0z"></path></svg>
    </div>
    <div class="close-btn opt-btn">
      <svg class="icon" viewBox="0 0 1024 1024"><path d="M566.97558594 521.09667969L856.8828125 231.18945312c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355468l-1.58203125-1.58203125c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0L512 466.51660156 222.09277344 176.21386719c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0l-1.58203125 1.58203125c-15.02929688 14.63378906-15.02929688 38.75976563 0 53.39355469l289.90722656 289.90722656L167.1171875 811.00390625c-14.63378906 14.63378906-14.63378906 38.75976563 0 53.39355469l1.58203125 1.58203125c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0L512 576.07226563 801.90722656 865.97949219c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0l1.58203125-1.58203125c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355469L566.97558594 521.09667969z"></path></svg>
    </div>
  </div>
</div>`;

function closeIframe() {
  $('#translateIframe').remove();
}

function minIframe() {
  $('#translateIframe').addClass('min');
  const ch = $('.fixed-opt').height();
  const wh = window.innerHeight;
  const top = (wh - ch) / 2 + ch;
  $('#translateIframe').css('top', `${top + 5}px`).css('bottom', 'auto');
}

function maxIframe() {
  $('#translateIframe').removeClass('min').removeAttr('style');
}

function createIframe(url) {
  let $t = $('#translateIframe');
  if ($t.length === 0) {
    $t = $(template);
    $('.close-btn', $t).click(closeIframe);
    $('.min-btn', $t).click(minIframe);
    $('.max-btn', $t).click(maxIframe);
    $('body').append($t);
  }
  $('iframe', $t).remove();
  $t.append($(`<iframe src="${url}" frameborder="0"></iframe>`));
}

// 翻译iframe
function initTranslateIframe() {
  const $translate = $('.translate-me');
  if ($translate.length === 0) return;
  $translate.appendTo('.fixed-opt');

  return;

  // 判断是否登录
  if (isLogin()) {
    // 登录
    const url = $translate.attr('href');
    $translate.removeAttr('href');
    if ($translate.length === 0 || !url) return;

    $translate.click(() => {
      createIframe(url);
    });
  } else {
    // 未登录
    const $loginBtnA = $('.login-btn').parent();
    $translate.attr('href', $loginBtnA.attr('href'));
  }
}

export default initTranslateIframe;
