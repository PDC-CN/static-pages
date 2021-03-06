import Uploader from '../lib/uploader';
import ColorPicker from '../lib/colorPicker';
import getI18n from '../i18n';

const i18ng = getI18n().dic.g;
const i18n = getI18n().dic.album;

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
  count: 2,
  images: [{
    url: '',
    link: '',
  }, {
    url: '',
    link: '',
  }],
  background: '',
  size: 'cover',
};

class Album {
  static get toolbox() {
    return {
      title: 'Album',
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
    const $editor = $(`<div class="ce-album-editor ce-hidden-content">
      <div class="desc">${i18ng.hiddenTip}</div>
      <div class="row">
        <div class="label">${i18n.col}</div>
        <select class="input v-count">
          <option value="2" ${data.count === 2 ? 'selected' : ''}>2</option>
          <option value="3" ${data.count === 3 ? 'selected' : ''}>3</option>
          <option value="4" ${data.count === 4 ? 'selected' : ''}>4</option>
          <option value="5" ${data.count === 5 ? 'selected' : ''}>5</option>
          <option value="6" ${data.count === 6 ? 'selected' : ''}>6</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.info}</div>
        <div class="links input">
          ${data.images.map(img => `<div class="row"><input type="text" class="link" placeholder="${i18n.link}" value="${img.link}"></div>`).reduce((a, b) => a + b, '')}
        </div>
      </div>
      <div class="row">
        <div class="label">${i18n.style}</div>
        <select class="input v-size">
          <option value="cover" ${data.size === 'cover' ? 'selected' : ''}>${i18n.styleCover}</option>
          <option value="contain" ${data.size === 'contain' ? 'selected' : ''}>${i18n.styleContain}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.bg}</div>
        <div class="input v-background"></div>
      </div>
    </div>`);

    $('.links .row', $editor).each((i, row) => {
      const uploader = new Uploader(data.images[i].url);
      uploader.onChange(() => {
        this._renderAlbum();
      });
      uploader.prependTo(row);
    });

    const $album = $(`<div class="ce-album" data-cols="${data.count}">
      ${repeat(data.count, '<a></a>')}
    </div>`);
    this.$editor = $editor;
    this.$album = $album;
    $('.v-count', $editor).change((e) => {
      const count = parseInt(e.target.value, 10);
      const $links = $('.links', $editor).children();
      if ($links.length > count) {
        $links.each((i, el) => {
          if (i >= count) $(el).remove();
        });
      } else if ($links.length < count) {
        const add = count - $links.length;
        for (let i = 0; i < add; i += 1) {
          const $row = $(`<div class="row"><input type="text" class="link" placeholder="${i18n.link}"></div>`);
          const uploader = new Uploader();
          uploader.onChange(() => {
            this._renderAlbum();
          });
          uploader.prependTo($row);
          $('.links', $editor).append($row);
        }
      }
      const $pics = $album.children();
      if ($pics.length > count) {
        $pics.each((i, el) => {
          if (i >= count) $(el).remove();
        });
      } else if ($pics.length < count) {
        const add = count - $pics.length;
        for (let i = 0; i < add; i += 1) {
          $album.append('<a></a>');
        }
      }
      $album.attr('data-cols', count);
    });
    $('.v-size', $editor).change(() => {
      this._renderAlbum();
    });
    $editor.delegate('input', 'change', () => {
      this._renderAlbum();
    });
    // color
    new ColorPicker($('.v-background', $editor), {
      placeholder: i18n.bgTip,
      initialValue: data.background,
      onChange: this._renderAlbum.bind(this),
    });
    this._renderAlbum();
    $wrapper.appendChild($editor[0]);
    $wrapper.appendChild($album[0]);
    return $wrapper;
  }

  _getData() {
    const count = parseInt($('.v-count', this.$editor).val(), 10);
    const size = $('.v-size', this.$editor).val();
    const background = $('.v-background', this.$editor).attr('data-value');

    const images = [];
    $('.links>div', this.$editor).each((i, el) => {
      const url = $('.inline-uploader', $(el)).attr('data-url');
      const link = $('input.link', $(el)).val();
      images.push({
        url,
        link,
      });
    });

    return {
      count,
      images,
      size,
      background,
    };
  }

  _renderAlbum() {
    const data = this._getData();
    const { images, size, background } = data;
    images.forEach((image, i) => {
      const { url, link } = image;
      const $n = $(this.$album.children()[i]);
      $n.empty();
      $n.removeAttr('href');
      if (url && url.length > 0) {
        let css = `background-image: url(${url});`;
        if (background && background.length) {
          css += `background-color: ${background}`;
        }
        $n.empty().append(`<div class="img" style="${css}"></div>`);
        if (link && link.length > 0) {
          $n.attr('href', link);
        }
      }
    });
    if (size === 'cover') {
      this.$album.removeClass('size-contain');
    } else if (size === 'contain') {
      this.$album.addClass('size-contain');
    }
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

export default Album;
