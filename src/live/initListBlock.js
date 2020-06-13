import { getI18n } from '../_common';

const { $ } = window;
const $grid = $('.list-block .grid');

const i18n = getI18n({
  en: {
    contact: 'Enterprises',
  },
  'zh-CN': {
    contact: '联系企业',
  },
});

let livePage = 1;
function getLive(page = 1) {
  return $.ajax({
    url: window.location.pathname + '/lives?page=' + page,
  });
}
function initLive(page = 1) {
  getLive().done((data) => {
    data.forEach((item) => {
      const $dom = `<a href="${item.url}" class="live">
        <div class="cover" style="background-image: url(${item.image})"></div>
        <div class="title">${item.name}</div>
        <div class="info">
          <div class="name">${item.author || ''}</div>
          <div class="time">${item.tag || ''}</div>
        </div>
      </a>`;
      $grid.append($dom);
    });
    if (data.length > 0) {
      livePage = page;
    }
  });
}

let replayPage = 1;
function getReplay(page = 1) {
  return $.ajax({
    url: window.location.pathname + '/history?page=' + page,
  });
}
function initReplay(page = 1) {
  getReplay(page).done((data) => {
    data.forEach((item) => {
      const $dom = $(`<a class="replay">
        <div class="cover" style="background-image: url(${item.image})"></div>
        <div class="title">${item.name}</div>
        <div class="info">
          <div class="name">${item.author || ''}</div>
          <div class="time">${item.tag || ''}</div>
        </div>
      </a>`);
      $dom.click(() => {
        if (window.TCP) {
          const $c = $('.video-block .video-container');
          $('.vcp-player', $c).css('display', 'block');
          $('.iframe-holder', $c).css('display', 'none');
          window.TCP.load(item.url);
        }
      });
      $grid.append($dom);
    });
    if (data.length > 0) {
      replayPage = page;
    }
  });
}

let productPage = 1;
function getProduct(page = 1) {
  return $.ajax({
    url: window.location.pathname + '/cases?page=' + page,
  });
}
function initProduct(page = 1) {
  getProduct().done((data) => {
    data.forEach((item) => {
      const $dom = `<a href="${item.url}" class="product">
        <div class="cover" style="background-image: url(${item.image})"></div>
        <div class="title">${item.name}</div>
        <div class="desc">${item.author}</div>
      </a>`;
      $grid.append($dom);
    });
    if (data.length > 0) {
      productPage = page;
    }
  });
}

let guestPage = 1;
function getGuest(page = 1) {
  return $.ajax({
    url: window.location.pathname + '/guests?page=' + page,
  });
}
function initGuest(page = 1) {
  getGuest().done((data) => {
    data.forEach((item) => {
      const $dom = `<a class="guest">
        <div class="cover" style="background-image: url(${item.image})"></div>
        <div class="name">${item.name}</div>
        <div class="desc">${item.author}</div>
      </a>`;
      $grid.append($dom);
    });
    if (data.length > 0) {
      guestPage = page;
    }
  });
}

let currentTab;

function initTab(tab) {
  currentTab = tab;
  $grid.empty();
  $('.list-block .tabs .tab').removeClass('active');
  $(`.list-block .tabs .tab[data-tab="${tab}"]`).addClass('active');
  if (tab === 'live') initLive();
  if (tab === 'replay') initReplay();
  if (tab === 'product') initProduct();
  if (tab === 'guest') initGuest();
}
function init() {
  if (window.LIVE_TYPE === 'canton_fair') {
    const $tab = $('.list-block .tab[data-tab="guest"]');
    $tab.html(i18n.contact);
    $tab.parent().prepend($tab);
  }
  $('.list-block .tabs .tab').click((e) => {
    const $this = $(e.target);
    if ($this.hasClass('active')) return;
    initTab($this.attr('data-tab'));
  });
  $('.list-block .more').click(() => {
    if (currentTab === 'live') initLive(livePage + 1);
    if (currentTab === 'replay') initReplay(replayPage + 1);
    if (currentTab === 'product') initProduct(productPage + 1);
    if (currentTab === 'guest') initGuest(guestPage + 1);
  });
  // 探测：
  Promise.all([getProduct(), getGuest()]).then(([products, guests]) => {
    if (products.length === 0) {
      $('.list-block .tabs .tab[data-tab="product"]').remove();
    }
    if (guests.length === 0) {
      $('.list-block .tabs .tab[data-tab="guest"]').remove();
    }
    initTab($('.list-block .tabs .tab').first().attr('data-tab'));
  });
}

export default init;
