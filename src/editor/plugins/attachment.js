import { humanFileSize } from '../../_common/index';

function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

const { $ } = window;

const defaultData = {
  url: '',
  filename: '',
  size: 0,
};

class Attachment {
  static get toolbox() {
    return {
      title: 'Attachment',
      icon: `<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13">
        <path d="M11.79883,13.05945H4.20117A4.20609,4.20609,0,0,1,0,8.85828v-2.729H2v2.729a2.20349,2.20349,0,0,0,2.20117,2.20117h7.59766A2.20349,2.20349,0,0,0,14,8.85828v-2.729h2v2.729A4.20609,4.20609,0,0,1,11.79883,13.05945Z" />
        <rect x="7" y="0" width="2" height="9" rx="1" ry="1" />
        <rect x="4" y="1" width="5" height="2" rx="1" ry="1" transform="translate(0.44756 5.19939) rotate(-45)" />
        <rect x="7" y="1" width="5" height="2" rx="1" ry="1" transform="translate(4.23874 -6.11432) rotate(45)" />
      </svg>`,
    };
  }

  constructor({ data }) {
    this.data = {
      ...defaultData,
      ...data,
    };
    if (this.data.url) {
      this.state = 'uploaded';
      this.filename = this.data.filename;
      this.url = this.data.url;
      this.size = this.data.size;
    } else {
      this.state = 'wait';
      this.progress = 0;
      this._cleanData();
    }
  }

  render() {
    const $wrapper = createElement('div', ['ce-attachment']);
    const $editor = $('<div class="ce-attachment-editor"></div>');
    const $uploader = $(`<div class="ce-attachment-uploader">
      <input type="file">
      <div>
        <svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13">
          <path d="M11.79883,13.05945H4.20117A4.20609,4.20609,0,0,1,0,8.85828v-2.729H2v2.729a2.20349,2.20349,0,0,0,2.20117,2.20117h7.59766A2.20349,2.20349,0,0,0,14,8.85828v-2.729h2v2.729A4.20609,4.20609,0,0,1,11.79883,13.05945Z" />
          <rect x="7" y="0" width="2" height="9" rx="1" ry="1" />
          <rect x="4" y="1" width="5" height="2" rx="1" ry="1" transform="translate(0.44756 5.19939) rotate(-45)" />
          <rect x="7" y="1" width="5" height="2" rx="1" ry="1" transform="translate(4.23874 -6.11432) rotate(45)" />
        </svg>
        <span>点击上传附件</span>
      </div>
    </div>`);
    const $shower = $(`<div class="ce-attachment-shower">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M676.257 349.44l-57.42-57.059-287.098 285.415c-22.035 21.858-35.677 52.148-35.677 85.626s13.642 63.768 35.669 85.618c47.564 47.286 124.693 47.286 172.268 0.007l344.518-342.512c79.307-78.803 79.307-206.602 0-285.406-79.253-78.84-207.808-78.84-287.080 0l-361.726 359.638c-0.252 0.27-0.54 0.503-0.774 0.747-110.582 109.943-110.582 288.151 0 398.060 110.538 109.907 289.817 109.907 400.408 0 0.243-0.243 0.45-0.503 0.72-0.774l0.036 0.027 246.905-245.465-57.438-57.059-246.914 245.447c-0.261 0.233-0.495 0.495-0.747 0.739-78.731 78.273-206.819 78.273-285.569 0-78.731-78.254-78.731-205.595 0-283.859 0.27-0.27 0.531-0.522 0.783-0.747l-0.045-0.053 361.771-359.638c47.475-47.231 124.757-47.231 172.259 0 47.483 47.231 47.483 124.055 0 171.243l-344.518 342.512c-7.371 7.301-17.515 11.812-28.715 11.812s-21.344-4.511-28.717-11.816c-7.327-7.285-11.863-17.376-11.863-28.526 0-11.151 4.537-21.241 11.864-28.528l287.1-285.454z" p-id="1158"></path></svg>
      <div>
        <div class="filename"></div>
        <div class="size"></div>
      </div>
      <svg class="delete-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M237.525 341.333h-24.192a42.667 42.667 0 1 1 0-85.333h85.334v-42.667A85.333 85.333 0 0 1 384 128h256a85.333 85.333 0 0 1 85.333 85.333V256h85.334a42.667 42.667 0 0 1 0 85.333h-24.192L770.73 813.525A85.333 85.333 0 0 1 685.483 896H338.517a85.333 85.333 0 0 1-85.248-82.475l-15.786-472.192z m85.334 0l15.658 469.334h346.966l15.616-469.334H322.9zM384 256h256v-42.667H384V256z" p-id="2528"></path></svg>
      <svg class="download-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4101" width="48" height="48"><path d="M920.7 639.4c-22.1 0-40 17.9-40 40v167H143.3v-167c0-22.1-17.9-40-40-40s-40 17.9-40 40v197c0 27.6 22.4 50 50 50h797.3c27.6 0 50-22.4 50-50v-197c0.1-22.1-17.8-40-39.9-40z" p-id="4102"></path><path d="M482.9 733.8l0.2 0.2 0.8 0.8 0.6 0.6c0.3 0.2 0.5 0.5 0.8 0.7s0.5 0.4 0.8 0.7c0.2 0.2 0.4 0.3 0.6 0.5 0.3 0.2 0.6 0.5 0.9 0.7 0.1 0.1 0.3 0.2 0.4 0.3 1.8 1.4 3.8 2.5 5.8 3.5 0.2 0.1 0.3 0.2 0.5 0.2 0.3 0.1 0.6 0.3 0.9 0.4 0.3 0.1 0.6 0.3 0.9 0.4 0.2 0.1 0.5 0.2 0.7 0.3 0.4 0.2 0.8 0.3 1.2 0.5 0.2 0.1 0.3 0.1 0.5 0.2 0.5 0.2 0.9 0.3 1.4 0.5 0.1 0 0.2 0.1 0.4 0.1 0.5 0.2 1 0.3 1.6 0.4 0.1 0 0.2 0 0.3 0.1 0.5 0.1 1.1 0.3 1.7 0.4h0.3c0.6 0.1 1.1 0.2 1.7 0.3h0.4c0.5 0.1 1 0.1 1.6 0.2 0.2 0 0.5 0 0.7 0.1 0.4 0 0.8 0.1 1.3 0.1h4c10.5 0 21-4.1 28.8-12.2l255.4-265.1c15.3-15.9 14.9-41.2-1.1-56.6-15.9-15.3-41.2-14.9-56.6 1.1L551.7 608.9V137.5c0-22.1-17.9-40-40-40s-40 17.9-40 40v469.4L285.1 413.2c-15.3-15.9-40.6-16.4-56.6-1.1-15.9 15.3-16.4 40.7-1.1 56.6l255.5 265.1z" p-id="4103"></path></svg>
    </div>`);
    const $uploading = $(`<div class="ce-attachment-uploading">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024c-19.2 0-35.2-16-35.2-35.2s16-35.2 35.2-35.2c246.4 0 444.8-198.4 444.8-444.8S758.4 67.2 512 67.2 67.2 264 67.2 512c0 108.8 38.4 211.2 108.8 291.2 12.8 16 9.6 35.2-3.2 48-16 12.8-35.2 9.6-48-3.2-38.4-44.8-70.4-96-92.8-150.4C9.6 640 0 576 0 513.6c0-70.4 12.8-134.4 41.6-198.4 25.6-60.8 60.8-115.2 108.8-163.2s102.4-83.2 163.2-108.8C377.6 14.4 444.8 1.6 512 1.6s134.4 12.8 198.4 41.6c60.8 25.6 115.2 60.8 163.2 108.8s83.2 102.4 108.8 163.2c28.8 64 41.6 131.2 41.6 198.4s-12.8 134.4-41.6 198.4c-25.6 60.8-60.8 115.2-108.8 163.2s-102.4 83.2-163.2 108.8c-64 25.6-128 40-198.4 40z" fill="#888888" p-id="3353"></path></svg>
      <div class="progress"></div>
    </div>`);

    this.$editor = $editor;
    this.$uploader = $uploader;
    this.$shower = $shower;
    this.$uploading = $uploading;

    $editor.append($uploader);
    $editor.append($shower);
    $editor.append($uploading);

    $wrapper.appendChild($editor[0]);

    $('input', $uploader).change(this._handleUpload.bind(this));
    $('.delete-btn', $shower).click(() => {
      this._cleanData();
      this.state = 'wait';
      this._updateUi();
    });

    this._updateUi();

    return $wrapper;
  }

  _updateUi() {
    this.$editor
      .removeClass('state-wait')
      .removeClass('state-uploaded')
      .removeClass('state-uploading')
      .addClass(`state-${this.state}`);
    if (this.state === 'uploaded') {
      $('.filename', this.$shower).html(this.filename);
      $('.size', this.$shower).html(humanFileSize(this.size));
    } else if (this.state === 'uploading') {
      $('.progress', this.$uploading).html(this.progress);
    }
  }

  _cleanData() {
    this.url = '';
    this.filename = '';
    this.size = 0;
  }

  _handleUpload(e) {
    if (this.state !== 'wait') return;
    this._cleanData();
    const file = e.target.files[0];
    if (!file) return;
    const { name, size } = file;
    const formData = new FormData();
    formData.append('image', file);
    this.state = 'uploading';
    this.progress = 0;
    this._updateUi();
    $.ajax({
      xhr: () => {
        const xhr = new window.XMLHttpRequest();

        xhr.upload.addEventListener('progress', (evt) => {
          if (evt.lengthComputable) {
            let percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100, 10);
            this.progress = percentComplete + '%';
            this._updateUi();
          }
        }, false);

        return xhr;
      },
      url: '/en/images',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
    }).always((resp) => {
      if (resp.url) {
        this.state = 'uploaded';
        this.url = resp.url;
        this.filename = name;
        this.size = size;
        this._updateUi();
      } else {
        alert('上传失败，请重试');
      }
    });
  }

  _getData() {
    const { url, filename, size } = this;
    return {
      url,
      filename,
      size,
    };
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

export default Attachment;
