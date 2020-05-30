import ColorPicker from '../lib/colorPicker';
import getI18n from '../i18n';

const i18ng = getI18n().dic.g;
const i18n = getI18n().dic.config;

function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

const { $ } = window;

const defaultData = {
  pageBackground: '',
  textColor: '',
  maxContainerWidth: 1200,
};

class Config {
  // static get toolbox() {
  //   return {
  //     title: 'Config',
  //     icon: '<svg width="10" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M7.6 8.15H2.25v4.525a1.125 1.125 0 0 1-2.25 0V1.125a1.125 1.125 0 1 1 2.25 0V5.9H7.6V1.125a1.125 1.125 0 0 1 2.25 0v11.55a1.125 1.125 0 0 1-2.25 0V8.15z"/></svg>',
  //   };
  // }

  constructor({ data }) {
    this.data = {
      ...defaultData,
      ...data,
    };
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-config-container']);
    const $editor = $(`<div class="ce-hidden-content">
      <div class="desc">${i18ng.hiddenTip}</div>
      <div class="row">${i18n.title}</div>
      <div class="row">
        <div class="label">${i18n.bg}</div>
        <div class="input page-bg"></div>
      </div>
      <div class="row">
        <div class="label">${i18n.color}</div>
        <div class="input text-color"></div>
      </div>
      <div class="row">
        <div class="label">${i18n.width}</div>
        <input class="input max-width" value="${data.maxContainerWidth}" placeholder="${i18n.widthTip}" >
      </div>
      <div class="tip">${i18n.tip}</div>
    </div>`);
    this.$editor = $editor;
    // 事件
    $('.max-width', this.$editor).change(this._setConfig.bind(this));
    $wrapper.appendChild($editor[0]);
    // color
    new ColorPicker($('.page-bg', this.$editor), {
      placeholder: i18n.bgTip,
      initialValue: data.pageBackground,
      onChange: this._setConfig.bind(this),
    });
    new ColorPicker($('.text-color', this.$editor), {
      placeholder: i18n.colorTip,
      initialValue: data.textColor,
      onChange: this._setConfig.bind(this),
    });
    this._setConfig();
    return $wrapper;
  }

  _getData() {
    const pageBackground = $('.input.page-bg', this.$editor).attr('data-value');
    const textColor = $('.input.text-color', this.$editor).attr('data-value');
    const maxContainerWidth = $('input.max-width', this.$editor).val();
    const ret = {
      ...defaultData,
      pageBackground,
      maxContainerWidth,
      textColor,
    };

    return ret;
  }

  _setConfig() {
    const data = this._getData();
    $('body').css('backgroundColor', data.pageBackground);
    $('#holder').css('color', data.textColor);
    $('#holder').css('maxWidth', `${data.maxContainerWidth}px`);
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

export default Config;
