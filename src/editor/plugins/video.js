import getI18n from '../i18n';

const i18ng = getI18n().dic.g;
const i18n = getI18n().dic.video;

function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}


const tipMap = {
  youku: 'https://assets.zjzsxhy.com/upload/08042717-0b03-4f38-9df8-1f25e20edb97.png',
  qq: 'https://assets.zjzsxhy.com/upload/013a97a1-3ae6-450f-b895-9a220c089267.png',
  bilibili: 'https://assets.zjzsxhy.com/upload/7c844b9f-a28d-4f96-a652-f310ad6980c2.png',
  iqiyi: 'https://assets.zjzsxhy.com/upload/84ce0dd4-2e85-43c2-a9cf-f3d9df213645.png',
};

const { $ } = window;

const defaultData = {
  type: 'qq',
  code: '',
  width: 640,
  height: 380,
};

class Video {
  static get toolbox() {
    return {
      title: 'Video',
      icon: `<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13">
        <path d="M11.895,13H4.105A4.1094,4.1094,0,0,1,0,8.895V4.105A4.1094,4.1094,0,0,1,4.105,0h7.79A4.1094,4.1094,0,0,1,16,4.105v4.79A4.1094,4.1094,0,0,1,11.895,13ZM4.105,2A2.10742,2.10742,0,0,0,2,4.105v4.79A2.10742,2.10742,0,0,0,4.105,11h7.79A2.10742,2.10742,0,0,0,14,8.895V4.105A2.10742,2.10742,0,0,0,11.895,2Z" />
        <path d="M10.7544,5.791,7.3704,3.83723a.8304.8304,0,0,0-1.2456.71915V8.46388A.8304.8304,0,0,0,7.3704,9.183l3.384-1.95375A.8304.8304,0,0,0,10.7544,5.791Z" />
      </svg>`,
    };
  }

  constructor({ data }) {
    this.data = data.code ? {
      ...defaultData,
      ...data,
    } : defaultData;
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-hidden-content ce-video-editor">
      <div class="desc">${i18ng.hiddenTip}</div>
      <div class="row v-size">
        <div class="label">${i18n.size}</div>
        <div class="input">
          <input class="v-width" type="number" value="${data.width}">
          <span>X</span>
          <input class="v-height" type="number" value="${data.height}">
        </div>
      </div>
      <div class="row">
        <div class="label">${i18n.type}</div>
        <select class="input v-type">
          <option value="youku" ${data.type === 'youku' ? 'selected' : ''}>${i18n.typeYouku}</option>
          <option value="qq" ${data.type === 'qq' ? 'selected' : ''}>${i18n.typeQq}</option>
          <option value="bilibili" ${data.type === 'bilibili' ? 'selected' : ''}>${i18n.typeB}</option>
          <option value="iqiyi" ${data.type === 'iqiyi' ? 'selected' : ''}>${i18n.typeIqiyi}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.code}</div>
        <input type="text" class="input v-code" placeholder="${i18n.codeTip}">
      </div>
      <div class="row tip">
        <div class="label">&nbsp;</div>
        <div class="input">
          <div>${i18n.howTo}</div>
          <div class="ce-video-tip"></div>
        </div>
      </div>
    </div>`);

    $('.v-code', $editor).val(decodeURIComponent(data.code));

    const $video = $(`<div class="ce-video">
      <div class="ce-video-container"></div>
    </div>`);
    this.$editor = $editor;
    this.$video = $video;
    $('.v-type', $editor).change(() => {
      this._renderTip();
    });
    $editor.delegate('input', 'change', () => {
      this._renderVideo();
    });
    this._renderVideo();
    this._renderTip();
    $wrapper.appendChild($editor[0]);
    $wrapper.appendChild($video[0]);
    return $wrapper;
  }

  _getData() {
    const type = $('.v-type', this.$editor).val();
    const code = $('.v-code', this.$editor).val();
    const width = parseInt($('.v-width', this.$editor).val(), 10);
    const height = parseInt($('.v-height', this.$editor).val(), 10);

    return {
      type,
      code,
      width,
      height,
    };
  }

  _renderVideo() {
    const data = this._getData();
    const { code, width, height } = data;
    const $if = $(code);
    if ($if.length > 0 && $if[0].tagName === 'IFRAME') {
      $if.removeAttr('height');
      $if.removeAttr('width');
      $if.css('width', width);
      $if.css('height', height);
      this.$video.empty().append($if);
    }
  }

  _renderTip() {
    const data = this._getData();
    const { type } = data;
    $('.ce-video-tip', this.$editor).empty().append(`<img src="${tipMap[type]}" >`);
  }

  save() {
    const data = this._getData();
    data.code = encodeURIComponent(data.code);
    return data;
  }

  // validate(savedData) {
  //   const { header } = savedData;
  //   if (!header || !header.length) {
  //     return false;
  //   }

  //   return true;
  // }
}

export default Video;
