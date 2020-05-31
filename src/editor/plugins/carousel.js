import Uploader from '../lib/uploader';
import ColorPicker from '../lib/colorPicker';
import getI18n from '../i18n';

const i18ng = getI18n().dic.g;
const i18n = getI18n().dic.album;

const isMobile = window.innerWidth <= 600;

function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

const { $ } = window;

const defaultData = {
  images: [{
    url: '',
  }],
  background: '',
  size: 'cover',
  height: 400,
};

class Carousel {
  static get toolbox() {
    return {
      title: 'Carousel',
      icon: `<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13">
      <rect class="cls-1" width="4" height="13" rx="1.4344" ry="1.4344" transform="translate(4 13) rotate(180)" />
      <rect class="cls-1" x="6" width="4" height="13" rx="1.4344" ry="1.4344" transform="translate(16 13) rotate(180)" />
      <rect class="cls-1" x="12" width="4" height="13" rx="1.4344" ry="1.4344" transform="translate(28 13) rotate(180)" />
    </svg>`,
    };
  }

  constructor({ data }) {
    this.data = data.count ? {
      ...defaultData,
      ...data,
    } : defaultData;
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-album-editor ce-hidden-content ce-carousel-editor">
      <div class="desc">${i18ng.hiddenTip}</div>
      <div class="row">
        <div class="label">${i18n.info}</div>
        <div class="links input">
          ${data.images.map(() => '<div class="row"></div>').reduce((a, b) => a + b, '')}
        </div>
      </div>
      <div class="row">
        <div class="label">&nbsp;</div>
        <div class="input add-image">+</div>
      </div>
      <div class="row">
        <div class="label">${i18n.carouselStyle}</div>
        <select class="input v-size">
          <option value="cover" ${data.size === 'cover' ? 'selected' : ''}>${i18n.styleCover}</option>
          <option value="contain" ${data.size === 'contain' ? 'selected' : ''}>${i18n.styleContain}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.carouselBg}</div>
        <div class="input v-background"></div>
      </div>
      <div class="row">
        <div class="label">${i18n.carouselHeight}</div>
        <input class="input v-height" value="${data.height}" placeholder="${i18n.carouselHeightTip}">
      </div>
    </div>`);

    $('.links .row', $editor).each((i, row) => {
      const uploader = new Uploader(data.images[i].url);
      uploader.onChange(() => {
        this._renderCarousel();
      });
      uploader.prependTo(row);
    });

    $('.add-image', $editor).click(() => {
      const $row = $('<div class="row"></div>');
      const uploader = new Uploader();
      uploader.onChange(() => {
        this._renderCarousel();
      });
      uploader.prependTo($row);
      $('.links', $editor).append($row);
    });

    $('.v-height', $editor).change(this._renderCarousel.bind(this));

    const $carousel = $(`<div class="ce-carousel">
      <div class="detail"></div>
      <div class="ce-carousel-content">
        <div class="owl-container owl-carousel owl-theme"></div>
      </div>
    </div>`);
    this.$editor = $editor;
    this.$carousel = $carousel;
    $('.v-size', $editor).change(() => {
      this._renderCarousel();
    });
    $editor.delegate('input', 'change', () => {
      this._renderCarousel();
    });
    // color
    new ColorPicker($('.v-background', $editor), {
      placeholder: i18n.bgTip,
      initialValue: data.background,
      onChange: this._renderCarousel.bind(this),
    });
    this._renderCarousel();
    $wrapper.appendChild($editor[0]);
    $wrapper.appendChild($carousel[0]);
    return $wrapper;
  }

  _getData() {
    const size = $('.v-size', this.$editor).val();
    const height = parseInt($('.v-height', this.$editor).val() || 400, 10);
    const background = $('.v-background', this.$editor).attr('data-value');

    const images = [];
    $('.links>div', this.$editor).each((i, el) => {
      const url = $('.inline-uploader', $(el)).attr('data-url');
      images.push({
        url,
      });
    });

    return {
      images,
      size,
      background,
      height,
    };
  }

  _renderCarousel() {
    const data = this._getData();
    const { images, size, background, height } = data;
    const activeImages = images.filter(i => i.url);

    const $content = $('.ce-carousel-content', this.$carousel);
    const $detial = $('.detail', this.$carousel);
    $content.empty();
    $detial.empty();

    if (activeImages.length === 0) {
      this.$carousel.addClass('empty');
      return;
    }
    this.$carousel.removeClass('empty');

    $content.append('<div class="owl-container owl-carousel owl-theme"></div>');
    const $owl = $('.owl-carousel', $content);
    activeImages.forEach((image) => {
      const $case = $(`<div class="case"><img src="${image.url}"></div>`);
      $owl.append($case);
      $case.click((e) => {
        $('.case', $content).removeClass('active');
        $(e.currentTarget).addClass('active');
        this._showDetail(e.currentTarget);
      });
    });
    $('.case', $owl).first().click();
    $owl.owlCarousel({
      loop: false,
      margin: isMobile ? 10 : 15,
      nav: true,
      autoWidth: true,
      dots: false,
    });

    $detial.attr('data-size', size);
    $detial.css('height', `${height || 400}px`);
    if (background) {
      $detial.css('backgroundColor', background);
    } else {
      $detial.css('backgroundColor', '');
    }
  }

  _showDetail(caze) {
    const $detial = $('.detail', this.$carousel).empty();
    const url = $('img', $(caze)).attr('src');
    $detial.append(`<img src="${url}" >`);
  }

  save() {
    return this._getData();
  }

  // validate(savedData) {
  //   const { header } = savedData;
  //   if (!header || !header.length) {
  //     return false;
  //   }

  //   return true;
  // }
}

export default Carousel;
