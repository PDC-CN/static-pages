import Image from '@editorjs/image';

const { $ } = window;

export default class MyImage extends Image {
  constructor(...args) {
    super(...args);
    if (!args[0].data.link || args[0].data.link === 'undefined') {
      this._link = '';
    } else {
      this._link = decodeURIComponent(args[0].data.link);
    }
  }

  render(...args) {
    const node = super.render(...args);
    const link = this._link || '';
    const $insert = $(`<div class="cdx-input image-tool__link" contenteditable="true" data-placeholder="图片链接，默认为空">${link}</div>`);
    const $btn = $('.cdx-button', node);
    $btn.before($insert);
    return node;
  }

  save(...args) {
    const data = super.save(...args);

    const { wrapper } = this.ui.nodes;

    const link = encodeURIComponent($('.image-tool__link', $(wrapper)).text());
    if (link) {
      data.link = link;
    } else {
      data.link = '';
    }
    return data;
  }
}
