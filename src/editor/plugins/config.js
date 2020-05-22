function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

function repeat(count, str) {
  let ret = '';
  for (let i = 0; i < count; i += 1) {
    ret += str;
  }
  return ret;
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
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-hidden-content">
      <div class="desc">此配置部分不会出现在页面上</div>
      <div class="row">全局配置</div>
      <div class="row">
        <div class="label">页面背景</div>
        <input class="input page-bg" value="${data.pageBackground}" placeholder="RGB色值，例如 #3AFF22" >
      </div>
      <div class="row">
        <div class="label">文本颜色</div>
        <input class="input text-color" value="${data.textColor}" placeholder="空缺为默认，RGB色值，例如 #3AFF22" >
      </div>
      <div class="row">
        <div class="label">容器最大宽度</div>
        <input class="input max-width" value="${data.maxContainerWidth}" placeholder="像素，例如 1200" >
      </div>
    </div>`);
    this.$editor = $editor;
    // 事件
    $('input', this.$editor).change(this._setConfig.bind(this));
    $wrapper.appendChild($editor[0]);
    this._setConfig();
    return $wrapper;
  }

  _getData() {
    const pageBackground = $('input.page-bg', this.$editor).val();
    const maxContainerWidth = $('input.max-width', this.$editor).val();
    const textColor = $('input.text-color', this.$editor).val();
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
