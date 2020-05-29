import Image from '@editorjs/image';
import getI18n from '../i18n';

const { $ } = window;
const i18n = getI18n().dic.image;

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
    const $insert = $(`<div class="cdx-input image-tool__link" contenteditable="true" data-placeholder="${i18n.linkPlaceholder}">${link}</div>`);
    const $btn = $('.cdx-button', node);
    $btn.before($insert);
    $(node).delegate('.image-tool__image-picture', 'click', () => {
      const lk = $insert.html();
      if (lk) {
        window.open(lk);
      }
    });
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

  uploadingFailed(errorText) {
    // console.log('Image Tool: uploading failed because of ', errorText);

    if (errorText === 'incorrect response: "SIZE_LIMIT"') {
      this.api.notifier.show({
        message: i18n.eSize,
        style: 'error',
      });
    } else {
      this.api.notifier.show({
        message: i18n.eNormal,
        style: 'error',
      });
    }

    setTimeout(() => {
      this.ui.hidePreloader();
    }, 500);
  }
}
