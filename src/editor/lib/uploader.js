const { $ } = window;

// state:
// wait
// selected
// uploaded

export default class Uploader {
  handler = () => {}

  constructor(url) {
    this.init();
    this.url = url;
    this.state = url ? 'uploaded' : 'wait';
    this.render();
  }

  init() {
    const $wrapper = $('<div class="inline-uploader"></div>');
    const $input = $('<input type="file">');
    const $preview = $('<span class="inline-uploader-preview"></span>');
    const $deleteBtn = $('<span class="inline-uploader-delete-btn"><svg class="icon icon--cross" width="12px" height="12px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cross"></use></svg></span>');
    $deleteBtn.click(this._handleDelete.bind(this));
    $input.change(this._handleUpload.bind(this));
    $wrapper.append($preview).append($input).append($deleteBtn);
    this.$wrapper = $wrapper;
    this.$preview = $preview;
    this.$deleteBtn = $deleteBtn;
    this.$input = $input;
  }

  _handleDelete() {
    if (this.state === 'uploaded') {
      this.state = 'wait';
      this.url = '';
    }
    this.render();
  }

  _handleUpload() {
    if (this.state !== 'wait') return;
    const file = this.$input[0].files[0];
    const formData = new FormData();
    formData.append('image', file);
    $.ajax({
      url: '/en/images',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
    }).always((resp) => {
      if (resp.url) {
        this.state = 'uploaded';
        this.url = resp.url;
        this.render();
      } else {
        alert('上传失败，请重试');
      }
    });
  }

  render() {
    this.$wrapper.attr('data-url', this.url);
    this.renderState();
    this.handler();
  }

  renderState() {
    const { state } = this;
    if (state === 'wait') {
      this._renderWait();
    } else if (state === 'uploaded') {
      this._renderUploaded();
    }
  }

  _renderWait() {
    this.$wrapper.attr('data-mode', 'wait');
    this.$preview.empty().append('<span><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg> 选择图片</span>');
  }

  _renderUploaded() {
    this.$wrapper.attr('data-mode', 'uploaded');
    const $img = $(`<img src="${this.url}" >`);
    const $url = $(`<span>${this.url}</span>`);
    this.$preview.empty().append($img).append($url);
  }

  appendTo($container) {
    this.$wrapper.appendTo($container);
  }

  prependTo($container) {
    this.$wrapper.prependTo($container);
  }

  onChange(handler) {
    this.handler = handler;
  }
}
