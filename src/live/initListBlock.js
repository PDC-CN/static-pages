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
function initLive(page = 1) {
  $.ajax({
    url: window.location.pathname + '/lives?page=' + page,
  }).done((data) => {
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
function initReplay(page = 1) {
  $.ajax({
    url: window.location.pathname + '/history?page=' + page,
  }).done((data) => {
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
function initProduct(page = 1) {
  $.ajax({
    url: window.location.pathname + '/cases?page=' + page,
  }).done((data) => {
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
function initGuest(page = 1) {
  $.ajax({
    url: window.location.pathname + '/guests?page=' + page,
  }).done((data) => {
    console.log(data);
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
  if (window.LIVE_TYPE === 'canton_fair') {
    const $tab = $('.list-block .tab[data-tab="guest"]');
    $tab.html(i18n.contact);
    $tab.parent().prepend($tab);
    initTab('guest');
  } else {
    initTab('live');
  }
}

export default init;
